# AI Enablement Studio

AI Enablement Studio is a polished fullstack demo app for an AI / Technology Evangelist or Program Manager portfolio. It models an internal enablement platform that helps employees learn AI concepts, practice prompting, understand responsible AI usage, submit business use cases, and measure adoption impact.

All data is synthetic. No confidential company information is included.

## Why This App Exists

Organizations need more than access to AI tools. They need education, practice, safety guidance, community support, use-case discovery, and measurable adoption. This app demonstrates how an evangelist or program manager could connect those needs in one internal-facing experience.

## Features

- Landing page with enterprise SaaS positioning
- Mock authenticated learner dashboard
- Learning modules with lessons, quizzes, progress, and markdown content
- AI Tutor chat with OpenAI support and deterministic fallback responses
- Prompt Practice Lab with scored feedback across clarity, context, constraints, safety, and format
- Responsible AI Center with decision tree, safety matrix, and vibe coding safety guide
- Searchable-style AI Playbook with guides, templates, recipes, FAQs, and checklists
- Use Case Discovery intake form with impact, feasibility, risk, and next-step scoring
- Prototype Gallery for lightweight AI demo ideas
- Champions Circle with profiles, office hours, and nomination form
- Success Stories with before/after workflows and impact examples
- Admin Analytics dashboard using Recharts and seeded adoption metrics
- Admin Content forms for creating modules and playbook entries

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-inspired local components
- Prisma ORM
- SQLite
- Lightweight mock auth pattern
- OpenAI API integration
- Zod validation
- Recharts
- React Markdown

## Local Setup

```bash
cd work/ai-enablement-studio
npm install
cp .env.example .env
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

```bash
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY=""
```

`OPENAI_API_KEY` is optional. When it is missing, AI Tutor and Prompt Lab use deterministic mock responses so the demo still works.

## Prisma Commands

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run db:reset
```

## Demo Walkthrough Script

1. Start on the landing page and explain that the app is an internal AI adoption hub.
2. Open the learner dashboard and show module progress, prompt score, responsible AI status, and recommended next step.
3. Open “AI in Plain English” from Learn and show plain-language content, business examples, takeaways, and quiz.
4. Ask the AI Tutor: “What is RAG?” and point out the beginner-friendly explanation and safety reminder.
5. Complete a Prompt Lab exercise and show scoring for clarity, context, constraints, safety, and format.
6. Submit a Use Case Discovery idea from a business department and show impact, feasibility, risk, and next step.
7. Show the Responsible AI Center, especially the decision tree and Safe / Caution / Do Not Use matrix.
8. Open Admin Analytics and walk through adoption metrics, department completion, pipeline, and responsible AI training.
9. Close by explaining how the platform connects enablement, safe practice, community champions, and measurable business impact.

## Interview Talking Points

- The product is designed around adoption behavior, not only content delivery.
- Safety guidance appears at the moment of use, not only in a static policy page.
- Prompt practice gives employees a low-risk way to build skill before using AI on real work.
- Use-case scoring helps prioritize discovery conversations and governance review.
- Analytics connect learning activity to business impact signals.
- The app runs without an OpenAI key, which makes demos reliable.

## Known Limitations

- Authentication is mocked by selecting a seeded user instead of using NextAuth.
- Admin CRUD is intentionally lightweight and focuses on create flows for core content.
- Search UI is represented as a demo affordance; full-text filtering could be added.
- Prompt attempts are scored but not persisted from the client in this version.
- Charts use seeded synthetic metrics rather than live event tracking.

## Future Improvements

- Add NextAuth with role-aware route protection.
- Persist Tutor conversations and Prompt Lab attempts per user.
- Add full CRUD tables for modules, playbook entries, exercises, FAQs, and stories.
- Add semantic search for playbook resources.
- Add event tracking for live analytics.
- Add exportable reports for leadership updates.
