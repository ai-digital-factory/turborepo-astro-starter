/// <reference types="astro/client" />

declare var Astro: Readonly<import("astro").AstroGlobal>;

declare module "*.svg" {
  const content: {
    src: string;
    width: number;
    height: number;
  };
  export default content;
}
