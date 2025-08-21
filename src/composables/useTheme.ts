import { ref, computed, watch } from 'vue'
import type { ThemeState } from '@/types'

// Global theme state - shared across all components
const isDarkMode = ref<boolean>(true)

// Initialize theme from localStorage on first load
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark'
  }
}

// Watch for theme changes and persist to localStorage
watch(isDarkMode, (newValue) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', newValue ? 'dark' : 'light')
  }
})

export function useTheme(): ThemeState {
  // Toggle theme function
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
  }

  // Computed theme classes for the main container
  const themeClasses = computed(() => {
    return `min-h-screen transition-all duration-500 ${
      isDarkMode.value 
        ? 'bg-gray-900 text-white' 
        : 'bg-white text-gray-900'
    }`
  })

  return {
    isDarkMode,
    toggleTheme,
    themeClasses
  }
}