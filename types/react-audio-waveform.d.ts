declare module "react-audio-waveform" {
  import { Component } from "react";

  interface ReactAudioWaveformProps {
    barGap?: number;
    barWidth?: number;
    fftSize?: number;
    height?: number;
    width?: number;
    strokeColor?: string;
    url: string;
    backgroundColor?: string;
  }

  export default class ReactAudioWaveform extends Component<ReactAudioWaveformProps> {}
}
