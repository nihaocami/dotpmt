import fs from "fs";
import path from "path";

export function loadPrompt(
  filePath: string,
  vars: Record<string, string> = {}
): string {
  const fullPath = path.resolve(filePath);
  let prompt = fs.readFileSync(fullPath, "utf-8");

  for (const [key, value] of Object.entries(vars)) {
    prompt = prompt.replaceAll(`{{${key}}}`, value);
  }

  return prompt;
}
