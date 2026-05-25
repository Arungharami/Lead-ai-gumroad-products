#!/usr/bin/env python3
"""
build_product_zip.py — Lead.AI Product ZIP Builder

Creates distributable ZIP files for each product into /dist.
Run from repository root: python scripts/build_product_zip.py

Each ZIP contains all the customer-facing files for that product
(excludes internal spec files like product.md and cover/thumbnail prompts).

Output: dist/{product-slug}-v{version}.zip
"""

import os
import sys
import zipfile
import yaml
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).parent.parent
DIST_DIR = ROOT / "dist"

# Files to exclude from customer ZIPs (internal/design files)
EXCLUDE_FROM_ZIP = {
    "product.md",           # internal spec
    "cover-prompt.md",      # design prompts, not for buyers
    "thumbnail-prompt.md",  # design prompts, not for buyers
    "upgrade-plan.md",      # internal roadmap
}

# Files to always include for every product
ALWAYS_INCLUDE = {
    "gumroad-description.md",   # excluded in practice — just for reference in ZIP
    "buyer-instructions.md",
    "receipt-message.md",       # copy of the receipt, useful reference for buyer
    "customer-onboarding.md",
    "faq.md",
    "update-log.md",
}

COLORS = {
    "green": "\033[92m",
    "red": "\033[91m",
    "yellow": "\033[93m",
    "blue": "\033[94m",
    "bold": "\033[1m",
    "reset": "\033[0m",
}


def colored(text, color):
    return f"{COLORS.get(color, '')}{text}{COLORS['reset']}"


def load_product_control():
    """Load product-control.yaml."""
    yaml_path = ROOT / "product-control.yaml"
    if not yaml_path.exists():
        print(colored("ERROR: product-control.yaml not found", "red"))
        sys.exit(1)
    with open(yaml_path, "r") as f:
        return yaml.safe_load(f)


def get_version(slug, control_data):
    """Get version for a product from product-control.yaml."""
    for section in ["products", "bundles", "freebies"]:
        items = control_data.get(section, [])
        for item in items:
            if item.get("id") == slug:
                return item.get("version", "1.0.0")
    return "1.0.0"


def build_zip_for_folder(folder_path, product_id, version, product_type="product"):
    """Build a ZIP file for a product folder."""
    zip_name = f"{product_id}-v{version}.zip"
    zip_path = DIST_DIR / zip_name

    if not folder_path.exists():
        print(colored(f"  SKIP  {product_id} — folder not found: {folder_path}", "yellow"))
        return None

    files_added = []
    files_skipped = []

    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        # Add all files in the folder (and subfolders) except excluded ones
        for file_path in sorted(folder_path.rglob("*")):
            if file_path.is_dir():
                continue
            if file_path.name in EXCLUDE_FROM_ZIP:
                files_skipped.append(file_path.name)
                continue
            if file_path.name.startswith("."):
                continue

            # Archive path: use relative path from the folder
            arcname = file_path.relative_to(folder_path)
            zf.write(file_path, arcname)
            files_added.append(str(arcname))

        # Add a README for the buyer at the root of the ZIP
        readme_content = generate_zip_readme(product_id, version)
        zf.writestr("START-HERE.md", readme_content)
        files_added.append("START-HERE.md")

    return zip_path, files_added, files_skipped


def generate_zip_readme(product_id, version):
    """Generate a START-HERE.md for the ZIP file root."""
    product_names = {
        "trustworthy-ai-business-playbook": "Trustworthy AI Business Playbook",
        "fraud-detection-xai-project-kit": "Fraud Detection XAI Project Kit",
        "firebase-saas-starter-kit": "Firebase SaaS Starter Kit",
        "ai-automation-prompt-vault": "AI Automation Prompt Vault",
        "lead-ai-business-automation-xai-builder-bundle": "Lead.AI Business Automation & XAI Builder Bundle",
        "free-ai-product-launch-checklist": "Free AI Product Launch Checklist",
    }

    first_steps = {
        "trustworthy-ai-business-playbook": "Open the PDF and read the introduction (5 minutes).",
        "fraud-detection-xai-project-kit": "Read buyer-instructions.md first, then run: pip install -r requirements.txt",
        "firebase-saas-starter-kit": "Read buyer-instructions.md first, then run: npm install",
        "ai-automation-prompt-vault": "Open the PDF and read the index on the first page.",
        "lead-ai-business-automation-xai-builder-bundle": "Read the 7-day plan in customer-onboarding.md",
        "free-ai-product-launch-checklist": "Open checklist.md and start with Phase 1.",
    }

    name = product_names.get(product_id, product_id)
    first_step = first_steps.get(product_id, "Open buyer-instructions.md to get started.")

    return f"""# {name}
Version {version} — Lead.AI

---

## Start here

{first_step}

For complete setup instructions, open: buyer-instructions.md

For a complete onboarding guide (first 10 minutes → first day), open: customer-onboarding.md

---

## Support

Questions? Email: a.gharami.325@westcliff.edu
Subject: "{name} question — [brief description]"

Response within 48 hours on business days.

---

## Updates

When a new version is released, Gumroad will notify you by email.
All updates are free for existing buyers.

---

Lead.AI — by Arun Kumar Gharami
https://github.com/Arungharami/Lead-ai-gumroad-products
"""


def main():
    print()
    print(colored("=" * 60, "bold"))
    print(colored("  Lead.AI Product ZIP Builder", "bold"))
    print(colored(f"  {datetime.now().strftime('%Y-%m-%d %H:%M')}", "bold"))
    print(colored("=" * 60, "bold"))
    print()

    # Load product data
    try:
        control_data = load_product_control()
    except Exception as e:
        print(colored(f"ERROR loading product-control.yaml: {e}", "red"))
        sys.exit(1)

    # Ensure dist directory exists
    DIST_DIR.mkdir(exist_ok=True)
    print(colored(f"Output directory: {DIST_DIR}", "blue"))
    print()

    built = []
    failed = []

    # Build products
    print(colored("PRODUCTS", "blue"))
    products_dir = ROOT / "products"
    if products_dir.exists():
        for folder in sorted(products_dir.iterdir()):
            if not folder.is_dir():
                continue
            version = get_version(folder.name, control_data)
            result = build_zip_for_folder(folder, folder.name, version, "product")
            if result:
                zip_path, files_added, files_skipped = result
                size_kb = zip_path.stat().st_size // 1024
                print(colored(f"  BUILT  {zip_path.name} ({size_kb}KB, {len(files_added)} files)", "green"))
                if files_skipped:
                    print(f"         Excluded: {', '.join(files_skipped)}")
                built.append(zip_path.name)
            else:
                failed.append(folder.name)
    print()

    # Build bundles
    print(colored("BUNDLES", "blue"))
    bundle_dir = ROOT / "bundle"
    if bundle_dir.exists():
        for folder in sorted(bundle_dir.iterdir()):
            if not folder.is_dir():
                continue
            version = get_version(folder.name, control_data)
            result = build_zip_for_folder(folder, folder.name, version, "bundle")
            if result:
                zip_path, files_added, files_skipped = result
                size_kb = zip_path.stat().st_size // 1024
                print(colored(f"  BUILT  {zip_path.name} ({size_kb}KB, {len(files_added)} files)", "green"))
                built.append(zip_path.name)
            else:
                failed.append(folder.name)
    print()

    # Build freebies
    print(colored("FREEBIES", "blue"))
    freebies_dir = ROOT / "freebies"
    if freebies_dir.exists():
        for folder in sorted(freebies_dir.iterdir()):
            if not folder.is_dir():
                continue
            version = get_version(folder.name, control_data)
            result = build_zip_for_folder(folder, folder.name, version, "freebie")
            if result:
                zip_path, files_added, files_skipped = result
                size_kb = zip_path.stat().st_size // 1024
                print(colored(f"  BUILT  {zip_path.name} ({size_kb}KB, {len(files_added)} files)", "green"))
                built.append(zip_path.name)
            else:
                failed.append(folder.name)
    print()

    # Summary
    print(colored("=" * 60, "bold"))
    print(colored(f"  Built: {len(built)} ZIP file(s)", "green"))
    if failed:
        print(colored(f"  Failed: {len(failed)} — {', '.join(failed)}", "red"))
    print(colored(f"  Location: {DIST_DIR}", "blue"))
    print(colored("=" * 60, "bold"))
    print()

    if built:
        print("Next step: upload these ZIP files to Gumroad as your product files.")
        print()

    return 0 if not failed else 1


if __name__ == "__main__":
    # Check if PyYAML is installed
    try:
        import yaml
    except ImportError:
        print("ERROR: PyYAML is required. Install with: pip install pyyaml")
        sys.exit(1)

    sys.exit(main())
