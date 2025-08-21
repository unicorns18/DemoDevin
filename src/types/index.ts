import type { Ref, ComputedRef } from 'vue'

// Theme composable types
export interface ThemeState {
  isDarkMode: Ref<boolean>
  toggleTheme: () => void
  themeClasses: ComputedRef<string>
}

export interface ThemeConfig {
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

// Intersection observer composable types
export interface IntersectionState {
  isVisible: Ref<Record<string, boolean>>
  observeElement: (id: string) => void
}

// Animation configuration types
export interface AnimationConfig {
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

// Feature data model (for future use)
export interface Feature {
  id: string
  icon: string // Will be component name for Vue
  title: string
  description: string
  image: string
  benefits: string[]
  stats?: {
    value: string
    label: string
  }[]
}