import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import "eyedropper-polyfill";

import { Color } from ".";
import { EyeDropperHookProps } from "./types";

export const useEyeDropper = (): EyeDropperHookProps => {
  const [pickingFromDocument, setPickingFromDocument] = useState(false);
  const eyeDropper = useMemo(() => new window.EyeDropper(), []);
  const abortController = useRef<AbortController>();

  const cancel = useCallback(() => {
    if (typeof abortController.current === "undefined") return;
    abortController.current.abort();
    setPickingFromDocument(false);
  }, [abortController, setPickingFromDocument]);

  const exitPickingByEsc = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "Escape" && pickingFromDocument) {
        cancel();
      }
    },
    [pickingFromDocument, cancel]
  );

  useEffect(() => {
    if (pickingFromDocument) {
      document.addEventListener("keydown", exitPickingByEsc);
    }
    return () => document.removeEventListener("keydown", exitPickingByEsc);
  }, [pickingFromDocument, exitPickingByEsc]);

  const start = useCallback(async () => {
    setPickingFromDocument(true);
    cancel();
    const controller = new AbortController();
    abortController.current = controller;
    const { sRGBHex } = await eyeDropper.open({ signal: controller.signal });
    const color: Color = {
      hex: sRGBHex,
    };
    return color;
  }, [eyeDropper, cancel]);

  return { start, cancel };
};
