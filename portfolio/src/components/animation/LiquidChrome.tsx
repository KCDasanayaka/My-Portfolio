"use client";

import { useEffect, useRef } from "react";

interface LiquidChromeProps {
  baseColor?: [number, number, number];
  speed?: number;
  amplitude?: number;
  frequencyX?: number;
  frequencyY?: number;
  interactive?: boolean;
  className?: string;
}

const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform float uTime;
uniform vec2  uResolution;
uniform vec2  uMouse;
uniform vec3  uBaseColor;
uniform float uAmplitude;
uniform float uFreqX;
uniform float uFreqY;
uniform float uSpeed;

vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314*r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v -   i + dot(i, C.xxx);
  vec3 g  = step(x0.yzx, x0.xyz);
  vec3 l  = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0,i1.z,i2.z,1.0))
  + i.y + vec4(0.0,i1.y,i2.y,1.0))
  + i.x + vec4(0.0,i1.x,i2.x,1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j  = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x  = x_ * ns.x + ns.yyyy;
  vec4 y  = y_ * ns.x + ns.yyyy;
  vec4 h  = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0+1.0;
  vec4 s1 = floor(b1)*2.0+1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
  m = m*m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float t = uTime * uSpeed;

  /* mouse distortion */
  vec2 mouse = uMouse / uResolution;
  float md = length(uv - mouse) * 2.0;
  float mStrength = smoothstep(0.5, 0.0, md) * 0.3;

  /* layered noise — chrome shimmer */
  float n1 = snoise(vec3(uv.x * uFreqX,          uv.y * uFreqY,          t));
  float n2 = snoise(vec3(uv.x * uFreqX * 2.0 + 4.0, uv.y * uFreqY * 2.0, t * 1.3));
  float n3 = snoise(vec3(uv.x * uFreqX * 0.5,    uv.y * uFreqY * 0.5 + 8.0, t * 0.7 + mStrength));

  float wave = (n1 * 0.5 + n2 * 0.3 + n3 * 0.2) * uAmplitude;

  /* distorted UV */
  vec2 distUV = uv + vec2(wave * 0.15, wave * 0.08) + mStrength * 0.05;

  /* chrome colour bands */
  float band = snoise(vec3(distUV * 3.0, t * 0.4));
  float r = snoise(vec3(distUV.x * 4.0 + band, distUV.y * 2.0, t * 0.5));
  float g = snoise(vec3(distUV.x * 3.5,         distUV.y * 3.0 + band, t * 0.6));
  float b = snoise(vec3(distUV.x * 2.0,         distUV.y * 4.0, t * 0.7 + band));

  vec3 chrome = vec3(r * 0.5 + 0.5, g * 0.5 + 0.5, b * 0.5 + 0.5);

  /* tint toward baseColor */
  vec3 col = mix(uBaseColor, chrome, 0.45);

  /* specular highlight */
  float spec = pow(max(0.0, n1 * 0.5 + 0.5), 6.0) * 0.4;
  col += vec3(spec);

  /* vignette */
  float vig = 1.0 - smoothstep(0.3, 1.2, length(uv - 0.5) * 1.5);
  col *= vig * 0.6 + 0.4;

  gl_FragColor = vec4(col, 1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export default function LiquidChrome({
  baseColor = [0.05, 0.05, 0.1],
  speed = 0.4,
  amplitude = 0.6,
  frequencyX = 3,
  frequencyY = 2,
  interactive = true,
  className = "",
}: LiquidChromeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false })!;
    if (!gl) return;

    // Program
    const vert = createShader(gl, gl.VERTEX_SHADER, VERT);
    const frag = createShader(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Fullscreen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const posLoc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uTime       = gl.getUniformLocation(prog, "uTime");
    const uResolution = gl.getUniformLocation(prog, "uResolution");
    const uMouse      = gl.getUniformLocation(prog, "uMouse");
    const uBaseColor  = gl.getUniformLocation(prog, "uBaseColor");
    const uAmplitude  = gl.getUniformLocation(prog, "uAmplitude");
    const uFreqX      = gl.getUniformLocation(prog, "uFreqX");
    const uFreqY      = gl.getUniformLocation(prog, "uFreqY");
    const uSpeed      = gl.getUniformLocation(prog, "uSpeed");

    gl.uniform3fv(uBaseColor, baseColor);
    gl.uniform1f(uAmplitude, amplitude);
    gl.uniform1f(uFreqX, frequencyX);
    gl.uniform1f(uFreqY, frequencyY);
    gl.uniform1f(uSpeed, speed);

    // Resize
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width  = canvas.clientWidth  * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Mouse
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const src  = "touches" in e ? e.touches[0] : e;
      mouse.current = {
        x: (src.clientX - rect.left) * (canvas.width / rect.width),
        y: canvas.height - (src.clientY - rect.top) * (canvas.height / rect.height),
      };
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });

    // Render loop
    const start = performance.now();
    const render = () => {
      const t = (performance.now() - start) / 1000;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.current.x, mouse.current.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
    };
  }, [baseColor, speed, amplitude, frequencyX, frequencyY, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
