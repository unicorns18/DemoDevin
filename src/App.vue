<template>
  <div :class="themeClasses">
    <!-- Theme Toggle Component -->
    <ThemeToggle />

    <!-- Hero Section Component -->
    <HeroSection />

    <!-- Features Section Component -->
    <FeatureSection />

    <!-- Footer Section Component -->
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { useIntersection } from '@/composables/useIntersection'
import ThemeToggle from '@/components/ThemeToggle.vue'
import HeroSection from '@/components/HeroSection.vue'
import FeatureSection from '@/components/FeatureSection.vue'
import FooterSection from '@/components/FooterSection.vue'

// Use composables for global state management
const { themeClasses } = useTheme()
const { observeElement } = useIntersection()

// Initialize intersection observer for scroll animations
onMounted(() => {
  // Observe elements that need scroll-triggered animations
  const elementsToObserve = [
    'features-header',
    'feature-premium-quality',
    'feature-unique-designs', 
    'feature-collector-value',
    'footer-company',
    'footer-products',
    'footer-support',
    'footer-newsletter',
    'footer-bottom'
  ]
  
  // Add a small delay to ensure DOM is fully rendered
  setTimeout(() => {
    elementsToObserve.forEach(id => {
      observeElement(id)
    })
  }, 100)
})
</script>

<style>
/* Global styles for smooth transitions and animations */
* {
  scroll-behavior: smooth;
}

/* Ensure proper z-index stacking */
.fixed {
  z-index: 50;
}

/* Global animation classes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Utility classes for consistent animations */
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

.animate-fade-in-scale {
  animation: fadeInScale 0.6s ease-out forwards;
}

/* Ensure proper font rendering */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

