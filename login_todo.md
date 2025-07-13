# Login & Authentication TODOs

## ✅ Done
- Use Supabase Auth for secure signup, login, and email confirmation
- Require email confirmation before login
- Use Supabase JS client for all frontend auth actions
- Save user's name to both `profiles` and custom `users` table after first login
- Remove redundant columns (like password) from custom `users` table
- Avoid duplicate data: profile info in `profiles`, auth in `auth.users`, references in `users`
- Dashboard displays user info from `profiles`
- Clean, modern UI/UX for signup and login
- Error handling for common auth issues (network, email not confirmed, etc.)
- Enable Row Level Security (RLS) on `users` and `profiles` tables

## 🟡 Optional
- Password reset (allow users to request a password reset email)
- Resend confirmation email (option for users to resend confirmation)
- Change email/password (let users update email or password)
- Sign out everywhere (option to sign out from all devices)
- Profile editing (let users update name, avatar, etc.)
- Avatar upload (allow users to upload a profile picture)
- Loading and success states for all auth actions
- Accessibility improvements for forms and buttons
- Login/signup analytics (track user signups, logins, failed attempts)

## 🟢 Advanced
- Social login (Google, GitHub, etc.) via Supabase Auth
- Multi-factor Authentication (MFA)
- Account deletion (let users delete their account and all data)
- Email/username uniqueness (custom logic if needed)
- JWT verification in backend for protected endpoints 