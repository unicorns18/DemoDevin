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
}

const props = withDefaults(defineProps<Props>(), {
  name: 'fade',
  mode: 'default',
  appear: true,
  duration: 300
})

// Transition event handlers
const onBeforeEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.opacity = '0'
  element.style.transform = 'translateY(20px)'
}

const onEnter = (el: Element, done: () => void) => {
  const element = el as HTMLElement
  element.offsetHeight // Force reflow
  element.style.transition = `all ${typeof props.duration === 'number' ? props.duration : props.duration.enter}ms ease-out`
  element.style.opacity = '1'
  element.style.transform = 'translateY(0)'
  
  setTimeout(done, typeof props.duration === 'number' ? props.duration : props.duration.enter)
}

const onAfterEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.transition = ''
}

const onBeforeLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.opacity = '1'
  element.style.transform = 'translateY(0)'
}

const onLeave = (el: Element, done: () => void) => {
  const element = el as HTMLElement
  element.style.transition = `all ${typeof props.duration === 'number' ? props.duration : props.duration.leave}ms ease-out`
  element.style.opacity = '0'
  element.style.transform = 'translateY(-20px)'
  
  setTimeout(done, typeof props.duration === 'number' ? props.duration : props.duration.leave)
}

const onAfterLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.transition = ''
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-out;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>