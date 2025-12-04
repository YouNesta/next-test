# Todo App - Frontend Interview Project

A Next.js todo application with glassmorphism design, built specifically for frontend developer interviews. This app contains intentional React anti-patterns for candidates to identify and fix.

## 🎯 Purpose

This project is designed for **live coding interviews** (2 hours) to assess a candidate's ability to:
- Identify React anti-patterns and bad practices
- Understand Next.js architecture and best practices
- Refactor code for better performance and maintainability
- Explain technical decisions clearly

## ✨ Features

- ✅ Full CRUD operations for todos
- ✅ Server Actions for Create, Update, Delete
- ✅ API Routes for Read operations
- ✅ Glassmorphism UI design with shadcn/ui components
- ✅ PostgreSQL database integration
- ✅ TypeScript support
- ❌ **Intentional anti-patterns** for candidates to find and fix

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Installation

#### Option 1: Automated Setup (Recommended)

Run the setup script that will create the database automatically:

```bash
# Install dependencies
npm install

# Run the automated setup script
./setup-db.sh
```

The script will:
- Create a database named `next_test_development` (based on folder name)
- Load the schema with sample data
- Create/update your `.env` file with the correct DATABASE_URL
- Verify the setup

Then start the app:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

#### Option 2: Manual Setup

1. **Clone the repository**
   ```bash
   cd next-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**

   Create a new database:
   ```bash
   psql -U postgres
   CREATE DATABASE next_test_development;
   \q
   ```

4. **Run the schema**
   ```bash
   psql -U postgres -d next_test_development -f schema.sql
   ```

5. **Configure environment variables**

   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/next_test_development
   ```

   Replace `username` and `password` with your PostgreSQL credentials.

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open the app**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
next-test/
├── app/
│   ├── actions.ts              # Server Actions (Create, Update, Delete)
│   ├── api/
│   │   └── todos/
│   │       └── route.ts        # API Route for reading todos
│   ├── globals.css             # Global styles with glassmorphism
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   └── input.tsx
│   ├── TodoContainer.tsx       # Main container (prop drilling issues)
│   ├── TodoForm.tsx            # Form for adding todos
│   ├── TodoItem.tsx            # Individual todo item
│   ├── TodoList.tsx            # List of todos (client-side fetching)
│   └── TodoStats.tsx           # Statistics display
├── lib/
│   ├── db.ts                   # PostgreSQL connection
│   ├── types.ts                # TypeScript types
│   └── utils.ts                # Utility functions
├── schema.sql                  # Database schema
└── README.md                   # This file
```

## 🎓 For Interviewers

### Before the Interview

1. Ensure the app is running correctly
2. Prepare the evaluation rubric
3. Set up screen sharing

### During the Interview

**Phase 1: Introduction (5 min)**
- Explain the project structure
- Show the running app
- Outline the 2-hour format

**Phase 2: Code Review (20 min)**
- Let candidate explore the codebase
- They should take notes

**Phase 3: Identification (40 min)**
- Candidate lists anti-patterns found
- Explains why each is problematic
- Discusses impact and severity

**Phase 4: Implementation (50 min)**
- Candidate fixes priority issues
- Tests their changes
- Explains their approach

**Phase 5: Discussion (5 min)**
- Review what was accomplished
- Ask follow-up questions
- Discuss trade-offs


## 🎨 Design

The app features a **glassmorphism** design style with:
- Semi-transparent backgrounds
- Backdrop blur effects
- Subtle borders and shadows
- Gradient background
- Modern, clean aesthetic

## 🛠 Technologies Used

- **Next.js 15+** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **PostgreSQL** - Database
- **node-postgres (pg)** - Database client

## 🔧 Scripts

```bash
# Setup
./setup-db.sh    # Automated database setup (creates DB, loads schema, configures .env)

# Development
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🗄️ Database Schema

The PostgreSQL database has a simple `todos` table:

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Best Practices](https://react.dev/learn)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

## ⚠️ Important Notes

- This code is **intentionally flawed** for interview purposes
- Do **NOT** use this as a production template
- The app works despite the anti-patterns
- Focus is on identifying and fixing React/Next.js issues

## 📄 License

This project is for educational and interview purposes.

## 🤝 Contributing

This is an interview project. If you're using it for interviews, feel free to adapt it to your needs.

---
