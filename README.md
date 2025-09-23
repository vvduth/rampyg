# Rampy

A modern learning management system built with Next.js and Express.js, designed for creating and selling online courses.

## Features

### For Teachers
- **Course Creation**: Build structured courses with sections, chapters, and video content
- **Content Management**: Upload videos to AWS S3 with CloudFront distribution
- **Student Analytics**: Track enrollments and course progress
- **Revenue Tracking**: View transaction history and billing information
- **Draft System**: Save and publish courses when ready

### For Students
- **Course Discovery**: Browse and search available courses by category
- **Video Learning**: Stream course videos with progress tracking
- **Purchase System**: Secure checkout with Stripe integration
- **Progress Tracking**: Automatic chapter completion and course progress
- **Responsive Design**: Works across desktop and mobile devices

### Technical Highlights
- **Authentication**: Clerk-based user management with role-based access
- **Payment Processing**: Stripe integration for secure transactions
- **Video Storage**: AWS S3 + CloudFront for optimized video delivery
- **Database**: DynamoDB with Dynamoose ODM
- **Real-time UI**: Modern React components with Tailwind CSS
- **Type Safety**: Full TypeScript implementation

## Architecture

```
rampyg/
├── client/          # Next.js frontend application
│   ├── src/
│   │   ├── app/            # App router pages
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   ├── state/          # Redux toolkit + RTK Query
│   │   └── types/          # TypeScript definitions
│   └── public/      # Static assets
└── server/          # Express.js backend API
    └── src/
        ├── controllers/    # Route handlers
        ├── models/         # DynamoDB schemas
        ├── routes/         # API endpoints
        └── utils/          # Helper functions
```

## Tech Stack

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Redux Toolkit** + RTK Query for state management
- **Clerk** for authentication
- **Stripe Elements** for payments
- **React Player** for video playback
- **Radix UI** for accessible components

### Backend
- **Express.js** with TypeScript
- **DynamoDB** with Dynamoose ODM
- **AWS S3** for file storage
- **CloudFront** for content delivery
- **Stripe** for payment processing
- **Clerk** for user management

## Quick Start

### Prerequisites
- Node.js 20+
- AWS account with S3 and CloudFront
- Stripe account
- Clerk account

### Environment Setup

Create `.env.local` in `/client`:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/signin
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
```

Create `.env` in `/server`:
```bash
CLERK_SECRET_KEY=sk_test_...
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-bucket-name
CLOUDFRONT_DOMAIN=https://your-cloudfront-domain.com
STRIPE_SECRET_KEY=sk_test_...
```

### Installation

1. **Install dependencies**:
```bash
# Frontend
cd client && npm install

# Backend
cd ../server && npm install
```

2. **Start development servers**:
```bash
# Backend (from /server)
npm run dev

# Frontend (from /client) 
npm run dev
```

3. **Access the application**:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## API Endpoints

### Courses
- `GET /api/courses` - List all courses
- `POST /api/courses` - Create new course
- `GET /api/courses/:id` - Get course details
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Video Upload
- `POST /api/courses/:courseId/sections/:sectionId/chapters/:chapterId/get-upload-url` - Get S3 upload URL

### Transactions
- `POST /api/transactions/stripe/payment-intent` - Create payment intent
- `POST /api/transactions` - Record transaction
- `GET /api/transactions` - Get user transactions

### User Progress
- `GET /api/users/:userId/courses` - Get enrolled courses
- `GET /api/users/:userId/course-progress/:courseId` - Get course progress
- `PUT /api/users/:userId/course-progress/:courseId` - Update progress

## Course Structure

Courses follow a hierarchical structure:
```
Course
├── Section 1
│   ├── Chapter 1 (Video)
│   ├── Chapter 2 (Video)
│   └── Chapter 3 (Video)
├── Section 2
│   ├── Chapter 4 (Video)
│   └── Chapter 5 (Video)
└── ...
```

Each chapter can contain:
- Video content (required)
- Chapter description
- Resources (planned feature)
- Quizzes (planned feature)

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Backend (AWS Lambda/Railway)
1. Build the project: `npm run build`
2. Deploy using your preferred platform
3. Update frontend API URL environment variable

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Open a pull request

## Development Notes

- Uses role-based routing with Clerk middleware
- Video uploads are handled client-side directly to S3
- Course progress is tracked automatically during video playback
- All prices are stored in cents for precision
- TypeScript interfaces are globally declared in `types/index.d.ts`

## License

This project is licensed under the MIT License.