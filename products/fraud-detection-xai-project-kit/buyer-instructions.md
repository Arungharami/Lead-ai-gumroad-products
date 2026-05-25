# Buyer Instructions — Fraud Detection XAI Project Kit

---

## Prerequisites

Before you start, make sure you have:

- **Python 3.9 or later** — Check: `python --version` in your terminal
- **pip** — Check: `pip --version`
- **Jupyter Notebook or JupyterLab** — Install if needed: `pip install jupyterlab`
- Basic Python and pandas familiarity (able to read and modify code, not just paste it)

---

## Step 1: Download and unzip

After purchase, Gumroad sends you a download link by email. Download the ZIP file and unzip it into a folder of your choice.

Suggested folder name: `fraud-detection-xai-project`

---

## Step 2: Install dependencies

Open your terminal, navigate to the project folder, and run:

```bash
pip install -r requirements.txt
```

This installs: scikit-learn, xgboost, shap, pandas, numpy, matplotlib, seaborn, flask, imbalanced-learn

If you prefer a virtual environment (recommended):

```bash
python -m venv venv
source venv/bin/activate      # Mac/Linux
venv\Scripts\activate         # Windows
pip install -r requirements.txt
```

---

## Step 3: Open the Jupyter Notebook

```bash
jupyter lab
```

This opens JupyterLab in your browser. Navigate to the project folder and open `fraud_detection_xai.ipynb`.

---

## Step 4: Run the notebook

Run the notebook from top to bottom using **Run → Run All Cells** or by pressing **Shift + Enter** on each cell.

The notebook has these sections:
1. **Data Loading** — loads the sample dataset
2. **Exploratory Data Analysis** — understand the data distribution
3. **Feature Engineering** — prepares features for modeling
4. **Class Imbalance Handling** — SMOTE + threshold tuning
5. **Model Training** — XGBoost with cross-validation
6. **Model Evaluation** — AUC-ROC, precision-recall curve, confusion matrix
7. **SHAP Explainability** — summary plot, waterfall plot, force plot
8. **Deployment** — Flask API setup instructions

Each section has comments explaining what is happening and why.

---

## Step 5: Review the SHAP visualizations

After running the notebook, you will see three types of SHAP plots:

- **Summary plot:** Shows which features have the most influence on fraud predictions overall
- **Waterfall plot:** Shows why a specific transaction was flagged as fraud
- **Force plot:** Interactive visualization for any individual prediction

These are the outputs to screenshot and include in your portfolio or client presentation.

---

## Step 6: Customize for your own data

To use your own dataset instead of the sample data:

1. Open Section 1 (Data Loading)
2. Replace the `pd.read_csv('data/sample_transactions.csv')` line with your data file
3. Update the feature names in Section 3 to match your columns
4. Run all cells again

Section comments tell you exactly what needs to change for each customization.

---

## Step 7: Deploy (optional)

The deployment section includes instructions for:

- **Local deployment:** Run the Flask API on your machine (`python app.py`)
- **AWS deployment:** Upload to an EC2 instance or Lambda
- **GCP deployment:** Cloud Run deployment steps
- **Heroku:** Free-tier deployment (note: Heroku free tier has changed — check their current pricing)

---

## Step 8: Publish your portfolio project

Use the included `github-readme-template.md` to create a professional GitHub repository for this project. Fill in the screenshot placeholders with your SHAP visualization outputs.

---

## Getting help

Email: **a.gharami.325@westcliff.edu**  
Subject: "XAI Kit question — [brief description]"

Include:
- Your operating system and Python version
- The exact error message (copy and paste it)
- Which section of the notebook you are in

Response within 48 hours on business days.

---

## Getting updates

When a new version is released, Gumroad will notify you by email. All updates are free. You can re-download from the same Gumroad link.

---

## What's next?

After completing this project, consider:

- **Firebase SaaS Starter Kit ($49):** Turn this fraud detector into a SaaS product with auth, dashboard, and payments
- **Lead.AI Bundle ($79):** Get the full system at a significant discount
