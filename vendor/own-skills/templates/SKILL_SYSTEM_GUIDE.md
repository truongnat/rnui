# Building a skill system, knowledge base & prompt framework

## 📋 Contents
1. [Architecture overview](#architecture-overview)
2. [Skill System Structure](#skill-system-structure)
3. [Knowledge Base Structure](#knowledge-base-structure)
4. [Prompt Engineering Framework](#prompt-engineering-framework)
5. [Supporting technologies](#supporting-technologies)
6. [GitHub Structure & Deployment](#github-structure--deployment)

---

## 🏗️ Architecture overview

### High-level layout

```
your-ai-toolkit/
├── skills/                    # Skill modules (one folder per skill)
│   └── examples/             # skill-template and samples
├── knowledge-base/           # Knowledge repository
│   ├── documents/            # Reference documents
│   ├── vectors/              # Vector embeddings (if using RAG)
│   └── schemas/              # Data schemas
├── prompts/                  # Prompt library
│   ├── templates/            # Reusable prompt templates
│   ├── chains/               # Prompt chains (multi-step)
│   └── examples/             # Example prompts
├── mcp-servers/              # MCP server configurations
├── configs/                  # Configuration files
└── scripts/                  # Utility scripts
```

---

## 🎯 Skill System Structure

### 1. Basic structure of a skill

```
skill-name/
├── SKILL.md                  # Main skill file (REQUIRED)
├── scripts/                  # Executable scripts
│   ├── main.py
│   └── utils.py
├── references/               # Reference documents
│   ├── api-docs.md
│   └── best-practices.md
├── assets/                   # Templates, files
│   ├── templates/
│   └── examples/
├── tests/                    # Test cases
│   └── test-prompts.json
└── README.md                 # Skill documentation
```

### 2. SKILL.md Format

```markdown
---
name: skill-identifier
description: |
  When this skill should trigger.
  Include: use cases, keywords, contexts.
  
  Example: "Use this skill when user mentions 'data analysis', 
  'visualization', 'charts', or wants to process CSV/Excel files."
compatibility:
  tools: [bash_tool, create_file, web_search]
  dependencies: [python>=3.8, pandas, numpy]
---

# Skill Name

## Overview
Brief description of what this skill does.

## When To Use
- Specific trigger scenario 1
- Specific trigger scenario 2
- Keywords: keyword1, keyword2

## How It Works
Step-by-step process

## Examples
### Example 1
Input: ...
Output: ...

## Best Practices
- Practice 1
- Practice 2

## Troubleshooting
Common issues and solutions
```

### 3. Progressive Disclosure Strategy

**Level 1: Metadata** (Always in context ~100 words)
- Skill name + short description
- When to trigger

**Level 2: SKILL.md Body** (<500 lines)
- Detailed guidance
- Workflow
- Examples

**Level 3: Bundled Resources** (Unlimited)
- Scripts (executable without loading into context)
- Reference docs (load on demand)
- Assets

### 4. Best practices for skill descriptions

```yaml
# ❌ BAD (too vague)
description: "Helps with data analysis tasks"

# ✅ GOOD (specific)
description: |
  Analyzes CSV/Excel data, creates visualizations, and generates reports.
  
  ALWAYS use this skill when user:
  - Mentions data analysis, charts, graphs, plots, visualizations
  - Uploads CSV, XLSX, or TSV files
  - Asks for statistical analysis, data cleaning, or data transformation
  - Wants to compare datasets or find trends
  - Needs dashboards or data reports
  
  Triggers: "analyze data", "create chart", "visualize this", 
  "clean dataset", "find patterns", "generate report"
```

---

## 📚 Knowledge Base Structure

### 1. Document Organization

```
knowledge-base/
├── domains/                  # By domain
│   ├── finance/
│   │   ├── overview.md
│   │   ├── regulations.md
│   │   └── calculations.md
│   ├── healthcare/
│   └── legal/
├── products/                 # By product
│   ├── product-a/
│   └── product-b/
├── processes/                # Business processes
│   ├── onboarding.md
│   └── deployment.md
└── references/               # Reference docs
    ├── apis/
    ├── libraries/
    └── standards/
```

### 2. Document Format Standards

```markdown
---
title: Document Title
category: finance/regulations
tags: [compliance, reporting, sec]
last_updated: 2024-03-15
version: 1.2
related: [doc1.md, doc2.md]
---

# Document Title

## Table of Contents
- [Overview](#overview)
- [Key Concepts](#key-concepts)
- [Examples](#examples)

## Overview
Brief summary (2-3 sentences)

## Key Concepts

### Concept 1
Detailed explanation

## Examples

### Example 1: Realistic Scenario
**Context**: ...
**Input**: ...
**Process**: ...
**Output**: ...

## Related Documents
- [Related Doc 1](../path/to/doc1.md)
- [Related Doc 2](../path/to/doc2.md)
```

### 3. Knowledge Base Access Patterns

**Pattern 1: Direct Reference**
```markdown
For detailed API documentation, see [references/api/endpoint-guide.md]
```

**Pattern 2: Conditional Loading**
```markdown
If working with AWS deployment, load references/cloud/aws.md
If working with GCP deployment, load references/cloud/gcp.md
```

**Pattern 3: TOC for Large Files**
```markdown
# Large Reference Document (1000+ lines)

## Table of Contents
- [Section A](#section-a) - Lines 50-200
- [Section B](#section-b) - Lines 201-400
- [Section C](#section-c) - Lines 401-600

Use view tool with line ranges to load specific sections
```

---

## 🎨 Prompt Engineering Framework

### 1. Prompt Template Structure

```
prompts/templates/
├── task-specific/
│   ├── code-review.yaml
│   ├── data-analysis.yaml
│   └── content-creation.yaml
├── workflows/
│   ├── research-workflow.yaml
│   └── debugging-workflow.yaml
└── personas/
    ├── technical-writer.yaml
    └── data-scientist.yaml
```

### 2. YAML Prompt Template Format

```yaml
# prompts/templates/task-specific/code-review.yaml
name: code-review-template
version: 1.0
category: development
description: Comprehensive code review template

metadata:
  language: any
  complexity: intermediate
  estimated_tokens: 500-1000

variables:
  - name: code
    type: string
    required: true
    description: Code to review
  - name: focus_areas
    type: array
    required: false
    default: [security, performance, maintainability]
  - name: language
    type: string
    required: false
    default: auto-detect

system_prompt: |
  You are an expert code reviewer with deep knowledge of software 
  engineering best practices, security, and performance optimization.

prompt_template: |
  Please review the following {{language}} code:
  
  ```{{language}}
  {{code}}
  ```
  
  Focus areas: {{focus_areas}}
  
  Provide:
  1. Overall assessment
  2. Critical issues (security, bugs)
  3. Performance concerns
  4. Code quality suggestions
  5. Best practice recommendations
  
  Format your response with clear sections and code examples.

examples:
  - input:
      code: "def process(data): return data.sort()"
      language: python
    output: |
      # Code Review
      
      ## Critical Issues
      - `.sort()` mutates the list in-place and returns None
      
      ## Suggested Fix
      ```python
      def process(data):
          return sorted(data)  # Returns new sorted list
      ```

post_processing:
  - validate_output_format
  - check_code_snippets
  - ensure_actionable_feedback
```

### 3. Prompt Chain For Complex Tasks

```yaml
# prompts/chains/research-and-summarize.yaml
name: research-and-summarize-chain
description: Multi-step research and summarization workflow

steps:
  - name: initial_search
    type: web_search
    prompt: |
      Search for: {{topic}}
      Focus: {{focus_areas}}
    output_var: search_results
    
  - name: deep_dive
    type: web_fetch
    depends_on: initial_search
    prompt: |
      Fetch and analyze top {{num_sources}} sources from search results
    output_var: detailed_content
    
  - name: synthesis
    type: llm_completion
    depends_on: deep_dive
    prompt: |
      Based on the following sources:
      {{detailed_content}}
      
      Create a comprehensive summary covering:
      1. Key findings
      2. Consensus and disagreements
      3. Actionable insights
    output_var: summary
    
  - name: citation_check
    type: validation
    depends_on: synthesis
    rules:
      - all_claims_cited
      - no_quotes_over_15_words
    output_var: final_output
```

### 4. Reusable Prompt Components

```
prompts/components/
├── instructions/
│   ├── be-concise.md
│   ├── step-by-step.md
│   └── use-examples.md
├── constraints/
│   ├── token-limit.md
│   ├── no-speculation.md
│   └── cite-sources.md
└── output-formats/
    ├── json-schema.md
    ├── markdown-report.md
    └── code-with-tests.md
```

Example component:
```markdown
<!-- prompts/components/instructions/step-by-step.md -->
Think through this step-by-step:
1. First, analyze the problem
2. Then, consider alternatives
3. Finally, provide your recommendation

Show your reasoning at each step.
```

Usage:
```yaml
prompt_template: |
  {{instructions/step-by-step}}
  
  Problem: {{problem_description}}
  
  {{constraints/no-speculation}}
  {{output-formats/markdown-report}}
```

---

## 🚀 Supporting technologies

### 1. MCP (Model Context Protocol)

MCP lets Claude connect to external services and data sources.

**MCP server layout:**
```
mcp-servers/
├── custom-server/
│   ├── server.py
│   ├── config.yaml
│   └── README.md
└── configs/
    ├── asana.yaml
    ├── notion.yaml
    └── custom-api.yaml
```

**Example MCP Server Config:**
```yaml
# mcp-servers/configs/custom-api.yaml
name: company-internal-api
type: sse
url: https://api.company.com/mcp
authentication:
  type: bearer
  token_env: COMPANY_API_TOKEN
tools:
  - name: get_customer_data
    description: Retrieve customer information
    parameters:
      customer_id: string
  - name: search_orders
    description: Search order history
    parameters:
      query: string
      date_range: object
```

### 2. RAG (Retrieval-Augmented Generation)

Combine retrieval with generation to query a large knowledge base.

**RAG Architecture:**
```python
# scripts/rag-system.py
"""
Simple RAG implementation for knowledge base
"""

from typing import List, Dict
import numpy as np
from sentence_transformers import SentenceTransformer

class RAGSystem:
    def __init__(self, knowledge_base_path: str):
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        self.documents = self.load_documents(knowledge_base_path)
        self.embeddings = self.create_embeddings()
    
    def load_documents(self, path: str) -> List[Dict]:
        """Load all documents from knowledge base"""
        pass
    
    def create_embeddings(self) -> np.ndarray:
        """Create vector embeddings for all documents"""
        texts = [doc['content'] for doc in self.documents]
        return self.model.encode(texts)
    
    def search(self, query: str, top_k: int = 5) -> List[Dict]:
        """Find most relevant documents"""
        query_embedding = self.model.encode([query])
        similarities = np.dot(self.embeddings, query_embedding.T)
        top_indices = np.argsort(similarities.flatten())[-top_k:][::-1]
        
        return [self.documents[i] for i in top_indices]
```

**Integrated with skills:**
```markdown
# skills/rag-assistant/SKILL.md
---
name: rag-assistant
description: Use RAG to answer questions from large knowledge base
---

## Workflow

1. Receive user query
2. Use RAG system to retrieve relevant documents:
   ```bash
   python scripts/rag-system.py search "{{query}}" --top-k 5
   ```
3. Load retrieved documents into context
4. Generate answer based on retrieved context
5. Cite sources
```

### 3. Vector Databases

For production RAG at large scale.

**Popular Options:**

**Chroma (Simple, Local)**
```python
# requirements: chromadb
import chromadb

client = chromadb.Client()
collection = client.create_collection("knowledge-base")

# Add documents
collection.add(
    documents=["doc1 content", "doc2 content"],
    metadatas=[{"source": "doc1.md"}, {"source": "doc2.md"}],
    ids=["id1", "id2"]
)

# Query
results = collection.query(
    query_texts=["user question"],
    n_results=5
)
```

**Pinecone (Cloud, Scalable)**
```python
# requirements: pinecone-client
import pinecone

pinecone.init(api_key="your-key", environment="us-west1-gcp")
index = pinecone.Index("knowledge-base")

# Upsert vectors
index.upsert(vectors=[
    ("id1", [0.1, 0.2, ...], {"text": "doc content"}),
])

# Query
results = index.query(
    vector=[0.3, 0.4, ...],
    top_k=5,
    include_metadata=True
)
```

**Weaviate (Open Source, Feature-Rich)**
```python
# requirements: weaviate-client
import weaviate

client = weaviate.Client("http://localhost:8080")

# Create schema
client.schema.create_class({
    "class": "Document",
    "vectorizer": "text2vec-transformers"
})

# Add data
client.data_object.create({
    "content": "document content",
    "source": "doc1.md"
}, "Document")

# Query
result = client.query.get("Document", ["content", "source"])\
    .with_near_text({"concepts": ["user question"]})\
    .with_limit(5)\
    .do()
```

### 4. Langchain / LlamaIndex

Frameworks for building complex AI applications.

**LangChain Example:**
```python
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory

# Define prompt template
template = """
You are a helpful assistant specialized in {domain}.

Conversation history:
{history}