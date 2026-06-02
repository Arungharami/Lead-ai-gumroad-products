# Firebase Authentication Setup Guide

This guide provides a step-by-step developer tutorial for configuring Email/Password and Google OAuth sign-in flows using the Firebase Console and Firebase Web SDK (v10+).

---

## 1. Firebase Console Configuration

Before implementing authentication logic in your codebase, you must enable the desired authentication providers in the Firebase Console.

### Step 1.1: Enable Email/Password Provider
1. Navigate to the [Firebase Console](https://console.firebase.google.com/).
2. Select your project from the dashboard list.
3. In the left-hand sidebar, click on **Build** -> **Authentication**.
4. Click the **Get Started** button if this is a new project.
5. Select the **Sign-in method** tab at the top of the interface.
6. Under the **Additional providers** section, click on **Email/Password**.
7. Toggle the **Enable** switch to the active state. Do not enable the passwordless sign-in option unless your specific application architecture requires it.
8. Click **Save**.

### Step 1.2: Enable Google OAuth Provider
1. On the **Sign-in method** tab of the Authentication page, click **Add new provider**.
2. Select **Google** from the list of OAuth providers.
3. Toggle the **Enable** switch to the active state.
4. Enter your public **Project support email** from the dropdown list.
5. In the **Configure** section, keep the client ID and client secret fields at their default values (these are managed automatically by Firebase).
6. Click **Save**.

### Step 1.3: Whitelist Authentication Domains
To prevent unauthorized domains from initiating authentication flows, you must restrict access to approved origins:
1. Scroll down to the **Authorized domains** list on the **Settings** tab under Authentication.
2. Ensure `localhost` and `127.0.0.1` are present for local development.
3. Click **Add domain** and enter your production domain (e.g., `your-saas-app.web.app` or `yourdomain.com`).
4. Click **Add**.

---

## 2. Web SDK Implementation Code

Use the following modular JavaScript structure to configure and initialize Firebase Authentication in your frontend codebase.

### Step 2.1: Initialize Firebase App and Auth Client
Create an auth configuration file (e.g., `src/config/firebase.js`):

```javascript
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";

// Securely reference environment variables. Never hardcode these values.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Enforce standard OAuth parameters
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
```

### Step 2.2: Implement Sign-In, Sign-Up, and Sign-Out Functions
Create an authentication helper file (e.g., `src/utils/authHelpers.js`):

```javascript
import { 
  auth, 
  googleProvider 
} from "../config/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";

/**
 * Creates a new user using email and password.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<UserCredential>}
 */
export const registerWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("Registration error code:", error.code);
    throw new Error(error.message);
  }
};

/**
 * Authenticates an existing user using email and password.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<UserCredential>}
 */
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("Login error code:", error.code);
    throw new Error(error.message);
  }
};

/**
 * Authenticates a user using Google OAuth popup.
 * @returns {Promise<UserCredential>}
 */
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (error) {
    console.error("Google Authentication error code:", error.code);
    throw new Error(error.message);
  }
};

/**
 * Terminate the current user session.
 * @returns {Promise<void>}
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign-out error:", error);
    throw new Error(error.message);
  }
};
```

### Step 2.3: Listen to Authentication State Changes
Wrap your application routing or user context in a dynamic auth listener to track session states:

```javascript
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

export const useAuthSession = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is authenticated
        setUser(currentUser);
      } else {
        // User session is inactive
        setUser(null);
      }
      setLoading(false);
    });

    // Unsubscribe from session listener on component unmount
    return () => unsubscribe();
  }, []);

  return { user, loading };
};
```

---

## 3. Critical Security Considerations

> [!CAUTION]
> Hardcoding credentials or failing to restrict OAuth origins will result in unauthorized API usage billing.

- **Client-Facing API Keys:** The Firebase API key (e.g., `NEXT_PUBLIC_FIREBASE_API_KEY`) is designed to be public and exposed to the browser runtime. This is safe because Firebase relies on **Security Rules** rather than API key secrecy to secure database and storage resources. You must configure secure Firestore Security Rules immediately.
- **OAuth Callback Security:** Do not add wildcards (e.g., `*.domain.com`) to your Authorized Domains list. List each staging, testing, and production subdomain individually to prevent man-in-the-middle attacks or hijacking of OAuth callback tokens.
