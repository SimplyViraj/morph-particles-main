import * as THREE from 'three'
import Experience from '../Experience.js'
import cubeVertexShader from '../Shaders/Cube/vertex.glsl'
import cubeFragmentShader from '../Shaders/Cube/fragment.glsl'
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import gsap from "gsap";

import { BufferGeometry, MathUtils } from "three";
import { uniform, skinning, PointsNodeMaterial } from 'three/nodes';

import simVertex from '../Shaders/Particles/simulation.vert';
import simFragment from '../Shaders/Particles/simulation.frag';
import particlesVertex from '../Shaders/Particles/particles.vert';
import particlesFragment from '../Shaders/Particles/particles.frag';

import horseParticlesVertex from '../Shaders/Particles/horseParticles.vert';
import horseParticlesFragment from '../Shaders/Particles/horseParticles.frag';

import FBO from "../Utils/FBO.js";

export default class Page {
    constructor() {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera.instance
        this.renderer = this.experience.renderer.instance
        this.resources = this.experience.resources
        this.sizes = this.experience.sizes
        this.timeline = this.experience.timeline
        this.isMobile = this.experience.isMobile || window.innerWidth < 768
        this.cursor = this.experience.cursor || { x: 0, y: 0 }

        // Mobile float fallback: HalfFloatType is widely supported across mobile GPUs
        this.floatType = THREE.FloatType;

        const sections = document.querySelectorAll('.section');
        this.sectionCount = Math.max(sections.length - 1, 1);
        this.range = 1.0 / parseFloat(this.sectionCount);
        this.objectDistance = 100000;
        this.scrollY = window.scrollY;

        const maxScrollHeight = Math.max(document.body.offsetHeight - window.innerHeight, 1);
        this.normalizedScrollY = this.scrollY / maxScrollHeight;
        this.currentSection = 0;

        this.smoothScroll = document.querySelector('.smooth');
        this.scrollTarget = 0;
        this.normalizedTargetScrollY = 0;

        const fakeScroll = document.getElementById('fake-scroll');
        if (fakeScroll) {
            fakeScroll.addEventListener('scroll', () => this.scroll(), { passive: true });
            fakeScroll.addEventListener('wheel', (e) => { this.scrollDeltaY = e.deltaY; }, { passive: true });
            // Mobile touch listener for instant response
            fakeScroll.addEventListener('touchmove', () => this.scroll(), { passive: true });
        } else {
            window.addEventListener('scroll', () => this.scroll(), { passive: true });
            window.addEventListener('touchmove', () => this.scroll(), { passive: true });
        }

        this.setFBOParticles();
    }

    extractVertexColors(geometry, mesh) {
        const vertAmount = geometry.attributes.position.count;
        const colors = new Float32Array(vertAmount * 3);

        if (geometry.attributes.color) {
            const colAttr = geometry.attributes.color;
            for (let i = 0; i < vertAmount; i++) {
                colors[i * 3 + 0] = colAttr.array[i * colAttr.itemSize + 0];
                colors[i * 3 + 1] = colAttr.array[i * colAttr.itemSize + 1];
                colors[i * 3 + 2] = colAttr.array[i * colAttr.itemSize + 2];
            }
            return colors;
        }

        const material = mesh && mesh.material;
        if (material && material.map && material.map.image && geometry.attributes.uv) {
            const image = material.map.image;
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0);
            const imageData = ctx.getImageData(0, 0, image.width, image.height);
            const uvs = geometry.attributes.uv;

            for (let i = 0; i < vertAmount; i++) {
                let u = ((uvs.array[i * 2] % 1) + 1) % 1;
                let v = ((uvs.array[i * 2 + 1] % 1) + 1) % 1;
                const x = Math.floor(u * (image.width - 1));
                const y = Math.floor((1 - v) * (image.height - 1));
                const pixelIdx = (y * image.width + x) * 4;

                colors[i * 3 + 0] = imageData.data[pixelIdx] / 255;
                colors[i * 3 + 1] = imageData.data[pixelIdx + 1] / 255;
                colors[i * 3 + 2] = imageData.data[pixelIdx + 2] / 255;
            }
            return colors;
        }

        if (material && material.color) {
            for (let i = 0; i < vertAmount; i++) {
                colors[i * 3 + 0] = material.color.r;
                colors[i * 3 + 1] = material.color.g;
                colors[i * 3 + 2] = material.color.b;
            }
            return colors;
        }

        colors.fill(1.0);
        return colors;
    }

    makeDefaultColorTexture(width, height, color) {
        const data = new Float32Array(width * height * 4);
        for (let i = 0; i < width * height; i++) {
            data[i * 4 + 0] = color.r;
            data[i * 4 + 1] = color.g;
            data[i * 4 + 2] = color.b;
            data[i * 4 + 3] = 1.0;
        }
        const tex = new THREE.DataTexture(data, width, height, THREE.RGBAFormat, this.floatType);
        tex.needsUpdate = true;
        return tex;
    }

    makeTexture(geometry, mesh, width = 256, height = 256) {
        const targetParticles = width * height;
        const vertAmount = geometry.attributes.position.count;
        const posData = new Float32Array(targetParticles * 4);
        const colorData = new Float32Array(targetParticles * 4);

        const vertColors = this.extractVertexColors(geometry, mesh);

        const indices = new Array(vertAmount);
        for (let i = 0; i < vertAmount; i++) indices[i] = i;
        for (let i = vertAmount - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tmp = indices[i];
            indices[i] = indices[j];
            indices[j] = tmp;
        }

        const posArray = geometry.attributes.position.array;

        for (let i = 0; i < targetParticles; i++) {
            const si = indices[i % vertAmount];

            posData[i * 4 + 0] = posArray[si * 3 + 0];
            posData[i * 4 + 1] = posArray[si * 3 + 1];
            posData[i * 4 + 2] = posArray[si * 3 + 2];
            posData[i * 4 + 3] = 1.0;

            colorData[i * 4 + 0] = vertColors[si * 3 + 0];
            colorData[i * 4 + 1] = vertColors[si * 3 + 1];
            colorData[i * 4 + 2] = vertColors[si * 3 + 2];
            colorData[i * 4 + 3] = 1.0;
        }

        const posTexture = new THREE.DataTexture(posData, width, height, THREE.RGBAFormat, this.floatType);
        posTexture.needsUpdate = true;

        const colorTexture = new THREE.DataTexture(colorData, width, height, THREE.RGBAFormat, this.floatType);
        colorTexture.needsUpdate = true;

        return { positions: posTexture, colors: colorTexture };
    }

    setFBOParticles() {
        const width = 256;
        const height = 256;

        function getRandomData(w, h, size, isMobile) {
            const total = w * h;
            const data = new Float32Array(total * 4);
            const spreadX = isMobile ? size * 0.45 : size;
            for (let i = 0; i < total; i++) {
                data[i * 4 + 0] = (Math.random() - 0.5) * spreadX;
                data[i * 4 + 1] = (Math.random() - 0.5) * size;
                data[i * 4 + 2] = (Math.random() - 0.5) * size;
                data[i * 4 + 3] = 1.0;
            }
            return data;
        }

        function findGeometry(object) {
            if (!object) return null;
            let found = null;
            object.traverse((child) => {
                if (!found && child.geometry) found = child.geometry;
            });
            return found;
        }

        function findMesh(object) {
            if (!object) return null;
            let found = null;
            object.traverse((child) => {
                if (!found && child.isMesh) found = child;
            });
            return found;
        }

        // --- Responsive Transform Factors ---
        // On mobile, models are scaled down by ~45% and X-offset is centered
        const mobileScale = this.isMobile ? 0.55 : 1.0;
        const xOffset = this.isMobile ? 0.0 : 1.8;

        // Model A (Boy)
        const musicMesh = findMesh(this.resources.items.musicModel?.scene);
        this.boyGeometry = findGeometry(this.resources.items.musicModel?.scene)?.clone() || new THREE.BufferGeometry();
        this.boyGeometry.scale(1.25 * mobileScale, 1.25 * mobileScale, 1.25 * mobileScale);
        this.boyGeometry.rotateY((-Math.PI / 2) * 0.50);
        this.boyGeometry.translate(this.isMobile ? 0 : 2.0, -0.25, 0);

        // Model C (G Model)
        const gMesh = findMesh(this.resources.items.gModel?.scene);
        this.e2Geometry = findGeometry(this.resources.items.gModel?.scene)?.clone() || new THREE.BufferGeometry();
        this.e2Geometry.scale(2.0 * mobileScale, 2.0 * mobileScale, 2.0 * mobileScale);
        this.e2Geometry.rotateY(-Math.PI / 2);
        this.e2Geometry.translate(xOffset, -0.25, 0);

        // Model B (Radio / Oni)
        const radioMesh = findMesh(this.resources.items.radioModel?.scene);
        this.oniGeometry = findGeometry(this.resources.items.radioModel?.scene)?.clone() || new THREE.BufferGeometry();
        this.oniGeometry.scale(1.75 * mobileScale, 1.75 * mobileScale, 1.75 * mobileScale);
        this.oniGeometry.rotateY(-Math.PI);
        this.oniGeometry.rotateX(Math.PI / 3);
        this.oniGeometry.translate(this.isMobile ? 0 : 1.75, -0.30, 0.5);

        // Model E (Tree / Dance)
        const danceMesh = findMesh(this.resources.items.dModel?.scene);
        this.treeGeometry = findGeometry(this.resources.items.dModel?.scene)?.clone() || new THREE.BufferGeometry();
        this.treeGeometry.scale(2.5 * mobileScale, 2.5 * mobileScale, 2.5 * mobileScale);
        this.treeGeometry.rotateY(Math.PI);
        this.treeGeometry.rotateX(-Math.PI / 8);
        this.treeGeometry.translate(0, 0.75, 0);

        // Texture extraction
        const resultA = this.makeTexture(this.boyGeometry, musicMesh, width, height);
        const resultB = this.makeTexture(this.oniGeometry, radioMesh, width, height);
        const resultC = this.makeTexture(this.e2Geometry, gMesh, width, height);
        
        const randomData = getRandomData(width, height, 30, this.isMobile);
        const uTextureD = new THREE.DataTexture(randomData, width, height, THREE.RGBAFormat, this.floatType);
        uTextureD.needsUpdate = true;
        const uColorD = this.makeDefaultColorTexture(width, height, new THREE.Color(1.0, 1.0, 1.0));

        const resultE = this.makeTexture(this.treeGeometry, danceMesh, width, height);

        // Simulation Material
        this.simMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTextureA: { value: resultA.positions },
                uTextureB: { value: resultB.positions },
                uTextureC: { value: resultC.positions },
                uTextureD: { value: uTextureD },
                uTextureE: { value: resultE.positions },
                uTime: { value: 0 },
                uScroll: { value: this.normalizedScrollY },
                uTreePos: { value: new THREE.Vector3() },
            },
            defines: {
                uTotalModels: parseFloat(this.sectionCount).toFixed(2),
            },
            vertexShader: simVertex,
            fragmentShader: simFragment
        });

        // Adaptive Point Size based on viewport width
        const baseSize = this.isMobile ? 7.0 : 12.0;

        // Render Material
        this.renderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uPositions: { value: null },
                uColorA: { value: resultA.colors },
                uColorB: { value: resultB.colors },
                uColorC: { value: resultC.colors },
                uColorD: { value: uColorD },
                uColorE: { value: resultE.colors },
                uSize: { value: baseSize },
                uTime: { value: 0 },
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
                uScroll: { value: this.normalizedScrollY },
            },
            defines: {
                uTotalModels: parseFloat(this.sectionCount).toFixed(2),
                uRange: this.range,
            },
            vertexShader: particlesVertex,
            fragmentShader: particlesFragment,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        this.fbo = new FBO(width, height, this.renderer, this.simMaterial, this.renderMaterial);
        this.scene.add(this.fbo.particles);

        // Horse Particles Setup
        this.resource = this.resources.items.horseModel;
        if (this.resource?.scene) {
            this.horseMesh = this.resource.scene;
            const horseScale = 0.01 * mobileScale;
            this.horseMesh.scale.set(horseScale, horseScale, horseScale);

            this.horsePointsMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uPositions: { value: null },
                    uSize: { value: this.isMobile ? 1.5 : 2.0 },
                    uTime: { value: 0 },
                    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
                    uScroll: { value: this.normalizedScrollY },
                },
                defines: {
                    uTotalModels: parseFloat(this.sectionCount).toFixed(2),
                    uRange: this.range,
                },
                vertexShader: horseParticlesVertex,
                fragmentShader: horseParticlesFragment,
                transparent: true,
                depthWrite: false,
            });

            const horseBaseMesh = findMesh(this.horseMesh);
            if (horseBaseMesh && horseBaseMesh.geometry) {
                this.fg = horseBaseMesh.geometry;
                const fgCount = this.fg.attributes.position.count;
                const e2Pos = this.e2Geometry.attributes.position;
                const e2Count = e2Pos ? e2Pos.count : 0;

                this.aE2Geometry = new Float32Array(fgCount * 3);
                for (let i = 0; i < fgCount; i++) {
                    const srcIdx = e2Count > 0 ? (i % e2Count) : 0;
                    if (e2Pos) {
                        this.aE2Geometry[i * 3 + 0] = e2Pos.array[srcIdx * 3 + 0];
                        this.aE2Geometry[i * 3 + 1] = e2Pos.array[srcIdx * 3 + 1];
                        this.aE2Geometry[i * 3 + 2] = e2Pos.array[srcIdx * 3 + 2];
                    }
                }
                this.fg.setAttribute('aE2Geometry', new THREE.BufferAttribute(this.aE2Geometry, 3));

                const points = new THREE.Points(this.fg, this.horsePointsMaterial);
                if (horseBaseMesh.morphTargetInfluences) {
                    points.morphTargetInfluences = horseBaseMesh.morphTargetInfluences;
                    points.morphTargetDictionary = horseBaseMesh.morphTargetDictionary;
                }
            }

            this.setAnimation();
        }

        // Tree Mesh Setup
        if (this.resources.items.treeModel?.scene) {
            this.treeMesh = this.resources.items.treeModel.scene;
            this.treeMesh.traverse((child) => {
                if (child.isMesh && child.material) child.material.visible = false;
            });
            const treeScale = 1.1 * mobileScale;
            this.treeMesh.scale.set(treeScale, treeScale, treeScale);
            this.treeMesh.position.set(0, this.objectDistance, 0);
        }
    }

    resize() {
        this.isMobile = window.innerWidth < 768;

        if (this.fbo) this.fbo.resize(this.sizes.width, this.sizes.height);
        const pixelRatio = Math.min(window.devicePixelRatio, 2);

        if (this.renderMaterial) {
            this.renderMaterial.uniforms.uPixelRatio.value = pixelRatio;
            this.renderMaterial.uniforms.uSize.value = this.isMobile ? 7.0 : 12.0;
        }

        if (this.horsePointsMaterial) {
            this.horsePointsMaterial.uniforms.uPixelRatio.value = pixelRatio;
            this.horsePointsMaterial.uniforms.uSize.value = this.isMobile ? 1.5 : 2.0;
        }
    }

    scroll() {
        const fakeScroll = document.getElementById('fake-scroll');
        const currentY = fakeScroll ? fakeScroll.scrollTop : (window.scrollY || window.pageYOffset || 0);
        this.scrollY = currentY;

        // Skip desktop section snap logic on mobile to preserve natural touch momentum
        if (!this.isMobile) {
            const h = window.innerHeight;
            this.centerPrevSection = Math.floor(this.scrollY / h) * h;
            this.centerNextSection = (Math.floor(this.scrollY / h) + 1) * h;

            if (this.scrollY + 100 > this.centerNextSection) {
                this.scrollY = this.centerNextSection;
            }
            if (this.scrollY - 100 < this.centerPrevSection) {
                this.scrollY = this.centerPrevSection;
            }
        }

        const totalScrollable = Math.max(this.sectionCount * window.innerHeight, 1);
        this.normalizedScrollY = Math.min(Math.max(this.scrollY / totalScrollable, 0.0), 1.0);
    }

    scrollSet() {
        // Snappier damp response for touch screens
        const lambda = this.isMobile ? 10 : 3;
        const dt = this.time.delta > 1.0 ? this.time.delta * 0.001 : this.time.delta;

        this.normalizedTargetScrollY = MathUtils.damp(this.normalizedTargetScrollY, this.normalizedScrollY, lambda, dt);
        this.objectDistance = this.normalizedTargetScrollY / this.range;

        if (this.simMaterial) this.simMaterial.uniforms.uScroll.value = this.normalizedTargetScrollY;
        if (this.horsePointsMaterial) this.horsePointsMaterial.uniforms.uScroll.value = this.normalizedTargetScrollY;
        if (this.renderMaterial) this.renderMaterial.uniforms.uScroll.value = this.normalizedTargetScrollY;

        this.scrollTarget = MathUtils.damp(this.scrollTarget, this.scrollY, lambda, dt);

        const newSection = Math.round(this.scrollTarget / this.sizes.height);
        if (newSection !== this.currentSection) {
            this.currentSection = newSection;
        }

        if (this.smoothScroll) {
            this.smoothScroll.style.transform = `translate3d(0px, -${this.scrollTarget}px, 0px)`;
        }
    }

    setAnimation() {
        if (!this.resource?.animations?.length) return;

        this.animation = {};
        this.animation.mixer = new THREE.AnimationMixer(this.horseMesh);
        this.animation.actions = {};

        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0]);
        this.animation.actions.open = this.animation.mixer.clipAction(this.resource.animations[0]);

        this.animation.actions.current = this.animation.actions.idle;
        this.animation.actions.current.play();

        this.animation.play = (name) => {
            const newAction = this.animation.actions[name];
            const oldAction = this.animation.actions.current;
            if (!newAction || newAction === oldAction) return;

            newAction.reset();
            newAction.play();
            newAction.crossFadeFrom(oldAction, 1);
            this.animation.actions.current = newAction;
        };
    }

    update() {
        const dt = this.time.delta > 1.0 ? this.time.delta * 0.001 : this.time.delta;

        if (this.animation?.mixer) {
            this.animation.mixer.update(dt);
        }

        if (this.simMaterial) this.simMaterial.uniforms.uTime.value = this.time.elapsed;
        if (this.renderMaterial) this.renderMaterial.uniforms.uTime.value = this.time.elapsed;
        if (this.horsePointsMaterial) this.horsePointsMaterial.uniforms.uTime.value = this.time.elapsed;

        this.scrollSet();

        if (this.fbo) {
            this.fbo.update();
        }

        if (this.treeMesh) {
            const speed = 2;
            const section = this.sectionCount * 2;
            const displacement = -1;
            this.treeMesh.position.y = (displacement - section * 4) + this.objectDistance * this.sectionCount * speed + Math.sin(this.time.elapsed * 0.5) * 0.15;
            if (this.simMaterial) {
                this.simMaterial.uniforms.uTreePos.value.copy(this.treeMesh.position);
            }
        }

        // Dampen cursor/gyro sway on mobile so the particles don't drift away from center
        if (this.cursor && this.camera) {
            const cursorInfluence = this.isMobile ? 0.15 : 0.5;
            this.camera.position.x += (this.cursor.x * cursorInfluence - this.camera.position.x) * 5 * dt;
            this.camera.position.y += (-this.cursor.y * cursorInfluence - this.camera.position.y) * 5 * dt;
        }
    }
}