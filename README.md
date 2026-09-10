# Lumina AI

An AI assistant for academic job applications. Upload your CV, describe the position, and get help drafting the materials that academic hiring actually asks for.

> **Status:** work in progress. Core flows are built and running locally; some features are still being wired up. Built solo.

## Why I built it

Academic job applications are their own genre. A single position can ask for a cover letter, a CV, a research statement, a teaching philosophy, and a diversity statement, each with its own conventions and each expected to be tailored to the department. The work is mostly re-expressing the same underlying material for different audiences, which is exactly the kind of thing a language model is good at when it has enough context.

I have a PhD myself, so this started as a tool for a problem I understood well.

## What it does

- Parses an uploaded CV (PDF) and extracts the content the assistant works from
- Generates and refines application materials against a specific posting
- Exports finished documents back out as PDFs
- Guided, multi-step forms with validation rather than a single blank prompt box

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router), React 18 |
| Language | TypeScript |
| AI | Anthropic SDK, Vercel AI SDK |
| UI | Tailwind CSS, shadcn/ui on Radix primitives |
| Forms | React Hook Form with Zod schemas |
| Motion | Framer Motion |
| Documents | pdf-parse for ingest, jsPDF for export |

## Notes on the build

**Server and client boundaries.** Anything touching the Anthropic SDK stays server-side. Deciding what runs where in the App Router is most of the architectural work in a project like this, and getting it wrong leaks keys or ships far too much JavaScript to the browser.

**Composable UI over a component grab bag.** shadcn/ui on Radix means the components live in the repo rather than in `node_modules`, so they can be shaped to the product instead of fought with. That matches how I prefer to work: a small set of primitives that compose, with variants handled through `class-variance-authority` rather than prop explosions.

**Typed inputs end to end.** Zod schemas validate form input and describe the shape the model is asked to work with, so a bad input fails at the edge rather than halfway through a generation.

**Documents in, documents out.** PDF parsing and PDF generation are both messy in the browser. Handling ingest and export cleanly took more iteration than the AI integration did.

## Running locally

```bash
npm install
npm run dev
```

Requires an `ANTHROPIC_API_KEY` in `.env.local`.

## License

MIT
