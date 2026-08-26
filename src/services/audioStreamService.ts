// Real-Time Audio Streaming & Browser Audio API Handler

export interface AudioFrequencyData {
  bufferLength: number;
  dataArray: Uint8Array;
}

export class AudioStreamService {
  private mediaStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private recognition: any = null;
  private isListening: boolean = false;

  // Initialize Microphone & Web Audio API Analyser
  public async initAudioInput(): Promise<boolean> {
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioCtx();
      
      const source = this.audioContext.createMediaStreamSource(this.mediaStream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 64;
      source.connect(this.analyser);

      return true;
    } catch (err) {
      console.warn('Microphone access simulation mode active:', err);
      return false;
    }
  }

  // Get real-time frequency data for Canvas Visualizer
  public getFrequencyData(): Uint8Array {
    if (this.analyser) {
      const bufferLength = this.analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      this.analyser.getByteFrequencyData(dataArray);
      return dataArray;
    }
    // Fallback simulated frequency array for canvas testing
    const fallback = new Uint8Array(32);
    for (let i = 0; i < 32; i++) {
      fallback[i] = Math.floor(Math.random() * 128) + 20;
    }
    return fallback;
  }

  // Web Speech API Text-To-Speech Synthesis
  public speakText(text: string, onEnd?: () => void): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      if (onEnd) {
        utterance.onend = onEnd;
      }
      window.speechSynthesis.speak(utterance);
    } else if (onEnd) {
      setTimeout(onEnd, 2000);
    }
  }

  // Web Speech API Speech-To-Text Recognition
  public startSpeechRecognition(
    onResult: (transcript: string, isFinal: boolean) => void,
    onError?: (err: any) => void
  ): void {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('Web Speech Recognition API not supported in browser, using input buffer simulation.');
      return;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          onResult(finalTranscript, true);
        } else if (interimTranscript) {
          onResult(interimTranscript, false);
        }
      };

      this.recognition.onerror = (err: any) => {
        if (onError) onError(err);
      };

      this.recognition.start();
      this.isListening = true;
    } catch (e) {
      console.warn('Speech recognition init error:', e);
    }
  }

  public stopSpeechRecognition(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public cleanup(): void {
    this.stopSpeechRecognition();
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}
