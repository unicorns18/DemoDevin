# Technology Stack

## Build System & Framework
- **Vite** - Fast build tool and dev server
- **React 18** - UI framework with TypeScript support
- **TypeScript** - Type-safe JavaScript development

## Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing with autoprefixer
- **Tailwind Animate** - Animation utilities
- **Lucide React** - Modern icon library

## Development Tools
- **ESLint** - Code linting (via Vite React plugin)
- **TypeScript compiler** - Type checking and compilation

## Key Dependencies
- `react` & `react-dom` - Core React libraries
- `lucide-react` - Icon components (Star, Shield, Zap, Heart, etc.)
- `recharts` - Chart library (available but not currently used)
- `tailwindcss` & `autoprefixer` - CSS framework and processing

## Common Commands

### Development
```bash
npm run dev        # Start development server on localhost:5173
```

### Build & Deploy
```bash
npm run build      # TypeScript compilation + Vite build
npm run preview    # Preview production build locally
```

### Package Management
```bash
npm install        # Install dependencies
npm ci            # Clean install for CI/CD
```

## Configuration Notes
- Vite configured with React plugin and path aliases (`@/` → `./src/`)
- Development server runs on `127.0.0.1:5173` with host binding
- Build output goes to `dist/` directory
- TypeScript uses project references for app and node configurations