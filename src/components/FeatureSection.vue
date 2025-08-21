<template>
  <section :class="sectionClasses" class="relative py-20 px-6 overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div 
        :class="backgroundElement1Classes" 
        class="absolute top-10 right-20 w-64 h-64 rounded-full opacity-5 animate-float"
      ></div>
      <div 
        :class="backgroundElement2Classes" 
        class="absolute bottom-20 left-10 w-80 h-80 rounded-full opacity-5 animate-float" 
        style="animation-delay: 3s"
      ></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section Header -->
      <div 
        id="features-header"
        :class="headerClasses"
        class="text-center mb-20 transition-all duration-1000"
        :style="{ 
          opacity: isVisible['features-header'] ? 1 : 0,
          transform: isVisible['features-header'] ? 'translateY(0)' : 'translateY(30px)'
        }"
        data-animate
      >
        <h2 :class="titleClasses" class="text-4xl lg:text-5xl font-bold mb-6">
          Why Choose Our
          <span :class="gradientTextClasses" class="block text-gradient">
            Premium Collection
          </span>
        </h2>
        <p :class="subtitleClasses" class="text-xl max-w-3xl mx-auto">
          Discover the exceptional features that make our rubber ducks the perfect choice for collectors and enthusiasts worldwide.
        </p>
      </div>

      <!-- Features Grid with Z-Pattern Layout -->
      <div class="space-y-32">
        <!-- Feature 1 - Left Image, Right Content -->
        <div 
          v-for="(feature, index) in features" 
          :key="feature.id"
          :id="`feature-${feature.id}`"
          :class="[
            'grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000',
            index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
          ]"
          :style="{ 
            opacity: isVisible[`feature-${feature.id}`] ? 1 : 0,
            transform: isVisible[`feature-${feature.id}`] ? 'translateY(0)' : 'translateY(50px)'
          }"
          data-animate
        >
          <!-- Feature Image -->
          <div 
            :class="[
              'relative group',
              index % 2 === 1 ? 'lg:col-start-2' : ''
            ]"
          >
            <div class="rounded-2xl overflow-hidden shadow-2xl hover-lift">
              <img
                :src="feature.image"
                :alt="feature.title"
                class="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            <!-- Floating Stats Card -->
            <Card 
              v-if="feature.stats"
              :class="[
                statsCardClasses,
                'absolute -bottom-6 p-6 shadow-xl hover-lift glass-effect animate-card-glow',
                index % 2 === 1 ? '-left-6' : '-right-6'
              ]"
            >
              <CardContent class="p-0">
                <div class="flex items-center space-x-4">
                  <div 
                    v-for="stat in feature.stats" 
                    :key="stat.label"
                    class="text-center"
                  >
                    <div :class="statValueClasses" class="text-2xl font-bold">
                      {{ stat.value }}
                    </div>
                    <div :class="statLabelClasses" class="text-sm">
                      {{ stat.label }}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- Feature Content -->
          <div 
            :class="[
              'space-y-6',
              index % 2 === 1 ? 'lg:col-start-1' : ''
            ]"
          >
            <div class="flex items-center space-x-4 mb-4">
              <div :class="iconContainerClasses" class="w-16 h-16 rounded-2xl flex items-center justify-center hover-lift animate-pulse-glow">
                <component 
                  :is="getIconComponent(feature.icon)" 
                  class="w-8 h-8 transition-transform duration-300 hover:scale-125"
                />
              </div>
              <div>
                <h3 :class="featureTitleClasses" class="text-3xl font-bold">
                  {{ feature.title }}
                </h3>
              </div>
            </div>
            
            <p :class="featureDescriptionClasses" class="text-lg leading-relaxed">
              {{ feature.description }}
            </p>

            <!-- Benefits List -->
            <div class="space-y-3">
              <div 
                v-for="(benefit, benefitIndex) in feature.benefits" 
                :key="benefitIndex"
                class="flex items-center space-x-3 group"
              >
                <div :class="checkIconClasses" class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:animate-check-bounce">
                  <Check class="w-4 h-4" />
                </div>
                <span :class="benefitTextClasses" class="transition-colors duration-300 group-hover:text-opacity-100">
                  {{ benefit }}
                </span>
              </div>
            </div>

            <!-- CTA Button -->
            <div class="pt-4">
              <Button 
                :class="ctaButtonClasses" 
                class="px-8 py-4 text-lg hover-lift group relative overflow-hidden"
                size="lg"
                @click="handleLearnMore(feature.id)"
              >
                <span class="relative z-10 flex items-center space-x-2">
                  <span>Learn More</span>
                  <ArrowRight class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div class="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { Shield, Zap, Heart, Star, Check, ArrowRight } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'
import { useIntersection } from '@/composables/useIntersection'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { Feature } from '@/types'

// Use composables
const { isDarkMode } = useTheme()
const { isVisible } = useIntersection()

// Feature data - reactive structure
const features = reactive<Feature[]>([
  {
    id: 'premium-quality',
    icon: 'Shield',
    title: 'Premium Quality',
    description: 'Each rubber duck is meticulously crafted using the finest materials and undergoes rigorous quality testing. Our commitment to excellence ensures that every duck meets the highest standards of durability and aesthetic appeal.',
    image: 'https://images.unsplash.com/photo-1563906267088-b029e7101114?w=600&h=400&fit=crop',
    benefits: [
      'Hand-selected premium materials',
      'Rigorous quality control process',
      'Lifetime craftsmanship guarantee',
      'Eco-friendly manufacturing'
    ],
    stats: [
      { value: '99.9%', label: 'Quality Score' },
      { value: '5★', label: 'Rating' }
    ]
  },
  {
    id: 'unique-designs',
    icon: 'Zap',
    title: 'Unique Designs',
    description: 'Our exclusive collection features one-of-a-kind designs that you won\'t find anywhere else. From classic yellow to exotic themed variations, each duck tells its own story and adds character to any collection.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
    benefits: [
      'Exclusive limited edition designs',
      'Artist collaboration pieces',
      'Customization options available',
      'Regular new releases'
    ],
    stats: [
      { value: '200+', label: 'Designs' },
      { value: '50+', label: 'Artists' }
    ]
  },
  {
    id: 'collector-value',
    icon: 'Heart',
    title: 'Collector Value',
    description: 'Our rubber ducks are not just toys - they\'re valuable collectibles that appreciate over time. With limited production runs and certificate of authenticity, each duck becomes a treasured investment piece.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    benefits: [
      'Certificate of authenticity included',
      'Limited production runs',
      'Investment-grade collectibles',
      'Collector community access'
    ],
    stats: [
      { value: '15%', label: 'Avg. Annual Growth' },
      { value: '10K+', label: 'Collectors' }
    ]
  }
])

// Icon component mapping
const iconComponents = {
  Shield,
  Zap,
  Heart,
  Star
}

const getIconComponent = (iconName: string) => {
  return iconComponents[iconName as keyof typeof iconComponents] || Shield
}

// Event handlers
const handleLearnMore = (featureId: string) => {
  console.log(`Learn more about feature: ${featureId}`)
}

// Computed classes for theme-aware styling
const sectionClasses = computed(() =>
  isDarkMode.value 
    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
    : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
)

const backgroundElement1Classes = computed(() =>
  isDarkMode.value ? 'bg-purple-500' : 'bg-blue-500'
)

const backgroundElement2Classes = computed(() =>
  isDarkMode.value ? 'bg-yellow-400' : 'bg-green-500'
)

const headerClasses = computed(() => 'space-y-6')

const titleClasses = computed(() =>
  isDarkMode.value ? 'text-white' : 'text-gray-900'
)

const gradientTextClasses = computed(() =>
  isDarkMode.value ? '' : 'text-blue-600'
)

const subtitleClasses = computed(() =>
  isDarkMode.value ? 'text-gray-300' : 'text-gray-600'
)

const statsCardClasses = computed(() =>
  isDarkMode.value ? 'bg-gray-800/90 border border-gray-700' : 'bg-white/90 border border-gray-200'
)

const statValueClasses = computed(() =>
  isDarkMode.value ? 'text-yellow-400' : 'text-blue-600'
)

const statLabelClasses = computed(() =>
  isDarkMode.value ? 'text-gray-400' : 'text-gray-600'
)

const iconContainerClasses = computed(() =>
  isDarkMode.value ? 'bg-yellow-400 text-gray-900' : 'bg-blue-600 text-white'
)

const featureTitleClasses = computed(() =>
  isDarkMode.value ? 'text-white' : 'text-gray-900'
)

const featureDescriptionClasses = computed(() =>
  isDarkMode.value ? 'text-gray-300' : 'text-gray-600'
)

const checkIconClasses = computed(() =>
  isDarkMode.value ? 'bg-green-500 text-white' : 'bg-green-600 text-white'
)

const benefitTextClasses = computed(() =>
  isDarkMode.value ? 'text-gray-300' : 'text-gray-700'
)

const ctaButtonClasses = computed(() =>
  isDarkMode.value
    ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 hover:shadow-2xl border-0'
    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-2xl border-0'
)
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes pulse-glow {
  0%, 100% { 
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2); 
  }
  50% { 
    box-shadow: 0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(59, 130, 246, 0.4); 
  }
}

@keyframes check-bounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@keyframes card-glow {
  0%, 100% { 
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); 
  }
  50% { 
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 0 0 20px rgba(59, 130, 246, 0.1); 
  }
}

.animate-float { animation: float 6s ease-in-out infinite; }
.animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
.animate-check-bounce { animation: check-bounce 0.6s ease-out; }
.animate-card-glow { animation: card-glow 3s ease-in-out infinite; }

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