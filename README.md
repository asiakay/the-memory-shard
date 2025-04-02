
# 🌌 Memory Shard

*A reactive digital artifact that glitches in response to user interaction. Built with p5.js and Web Audio API.*

![Demo GIF](https://cdn.glitch.global/da5ab1ea-ed7c-4e18-ac7e-ca8a1904b825/shard-demo.gif?v=1)  
*(Example screenshot - replace with your own)*

## ✨ Features
- **Dynamic Hovering**: Shard orbits cursor with organic motion
- **Glitch Mode**: Toggle chaotic distortions on click
- **Procedural Audio**: Optional synthesized hum/crackles (Web Audio)
- **Fullscreen Immersion**: Responsive edge-to-edge display

## 🛠 Setup
1. **On Glitch**:
   - Remix this project: [![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/memory-shard-orbit)
   - Upload your transparent PNG to `assets/`

2. **Locally**:
   ```bash
   git clone https://github.com/your-repo/memory-shard.git
   cd memory-shard
   python3 -m http.server  # Open browser to localhost:8000
   ```
   
## 🎛 Customization

| File        | Purpose                                   |
|-------------|-------------------------------------------|
| `script.js` | Main visual logic (hover physics, glitch effects) |
| `sound.js`  | Audio synthesis (optional)                |
| `style.css` | Fullscreen/display settings               |

**Key Parameters**:
```javascript
// script.js
let hoverRadius = 50;  // Orbit size
let glitchIntensity = 15; // Distortion amount
const trailOpacity = 25; // Motion trail visibility
```
## 🌐 Deployment

**Glitch**: Runs instantly when remixed

**Static Hosting**: Upload these files:
- `/index.html`
- `/assets/` 
- JS files (`script.js`, `sound.js`)

To services like:
- GitHub Pages
- Netlify/Vercel 
- Fleek.co (IPFS)

## 🤝 Contributing

Bug reports and feature requests welcome!  
Please open an issue first for major changes.

## 📄 License 

MIT - Use freely with attribution