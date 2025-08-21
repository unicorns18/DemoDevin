import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import App from '../../App.vue'

// Mock the composables
const mockThemeClasses = ref('bg-gray-900 text-white min-h-screen transition-all duration-500')
const mockObserveElement = vi.fn()

vi.mock('@/composables/useTheme', () => ({
  useTheme: () => ({
    themeClasses: mockThemeClasses
  })
}))

vi.mock('@/composables/useIntersection', () => ({
  useIntersection: () => ({
    observeElement: mockObserveElement
  })
}))

// Mock child components
vi.mock('@/components/ThemeToggle.vue', () => ({
  default: { name: 'ThemeToggle', template: '<div data-testid="theme-toggle">Theme Toggle</div>' }
}))

vi.mock('@/components/HeroSection.vue', () => ({
  default: { name: 'HeroSection', template: '<div data-testid="hero-section">Hero Section</div>' }
}))

vi.mock('@/components/FeatureSection.vue', () => ({
  default: { name: 'FeatureSection', template: '<div data-testid="feature-section">Feature Section</div>' }
}))

vi.mock('@/components/FooterSection.vue', () => ({
  default: { name: 'FooterSection', template: '<div data-testid="footer-section">Footer Section</div>' }
}))

// Mock setTimeout for intersection observer initialization
vi.useFakeTimers()

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockObserveElement.mockClear()
  })

  it('renders all main sections', () => {
    const wrapper = mount(App)
    
    expect(wrapper.find('[data-testid="theme-toggle"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="hero-section"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="feature-section"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="footer-section"]').exists()).toBe(true)
  })

  it('applies theme classes correctly', () => {
    const wrapper = mount(App)
    
    expect(wrapper.classes()).toContain('bg-gray-900')
    expect(wrapper.classes()).toContain('text-white')
    expect(wrapper.classes()).toContain('min-h-screen')
    expect(wrapper.classes()).toContain('transition-all')
    expect(wrapper.classes()).toContain('duration-500')
  })

  it('initializes intersection observer for scroll animations', async () => {
    // Clear previous calls
    mockObserveElement.mockClear()
    
    mount(App)
    
    // Fast-forward timers to trigger setTimeout
    vi.advanceTimersByTime(100)
    await nextTick()
    
    // Check that observeElement was called for all expected elements
    const expectedElements = [
      'features-header',
      'feature-premium-quality',
      'feature-unique-designs', 
      'feature-collector-value',
      'footer-company',
      'footer-products',
      'footer-support',
      'footer-newsletter',
      'footer-bottom'
    ]
    
    // Should be called at least once for each expected element
    expect(mockObserveElement).toHaveBeenCalled()
    
    expectedElements.forEach(elementId => {
      expect(mockObserveElement).toHaveBeenCalledWith(elementId)
    })
  })

  it('has proper component structure', () => {
    const wrapper = mount(App)
    
    // Check that components are rendered in correct order
    const sections = wrapper.findAll('[data-testid]')
    expect(sections[0].attributes('data-testid')).toBe('theme-toggle')
    expect(sections[1].attributes('data-testid')).toBe('hero-section')
    expect(sections[2].attributes('data-testid')).toBe('feature-section')
    expect(sections[3].attributes('data-testid')).toBe('footer-section')
  })

  it('applies global styles correctly', () => {
    const wrapper = mount(App)
    
    // Check that the wrapper div has the theme classes
    expect(wrapper.element.className).toContain('bg-gray-900')
    expect(wrapper.element.className).toContain('text-white')
  })
})