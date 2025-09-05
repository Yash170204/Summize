# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Summize is a Next.js application that provides AI-powered PDF document summarization. Users can upload PDF files, which are processed through a background job queue system to generate comprehensive summaries using Google's Gemini AI model.

## Core Architecture

### Frontend (Next.js App Router)
- **Pages**: Uses App Router with route groups in `app/(pages)/`
- **Authentication**: Better-Auth with email/password authentication
- **UI Framework**: React with TypeScript, styled using Tailwind CSS
- **State Management**: React hooks for client-side state
- **File Upload**: Direct S3 upload via pre-signed URLs

### Backend Services
- **API Routes**: Next.js API routes for authentication, file upload, and job management
- **Database**: PostgreSQL with Prisma ORM for data persistence
- **Job Queue**: BullMQ with Redis for background PDF processing
- **File Storage**: AWS S3 for PDF document storage
- **AI Processing**: Google Gemini AI (gemini-1.5-flash) via LangChain for summarization

### Background Processing
- **PDF Worker**: Standalone worker (`workers/pdfWorker.ts`) that processes uploaded PDFs
- **Document Processing**: Uses LangChain's PDFLoader for text extraction
- **AI Summarization**: Comprehensive prompt engineering for structured markdown summaries

## Development Commands

### Core Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Background Worker
```bash
# Run PDF processing worker (required for summarization)
npm run worker
```

### Database Management
```bash
# Generate Prisma client
npx prisma generate

# Push database schema changes
npx prisma db push

# View database in browser
npx prisma studio

# Apply database migrations
npx prisma migrate dev --name <migration-name>
```

### Testing Individual Components
```bash
# Test specific API route
curl -X GET http://localhost:3000/api/summary

# Test worker processing (ensure Redis is running)
tsx workers/pdfWorker.ts
```

## Key Dependencies & Services

### Required External Services
- **PostgreSQL**: Primary database for user data and summaries
- **Redis**: Job queue storage (default: localhost:6380)
- **AWS S3**: PDF file storage (region: ap-southeast-2)
- **Google AI**: Gemini API for document summarization

### Environment Variables
Critical environment variables (see deployment configs):
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`, `REDIS_PORT`, `REDIS_PASSWORD`: Redis configuration
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_BUCKET_NAME`: S3 configuration
- `GOOGLE_API_KEY`: Google Gemini AI API key

## Data Models (Prisma Schema)

### Core Entities
- **User**: Authentication and profile data
- **Session/Account**: Better-Auth session management
- **pdfSummary**: Links users to their PDF files and generated summaries

### Key Relationships
- Users have many pdfSummary records (one-to-many)
- Each pdfSummary contains the S3 file URL and AI-generated summary text

## Processing Flow

### PDF Summarization Pipeline
1. **Upload**: Client uploads PDF to S3 via pre-signed URL (`/api/s3-upload-url`)
2. **Queue**: Job queued in Redis via BullMQ (`/api/queue-job`)
3. **Process**: Worker downloads PDF, extracts text, calls Gemini AI
4. **Store**: Summary saved to database linked to user
5. **Poll**: Frontend polls status endpoint until completion (`/api/summary-status`)

### Authentication Flow
- Better-Auth handles email/password authentication
- Sessions stored in database with automatic cleanup
- Client-side auth state management via `authClient`

## File Organization

### Critical Directories
- `app/`: Next.js App Router structure with pages and API routes
- `lib/`: Core utilities (auth, database, queue, Redis configuration)
- `workers/`: Background job processors (PDF worker)
- `utils/`: Helper functions (S3 upload utilities)
- `schemas/`: Zod validation schemas for forms
- `prisma/`: Database schema and migrations

### UI Components
The app uses a custom component architecture with:
- Tailwind CSS for styling with a cyberpunk/tech theme
- React Icons (Feather icons via `react-icons/fi`)
- Custom color scheme: dark backgrounds with cyan/blue accents
- Responsive design patterns

## Development Patterns

### Error Handling
- API routes use try-catch with structured error responses
- Client-side error states with user-friendly messages
- Background worker includes job failure handling and cleanup

### Code Style
- TypeScript strict mode enabled
- ESLint with Next.js configuration
- Consistent async/await pattern usage
- Proper type definitions for API responses and database models

### Performance Considerations
- PDF processing happens asynchronously to avoid blocking UI
- Database queries use Prisma's optimized query patterns
- File uploads bypass application server (direct S3)
- Background worker processes one job at a time to manage resource usage

## Deployment Notes

### Production Requirements
- Requires external PostgreSQL, Redis, and S3 services
- Worker process must be deployed separately (or use serverless functions)
- Environment variables must be configured for all external services
- Vercel deployment configured with custom rewrites in `vercel.json`

### Monitoring & Debugging
- Worker logs include job success/failure indicators
- API routes include error logging for debugging
- Database queries can be monitored via Prisma logging
- Redis job queue can be inspected using Redis CLI or admin tools
