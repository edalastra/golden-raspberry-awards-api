/** @type {import("jest").Config} **/
export default {
  rootDir: import.meta.dirname,
  testEnvironment: "node",
  displayName: "root-tests",
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  clearMocks: true,
  preset: "ts-jest/presets/default-esm",
	collectCoverageFrom: [
		"<rootDir>/src/**/*.ts",
		"!<rootDir>/src/tests/**",
		"!<rootDir>/src/config/**",
		"!<rootDir>/src/**/*server.ts",
		"!<rootDir>/src/**/*index.ts",
		"!<rootDir>/src/**/*router.ts"
	],
	coverageDirectory: "coverage"
};