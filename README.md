# dotpmt

a super simple way to separate your prompts from your code.

## ✨ Why `dotpmt`?

When working with LLMs (like OpenAI, Claude, or open-source models), prompts often grow into long, structured text blocks — but they're usually hardcoded as strings inside your codebase.

This quickly becomes messy, hard to maintain, and makes versioning prompts painful.

**`dotpmt` solves this by letting you:**

- Keep prompts in their own `.pmt` files
- Use variables like `{{input}}` for lightweight templating
- Treat prompts like real content — editable, diffable, and readable

---

## 📦 Installation

```bash
npm install dotpmt
```

## 📁 What is a .pmt file?

A .pmt file is just a plain text file with an optional templating syntax:

```
# summarize.pmt
Summarize the following:

{{input}}
```

You can store .pmt files anywhere in your project, commonly in a prompts/ folder.

## Usage

```typescript
import { loadPrompt } from "dotpmt";

const prompt = loadPrompt("prompts/summarize.pmt", {
  input: "YOUR LONG TEXT",
});

console.log(prompt);
```
