export type Color = {
  hex: string;
};

export type EyeDropperHookProps = {
  start: () => Promise<Color>;
  cancel?: () => unknown;
};

interface ColorSelectionOptions {
  signal?: AbortSignal;
}

interface ColorSelectionResult {
  sRGBHex: string;
}

interface EyeDropper {
  open: (options: ColorSelectionOptions) => Promise<ColorSelectionResult>;
}

interface EyeDropperConstructor {
  new (): EyeDropper;
}

declare global {
  interface Window {
    EyeDropper: EyeDropperConstructor;
  }
}
