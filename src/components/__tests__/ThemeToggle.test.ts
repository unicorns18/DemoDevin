import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import ThemeToggle from '../ThemeToggle.vue'
import { Sun, Moon } from 'lucide-vue-next'

// Mock the useTheme composable
const mockToggleTheme = vi.fn()
const mockIsDarkMode = ref(false)

vi.mock('@/composables/useTheme', () => ({
  useTheme: () => ({
    isDarkMode: mockIsDarkMode,
    toggleTheme: mockToggleTheme
  })
}))

describe('ThemeToggle', () => {
  beforeEach(() => {
    mockToggleTheme.mockClear()
    mockIsDarkMode.value = false
  })

  it('should render Moon icon in light mode', () => {
    const wrapper = mount(ThemeToggle)
    
    expect(wrapper.findComponent(Moon).exists()).toBe(true)
    expect(wrapper.findComponent(Sun).exists()).toBe(false)
  })

  it('should render Sun icon in dark mode', async () => {
    mockIsDarkMode.value = true
    const wrapper = mount(ThemeToggle)
    
    expect(wrapper.findComponent(Sun).exists()).toBe(true)
    expect(wrapper.findComponent(Moon).exists()).toBe(false)
  })

  it('should call toggleTheme when clicked', async () => {
    const wrapper = mount(ThemeToggle)
    
    await wrapper.find('button').trigger('click')
    
    expect(mockToggleTheme).toHaveBeenCalledOnce()
  })

  it('should render icons correctly', () => {
    const wrapper = mount(ThemeToggle)
    const moonIcon = wrapper.findComponent(Moon)
    
    expect(moonIcon.exists()).toBe(true)
  })

  it('should have proper accessibility attributes', () => {
    const wrapper = mount(ThemeToggle)
    const button = wrapper.find('button')
    
    expect(button.attributes('aria-label')).toBe('Toggle theme')
  })

  it('should apply correct classes based on theme', async () => {
    const wrapper = mount(ThemeToggle)
    
    // Light mode classes
    expect(wrapper.find('button').classes()).toContain('bg-gray-100')
    
    // Switch to dark mode
    mockIsDarkMode.value = true
    await wrapper.vm.$nextTick()
    
    expect(wrapper.find('button').classes()).toContain('bg-gray-800')
  })
})