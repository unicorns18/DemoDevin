<template>
  <Transition
    :name="name"
    :mode="mode"
    :appear="appear"
    :duration="duration"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
  >
    <slot />
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  name?: string
  mode?: 'in-out' | 'out-in' | 'default'
  appear?: boolean
  duration?: number | { enter: number; leave: number }
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
}

const props = withDefaults(defineProps<Props>(), {
  name: 'slide',
  mode: 'default',
  appear: true,
  duration: 400,
  direction: 'up',
  distance: 30
})

const getTransform = (direction: string, distance: number, reverse = false) => {
  const multiplier = reverse ? -1 : 1
  switch (direction) {
    case 'up':
      return `translateY(${distance * multiplier}px)`
    case 'down':
      return `translateY(${-distance * multiplier}px)`
    case 'left':
      return `translateX(${distance * multiplier}px)`
    case 'right':
      return `translateX(${-distance * multiplier}px)`
    default:
      return `translateY(${distance * multiplier}px)`
  }
}

// Transition event handlers
const onBeforeEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.opacity = '0'
  element.style.transform = getTransform(props.direction, props.distance)
}

const onEnter = (el: Element, done: () => void) => {
  const element = el as HTMLElement
  element.offsetHeight // Force reflow
  element.style.transition = `all ${typeof props.duration === 'number' ? props.duration : props.duration.enter}ms cubic-bezier(0.4, 0, 0.2, 1)`
  element.style.opacity = '1'
  element.style.transform = 'translate(0, 0)'
  
  setTimeout(done, typeof props.duration === 'number' ? props.duration : props.duration.enter)
}

const onAfterEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.transition = ''
}

const onBeforeLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.opacity = '1'
  element.style.transform = 'translate(0, 0)'
}

const onLeave = (el: Element, done: () => void) => {
  const element = el as HTMLElement
  element.style.transition = `all ${typeof props.duration === 'number' ? props.duration : props.duration.leave}ms cubic-bezier(0.4, 0, 0.2, 1)`
  element.style.opacity = '0'
  element.style.transform = getTransform(props.direction, props.distance, true)
  
  setTimeout(done, typeof props.duration === 'number' ? props.duration : props.duration.leave)
}

const onAfterLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.transition = ''
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from {
  opacity: 0;
}

.slide-leave-to {
  opacity: 0;
}
</style>