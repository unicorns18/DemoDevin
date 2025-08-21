import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import App from '../../App.vue'
import HeroSection from '../HeroSection.vue'
import FeatureSection from '../FeatureSection.vue'
import FooterSection from '../FooterSection.vue'

// Mock composables
const mockIsDarkMode = ref(false)
const mockIsVisible = ref({})
const mockThemeClasses = ref('bg-gray-900 text-white min-h-screen transition-all duration-500')
const mockObserveElement = vi.fn()

vi.mock('@/composables/useTheme', () => ({
  useTheme: () => ({
    isDarkMode: mockIsDarkMode,
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
    template: '<button :class="$props.class"><slot /></button>'
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

// Mock child components for App test
vi.mock('@/components/ThemeToggle.vue', () => ({
  default: { name: 'ThemeToggle', template: '<div>Theme Toggle</div>' }
}))

describe('Responsive Design Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockIsDarkMode.value = false
    mockIsVisible.value = {}
  })

  describe('App Component Responsive Layout', () => {
    it('has proper responsive container structure', () => {
      const wrapper = mount(App)
      
      // Check that main container has proper responsive classes
      expect(wrapper.classes()).toContain('min-h-screen')
      expect(wrapper.classes()).toContain('transition-all')
    })
  })

  describe('HeroSection Responsive Layout', () => {
    it('has responsive grid layout', () => {
      const wrapper = mount(HeroSection)
      
      // Check for responsive grid classes
      expect(wrapper.find('.grid').exists()).toBe(true)
      expect(wrapper.find('.lg\\:grid-cols-2').exists()).toBe(true)
      expect(wrapper.find('.gap-12').exists()).toBe(true)
    })

    it('has responsive text sizing', () => {
      const wrapper = mount(HeroSection)
      
      // Check for responsive text classes
      expect(wrapper.find('.text-5xl').exists()).toBe(true)
      expect(wrapper.find('.lg\\:text-6xl').exists()).toBe(true)
      expect(wrapper.find('.text-xl').exists()).toBe(true)
    })

    it('has responsive button layout', () => {
      const wrapper = mount(HeroSection)
      
      // Check for responsive flex layout
      expect(wrapper.find('.flex-col').exists()).toBe(true)
      expect(wrapper.find('.sm\\:flex-row').exists()).toBe(true)
    })

    it('has responsive padding and margins', () => {
      const wrapper = mount(HeroSection)
      
      // Check for responsive spacing
      expect(wrapper.find('.py-20').exists()).toBe(true)
      expect(wrapper.find('.px-6').exists()).toBe(true)
      expect(wrapper.find('.max-w-6xl').exists()).toBe(true)
      expect(wrapper.find('.mx-auto').exists()).toBe(true)
    })

    it('has responsive image sizing', () => {
      const wrapper = mount(HeroSection)
      
      const image = wrapper.find('img')
      expect(image.classes()).toContain('w-full')
      expect(image.classes()).toContain('h-96')
    })
  })

  describe('FeatureSection Responsive Layout', () => {
    it('has responsive grid layout', () => {
      const wrapper = mount(FeatureSection)
      
      // Check for responsive grid classes
      expect(wrapper.find('.grid').exists()).toBe(true)
      expect(wrapper.find('.lg\\:grid-cols-2').exists()).toBe(true)
      expect(wrapper.find('.max-w-7xl').exists()).toBe(true)
    })

    it('has responsive text sizing', () => {
      const wrapper = mount(FeatureSection)
      
      // Check for responsive text classes
      expect(wrapper.find('.text-4xl').exists()).toBe(true)
      expect(wrapper.find('.lg\\:text-5xl').exists()).toBe(true)
    })

    it('has responsive spacing', () => {
      const wrapper = mount(FeatureSection)
      
      // Check for responsive spacing
      expect(wrapper.find('.py-20').exists()).toBe(true)
      expect(wrapper.find('.px-6').exists()).toBe(true)
      expect(wrapper.find('.mb-20').exists()).toBe(true)
    })

    it('has Z-pattern responsive layout', () => {
      const wrapper = mount(FeatureSection)
      
      // Check for Z-pattern layout classes
      expect(wrapper.find('.lg\\:grid-flow-col-dense').exists()).toBe(true)
      expect(wrapper.find('.lg\\:col-start-2').exists()).toBe(true)
      expect(wrapper.find('.lg\\:col-start-1').exists()).toBe(true)
    })

    it('has responsive image sizing', () => {
      const wrapper = mount(FeatureSection)
      
      const images = wrapper.findAll('img')
      images.forEach(image => {
        expect(image.classes()).toContain('w-full')
        expect(image.classes()).toContain('h-96')
      })
    })
  })

  describe('FooterSection Responsive Layout', () => {
    it('has responsive grid layout', () => {
      const wrapper = mount(FooterSection)
      
      // Check for responsive grid classes
      expect(wrapper.find('.grid-cols-1').exists()).toBe(true)
      expect(wrapper.find('.md\\:grid-cols-2').exists()).toBe(true)
      expect(wrapper.find('.lg\\:grid-cols-4').exists()).toBe(true)
    })

    it('has responsive bottom bar layout', () => {
      const wrapper = mount(FooterSection)
      
      // Check for responsive flex layout in bottom bar
      expect(wrapper.find('.flex-col').exists()).toBe(true)
      expect(wrapper.find('.md\\:flex-row').exists()).toBe(true)
    })

    it('has responsive spacing', () => {
      const wrapper = mount(FooterSection)
      
      // Check for responsive spacing
      expect(wrapper.find('.py-20').exists()).toBe(true)
      expect(wrapper.find('.px-6').exists()).toBe(true)
      expect(wrapper.find('.max-w-7xl').exists()).toBe(true)
    })

    it('has responsive newsletter input', () => {
      const wrapper = mount(FooterSection)
      
      const input = wrapper.find('input')
      expect(input.classes()).toContain('w-full')
      
      const button = wrapper.find('button')
      expect(button.classes()).toContain('w-full')
    })
  })

  describe('Breakpoint Behavior', () => {
    it('uses consistent breakpoint classes across components', () => {
      const heroWrapper = mount(HeroSection)
      const featureWrapper = mount(FeatureSection)
      const footerWrapper = mount(FooterSection)
      
      // Check that all components use consistent Tailwind breakpoints
      const breakpointClasses = [
        'sm:', 'md:', 'lg:', 'xl:'
      ]
      
      const allWrappers = [heroWrapper, featureWrapper, footerWrapper]
      
      allWrappers.forEach(wrapper => {
        const html = wrapper.html()
        breakpointClasses.forEach(breakpoint => {
          if (html.includes(breakpoint)) {
            // If breakpoint is used, ensure it follows Tailwind conventions
            expect(html).toMatch(new RegExp(`${breakpoint}[a-z-]+`))
          }
        })
      })
    })

    it('has proper mobile-first responsive design', () => {
      const wrappers = [
        mount(HeroSection),
        mount(FeatureSection),
        mount(FooterSection)
      ]
      
      wrappers.forEach(wrapper => {
        // Check that base classes are mobile-first
        expect(wrapper.find('.px-6').exists()).toBe(true) // Mobile padding
        expect(wrapper.find('.py-20').exists()).toBe(true) // Mobile padding
        
        // Check that larger breakpoints override mobile
        const html = wrapper.html()
        if (html.includes('lg:')) {
          expect(html).toMatch(/lg:[a-z-]+/)
        }
      })
    })
  })

  describe('Container and Spacing Consistency', () => {
    it('uses consistent max-width containers', () => {
      const heroWrapper = mount(HeroSection)
      const featureWrapper = mount(FeatureSection)
      const footerWrapper = mount(FooterSection)
      
      // Check for consistent container classes
      expect(heroWrapper.find('.max-w-6xl').exists()).toBe(true)
      expect(featureWrapper.find('.max-w-7xl').exists()).toBe(true)
      expect(footerWrapper.find('.max-w-7xl').exists()).toBe(true)
      
      // All should have mx-auto for centering
      expect(heroWrapper.find('.mx-auto').exists()).toBe(true)
      expect(featureWrapper.find('.mx-auto').exists()).toBe(true)
      expect(footerWrapper.find('.mx-auto').exists()).toBe(true)
    })

    it('uses consistent section padding', () => {
      const wrappers = [
        mount(HeroSection),
        mount(FeatureSection),
        mount(FooterSection)
      ]
      
      wrappers.forEach(wrapper => {
        // Check for consistent vertical padding
        expect(wrapper.find('.py-20').exists()).toBe(true)
        // Check for consistent horizontal padding
        expect(wrapper.find('.px-6').exists()).toBe(true)
      })
    })
  })

  describe('Image Responsive Behavior', () => {
    it('has responsive images with proper aspect ratios', () => {
      const heroWrapper = mount(HeroSection)
      const featureWrapper = mount(FeatureSection)
      
      const allImages = [
        ...heroWrapper.findAll('img'),
        ...featureWrapper.findAll('img')
      ]
      
      allImages.forEach(image => {
        expect(image.classes()).toContain('w-full')
        expect(image.classes()).toContain('object-cover')
        // Should have defined height
        expect(image.classes().some(cls => cls.includes('h-'))).toBe(true)
      })
    })
  })
})