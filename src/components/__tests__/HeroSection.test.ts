import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import HeroSection from '../HeroSection.vue'
import { Star, Heart } from 'lucide-vue-next'

// Mock the useTheme composable
const mockIsDarkMode = ref(false)

vi.mock('@/composables/useTheme', () => ({
  useTheme: () => ({
    isDarkMode: mockIsDarkMode
  })
}))

// Mock Button component
vi.mock('@/components/ui/button', () => ({
  Button: {
    name: 'Button',
    props: ['variant', 'size', 'class'],
    template: '<button :class="$props.class" @click="$emit(\'click\')"><slot /></button>'
  }
}))

describe('HeroSection', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockIsDarkMode.value = false
  })

  it('renders hero content correctly', () => {
    const wrapper = mount(HeroSection)
    
    expect(wrapper.text()).toContain('Premium Rubber')
    expect(wrapper.text()).toContain('Duck Collection')
    expect(wrapper.text()).toContain('Lorem ipsum dolor sit amet')
    expect(wrapper.text()).toContain('Trusted by 10,000+ customers')
  })

  it('renders action buttons', () => {
    const wrapper = mount(HeroSection)
    
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0].text()).toContain('Shop Now')
    expect(buttons[1].text()).toContain('Learn More')
  })

  it('renders star rating', () => {
    const wrapper = mount(HeroSection)
    
    const stars = wrapper.findAllComponents(Star)
    expect(stars).toHaveLength(5)
  })

  it('renders hero image', () => {
    const wrapper = mount(HeroSection)
    
    const image = wrapper.find('img')
    expect(image.exists()).toBe(true)
    expect(image.attributes('alt')).toBe('Premium rubber duck collection')
    expect(image.attributes('src')).toContain('unsplash.com')
  })

  it('renders premium quality card', () => {
    const wrapper = mount(HeroSection)
    
    expect(wrapper.text()).toContain('Premium Quality')
    expect(wrapper.text()).toContain('Handcrafted Excellence')
    expect(wrapper.findComponent(Heart).exists()).toBe(true)
  })

  it('handles button clicks', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const wrapper = mount(HeroSection)
    
    const buttons = wrapper.findAll('button')
    
    // Test Shop Now button
    await buttons[0].trigger('click')
    expect(consoleSpy).toHaveBeenCalledWith('Shop Now clicked')
    
    // Test Learn More button
    await buttons[1].trigger('click')
    expect(consoleSpy).toHaveBeenCalledWith('Learn More clicked')
    
    consoleSpy.mockRestore()
  })

  it('applies light theme classes correctly', () => {
    mockIsDarkMode.value = false
    const wrapper = mount(HeroSection)
    
    // Check section background
    expect(wrapper.find('section').classes()).toContain('bg-gradient-to-br')
    
    // Check title classes
    const title = wrapper.find('h1')
    expect(title.classes()).toContain('text-gray-900')
  })

  it('applies dark theme classes correctly', async () => {
    mockIsDarkMode.value = true
    const wrapper = mount(HeroSection)
    
    // Check section background
    expect(wrapper.find('section').classes()).toContain('bg-gradient-to-br')
    
    // Check title classes
    const title = wrapper.find('h1')
    expect(title.classes()).toContain('text-white')
  })

  it('has proper animation classes', () => {
    const wrapper = mount(HeroSection)
    
    // Check for animation classes
    expect(wrapper.find('.animate-slide-up').exists()).toBe(true)
    expect(wrapper.find('.animate-scale-in').exists()).toBe(true)
    expect(wrapper.find('.animate-float').exists()).toBe(true)
  })

  it('has proper hover effects', () => {
    const wrapper = mount(HeroSection)
    
    // Check for hover classes
    expect(wrapper.find('.hover-lift').exists()).toBe(true)
    expect(wrapper.find('.glass-effect').exists()).toBe(true)
  })

  it('renders floating background elements', () => {
    const wrapper = mount(HeroSection)
    
    const floatingElements = wrapper.findAll('.animate-float')
    expect(floatingElements.length).toBeGreaterThanOrEqual(3)
  })

  it('has proper accessibility attributes', () => {
    const wrapper = mount(HeroSection)
    
    const image = wrapper.find('img')
    expect(image.attributes('alt')).toBeTruthy()
    
    const buttons = wrapper.findAll('button')
    buttons.forEach(button => {
      expect(button.element.textContent).toBeTruthy()
    })
  })

  it('renders gradient text effect', () => {
    const wrapper = mount(HeroSection)
    
    expect(wrapper.find('.text-gradient').exists()).toBe(true)
  })

  it('has responsive grid layout', () => {
    const wrapper = mount(HeroSection)
    
    expect(wrapper.find('.grid').exists()).toBe(true)
    expect(wrapper.find('.lg\\:grid-cols-2').exists()).toBe(true)
  })
})