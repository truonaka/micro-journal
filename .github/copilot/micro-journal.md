# App Idea: Micro Journal

Quick daily entries with mood tracking.

---

## Prompt

```
Create a fullstack Micro Journal app.

Tech stack:
- Frontend: React
- Backend: Python
- Database: SQLite

Architecture:
- Backend serves a REST API and owns the SQLite database
- Frontend is a separate SPA that calls the API
- Include a dev script that starts both frontend and backend

Features:
- Write short daily entries (limit to 280 characters to keep it micro)
- Select mood for each entry (emoji or simple scale)
- One entry per day (edit today's entry, can't edit past days)
- Calendar view showing mood colors for each day
- List view of recent entries
- Simple mood stats (most common mood this week/month)

Pages:
- Today (write/edit today's entry)
- Calendar (visual overview of the month)
- Entries (scrollable list of past entries)

Data model (SQLite):
- entries: id, date, content, mood, created_at, updated_at

Moods: great, good, okay, rough, bad (or use emojis)

Include setup instructions in the README.
```

---

## Implement Later

- Add tags or themes to entries with filtering
- Attach weather or location metadata to each entry
- Support a single photo attachment per entry
- Export entries as a markdown file (single day or date range)
- Add rotating daily prompts to inspire writing