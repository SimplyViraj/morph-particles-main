varying vec3 vPos;
varying vec3 vColor;
uniform float uTime;
uniform float uScroll;
void main()
{
  float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
  float strength = 0.05 / distanceToCenter - 0.1;

  gl_FragColor = vec4(vColor, strength * length(vPos));
}
