export interface TTSState {
  isPlaying: boolean;
  text: string;
  progress: number;
}

type Subscriber = (state: TTSState) => void;

class TTSService {
  private isPlaying = false;
  private currentText = '';
  private progress = 0;
  private subscribers: Set<Subscriber> = new Set();
  private intervalId: number | null = null;

  subscribe(callback: Subscriber) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  private notify() {
    this.subscribers.forEach(sub => sub({
      isPlaying: this.isPlaying,
      text: this.currentText,
      progress: this.progress
    }));
  }

  play(text: string) {
    this.stop();
    this.isPlaying = true;
    this.currentText = text;
    this.progress = 0;
    this.notify();

    // Mock TTS playback: calculate duration based on text length
    // In a real app, this would call the backend TTS API (e.g., Volcengine)
    const duration = Math.max(text.length * 150, 2000); // ~150ms per character
    const step = 50; // Update every 50ms for smooth progress bar

    this.intervalId = window.setInterval(() => {
      this.progress += (step / duration) * 100;
      if (this.progress >= 100) {
        this.progress = 100;
        this.notify();
        this.stop();
      } else {
        this.notify();
      }
    }, step);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isPlaying = false;
    this.progress = 0;
    this.notify();
  }
}

export const ttsService = new TTSService();
