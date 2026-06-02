# Lead.AI Indie AI SaaS Starter Kit — Auth, Dashboard, Stripe, Gumroad & Launch Pages

A premium, framework-free SaaS starter boilerplate engineered specifically for AI founders, developers, and indie hackers who want to launch a paid AI application fast using **Firebase**, **Stripe/Gumroad**, dashboards, landing pages, and launch-ready product copy templates.

---

## ⚡ Key Value Features

- **Pre-Configured Authentication**: Email/Password and Google OAuth sign-in flows using Firebase Auth.
- **Glassmorphism UI System**: Fully responsive landing page, multi-tier billing table, interactive dashboard, and administrative console.
- **Flexible Payments Integrations**: Annotated guides and styled HTML templates to route Stripe checkouts or Gumroad license verifications.
- **AI Tool Integration Architecture**: A complete visual mockup showcasing forms, ranges, and model responses securely linking Gemini, OpenAI, or Anthropic APIs.
- **Launch Documentation & Templates**: Ready-to-copy Privacy Policies, Terms of Service, user emails, and LinkedIn/Twitter announcement copy.

---

## 🛠️ System Prerequisites

Ensure you have the following installed on your machine before running setup:
- **Node.js** 18.0.0 or higher
- **npm** (comes packaged with Node.js)
- **Firebase CLI** (`npm install -g firebase-tools`)
- A free **Firebase account** (Spark tier is sufficient)
- A **Stripe account** or **Gumroad account** for developer keys

---

## 🚀 Quick Start Guide (10 Minutes)

Follow these steps to run the starter kit app locally:

### 1. Download & Unzip
Extract the downloaded ZIP archive into your local workspace directory.

### 2. Install Dependencies
Run the package installation command inside your terminal:
```bash
npm install
```

### 3. Initialize Firebase Local Project
Authenticate your Firebase CLI and connect the local configuration to your online Firebase Console project:
```bash
# Log in to your Firebase account
firebase login

# Connect to your existing project or create a new alias
firebase use --add
```

### 4. Setup Local Environment Variables
Duplicate the `.env.example` template and populate it with your test environment values:
```bash
cp .env.example .env
```
Open `.env` and add your Firebase credentials and Stripe price IDs:
```env
# FIREBASE CONFIGURATION (Get these from Project Settings -> Web App)
FIREBASE_API_KEY="your_api_key_here"
FIREBASE_AUTH_DOMAIN="your_project_id.firebaseapp.com"
FIREBASE_PROJECT_ID="your_project_id"
FIREBASE_STORAGE_BUCKET="your_project_id.appspot.com"
FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
FIREBASE_APP_ID="your_app_id"

# STRIPE CONFIGURATION
STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_PRICE_ID="price_..."
```

### 5. Launch Development Server
Start the local development server:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to interact with the responsive dashboard layout.

---

## 🔒 Crucial Security Warnings

> [!WARNING]
> - **Never Commit Secrets**: Ensure `.env` is listed inside your `.gitignore` file. Never commit live secret keys (`sk_live_...` or model API keys) to version control.
> - **Protect Your Client Side**: Browser-facing Javascript cannot securely interact with private API keys (like OpenAI/Anthropic/Gemini). Always wrap your AI model execution calls inside secure backend routes, such as Firebase Cloud Functions, and authorize them via user tokens before execution.
