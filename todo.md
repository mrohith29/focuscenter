# FocusCenter Project TODO List

## Backend
- [ ] **Design and implement database models**
  - Match Supabase schema: users, goals, tasks, ai_chats, motivational_quotes, motivations, analytics, notes
- [ ] **Set up API endpoints**
  - CRUD for users, goals, tasks, chats, motivations, analytics, notes
  - Depends on: database models
- [ ] **Implement agent modules**
  - Goal Understanding, Task Breakdown, Distraction Tracking, Motivation, Analytics
  - Depends on: API endpoints
- [ ] **Integrate backend with Supabase**
  - Authentication, data storage, secure access
  - Depends on: API endpoints

## Frontend
- [ ] **Develop React UI**
  - Onboarding, goal setting, task management, AI chat, motivation, analytics, notes
- [ ] **Connect frontend to backend API**
  - Real-time data updates, agent interactions
  - Depends on: React UI, backend API
- [ ] **Implement authentication/session management**
  - Supabase or compatible provider
  - Depends on: React UI, backend-Supabase integration

## Features & Integrations
- [ ] **Add notifications/reminders**
  - Push/email/SMS for tasks, motivation
  - Depends on: agent modules, frontend-backend integration
- [ ] **Develop browser extension for distraction tracking**
  - Integrate with main platform
  - Depends on: frontend-backend integration

## Quality & Deployment
- [ ] **Write unit/integration tests**
  - Backend and frontend
  - Depends on: backend API, React UI
- [ ] **Prepare deployment scripts & CI/CD**
  - Vercel/Netlify (frontend), Render/Heroku/Fly.io (backend)
  - Depends on: testing
- [ ] **Write documentation**
  - Setup, usage, contribution guidelines
  - Depends on: deployment

# TODO: Secure User Authentication Implementation

- [ ] Add password hashing and storage to user creation (signup) in the backend, so passwords are never stored in plaintext.
- [ ] Implement a login endpoint in the backend that verifies user credentials and returns a secure token (e.g., JWT) on success.
- [ ] Add token-based authentication middleware to protect user endpoints as needed.
- [ ] Update the frontend signup form to send hashed password to the backend and handle errors.
- [ ] Update the frontend login form to authenticate with the backend, store the token, and handle errors. 