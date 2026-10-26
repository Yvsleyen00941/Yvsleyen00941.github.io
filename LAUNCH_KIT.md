# Developer Promotion & Launch Kit for yorben.me

Targeting **Cockpit** (macOS/iPadOS HUD) and **Waybill** (iPadOS 3D RealityKit Idle Game).  
*All campaigns preserve 100% privacy for Cairn.*

---

## 🚀 Channel 1: Reddit Community Campaigns

### Subreddit 1: `r/SwiftUI` (Audience: 60k+ iOS/macOS engineers)
- **Best Time:** Tuesday / Thursday 15:00 - 17:00 CET (09:00 - 11:00 EST)
- **Flair:** `Showcase` or `Project`
- **Title:** `I built a zero-cloud macOS & iPad productivity HUD with Swift 5.10 and SwiftUI (open-source)`
- **Body:**
```markdown
Hey everyone! As a student balancing coursework and side projects, my screen was always cluttered with calendar tabs, music controls, Notion pages, and mail inboxes.

I wanted a native, zero-cloud heads-up display that turns an iPad next to my keyboard into an active control surface.

I ended up building **Cockpit**:
- **Peer-to-Peer Encryption**: Connects directly via Wi-Fi or USB-C using Network.framework — zero cloud dependency, no telemetry.
- **Contextual Key Actions**: Keys adapt based on which Mac app currently has focus.
- **Pure SwiftUI Architecture**: Decoupled state observers to keep 120Hz scrolling butter-smooth.

The code is MIT licensed, and you can install it directly via Homebrew:
```bash
brew tap Yvsleyen00941/tap
brew install cockpit
```

Website & live interactive breakdown: https://yorben.me/#cockpit  
GitHub Repository: https://github.com/Yvsleyen00941/Cockpit

Would love feedback on the architecture and SwiftUI view structure!
```

---

### Subreddit 2: `r/macapps` (Audience: 110k+ Mac power users)
- **Flair:** `Free / Open Source`
- **Title:** `Cockpit: A free, native macOS menu-bar and iPad desk HUD for deep focus`
- **Body:**
```markdown
Hi all! I built a free, open-source daily companion app for macOS and iPad. 

Instead of opening 4 different browser windows, Cockpit brings together:
1. Daily schedule and clashes between local Calendar & Notion tasks
2. Live Mac vitals and Focus mode status
3. System music controls and triage queues
4. Zero third-party analytics or external cloud servers

Available via Homebrew or source:
`brew tap Yvsleyen00941/tap && brew install cockpit`

Interactive showcase: https://yorben.me/#cockpit
Repo: https://github.com/Yvsleyen00941/Cockpit
```

---

### Subreddit 3: `r/iOSProgramming` (Audience: 130k+ Apple devs)
- **Title:** `Building a 3D logistics idle game for iPad using RealityKit & SwiftUI (Waybill)`
- **Body:**
```markdown
Hey devs! I've been experimenting with Apple's RealityKit on iPadOS to build a tactile logistics idle game called **Waybill**.

Most idle games use static 2D sprites. With RealityKit and `RealityView`, we get:
- Real-time physics dispatch for trucks, cargo ships, and freight trains
- Dynamic Metal lighting and spatial audio
- Mathematical balance simulation modeled in Python before writing game code

The entire project is open-source:
Repo: https://github.com/Yvsleyen00941/Waybill
Showcase: https://yorben.me/#waybill

Happy to answer any questions about RealityKit performance on Apple Silicon!
```

---

## ⚡ Channel 2: Hacker News (Show HN)

- **URL to submit:** `https://yorben.me`
- **Title:** `Show HN: Cockpit – A native, zero-cloud macOS and iPad productivity HUD`
- **First Comment:**
```text
Hi HN! I'm a student at the University of Antwerp and built Cockpit to solve my own screen clutter. 

Cockpit turns an iPad resting next to your MacBook into a tactile control surface for your daily schedule, Notion tasks, Apple Music, and system vitals. 

Key architectural points:
- Peer-to-peer end-to-end encryption over local network or USB-C (Network.framework)
- Zero cloud backend, zero telemetry, no accounts required
- Fully open-source under MIT: https://github.com/Yvsleyen00941/Cockpit
- Installable via Homebrew: `brew tap Yvsleyen00941/tap && brew install cockpit`

Looking forward to your comments and feedback!
```

---

## ✍️ Channel 3: Dev.to & Hashnode Publishing

Publish the markdown files located in `/portfolio/articles/`:
1. `building-cockpit-macos-hud.md` -> Tag with `#swift #macos #swiftui #opensource`
2. `simulating-3d-logistics-dioramas-realitykit.md` -> Tag with `#gamedev #swift #apple #realitykit`
These platforms distribute articles to Google Discover and tech newsletters within hours.
