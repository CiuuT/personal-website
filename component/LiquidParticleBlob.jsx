'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ----------------------
// THREE.js Core Logic Helper
// ----------------------

// 2. 创建水滴纹理 - 在内存中生成一个带渐变的圆点
const createWaterTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d');
    
    const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
    // 调整为亮紫/白中心，边缘过渡到深靛蓝，以适应浅色背景
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)'); // 亮白中心
    gradient.addColorStop(0.4, 'rgba(150, 100, 255, 0.7)'); // 中间柔和紫
    gradient.addColorStop(1, 'rgba(34, 0, 119, 0)'); // 边缘透明，匹配深色内部

    context.fillStyle = gradient;
    context.fillRect(0, 0, 32, 32);

    return new THREE.CanvasTexture(canvas);
};

// ----------------------
// React Component
// ----------------------
export default function LiquidParticleBlob() {
    // DOM 容器的引用
    const mountRef = useRef(null);
    // 鼠标位置状态
    const mouse = useRef(new THREE.Vector2(9999, 9999));

    // ----------------------
    // 核心 useEffect
    // ----------------------
    useEffect(() => {
        // 确保代码只在客户端和 DOM 准备好后运行
        if (!mountRef.current) return;

        // --- 1. 常量和初始化 ---
        const particleCount = 12000;
        const sphereRadius = 120;
        
        // 颜色调整为深靛蓝和紫罗兰色，与用户的浅蓝背景形成强对比
        const colorInside = new THREE.Color(0x220077); // 深靛蓝
        const colorOutside = new THREE.Color(0x8844ff); // 亮紫罗兰

        let scene, camera, renderer, particles, geometry, originalPositions, velocities;
        let interactionPlane;
        const raycaster = new THREE.Raycaster();
        const clock = new THREE.Clock();
        let frameId;

        // --- 2. 鼠标事件处理函数 ---
        const handlePointerMove = (event) => {
            const container = mountRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();

            // 将鼠标坐标转换为容器内的相对坐标
            const clientX = event.touches ? event.touches[0].clientX : event.clientX;
            const clientY = event.touches ? event.touches[0].clientY : event.clientY;
            
            const x = clientX - rect.left;
            const y = clientY - rect.top;

            // 归一化设备坐标 (NDC)
            mouse.current.x = (x / rect.width) * 2 - 1;
            mouse.current.y = -(y / rect.height) * 2 + 1;
        };

        // --- 3. 初始化 Three.js 场景 ---
        const init = () => {
            const container = mountRef.current;
            if (!container) return;
            
            // 获取容器的实际尺寸 (关键改变)
            const width = container.clientWidth;
            const height = container.clientHeight;


            // 场景
            scene = new THREE.Scene();

            // 相机
            // 使用容器尺寸设置长宽比 (关键改变)
            camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
            camera.position.z = 400;

            // 渲染器 - 必须设置 alpha: true 才能透明
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(width, height); // 使用容器尺寸 (关键改变)
            renderer.setPixelRatio(window.devicePixelRatio);
            // 设置渲染器背景完全透明
            renderer.setClearColor(0x000000, 0); 
            container.appendChild(renderer.domElement);

            // 粒子属性数组 (此处省略不变的代码)
            geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            originalPositions = new Float32Array(particleCount * 3);
            velocities = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);
            const sizes = new Float32Array(particleCount);

            // 初始化粒子 (球体分布)
            for (let i = 0; i < particleCount; i++) {
                const phi = Math.acos(-1 + (2 * i) / particleCount);
                const theta = Math.sqrt(particleCount * Math.PI) * phi;
                
                const r = sphereRadius + (Math.random() - 0.5) * 10; 

                const x = r * Math.cos(theta) * Math.sin(phi);
                const y = r * Math.sin(theta) * Math.sin(phi);
                const z = r * Math.cos(phi);

                positions[i * 3] = x;
                positions[i * 3 + 1] = y;
                positions[i * 3 + 2] = z;

                originalPositions[i * 3] = x;
                originalPositions[i * 3 + 1] = y;
                originalPositions[i * 3 + 2] = z;

                // 颜色渐变
                const distanceFromCenter = Math.sqrt(x*x + y*y + z*z);
                const normalizeDist = distanceFromCenter / sphereRadius;
                const mixedColor = colorInside.clone().lerp(colorOutside, normalizeDist);
                
                colors[i * 3] = mixedColor.r;
                colors[i * 3 + 1] = mixedColor.g;
                colors[i * 3 + 2] = mixedColor.b;

                sizes[i] = Math.random() * 4 + 1;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

            // 材质
            const material = new THREE.PointsMaterial({
                size: 2,
                vertexColors: true,
                map: createWaterTexture(),
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                transparent: true,
                opacity: 0.9 // 提高不透明度，使其更突出
            });

            particles = new THREE.Points(geometry, material);
            scene.add(particles);

            // 交互平面
            const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
            const planeMaterial = new THREE.MeshBasicMaterial({ visible: false });
            interactionPlane = new THREE.Mesh(planeGeometry, planeMaterial);
            scene.add(interactionPlane);

            // 监听事件
            window.addEventListener('mousemove', handlePointerMove);
            window.addEventListener('touchmove', handlePointerMove, { passive: false });
            window.addEventListener('resize', onWindowResize);

            animate();
        };

        // --- 4. 窗口大小调整 ---
        const onWindowResize = () => {
            const container = mountRef.current;
            if (!container) return;
            const width = container.clientWidth;
            const height = container.clientHeight;

            camera.aspect = width / height; // 使用容器尺寸
            camera.updateProjectionMatrix();
            renderer.setSize(width, height); // 使用容器尺寸
        };

        // --- 5. 动画循环与物理计算 (此处省略不变的逻辑) ---
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            const time = clock.getElapsedTime();

            // 1. 让整个水团缓慢自转
            particles.rotation.y = time * 0.1;
            particles.rotation.z = time * 0.05;

            // 2. 获取鼠标在3D空间中的位置
            interactionPlane.lookAt(camera.position); 
            raycaster.setFromCamera(mouse.current, camera);
            const intersects = raycaster.intersectObject(interactionPlane);
            
            let point = new THREE.Vector3(9999, 9999, 9999);
            if (intersects.length > 0) {
                point = intersects[0].point;
                point.applyMatrix4(particles.matrixWorld.clone().invert());
            }

            // 3. 粒子物理更新 (CPU模拟)
            const positionsAttr = geometry.attributes.position;
            const count = positionsAttr.count;

            for (let i = 0; i < count; i++) {
                let px = positionsAttr.getX(i);
                let py = positionsAttr.getY(i);
                let pz = positionsAttr.getZ(i);

                const ox = originalPositions[i * 3];
                const oy = originalPositions[i * 3 + 1];
                const oz = originalPositions[i * 3 + 2];

                let vx = velocities[i * 3];
                let vy = velocities[i * 3 + 1];
                let vz = velocities[i * 3 + 2];

                // --- 物理力 1: 回弹力 (Spring force) ---
                const dx = ox - px;
                const dy = oy - py;
                const dz = oz - pz;
                
                vx += dx * 0.03; 
                vy += dy * 0.03;
                vz += dz * 0.03;

                // --- 物理力 2: 鼠标交互 (Repulsion) ---
                const distSq = (px - point.x) ** 2 + (py - point.y) ** 2 + (pz - point.z) ** 2;
                
                // 交互参数 (半径 120, 力度 22)
                if (distSq < 14400) { // 120 * 120
                    const dist = Math.sqrt(distSq);
                    const force = (120 - dist) / 120;
                    
                    const fx = (px - point.x) / dist;
                    const fy = (py - point.y) / dist;
                    const fz = (pz - point.z) / dist;

                    vx += fx * force * 22; 
                    vy += fy * force * 22;
                    vz += fz * force * 22;
                }

                // --- 物理力 3: 自然波动 (Light Breathing) ---
                vx += Math.sin(time * 2 + py * 0.05) * 0.02;
                vy += Math.cos(time * 1.5 + px * 0.05) * 0.02;

                // --- 阻尼 (Damping) ---
                vx *= 0.92;
                vy *= 0.92;
                vz *= 0.92;

                // 更新位置
                px += vx;
                py += vy;
                pz += vz;

                // 保存状态
                positionsAttr.setXYZ(i, px, py, pz);
                velocities[i * 3] = vx;
                velocities[i * 3 + 1] = vy;
                velocities[i * 3 + 2] = vz;
            }

            positionsAttr.needsUpdate = true;
            renderer.render(scene, camera);
        };

        // --- 6. 清理函数 (组件卸载时运行) ---
        init(); 

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('mousemove', handlePointerMove);
            window.removeEventListener('touchmove', handlePointerMove);
            window.removeEventListener('resize', onWindowResize);
            if (mountRef.current && renderer) {
                mountRef.current.removeChild(renderer.domElement);
                renderer.dispose();
            }
        };
    }, []); // 仅在组件挂载和卸载时运行


    return (
        <div 
            ref={mountRef} 
            className="fixed w-[80vw] h-[80vh] left-1/2 transform -translate-x-1/2 bottom-[-75px] z-[-1] overflow-hidden" 
        />
    );
}