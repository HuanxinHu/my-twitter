/// <reference types="react-scripts" />

declare module '*.less' {
  const resource: { [key: string]: string };
  export = resource;
}
