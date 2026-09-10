# Lumina AI

**Academic Job Application AI Assistant**

Academic applications are their own genre. One position can ask for a cover letter, a CV, a research statement, a teaching philosophy and a diversity statement, each with its own conventions and each expected to be tailored to the department. Lumina takes your existing CV and the posting you're applying to, and helps you produce those materials without starting from a blank page each time.

> **Status:** work in progress. Built solo.

## What it does

- **Upload your CV** as a PDF; the text is parsed and becomes the source material the assistant works from
- **Generate application materials** tailored to a specific posting
- **Refine iteratively** rather than accepting a single generated draft
- **Export to PDF** so the finished document is ready to submit
- **Guided forms** with validation, instead of one open-ended prompt box

## Prerequisites

- Node.js 18+
- An Anthropic API key

## Setup

```bash
npm install
```

Create `.env.local` in the project root:

```
ANTHROPIC_API_KEY=your_key_here
```

Then:

```bash
npm run dev
```

Open <http://localhost:3000>.

## Tech stack

- **Next.js 14** (App Router), **React 18**, **TypeScript**
- **Anthropic SDK** and the **Vercel AI SDK** for model calls
- **Tailwind CSS** with **shadcn/ui** on Radix primitives
- **React Hook Form** with **Zod** schemas for validated input
- **Framer Motion** for interface motion
- **pdf-parse** for CV ingest, **jsPDF** for document export

## Project structure

```
app/          # Next.js App Router — routes and server-side handlers
components/   # UI components, shadcn/ui primitives
lib/          # Shared utilities and helpers
public/       # Static assets
```

## Notes on the build

**Server and client boundaries.** Model calls stay server-side, so the API key never reaches the browser. Deciding what runs where is most of the architectural work in an App Router project of this kind.

**Components in the repo, not in node_modules.** shadcn/ui on Radix means the primitives are checked in and can be shaped to the product. Variants are handled with `class-variance-authority` rather than growing prop lists.

**Typed at the edges.** Zod schemas validate form input before anything reaches the model, so bad input fails early rather than halfway through a generation.

**Documents in, documents out.** PDF parsing and PDF generation both took more iteration than the model integration did.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production server |
| `npm run lint` | Run ESLint |

## License

MIT
