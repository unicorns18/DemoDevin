# Design Document

## Overview

This design outlines the migration strategy from React to Vue.js 3 with shadcn-vue components while maintaining identical functionality and visual appearance. The migration will leverage Vue's Composition API, reactive system, and shadcn-vue's component library to create a more maintainable and performant application.

## Architecture

### Framework Migration Strategy
- **From:** React 18 with hooks and functional components
- **To:** Vue 3 with Composition API and Single File Components (SFC)
- **Build System:** Maintain Vite but replace @vitejs/plugin-react with @vitejs/plugin-vue
- **Styling:** Maintain Tailwind CSS but integrate with shadcn-vue components
- **Icons:** Replace lucide-react with lucide-vue-next

### Project Structure
```
src/
├── App.vue                 # Main application component (converted from App.tsx)
├── main.ts                 # Vue application entry point (converted from main.tsx)
├── style.css              # Global styles (renamed from index.css)
├── components/            # Vue components directory
│   ├── ui/               # shadcn-vue components
│   ├── ThemeToggle.vue   # Extracted theme toggle component
│   ├── HeroSection.vue   # Hero section component
│   ├── FeatureSection.vue # Feature sections component
│   └── FooterSection.vue # Footer component
├── composables/          # Vue composables
│   ├── useTheme.ts      # Theme management composable
│   └── useIntersection.ts # Intersection observer composable
└── types/               # TypeScript type definitions
    └── index.ts         # Shared types
```

## Components and Interfaces

### Core Application Component (App.vue)
```vue
<template>
  <div :class="themeClasses">
    <!-- Theme toggle, hero, features, footer sections -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'
// Component imports
</script>

<style scoped>
/* Component-specific styles and animations */
</style>
```

### Theme Management (useTheme.ts)
```typescript
export interface ThemeState {
  isDarkMode: Ref<boolean>
  toggleTheme: () => void
  themeClasses: ComputedRef<string>
}

export function useTheme(): ThemeState {
  // Vue reactive theme management
}
```

### Intersection Observer (useIntersection.ts)
```typescript
export interface IntersectionState {
  isVisible: Ref<Record<string, boolean>>
  observeElement: (id: string) => void
}

export function useIntersection(): IntersectionState {
  // Vue reactive intersection observer
}
```

### shadcn-vue Component Integration

#### Button Components
- Replace custom button styling with shadcn-vue Button component
- Maintain hover effects and animations through Button variants
- Use `variant="default"` for primary CTA and `variant="outline"` for secondary

#### Card Components
- Use shadcn-vue Card, CardHeader, CardContent for feature sections
- Maintain glass morphism effects through custom CSS classes
- Preserve hover lift animations

#### Switch/Toggle Component
- Evaluate shadcn-vue Switch component for theme toggle
- If not suitable, create custom toggle maintaining current design
- Preserve sun/moon icon animations

## Data Models

### Theme Configuration
```typescript
interface ThemeConfig {
  isDarkMode: boolean
  transitions: {
    duration: string
    easing: string
  }
  colors: {
    primary: string
    secondary: string
    background: string
    text: string
  }
}
```

### Animation Configuration
```typescript
interface AnimationConfig {
  float: {
    duration: string
    delay?: string
  }
  slideUp: {
    duration: string
    delay?: string
  }
  scaleIn: {
    duration: string
    delay?: string
  }
}
```

### Feature Data Model
```typescript
interface Feature {
  id: string
  icon: Component
  title: string
  description: string
  image: string
  benefits: string[]
  stats?: {
    value: string
    label: string
  }[]
}
```

## Error Handling

### Migration Error Prevention
1. **Type Safety:** Maintain strict TypeScript configuration with Vue-specific types
2. **Component Props:** Use Vue's `defineProps` with TypeScript interfaces
3. **Event Handling:** Replace React event handlers with Vue event listeners
4. **Lifecycle Management:** Convert React useEffect to Vue onMounted/onUnmounted

### Runtime Error Handling
1. **Global Error Handler:** Configure Vue global error handler for unhandled exceptions
2. **Component Error Boundaries:** Use Vue's errorCaptured hook for component-level error handling
3. **Development Warnings:** Enable Vue devtools and development warnings

### Fallback Strategies
1. **Animation Fallbacks:** Provide CSS-only fallbacks for JavaScript animations
2. **Image Loading:** Implement error handling for external image URLs
3. **Theme Persistence:** Handle localStorage errors gracefully

## Testing Strategy

### Unit Testing
1. **Component Testing:** Use Vue Test Utils with Vitest for component testing
2. **Composables Testing:** Test theme and intersection observer composables in isolation
3. **Type Testing:** Ensure TypeScript compilation without errors

### Integration Testing
1. **Theme Toggle:** Test dark/light mode switching functionality
2. **Scroll Animations:** Test intersection observer triggering animations
3. **Responsive Design:** Test component behavior across different viewport sizes

### Visual Regression Testing
1. **Screenshot Comparison:** Compare React vs Vue versions pixel-by-pixel
2. **Animation Testing:** Verify animation timing and effects match original
3. **Cross-browser Testing:** Ensure consistent behavior across browsers

### Performance Testing
1. **Bundle Size:** Compare final bundle size with React version
2. **Runtime Performance:** Measure component render times and memory usage
3. **Animation Performance:** Test animation smoothness and frame rates

## Migration Implementation Strategy

### Phase 1: Project Setup
1. Update package.json dependencies
2. Configure Vite for Vue
3. Update TypeScript configuration
4. Install and configure shadcn-vue

### Phase 2: Core Infrastructure
1. Create Vue main.ts entry point
2. Set up theme management composable
3. Create intersection observer composable
4. Configure global styles

### Phase 3: Component Migration
1. Convert App.tsx to App.vue
2. Extract and convert major sections to components
3. Integrate shadcn-vue components
4. Preserve all animations and interactions

### Phase 4: Testing and Refinement
1. Implement comprehensive testing
2. Visual comparison and adjustment
3. Performance optimization
4. Documentation updates

## Dependencies Management

### Remove React Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "@types/react": "^18.2.66",
  "@types/react-dom": "^18.2.22",
  "@vitejs/plugin-react": "^4.2.1",
  "lucide-react": "^0.364.0"
}
```

### Add Vue Dependencies
```json
{
  "vue": "^3.4.0",
  "@vitejs/plugin-vue": "^5.0.0",
  "lucide-vue-next": "^0.364.0",
  "@vue/tsconfig": "^0.5.0"
}
```

### Add shadcn-vue Dependencies
```json
{
  "shadcn-vue": "^0.10.0",
  "@vueuse/core": "^10.0.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0"
}
```

## Configuration Updates

### Vite Configuration
- Replace React plugin with Vue plugin
- Maintain path aliases and build configuration
- Add Vue-specific optimizations

### TypeScript Configuration
- Update to use Vue TypeScript definitions
- Configure proper module resolution for .vue files
- Maintain strict type checking

### Tailwind Configuration
- Integrate with shadcn-vue theme system
- Preserve custom animations and utilities
- Maintain responsive breakpoints

This design ensures a seamless migration while leveraging Vue's strengths and shadcn-vue's component ecosystem for improved maintainability and developer experience.