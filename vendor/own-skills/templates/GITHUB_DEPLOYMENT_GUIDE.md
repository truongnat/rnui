
Human: {input}
"""

prompt = PromptTemplate(
    input_variables=["domain", "history", "input"],
    template=template
)

# Create chain with memory
memory = ConversationBufferMemory()
chain = LLMChain(prompt=prompt, memory=memory)
```

**LlamaIndex Example:**
```python
from llama_index import GPTVectorStoreIndex, SimpleDirectoryReader

# Load documents
documents = SimpleDirectoryReader('knowledge-base/').load_data()

# Create index
index = GPTVectorStoreIndex.from_documents(documents)

# Query
query_engine = index.as_query_engine()
response = query_engine.query("What is the refund policy?")
```

---

## 📦 GitHub Structure & Deployment

### 1. Repository Structure

```
your-ai-toolkit/                 # Root repository
├── .github/
│   ├── workflows/
│   │   ├── test-skills.yml      # CI/CD for skill testing
│   │   ├── build-docs.yml       # Auto-generate documentation
│   │   └── deploy.yml           # Deployment workflow
│   └── ISSUE_TEMPLATE/
│       ├── skill-request.md
│       └── bug-report.md
├── skills/
│   ├── README.md
│   ├── <skill-name>/            # One directory per skill
│   └── examples/
│       └── skill-template/      # Template for new skills
├── knowledge-base/
│   ├── documents/
│   ├── embeddings/              # Gitignored if too large
│   └── schemas/
├── prompts/
│   ├── templates/
│   └── chains/
├── mcp-servers/
│   ├── custom-servers/
│   └── configs/
├── scripts/
│   ├── setup.sh                 # Installation script
│   ├── build.py                 # Build/package scripts
│   └── test.py                  # Testing utilities
├── tests/
│   ├── skill-tests/
│   └── integration-tests/
├── docs/
│   ├── getting-started.md
│   ├── skill-development.md
│   └── api-reference.md
├── .gitignore
├── .gitattributes
├── LICENSE
├── README.md
├── requirements.txt             # Python dependencies
├── package.json                 # Node dependencies (if any)
└── config.yaml                  # Main configuration
```

### 2. Installation Script

```bash
#!/bin/bash
# scripts/setup.sh

echo "🚀 Setting up AI Toolkit..."

# Check prerequisites
command -v python3 >/dev/null 2>&1 || { 
    echo "❌ Python 3 is required but not installed."; exit 1; 
}

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv venv
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Setup knowledge base
echo "📚 Setting up knowledge base..."
python scripts/build_kb.py

# Download models (if using local embeddings)
if [ "$USE_LOCAL_EMBEDDINGS" = "true" ]; then
    echo "🤖 Downloading embedding models..."
    python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')"
fi

# Create config from template
if [ ! -f config.yaml ]; then
    echo "⚙️  Creating config file..."
    cp config.template.yaml config.yaml
    echo "⚠️  Please edit config.yaml with your settings"
fi

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit config.yaml with your API keys and preferences"
echo "2. Run: source venv/bin/activate"
echo "3. Try: python scripts/test.py"
```

### 3. Configuration Management

```yaml
# config.yaml
project:
  name: my-ai-toolkit
  version: 1.0.0

skills:
  directories:
    - skills
  auto_discover: true
  
knowledge_base:
  path: knowledge-base/documents
  embedding_model: all-MiniLM-L6-v2
  vector_store: chroma  # chroma, pinecone, weaviate
  update_on_change: true

prompts:
  template_path: prompts/templates
  chain_path: prompts/chains
  
mcp_servers:
  - name: custom-api
    url: https://api.example.com/mcp
    enabled: true
  - name: notion
    url: https://mcp.notion.com/mcp
    enabled: false

apis:
  anthropic:
    api_key_env: ANTHROPIC_API_KEY
    model: claude-sonnet-4-20250514
  
  openai:
    api_key_env: OPENAI_API_KEY
    model: gpt-4

vector_db:
  type: chroma  # chroma, pinecone, weaviate
  chroma:
    persist_directory: .chromadb
  pinecone:
    api_key_env: PINECONE_API_KEY
    environment: us-west1-gcp
    index_name: knowledge-base
  weaviate:
    url: http://localhost:8080

logging:
  level: INFO
  file: logs/toolkit.log
```

### 4. GitHub Actions CI/CD

```yaml
# .github/workflows/test-skills.yml
name: Test Skills

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test-skills:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
    
    - name: Discover skills
      run: |
        python scripts/discover_skills.py
    
    - name: Run skill tests
      run: |
        python scripts/test_skills.py --all
      env:
        ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
    
    - name: Upload test results
      if: always()
      uses: actions/upload-artifact@v3
      with:
        name: skill-test-results
        path: test-results/
    
    - name: Comment PR with results
      if: github.event_name == 'pull_request'
      uses: actions/github-script@v6
      with:
        script: |
          const fs = require('fs');
          const results = fs.readFileSync('test-results/summary.md', 'utf8');
          github.rest.issues.createComment({
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            body: results
          });
```

### 5. Package Distribution

**Option 1: As Python Package**
```python
# setup.py
from setuptools import setup, find_packages

setup(
    name="your-ai-toolkit",
    version="1.0.0",
    packages=find_packages(),
    install_requires=[
        "anthropic>=0.18.0",
        "langchain>=0.1.0",
        "chromadb>=0.4.0",
        "sentence-transformers>=2.2.0",
    ],
    entry_points={
        'console_scripts': [
            'ai-toolkit=toolkit.cli:main',
        ],
    },
    package_data={
        'toolkit': [
            'skills/**/*',
            'prompts/**/*',
            'knowledge-base/**/*',
        ],
    },
)
```

**Install via pip:**
```bash
pip install git+https://github.com/username/your-ai-toolkit.git
```

**Option 2: As Docker Container**
```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Setup
RUN python scripts/build_kb.py

# Expose port if running MCP server
EXPOSE 8080

CMD ["python", "scripts/serve.py"]
```

**Option 3: As Skill Package (.skill files)**
```bash
# Package individual skills
python scripts/package_skill.py skills/data-analysis

# This creates: data-analysis.skill
# Users can install with: 
# claude skill install data-analysis.skill
```

### 6. Documentation Auto-Generation

```yaml
# .github/workflows/build-docs.yml
name: Build Documentation

on:
  push:
    branches: [ main ]

jobs:
  build-docs:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Generate skill documentation
      run: |
        python scripts/generate_docs.py
    
    - name: Build with MkDocs
      run: |
        pip install mkdocs mkdocs-material
        mkdocs build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./site
```

### 7. Best Practices

**Version Control:**
```gitignore
# .gitignore
# Environment
venv/
.env
*.pyc
__pycache__/

# API Keys & Secrets
config.yaml
secrets/
.secrets

# Vector DB
.chromadb/
*.index

# Large files
*.pkl
*.h5
knowledge-base/embeddings/

# Logs
logs/
*.log

# Test outputs
test-results/
coverage/

# OS
.DS_Store
Thumbs.db
```

**Semantic Versioning:**
```yaml
# CHANGELOG.md format
# Changelog

## [1.2.0] - 2024-03-15

### Added
- New skill: advanced-data-viz
- MCP server for Slack integration
- RAG support with Chroma

### Changed
- Improved prompt template system
- Updated embedding model to all-MiniLM-L6-v2

### Fixed
- Fixed bug in skill discovery
- Corrected citation format in prompts

### Breaking Changes
- Config format updated (see migration guide)
```

**Release Process:**
```bash
# scripts/release.sh
#!/bin/bash

VERSION=$1

# Run tests
python scripts/test.py --all

# Update version
python scripts/bump_version.py $VERSION

# Build documentation
mkdocs build

# Create git tag
git tag -a v$VERSION -m "Release v$VERSION"
git push origin v$VERSION

# Build package
python setup.py sdist bdist_wheel

# Upload to PyPI (optional)
# twine upload dist/*

echo "Release v$VERSION complete!"
```

---

## 🎯 Quick Start Templates

### Template 1: Simple Skill

```bash
# Create from template
cp -r skills/examples/skill-template skills/my-skill
cd skills/my-skill

# Edit SKILL.md
# Add your logic
# Test it

# Package
python scripts/package_skill.py skills/my-skill
```

### Template 2: RAG-Enabled Knowledge Base

```bash
# Initialize knowledge base
python scripts/init_kb.py --name "company-docs" --source ./documents

# This creates:
# - Vector embeddings
# - Search index
# - Metadata catalog

# Query
python scripts/query_kb.py "What is our refund policy?"
```

### Template 3: MCP Server

```bash
# Create MCP server from template
python scripts/create_mcp.py --name "internal-api"

# This generates:
# mcp-servers/internal-api/
#   ├── server.py
#   ├── config.yaml
#   └── README.md

# Configure and run
cd mcp-servers/internal-api
python server.py
```

---

## 📖 Additional Resources

### Learning Path

1. **Beginner**: Start with simple skills
   - Clone template
   - Modify description
   - Add test prompts
   
2. **Intermediate**: Create a knowledge base
   - Organize documents
   - Setup RAG system
   - Integrate with skills
   
3. **Advanced**: Build MCP servers
   - Custom integrations
   - Complex workflows
   - Production deployment

### Community & Support

- GitHub Discussions: Q&A and feature requests
- Issue Tracker: Bug reports
- Wiki: Detailed guides and examples
- Discord/Slack: Real-time support (if applicable)

### Recommended Tools

- **VS Code Extensions**: 
  - YAML
  - Markdown All in One
  - Python
  
- **CLI Tools**:
  - `jq` for JSON manipulation
  - `yq` for YAML
  - `httpie` for API testing
  
- **Monitoring**:
  - Logging with `structlog`
  - Metrics with `prometheus-client`
  - Tracing with `opentelemetry`

---

## 🔒 Security Best Practices

1. **Never commit secrets**
   - Use environment variables
   - Use `.env` files (gitignored)
   - Use secret management (AWS Secrets Manager, etc.)

2. **Validate inputs**
   - Sanitize user inputs in prompts
   - Validate file uploads
   - Rate limiting for API calls

3. **Access control**
   - Role-based permissions for skills
   - API key rotation
   - Audit logs

---

## 📝 License

MIT License - Feel free to use, modify, and distribute

---

**Happy Building! 🚀**
