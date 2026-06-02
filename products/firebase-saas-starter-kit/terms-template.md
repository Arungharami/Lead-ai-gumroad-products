# Terms of Service for [YOUR_PRODUCT_NAME]

Last Updated: [INSERT_DATE, e.g., June 1, 2026]

Welcome to [YOUR_PRODUCT_NAME], which is owned and operated by [YOUR_COMPANY_NAME] ("we", "us", or "our"). These Terms of Service ("Terms") govern your access to and use of our SaaS platform, website, software kits, templates, and related services (collectively, the "Service").

By accessing or using the Service, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use the Service.

---

## 1. Acceptance and Modifications

### 1.1 Acceptance of Terms
By creating an account, subscribing to a plan, purchasing our templates, or accessing the Service, you confirm that you have read, understood, and agreed to these Terms. If you are entering into these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these Terms.

### 1.2 Amendments to Terms
We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the updated Terms on this website and updating the "Last Updated" date. Your continued use of the Service after such modifications constitutes your acceptance of the revised Terms.

---

## 2. Description of Service and Account Registration

### 2.1 The Service
[YOUR_PRODUCT_NAME] is an AI-powered software-as-a-service platform that provides users with [brief description of SaaS utility, e.g., automated analytics, AI-assisted writing, image generation, or boilerplate starter kits].

### 2.2 Account Security
To access certain features of the Service, you must register for an account. You agree to:
- Provide accurate, current, and complete information during registration.
- Maintain the security of your account by protecting your password and restricting access to your account.
- Promptly notify us at [YOUR_SUPPORT_EMAIL] if you discover or suspect any security breaches related to the Service or your account.

---

## 3. Subscriptions, Payments, and Billing Cycles

### 3.1 Subscriptions and Plans
Access to certain premium features of the Service is provided on a subscription basis. We offer monthly and annual billing options as detailed on our pricing page.

### 3.2 Payment Processors
All financial transactions, billing, and subscriptions are managed securely through our third-party payment processors:
- **Stripe:** Payments are processed in accordance with the Stripe Services Agreement.
- **Gumroad:** Purchases made via Gumroad are subject to the Gumroad Terms of Service.

By initiating a transaction, you authorize our third-party billing providers to charge your selected payment method for the recurring subscription fees, applicable taxes, and any other charges incurred in connection with your use of the Service.

### 3.3 Billing Cycles and Automatic Renewal
Subscriptions automatically renew at the end of each billing cycle (monthly or annually) unless you cancel your subscription prior to the renewal date. You may cancel your subscription at any time through your account dashboard or by contacting support at [YOUR_SUPPORT_EMAIL].

### 3.4 Price Adjustments
We reserve the right to adjust pricing for the Service or any components thereof at any time. Any price changes will take effect following email notification to you at least 30 days prior to the billing cycle renewal.

---

## 4. Code Usage License (For Boilerplates, Kits, and Templates)

If your purchase or subscription includes access to codebase templates, starter kits, or boilerplate code (collectively, "Software Product"), the following licensing terms apply.

### 4.1 Personal and Commercial License
Subject to your compliance with these Terms and payment of the applicable fees, we grant you a non-exclusive, non-transferable, non-sublicensable, worldwide license to:
- Use the Software Product to build personal applications.
- Use the Software Product to build commercial applications for yourself or for clients.
- Modify, adapt, and customize the codebase of the Software Product to fit your requirements.

### 4.2 Limitations and Prohibitions
You are strictly prohibited from:
- Redistributing, reselling, sharing, or sublicensing the Software Product in its original, modified, or unmodified source code form as a template, starter kit, library, or boilerplate.
- Creating a competing platform, boilerplate marketplace, or template service using the Software Product as the foundation.
- Making the source code of the Software Product publicly accessible in any public repository, such as a public GitHub repository. All source code repositories containing the Software Product must be set to private.

---

## 5. Fair Use and Third-Party AI API Consumption Rules

### 5.1 Fair Use Policy
If your subscription includes access to shared AI model pipelines hosted on our infrastructure, your usage is subject to our Fair Use Policy. We monitor server loads and system usage to ensure equitable distribution of computing resources. We reserve the right to throttle, limit, or temporarily suspend accounts that consume an excessive volume of resources that degrades service performance for other users.

### 5.2 API Consumption Rules
If the Service permits you to connect your own API keys for third-party AI services, the following rules apply:
- You are solely responsible for all API charges incurred on your third-party accounts (e.g., OpenAI, Anthropic, Gemini, Firebase).
- You must comply with the developer terms of use and policies set by those respective providers.
- You must configure rate limits on your own application to prevent unexpected billing spikes on your provider accounts.

---

## 6. Private Key Safety and Technical Security Warnings

> [!WARNING]
> You are fully responsible for the security of your own API keys, private keys, database credentials, and production environment variables.

### 6.1 Private Key and API Key Safety Rules
When configuring your local environment or using our starter kits, you must strictly adhere to the following security protocols:
- **Never hardcode credentials:** Do not hardcode Firebase Admin SDK private keys, Stripe secret keys, OpenAI API keys, or any other sensitive credentials directly inside your application code.
- **Use Environment Variables:** Store all sensitive credentials in `.env` files or secure environment managers (e.g., Firebase Functions Config, Google Cloud Run Environment Variables, Vercel Environment Variables).
- **Configure `.gitignore`:** Ensure that `.env`, `*.json` service accounts, and any secret configurations are added to your `.gitignore` file before committing code to any version control repository.
- **Client-Side vs Server-Side Safety:** Never expose server-side environment variables (e.g., variables starting with `NEXT_PUBLIC_` in Next.js or config variables exposed in React client bundles) to the client-side browser runtime. Doing so will expose your private keys to the public.

We are not liable for any unauthorized access, security breaches, database deletion, API key theft, or financial liabilities resulting from your failure to protect your private credentials or environment configurations.

---

## 7. Intellectual Property Rights

### 7.1 Ownership of Service
Except for the customized applications you build using our boilerplate code under the terms of Section 4, we retain all right, title, and interest in and to the Service, including all source code, software architecture, user interface designs, logos, graphics, databases, and website content.

### 7.2 Feedback
If you provide us with any feedback, suggestions, or feature requests regarding the Service, you grant us an unrestricted, perpetual, royalty-free, and irrevocable license to use and exploit such feedback for any purpose without compensation to you.

---

## 8. Limitation of Liability and Disclaimer of Warranties

### 8.1 Disclaimer of Warranties
The Service is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied. To the maximum extent permitted by law, we disclaim all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, non-infringement, compatibility, security, and accuracy. We do not warrant that the Service will be uninterrupted, error-free, or free of harmful components.

### 8.2 Limitation of Liability
To the maximum extent permitted by applicable law, in no event shall [YOUR_COMPANY_NAME] or its directors, employees, partners, or agents be liable for any indirect, incidental, special, consequential, or punitive damages. This includes, without limitation, loss of profits, loss of data, loss of business, API key leakage charges, database security failures, server downtime costs, or other intangible losses resulting from:
- Your access to or use of, or inability to access or use, the Service.
- Any unauthorized access to or use of our secure servers or any personal or financial information stored therein.
- Any bugs, viruses, Trojan horses, or the like that may be transmitted to or through our Service by any third party.
- Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available through the Service.

In no event shall our cumulative liability exceed the total amount paid by you to us for the Service during the six (6) month period preceding the event giving rise to such liability.

---

## 9. Governing Law and Dispute Resolution

### 9.1 Governing Law
These Terms shall be governed by and construed in accordance with the laws of [YOUR_JURISDICTION, e.g., the State of California, United States], without regard to its conflict of law principles.

### 9.2 Dispute Resolution
Any dispute, claim, or controversy arising out of or relating to these Terms or the breach, termination, enforcement, interpretation, or validity thereof shall be resolved exclusively in the courts located in [YOUR_CITY_AND_STATE/COUNTRY].

---

## 10. Contact Information

If you have any questions or concerns regarding these Terms of Service, please contact us at:

- **Email:** [YOUR_SUPPORT_EMAIL]
- **Website:** [YOUR_WEBSITE_URL]
