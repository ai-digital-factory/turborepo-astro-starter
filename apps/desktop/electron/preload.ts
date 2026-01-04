import { ipcRenderer, contextBridge } from "electron";

// Whitelist of allowed channels
const ALLOWED_CHANNELS = ["main-process-message"] as const;

export type AllowedChannel = (typeof ALLOWED_CHANNELS)[number];

export interface IpcRendererApi {
  on(
    channel: AllowedChannel,
    listener: (...args: unknown[]) => void,
  ): (() => void) | undefined;
  off(channel: AllowedChannel, listener: (...args: unknown[]) => void): void;
  send(channel: AllowedChannel, ...args: unknown[]): void;
  invoke(channel: AllowedChannel, ...args: unknown[]): Promise<unknown>;
}

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("ipcRenderer", {
  on(channel: AllowedChannel, listener: (...args: unknown[]) => void) {
    if (ALLOWED_CHANNELS.includes(channel)) {
      const subscription = (
        _event: Electron.IpcRendererEvent,
        ...args: unknown[]
      ) => listener(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    }
  },
  off(channel: AllowedChannel, listener: (...args: unknown[]) => void) {
    if (ALLOWED_CHANNELS.includes(channel)) {
      ipcRenderer.removeListener(
        channel,
        listener as unknown as (
          event: Electron.IpcRendererEvent,
          ...args: unknown[]
        ) => void,
      );
    }
  },
  send(channel: AllowedChannel, ...args: unknown[]) {
    if (ALLOWED_CHANNELS.includes(channel)) {
      ipcRenderer.send(channel, ...args);
    }
  },
  invoke(channel: AllowedChannel, ...args: unknown[]) {
    if (ALLOWED_CHANNELS.includes(channel)) {
      return ipcRenderer.invoke(channel, ...args);
    }
  },

  // You can expose other APIs you need here.
  // ...
});
