import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",  // for React testing
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    ...tsJestTransformCfg,
  },
};