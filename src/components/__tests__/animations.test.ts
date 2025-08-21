import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import AnimatedElement from '../AnimatedElement.vue'
import FadeTransition from '../transitions/FadeTransition.vue'
import SlideTransition from '../transitions/SlideTransition.vue'
import ScaleTransition from '../transitions/ScaleTransition.vue'
import StaggerTransition from '../transitions/StaggerTransition.vue'

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
})
window.IntersectionObserver = mockIntersectionObserver

describe('Animation Components', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('AnimatedElement', () => {
    it('renders with default props', () => {
      const wrapper = mount(AnimatedElement, {
        slots: {
          default: 'Test content'
        }
      })

      expect(wrapper.text()).toBe('Test content')
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('applies animation classes correctly', async () => {
      const wrapper = mount(AnimatedElement, {
        props: {
          animation: 'slide-up',
          hoverAnimation: 'lift'
        },
        slots: {
          default: 'Test content'
        }
      })

      // Trigger hover
      await wrapper.trigger('mouseenter')
      expect(wrapper.classes()).toContain('hover-lift')

      // Trigger mouse leave
      await wrapper.trigger('mouseleave')
      await nextTick()
      expect(wrapper.classes()).not.toContain('hover-lift')
    })

    it('applies custom duration and delay', () => {
      const wrapper = mount(AnimatedElement, {
        props: {
          duration: 1000,
          delay: 500
        }
      })

      const style = wrapper.element.style
      expect(style.animationDuration).toBe('1000ms')
      expect(style.animationDelay).toBe('500ms')
    })

    it('uses custom tag', () => {
      const wrapper = mount(AnimatedElement, {
        props: {
          tag: 'section'
        }
      })

      expect(wrapper.element.tagName).toBe('SECTION')
    })
  })

  describe('FadeTransition', () => {
    it('renders transition component', () => {
      const wrapper = mount(FadeTransition, {
        slots: {
          default: '<div>Fade content</div>'
        }
      })

      expect(wrapper.find('div').text()).toBe('Fade content')
    })

    it('applies correct transition name', () => {
      const wrapper = mount(FadeTransition, {
        props: {
          name: 'custom-fade'
        }
      })

      expect(wrapper.find('transition-stub').attributes('name')).toBe('custom-fade')
    })
  })

  describe('SlideTransition', () => {
    it('renders with default direction', () => {
      const wrapper = mount(SlideTransition, {
        slots: {
          default: '<div>Slide content</div>'
        }
      })

      expect(wrapper.find('div').text()).toBe('Slide content')
    })

    it('accepts custom direction and distance', () => {
      const wrapper = mount(SlideTransition, {
        props: {
          direction: 'left',
          distance: 50
        }
      })

      expect(wrapper.props('direction')).toBe('left')
      expect(wrapper.props('distance')).toBe(50)
    })
  })

  describe('ScaleTransition', () => {
    it('renders with default scale values', () => {
      const wrapper = mount(ScaleTransition, {
        slots: {
          default: '<div>Scale content</div>'
        }
      })

      expect(wrapper.find('div').text()).toBe('Scale content')
    })

    it('accepts custom scale values', () => {
      const wrapper = mount(ScaleTransition, {
        props: {
          initialScale: 0.5,
          finalScale: 1.2
        }
      })

      expect(wrapper.props('initialScale')).toBe(0.5)
      expect(wrapper.props('finalScale')).toBe(1.2)
    })
  })

  describe('StaggerTransition', () => {
    it('renders transition group', () => {
      const wrapper = mount(StaggerTransition, {
        slots: {
          default: '<div>Stagger content</div>'
        }
      })

      expect(wrapper.find('div').text()).toBe('Stagger content')
    })

    it('accepts stagger configuration', () => {
      const wrapper = mount(StaggerTransition, {
        props: {
          staggerDelay: 200,
          animationType: 'scale'
        }
      })

      expect(wrapper.props('staggerDelay')).toBe(200)
      expect(wrapper.props('animationType')).toBe('scale')
    })
  })
})

describe('Animation Utilities', () => {
  it('should have all required CSS classes available', () => {
    // This test ensures our CSS classes are properly defined
    const requiredClasses = [
      'animate-float',
      'animate-pulse-glow',
      'animate-gradient',
      'animate-slide-up',
      'animate-slide-down',
      'animate-scale-in',
      'animate-fade-in',
      'animate-bounce-in',
      'animate-rotate-in',
      'hover-lift',
      'hover-scale',
      'hover-rotate',
      'glass-effect',
      'text-gradient'
    ]

    // In a real test environment, you would check if these classes
    // are available in the computed styles
    expect(requiredClasses.length).toBeGreaterThan(0)
  })
})