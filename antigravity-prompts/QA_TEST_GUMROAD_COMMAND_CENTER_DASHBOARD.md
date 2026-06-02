# Antigravity Prompt — QA Test Gumroad Command Center Dashboard

Use this after Antigravity builds the dashboard files (`index.html`, `index.css`, `app.js`).

---

## PROMPT

You are a senior frontend QA engineer, product manager, security reviewer, and Gumroad dashboard developer.

The local app is running at:

http://localhost:3000

Your task is to fully test, fix, and polish the Gumroad Command Center dashboard.

## Important Security Rule

Do not commit any real Gumroad access token to the repository.
Do not hardcode tokens in `index.html`, `index.css`, `app.js`, README files, test files, or screenshots.
If token testing is needed, use a temporary local-only value and make sure it is not saved in Git.

## Files To Inspect

- index.html
- index.css
- app.js
- any dashboard-related assets
- README or dashboard setup docs if they exist

## Test Scope

### 1. Server and Page Load

- Confirm `http://localhost:3000` loads successfully.
- Confirm there are no blank screens.
- Confirm browser console has no critical JavaScript errors.
- Confirm CSS loads correctly.
- Confirm JS loads correctly.
- Confirm the app works after hard refresh.

### 2. Dashboard View

Test:

- Total Revenue card
- Total Sales card
- Active Products card
- Monthly Revenue card
- Revenue trend chart
- Top products chart
- Recent sales feed
- Empty state if no sales data
- Demo data loads by default

Fix any broken layout, wrong numbers, missing labels, overflow, or chart rendering problems.

### 3. Products View

Test:

- Product cards render correctly
- Product search works
- Product filters work
- Sorting works by revenue, sales, date, and name
- Active/draft/archived labels display correctly
- Product links work if URLs exist
- Long product names do not break layout
- Mobile layout is readable

### 4. Sales View

Test:

- Sales table renders
- Date filters work
- Product filters work
- Search works if implemented
- Pagination works if implemented
- Export CSV button works
- Exported CSV has clean column names
- Empty state works

### 5. Analytics View

Test:

- Revenue-over-time chart
- Sales breakdown chart
- Product performance chart
- Canvas resizes correctly
- Charts do not blur badly
- Tooltip or hover states work if implemented
- No chart crashes when there is no data

### 6. Settings View

Test:

- Demo Mode toggle works
- Live Mode toggle works
- Gumroad token input works without exposing token visibly by default
- Test API button gives clear success/error message
- Dark/light theme toggle works if implemented
- Settings persist only if safe
- Add clear warning: “Do not share your Gumroad token. Do not commit it to GitHub.”

### 7. Gumroad API Integration Review

Inspect the API integration code.

Make sure:

- API calls are separated into clean functions
- Error messages are user-friendly
- Loading states are visible
- Failed API response does not crash the app
- Invalid token shows a clear message
- Demo Mode still works if API fails
- No token is logged to console
- No token is stored insecurely without warning

If browser CORS blocks direct Gumroad calls, do not fake success.
Instead:

- Keep Demo Mode fully working
- Add a clear message explaining Live Mode may require a small backend/serverless proxy
- Add a `serverless-proxy-example.md` file with a safe architecture explanation
- Do not expose secrets in frontend code

### 8. Responsive Design

Test at:

- 1440px desktop
- 1024px tablet
- 768px tablet
- 390px mobile

Fix:

- broken nav
- overflowing cards
- unreadable charts
- tables too wide without scroll
- buttons too small
- cramped spacing

### 9. Accessibility

Improve:

- button labels
- form labels
- focus states
- color contrast
- keyboard navigation
- aria labels where useful

### 10. Product Quality Polish

Make the dashboard feel premium:

- Clean spacing
- Consistent typography
- Professional cards
- Smooth but not excessive animations
- Good empty states
- Helpful onboarding text
- Clear CTA buttons

## Required Deliverables

Create or update:

- DASHBOARD_QA_REPORT.md
- DASHBOARD_TEST_CHECKLIST.md
- DASHBOARD_USER_GUIDE.md

`DASHBOARD_QA_REPORT.md` must include:

- What was tested
- What passed
- What failed
- What was fixed
- Any remaining limitations
- Whether Live Mode is fully functional or requires backend/proxy

`DASHBOARD_TEST_CHECKLIST.md` must include a checkbox list of all tests.

`DASHBOARD_USER_GUIDE.md` must include:

- How to run locally
- How Demo Mode works
- How Live Mode works
- How to use Gumroad token safely
- How to export CSV
- How to troubleshoot common issues

## Final Commands

Run the local server again and confirm the dashboard loads.

If npm scripts exist, use them.
Otherwise use a simple local server such as:

python3 -m http.server 3000

Then verify:

- Local URL works
- Demo Mode works
- Navigation works
- No console-breaking errors

## Final Response Required

When complete, summarize:

1. Files inspected
2. Bugs found
3. Bugs fixed
4. Features verified
5. Remaining issues
6. Exact next manual step for Arun

Do not say everything is perfect unless it was actually tested.
