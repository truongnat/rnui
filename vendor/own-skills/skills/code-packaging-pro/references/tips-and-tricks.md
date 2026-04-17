# Tips and tricks

- **One** `Dockerfile` per service — avoid mega-images that install every optional extra.
- **`pip-tools`** or **lockfiles** for **reproducible** CI installs when the project uses them.
- **Semantic versioning** — document **breaking** changes in **CHANGELOG** for library consumers.
