import { ref, onMounted, onUnmounted } from 'vue'

export interface AnimationConfig {
  duration?: number
  delay?: number
  easing?: string
  threshold?: number
}

export interface AnimationState {
  isVisible: (id: string) => boolean
  registerElement: (id: string, config?: AnimationConfig) => void
  unregisterElement: (id: string) => void
  triggerAnimation: (id: string, animationType?: string) => void
}

export function useAnimations(): AnimationState {
  const visibleElements = ref<Record<string, boolean>>({})
  const animationConfigs = ref<Record<string, AnimationConfig>>({})
  const observers = ref<Record<string, IntersectionObserver>>({})

  const defaultConfig: AnimationConfig = {
    duration: 600,
    delay: 0,
    easing: 'ease-out',
    threshold: 0.1
  }

  const isVisible = (id: string): boolean => {
    return visibleElements.value[id] || false
  }

  const registerElement = (id: string, config: AnimationConfig = {}) => {
    const finalConfig = { ...defaultConfig, ...config }
    animationConfigs.value[id] = finalConfig

    // Create intersection observer for this element
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleElements.value[id] = true
            // Apply animation delay if specified
            if (finalConfig.delay && finalConfig.delay > 0) {
              setTimeout(() => {
                triggerAnimation(id)
              }, finalConfig.delay)
            } else {
              triggerAnimation(id)
            }
          }
        })
      },
      {
        threshold: finalConfig.threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    observers.value[id] = observer

    // Observe the element if it exists
    const element = document.getElementById(id)
    if (element) {
      observer.observe(element)
    } else {
      // Retry after a short delay if element doesn't exist yet
      setTimeout(() => {
        const retryElement = document.getElementById(id)
        if (retryElement) {
          observer.observe(retryElement)
        }
      }, 100)
    }
  }

  const unregisterElement = (id: string) => {
    const observer = observers.value[id]
    if (observer) {
      observer.disconnect()
      delete observers.value[id]
    }
    delete visibleElements.value[id]
    delete animationConfigs.value[id]
  }

  const triggerAnimation = (id: string, animationType = 'slide-up') => {
    const element = document.getElementById(id)
    if (element) {
      // Remove any existing animation classes
      element.classList.remove(
        'animate-slide-up',
        'animate-slide-down',
        'animate-scale-in',
        'animate-fade-in',
        'animate-bounce-in',
        'animate-rotate-in'
      )
      
      // Add the new animation class
      element.classList.add(`animate-${animationType}`)
      
      // Set custom animation properties if configured
      const config = animationConfigs.value[id]
      if (config) {
        element.style.animationDuration = `${config.duration}ms`
        element.style.animationTimingFunction = config.easing || 'ease-out'
      }
    }
  }

  // Cleanup on unmount
  onUnmounted(() => {
    Object.keys(observers.value).forEach(id => {
      unregisterElement(id)
    })
  })

  return {
    isVisible,
    registerElement,
    unregisterElement,
    triggerAnimation
  }
}

// Predefined animation configurations
export const animationPresets = {
  slideUp: { duration: 800, easing: 'ease-out' },
  slideDown: { duration: 800, easing: 'ease-out' },
  scaleIn: { duration: 600, easing: 'ease-out' },
  fadeIn: { duration: 600, easing: 'ease-out' },
  bounceIn: { duration: 800, easing: 'ease-out' },
  rotateIn: { duration: 600, easing: 'ease-out' },
  staggered: { duration: 600, delay: 100, easing: 'ease-out' }
}