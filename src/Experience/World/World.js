import Experience from '../Experience.js'
import Environment from './Environment.js'
import Page from './Page.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.camera = this.experience.camera
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.html = this.experience.html
        this.sound = this.experience.sound
        this.debug = this.experience.debug?.panel

        // Ensure cursor container exists
        if (!this.experience.cursor) {
            this.experience.cursor = { x: 0, y: 0 }
        }

        // Initialize touch & tilt tracking
        this.setTouchAndTiltControls()

        // Wait for resources
        this.resources.on('ready', () =>
        {
            if (this.html?.playButton) {
                this.html.playButton.classList.add("fade-in")
            }

            this.experience.time.start = Date.now()
            this.experience.time.elapsed = 0

            // Setup
            this.page = new Page()
            this.environment = new Environment()

            // Remove preloader
            if (this.html?.preloader) {
                this.html.preloader.classList.add("preloaded")
                this.html.preloader.remove()
            }
            if (this.html?.playButton) {
                this.html.playButton.remove()
            }

            // Animation timeline
            this.animationPipeline()
        })
    }

    setTouchAndTiltControls()
    {
        // Internal tracking states
        let touchX = 0
        let touchY = 0
        let tiltX = 0
        let tiltY = 0

        const syncCursor = () => {
            // Combines finger offset and phone tilt into the central cursor target
            this.experience.cursor.x = touchX + tiltX
            this.experience.cursor.y = touchY + tiltY
        }

        // --- 1. Touch Tracking ---
        const updateTouch = (touch) => {
            touchX = (touch.clientX / window.innerWidth - 0.5) * 0.8
            touchY = (touch.clientY / window.innerHeight - 0.5) * 0.8
            syncCursor()
        }

        window.addEventListener('touchstart', (e) => {
            if (e.touches.length > 0) updateTouch(e.touches[0])
        }, { passive: true })

        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) updateTouch(e.touches[0])
        }, { passive: true })

        window.addEventListener('touchend', () => {
            // Smoothly release touch back to neutral, letting tilt take full control
            touchX = 0
            touchY = 0
            syncCursor()
        }, { passive: true })

        // --- 2. Device Orientation (Gyroscope / Tilt) ---
        const handleOrientation = (e) => {
            if (e.gamma === null || e.beta === null) return

            // gamma: left-to-right tilt [-90 to 90 degrees]
            // Clamped and normalized to [-0.5, 0.5]
            tiltX = Math.min(Math.max(e.gamma / 45, -1), 1) * 0.5

            // beta: front-to-back tilt [-180 to 180 degrees]
            // Baseline 45deg assumes the typical handheld phone reading angle
            tiltY = Math.min(Math.max((e.beta - 45) / 45, -1), 1) * 0.5

            syncCursor()
        }

        // iOS 13+ requires explicit permission triggered by a user gesture
        const requestPermission = () => {
            if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                DeviceOrientationEvent.requestPermission()
                    .then((state) => {
                        if (state === 'granted') {
                            window.addEventListener('deviceorientation', handleOrientation)
                        }
                    })
                    .catch((err) => console.warn('DeviceOrientation error:', err))
            } else {
                window.addEventListener('deviceorientation', handleOrientation)
            }
        }

        window.addEventListener('touchend', requestPermission, { once: true })
        window.addEventListener('click', requestPermission, { once: true })
    }

    animationPipeline() {
        if (this.camera?.animateCameraPosition) {
            this.camera.animateCameraPosition()
        }
    }

    resize() {

    }

    scroll()
    {
        if (this.page)
            this.page.scroll()
    }

    update()
    {
        if (this.page)
            this.page.update()
    }
}