"use client";
import { cn } from "@/lib/utils";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

export const CanvasRevealEffect = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize,
  showGradient = true,
}: {
  /**
   * 0.1 to 2
   */
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
}) => {
  return (
    <div className={cn("h-full relative w-full", containerClassName)}>
      <div className="h-full w-full">
        <DotMatrix
          colors={colors ?? [[0, 255, 255]]}
          dotSize={dotSize ?? 3}
          opacities={
            opacities ?? [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]
          }
          shader={`
              float animation_speed_factor = ${animationSpeed.toFixed(1)};
              float intro_offset = distance(u_resolution / 2.0 / u_total_size, st);
              float timeString = u_time * animation_speed_factor - intro_offset;
              float main_pos = 0.0;
              if (timeString > 0.0) {
                main_pos = mod(timeString, 30.0);
              }

              vec3 color = vec3(0.0);
              for (int i = 0; i < ${colors.length}; i++) {
                color += u_colors[i] * get_layer(main_pos, intro_offset, i);
              }
              gl_FragColor = vec4(color, get_opacity(main_pos, intro_offset));
            `}
        />
      </div>
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent" />
      )}
    </div>
  );
};

interface DotMatrixProps {
  colors: number[][];
  opacities: number[];
  sources?: number[];
  shader: string;
  center?: ("x" | "y")[];
  dotSize?: number;
}

const DotMatrix: React.FC<DotMatrixProps> = ({
  colors,
  opacities,
  shader,
  center = ["x", "y"],
  dotSize = 3,
}) => {
  const uniforms = useMemo(() => {
    let colorsArray = [
      new THREE.Color(
        colors[0][0] / 255,
        colors[0][1] / 255,
        colors[0][2] / 255
      ),
    ];
    if (colors.length > 1) {
      colorsArray = colors.map(
        (c) => new THREE.Color(c[0] / 255, c[1] / 255, c[2] / 255)
      );
    }
    return {
      u_colors: { value: colorsArray },
      u_opacities: { value: opacities },
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2() },
      u_total_size: { value: dotSize },
      u_dot_size: { value: 1.2 },
    };
  }, [colors, opacities, dotSize]);

  return (
    <Canvas>
      <Shader
        source={`
        precision mediump float;
        uniform vec2 u_resolution;
        uniform float u_time;
        uniform vec3 u_colors[${colors.length}];
        uniform float u_opacities[10];
        uniform float u_total_size;
        uniform float u_dot_size;

        float get_layer(float time, float offset, int color_index) {
          float i = float(color_index);
          float layer = 0.0;
          float pulse = sin(time - offset * (i + 1.0) / 2.0);
          if (pulse > 0.8) {
            layer = 1.0;
          }
          return layer;
        }

        float get_opacity(float time, float offset) {
          return 1.0;
        }

        void main() {
          vec2 st = gl_FragCoord.xy / u_resolution.xy;
          ${shader}
        }
      `}
        uniforms={uniforms}
        maxRadius={2}
      />
    </Canvas>
  );
};

const Shader = ({ source, uniforms, maxRadius }: any) => {
  const { size } = useThree();
  const ref = useRef<any>(null);
  useFrame(({ clock }) => {
    ref.current.uniforms.u_time.value = clock.getElapsedTime();
  });

  useMemo(() => {
    if (ref.current) {
      ref.current.uniforms.u_resolution.value.set(size.width, size.height);
    }
  }, [size]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
      precision mediump float;
      varying vec2 vUv;
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
      fragmentShader: source,
      uniforms: uniforms,
    });
  }, [source, uniforms]);

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} ref={ref} attach="material" />
    </mesh>
  );
};
