<template>
  <button
    @click="toggleTheme"
    :class="themeToggleClasses"
    class="fixed bottom-6 right-6 p-4 rounded-full shadow-2xl transition-all duration-500 z-50 hover:scale-110 hover-lift group animate-button-bounce"
    aria-label="Toggle theme"
  >
    <div class="relative">
      <Transition name="theme-icon" mode="out-in">
        <Sun 
          v-if="isDarkMode" 
          key="sun"
          :size="24" 
          class="transition-all duration-300 group-hover:rotate-180 animate-theme-switch" 
        />
        <Moon 
          v-else 
          key="moon"
          :size="24" 
          class="transition-all duration-300 group-hover:rotate-12 animate-theme-switch" 
        />
      </Transition>
      <div class="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Moon, Sun } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'

// Use theme composable for state management
const { isDarkMode, toggleTheme } = useTheme()

// Computed classes for theme-based styling
const themeToggleClasses = computed(() =>
  isDarkMode.value
    ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400 animate-pulse-glow'
    : 'bg-gray-100 hover:bg-gray-200 text-gray-800 shadow-lg'
)
</script>

<style scoped>
@keyframes pulse-glow {
  0%, 100% { 
    box-shadow: 0 0 20px rgba(251, 191, 36, 0.3), 0 0 40px rgba(251, 191, 36, 0.1); 
  }
  50% { 
    box-shadow: 0 0 40px rgba(251, 191, 36, 0.6), 0 0 80px rgba(251, 191, 36, 0.3); 
  }
}

@keyframes theme-switch {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1); }
}

@keyframes button-bounce {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-2px) scale(1.05); }
}

.animate-pulse-glow { 
  animation: pulse-glow 2s ease-in-out infinite; 
}

.hover-lift { 
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
}

.hover-lift:hover { 
  transform: translateY(-8px) scale(1.02); 
}

.animate-theme-switch { 
  animation: theme-switch 0.6s ease-out; 
}

.animate-button-bounce { 
  animation: button-bounce 2s ease-in-out infinite; 
}

/* Theme icon transition */
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: all 0.3s ease;
}

.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.8);
}

.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.8);
}
</style>