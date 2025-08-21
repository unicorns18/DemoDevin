<template>
  <component
    :is="tag"
    :id="elementId"
    :class="[
      animationClasses,
      { 'animate-on-scroll': triggerOnScroll }
    ]"
    :style="animationStyles"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useAnimations } from '@/composables/useAnimations'

interface Props {
  tag?: string
  elementId?: string
  animation?: 'slide-up' | 'slide-down' | 'fade-in' | 'scale-in' | 'bounce-in' | 'rotate-in'
  duration?: number
  delay?: number
  triggerOnScroll?: boolean
  hoverAnimation?: 'lift' | 'scale' | 'rotate' | 'glow' | 'pulse'
  stagger?: boolean
  staggerDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'div',
  animation: 'fade-in',
  duration: 600,
  delay: 0,
  triggerOnScroll: true,
  stagger: false,
  staggerDelay: 100
})

const { registerElement, unregisterElement, isVisible } = useAnimations()
const isHovered = ref(false)

// Generate unique ID if not provided
const elementId = computed(() => 
  props.elementId || `animated-element-${Math.random().toString(36).substr(2, 9)}`
)

// Animation classes
const animationClasses = computed(() => {
  const classes = []
  
  if (props.triggerOnScroll && isVisible(elementId.value)) {
    classes.push(`animate-${props.animation}`)
  }
  
  if (props.hoverAnimation && isHovered.value) {
    switch (props.hoverAnimation) {
      case 'lift':
        classes.push('hover-lift')
        break
      case 'scale':
        classes.push('hover-scale')
        break
      case 'rotate':
        classes.push('hover-rotate')
        break
      case 'glow':
        classes.push('animate-pulse-glow')
        break
      case 'pulse':
        classes.push('animate-pulse')
        break
    }
  }
  
  return classes
})

// Animation styles
const animationStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.duration) {
    styles.animationDuration = `${props.duration}ms`
  }
  
  if (props.delay) {
    styles.animationDelay = `${props.delay}ms`
  }
  
  return styles
})

// Event handlers
const onMouseEnter = () => {
  isHovered.value = true
}

const onMouseLeave = () => {
  isHovered.value = false
}

// Lifecycle
onMounted(() => {
  if (props.triggerOnScroll) {
    registerElement(elementId.value, {
      duration: props.duration,
      delay: props.delay
    })
  }
})

onUnmounted(() => {
  if (props.triggerOnScroll) {
    unregisterElement(elementId.value)
  }
})
</script>

<style scoped>
.animate-on-scroll {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.animate-on-scroll.animate-fade-in,
.animate-on-scroll.animate-slide-up,
.animate-on-scroll.animate-slide-down,
.animate-on-scroll.animate-scale-in,
.animate-on-scroll.animate-bounce-in,
.animate-on-scroll.animate-rotate-in {
  opacity: 1;
}
</style>