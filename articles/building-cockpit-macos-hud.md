# Building Cockpit: A Zero-Cloud macOS & iPad Productivity HUD with Swift and SwiftUI

**By Yorben Vandersleyen** · [yorben.me](https://yorben.me) · GitHub: [@Yvsleyen00941](https://github.com/Yvsleyen00941)

---

As developers and students, our daily workflow is constantly fragmented. In any given hour, we alternate between a code editor, calendar notifications, music controls, Notion project trackers, and email threads. 

Most modern tools attempt to solve this by introducing yet another Electron app or web dashboard that consumes 2GB of RAM and sends telemetry across the cloud. 

I wanted something different: a **purely native, zero-cloud productivity heads-up display (HUD)** engineered specifically for the Apple ecosystem. That project is **[Cockpit](https://github.com/Yvsleyen00941/Cockpit)**.

---

## The Vision: Turning the iPad into a Physical Control Surface

The core concept behind Cockpit is treating the iPad resting next to your MacBook keyboard not as a secondary passive display, but as an active physical control surface:

1. **Contextual Action Keys**: Keys adapt dynamically to whatever application has frontmost focus (Xcode, Safari, Terminal, Notion, Finder).
2. **Four-Quadrant System Vitals**: Real-time monitoring of local services, focus states, music playback, and calendar scheduling without opening browser tabs.
3. **Daily Planner Engine**: A unified morning briefing combining local calendar items, top-3 priorities, and local Pomodoro deep-work timers.

---

## Architectural Breakdown

Cockpit is composed of two native Swift applications communicating seamlessly with **zero third-party dependencies**:

```
+-------------------------------------------------------------+
|                     macOS Workstation                       |
|  [ ControlCenter Helper (Daemon / Menu Bar Service) ]        |
|  - System Vitals, Calendar EventKit, Music ScriptingBridge  |
+-------------------------------------------------------------+
                             ▲
                             │ (End-to-End Encrypted TCP/USB)
                             ▼
+-------------------------------------------------------------+
|                      iPad / iOS Client                      |
|  [ Cockpit Touch HUD (SwiftUI + Live Activities) ]          |
|  - Real-time quadrant rendering, 120Hz ProMotion interaction|
+-------------------------------------------------------------+
```

### 1. Peer-to-Peer Local Connectivity
Instead of relying on remote servers or WebSockets through an external broker, Cockpit establishes a direct peer-to-peer connection over local Wi-Fi or high-speed USB-C using Apple's `Network.framework`. All packets are end-to-end encrypted locally. If the internet goes down, your HUD remains 100% operational.

### 2. High-Performance SwiftUI Layout
Rendering rich data cards with sub-millisecond response requires avoiding excessive state invalidations. Cockpit isolates each quadrant (`Vitals`, `Schedule`, `Focus`, `Media`) into independent Observable models with targeted state projections.

---

## Open Source & Community

Cockpit is completely free and open-source under the MIT license. 

- **Live Showcase & Portfolio:** [yorben.me](https://yorben.me)
- **GitHub Repository:** [github.com/Yvsleyen00941/Cockpit](https://github.com/Yvsleyen00941/Cockpit)
- **Install via Homebrew:**
  ```bash
  brew tap Yvsleyen00941/tap
  brew install Yvsleyen00941/tap/cockpit
  ```

Whether you're building native Mac software or looking to streamline your desk setup, explore the code, star the repository, and feel free to contribute!
