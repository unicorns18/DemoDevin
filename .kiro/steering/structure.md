# Project Structure

## Root Directory
```
├── src/                    # Source code
├── public/                 # Static assets (via index.html)
├── dist/                   # Build output (generated)
├── node_modules/           # Dependencies
├── .kiro/                  # Kiro configuration and steering
├── .vscode/                # VS Code settings
└── .git/                   # Git repository
```

## Source Code Organization (`src/`)
```
src/
├── App.tsx                 # Main application component
├── main.tsx               # React application entry point
└── index.css              # Global styles and Tailwind imports
```

## Configuration Files
- `package.json` - Dependencies and npm scripts
- `vite.config.ts` - Vite build configuration with React plugin
- `tsconfig.json` - TypeScript project references
- `tsconfig.app.json` - App-specific TypeScript config
- `tsconfig.node.json` - Node/build tools TypeScript config
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `index.html` - HTML entry point

## Code Organization Patterns

### Component Structure
- Single-file components in TypeScript React (`.tsx`)
- Functional components with hooks
- Inline styles using Tailwind classes
- Custom CSS animations defined in `<style>` blocks

### State Management
- Local component state using `useState`
- Effect hooks (`useEffect`) for side effects
- No external state management library

### Styling Approach
- Utility-first with Tailwind CSS
- Custom animations and keyframes
- Responsive design with mobile-first approach
- Dark/light theme support via conditional classes

### Asset Management
- External images via Unsplash URLs
- Icons from Lucide React library
- No local image assets currently

## Path Aliases
- `@/` maps to `./src/` for cleaner imports
- Configured in both Vite and TypeScript configs