import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import FeatureSection from '../FeatureSection.vue'
import { Shield, Zap, Heart, Check, ArrowRight } from 'lucide-vue-next'

// Mock the composables
const mockIsDarkMode = ref(false)
const mockIsVisible = ref({})

vi.mock('@/composables/useTheme', () => ({
  useTheme: () => ({
    isDarkMode: mockIsDarkMode
  })
}))

vi.mock('@/composables/useIntersection', () => ({
  useIntersection: () => ({
    isVisible: mockIsVisible
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

describe('FeatureSection', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockIsDarkMode.value = false
    mockIsVisible.value = {}
  })

  it('renders section header correctly', () => {
    const wrapper = mount(FeatureSection)
    
    expect(wrapper.text()).toContain('Why Choose Our')
    expect(wrapper.text()).toContain('Premium Collection')
    expect(wrapper.text()).toContain('Discover the exceptional features')
  })

  it('renders all three features', () => {
    const wrapper = mount(FeatureSection)
    
    expect(wrapper.text()).toContain('Premium Quality')
    expect(wrapper.text()).toContain('Unique Designs')
    expect(wrapper.text()).toContain('Collector Value')
  })

  it('renders feature icons correctly', () => {
    const wrapper = mount(FeatureSection)
    
    expect(wrapper.findComponent(Shield).exists()).toBe(true)
    expect(wrapper.findComponent(Zap).exists()).toBe(true)
    expect(wrapper.findComponent(Heart).exists()).toBe(true)
  })

  it('renders feature images', () => {
    const wrapper = mount(FeatureSection)
    
    const images = wrapper.findAll('img')
    expect(images).toHaveLength(3)
    
    images.forEach(image => {
      expect(image.attributes('src')).toContain('unsplash.com')
      expect(image.attributes('alt')).toBeTruthy()
    })
  })

  it('renders feature benefits with check icons', () => {
    const wrapper = mount(FeatureSection)
    
    const checkIcons = wrapper.findAllComponents(Check)
    expect(checkIcons.length).toBeGreaterThan(0)
    
    // Check for specific benefits
    expect(wrapper.text()).toContain('Hand-selected premium materials')
    expect(wrapper.text()).toContain('Exclusive limited edition designs')
    expect(wrapper.text()).toContain('Certificate of authenticity included')
  })

  it('renders feature statistics', () => {
    const wrapper = mount(FeatureSection)
    
    expect(wrapper.text()).toContain('99.9%')
    expect(wrapper.text()).toContain('Quality Score')
    expect(wrapper.text()).toContain('200+')
    expect(wrapper.text()).toContain('Designs')
    expect(wrapper.text()).toContain('15%')
    expect(wrapper.text()).toContain('Avg. Annual Growth')
  })

  it('renders Learn More buttons', () => {
    const wrapper = mount(FeatureSection)
    
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(3)
    
    buttons.forEach(button => {
      expect(button.text()).toContain('Learn More')
    })
    
    const arrowIcons = wrapper.findAllComponents(ArrowRight)
    expect(arrowIcons).toHaveLength(3)
  })

  it('handles Learn More button clicks', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const wrapper = mount(FeatureSection)
    
    const buttons = wrapper.findAll('button')
    
    // Test first button click
    await buttons[0].trigger('click')
    expect(consoleSpy).toHaveBeenCalledWith('Learn more about feature: premium-quality')
    
    // Test second button click
    await buttons[1].trigger('click')
    expect(consoleSpy).toHaveBeenCalledWith('Learn more about feature: unique-designs')
    
    // Test third button click
    await buttons[2].trigger('click')
    expect(consoleSpy).toHaveBeenCalledWith('Learn more about feature: collector-value')
    
    consoleSpy.mockRestore()
  })

  it('applies light theme classes correctly', () => {
    mockIsDarkMode.value = false
    const wrapper = mount(FeatureSection)
    
    const section = wrapper.find('section')
    expect(section.classes()).toContain('bg-gradient-to-br')
  })

  it('applies dark theme classes correctly', () => {
    mockIsDarkMode.value = true
    const wrapper = mount(FeatureSection)
    
    const section = wrapper.find('section')
    expect(section.classes()).toContain('bg-gradient-to-br')
  })

  it('shows elements when visible', async () => {
    // Set elements as visible
    mockIsVisible.value = {
      'features-header': true,
      'feature-premium-quality': true,
      'feature-unique-designs': true,
      'feature-collector-value': true
    }
    
    const wrapper = mount(FeatureSection)
    
    // Check that elements have opacity 1 when visible
    const header = wrapper.find('#features-header')
    expect(header.attributes('style')).toContain('opacity: 1')
    
    const features = wrapper.findAll('[id^="feature-"]')
    features.forEach(feature => {
      expect(feature.attributes('style')).toContain('opacity: 1')
    })
  })

  it('hides elements when not visible', async () => {
    // Set elements as not visible
    mockIsVisible.value = {}
    
    const wrapper = mount(FeatureSection)
    
    // Check that elements have opacity 0 when not visible
    const header = wrapper.find('#features-header')
    expect(header.attributes('style')).toContain('opacity: 0')
    
    const features = wrapper.findAll('[id^="feature-"]')
    features.forEach(feature => {
      expect(feature.attributes('style')).toContain('opacity: 0')
    })
  })

  it('has proper Z-pattern layout', () => {
    const wrapper = mount(FeatureSection)
    
    // Check for grid layout classes
    expect(wrapper.find('.grid').exists()).toBe(true)
    expect(wrapper.find('.lg\\:grid-cols-2').exists()).toBe(true)
    expect(wrapper.find('.lg\\:grid-flow-col-dense').exists()).toBe(true)
  })

  it('has proper animation classes', () => {
    const wrapper = mount(FeatureSection)
    
    expect(wrapper.find('.animate-float').exists()).toBe(true)
    expect(wrapper.find('.hover-lift').exists()).toBe(true)
    expect(wrapper.find('.glass-effect').exists()).toBe(true)
  })

  it('has data-animate attributes for intersection observer', () => {
    const wrapper = mount(FeatureSection)
    
    const animatedElements = wrapper.findAll('[data-animate]')
    expect(animatedElements.length).toBeGreaterThan(0)
    
    // Check specific elements have data-animate
    expect(wrapper.find('#features-header').attributes('data-animate')).toBeDefined()
    expect(wrapper.find('#feature-premium-quality').attributes('data-animate')).toBeDefined()
  })

  it('renders floating background elements', () => {
    const wrapper = mount(FeatureSection)
    
    const floatingElements = wrapper.findAll('.animate-float')
    expect(floatingElements.length).toBeGreaterThanOrEqual(2)
  })

  it('has proper responsive design', () => {
    const wrapper = mount(FeatureSection)
    
    // Check for responsive classes
    expect(wrapper.find('.max-w-7xl').exists()).toBe(true)
    expect(wrapper.find('.mx-auto').exists()).toBe(true)
    expect(wrapper.find('.px-6').exists()).toBe(true)
  })
})