# Admin Dashboard and Platform Management Guide

This guide describes how to construct an internal platform administration interface. It covers displaying dynamic database user lists, managing billing logs, tracking server status indicators, and auditing system security records.

---

## 1. Dynamic User Register and Database Auditing

To maintain oversight of registration patterns and token balances, build a secure dynamic registry that displays user details queried from Firestore.

```javascript
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "./config/firebase";

export function AdminUserRegistry() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const q = query(
          collection(db, "users"), 
          orderBy("createdAt", "desc"), 
          limit(50)
        );
        const querySnapshot = await getDocs(q);
        const userList = [];
        
        querySnapshot.forEach((doc) => {
          userList.push({ id: doc.id, ...doc.data() });
        });
        
        setUsers(userList);
      } catch (error) {
        console.error("Administrative user fetch failure:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-gray-400">Loading platform user database...</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950">
      <table className="w-full text-left text-sm text-gray-300">
        <thead className="bg-gray-900 text-xs uppercase text-gray-400">
          <tr>
            <th className="px-6 py-3">Email Address</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Token Balance</th>
            <th className="px-6 py-3">Customer ID</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-gray-900">
              <td className="px-6 py-4 font-medium text-white">{u.email}</td>
              <td className="px-6 py-4">
                <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${u.subscriptionStatus === "active" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                  {u.subscriptionStatus || "inactive"}
                </span>
              </td>
              <td className="px-6 py-4">{u.tokenBalance?.toLocaleString() || 0}</td>
              <td className="px-6 py-4 text-xs font-mono text-gray-500">{u.stripeCustomerId || "None"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## 2. Subscription Logs and Financial Tracking

To audit invoice flows and prevent subscription syncing failures, display a real-time table of recent webhook transactions.

```javascript
import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";

export function AdminTransactionHistory() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "billing_logs"), 
      orderBy("timestamp", "desc"), 
      limit(20)
    );

    // Use onSnapshot for real-time tracking of webhook transactions
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const transactionLogs = [];
      snapshot.forEach((doc) => {
        transactionLogs.push({ id: doc.id, ...doc.data() });
      });
      setLogs(transactionLogs);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-bold text-white">Live Billing Sync Logs</h3>
      <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
        {logs.length === 0 ? (
          <p className="text-sm text-gray-500">No recent billing events processed.</p>
        ) : (
          <ul className="divide-y divide-gray-800 font-mono text-xs">
            {logs.map((log) => (
              <li key={log.id} className="py-2 flex justify-between">
                <span className="text-blue-400">[{log.eventType}]</span>
                <span className="text-gray-300">User: {log.userId}</span>
                <span className="text-gray-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
```

---

## 3. Server Status Indicators

Monitor your backend latency and API health directly within the admin control panel. Implement a basic visual telemetry dashboard:

```javascript
import { useEffect, useState } from "react";

export function ServerStatusTelemetry() {
  const [telemetry, setTelemetry] = useState({
    serverLatency: "0ms",
    apiHealth: "loading",
    dbConnection: "loading"
  });

  useEffect(() => {
    async function checkHealth() {
      const startTime = performance.now();
      try {
        const response = await fetch("/api/healthz");
        const data = await response.json();
        const latency = Math.round(performance.now() - startTime);

        setTelemetry({
          serverLatency: `${latency}ms`,
          apiHealth: data.apiStatus === "healthy" ? "online" : "degraded",
          dbConnection: data.dbStatus === "healthy" ? "connected" : "disconnected"
        });
      } catch (error) {
        setTelemetry({
          serverLatency: "timeout",
          apiHealth: "offline",
          dbConnection: "disconnected"
        });
      }
    }

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check telemetry every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {/* Telemetry Card: Latency */}
      <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
        <p className="text-xs text-gray-400 font-semibold uppercase">Server Latency</p>
        <p className="mt-2 text-2xl font-bold text-white">{telemetry.serverLatency}</p>
      </div>

      {/* Telemetry Card: API Health */}
      <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
        <p className="text-xs text-gray-400 font-semibold uppercase">API Gateway</p>
        <span className={`mt-2 inline-flex items-center space-x-2 text-2xl font-bold ${telemetry.apiHealth === "online" ? "text-green-400" : "text-red-400"}`}>
          <span className={`h-2.5 w-2.5 rounded-full ${telemetry.apiHealth === "online" ? "bg-green-400" : "bg-red-400"} animate-pulse`}></span>
          <span>{telemetry.apiHealth}</span>
        </span>
      </div>

      {/* Telemetry Card: DB Connection */}
      <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
        <p className="text-xs text-gray-400 font-semibold uppercase">Firestore Sync</p>
        <p className={`mt-2 text-2xl font-bold ${telemetry.dbConnection === "connected" ? "text-blue-400" : "text-red-400"}`}>
          {telemetry.dbConnection}
        </p>
      </div>
    </div>
  );
}
```

---

## 4. Administrative Security Verification

Ensure your administrator views are properly isolated. You must implement Firestore rules that block access to the admin path or database collections for any authenticated user who does not possess a verified `admin` claim.

### Firestore Rules Addendum
Add this validation function to your `firestore.rules` file:

```javascript
function isAdmin() {
  return request.auth.token.admin == true;
}

// Rules for critical platform administration records
match /billing_logs/{logId} {
  allow read, write: if isAuthenticated() && isAdmin();
}
```

To assign the `admin` custom claim to a user ID, execute a secure server-side Firebase Admin SDK script. Never allow client-side requests to modify user custom claims or billing rules directly.
