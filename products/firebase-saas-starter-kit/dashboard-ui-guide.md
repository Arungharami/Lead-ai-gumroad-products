# Dynamic Dashboard UI Design Manual

This guide describes how to construct a premium, responsive dashboard interface using Tailwind CSS and JavaScript. It outlines user session tracking, populating metric cards from Cloud Firestore, handling sidebar/topbar layout state changes, and implementing custom scrollbar aesthetics.

---

## 1. User Session Tracking in UI Components

To prevent visual jumps or layout shifts during initial load while checking authentication status, you must implement a session-aware UI wrapper.

```javascript
import { useAuthSession } from "./utils/authHelpers"; // Custom auth hook
import { useRouter } from "next/router";
import { useEffect } from "react";

export function DashboardWrapper({ children }) {
  const { user, loading } = useAuthSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect unauthenticated traffic to the login interface
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    // Render a clean loading indicator matching the dark-tech aesthetic
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-950 text-gray-400">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-800 border-t-blue-500"></div>
      </div>
    );
  }

  // Session is verified, render the secure dashboard layout
  return user ? <div className="min-h-screen bg-gray-950 text-gray-100">{children}</div> : null;
}
```

---

## 2. Populating Metric Cards from Cloud Firestore

To display dynamic stats inside your dashboard, query your collections and aggregate values inside your state management hook.

```javascript
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";

export function useDashboardMetrics(userId) {
  const [metrics, setMetrics] = useState({
    totalQueries: 0,
    totalTokens: 0,
    activeTokenBalance: 0
  });

  useEffect(() => {
    if (!userId) return;

    async function fetchMetrics() {
      try {
        const q = query(collection(db, "queries"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        
        let runCount = 0;
        let tokenCount = 0;

        querySnapshot.forEach((doc) => {
          runCount += 1;
          tokenCount += doc.data().tokensConsumed || 0;
        });

        setMetrics({
          totalQueries: runCount,
          totalTokens: tokenCount,
          activeTokenBalance: 500000 - tokenCount // Calculated against default plan limits
        });
      } catch (error) {
        console.error("Failed to compile metric profiles:", error);
      }
    }

    fetchMetrics();
  }, [userId]);

  return metrics;
}
```

---

## 3. Sidebar and Topbar Routing State Management

Ensure your navigation remains responsive across mobile and desktop breakpoints. Use standard React state triggers to toggle your layout parameters.

```javascript
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export function SidebarNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { label: "Dashboard Overview", path: "/dashboard", icon: "📊" },
    { label: "AI Playground", path: "/dashboard/playground", icon: "🧠" },
    { label: "Billing & Plans", path: "/dashboard/billing", icon: "💳" },
    { label: "Settings", path: "/dashboard/settings", icon: "⚙️" }
  ];

  return (
    <>
      {/* Mobile Topbar Toggle */}
      <div className="flex h-16 items-center justify-between border-b border-gray-800 bg-gray-900 px-4 md:hidden">
        <span className="font-bold text-blue-500">Lead.AI SaaS</span>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-gray-400 focus:outline-none"
        >
          {isOpen ? "✕ Close" : "☰ Menu"}
        </button>
      </div>

      {/* Sidebar Layout container */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-gray-800 bg-gray-950 p-5 transition-transform duration-300 md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-8 font-bold text-xl text-blue-500">
          Lead.AI Starter Kit
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = router.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive ? "bg-blue-600/10 text-blue-400" : "text-gray-400 hover:bg-gray-900 hover:text-white"}`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
```

---

## 4. Custom Scrollbar Aesthetics

For dynamic console outputs or high-throughput transaction lists inside your dashboard cards, apply a sleek scrollbar design that matches the dark-tech aesthetic of your product.

Add the following custom CSS utility classes to your global stylesheet (e.g., `styles/globals.css` or inside your Tailwind CSS configuration):

```css
/* Custom Scrollbar Styles for Console/Database Lists */
@layer utilities {
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #030712; /* Tailwind gray-950 */
    border-radius: 4px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #1f2937; /* Tailwind gray-800 */
    border-radius: 4px;
    border: 1px solid #111827; /* Tailwind gray-900 */
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #3b82f6; /* Tailwind blue-500 */
  }
}
```

Implement this scrollbar on a dynamic database list box wrapper:
```html
<div className="h-64 overflow-y-auto custom-scrollbar bg-gray-900 rounded-lg p-4 border border-gray-800">
  {/* List items populate here */}
</div>
```
