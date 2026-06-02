# User Onboarding Email Template

This onboarding email template is designed to be sent automatically to new users immediately after they sign up or create an account on your SaaS. It is structured to drive immediate engagement by guiding them to perform their first key action within the application.

---

**Subject:** Welcome to [YOUR_PRODUCT_NAME] - Let's get started
**Preheader:** Run your first AI-powered analysis in less than two minutes.

Dear [USER_FIRST_NAME],

Welcome to [YOUR_PRODUCT_NAME]. We are pleased to have you join our platform.

Our system is designed to help you [insert core value proposition, e.g., automate data analysis, generate high-converting copy, or protect your applications from fraud] with speed and precision.

To ensure you get the maximum value from your account, we recommend completing the following three steps today.

---

### Step 1: Run Your First AI Query (Takes 60 Seconds)
The best way to understand how [YOUR_PRODUCT_NAME] works is to try it. Follow these steps to generate your first result:
1. Log in to your secure dashboard at [YOUR_DASHBOARD_URL].
2. Click on the **[e.g., Create New Project / Start Analysis]** button.
3. Choose one of our pre-built templates or enter your custom prompt.
4. Click **[e.g., Generate / Run AI]** and view your results in real time.

---

### Step 2: Explore Key Features
Here are the primary features designed to optimize your workflow:
- **[Feature 1, e.g., Advanced AI Pipelines]:** Connect multiple AI models to perform complex tasks sequentially.
- **[Feature 2, e.g., Automated Export]:** Download your completed reports in PDF, CSV, or JSON format.
- **[Feature 3, e.g., Team Collaboration]:** Share your workspace and results with team members by adding their email addresses.

---

### Step 3: Secure Your Account
Your security is our priority. If you plan to use custom API keys, please review our security guidelines in the settings panel. Ensure you do not expose private credentials.

---

### Support and Resources
We are here to support your progress. If you have questions or need assistance, you can access our documentation at [YOUR_DOCUMENTATION_URL] or reply directly to this email to speak with our support team.

We look forward to helping you achieve your goals with [YOUR_PRODUCT_NAME].

Sincerely,

[YOUR_NAME]  
Founder, [YOUR_PRODUCT_NAME]  
[YOUR_WEBSITE_URL]  

---

> [!NOTE]
> **Developer Implementation Advice:**
> To automate this email, integrate it with your email delivery service (such as Resend, Postmark, or SendGrid) using their Node.js SDK. Trigger this email function within your Firebase Authentication `onCreate` trigger or during your database user initialization logic.
