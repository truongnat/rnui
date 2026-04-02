# GitHub Actions — libraries and images

## Patterns

- **Triggers** — `push` to `main`, **PR** for validation, **tags** for **release** workflows.
- **Matrix** — Python versions × OS for **libraries**; **pin** `actions/checkout` and **`setup-python`** by **commit SHA** or **version tag** for **supply chain** hygiene (**`security-pro`**).
- **Caching** — `pip` / **Poetry** cache when network is the bottleneck; **invalidate** when `requirements` change.

## Jobs (typical split)

| Job | Role |
|-----|------|
| **lint / typecheck** | Fast feedback |
| **test** | Unit + integration per matrix |
| **build** | **sdist/wheel** or **Docker** image push to registry |
| **release** | **Trusted publishing** to **PyPI** (OIDC) when applicable |

## Secrets

- Prefer **OIDC** to cloud/registry over long-lived **tokens** in **fork** PRs — **`security-pro`**.

## Relationship to **`testing-pro`**

- **`testing-pro`** — **What** tests mean (pyramid, flakiness); **this** skill — **workflow YAML** structure for **build** and **publish**.
