<template>
  <footer :class="footerClasses" class="relative py-20 px-6 overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div 
        :class="backgroundElement1Classes" 
        class="absolute top-10 left-20 w-48 h-48 rounded-full opacity-5 animate-float"
      ></div>
      <div 
        :class="backgroundElement2Classes" 
        class="absolute bottom-10 right-20 w-64 h-64 rounded-full opacity-5 animate-float" 
        style="animation-delay: 2s"
      ></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <!-- Company Info -->
        <div 
          id="footer-company"
          class="space-y-4 transition-all duration-1000"
          :style="{ 
            opacity: isVisible['footer-company'] ? 1 : 0,
            transform: isVisible['footer-company'] ? 'translateY(0)' : 'translateY(30px)'
          }"
          data-animate
        >
          <div class="flex items-center space-x-2">
            <div :class="logoClasses" class="w-8 h-8 rounded-full flex items-center justify-center">
              <Heart :class="logoIconClasses" class="w-5 h-5" />
            </div>
            <h3 :class="brandClasses" class="text-xl font-bold">DuckCo</h3>
          </div>
          <p :class="descriptionClasses" class="text-sm leading-relaxed">
            Premium rubber duck collection for enthusiasts and collectors worldwide. Quality craftsmanship since 2020.
          </p>
          <div class="flex space-x-4">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url"
              :class="socialLinkClasses"
              class="w-10 h-10 rounded-full flex items-center justify-center hover-lift transition-all duration-300 group hover:animate-social-pulse"
              :aria-label="social.name"
            >
              <component :is="social.icon" class="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </a>
          </div>
        </div>

        <!-- Products -->
        <div 
          id="footer-products"
          class="space-y-4 transition-all duration-1000"
          :style="{ 
            opacity: isVisible['footer-products'] ? 1 : 0,
            transform: isVisible['footer-products'] ? 'translateY(0)' : 'translateY(30px)'
          }"
          style="animation-delay: 0.1s"
          data-animate
        >
          <h4 :class="sectionTitleClasses" class="text-lg font-semibold">Products</h4>
          <ul class="space-y-2">
            <li v-for="link in productLinks" :key="link.name">
              <a 
                :href="link.url" 
                :class="linkClasses"
                class="text-sm hover:translate-x-1 transition-all duration-300 inline-block"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div 
          id="footer-support"
          class="space-y-4 transition-all duration-1000"
          :style="{ 
            opacity: isVisible['footer-support'] ? 1 : 0,
            transform: isVisible['footer-support'] ? 'translateY(0)' : 'translateY(30px)'
          }"
          style="animation-delay: 0.2s"
          data-animate
        >
          <h4 :class="sectionTitleClasses" class="text-lg font-semibold">Support</h4>
          <ul class="space-y-2">
            <li v-for="link in supportLinks" :key="link.name">
              <a 
                :href="link.url" 
                :class="linkClasses"
                class="text-sm hover:translate-x-1 transition-all duration-300 inline-block"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div 
          id="footer-newsletter"
          class="space-y-4 transition-all duration-1000"
          :style="{ 
            opacity: isVisible['footer-newsletter'] ? 1 : 0,
            transform: isVisible['footer-newsletter'] ? 'translateY(0)' : 'translateY(30px)'
          }"
          style="animation-delay: 0.3s"
          data-animate
        >
          <h4 :class="sectionTitleClasses" class="text-lg font-semibold">Stay Updated</h4>
          <p :class="newsletterDescClasses" class="text-sm">
            Get the latest updates on new collections and exclusive offers.
          </p>
          <div class="space-y-3">
            <input 
              v-model="email"
              type="email" 
              placeholder="Enter your email"
              :class="inputClasses"
              class="w-full px-4 py-2 text-sm rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:animate-input-focus"
            />
            <Button 
              :class="subscribeButtonClasses"
              class="w-full px-4 py-2 text-sm hover-lift transition-all duration-300 group"
              size="sm"
              @click="handleSubscribe"
            >
              <span class="group-hover:scale-105 transition-transform duration-300">Subscribe</span>
            </Button>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div 
        id="footer-bottom"
        :class="bottomBarClasses"
        class="pt-8 border-t transition-all duration-1000"
        :style="{ 
          opacity: isVisible['footer-bottom'] ? 1 : 0,
          transform: isVisible['footer-bottom'] ? 'translateY(0)' : 'translateY(30px)'
        }"
        style="animation-delay: 0.4s"
        data-animate
      >
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p :class="copyrightClasses" class="text-sm">
            © 2024 DuckCo. All rights reserved.
          </p>
          <div class="flex space-x-6">
            <a 
              v-for="link in legalLinks" 
              :key="link.name"
              :href="link.url" 
              :class="legalLinkClasses"
              class="text-sm hover:underline transition-all duration-300"
            >
              {{ link.name }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { useIntersection } from '@/composables/useIntersection'
import { Button } from '@/components/ui/button'
import { Heart, Github, Twitter, Instagram, Mail } from 'lucide-vue-next'

// Composables
const { isDarkMode } = useTheme()
const { isVisible } = useIntersection()

// Reactive data
const email = ref('')

// Social media links
const socialLinks = [
  { name: 'GitHub', icon: Github, url: '#' },
  { name: 'Twitter', icon: Twitter, url: '#' },
  { name: 'Instagram', icon: Instagram, url: '#' },
  { name: 'Email', icon: Mail, url: 'mailto:hello@duckco.com' }
]

// Navigation links
const productLinks = [
  { name: 'Classic Collection', url: '#' },
  { name: 'Premium Series', url: '#' },
  { name: 'Limited Edition', url: '#' },
  { name: 'Custom Designs', url: '#' },
  { name: 'Gift Sets', url: '#' }
]

const supportLinks = [
  { name: 'Help Center', url: '#' },
  { name: 'Contact Us', url: '#' },
  { name: 'Shipping Info', url: '#' },
  { name: 'Returns', url: '#' },
  { name: 'Size Guide', url: '#' }
]

const legalLinks = [
  { name: 'Privacy Policy', url: '#' },
  { name: 'Terms of Service', url: '#' },
  { name: 'Cookie Policy', url: '#' }
]

// Event handlers
const handleSubscribe = () => {
  if (email.value) {
    console.log('Subscribing email:', email.value)
    // Add subscription logic here
    email.value = ''
  }
}

// Computed styles
const footerClasses = computed(() =>
  isDarkMode.value 
    ? 'bg-gray-900 text-gray-100' 
    : 'bg-gray-50 text-gray-900'
)

const backgroundElement1Classes = computed(() =>
  isDarkMode.value 
    ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
    : 'bg-gradient-to-br from-yellow-300 to-orange-400'
)

const backgroundElement2Classes = computed(() =>
  isDarkMode.value 
    ? 'bg-gradient-to-br from-purple-500 to-pink-600' 
    : 'bg-gradient-to-br from-blue-300 to-indigo-400'
)

const logoClasses = computed(() =>
  isDarkMode.value 
    ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
    : 'bg-gradient-to-br from-yellow-500 to-orange-600'
)

const logoIconClasses = computed(() =>
  'text-white'
)

const brandClasses = computed(() =>
  isDarkMode.value ? 'text-white' : 'text-gray-900'
)

const descriptionClasses = computed(() =>
  isDarkMode.value ? 'text-gray-400' : 'text-gray-600'
)

const socialLinkClasses = computed(() =>
  isDarkMode.value 
    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700' 
    : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200 shadow-sm'
)

const sectionTitleClasses = computed(() =>
  isDarkMode.value ? 'text-white' : 'text-gray-900'
)

const linkClasses = computed(() =>
  isDarkMode.value 
    ? 'text-gray-400 hover:text-white' 
    : 'text-gray-600 hover:text-gray-900'
)

const newsletterDescClasses = computed(() =>
  isDarkMode.value ? 'text-gray-400' : 'text-gray-600'
)

const inputClasses = computed(() =>
  isDarkMode.value 
    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
)

const subscribeButtonClasses = computed(() =>
  isDarkMode.value 
    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white' 
    : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white'
)

const bottomBarClasses = computed(() =>
  isDarkMode.value ? 'border-gray-800' : 'border-gray-200'
)

const copyrightClasses = computed(() =>
  isDarkMode.value ? 'text-gray-400' : 'text-gray-600'
)

const legalLinkClasses = computed(() =>
  isDarkMode.value 
    ? 'text-gray-400 hover:text-white' 
    : 'text-gray-600 hover:text-gray-900'
)
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(1deg); }
  66% { transform: translateY(5px) rotate(-1deg); }
}

@keyframes social-pulse {
  0%, 100% { 
    transform: scale(1); 
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); 
  }
  50% { 
    transform: scale(1.05); 
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); 
  }
}

@keyframes input-focus {
  0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
  100% { box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.hover-lift {
  transition: transform 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
}

.animate-social-pulse { 
  animation: social-pulse 0.6s ease-out; 
}

.animate-input-focus { 
  animation: input-focus 0.3s ease-out; 
}

.text-gradient {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>