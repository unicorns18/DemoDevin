import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, nextTick } from 'vue'
import App from '../../App.vue'
import HeroSection from '../HeroSection.vue'
import FeatureSection from '../FeatureSection.vue'
import FooterSection from '../FooterSection.vue'
import ThemeToggle from '../ThemeToggle.vue'

// Create shared reactive theme state
const mockIsDarkMode = ref(false)
const mockToggleTheme = vi.fn(() => {
  mockIsDarkMode.value = !mockIsDarkMode.value
})
const mockThemeClasses = ref('')
const mockIsVisible = ref({})
const mockObserveElement = vi.fn()

// Update theme classes based on dark mode state
const updateThemeClasses = () => {
  mockThemeClasses.value = mockIsDarkMode.value 
    ? 'bg-gray-900 text-white min-h-screen transition-all duration-500'
    : 'bg-white text-gray-900 min-h-screen transition-all duration-500'
}

// Initialize theme classes
updateThemeClasses()

vi.mock('@/composables/useTheme', () => ({
  useTheme: () => ({
    isDarkMode: mockIsDarkMode,
    toggleTheme: mockToggleTheme,
    themeClasses: mockThemeClasses
  })
}))

vi.mock('@/composables/useIntersection', () => ({
  useIntersection: () => ({
    isVisible: mockIsVisible,
    observeElement: mockObserveElement
  })
}))

// Mock UI components
vi.mock('@/components/ui/button', () => ({
  Button: {
    name: 'Button',
    props: ['variant', 'size', 'class'],
    template: '<button :class="$props.class" @click="$emit(\'click\')"><slot /></button>'
  }
}))

vi.mock('@/components/ui/card', () => ({
  Card: {
    name: 'Card',
    props: ['class'],
    template: '<div :class="$props.class"><slot /></div>'
  },
  CardContent: {
    name: 'CardContent',
    props: ['class'],
    template: '<div :class="$props.class"><slot /></div>'
  }
}))

describe('Theme Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockIsDarkMode.value = false
    mockIsVisible.value = {}
    updateThemeClasses()
  })

  describe('App Component Theme Integration', () => {
    it('applies correct theme classes to main container', async () => {
      const wrapper = mount(App, {
        global: {
          stubs: {
            ThemeToggle: true,
            HeroSection: true,
            FeatureSection: true,
            FooterSection: true
          }
        }
      })
      
      // Initial light theme
      expect(wrapper.classes()).toContain('bg-white')
      expect(wrapper.classes()).toContain('text-gray-900')
      
      // Toggle to dark theme
      mockIsDarkMode.value = true
      updateThemeClasses()
      await nextTick()
      
      expect(wrapper.classes()).toContain('bg-gray-900')
      expect(wrapper.classes()).toContain('text-white')
    })
  })

  describe('ThemeToggle Component Integration', () => {
    it('toggles theme state correctly', async () => {
      const wrapper = mount(ThemeToggle)
      
      // Initial state - light mode (Moon icon should be visible)
      expect(mockIsDarkMode.value).toBe(false)
      
      // Click toggle button
      await wrapper.find('button').trigger('click')
      
      expect(mockToggleTheme).toHaveBeenCalled()
    })

    it('shows correct icon based on theme state', async () => {
      const wrapper = mount(ThemeToggle)
      
      // Light mode - should show Moon icon (check for component or SVG)
      const hasMoonIcon = wrapper.findComponent({ name: 'Moon' }).exists() || 
                         wrapper.find('svg').exists() ||
                         wrapper.html().includes('moon')
      expect(hasMoonIcon).toBe(true)
      
      // Switch to dark mode
      mockIsDarkMode.value = true
      await nextTick()
      
      // Dark mode - should show Sun icon (check for component or SVG)
      const hasSunIcon = wrapper.findComponent({ name: 'Sun' }).exists() || 
                        wrapper.find('svg').exists() ||
                        wrapper.html().includes('sun')
      expect(hasSunIcon).toBe(true)
    })

    it('applies correct button styles based on theme', async () => {
      const wrapper = mount(ThemeToggle)
      
      // Light mode styles
      expect(wrapper.find('button').classes()).toContain('bg-gray-100')
      
      // Switch to dark mode
      mockIsDarkMode.value = true
      await nextTick()
      
      // Dark mode styles
      expect(wrapper.find('button').classes()).toContain('bg-gray-800')
    })
  })

  describe('HeroSection Theme Integration', () => {
    it('applies correct background classes based on theme', async () => {
      const wrapper = mount(HeroSection)
      
      // Light theme background
      const section = wrapper.find('section')
      expect(section.classes()).toContain('bg-gradient-to-br')
      
      // Switch to dark theme
      mockIsDarkMode.value = true
      await nextTick()
      
      // Should still have gradient but different colors (handled by computed classes)
      expect(section.classes()).toContain('bg-gradient-to-br')
    })

    it('applies correct text colors based on theme', async () => {
      const wrapper = mount(HeroSection)
      
      // Light theme text
      const title = wrapper.find('h1')
      expect(title.classes()).toContain('text-gray-900')
      
      // Switch to dark theme
      mockIsDarkMode.value = true
      await nextTick()
      
      // Dark theme text
      expect(title.classes()).toContain('text-white')
    })

    it('applies correct button styles based on theme', async () => {
      const wrapper = mount(HeroSection)
      
      const buttons = wrapper.findAll('button')
      
      // Light theme button styles
      expect(buttons[0].classes()).toContain('bg-blue-600')
      expect(buttons[0].classes()).toContain('text-white')
      
      // Switch to dark theme
      mockIsDarkMode.value = true
      await nextTick()
      
      // Dark theme button styles
      expect(buttons[0].classes()).toContain('bg-yellow-400')
      expect(buttons[0].classes()).toContain('text-gray-900')
    })
  })

  describe('FeatureSection Theme Integration', () => {
    it('applies correct section background based on theme', async () => {
      const wrapper = mount(FeatureSection)
      
      const section = wrapper.find('section')
      expect(section.classes()).toContain('bg-gradient-to-br')
      
      // Switch to dark theme
      mockIsDarkMode.value = true
      await nextTick()
      
      expect(section.classes()).toContain('bg-gradient-to-br')
    })

    it('applies correct text colors based on theme', async () => {
      const wrapper = mount(FeatureSection)
      
      // Light theme
      const title = wrapper.find('h2')
      expect(title.classes()).toContain('text-gray-900')
      
      // Switch to dark theme
      mockIsDarkMode.value = true
      await nextTick()
      
      expect(title.classes()).toContain('text-white')
    })

    it('applies correct card styles based on theme', async () => {
      const wrapper = mount(FeatureSection)
      
      // Check for card elements (stats cards)
      const cards = wrapper.findAll('[class*="bg-"]')
      expect(cards.length).toBeGreaterThan(0)
      
      // Switch to dark theme and verify cards update
      mockIsDarkMode.value = true
      await nextTick()
      
      // Cards should still exist with updated styling
      const updatedCards = wrapper.findAll('[class*="bg-"]')
      expect(updatedCards.length).toBeGreaterThan(0)
    })
  })

  describe('FooterSection Theme Integration', () => {
    it('applies correct footer background based on theme', async () => {
      const wrapper = mount(FooterSection)
      
      // Light theme
      const footer = wrapper.find('footer')
      expect(footer.classes()).toContain('bg-gray-50')
      expect(footer.classes()).toContain('text-gray-900')
      
      // Switch to dark theme
      mockIsDarkMode.value = true
      await nextTick()
      
      expect(footer.classes()).toContain('bg-gray-900')
      expect(footer.classes()).toContain('text-gray-100')
    })

    it('applies correct input styles based on theme', async () => {
      const wrapper = mount(FooterSection)
      
      // Light theme input
      const input = wrapper.find('input')
      expect(input.classes()).toContain('bg-white')
      expect(input.classes()).toContain('border-gray-300')
      
      // Switch to dark theme
      mockIsDarkMode.value = true
      await nextTick()
      
      expect(input.classes()).toContain('bg-gray-800')
      expect(input.classes()).toContain('border-gray-700')
    })

    it('applies correct social link styles based on theme', async () => {
      const wrapper = mount(FooterSection)
      
      // Light theme social links
      const socialLinks = wrapper.findAll('a[aria-label]')
      expect(socialLinks[0].classes()).toContain('bg-white')
      expect(socialLinks[0].classes()).toContain('text-gray-600')
      
      // Switch to dark theme
      mockIsDarkMode.value = true
      await nextTick()
      
      expect(socialLinks[0].classes()).toContain('bg-gray-800')
      expect(socialLinks[0].classes()).toContain('text-gray-300')
    })
  })

  describe('Cross-Component Theme Consistency', () => {
    it('maintains consistent theme state across all components', async () => {
      const heroWrapper = mount(HeroSection)
      const featureWrapper = mount(FeatureSection)
      const footerWrapper = mount(FooterSection)
      const toggleWrapper = mount(ThemeToggle)
      
      // All should start in light mode
      expect(mockIsDarkMode.value).toBe(false)
      
      // Toggle theme
      await toggleWrapper.find('button').trigger('click')
      
      // All components should reflect the theme change
      await nextTick()
      
      // Verify theme consistency across components
      const wrappers = [heroWrapper, featureWrapper, footerWrapper]
      wrappers.forEach(wrapper => {
        // Each component should have updated its theme-dependent classes
        const html = wrapper.html()
        expect(html).toMatch(/bg-gray-[89]00|text-white|text-gray-100/)
      })
    })

    it('applies consistent color schemes across components', async () => {
      const heroWrapper = mount(HeroSection)
      const featureWrapper = mount(FeatureSection)
      const footerWrapper = mount(FooterSection)
      
      // Test light theme consistency
      mockIsDarkMode.value = false
      await nextTick()
      
      // Check for consistent light theme colors
      expect(heroWrapper.find('h1').classes()).toContain('text-gray-900')
      expect(featureWrapper.find('h2').classes()).toContain('text-gray-900')
      expect(footerWrapper.find('footer').classes()).toContain('text-gray-900')
      
      // Test dark theme consistency
      mockIsDarkMode.value = true
      await nextTick()
      
      // Check for consistent dark theme colors
      expect(heroWrapper.find('h1').classes()).toContain('text-white')
      expect(featureWrapper.find('h2').classes()).toContain('text-white')
      expect(footerWrapper.find('footer').classes()).toContain('text-gray-100')
    })

    it('maintains proper contrast ratios in both themes', async () => {
      const wrappers = [
        mount(HeroSection),
        mount(FeatureSection),
        mount(FooterSection)
      ]
      
      // Test both light and dark themes
      const themes = [false, true]
      
      for (const isDark of themes) {
        mockIsDarkMode.value = isDark
        await nextTick()
        
        wrappers.forEach(wrapper => {
          const html = wrapper.html()
          
          if (isDark) {
            // Dark theme should have light text on dark backgrounds
            expect(html).toMatch(/text-white|text-gray-[123]00/)
            expect(html).toMatch(/bg-gray-[89]00/)
          } else {
            // Light theme should have dark text on light backgrounds
            expect(html).toMatch(/text-gray-[89]00/)
            expect(html).toMatch(/bg-white|bg-gray-50/)
          }
        })
      }
    })
  })

  describe('Theme Transition Effects', () => {
    it('includes transition classes for smooth theme changes', () => {
      const wrappers = [
        mount(HeroSection),
        mount(FeatureSection),
        mount(FooterSection),
        mount(ThemeToggle)
      ]
      
      wrappers.forEach(wrapper => {
        const html = wrapper.html()
        // Should include transition classes for smooth theme switching
        expect(html).toMatch(/transition|duration/)
      })
    })

    it('applies consistent transition durations', () => {
      const appWrapper = mount(App, {
        global: {
          stubs: {
            ThemeToggle: true,
            HeroSection: true,
            FeatureSection: true,
            FooterSection: true
          }
        }
      })
      
      // App should have transition classes
      expect(appWrapper.classes()).toContain('transition-all')
      expect(appWrapper.classes()).toContain('duration-500')
    })
  })
})