uniform sampler2D uPositions;//RenderTarget containing the transformed positions
uniform sampler2D uColorA;
uniform sampler2D uColorB;
uniform sampler2D uColorC;
uniform sampler2D uColorD;
uniform sampler2D uColorE;
uniform float uSize;
uniform float uPixelRatio;
uniform float uScroll;
varying vec3 vPos;
varying vec3 vColor;
void main() {

  //the mesh is a nomrliazed square so the uvs = the xy positions of the vertices
  vec3 pos = texture2D( uPositions, position.xy ).xyz;
  //pos now contains a 3D position in space, we can use it as a regular vertex

  float range = 1.0 / uTotalModels;
  float customSize = uSize;

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;


  if (uScroll < range) {
    customSize = mix(7.0, 10., uScroll * uTotalModels);
  } else if (uScroll < range * 2.0) {
    customSize = mix(10., 5., (uScroll - range) * uTotalModels);
  } else if (uScroll < range * 3.0) {
    customSize = mix(5., 20., (uScroll - range * 2.0) * uTotalModels);
  } else {
    float scroll = max((uScroll - range * 3.0), (uScroll - range * 3.0) * uTotalModels);
    customSize = mix(20., 15., scroll);
  }

  // Sample and blend model colors based on scroll
  vec3 colA = texture2D(uColorA, position.xy).rgb;
  vec3 colB = texture2D(uColorB, position.xy).rgb;
  vec3 colC = texture2D(uColorC, position.xy).rgb;
  vec3 colD = texture2D(uColorD, position.xy).rgb;
  vec3 colE = texture2D(uColorE, position.xy).rgb;

  if (uScroll < range) {
    vColor = mix(colA, colB, uScroll * uTotalModels);
  } else if (uScroll < range * 2.0) {
    vColor = mix(colB, colC, (uScroll - range) * uTotalModels);
  } else if (uScroll < range * 3.0) {
    vColor = mix(colC, colD, (uScroll - range * 2.0) * uTotalModels);
  } else {
    vColor = mix(colD, colE, (uScroll - range * 3.0) * uTotalModels);
  }

  gl_Position = projectionPosition;
  gl_PointSize = customSize * uPixelRatio;
  gl_PointSize *= (1.0 / - viewPosition.z);

  vPos = pos;
}
