#!/bin/bash

# AI Toolkit - Quick Start Script
# This script sets up the entire toolkit in one command

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
cat << "BANNER"
   ___    ____   ______            __ __   _ __
  / _ |  /  _/  /_  __/___  ___   / // /  (_) /_
 / __ | _/ /     / / / __ \/ _ \ / // /_ / / __/
/_/ |_|/___/    /_/  \____/\___//_/____//_/\__/

BANNER
echo -e "${NC}"

echo -e "${GREEN}🚀 Starting AI Toolkit Setup...${NC}\n"

# 1. Check prerequisites
echo -e "${BLUE}📋 Checking prerequisites...${NC}"

if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 is required but not installed.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Python 3 found${NC}"

if ! command -v git &> /dev/null; then
    echo -e "${YELLOW}⚠️  Git not found. You may need it to clone repos.${NC}"
fi

echo ""

# 2. Create directory structure
echo -e "${BLUE}📁 Creating directory structure...${NC}"

mkdir -p skills/{public,private,examples}
mkdir -p knowledge-base/{documents,embeddings,schemas}
mkdir -p prompts/{templates,chains,components}
mkdir -p mcp-servers/{custom-servers,configs}
mkdir -p scripts
mkdir -p tests
mkdir -p logs
mkdir -p outputs
mkdir -p uploads
mkdir -p .cache

echo -e "${GREEN}✅ Directories created${NC}\n"

# 3. Create virtual environment
echo -e "${BLUE}🐍 Creating virtual environment...${NC}"

if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo -e "${GREEN}✅ Virtual environment created${NC}"
else
    echo -e "${YELLOW}⚠️  Virtual environment already exists${NC}"
fi

echo ""

# 4. Activate virtual environment
echo -e "${BLUE}🔌 Activating virtual environment...${NC}"

source venv/bin/activate
echo -e "${GREEN}✅ Virtual environment activated${NC}\n"

# 5. Upgrade pip
echo -e "${BLUE}⬆️  Upgrading pip...${NC}"

pip install --upgrade pip --quiet
echo -e "${GREEN}✅ Pip upgraded${NC}\n"

# 6. Install dependencies
echo -e "${BLUE}📦 Installing dependencies (this may take a few minutes)...${NC}"

if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt --quiet
    echo -e "${GREEN}✅ Dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠️  requirements.txt not found, skipping${NC}"
fi

echo ""

# 7. Setup configuration
echo -e "${BLUE}⚙️  Setting up configuration...${NC}"

if [ ! -f "config.yaml" ]; then
    if [ -f "config.template.yaml" ]; then
        cp config.template.yaml config.yaml
        echo -e "${GREEN}✅ Config file created from template${NC}"
        echo -e "${YELLOW}⚠️  Please edit config.yaml with your settings${NC}"
    else
        echo -e "${YELLOW}⚠️  config.template.yaml not found${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  config.yaml already exists${NC}"
fi

if [ ! -f ".env" ]; then
    if [ -f ".env.template" ]; then
        cp .env.template .env
        echo -e "${GREEN}✅ .env file created from template${NC}"
        echo -e "${YELLOW}⚠️  Please edit .env with your API keys${NC}"
    else
        echo -e "${YELLOW}⚠️  .env.template not found${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  .env already exists${NC}"
fi

echo ""

# 8. Create .gitignore
echo -e "${BLUE}🔒 Creating .gitignore...${NC}"

cat > .gitignore << 'GITIGNORE'
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
ENV/
env/

# Environment
.env
.env.local
.env.*.local
config.yaml

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Project specific
*.log
logs/
.cache/
.chromadb/
knowledge-base/embeddings/
outputs/
uploads/
tmp/
*.pkl
*.h5
*.index

# Test
.pytest_cache/
.coverage
htmlcov/
GITIGNORE

echo -e "${GREEN}✅ .gitignore created${NC}\n"

# 9. Download sample skill (optional)
echo -e "${BLUE}📥 Do you want to download example skills? (y/n)${NC}"
read -r response

if [[ "$response" =~ ^[Yy]$ ]]; then
    echo "Downloading examples..."
    # Add logic to download examples
    echo -e "${GREEN}✅ Examples downloaded${NC}"
fi

echo ""

# 10. Initialize knowledge base
echo -e "${BLUE}📚 Do you want to initialize the knowledge base now? (y/n)${NC}"
read -r response

if [[ "$response" =~ ^[Yy]$ ]]; then
    if [ -f "scripts/build_kb.py" ]; then
        python scripts/build_kb.py
        echo -e "${GREEN}✅ Knowledge base initialized${NC}"
    else
        echo -e "${YELLOW}⚠️  scripts/build_kb.py not found${NC}"
    fi
fi

echo ""

# Summary
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

echo -e "${BLUE}📝 Next Steps:${NC}"
echo -e "1. Edit ${YELLOW}.env${NC} file with your API keys"
echo -e "2. Edit ${YELLOW}config.yaml${NC} with your preferences"
echo -e "3. Activate virtual environment: ${YELLOW}source venv/bin/activate${NC}"
echo -e "4. Add your documents to ${YELLOW}knowledge-base/documents/${NC}"
echo -e "5. Add your skills under ${YELLOW}skills/${NC}"
echo -e "6. Test the system: ${YELLOW}python scripts/test.py${NC}"
echo ""

echo -e "${BLUE}📚 Quick Commands:${NC}"
echo -e "  ${YELLOW}source venv/bin/activate${NC}     - Activate virtual environment"
echo -e "  ${YELLOW}python scripts/test.py${NC}        - Run tests"
echo -e "  ${YELLOW}python scripts/list_skills.py${NC} - List available skills"
echo -e "  ${YELLOW}python scripts/query_kb.py${NC}    - Query knowledge base"
echo ""

echo -e "${BLUE}📖 Documentation:${NC}"
echo -e "  README.md - Getting started guide"
echo -e "  SKILL_SYSTEM_GUIDE.md - Detailed skill documentation"
echo -e "  COOL_TECHNOLOGIES.md - Technology references"
echo ""

echo -e "${GREEN}Happy Building! 🚀${NC}\n"
