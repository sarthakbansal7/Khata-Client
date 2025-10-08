# Khata Client (Frontend)

A modern, responsive personal finance management web application built with Next.js 15, React 19, TypeScript, and Tailwind CSS. Features real-time transaction tracking, advanced analytics, OCR receipt processing, and comprehensive data visualization.

## 🚀 Features

### 🔐 Authentication & Security
- **JWT-based Authentication** - Secure token-based user authentication
- **Protected Routes** - Route-level authentication with context providers
- **Persistent Sessions** - Automatic token refresh and session management
- **User Profile Management** - Complete user account management

### 💰 Transaction Management
- **Complete CRUD Operations** - Create, read, update, delete transactions
- **Smart Categorization** - Pre-defined categories with custom options
- **Advanced Filtering** - Filter by type, category, date ranges, and search terms
- **Bulk Import** - CSV file import with template download
- **Real-time Updates** - Instant UI updates after operations

### 📊 Analytics & Visualization
- **Interactive Dashboard** - Comprehensive overview of financial health
- **Revenue Charts** - Monthly and yearly revenue tracking
- **Expense Analytics** - Pie charts and bar graphs for expense breakdown
- **Summary Cards** - Quick overview of income, expenses, and balance
- **Transaction History** - Paginated transaction listing with search

### 🤖 AI-Powered Features
- **OCR Receipt Processing** - Extract transaction data from receipt images/PDFs
- **Smart Data Extraction** - Automatic merchant name, amount, and date detection
- **Multiple Format Support** - JPG, PNG, PDF, and other image formats
- **OCR.Space Integration** - Professional OCR service with high accuracy

### 📈 Data Export & Import
- **CSV Export** - Export filtered transaction data with analytics
- **PDF Export** - Generate PDF reports with transaction summaries
- **Template Downloads** - Pre-formatted CSV templates for import
- **Filtered Exports** - Export based on current view filters

### 🎨 User Experience
- **Responsive Design** - Mobile-first, works on all device sizes
- **Modern UI Components** - Shadcn/UI components with Tailwind CSS
- **Dark/Light Themes** - Theme switching with system preference detection
- **Smooth Animations** - Framer Motion animations and transitions
- **Loading States** - Skeleton loaders and progress indicators

## 📁 Project Structure

```
Khata-Client/
├── app/                     # Next.js 15 App Router
│   ├── authContext/            # Authentication context and APIs
│   │   ├── authApi.tsx           # Authentication API functions
│   │   ├── routesProtector.tsx   # Route protection HOC
│   │   └── transactionApi.tsx    # Transaction API functions
│   ├── finance/               # Finance dashboard routes
│   │   ├── page.tsx              # Main dashboard
│   │   ├── ai-assistant/         # AI features
│   │   ├── help/                 # Help pages
│   │   ├── manage/               # Management pages
│   │   │   ├── add/              # Add transaction
│   │   │   ├── transactions/     # Transaction list
│   │   │   └── upload/           # File upload
│   │   └── settings/             # Settings page
│   ├── login/                 # Authentication pages
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page
├── components/              # Reusable React components
│   ├── finance/                # Finance-specific components
│   │   ├── Dashboard.tsx           # Main dashboard component
│   │   ├── TransactionList.tsx     # Transaction table with pagination
│   │   ├── AddTransactionForm.tsx  # Transaction creation form
│   │   ├── ExpensePieChart.tsx     # Expense category pie chart
│   │   ├── MonthlyExpensesChart.tsx # Monthly expense bar chart
│   │   ├── SummaryCards.tsx        # Financial summary cards
│   │   ├── EarningReport.tsx       # Earnings visualization
│   │   ├── UploadManager.tsx       # File upload interface
│   │   ├── ExportModal.tsx         # Data export modal
│   │   ├── Sidebar.tsx             # Navigation sidebar
│   │   └── Navbar.tsx              # Top navigation bar
│   ├── ui/                     # Base UI components
│   │   ├── avatar.tsx              # Avatar component
│   │   └── circular-reveal-heading.tsx # Animated heading
│   ├── HeroSection.tsx         # Landing page hero
│   ├── Features.tsx            # Feature showcase
│   ├── Testimonials.tsx        # User testimonials
│   └── Footer.tsx              # Site footer
├── lib/                     # Utility libraries
│   ├── network.ts              # API configuration and utilities
│   ├── exportService.ts        # Data export functionality
│   ├── aiService.ts            # AI/ML service integration
│   ├── mockData.ts             # Development mock data
│   └── utils.ts                # General utilities
├── public/                  # Static assets
├── next.config.ts           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🛠️ Tech Stack

### Core Framework
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript development

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - High-quality accessible components
- **Radix UI** - Primitive components for accessibility
- **Lucide React** - Beautiful SVG icons
- **Framer Motion** - Animation library

### Data Visualization
- **Recharts** - Composable charting library for React
- **Chart.js** - Flexible charting for web applications
- **React Chart.js 2** - React wrapper for Chart.js

### Development Tools
- **PostCSS** - CSS processing tool
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting (configured)

## 📦 Dependencies

### Production Dependencies
```json
{
  "@radix-ui/react-avatar": "^1.1.10",   // Avatar components
  "chart.js": "^4.5.0",                  // Charting library
  "class-variance-authority": "^0.7.1",   // CSS class utilities
  "clsx": "^2.1.1",                      // Conditional classes
  "framer-motion": "^12.23.22",          // Animations
  "lucide-react": "^0.544.0",            // Icons
  "next": "15.5.4",                      // React framework
  "next-themes": "^0.4.6",               // Theme management
  "react": "19.1.0",                     // React library
  "react-chartjs-2": "^5.3.0",           // Chart.js React wrapper
  "react-dom": "19.1.0",                 // React DOM
  "recharts": "^3.2.1",                  // React charts
  "tailwind-merge": "^3.3.1",            // Tailwind class merging
  "tailwindcss-animate": "^1.0.7"        // Tailwind animations
}
```

### Development Dependencies
```json
{
  "@tailwindcss/postcss": "^4",          // Tailwind PostCSS
  "@types/node": "^20",                  // Node.js type definitions
  "@types/react": "^19",                 // React type definitions
  "@types/react-dom": "^19",             // React DOM types
  "eslint": "^9",                        // JavaScript linter
  "eslint-config-next": "15.5.4",        // Next.js ESLint config
  "postcss": "^8",                       // CSS processing
  "tailwindcss": "^4.0.0",               // Tailwind CSS
  "typescript": "^5"                     // TypeScript compiler
}
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Running Khata Server (backend)

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000

# OCR Configuration
NEXT_PUBLIC_OCR_API_KEY=your-ocr-space-api-key

# Feature Flags
NEXT_PUBLIC_ENABLE_OCR=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true

# Development
NODE_ENV=development
```

### Installation Steps

1. **Clone and navigate to client directory:**
   ```bash
   cd Khata-Client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Ensure backend is running:**
   ```bash
   # Backend should be running on http://localhost:5000
   curl http://localhost:5000/api/health
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser:**
   ```
   Navigate to http://localhost:3000
   ```

## 🔧 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm start

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 🎯 Core Features Guide

### 🔐 Authentication Flow

#### Registration
```typescript
// Navigate to /login and click "Sign Up"
// Fill registration form:
{
  name: "John Doe",
  email: "john@example.com",
  password: "securepassword"
}
```

#### Login
```typescript
// Navigate to /login
// Fill login form:
{
  email: "john@example.com", 
  password: "securepassword"
}
```

### 💰 Transaction Management

#### Adding Transactions
1. Navigate to `/finance/manage/add`
2. Fill transaction form with required details
3. Select appropriate category and type
4. Submit to create transaction

#### Bulk Import via CSV
1. Go to `/finance/manage/upload`
2. Download CSV template
3. Fill template with transaction data
4. Upload completed CSV file

#### OCR Receipt Processing
1. Navigate to `/finance/manage/upload`
2. Upload receipt image (JPG, PNG) or PDF
3. System extracts merchant, amount, date automatically
4. Review extracted data before saving
5. Transaction created automatically

### 📊 Analytics Dashboard

#### Available Charts
- **Summary Cards**: Income, Expenses, Balance overview
- **Pie Charts**: Expense breakdown by category
- **Bar Charts**: Monthly expense trends
- **Line Charts**: Revenue tracking over time

#### Filtering Options
- **Date Ranges**: Filter by specific months, years, or custom ranges
- **Transaction Types**: Filter by income or expense
- **Categories**: Filter by specific spending categories
- **Search**: Text search across transaction descriptions

### 📈 Data Export

#### Export Options
1. Navigate to transaction list
2. Apply desired filters
3. Click export button
4. Choose format (CSV or PDF)
5. Download generated file

#### Export Formats
- **CSV**: Spreadsheet format with all transaction data
- **PDF**: Formatted report with summaries and charts

## 🎨 UI Components Guide

### Navigation Components
```typescript
// Sidebar Navigation
<Sidebar />
// - Dashboard link
// - Transaction management links
// - Settings and help links

// Top Navigation  
<Navbar />
// - User profile
// - Notifications
// - Quick actions
```

### Data Display Components
```typescript
// Summary Cards
<SummaryCards transactions={transactions} />
// - Total income
// - Total expenses  
// - Current balance
// - Growth percentages

// Transaction List with Pagination
<TransactionList 
  transactions={transactions}
  onTransactionUpdate={handleUpdate}
  serverSidePagination={false}
/>

// Chart Components
<ExpensePieChart transactions={transactions} />
<MonthlyExpensesChart transactions={transactions} />
```

### Form Components
```typescript
// Transaction Creation
<AddTransactionForm onSubmit={handleSubmit} />

// File Upload
<UploadManager />
// - Drag & drop interface
// - Multiple file support
// - Progress indicators
```

## 🔗 API Integration

### Authentication Context
```typescript
// useAuth Hook
const { user, isAuthenticated, login, logout } = useAuth();

// Route Protection
<RouteProtector>
  <ProtectedComponent />
</RouteProtector>
```

### Transaction API Usage
```typescript
// Get transactions
const response = await transactionApi.getTransactions({
  page: 1,
  limit: 10,
  type: 'expense'
});

// Create transaction
await transactionApi.createTransaction({
  title: "Grocery Shopping",
  amount: 85.50,
  category: "Food & Dining",
  type: "expense",
  date: "2024-01-15"
});
```

### OCR Service Integration
```typescript
// Process receipt
const result = await processReceiptFile(imageFile);
if (result.success) {
  // Use extracted data
  const { title, amount, date, category } = result.data;
}
```

## 🎨 Styling Guide

### Tailwind CSS Classes
```css
/* Common patterns used */
.card-style {
  @apply bg-white rounded-xl shadow-sm border border-gray-100 p-6;
}

.button-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors;
}

.input-field {
  @apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500;
}
```

### Theme Configuration
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    }
  }
}
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: `< 768px` - Single column layout, collapsible sidebar
- **Tablet**: `768px - 1024px` - Two column layout, condensed components  
- **Desktop**: `> 1024px` - Full three column layout, expanded components

### Mobile Optimizations
- Touch-friendly button sizes (min 44px)
- Swipe gestures for navigation
- Optimized image loading for receipts
- Compressed charts for mobile viewing

## 🚀 Performance Optimizations

### Next.js Features
- **App Router**: Latest Next.js routing with streaming
- **Server Components**: Automatic server-side rendering
- **Image Optimization**: Automatic image optimization and WebP conversion
- **Code Splitting**: Automatic bundle splitting for faster loads

### React Optimizations
- **Concurrent Features**: React 18+ concurrent rendering
- **Lazy Loading**: Dynamic imports for heavy components
- **Memoization**: React.memo and useMemo for expensive operations
- **Virtual Scrolling**: For large transaction lists

### Bundle Optimization
```javascript
// next.config.ts
const nextConfig = {
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'recharts']
  },
  images: {
    formats: ['image/webp', 'image/avif']
  }
}
```

## 🧪 Testing

### Component Testing
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom jest

# Run tests  
npm run test
```

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Transaction CRUD operations
- [ ] CSV import functionality
- [ ] OCR receipt processing
- [ ] Data export (CSV/PDF)
- [ ] Chart rendering and interactions
- [ ] Responsive design on different devices
- [ ] Error handling and loading states

## 🚀 Deployment

### Vercel Deployment (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel

# Production deployment
vercel --prod
```

### Docker Deployment
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
RUN npm install --only=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Configuration
```bash
# Production environment variables
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api
NODE_ENV=production
```

## 🔧 Configuration Files

### TypeScript Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  }
}
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
}
```

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Errors**
   ```typescript
   // Check network configuration
   // Verify backend is running on correct port
   // Check CORS settings in backend
   ```

2. **Authentication Issues**
   ```typescript
   // Clear localStorage
   localStorage.removeItem('token');
   // Check token expiration
   // Verify JWT secret matches backend
   ```

3. **OCR Processing Failures**
   ```typescript
   // Check OCR API key configuration
   // Verify image file format and size
   // Check network connectivity to OCR service
   ```

4. **Chart Rendering Issues**
   ```typescript
   // Check data format for charts
   // Verify Recharts version compatibility
   // Check for missing data points
   ```

## 📊 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Follow code style guidelines
4. Write tests for new features
5. Update documentation
6. Commit changes (`git commit -m 'Add amazing feature'`)
7. Push to branch (`git push origin feature/amazing-feature`)
8. Open Pull Request

### Code Style Guidelines
- Use TypeScript for all new code
- Follow Prettier formatting rules
- Use meaningful component and variable names
- Add JSDoc comments for complex functions
- Follow React best practices and hooks patterns

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

### Getting Help
- Check existing issues in the repository
- Create new issue with detailed description
- Include browser console logs for bugs
- Provide steps to reproduce issues

### Development Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Made with ❤️ for modern personal finance management**

## 🎉 Features Showcase

### 🔮 OCR Magic
Upload any receipt photo and watch as our AI extracts:
- Merchant name
- Purchase amount  
- Transaction date
- Automatic categorization

### 📊 Visual Analytics
Beautiful charts and graphs showing:
- Spending patterns by category
- Monthly expense trends
- Income vs expense comparisons
- Financial health indicators

### 💫 Smooth Experience
- Instant search across all transactions
- Real-time filtering and sorting
- Responsive design that works everywhere
- Lightning-fast page loads with Next.js

### 🔄 Smart Import/Export  
- Bulk import via CSV with templates
- Export to Excel-compatible formats
- PDF reports with summaries
- One-click data migration
