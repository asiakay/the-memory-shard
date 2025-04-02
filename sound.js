class MemoryShardAudio {
  constructor() {
    this.ctx = new (AudioContext || webkitAudioContext)();
    this.hum = null;
    this.enabled = false;
  }

  start() {
    if (this.enabled) return;
    
    // Atmospheric hum (detuned sine + noise)
    this.hum = this.ctx.createOscillator();
    const noise = this.ctx.createBufferSource();
    const filter = this.ctx.createBiquadFilter();
    
    // Configure
    this.hum.type = "sine";
    this.hum.frequency.value = 108;
    this.hum.detune.value = -7;
    
    // Noise buffer
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;
    noise.buffer = noiseBuffer;
    
    // Filter and routing
    filter.type = "lowpass";
    filter.frequency.value = 400;
    this.hum.connect(filter);
    noise.connect(filter);
    filter.connect(this.ctx.destination);
    
    // Start
    this.hum.start();
    noise.start();
    this.enabled = true;
  }

  triggerGlitch() {
    if (!this.enabled) return;
    
    // Crackle effect
    const crackle = this.ctx.createOscillator();
    const env = this.ctx.createGain();
    crackle.type = "square";
    crackle.frequency.value = 500 + Math.random() * 2000;
    env.gain.value = 0;
    env.gain.setValueAtTime(0.3, this.ctx.currentTime);
    env.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.1);
    
    crackle.connect(env).connect(this.ctx.destination);
    crackle.start();
    crackle.stop(this.ctx.currentTime + 0.1);
    
    // Hum distortion
    this.hum.frequency.setValueAtTime(50, this.ctx.currentTime);
    this.hum.frequency.exponentialRampToValueAtTime(108, this.ctx.currentTime + 0.8);
  }
}

export const audio = new MemoryShardAudio();