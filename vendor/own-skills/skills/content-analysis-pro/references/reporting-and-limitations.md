# Reporting, fidelity, and limitations

## Report structure (recommended)

1. **Source summary** — What was provided (type, length, language if known).
2. **Executive findings** — 3–7 bullets answering the user’s goal.
3. **Detailed analysis** — By section, theme, or **timeline** (video).
4. **Evidence map** — Quotes/snippets with **page** / **timestamp** / **region** references.
5. **Gaps and uncertainties** — What could not be read or inferred safely.
6. **Recommendations** — Optional next steps (deeper review, human expert, higher-resolution scan).

## Fidelity rules

- **Do not invent** facts not supported by the source; label **inference** clearly (“likely … because …”).
- **Distinguish** — Description of what is **shown** vs **interpretation**.
- **Sensitive content** — PII, credentials, medical/legal: **minimize** reproduction; summarize at category level unless user needs verbatim (**`security-pro`**).

## Limitations to state when relevant

- **Resolution / blur** — Small text, motion blur in video.
- **Language** — Mixed languages; translation adds error risk.
- **Model bias** — Vision/text models can **hallucinate** details; critical use cases need **human** verification.
- **Copyright** — Analysis is fair use for review; **redistribution** of long excerpts may not be.

## Confidence

- Use **high / medium / low** per major claim or **overall** when the pipeline is uncertain.

## Output formats

- **Markdown** tables for comparisons; **bullet** lists for findings; **code blocks** only for quoted excerpts the user requested.

## Repeatable automation (self-support scripts)

- **One-off** analysis does not require a script; **repeated** extraction (same FFmpeg flags, same OCR pipeline, CI checks) should become a **project script** or **documented command** the user can run locally.
- In **this** template repo, shared helpers live under root **`scripts/`** (see **`repo-tooling-pro`** and **`scripts/README.md`**). Domain skills stay in **`skills/<name>/`**; when a skill repeatedly names **CLI tools** without a stable wrapper, authors may add a small helper under **`scripts/`** and link it from **`SKILL.md`** so agents and humans run the same steps.
