# Codex Project Instructions

- Before answering any user message or running any command, read `CONTEXT.md`.
- When the request is to run a scan, generate an edition, or shape edition content, also read `this-is-what-i-want.txt` after `CONTEXT.md`.
- Do this at the start of every new thread/session, even if the user message is casual small talk or a trivial command like `pwd`.
- Treat `CONTEXT.md` as the source of truth for workflow, layout direction, output format, source preferences, and handoff rules.
- Treat `this-is-what-i-want.txt` as the source of truth for which information, signals, and market questions are interesting whenever scan content is being produced.
- Treat the exact prompt `market-scanner-daily-scan` as the runner command for generating the daily edition.
- When the prompt is `market-scanner-daily-scan`, read the separate content brief before producing any edition copy, keep the existing newspaper layout direction, and update the local edition files.
- At the start of a new thread/session in this project, begin with a short English greeting message before proceeding with the user's request.
- If the memory file is renamed later, use the renamed file as the source of truth instead.
- In user-facing replies, do not refer to these files by filename; call them the project memory or the conversation context instead, unless the user explicitly asks about the files themselves.
