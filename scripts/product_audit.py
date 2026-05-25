#!/usr/bin/env python3
"""
product_audit.py — Lead.AI Product File Audit Script

Scans all product folders and reports which required files are missing.
Run from the repository root: python scripts/product_audit.py

Exit code: 0 if all products pass, 1 if any files are missing.
"""

import os
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent

PRODUCT_REQUIRED_FILES = [
    "product.md",
    "gumroad-description.md",
    "buyer-instructions.md",
    "receipt-message.md",
    "customer-onboarding.md",
    "cover-prompt.md",
    "thumbnail-prompt.md",
    "faq.md",
    "upgrade-plan.md",
    "update-log.md",
]

PRODUCT_EXTRA_FILES = {
    "fraud-detection-xai-project-kit": ["github-readme-template.md"],
    "firebase-saas-starter-kit": ["deployment-checklist.md"],
    "ai-automation-prompt-vault": ["preview-prompts.md"],
}

BUNDLE_REQUIRED_FILES = [
    "product.md",
    "gumroad-description.md",
    "buyer-instructions.md",
    "receipt-message.md",
    "customer-onboarding.md",
    "cover-prompt.md",
    "thumbnail-prompt.md",
    "faq.md",
    "bundle-checklist.md",
    "upgrade-plan.md",
    "update-log.md",
]

FREEBIE_REQUIRED_FILES = [
    "product.md",
    "gumroad-description.md",
    "checklist.md",
    "receipt-message.md",
    "customer-onboarding.md",
    "email-capture-plan.md",
]

MARKETING_REQUIRED_FILES = [
    "30-day-launch-plan.md",
    "linkedin-post-prompts.md",
    "reddit-post-prompts.md",
    "youtube-shorts-prompts.md",
    "twitter-x-post-prompts.md",
    "email-sequence-prompts.md",
    "customer-retention-prompts.md",
    "affiliate-outreach-prompts.md",
    "weekly-update-prompts.md",
]

TEMPLATE_REQUIRED_FILES = [
    "gumroad-product-page-template.md",
    "buyer-instruction-template.md",
    "receipt-message-template.md",
    "customer-onboarding-template.md",
    "launch-checklist-template.md",
    "product-update-template.md",
    "support-response-template.md",
    "refund-response-template.md",
]

ROOT_REQUIRED_FILES = [
    "README.md",
    "CLAUDE.md",
    "AGENTS.md",
    "product-control.yaml",
    "CHANGELOG.md",
    "CUSTOMER_SUCCESS.md",
    "LAUNCH_CHECKLIST.md",
    "SUPPORT_POLICY.md",
    "VERSIONING.md",
]

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


def check_files(folder_path, required_files, label):
    """Check if all required files exist in a folder. Returns list of missing files."""
    missing = []
    for filename in required_files:
        filepath = folder_path / filename
        if not filepath.exists():
            missing.append(filename)
    return missing


def audit_section(section_path, required_files, label, extra_files=None):
    """Audit a single folder and print results. Returns True if all pass."""
    all_pass = True
    missing = check_files(section_path, required_files, label)

    if extra_files:
        folder_name = section_path.name
        extra = extra_files.get(folder_name, [])
        missing_extra = check_files(section_path, extra, label)
        missing.extend(missing_extra)

    if missing:
        print(colored(f"  FAIL  {label}", "red"))
        for f in missing:
            print(colored(f"        MISSING: {f}", "yellow"))
        all_pass = False
    else:
        print(colored(f"  PASS  {label}", "green"))

    return all_pass


def run_audit():
    print()
    print(colored("=" * 60, "bold"))
    print(colored("  Lead.AI Product Audit Report", "bold"))
    print(colored("=" * 60, "bold"))
    print()

    all_pass = True

    # Root files
    print(colored("ROOT FILES", "blue"))
    root_pass = audit_section(ROOT, ROOT_REQUIRED_FILES, "Repository root")
    all_pass = all_pass and root_pass
    print()

    # Products
    products_dir = ROOT / "products"
    print(colored("PRODUCTS", "blue"))
    if products_dir.exists():
        product_folders = sorted([f for f in products_dir.iterdir() if f.is_dir()])
        if not product_folders:
            print(colored("  WARNING: No product folders found", "yellow"))
        for folder in product_folders:
            pass_ = audit_section(
                folder,
                PRODUCT_REQUIRED_FILES,
                f"products/{folder.name}",
                extra_files=PRODUCT_EXTRA_FILES,
            )
            all_pass = all_pass and pass_
    else:
        print(colored("  MISSING: products/ directory", "red"))
        all_pass = False
    print()

    # Bundle
    bundle_dir = ROOT / "bundle"
    print(colored("BUNDLE", "blue"))
    if bundle_dir.exists():
        bundle_folders = sorted([f for f in bundle_dir.iterdir() if f.is_dir()])
        for folder in bundle_folders:
            pass_ = audit_section(
                folder,
                BUNDLE_REQUIRED_FILES,
                f"bundle/{folder.name}",
            )
            all_pass = all_pass and pass_
    else:
        print(colored("  MISSING: bundle/ directory", "red"))
        all_pass = False
    print()

    # Freebies
    freebies_dir = ROOT / "freebies"
    print(colored("FREEBIES", "blue"))
    if freebies_dir.exists():
        freebie_folders = sorted([f for f in freebies_dir.iterdir() if f.is_dir()])
        for folder in freebie_folders:
            pass_ = audit_section(
                folder,
                FREEBIE_REQUIRED_FILES,
                f"freebies/{folder.name}",
            )
            all_pass = all_pass and pass_
    else:
        print(colored("  MISSING: freebies/ directory", "red"))
        all_pass = False
    print()

    # Marketing
    marketing_dir = ROOT / "marketing"
    print(colored("MARKETING", "blue"))
    if marketing_dir.exists():
        pass_ = audit_section(
            marketing_dir,
            MARKETING_REQUIRED_FILES,
            "marketing/",
        )
        all_pass = all_pass and pass_
    else:
        print(colored("  MISSING: marketing/ directory", "red"))
        all_pass = False
    print()

    # Templates
    templates_dir = ROOT / "templates"
    print(colored("TEMPLATES", "blue"))
    if templates_dir.exists():
        pass_ = audit_section(
            templates_dir,
            TEMPLATE_REQUIRED_FILES,
            "templates/",
        )
        all_pass = all_pass and pass_
    else:
        print(colored("  MISSING: templates/ directory", "red"))
        all_pass = False
    print()

    # Summary
    print(colored("=" * 60, "bold"))
    if all_pass:
        print(colored("  RESULT: ALL CHECKS PASSED", "green"))
    else:
        print(colored("  RESULT: SOME CHECKS FAILED — see above", "red"))
    print(colored("=" * 60, "bold"))
    print()

    # Placeholder check
    print(colored("PLACEHOLDER CHECK", "blue"))
    print("  Scanning for TODO / INSERT HERE / [BRACKETED] text in md files...")
    placeholder_issues = []
    for md_file in ROOT.rglob("*.md"):
        # Skip template files — they intentionally have placeholders
        if "templates" in md_file.parts:
            continue
        try:
            content = md_file.read_text(encoding="utf-8")
            issues = []
            if "TODO" in content:
                issues.append("contains 'TODO'")
            if "INSERT HERE" in content:
                issues.append("contains 'INSERT HERE'")
            # Check for unfilled bracketed placeholders (but not markdown links like [text](url))
            import re
            brackets = re.findall(r'\[([A-Z][A-Z\s/]+)\](?!\()', content)
            if brackets:
                issues.append(f"possible unfilled placeholders: {brackets[:3]}")
            if issues:
                rel_path = md_file.relative_to(ROOT)
                placeholder_issues.append((str(rel_path), issues))
        except Exception:
            pass

    if placeholder_issues:
        for path, issues in placeholder_issues:
            print(colored(f"  WARN  {path}", "yellow"))
            for issue in issues:
                print(f"        {issue}")
    else:
        print(colored("  PASS  No obvious placeholder text found", "green"))

    print()
    print(colored("=" * 60, "bold"))
    if all_pass and not placeholder_issues:
        print(colored("  AUDIT COMPLETE — READY TO LAUNCH", "green"))
    elif all_pass:
        print(colored("  FILES COMPLETE — review placeholder warnings above", "yellow"))
    else:
        print(colored("  FIX MISSING FILES BEFORE LAUNCHING", "red"))
    print(colored("=" * 60, "bold"))
    print()

    return 0 if all_pass else 1


if __name__ == "__main__":
    sys.exit(run_audit())
