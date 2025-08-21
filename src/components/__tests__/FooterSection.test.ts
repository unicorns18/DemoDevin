import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import FooterSection from '../FooterSection.vue'
import { Heart, Github, Twitter, Instagram, Mail } from 'lucide-vue-next'

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

// Mock Button component
vi.mock('@/components/ui/button', () => ({
  Button: {
    name: 'Button',
    props: ['variant', 'size', 'class'],
    template: '<button :class="$props.class" @click="$emit(\'click\')"><slot /></button>'
  }
}))

describe('FooterSection', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockIsDarkMode.value = false
    mockIsVisible.value = {}
  })

  it('renders company information correctly', () => {
    const wrapper = mount(FooterSection)
    
    expect(wrapper.text()).toContain('DuckCo')
    expect(wrapper.text()).toContain('Premium rubber duck collection')
    expect(wrapper.text()).toContain('Quality craftsmanship since 2020')
    expect(wrapper.findComponent(Heart).exists()).toBe(true)
  })

  it('renders social media links', () => {
    const wrapper = mount(FooterSection)
    
    expect(wrapper.findComponent(Github).exists()).toBe(true)
    expect(wrapper.findComponent(Twitter).exists()).toBe(true)
    expect(wrapper.findComponent(Instagram).exists()).toBe(true)
    expect(wrapper.findComponent(Mail).exists()).toBe(true)
    
    const socialLinks = wrapper.findAll('a[aria-label]')
    expect(socialLinks).toHaveLength(4)
  })

  it('renders product links section', () => {
    const wrapper = mount(FooterSection)
    
    expect(wrapper.text()).toContain('Products')
    expect(wrapper.text()).toContain('Classic Collection')
    expect(wrapper.text()).toContain('Premium Series')
    expect(wrapper.text()).toContain('Limited Edition')
    expect(wrapper.text()).toContain('Custom Designs')
    expect(wrapper.text()).toContain('Gift Sets')
  })

  it('renders support links section', () => {
    const wrapper = mount(FooterSection)
    
    expect(wrapper.text()).toContain('Support')
    expect(wrapper.text()).toContain('Help Center')
    expect(wrapper.text()).toContain('Contact Us')
    expect(wrapper.text()).toContain('Shipping Info')
    expect(wrapper.text()).toContain('Returns')
    expect(wrapper.text()).toContain('Size Guide')
  })

  it('renders newsletter subscription section', () => {
    const wrapper = mount(FooterSection)
    
    expect(wrapper.text()).toContain('Stay Updated')
    expect(wrapper.text()).toContain('Get the latest updates')
    
    const emailInput = wrapper.find('input[type="email"]')
    expect(emailInput.exists()).toBe(true)
    expect(emailInput.attributes('placeholder')).toBe('Enter your email')
    
    const subscribeButton = wrapper.find('button')
    expect(subscribeButton.text()).toContain('Subscribe')
  })

  it('renders bottom bar with copyright and legal links', () => {
    const wrapper = mount(FooterSection)
    
    expect(wrapper.text()).toContain('© 2024 DuckCo. All rights reserved.')
    expect(wrapper.text()).toContain('Privacy Policy')
    expect(wrapper.text()).toContain('Terms of Service')
    expect(wrapper.text()).toContain('Cookie Policy')
  })

  it('handles newsletter subscription', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const wrapper = mount(FooterSection)
    
    const emailInput = wrapper.find('input[type="email"]')
    const subscribeButton = wrapper.find('button')
    
    // Set email value
    await emailInput.setValue('test@example.com')
    
    // Click subscribe button
    await subscribeButton.trigger('click')
    
    expect(consoleSpy).toHaveBeenCalledWith('Subscribing email:', 'test@example.com')
    
    // Check that email input is cleared
    expect(emailInput.element.value).toBe('')
    
    consoleSpy.mockRestore()
  })

  it('does not subscribe with empty email', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const wrapper = mount(FooterSection)
    
    const subscribeButton = wrapper.find('button')
    
    // Click subscribe button without email
    await subscribeButton.trigger('click')
    
    expect(consoleSpy).not.toHaveBeenCalled()
    
    consoleSpy.mockRestore()
  })

  it('applies light theme classes correctly', () => {
    mockIsDarkMode.value = false
    const wrapper = mount(FooterSection)
    
    const footer = wrapper.find('footer')
    expect(footer.classes()).toContain('bg-gray-50')
    expect(footer.classes()).toContain('text-gray-900')
  })

  it('applies dark theme classes correctly', () => {
    mockIsDarkMode.value = true
    const wrapper = mount(FooterSection)
    
    const footer = wrapper.find('footer')
    expect(footer.classes()).toContain('bg-gray-900')
    expect(footer.classes()).toContain('text-gray-100')
  })

  it('shows elements when visible', async () => {
    // Set elements as visible
    mockIsVisible.value = {
      'footer-company': true,
      'footer-products': true,
      'footer-support': true,
      'footer-newsletter': true,
      'footer-bottom': true
    }
    
    const wrapper = mount(FooterSection)
    
    // Check that elements have opacity 1 when visible
    const sections = [
      '#footer-company',
      '#footer-products', 
      '#footer-support',
      '#footer-newsletter',
      '#footer-bottom'
    ]
    
    sections.forEach(selector => {
      const element = wrapper.find(selector)
      expect(element.attributes('style')).toContain('opacity: 1')
    })
  })

  it('hides elements when not visible', async () => {
    // Set elements as not visible
    mockIsVisible.value = {}
    
    const wrapper = mount(FooterSection)
    
    // Check that elements have opacity 0 when not visible
    const sections = [
      '#footer-company',
      '#footer-products', 
      '#footer-support',
      '#footer-newsletter',
      '#footer-bottom'
    ]
    
    sections.forEach(selector => {
      const element = wrapper.find(selector)
      expect(element.attributes('style')).toContain('opacity: 0')
    })
  })

  it('has proper responsive grid layout', () => {
    const wrapper = mount(FooterSection)
    
    expect(wrapper.find('.grid').exists()).toBe(true)
    expect(wrapper.find('.md\\:grid-cols-2').exists()).toBe(true)
    expect(wrapper.find('.lg\\:grid-cols-4').exists()).toBe(true)
  })

  it('has proper animation classes', () => {
    const wrapper = mount(FooterSection)
    
    expect(wrapper.find('.animate-float').exists()).toBe(true)
    expect(wrapper.find('.hover-lift').exists()).toBe(true)
  })

  it('has data-animate attributes for intersection observer', () => {
    const wrapper = mount(FooterSection)
    
    const animatedElements = wrapper.findAll('[data-animate]')
    expect(animatedElements).toHaveLength(5)
    
    // Check specific elements have data-animate
    expect(wrapper.find('#footer-company').attributes('data-animate')).toBeDefined()
    expect(wrapper.find('#footer-products').attributes('data-animate')).toBeDefined()
    expect(wrapper.find('#footer-support').attributes('data-animate')).toBeDefined()
    expect(wrapper.find('#footer-newsletter').attributes('data-animate')).toBeDefined()
    expect(wrapper.find('#footer-bottom').attributes('data-animate')).toBeDefined()
  })

  it('renders floating background elements', () => {
    const wrapper = mount(FooterSection)
    
    const floatingElements = wrapper.findAll('.animate-float')
    expect(floatingElements.length).toBeGreaterThanOrEqual(2)
  })

  it('has proper accessibility attributes', () => {
    const wrapper = mount(FooterSection)
    
    // Check social links have aria-labels
    const socialLinks = wrapper.findAll('a[aria-label]')
    socialLinks.forEach(link => {
      expect(link.attributes('aria-label')).toBeTruthy()
    })
    
    // Check email input has proper attributes
    const emailInput = wrapper.find('input[type="email"]')
    expect(emailInput.attributes('placeholder')).toBeTruthy()
  })

  it('has proper link hover effects', () => {
    const wrapper = mount(FooterSection)
    
    // Check for hover transition classes
    const links = wrapper.findAll('a')
    links.forEach(link => {
      expect(link.classes()).toContain('transition-all')
    })
  })
})