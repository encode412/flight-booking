# Ezzifly - Modern Flight Booking Website

A modern, responsive flight booking platform built with Next.js, TypeScript, and Tailwind CSS. This application provides a seamless user experience for flight search, booking, and user account management.

## 🚀 Live Demo

**Deployed Application:** ezzifly.vercel.app

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Development](#development)
- [Build & Deployment](#build--deployment)
- [Design Implementation](#design-implementation)
- [Technical Approach](#technical-approach)
- [Responsive Design](#responsive-design)

## ✨ Features

### Implemented Pages
- **Homepage**: Modern landing page with flight search functionality
- **Sign In**: User authentication with email/password
- **Register**: New user registration with form validation
- **Profile Section**: Personal details management with update capabilities

### Key Functionalities
- ✅ User authentication (register/login)
- ✅ Protected routes with middleware
- ✅ Profile management (view/edit personal details)
- ✅ Form validation with real-time feedback
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading states and error handling
- ✅ Toast notifications for user feedback
- ✅ Session management with JWT tokens

## 🛠 Tech Stack

### Core Technologies
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **HTTP Client:** Axios

### Additional Libraries
- **Icons:** HugeIcons
- **Notifications:** React Hot Toast

## 📁 Project Structure

```
ezzifly/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   └── profile/
│   │       └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── profile/
│   │   └── PersonalDetailsForm.tsx
│   └── shared/
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── Navbar.tsx
├── lib/
│   ├── api/
│   │   ├── auth.ts
│   │   └── user.ts
│   ├── utils/
│   │   ├── validation.ts
│   │   └── helpers.ts
│   └── hooks/
│       ├── useAuth.ts
│       └── useUser.ts
├── types/
│   ├── auth.ts
│   └── user.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🚦 Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (v18 or higher)
- npm, yarn, or pnpm
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ezzifly.git
cd ezzifly
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

## 🔧 Environment Setup

Create a `.env.local` file in the root directory:

```env
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# API Configuration
NEXT_PUBLIC_API_BASE_URL=your-api-base-url
```

## 💻 Development

### Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
# Development
npm run dev          # Start development server

# Build
npm run build        # Create production build
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
npm run format       # Format code with Prettier

# Testing (if implemented)
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

## 🏗 Build & Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `.next` folder.

### Deployment Options

#### Vercel (Recommended)
1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

#### Netlify
1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add environment variables in Netlify dashboard

#### Heroku
```bash
# Add buildpack
heroku buildpacks:set heroku/nodejs

# Deploy
git push heroku main
```

## 🎨 Design Implementation

### Design System

The UI is implemented based on the [Figma design](https://www.figma.com/design/vQtKjDwEIYQIizxdiN1rq7/Ezzifly-website?node-id=26-570&t=uUMYZBmksk4rd73l-1) with the following specifications:

#### Colors
```css
--primary: #3B82F6
--secondary: #10B981
--accent: #F59E0B
--background: #FFFFFF
--surface: #F9FAFB
--text-primary: #111827
--text-secondary: #6B7280
```

#### Typography
- Font Family: Poppins
- Headings: Bold, 24-48px
- Body: Regular, 14-16px
- Small Text: 12-14px

#### Spacing
- Base unit: 4px
- Component padding: 16px, 24px, 32px
- Section margins: 48px, 64px, 96px

### Component Library

Reusable UI components built following atomic design principles:

- **Atoms**: Button, Input, Label, Badge
- **Molecules**: FormField, SearchBar, DatePicker
- **Organisms**: Navbar, Footer, FlightCard, ProfileForm
- **Templates**: AuthLayout, DashboardLayout
- **Pages**: Homepage, Login, Register, Profile

## 🔍 Technical Approach

### Architecture Decisions

#### 1. **Next.js App Router**
- Leveraging React Server Components for better performance
- File-based routing for intuitive navigation
- Built-in API routes for backend functionality

#### 2. **TypeScript Implementation**
```typescript
// Type-safe API responses
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

// Strict form validation
type LoginFormData = {
  email: string;
  password: string;
};
```

#### 3. **State Management**
- Redux for global auth state
- Local state for component-specific data
- Server state caching with RTK

#### 5. **Authentication Flow**
```
User Login → API Request → JWT Token → Store in Cookie/LocalStorage → Protected Routes
```

#### 6. **Error Handling**
- Global error boundary for React errors
- API error interceptors with retry logic
- User-friendly error messages with toast notifications

### Code Quality

#### TypeScript Configuration
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

#### ESLint Rules
- Enforced code style consistency
- Import order validation
- TypeScript-specific linting

#### Code Organization
- **Separation of Concerns**: Logic separated from presentation
- **DRY Principle**: Reusable components and utilities
- **Single Responsibility**: Each component has one clear purpose

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

### Responsive Patterns

#### Mobile (< 768px)
- Single column layout
- Hamburger menu navigation
- Touch-friendly buttons (min 44px)
- Stacked form fields

#### Tablet (768px - 1024px)
- Two-column grid where appropriate
- Collapsible sidebar navigation
- Optimized spacing

#### Desktop (> 1024px)
- Multi-column layouts
- Full navigation menu
- Enhanced hover states
- Larger imagery

### Tailwind Responsive Classes
```tsx
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-4 
  md:gap-6 
  lg:gap-8
">
  {/* Responsive grid */}
</div>
```

## 🔐 Security Considerations

- ✅ JWT token validation
- ✅ Password hashing (handled by API)
- ✅ Protected routes with middleware
- ✅ CSRF protection
- ✅ XSS prevention with React's built-in escaping
- ✅ Secure cookie configuration
- ✅ Input sanitization

## ⚡ Performance Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component with lazy loading
- **Font Optimization**: Using next/font for optimal font loading
- **Bundle Analysis**: Webpack bundle analyzer for size monitoring
- **Caching**: Strategic use of React Server Components caching

## 🧪 Testing (Optional Enhancement)

```bash
# Unit tests with Jest
npm run test

# E2E tests with Playwright
npm run test:e2e

# Coverage report
npm run test:coverage
```

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 3000
npx kill-port 3000
```

**Build errors:**
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

**Type errors:**
```bash
# Check TypeScript compilation
npm run type-check
```

## 📝 Development Guidelines

### Git Workflow
```bash
# Feature branch
git checkout -b feature/flight-search

# Commit messages
git commit -m "feat: add flight search component"
git commit -m "fix: resolve login form validation"
git commit -m "docs: update README with setup instructions"
```

### Commit Convention
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Testing
- `chore`: Maintenance

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Timothy Onyeacholam**
- GitHub: [@yourusername](https://github.com/encode412)
- Email: timothyonyea@example.com
- LinkedIn: [Your LinkedIn](https://www.linkedin.com/in/timothy-onyeacholam-12365920a/)

## 🙏 Acknowledgments

- Design by Ezzifly Design Team
- Built with Next.js and Tailwind CSS
- Inspired by modern flight booking platforms

---