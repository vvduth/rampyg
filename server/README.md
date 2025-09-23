# E-Learning Platform API

A TypeScript/Node.js backend for an e-learning platform with course management, user progress tracking, and payment processing.

## Tech Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: DynamoDB (via Dynamoose ODM)
- **Authentication**: Clerk
- **Payments**: Stripe
- **File Storage**: AWS S3
- **Deployment**: AWS Lambda (serverless)

## Features

- Course catalog with nested sections and chapters
- Video, text, and quiz content types
- User progress tracking
- Payment processing with Stripe
- Comment system for course chapters
- File upload handling
- Authentication middleware

## Quick Start

### Prerequisites

- Node.js 18+ 
- DynamoDB Local (for development)
- AWS credentials configured

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file:

```env
NODE_ENV=development
PORT=5000
CLERK_SECRET_KEY=your_clerk_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=your_s3_bucket
```

### Development

Start DynamoDB Local:
```bash
# Download and run DynamoDB Local on port 8000
docker run -p 8000:8000 amazon/dynamodb-local
```

Run the development server:
```bash
npm run dev
```

Seed the database:
```bash
npm run seed
```

The API will be available at `http://localhost:5000`.

## API Endpoints

### Courses
- `GET /courses` - List all courses (with optional category filter)
- `GET /courses/:courseId` - Get course details
- `POST /courses` - Create new course (requires auth)
- `PUT /courses/:courseId` - Update course (requires auth)
- `DELETE /courses/:courseId` - Delete course (requires auth)

### User Progress
- `GET /users/course-progress/:userId/:courseId` - Get user progress
- `POST /users/course-progress` - Update progress (requires auth)

### Transactions
- `POST /transactions` - Process payment (requires auth)
- `GET /transactions` - List user transactions (requires auth)

### Authentication
- `GET /users/clerk/:userId` - Get user profile (requires auth)

## Data Models

### Course Structure
```typescript
{
  courseId: string,
  title: string,
  description: string,
  category: string,
  image: string,
  price: number,
  level: "Beginner" | "Intermediate" | "Advanced",
  status: "Published" | "Draft",
  sections: [
    {
      sectionId: string,
      sectionTitle: string,
      sectionDescription: string,
      chapters: [
        {
          chapterId: string,
          type: "Text" | "Quiz" | "Video",
          title: string,
          content: string,
          video?: string,
          comments: []
        }
      ]
    }
  ]
}
```

### User Progress
Tracks completion status for each chapter and overall course progress.

### Transactions
Handles Stripe payment records linked to course purchases.

## Development Patterns

### Database
- Uses DynamoDB Local for development (auto-configured)
- Production uses AWS DynamoDB
- Models use Dynamoose ODM with TypeScript schemas
- Table names match model names (singular)

### Error Handling
Controllers follow this pattern:
```typescript
try {
  // business logic
  res.json({ message: "Success", data: result });
} catch (error) {
  console.error("Error description:", error);
  res.status(500).json({ message: "Internal server error", error });
}
```

### Authentication
Routes requiring authentication use `requireAuth()` middleware from Clerk.

### File Uploads
Handled via Multer middleware with S3 integration for video/image storage.

## Scripts

- `npm run build` - Compile TypeScript and copy seed data
- `npm start` - Production build and start
- `npm run dev` - Development with hot reload
- `npm run seed` - Populate database with sample data

## Database Seeding

Seed data is stored in `src/seed/data/` as JSON files:
- `courses.json` - Sample courses
- `transactions.json` - Sample transactions  
- `userCourseProgress.json` - Sample user progress

Run `npm run seed` to populate tables. This will delete existing data and recreate tables.

## Deployment

The application is designed for AWS Lambda deployment:

1. Build the Docker image using the provided Dockerfile
2. Deploy to AWS Lambda with API Gateway
3. Set environment variables in Lambda configuration
4. Ensure DynamoDB tables exist in production

The serverless handler supports both API requests and database seeding via special events.

## Project Structure

```
src/
├── index.ts              # Express app setup and routes
├── controllers/          # Business logic
├── models/              # DynamoDB schemas
├── routes/              # Route definitions
├── utils/               # Shared utilities
└── seed/                # Database seeding
    ├── seedDynamodb.ts
    └── data/            # JSON seed files
```

## Contributing

1. Follow TypeScript strict mode conventions
2. Use existing error handling patterns
3. Add seed data for new models
4. Update API documentation for new endpoints