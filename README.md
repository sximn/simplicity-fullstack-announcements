# Simplicity Full Stack Announcements App

This is a full-stack demo project with NestJS on the backend and React on the frontend.

## How to run the project

1. Checkout the repo
   - `git clone git@github.com:sximn/simplicity-fullstack-announcements.git`

2. Install dependencies (using pnpm)
   - `pnpm i`

3. Initialize the sqlite DB - this will create a file in the root of the project `/api` called `local.db`
   - `pnpm run db:migrate`

4. Initialize the categories (categories are stored in the DB)
   - `pnpm run db:seed`

5. Run the dev process (that will start both the backend and the frontend)
   - `pnpm run dev`

6. Access the web page on `http://localhost:5173`
