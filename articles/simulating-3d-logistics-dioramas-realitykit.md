# Simulating 3D Logistics Dioramas on iPadOS with RealityKit & SwiftUI

**By Yorben Vandersleyen** · [yorben.me](https://yorben.me) · GitHub: [@Yvsleyen00941](https://github.com/Yvsleyen00941)

---

Idle and logistics management games frequently suffer from generic 2D spreadsheets disguised as games. When designing **[Waybill](https://github.com/Yvsleyen00941/Waybill)**, my goal was to combine the addictive progression loops of supply-chain logistics with tactile, miniature **3D dioramas** powered by Apple's **RealityKit** engine on iPadOS.

Here is a look behind the scenes at how RealityKit, physics dispatch, and mathematical balance modeling came together.

---

## 1. Why RealityKit on iPadOS?

Traditionally, games on iOS are developed using Unity or SceneKit. However, RealityKit provides unique advantages for native Apple platforms:

- **Hardware-accelerated Metal rendering** optimized specifically for Apple Silicon (M-series chips).
- **Spatial Audio & Dynamic Lighting** that naturally adapts to camera angles.
- **First-class SwiftUI Integration** via `RealityView`, allowing declarative UI overlays to hover effortlessly above 3D models.

---

## 2. Five Dynamic Regions, Hand-Crafted Dioramas

In Waybill, progress moves through five distinct topological regions, each introducing unique physical constraints:

1. **Riverside**: Regional box-truck distribution and introductory four-step logistics chains.
2. **Harbour City**: Intermodal scheduling with cargo ships, berthing windows, and automated quay cranes.
3. **Granite Pass**: Heavy freight railway networks crossing suspension bridges and mountain tunnels.
4. **Metro**: High-density urban dispatch featuring autonomous delivery vans and eVTOL air taxi routes.
5. **Orbit**: Rocket staging, orbital payload launches, and booster landing telemetry.

```
Supply Source ──► Processing Hub ──► Intermodal Transit ──► Market Destination
  (Mining/Agri)     (Manufacturing)      (Ship / Train)          (Metropolis)
```

---

## 3. Real-Time Physics & Procedural Scheduling

Vehicles in Waybill are not simple prerendered animations; they are physics-enabled entities adhering to velocity, mass, braking curves, and collision bounds. 

When a cargo ship berths in Harbour City, quay cranes calculate inverse-kinematic paths to unload containers into waiting truck bays. If a bottleneck occurs, trucks queue physically along the highway, giving immediate visual feedback on logistical inefficiencies.

---

## 4. Rigorous Balance Simulation

An idle game lives and dies by its mathematical pacing. To ensure a playthrough takes approximately two and a half weeks of organic play (three short daily sessions, idle accumulation in between), the entire economy was modeled in Python (`balance.py`) simulating progression curves, cash-flow velocity, and upgrade costs before committing a single line of game code.

---

## Explore Waybill

Waybill is fully open-source under the MIT License:

- **Portfolio Showcase:** [yorben.me](https://yorben.me)
- **GitHub Repository:** [github.com/Yvsleyen00941/Waybill](https://github.com/Yvsleyen00941/Waybill)
- **Latest Release:** [v1.0.0](https://github.com/Yvsleyen00941/Waybill/releases/tag/v1.0.0)

Clone the repo, open it in Xcode, and launch your own logistics empire on iPad simulator or device!
