# Rampy Client

A modern learning management system built with Next.js that enables course creation, enrollment, and progress tracking. Teachers can create and manage courses while students can enroll, track progress, and complete coursework.

## Features

- **Course Management**: Create, edit, and publish courses with chapters and sections
- **User Authentication**: Secure authentication with Clerk integration
- **Payment Processing**: Stripe integration for course purchases
- **Progress Tracking**: Real-time student progress monitoring
- **Video Support**: Embedded video content for course chapters
- **File Uploads**: Image and document upload capabilities
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Role-based Access**: Separate interfaces for teachers and students

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit with RTK Query
- **Authentication**: Clerk
- **Payments**: Stripe
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Configure your Clerk and Stripe keys in `.env.local`

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── (nondashboard)/    # Public routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI primitives
│   └── [feature]/        # Feature-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and schemas
├── state/                # Redux store and API
└── types/                # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

Required environment variables:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_API_BASE_URL=your_api_url
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

## Key Components

- **CourseCard**: Displays course information with enrollment actions
- **CustomFormField**: Reusable form field component with validation
- **ChaptersSidebar**: Navigation for course content
- **NonDashboardNavBar**: Public site navigation

## API Integration

The application uses RTK Query for API calls. See `src/state/api.ts` for endpoint definitions. The API handles:

- Course CRUD operations
- User authentication and management
- Payment processing
- Progress tracking
- File uploads

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
