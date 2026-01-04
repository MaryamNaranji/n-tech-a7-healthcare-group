\# N-TECH \& A7 Healthcare Group — Unified Portal



Next.js website deployed on Vercel with Firebase Auth + Firestore.



\## Features

\- Marketing site + service pages

\- Request Service intake form (writes to Firestore securely)

\- Partner referral form

\- Admin dashboard (Firebase Auth; restrict reads via Firestore rules)

\- PHI-minimizing fields (collect only what dispatch needs)



\## Setup

1\) Create Firebase project

\- Enable \*\*Authentication\*\* (Email/Password)

\- Create Firestore database



2\) Create a service account for Admin SDK

\- Project Settings → Service Accounts → Generate private key



3\) Copy env vars

\- `cp .env.example .env.local` and fill values



4\) Install \& run

```bash

npm i

npm run dev



