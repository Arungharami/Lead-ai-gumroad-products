# FAQ — Firebase SaaS Starter Kit

---

**Q: Is this React or plain HTML/JS?**

The current version (v1.0) uses plain HTML, CSS, and JavaScript with the Firebase JavaScript SDK. A React version is planned for v1.1. If you need React now, the structure is adaptable — email me and I can point you to the right sections to adapt.

---

**Q: Does this include a backend server?**

No separate backend server is required. Firebase Firestore handles data storage. Stripe webhooks are handled via Firebase Cloud Functions. No Node.js express server needed.

---

**Q: Does this work on Firebase's free plan?**

Authentication, Hosting, and Firestore work on the free Spark plan. Cloud Functions (used for Stripe webhooks) require the Blaze (pay-as-you-go) plan. At low scale, the cost is essentially zero, but you need a billing account connected.

---

**Q: I don't have a Stripe account. Is it hard to set up?**

No. Creating a Stripe account is free and takes about 5 minutes. You can test with Stripe's test cards without entering real payment information during development.

---

**Q: Can I use this for a client project?**

Yes. You may use and modify the code in your own projects and paid client work. You may not resell or redistribute the kit itself.

---

**Q: What if I get an error during Firebase deployment?**

Email a.gharami.325@westcliff.edu with:
- The error message (copy and paste)
- Your Firebase CLI version (`firebase --version`)
- Your Node.js version (`node --version`)

I will help you resolve it within 48 hours.

---

**Q: Is there a video tutorial included?**

Not in v1.0. The buyer instructions and deployment checklist are detailed written guides. A video walkthrough is planned for v1.1.

---

**Q: What if I want help customizing this for my specific product?**

Email a.gharami.325@westcliff.edu with "Custom work request" in the subject line. Custom implementation work is available at a separate rate.

---

**Q: What is the refund policy?**

Full refund within 7 days, no questions asked. Email a.gharami.325@westcliff.edu with your order number.
