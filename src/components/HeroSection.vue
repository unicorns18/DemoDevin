<template>
  <section :class="heroSectionClasses" class="relative py-20 px-6 overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div 
        :class="floatingElement1Classes" 
        class="absolute top-20 left-10 w-72 h-72 rounded-full opacity-10 animate-float"
      ></div>
      <div 
        :class="floatingElement2Classes" 
        class="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-5 animate-float" 
        style="animation-delay: 2s"
      ></div>
      <div 
        :class="floatingElement3Classes" 
        class="absolute top-1/2 left-1/2 w-64 h-64 rounded-full opacity-5 animate-float" 
        style="animation-delay: 4s"
      ></div>
    </div>
    
    <div class="max-w-6xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Left side - Text Content -->
        <div class="space-y-8 relative z-10">
          <div class="space-y-4">
            <h1 :class="titleClasses" class="text-5xl lg:text-6xl font-bold leading-tight animate-slide-up">
              Premium Rubber
              <span :class="gradientTextClasses" class="block text-gradient animate-gradient">
                Duck Collection
              </span>
            </h1>
            <p :class="subtitleClasses" class="text-xl leading-relaxed animate-slide-up" style="animation-delay: 0.2s">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
            </p>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4 animate-slide-up" style="animation-delay: 0.4s">
            <Button 
              :class="primaryButtonClasses" 
              class="px-8 py-4 text-lg hover-lift group relative overflow-hidden"
              size="lg"
              @click="handleShopNow"
            >
              <span class="relative z-10">Shop Now</span>
              <div class="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
            <Button 
              variant="outline"
              :class="secondaryButtonClasses" 
              class="px-8 py-4 text-lg hover-lift group glass-effect"
              size="lg"
              @click="handleLearnMore"
            >
              <span class="relative z-10">Learn More</span>
            </Button>
          </div>

          <div class="flex items-center space-x-6 pt-4 animate-slide-up" style="animation-delay: 0.6s">
            <div class="flex items-center space-x-1">
              <Star 
                v-for="i in 5" 
                :key="i"
                :class="starClasses"
                class="w-5 h-5 fill-current transition-all duration-300 hover:scale-125 animate-star-twinkle"
                :style="{ animationDelay: `${(i-1) * 0.2}s` }"
              />
            </div>
            <span :class="trustTextClasses" class="text-sm">
              Trusted by 10,000+ customers
            </span>
          </div>
        </div>

        <!-- Right side - Hero Image -->
        <div class="relative animate-scale-in" style="animation-delay: 0.3s">
          <div class="rounded-2xl overflow-hidden shadow-2xl bg-gray-800 hover-lift group">
            <img
              src="https://images.unsplash.com/photo-1563906267088-b029e7101114?w=600&h=400&fit=crop"
              alt="Premium rubber duck collection"
              class="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div :class="heroCardClasses" class="absolute -bottom-6 -left-6 p-6 rounded-xl shadow-lg glass-effect hover-lift">
            <div class="flex items-center space-x-3">
              <div :class="heroIconClasses" class="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 animate-pulse-glow">
                <Heart class="w-6 h-6 transition-transform duration-300 hover:scale-125" />
              </div>
              <div>
                <p :class="heroCardTitleClasses" class="font-semibold">
                  Premium Quality
                </p>
                <p :class="heroCardSubtitleClasses" class="text-sm">
                  Handcrafted Excellence
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Star, Heart } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'
import { Button } from '@/components/ui/button'

// Use theme composable
const { isDarkMode } = useTheme()

// Event handlers
const handleShopNow = () => {
  // Handle shop now action
  console.log('Shop Now clicked')
}

const handleLearnMore = () => {
  // Handle learn more action
  console.log('Learn More clicked')
}

// Computed classes for theme-aware styling
const heroSectionClasses = computed(() =>
  isDarkMode.value 
    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
    : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
)

const floatingElement1Classes = computed(() =>
  isDarkMode.value ? 'bg-yellow-400' : 'bg-blue-500'
)

const floatingElement2Classes = computed(() =>
  isDarkMode.value ? 'bg-purple-500' : 'bg-green-500'
)

const floatingElement3Classes = computed(() =>
  isDarkMode.value ? 'bg-blue-500' : 'bg-purple-500'
)

const titleClasses = computed(() =>
  isDarkMode.value ? 'text-white' : 'text-gray-900'
)

const gradientTextClasses = computed(() =>
  isDarkMode.value ? '' : 'text-blue-600'
)

const subtitleClasses = computed(() =>
  isDarkMode.value ? 'text-gray-300' : 'text-gray-600'
)

const primaryButtonClasses = computed(() =>
  isDarkMode.value
    ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 hover:shadow-2xl border-0'
    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-2xl border-0'
)

const secondaryButtonClasses = computed(() =>
  isDarkMode.value
    ? 'border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400 bg-transparent'
    : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 bg-transparent'
)

const starClasses = computed(() =>
  isDarkMode.value ? 'text-yellow-400' : 'text-yellow-500'
)

const trustTextClasses = computed(() =>
  isDarkMode.value ? 'text-gray-400' : 'text-gray-600'
)

const heroCardClasses = computed(() =>
  isDarkMode.value ? 'bg-gray-800/80 border border-gray-700' : 'bg-white/80 border border-gray-200'
)

const heroIconClasses = computed(() =>
  isDarkMode.value ? 'bg-yellow-400 text-gray-900' : 'bg-blue-600 text-white'
)

const heroCardTitleClasses = computed(() =>
  isDarkMode.value ? 'text-white' : 'text-gray-900'
)

const heroCardSubtitleClasses = computed(() =>
  isDarkMode.value ? 'text-gray-400' : 'text-gray-600'
)
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes pulse-glow {
  0%, 100% { 
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2); 
  }
  50% { 
    box-shadow: 0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(59, 130, 246, 0.4); 
  }
}

@keyframes star-twinkle {
  0%, 100% { 
    opacity: 1; 
    transform: scale(1); 
  }
  50% { 
    opacity: 0.7; 
    transform: scale(1.1); 
  }
}

.animate-float { animation: float 6s ease-in-out infinite; }
.animate-gradient { 
  background-size: 200% 200%;
  animation: gradient-shift 8s ease infinite;
}
.animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
.animate-scale-in { animation: scale-in 0.6s ease-out forwards; }
.animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
.animate-star-twinkle { animation: star-twinkle 2s ease-in-out infinite; }

.hover-lift { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.hover-lift:hover { transform: translateY(-8px) scale(1.02); }

.glass-effect {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.text-gradient {
  background: linear-gradient(135deg, #fbbf24, #f59e0b, #d97706);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>