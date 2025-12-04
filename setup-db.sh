#!/bin/bash

# Database Setup Script
# This script creates a PostgreSQL database named after the app folder with _development suffix

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the current directory name (app folder)
APP_FOLDER=$(basename "$PWD")

# Create database name: appfolder_development
DB_NAME="${APP_FOLDER//-/_}_development"

echo -e "${YELLOW}=== Database Setup Script ===${NC}"
echo -e "App folder: ${GREEN}$APP_FOLDER${NC}"
echo -e "Database name: ${GREEN}$DB_NAME${NC}"
echo ""

# Check if PostgreSQL is running
echo -e "${YELLOW}Checking PostgreSQL...${NC}"
if ! command -v psql &> /dev/null; then
    echo -e "${RED}Error: PostgreSQL is not installed or not in PATH${NC}"
    exit 1
fi

# Test PostgreSQL connection
if ! psql -U postgres -c '\q' 2>/dev/null; then
    echo -e "${RED}Error: Cannot connect to PostgreSQL${NC}"
    echo -e "Please ensure PostgreSQL is running and you have access"
    exit 1
fi

echo -e "${GREEN}✓ PostgreSQL is running${NC}"
echo ""

# Check if database already exists
echo -e "${YELLOW}Checking if database exists...${NC}"
if psql -U postgres -lqt | cut -d \| -f 1 | grep -qw "$DB_NAME"; then
    echo -e "${YELLOW}Database '$DB_NAME' already exists.${NC}"
    read -p "Do you want to drop and recreate it? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}Dropping existing database...${NC}"
        psql -U postgres -c "DROP DATABASE $DB_NAME;" 2>/dev/null || true
        echo -e "${GREEN}✓ Database dropped${NC}"
    else
        echo -e "${YELLOW}Keeping existing database. Exiting.${NC}"
        exit 0
    fi
fi

# Create database
echo -e "${YELLOW}Creating database '$DB_NAME'...${NC}"
psql -U postgres -c "CREATE DATABASE $DB_NAME;"
echo -e "${GREEN}✓ Database created${NC}"
echo ""

# Run schema
if [ -f "schema.sql" ]; then
    echo -e "${YELLOW}Loading schema from schema.sql...${NC}"
    psql -U postgres -d "$DB_NAME" -f schema.sql
    echo -e "${GREEN}✓ Schema loaded${NC}"
else
    echo -e "${YELLOW}Warning: schema.sql not found. Skipping schema load.${NC}"
fi
echo ""

# Create or update .env file
ENV_FILE=".env"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/$DB_NAME"

echo -e "${YELLOW}Updating environment configuration...${NC}"

if [ -f "$ENV_FILE" ]; then
    # Update existing .env file
    if grep -q "DATABASE_URL=" "$ENV_FILE"; then
        # Replace existing DATABASE_URL
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s|DATABASE_URL=.*|DATABASE_URL=$DATABASE_URL|" "$ENV_FILE"
        else
            # Linux
            sed -i "s|DATABASE_URL=.*|DATABASE_URL=$DATABASE_URL|" "$ENV_FILE"
        fi
        echo -e "${GREEN}✓ Updated DATABASE_URL in $ENV_FILE${NC}"
    else
        # Append DATABASE_URL
        echo "" >> "$ENV_FILE"
        echo "DATABASE_URL=$DATABASE_URL" >> "$ENV_FILE"
        echo -e "${GREEN}✓ Added DATABASE_URL to $ENV_FILE${NC}"
    fi
else
    # Create new .env file
    echo "DATABASE_URL=$DATABASE_URL" > "$ENV_FILE"
    echo -e "${GREEN}✓ Created $ENV_FILE with DATABASE_URL${NC}"
fi
echo ""

# Verify the database
echo -e "${YELLOW}Verifying database setup...${NC}"
TODO_COUNT=$(psql -U postgres -d "$DB_NAME" -t -c "SELECT COUNT(*) FROM todos;" 2>/dev/null || echo "0")
echo -e "${GREEN}✓ Database contains $TODO_COUNT todos${NC}"
echo ""

# Display summary
echo -e "${GREEN}=== Setup Complete! ===${NC}"
echo ""
echo -e "${GREEN}Database Details:${NC}"
echo -e "  Name: ${GREEN}$DB_NAME${NC}"
echo -e "  URL:  ${GREEN}$DATABASE_URL${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "  1. Run: ${GREEN}npm install${NC} (if not already done)"
echo -e "  2. Run: ${GREEN}npm run dev${NC}"
echo -e "  3. Open: ${GREEN}http://localhost:3000${NC}"
echo ""
echo -e "${YELLOW}Note:${NC} If you're not using 'postgres' as username/password,"
echo -e "      please update the DATABASE_URL in .env manually."
