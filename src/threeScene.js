import * as THREE from 'three';

export class LandingPlatformScene {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 2.5, 18);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scrollY = 0;
    this.targetScrollY = 0;
    this.clock = new THREE.Clock();

    this.initLights();
    this.initPlatformGrid();
    this.initHexagonalPlatform();
    this.initHoveringPayload();
    this.initFloatingNodes();
    this.initStarfield();
    this.initEvents();
    this.animate();
  }

  initLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    this.scene.add(ambientLight);

    // Primary Electric Cyan Point Light
    this.cyanLight = new THREE.PointLight(0x00f5ff, 8, 60);
    this.cyanLight.position.set(8, 12, 10);
    this.scene.add(this.cyanLight);

    // Secondary Neon Violet Point Light
    this.violetLight = new THREE.PointLight(0x8b5cf6, 8, 60);
    this.violetLight.position.set(-8, -6, 8);
    this.scene.add(this.violetLight);

    // Upward Platform Thruster Light
    this.thrusterLight = new THREE.PointLight(0x00f5ff, 6, 25);
    this.thrusterLight.position.set(0, -2, 0);
    this.scene.add(this.thrusterLight);
  }

  initPlatformGrid() {
    // Cyber Coordinate Grid underneath platform
    this.groundGrid = new THREE.GridHelper(80, 40, 0x00f5ff, 0x1e2430);
    this.groundGrid.position.y = -6;
    this.groundGrid.material.opacity = 0.35;
    this.groundGrid.material.transparent = true;
    this.scene.add(this.groundGrid);
  }

  initHexagonalPlatform() {
    this.platformGroup = new THREE.Group();
    // Positioned on the right for desktop hero, dynamically shifts on scroll
    this.isDesktop = window.innerWidth >= 960;
    this.baseX = this.isDesktop ? 4.2 : 0;
    this.baseY = this.isDesktop ? -0.8 : -1.5;
    this.platformGroup.position.set(this.baseX, this.baseY, 0);

    // 1. Base Tier: Hexagonal Landing Platform
    const hexGeom = new THREE.CylinderGeometry(5.2, 5.8, 0.7, 6);
    const hexMat = new THREE.MeshStandardMaterial({
      color: 0x0a0d16,
      roughness: 0.25,
      metalness: 0.9,
      emissive: 0x031525,
      emissiveIntensity: 0.4,
    });
    this.hexBase = new THREE.Mesh(hexGeom, hexMat);
    this.platformGroup.add(this.hexBase);

    // Glowing Hexagonal Edges
    const edgesGeom = new THREE.EdgesGeometry(hexGeom);
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0x00f5ff,
      linewidth: 2,
      transparent: true,
      opacity: 0.85,
    });
    this.hexEdges = new THREE.LineSegments(edgesGeom, edgesMat);
    this.hexBase.add(this.hexEdges);

    // 2. Second Elevated Surface Tier
    const innerGeom = new THREE.CylinderGeometry(4.4, 4.6, 0.4, 6);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x0e111a,
      roughness: 0.2,
      metalness: 0.95,
      emissive: 0x140e28,
      emissiveIntensity: 0.5,
    });
    this.innerTier = new THREE.Mesh(innerGeom, innerMat);
    this.innerTier.position.y = 0.5;
    this.platformGroup.add(this.innerTier);

    const innerEdgesGeom = new THREE.EdgesGeometry(innerGeom);
    const innerEdgesMat = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.9,
    });
    this.innerTier.add(new THREE.LineSegments(innerEdgesGeom, innerEdgesMat));

    // 3. Platform Landing Rings & Radar Markings
    const ringGeom = new THREE.RingGeometry(3.2, 3.35, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });
    this.landingRing = new THREE.Mesh(ringGeom, ringMat);
    this.landingRing.rotation.x = Math.PI / 2;
    this.landingRing.position.y = 0.72;
    this.platformGroup.add(this.landingRing);

    const ringGeom2 = new THREE.RingGeometry(2.1, 2.22, 32);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
    });
    this.landingRing2 = new THREE.Mesh(ringGeom2, ringMat2);
    this.landingRing2.rotation.x = Math.PI / 2;
    this.landingRing2.position.y = 0.73;
    this.platformGroup.add(this.landingRing2);

    // 4. Platform Perimeter Thruster Nodes (6 corners)
    this.thrusterNodes = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 5.3;
      const tx = Math.cos(angle) * radius;
      const tz = Math.sin(angle) * radius;

      const thrusterGeom = new THREE.CylinderGeometry(0.35, 0.45, 0.5, 12);
      const thrusterMat = new THREE.MeshStandardMaterial({
        color: 0x090c14,
        emissive: 0x00f5ff,
        emissiveIntensity: 0.8,
      });
      const thrusterMesh = new THREE.Mesh(thrusterGeom, thrusterMat);
      thrusterMesh.position.set(tx, -0.2, tz);
      this.platformGroup.add(thrusterMesh);
      this.thrusterNodes.push(thrusterMesh);
    }

    this.scene.add(this.platformGroup);
  }

  initHoveringPayload() {
    this.payloadGroup = new THREE.Group();
    this.payloadGroup.position.set(0, 3.2, 0); // Levitating directly above the landing platform

    // High-Dimensional Vector Core (Torus Knot)
    const coreGeom = new THREE.TorusKnotGeometry(1.6, 0.45, 100, 20, 2, 3);

    // Solid core body
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x081020,
      emissive: 0x00f5ff,
      emissiveIntensity: 0.5,
      roughness: 0.15,
      metalness: 0.95,
      transparent: true,
      opacity: 0.88,
    });
    this.coreMesh = new THREE.Mesh(coreGeom, coreMat);
    this.payloadGroup.add(this.coreMesh);

    // Neon Wireframe Cage
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.95,
    });
    this.coreWire = new THREE.Mesh(coreGeom, wireMat);
    this.coreWire.scale.set(1.03, 1.03, 1.03);
    this.payloadGroup.add(this.coreWire);

    // Glowing Vertex Points (1536-d Vector Cluster)
    const pointsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.25,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    this.corePoints = new THREE.Points(coreGeom, pointsMat);
    this.corePoints.scale.set(1.05, 1.05, 1.05);
    this.payloadGroup.add(this.corePoints);

    // Orbiting Data Ring
    const orbitGeom = new THREE.RingGeometry(3.0, 3.12, 48);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    this.orbitRing = new THREE.Mesh(orbitGeom, orbitMat);
    this.orbitRing.rotation.x = Math.PI / 3;
    this.payloadGroup.add(this.orbitRing);

    // Orbiting Satellite Node (Worker Service)
    const satGeom = new THREE.SphereGeometry(0.2, 16, 16);
    const satMat = new THREE.MeshBasicMaterial({ color: 0x00f5ff });
    this.satMesh = new THREE.Mesh(satGeom, satMat);
    this.payloadGroup.add(this.satMesh);

    this.platformGroup.add(this.payloadGroup);
  }

  initFloatingNodes() {
    this.floatingPolyhedra = [];
    const geometries = [
      new THREE.IcosahedronGeometry(0.9, 0),
      new THREE.OctahedronGeometry(1.0, 0),
      new THREE.DodecahedronGeometry(0.85, 0),
      new THREE.TetrahedronGeometry(1.1, 0),
    ];

    for (let i = 0; i < 8; i++) {
      const geom = geometries[i % geometries.length];
      const color = i % 2 === 0 ? 0x00f5ff : 0x8b5cf6;

      const group = new THREE.Group();
      const solid = new THREE.Mesh(
        geom,
        new THREE.MeshStandardMaterial({
          color: 0x090d18,
          emissive: color,
          emissiveIntensity: 0.4,
          roughness: 0.2,
          metalness: 0.9,
          transparent: true,
          opacity: 0.75,
        })
      );
      group.add(solid);

      const wire = new THREE.Mesh(
        geom,
        new THREE.MeshBasicMaterial({ color: color, wireframe: true, transparent: true, opacity: 0.9 })
      );
      wire.scale.set(1.05, 1.05, 1.05);
      group.add(wire);

      // Disperse around scene depth
      const angle = (i / 8) * Math.PI * 2;
      const radius = 9 + Math.random() * 5;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * 4;
      const z = (Math.random() - 0.5) * 10 - 2;

      group.position.set(x, y, z);
      this.floatingPolyhedra.push({
        group,
        baseX: x,
        baseY: y,
        speed: 0.8 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
      });

      this.scene.add(group);
    }
  }

  initStarfield() {
    const count = 900;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const palette = [
      new THREE.Color(0x00f5ff),
      new THREE.Color(0x8b5cf6),
      new THREE.Color(0xffffff),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 80;
      positions[i3 + 2] = (Math.random() - 0.5) * 60 - 5;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.starfield = new THREE.Points(geometry, material);
    this.scene.add(this.starfield);
  }

  initEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('scroll', () => {
      this.targetScrollY = window.scrollY;
    }, { passive: true });

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      this.isDesktop = window.innerWidth >= 960;
      this.baseX = this.isDesktop ? 4.2 : 0;
      this.baseY = this.isDesktop ? -0.8 : -1.5;
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Smooth inertia interpolation
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.06;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.06;
    this.scrollY += (this.targetScrollY - this.scrollY) * 0.08;

    // Calculate normalized scroll depth (0.0 to 1.0)
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scrollProgress = Math.min(1, this.scrollY / maxScroll);

    // ==========================================
    // SCROLL-DRIVEN 3D PLATFORM KINEMATICS
    // ==========================================
    if (this.platformGroup) {
      // 1. Position Interpolation on Scroll:
      // Hero (0.0): Platform sits proudly on right side in isometric view.
      // Architecture (0.25 - 0.4): Slides toward center, elevating slightly.
      // Deep Sections (0.6 - 1.0): Recedes into the coordinate horizon.
      const targetX = this.baseX * (1 - scrollProgress * 1.5);
      const targetY = this.baseY - (scrollProgress * 4.5);
      const targetZ = -(scrollProgress * 8);

      this.platformGroup.position.x += (targetX - this.platformGroup.position.x) * 0.08;
      this.platformGroup.position.y += (targetY - this.platformGroup.position.y) * 0.08;
      this.platformGroup.position.z += (targetZ - this.platformGroup.position.z) * 0.08;

      // 2. Platform 3D Rotation Kinematics:
      // As user scrolls, the platform tilts on its X/Y axes into a technical blueprint perspective!
      const scrollRotationX = 0.45 + (scrollProgress * 0.6); // Tilts upward
      const autoRotationY = elapsedTime * 0.35 + (this.scrollY * 0.003); // Spins smoothly with scroll depth

      this.platformGroup.rotation.x = scrollRotationX + (this.mouse.y * 0.15);
      this.platformGroup.rotation.y = autoRotationY + (this.mouse.x * 0.25);
      this.platformGroup.rotation.z = (this.mouse.x * -0.08);

      // Rotate Landing Platform Radar Rings
      if (this.landingRing) this.landingRing.rotation.z -= 0.01;
      if (this.landingRing2) this.landingRing2.rotation.z += 0.015;

      // Pulse thruster perimeter nodes
      for (let i = 0; i < this.thrusterNodes.length; i++) {
        const node = this.thrusterNodes[i];
        const pulse = 0.5 + 0.5 * Math.sin(elapsedTime * 4 + i);
        node.scale.set(1 + pulse * 0.1, 1 + pulse * 0.1, 1 + pulse * 0.1);
      }
    }

    // Animate Hovering Payload on Platform
    if (this.payloadGroup) {
      // Zero-G levitation sine wave
      const floatY = 3.2 + Math.sin(elapsedTime * 1.8) * 0.35;
      this.payloadGroup.position.y = floatY;

      // Rotate payload core
      this.coreMesh.rotation.x = elapsedTime * 0.6;
      this.coreMesh.rotation.y = elapsedTime * 0.9;
      this.coreWire.rotation.x = this.coreMesh.rotation.x;
      this.coreWire.rotation.y = this.coreMesh.rotation.y;
      this.corePoints.rotation.x = this.coreMesh.rotation.x;
      this.corePoints.rotation.y = this.coreMesh.rotation.y;

      // Orbit satellite node around payload
      const satAngle = elapsedTime * 2.5;
      this.satMesh.position.set(
        Math.cos(satAngle) * 3.0,
        Math.sin(satAngle * 0.7) * 1.2,
        Math.sin(satAngle) * 3.0
      );
      this.orbitRing.rotation.z -= 0.012;
    }

    // Camera inertia
    this.camera.position.x = this.mouse.x * 1.2;
    this.camera.position.y = 2.5 + (this.mouse.y * 0.8) - (scrollProgress * 2.0);
    this.camera.lookAt(0, -(scrollProgress * 2.5), 0);

    // Forward motion on Ground Grid
    if (this.groundGrid) {
      this.groundGrid.position.z = (elapsedTime * 3.0) % 4;
    }

    // Animate Starfield
    if (this.starfield) {
      this.starfield.rotation.y = elapsedTime * 0.02 + this.mouse.x * 0.04;
    }

    // Animate Floating Polyhedra
    for (let i = 0; i < this.floatingPolyhedra.length; i++) {
      const p = this.floatingPolyhedra[i];
      p.group.rotation.x += 0.01;
      p.group.rotation.y += 0.015;

      const wave = Math.sin(elapsedTime * p.speed + p.phase) * 0.8;
      p.group.position.x = p.baseX + (this.mouse.x * 1.5);
      p.group.position.y = p.baseY + wave - (this.scrollY * 0.005);
    }

    this.renderer.render(this.scene, this.camera);
  }
}
