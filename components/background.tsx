"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import { Renderer, Program, Mesh, Triangle, Vec3 } from "ogl";

interface OrbProps {
  hue?: number;
  hoverIntensity?: number;
  rotateOnHover?: boolean;
  forceHoverState?: boolean;
}

export default function Orb({
  hue = 0,
  hoverIntensity = 0.2,
  rotateOnHover = true,
  forceHoverState = false,
}: OrbProps) {
  const ctnDom = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const programRef = useRef<Program | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const vert = /* glsl */ `
    precision highp float;
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const frag = /* glsl */ `
    precision highp float;

    uniform float iTime;
    uniform vec3 iResolution;
    uniform float hue;
    uniform float hover;
    uniform float rot;
    uniform float hoverIntensity;
    varying vec2 vUv;

    vec3 rgb2yiq(vec3 c) {
      float y = dot(c, vec3(0.299, 0.587, 0.114));
      float i = dot(c, vec3(0.596, -0.274, -0.322));
      float q = dot(c, vec3(0.211, -0.523, 0.312));
      return vec3(y, i, q);
    }
    
    vec3 yiq2rgb(vec3 c) {
      float r = c.x + 0.956 * c.y + 0.621 * c.z;
      float g = c.x - 0.272 * c.y - 0.647 * c.z;
      float b = c.x - 1.106 * c.y + 1.703 * c.z;
      return vec3(r, g, b);
    }
    
    vec3 adjustHue(vec3 color, float hueDeg) {
      float hueRad = hueDeg * 3.14159265 / 180.0;
      vec3 yiq = rgb2yiq(color);
      float cosA = cos(hueRad);
      float sinA = sin(hueRad);
      float i = yiq.y * cosA - yiq.z * sinA;
      float q = yiq.y * sinA + yiq.z * cosA;
      yiq.y = i;
      yiq.z = q;
      return yiq2rgb(yiq);
    }
    
    vec3 hash33(vec3 p3) {
      p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
      p3 += dot(p3, p3.yxz + 19.19);
      return -1.0 + 2.0 * fract(vec3(
        p3.x + p3.y,
        p3.x + p3.z,
        p3.y + p3.z
      ) * p3.zyx);
    }
    
    float snoise3(vec3 p) {
      const float K1 = 0.333333333;
      const float K2 = 0.166666667;
      vec3 i = floor(p + (p.x + p.y + p.z) * K1);
      vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
      vec3 e = step(vec3(0.0), d0 - d0.yzx);
      vec3 i1 = e * (1.0 - e.zxy);
      vec3 i2 = 1.0 - e.zxy * (1.0 - e);
      vec3 d1 = d0 - (i1 - K2);
      vec3 d2 = d0 - (i2 - K1);
      vec3 d3 = d0 - 0.5;
      vec4 h = max(0.6 - vec4(
        dot(d0, d0),
        dot(d1, d1),
        dot(d2, d2),
        dot(d3, d3)
      ), 0.0);
      vec4 n = h * h * h * h * vec4(
        dot(d0, hash33(i)),
        dot(d1, hash33(i + i1)),
        dot(d2, hash33(i + i2)),
        dot(d3, hash33(i + 1.0))
      );
      return dot(vec4(31.316), n);
    }
    
    vec4 extractAlpha(vec3 colorIn) {
      float a = max(max(colorIn.r, colorIn.g), colorIn.b);
      return vec4(colorIn.rgb / (a + 1e-5), a);
    }
    
    const vec3 baseColor1 = vec3(0.611765, 0.262745, 0.996078);
    const vec3 baseColor2 = vec3(0.298039, 0.760784, 0.913725);
    const vec3 baseColor3 = vec3(0.062745, 0.078431, 0.600000);
    const float innerRadius = 0.6;
    const float noiseScale = 0.65;
    
    float light1(float intensity, float attenuation, float dist) {
      return intensity / (1.0 + dist * attenuation);
    }
    
    float light2(float intensity, float attenuation, float dist) {
      return intensity / (1.0 + dist * dist * attenuation);
    }
    
    vec4 draw(vec2 uv) {
      vec3 color1 = adjustHue(baseColor1, hue);
      vec3 color2 = adjustHue(baseColor2, hue);
      vec3 color3 = adjustHue(baseColor3, hue);
      
      float ang = atan(uv.y, uv.x);
      float len = length(uv);
      float invLen = len > 0.0 ? 1.0 / len : 0.0;
      
      float n0 = snoise3(vec3(uv * noiseScale, iTime * 0.5)) * 0.5 + 0.5;
      float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0);
      float d0 = distance(uv, (r0 * invLen) * uv);
      float v0 = light1(1.0, 10.0, d0);
      v0 *= smoothstep(r0 * 1.05, r0, len);
      float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;
      
      float a = iTime * -1.0;
      vec2 pos = vec2(cos(a), sin(a)) * r0;
      float d = distance(uv, pos);
      float v1 = light2(1.5, 5.0, d);
      v1 *= light1(1.0, 50.0, d0);
      
      float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);
      float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);
      
      vec3 col = mix(color1, color2, cl);
      col = mix(color3, col, v0);
      col = (col + v1) * v2 * v3;
      col = clamp(col, 0.0, 1.0);
      
      return extractAlpha(col);
    }
    
    vec4 mainImage(vec2 fragCoord) {
      vec2 center = iResolution.xy * 0.5;
      float size = min(iResolution.x, iResolution.y);
      vec2 uv = (fragCoord - center) / size * 2.0;
      
      float angle = rot;
      float s = sin(angle);
      float c = cos(angle);
      uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);
      
      uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10.0 + iTime);
      uv.y += hover * hoverIntensity * 0.1 * sin(uv.x * 10.0 + iTime);
      
      return draw(uv);
    }
    
    void main() {
      vec2 fragCoord = vUv * iResolution.xy;
      vec4 col = mainImage(fragCoord);
      gl_FragColor = vec4(col.rgb * col.a, col.a);
    }
  `;

  const resize = useCallback(() => {
    const container = ctnDom.current;
    const renderer = rendererRef.current;
    const program = programRef.current;

    if (!container || !renderer || !program) return;

    try {
      const gl = renderer.gl;
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR at 2 for performance
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (width === 0 || height === 0) return; // Skip if container has no size

      renderer.setSize(width * dpr, height * dpr);
      gl.canvas.style.width = width + "px";
      gl.canvas.style.height = height + "px";

      program.uniforms.iResolution.value.set(
        gl.canvas.width,
        gl.canvas.height,
        gl.canvas.width / gl.canvas.height
      );
    } catch (err) {
      console.error("Error in resize:", err);
      setError("Failed to resize canvas");
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const container = ctnDom.current;
    const program = programRef.current;

    if (!container || !program) return;

    try {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const width = rect.width;
      const height = rect.height;
      const size = Math.min(width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      const uvX = ((x - centerX) / size) * 2.0;
      const uvY = ((y - centerY) / size) * 2.0;

      const distance = Math.sqrt(uvX * uvX + uvY * uvY);
      const targetHover = distance < 0.8 ? 1 : 0;

      // Smooth interpolation for hover state
      const currentHover = program.uniforms.hover.value;
      program.uniforms.hover.value += (targetHover - currentHover) * 0.1;
    } catch (err) {
      console.error("Error in mouse move:", err);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const program = programRef.current;
    if (program) {
      try {
        program.uniforms.hover.value = 0;
      } catch (err) {
        console.error("Error in mouse leave:", err);
      }
    }
  }, []);

  useEffect(() => {
    const container = ctnDom.current;
    if (!container) return;

    try {
      // Check if WebGL is supported
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setError("WebGL is not supported in this browser");
        return;
      }

      // Create renderer with better WebGL context options
      const renderer = new Renderer({
        alpha: true,
        premultipliedAlpha: false,
        antialias: true,
        powerPreference: "high-performance",
      });
      rendererRef.current = renderer;

      const glContext = renderer.gl;
      glContext.clearColor(0, 0, 0, 0);
      container.appendChild(glContext.canvas);

      // Create geometry and program
      const geometry = new Triangle(glContext);
      const program = new Program(glContext, {
        vertex: vert,
        fragment: frag,
        uniforms: {
          iTime: { value: 0 },
          iResolution: {
            value: new Vec3(
              glContext.canvas.width,
              glContext.canvas.height,
              glContext.canvas.width / glContext.canvas.height
            ),
          },
          hue: { value: hue },
          hover: { value: 0 },
          rot: { value: 0 },
          hoverIntensity: { value: hoverIntensity },
        },
      });
      programRef.current = program;

      const mesh = new Mesh(glContext, { geometry, program });
      meshRef.current = mesh;

      // Set up event listeners
      window.addEventListener("resize", resize);
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);

      // Initial resize
      resize();

      // Animation variables
      let lastTime = 0;
      let currentRot = 0;
      const rotationSpeed = 0.3;

      // Animation loop with better performance
      const update = (t: number) => {
        rafIdRef.current = requestAnimationFrame(update);

        try {
          const dt = (t - lastTime) * 0.001;
          lastTime = t;

          if (program && mesh) {
            program.uniforms.iTime.value = t * 0.001;
            program.uniforms.hue.value = hue;
            program.uniforms.hoverIntensity.value = hoverIntensity;

            const effectiveHover = forceHoverState
              ? 1
              : program.uniforms.hover.value;

            if (rotateOnHover && effectiveHover > 0.5) {
              currentRot += dt * rotationSpeed;
            }
            program.uniforms.rot.value = currentRot;

            renderer.render({ scene: mesh });
          }
        } catch (err) {
          console.error("Error in animation loop:", err);
          setError("Animation error occurred");
        }
      };

      rafIdRef.current = requestAnimationFrame(update);
    } catch (err) {
      console.error("Error initializing orb:", err);
      setError("Failed to initialize orb background");
    }

    // Cleanup function
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      window.removeEventListener("resize", resize);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
        const renderer = rendererRef.current;
        if (renderer && renderer.gl.canvas && renderer.gl.canvas.parentNode) {
          container.removeChild(renderer.gl.canvas);
        }
      }

      // Clean up WebGL resources
      const renderer = rendererRef.current;
      if (renderer) {
        try {
          const loseContext = renderer.gl.getExtension("WEBGL_lose_context");
          if (loseContext) {
            loseContext.loseContext();
          }
        } catch (err) {
          console.error("Error cleaning up WebGL context:", err);
        }
      }

      // Clear refs
      rendererRef.current = null;
      programRef.current = null;
      meshRef.current = null;
    };
  }, [
    hue,
    hoverIntensity,
    rotateOnHover,
    forceHoverState,
    resize,
    handleMouseMove,
    handleMouseLeave,
    frag,
    vert,
  ]);

  // Show error state if WebGL fails
  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">✨</div>
          <p className="text-lg opacity-75">Orb background unavailable</p>
          <p className="text-sm opacity-50 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return <div ref={ctnDom} className="w-full h-full" />;
}
