import fs from "fs";
import path from "path";

export function loadPrompt(
  relativePath: string,
  variables: Record<string, string> = {}
): string {
  const callerFile = getCallerFile();
  const callerDir = path.dirname(callerFile);
  const fullPath = path.resolve(callerDir, relativePath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Prompt file not found at: ${fullPath}`);
  }

  let content = fs.readFileSync(fullPath, "utf8");

  for (const [key, value] of Object.entries(variables)) {
    content = content.replaceAll(`{{${key}}}`, value);
  }

  return content;
}

function getCallerFile(): string {
  const origPrepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, stack) => stack;

  const err = new Error();
  const stack = err.stack as unknown as NodeJS.CallSite[];

  Error.prepareStackTrace = origPrepareStackTrace;

  // Skip the first few frames: [this fn, loadPrompt, user code]
  const callerSite = stack[2];

  const file = callerSite.getFileName();
  if (!file) throw new Error("Could not determine caller file");

  return file;
}
