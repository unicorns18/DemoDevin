import { ref, onMounted, onUnmounted } from 'vue'
import type { IntersectionState } from '@/types'

export function useIntersection(): IntersectionState {
  // Track visibility state for elements by their ID
  const isVisible = ref<Record<string, boolean>>({})
  
  // Store the observer instance
  let observer: IntersectionObserver | null = null

  // Function to observe a specific element by ID
  const observeElement = (id: string) => {
    if (!observer) return
    
    const element = document.getElementById(id)
    if (element) {
      observer.observe(element)
    }
  }

  // Initialize intersection observer on mount
  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = entry.target.id
            if (elementId) {
              isVisible.value = { 
                ...isVisible.value, 
                [elementId]: true 
              }
            }
          }
        })
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully visible
      }
    )

    // Observe all elements with data-animate attribute
    const elements = document.querySelectorAll('[data-animate]')
    elements.forEach((el) => {
      if (el.id) {
        observer?.observe(el)
      }
    })
  })

  // Cleanup observer on unmount
  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })

  return {
    isVisible,
    observeElement
  }
}