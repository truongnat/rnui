# Edge cases

- **Monorepo** — multiple `pyproject` roots; **paths** and **working-directory** in Actions must match.
- **Native** extensions — **manylinux** wheels vs **source** builds; **Docker** may hide **Mac**-only failures.
- **Private** PyPI — **auth** in CI (**`security-pro`**); never log **tokens**.
