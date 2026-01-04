/// <reference types="vite/client" />

import type { IpcRendererApi } from "../electron/preload";

declare global {
  interface Window {
    // expose in the `electron/preload.ts`
    ipcRenderer: IpcRendererApi;
  }
}
