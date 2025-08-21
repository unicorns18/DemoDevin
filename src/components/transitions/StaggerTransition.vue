<template>
  <TransitionGroup
    :name="name"
    :appear="appear"
    tag="div"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
  >
    <slot />
  </TransitionGroup>
</template>

<script setup lang="ts">
interface Props {
  name?: string
  appear?: boolean
  staggerDelay?: number
  duration?: number
  animationType?: 'slide' | 'fade' | 'scale'
}

const props = withDefaults(defineProps<Props>(), {
  name: 'stagger',
  appear: true,
  staggerDelay: 100,
  duration: 400,
  animationType: 'slide'
})

// Transition event handlers
const onBeforeEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.opacity = '0'
  
  switch (props.animationType) {
    case 'slide':
      element.style.transform = 'translateY(30px)'
      break
    case 'scale':
      element.style.transform = 'scale(0.9)'
      break
    case 'fade':
    default:
      element.style.transform = 'translateY(20px)'
      break
  }
}

const onEnter = (el: Element, done: () => void) => {
  const element = el as HTMLElement
  const delay = (el as any).dataset.index * props.staggerDelay
  
  setTimeout(() => {
    element.style.transition = `all ${props.duration}ms cubic-bezier(0.4, 0, 0.2, 1)`
    element.style.opacity = '1'
    
    switch (props.animationType) {
      case 'slide':
        element.style.transform = 'translateY(0)'
        break
      case 'scale':
        element.style.transform = 'scale(1)'
        break
      case 'fade':
      default:
        element.style.transform = 'translateY(0)'
        break
    }
    
    setTimeout(done, props.duration)
  }, delay)
}

const onLeave = (el: Element, done: () => void) => {
  const element = el as HTMLElement
  const delay = (el as any).dataset.index * (props.staggerDelay / 2)
  
  setTimeout(() => {
    element.style.transition = `all ${props.duration / 2}ms ease-in`
    element.style.opacity = '0'
    
    switch (props.animationType) {
      case 'slide':
        element.style.transform = 'translateY(-30px)'
        break
      case 'scale':
        element.style.transform = 'scale(0.9)'
        break
      case 'fade':
      default:
        element.style.transform = 'translateY(-20px)'
        break
    }
    
    setTimeout(done, props.duration / 2)
  }, delay)
}
</script>

<style scoped>
.stagger-move,
.stagger-enter-active,
.stagger-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.stagger-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.stagger-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.stagger-leave-active {
  position: absolute;
}
</style>