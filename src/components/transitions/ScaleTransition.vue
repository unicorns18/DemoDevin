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
  initialScale?: number
  finalScale?: number
}

const props = withDefaults(defineProps<Props>(), {
  name: 'scale',
  mode: 'default',
  appear: true,
  duration: 300,
  initialScale: 0.9,
  finalScale: 1
})

// Transition event handlers
const onBeforeEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.opacity = '0'
  element.style.transform = `scale(${props.initialScale})`
}

const onEnter = (el: Element, done: () => void) => {
  const element = el as HTMLElement
  element.offsetHeight // Force reflow
  element.style.transition = `all ${typeof props.duration === 'number' ? props.duration : props.duration.enter}ms cubic-bezier(0.34, 1.56, 0.64, 1)`
  element.style.opacity = '1'
  element.style.transform = `scale(${props.finalScale})`
  
  setTimeout(done, typeof props.duration === 'number' ? props.duration : props.duration.enter)
}

const onAfterEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.transition = ''
}

const onBeforeLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.opacity = '1'
  element.style.transform = `scale(${props.finalScale})`
}

const onLeave = (el: Element, done: () => void) => {
  const element = el as HTMLElement
  element.style.transition = `all ${typeof props.duration === 'number' ? props.duration : props.duration.leave}ms ease-in`
  element.style.opacity = '0'
  element.style.transform = `scale(${props.initialScale})`
  
  setTimeout(done, typeof props.duration === 'number' ? props.duration : props.duration.leave)
}

const onAfterLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.transition = ''
}
</script>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.scale-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>