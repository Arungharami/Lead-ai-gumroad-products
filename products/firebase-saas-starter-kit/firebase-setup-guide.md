# Firebase Project and Firestore Setup Guide

This guide provides a comprehensive tutorial for initializing your Firebase project, defining your Cloud Firestore database structure, implementing secure Cloud Firestore Security Rules, and organizing your `firebase.json` configuration file.

---

## 1. Firebase Project Initialization

To connect your local application to the Firebase cloud infrastructure, you must initialize the Firebase Command Line Interface (CLI) in your root workspace.

### Step 1.1: Install Firebase Tools
Ensure Node.js is installed on your local system, then install the Firebase CLI globally:
```bash
npm install -g firebase-tools
```

### Step 1.2: Authenticate and Link Project
Log in to your Google Account via the CLI:
```bash
firebase login
```
This command opens your default browser to authorize the Firebase CLI.

Navigate to your local project root directory and initialize the configuration:
```bash
firebase init
```
During the prompt sequence, select the following options:
1. **Features to Configure:** Select `Firestore` and `Hosting` (using spacebar to select).
2. **Project Setup:** Select `Use an existing project` and choose the project name created in your Firebase Console.
3. **Firestore Setup:** Keep the default filenames: `firestore.rules` for security rules and `firestore.indexes.json` for database indexes.
4. **Hosting Setup:**
   - **Public Directory:** Set this to your build output folder (e.g., `out` for static Next.js apps, `build` for standard React configurations, or `public`).
   - **Configure as a single-page app:** Select `Yes` to redirect all URLs to `index.html`.
   - **Set up automatic builds and deploys with GitHub:** Select `No` (you can configure CI/CD pipelines later).

---

## 2. Cloud Firestore Database Architecture

To manage user profiles, subscriptions, and AI transactions efficiently, configure your Firestore database according to the following two-collection schema.

### Collection A: `users`
Each document in the `users` collection is identified by the user's unique Firebase Authentication ID (`uid`).

```json
users / {userId}
{
  "email": "user@example.com",
  "createdAt": "2026-06-01T00:00:00Z",
  "displayName": "Jane Doe",
  "subscriptionStatus": "active",
  "stripeCustomerId": "cus_12345abcdef",
  "stripeSubscriptionId": "sub_98765qwerty",
  "tokenBalance": 500000
}
```

### Collection B: `queries`
Each document represents a single transaction or AI prompt execution. Use a unique auto-generated ID for each document and reference the `userId` field to establish ownership.

```json
queries / {queryId}
{
  "userId": "user_uid_12345",
  "promptInput": "Analyze the financial transactions dataset for outliers",
  "aiResponse": "Outlier detected in transaction ID TX-9821 based on variance analysis.",
  "tokensConsumed": 1250,
  "timestamp": "2026-06-01T12:30:45Z",
  "status": "success"
}
```

---

## 3. Cloud Firestore Security Rules

Firestore Security Rules enforce authorization and prevent unauthorized modifications to your data. Implement the following rule configuration to ensure users can only read, write, or modify documents that they own.

Replace the contents of your local `firestore.rules` file with the following configuration:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // Helper: Verify if the incoming request is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }

    // Helper: Verify if the authenticated user owns the document record
    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    // Rules for the Users Collection
    match /users/{userId} {
      // Users can only read their own profile document
      allow read: if isAuthenticated() && isOwner(userId);
      
      // Users can create their initial profile, but updates to critical subscription metrics 
      // (like token balance and plan status) should occur via secure server-side scripts.
      allow create: if isAuthenticated() && isOwner(userId);
      allow update: if isAuthenticated() && isOwner(userId) 
                    && !request.resource.data.diff(resource.data).affectedKeys().hasAny(['tokenBalance', 'subscriptionStatus', 'stripeCustomerId']);
      
      // Prevent manual document deletion by client-side requests
      allow delete: if false;
    }

    // Rules for the Queries Collection
    match /queries/{queryId} {
      // Users can only view queries they created
      allow read: if isAuthenticated() && resource.data.userId == request.auth.uid;
      
      // Users can write queries where they are set as the creator
      allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
      
      // Prevent updates or deletions of transaction history logs once written
      allow update, delete: if false;
    }
  }
}
```

---

## 4. Deploying Configurations via `firebase.json`

The `firebase.json` file configures the routing, security rules, indexes, and hosting behavior of your project.

Use the following configuration structure for your `firebase.json` file:

```json
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(eot|otf|ttf|woff|woff2)",
        "headers": [
          {
            "key": "Access-Control-Allow-Origin",
            "value": "*"
          }
        ]
      },
      {
        "source": "**/*.@(js|css|png|jpg|jpeg|gif|ico|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000, immutable"
          }
        ]
      }
    ]
  }
}
```

Deploy only your database security configurations using:
```bash
firebase deploy --only firestore:rules
```
This ensures your database is protected prior to compiling and deploying your client-side application.
