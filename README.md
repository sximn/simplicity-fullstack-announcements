# Simplicity Full Stack Announcements App

This is a full-stack demo project with NestJS on the backend and React on the frontend.

## How to run the project

1. Checkout the repo
   - `git clone git@github.com:sximn/simplicity-fullstack-announcements.git`

2. Install dependencies (using pnpm)
   - `pnpm i`

3. Create (copy) the environment variables:
   - `cp apps/api/.env.example apps/api/.env`

4. Initialize the sqlite DB - this will create a file in the root of the project `/api` called `local.db`
   - `pnpm run db:migrate`

5. Initialize the categories (categories are stored in the DB)
   - `pnpm run db:seed`

6. Run the dev process (that will start both the backend and the frontend)
   - `pnpm run dev`

7. Access the web page on `http://localhost:5173`

# How to test the API

The API is available on `http://localhost:3000` after running the `dev` script from above.

1. Create a New Announcement

- POST `/announcements`
- Body:

```json
{
  "title": "New announcement",
  "content": "My first announcement.",
  "publicationDate": "2026-02-22T10:00:00Z",
  "categoryIds": [1, 3]
}
```

2. Get All (Filtering & Searching)

- Get Everything (No filters)
  - GET `/announcements`

- Search by Text
  - GET `/announcements?search=New`

- Filter by Multiple Categories
  - GET `/announcements?categoryIds=1,3`

- Combined Search and Filter
  - GET `/announcements?search=first&categoryIds=1,2`

3. Get Single Announcement

- GET `/announcements/1`

4. Update Announcement

- PUT `/announcements/1`
- Body:

```json
{
  "title": "Updated Title Only"
}
```
