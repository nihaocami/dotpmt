import { loadPrompt } from "../src/index";
import fs from "fs";
import path from "path";

const tempDir = path.join(__dirname, "temp");
const testFilePath = path.join(tempDir, "example.pmt");

beforeAll(() => {
  fs.mkdirSync(tempDir, { recursive: true });
  fs.writeFileSync(testFilePath, "Hello, {{name}}!");
});

afterAll(() => {
  fs.rmSync(tempDir, { recursive: true, force: true });
});

test("loadPrompt replaces variables in a .pmt file", () => {
  const result = loadPrompt(testFilePath, { name: "World" });
  expect(result).toBe("Hello, World!");
});
