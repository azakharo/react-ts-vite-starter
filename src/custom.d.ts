/// <reference types="vite-plugin-svgr/client" />

declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.module.css' {
  const content: Record<string, string>;
  export default content;
}
