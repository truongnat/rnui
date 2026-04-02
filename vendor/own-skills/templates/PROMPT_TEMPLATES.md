# Prompt Template Library

Reusable prompt templates for many tasks.

**Repo convention:** store templates as **Markdown** (`.md` files under `prompts/templates/`). The blocks below illustrate the *same information*; the rest of the file may still use fenced `key: value` blocks — for new templates prefer Markdown (headings + variable table + System/User sections).

## Template structure (Markdown)

```markdown
# template-identifier

## Metadata

| Field | Value |
|-------|-------|
| version | 1.0 |
| category | task-type |
| description | Short description |
| tags | tag1, tag2 |

## Variables

| Name | Required | Description |
|------|----------|-------------|
| variable_name | Yes/No | … |

## System prompt

… model instructions …

## User prompt (template)

Main content with {{variable_name}}.

## Example

**Input:** … → **Expected output:** …
```

---

## Template 1: Code Review

```markdown
name: code-review-comprehensive
version: 1.2
category: development
description: Comprehensive code review focusing on quality, security, and performance
tags: [code, review, quality, security]

metadata:
  complexity: medium
  estimated_tokens: 800-1500
  language: any

variables:
  - name: code
    type: string
    required: true
    description: The code to review
    
  - name: language
    type: string
    required: false
    default: auto-detect
    description: Programming language
    
  - name: focus_areas
    type: array
    required: false
    default: [security, performance, maintainability, best-practices]
    description: Specific areas to focus on
    
  - name: context
    type: string
    required: false
    description: Additional context about the code (e.g., "this is a API endpoint", "this handles payments")

system_prompt: |
  You are an expert software engineer with 15+ years of experience in code review,
  security auditing, and performance optimization. You provide constructive,
  actionable feedback with specific examples and suggestions.

prompt_template: |
  Please review the following {{language}} code:
  
  ```{{language}}
  {{code}}
  ```
  
  {{#if context}}
  Context: {{context}}
  {{/if}}
  
  Focus on: {{focus_areas}}
  
  Provide your review in the following structure:
  
  ## Executive Summary
  - Overall assessment (1-2 sentences)
  - Critical issues count
  - Overall quality score (1-10)
  
  ## Critical Issues 🔴
  Issues that MUST be fixed (security vulnerabilities, major bugs):
  - Issue description
  - Why it's critical
  - How to fix (with code example)
  
  ## Important Issues 🟡
  Issues that SHOULD be fixed (performance, maintainability):
  - Issue description
  - Impact
  - Suggested improvement
  
  ## Suggestions 🟢
  Nice-to-have improvements:
  - Suggestion
  - Benefit
  
  ## Positive Aspects ✅
  What's done well:
  - Good practice observed
  - Why it's good
  
  ## Refactored Code
  If significant changes needed, provide refactored version.

examples:
  - input:
      code: |
        def process_payment(amount, card):
            return card.charge(amount)
      language: python
      context: Payment processing in e-commerce API
      focus_areas: [security, error-handling]
    output: |
      ## Executive Summary
      - Code lacks critical security and error handling
      - 2 critical issues, 1 important issue
      - Quality score: 3/10
      
      ## Critical Issues 🔴
      
      **1. No input validation**
      - Why critical: Allows SQL injection, XSS, invalid amounts
      - Fix:
      ```python
      def process_payment(amount: Decimal, card: Card) -> PaymentResult:
          if amount <= 0:
              raise ValueError("Amount must be positive")
          if amount > MAX_TRANSACTION_AMOUNT:
              raise ValueError("Amount exceeds limit")
          # ... validate card
      ```
      
      **2. No error handling**
      - Why critical: Crashes on network errors, card declines
      - Fix: Wrap in try-except, return Result object
      
      ## Important Issues 🟡
      
      **1. No logging/audit trail**
      - Impact: Can't track transactions, debug issues
      - Add: logger.info(f"Processing payment: {amount} for {card.last4}")
      
      ## Refactored Code
      ```python
      from decimal import Decimal
      from typing import Result
      import logging
      
      logger = logging.getLogger(__name__)
      
      def process_payment(
          amount: Decimal,
          card: Card,
          idempotency_key: str
      ) -> Result[PaymentResult, PaymentError]:
          """Process payment with validation and error handling."""
          
          # Validate inputs
          if amount <= 0:
              return Err(PaymentError.INVALID_AMOUNT)
          if not card.is_valid():
              return Err(PaymentError.INVALID_CARD)
          
          # Check idempotency
          if existing := check_idempotency(idempotency_key):
              return Ok(existing)
          
          # Log attempt
          logger.info(
              f"Processing payment",
              extra={
                  "amount": str(amount),
                  "card_last4": card.last4,
                  "idempotency_key": idempotency_key
              }
          )
          
          # Process with error handling
          try:
              result = card.charge(amount)
              save_transaction(result, idempotency_key)
              return Ok(result)
          except NetworkError as e:
              logger.error(f"Network error: {e}")
              return Err(PaymentError.NETWORK_ERROR)
          except CardDeclinedError as e:
              logger.warning(f"Card declined: {e}")
              return Err(PaymentError.CARD_DECLINED)
      ```

post_processing:
  - verify_code_blocks_are_syntactically_valid
  - ensure_all_critical_issues_have_fixes
  - check_refactored_code_is_provided_if_needed
```

---

## Template 2: Data Analysis

```markdown
name: data-analysis-comprehensive
version: 1.0
category: data-science
description: Analyze datasets and provide insights
tags: [data, analysis, statistics, insights]

variables:
  - name: data_description
    type: string
    required: true
    description: Description of the dataset or path to file
    
  - name: questions
    type: array
    required: false
    default: ["What are the key patterns?", "Any anomalies?", "What insights stand out?"]
    description: Specific questions to answer
    
  - name: output_format
    type: string
    required: false
    default: report
    description: "report|dashboard|presentation|notebook"

system_prompt: |
  You are an expert data analyst with strong statistical knowledge and
  business acumen. You find meaningful patterns, identify anomalies,
  and provide actionable insights backed by data.

prompt_template: |
  Analyze the following dataset:
  
  {{data_description}}
  
  Answer these questions:
  {{#each questions}}
  {{@index}}. {{this}}
  {{/each}}
  
  Provide your analysis as a {{output_format}} with:
  
  1. **Data Overview**
     - Size and structure
     - Column types and ranges
     - Data quality assessment
  
  2. **Key Findings**
     - Top 3-5 most important insights
     - Supporting statistics
     - Visualizations (describe what charts to create)
  
  3. **Patterns & Trends**
     - Temporal patterns
     - Correlations
     - Segments/clusters
  
  4. **Anomalies & Outliers**
     - What's unusual
     - Potential causes
     - Should they be kept or removed?
  
  5. **Recommendations**
     - Actionable next steps
     - Further analysis needed
     - Business implications
  
  For any statistics mentioned, show calculations or methodology.

examples:
  - input:
      data_description: "Sales data with 10K rows: date, product, revenue, region"
      questions:
        - "Which products are performing best?"
        - "Are there seasonal trends?"
        - "Any concerning patterns?"
    output: |
      # Sales Data Analysis Report
      
      ## 1. Data Overview
      - 10,000 transactions over 12 months
      - 5 regions, 50 products
      - Revenue range: $10 - $5,000 per transaction
      - Data quality: 99.2% complete (80 missing values in 'region')
      
      ## 2. Key Findings
      
      **Finding 1: Top 3 products account for 60% of revenue**
      - Product A: $2.1M (35%)
      - Product B: $900K (15%)
      - Product C: $600K (10%)
      - Remaining 47 products: $2.4M (40%)
      
      **Visualization**: Bar chart of revenue by product (top 10)
      
      **Finding 2: Strong Q4 seasonality**
      - Q4 revenue 2.5x higher than Q1-Q3 average
      - Peak: December ($1.8M)
      - Trough: February ($400K)
      
      **Visualization**: Line chart of monthly revenue
      
      ## 3. Patterns & Trends
      
      **Regional Performance**:
      - West region: 40% of sales, $2.4M
      - Correlation: Revenue positively correlated with population density (r=0.78)
      
      **Product Correlations**:
      - Products A and C often bought together (30% co-occurrence)
      - Opportunity: Bundle pricing
      
      ## 4. Anomalies
      
      **Spike in July**: 200% increase vs June
      - Cause: Summer promotion
      - Keep: Valid business event
      
      **Missing Regions**: 80 transactions (0.8%)
      - Investigation needed: Data entry issue?
      - Recommendation: Impute based on ZIP code
      
      ## 5. Recommendations
      
      1. **Inventory Planning**
         - Stock up Product A in Q3 for Q4 demand
         - Calculate: Q4 avg ÷ Q3 avg = 2.5x multiplier
      
      2. **Marketing Strategy**
         - Focus on West region (highest ROI)
         - Cross-sell Products A + C
      
      3. **Further Analysis**
         - Customer cohort analysis
         - Price elasticity study
         - Churn prediction model

post_processing:
  - validate_statistics_are_reasonable
  - ensure_visualizations_are_described
  - check_recommendations_are_actionable
```

---

## Template 3: Creative Writing

```markdown
name: creative-story-writer
version: 1.0
category: creative-writing
description: Generate creative stories with specific style and tone
tags: [creative, writing, story, fiction]

variables:
  - name: genre
    type: string
    required: true
    description: "sci-fi|fantasy|mystery|romance|thriller|horror"
    
  - name: setting
    type: string
    required: true
    description: Where and when the story takes place
    
  - name: protagonist
    type: object
    required: true
    description: Main character details
    properties:
      name: string
      age: number
      trait: string
      
  - name: conflict
    type: string
    required: true
    description: The main problem or challenge
    
  - name: length
    type: string
    required: false
    default: short
    description: "flash (500)|short (1500)|medium (3000)"
    
  - name: tone
    type: string
    required: false
    default: balanced
    description: "dark|light|humorous|serious|whimsical"

system_prompt: |
  You are a skilled creative writer known for vivid imagery, compelling
  characters, and engaging narratives. You adapt your style to different
  genres while maintaining high literary quality.

prompt_template: |
  Write a {{length}} {{genre}} story with a {{tone}} tone.
  
  **Setting**: {{setting}}
  
  **Protagonist**: 
  - Name: {{protagonist.name}}
  - Age: {{protagonist.age}}
  - Key trait: {{protagonist.trait}}
  
  **Central Conflict**: {{conflict}}
  
  Story requirements:
  - Strong opening hook
  - Vivid sensory details
  - Show, don't tell character emotions
  - Rising tension
  - Satisfying resolution (can be open-ended)
  - Genre-appropriate elements
  
  Target length: {{length}} words

examples:
  - input:
      genre: sci-fi
      setting: "Mars colony, year 2157"
      protagonist:
        name: Dr. Sarah Chen
        age: 42
        trait: stubbornly independent
      conflict: "Discovers colony's water supply is contaminated"
      length: short
      tone: serious
    output: |
      # Red Dust
      
      The water tasted wrong.
      
      Dr. Sarah Chen held the sample vial to the viewport, watching
      ruddy Martian light filter through the supposedly pure liquid.
      Tiny crystalline structures floated inside—structures that
      shouldn't exist in treated water.
      
      "Computer, analyze sample 47-B."
      
      The lab's AI hummed. "Analysis complete. Detecting iron oxide
      particulate at 0.03%, and..." A pause. AIs didn't pause. "And
      prion-like protein structures. Unknown configuration."
      
      Sarah's hands steadied the vial, but her pulse hammered. Prions.
      On Mars. In the water supply for 10,000 colonists.
      
      She'd have to tell Administrator Wong. He'd tell her to run it
      again. To not cause a panic. To trust the system.
      
      Sarah was done trusting systems.
      
      Her fingers moved across the holographic keyboard, bypassing
      official channels. The message went directly to the colony's
      emergency broadcast: WATER SUPPLY COMPROMISED. CEASE CONSUMPTION.
      
      Klaxons wailed through the habitat. Wong would have her credentials
      revoked within the hour. But 10,000 people would still be alive
      to complain about it.
      
      Through the viewport, dust devils danced across the rust-red plain.
      Mars kept its secrets well. But Sarah Chen was stubbornly independent
      enough to drag them into the light, consequences be damned.

post_processing:
  - verify_word_count_matches_target
  - ensure_genre_elements_present
  - check_character_consistency
  - validate_conflict_resolution
```

---

## Template 4: Technical Documentation

```markdown
name: technical-documentation
version: 1.0
category: documentation
description: Create clear technical documentation
tags: [docs, technical, api, tutorial]

variables:
  - name: subject
    type: string
    required: true
    description: What you're documenting
    
  - name: audience
    type: string
    required: false
    default: developers
    description: "beginners|developers|architects|end-users"
    
  - name: doc_type
    type: string
    required: true
    description: "api-reference|tutorial|guide|troubleshooting"
    
  - name: code_examples
    type: boolean
    required: false
    default: true

system_prompt: |
  You are a technical writer who creates clear, concise documentation.
  You use plain language, provide examples, and anticipate reader questions.

prompt_template: |
  Create {{doc_type}} documentation for: {{subject}}
  
  Target audience: {{audience}}
  {{#if code_examples}}Include working code examples{{/if}}
  
  Structure:
  
  {{#if doc_type == "api-reference"}}
  # API Reference: {{subject}}
  
  ## Overview
  - What this API does
  - Key concepts
  
  ## Authentication
  
  ## Endpoints
  ### Endpoint 1
  - Method and path
  - Parameters
  - Request example
  - Response example
  - Error codes
  
  ## Rate Limits
  
  ## SDK Examples
  {{/if}}
  
  {{#if doc_type == "tutorial"}}
  # Tutorial: {{subject}}
  
  ## What You'll Learn
  
  ## Prerequisites
  
  ## Step 1: Setup
  
  ## Step 2: Basic Implementation
  
  ## Step 3: Advanced Features
  
  ## Troubleshooting
  
  ## Next Steps
  {{/if}}
  
  Guidelines:
  - Use clear headings
  - Provide real, runnable examples
  - Explain "why" not just "how"
  - Include common pitfalls
  - Add "Note" and "Warning" callouts where helpful

examples:
  - input:
      subject: "REST API for user management"
      audience: developers
      doc_type: api-reference
      code_examples: true
    output: |
      # API Reference: User Management
      
      ## Overview
      
      The User Management API allows you to create, read, update, and
      delete user accounts programmatically. All endpoints require
      authentication and return JSON responses.
      
      **Base URL**: `https://api.example.com/v1`
      
      **Key Concepts**:
      - **User ID**: Unique identifier (UUID format)
      - **Role**: user, admin, or super_admin
      - **Status**: active, suspended, or deleted
      
      ## Authentication
      
      All requests require an API key in the Authorization header:
      
      ```bash
      curl -H "Authorization: Bearer YOUR_API_KEY" \
           https://api.example.com/v1/users
      ```
      
      ## Endpoints
      
      ### List Users
      
      ```
      GET /users
      ```
      
      **Parameters**:
      - `page` (integer, optional): Page number (default: 1)
      - `limit` (integer, optional): Results per page (default: 20, max: 100)
      - `role` (string, optional): Filter by role
      - `status` (string, optional): Filter by status
      
      **Request Example**:
      ```bash
      curl https://api.example.com/v1/users?page=1&limit=10&role=admin
      ```
      
      **Response Example**:
      ```json
      {
        "data": [
          {
            "id": "123e4567-e89b-12d3-a456-426614174000",
            "email": "admin@example.com",
            "role": "admin",
            "status": "active",
            "created_at": "2024-01-15T10:30:00Z"
          }
        ],
        "pagination": {
          "page": 1,
          "limit": 10,
          "total": 45
        }
      }
      ```
      
      **Error Codes**:
      - `401`: Invalid or missing API key
      - `403`: Insufficient permissions
      - `429`: Rate limit exceeded
      
      ---
      
      ### Create User
      
      ```
      POST /users
      ```
      
      **Request Body**:
      ```json
      {
        "email": "newuser@example.com",
        "password": "secure_password",
        "role": "user"
      }
      ```
      
      **Validation Rules**:
      - Email must be valid and unique
      - Password must be at least 12 characters
      - Role must be one of: user, admin, super_admin
      
      **Response Example** (201 Created):
      ```json
      {
        "id": "123e4567-e89b-12d3-a456-426614174001",
        "email": "newuser@example.com",
        "role": "user",
        "status": "active",
        "created_at": "2024-03-15T14:22:00Z"
      }
      ```
      
      **Error Example** (400 Bad Request):
      ```json
      {
        "error": "validation_error",
        "message": "Email already exists",
        "field": "email"
      }
      ```
      
      ## Rate Limits
      
      - **Standard**: 100 requests/minute
      - **Burst**: 200 requests/minute for 30 seconds
      
      **Note**: Rate limit headers included in every response:
      ```
      X-RateLimit-Limit: 100
      X-RateLimit-Remaining: 87
      X-RateLimit-Reset: 1710516000
      ```
      
      ## SDK Examples
      
      **Python**:
      ```python
      from example_sdk import Client
      
      client = Client(api_key="YOUR_API_KEY")
      
      # List users
      users = client.users.list(role="admin", limit=10)
      
      # Create user
      new_user = client.users.create(
          email="user@example.com",
          password="secure_password",
          role="user"
      )
      ```
      
      **JavaScript**:
      ```javascript
      const { Client } = require('example-sdk');
      
      const client = new Client({ apiKey: 'YOUR_API_KEY' });
      
      // List users
      const users = await client.users.list({ role: 'admin', limit: 10 });
      
      // Create user
      const newUser = await client.users.create({
        email: 'user@example.com',
        password: 'secure_password',
        role: 'user'
      });
      ```

post_processing:
  - validate_all_code_examples_are_syntactically_correct
  - ensure_all_endpoints_documented
  - check_error_codes_are_listed
  - verify_authentication_explained
```

---

## Using templates

### 1. Command line

```bash
# Example script usage
python scripts/use_template.py \
    --template code-review-comprehensive \
    --code "$(cat myfile.py)" \
    --language python \
    --focus-areas "security,performance"

# Output is generated from the template
```

### 2. In code

```python
from prompt_templates import load_template, render

# Load template
template = load_template("code-review-comprehensive")

# Render with variables
prompt = render(template, {
    "code": code_content,
    "language": "python",
    "focus_areas": ["security", "performance"],
    "context": "API endpoint handling payments"
})

# Send to LLM
response = llm.complete(prompt)
```

### 3. In a skill

```markdown
# SKILL.md

## Using Prompt Templates

When user requests code review, use the code-review-comprehensive template:

```bash
python scripts/use_template.py \
    --template code-review-comprehensive \
    --code "{{user_code}}" \
    --language "{{detected_language}}"
```
```

---

## Tips for effective templates

1. **Specific instructions**: be as concrete as possible
2. **Examples**: include at least one example
3. **Output format**: state the desired format clearly
4. **Edge cases**: handle edge cases in the template
5. **Post-processing**: validate output

---

Save templates under `prompts/templates/` as `category-name.md` (Markdown)
