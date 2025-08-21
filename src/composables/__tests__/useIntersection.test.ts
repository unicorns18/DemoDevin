import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { useIntersection } from '../useIntersection'

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn()
const mockObserve = vi.fn()
const mockDisconnect = vi.fn()

mockIntersectionObserver.mockReturnValue({
  observe: mockObserve,
  disconnect: mockDisconnect,
})

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
})

// Test component that uses the composable
const TestComponent = defineComponent({
  setup() {
    const { isVisible, observeElement } = useIntersection()
    return { isVisible, observeElement }
  },
  template: `
    <div>
      <div id="test-element" data-animate>Test Element</div>
      <div>Visible: {{ isVisible }}</div>
    </div>
  `,
})

describe('useIntersection', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    document.body.innerHTML = ''
  })

  it('should initialize with empty visibility state', () => {
    const wrapper = mount(TestComponent)
    const { isVisible } = wrapper.vm
    
    expect(isVisible).toEqual({})
  })

  it('should create IntersectionObserver on mount', () => {
    mount(TestComponent)
    
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )
  })

  it('should observe elements with data-animate attribute', () => {
    // Add test element to DOM
    document.body.innerHTML = '<div id="test-element" data-animate>Test</div>'
    
    mount(TestComponent)
    
    expect(mockObserve).toHaveBeenCalled()
  })

  it('should update visibility state when element intersects', () => {
    const wrapper = mount(TestComponent)
    
    // Get the callback function passed to IntersectionObserver
    const observerCallback = mockIntersectionObserver.mock.calls[0][0]
    
    // Simulate intersection
    const mockEntry = {
      target: { id: 'test-element' },
      isIntersecting: true,
    }
    
    observerCallback([mockEntry])
    
    expect(wrapper.vm.isVisible['test-element']).toBe(true)
  })

  it('should not update visibility state when element is not intersecting', () => {
    const wrapper = mount(TestComponent)
    
    // Get the callback function passed to IntersectionObserver
    const observerCallback = mockIntersectionObserver.mock.calls[0][0]
    
    // Simulate non-intersection
    const mockEntry = {
      target: { id: 'test-element' },
      isIntersecting: false,
    }
    
    observerCallback([mockEntry])
    
    expect(wrapper.vm.isVisible['test-element']).toBeUndefined()
  })

  it('should observe specific element by ID', () => {
    const wrapper = mount(TestComponent)
    
    // Add test element to DOM after component is mounted
    document.body.innerHTML = '<div id="specific-element">Specific Test</div>'
    
    const initialCallCount = mockObserve.mock.calls.length
    
    wrapper.vm.observeElement('specific-element')
    
    // Should be called one more time for the specific element
    expect(mockObserve).toHaveBeenCalledTimes(initialCallCount + 1)
  })

  it('should handle multiple intersecting elements', () => {
    const wrapper = mount(TestComponent)
    
    // Get the callback function passed to IntersectionObserver
    const observerCallback = mockIntersectionObserver.mock.calls[0][0]
    
    // Simulate multiple intersections
    const mockEntries = [
      { target: { id: 'element-1' }, isIntersecting: true },
      { target: { id: 'element-2' }, isIntersecting: true },
      { target: { id: 'element-3' }, isIntersecting: false },
    ]
    
    observerCallback(mockEntries)
    
    expect(wrapper.vm.isVisible['element-1']).toBe(true)
    expect(wrapper.vm.isVisible['element-2']).toBe(true)
    expect(wrapper.vm.isVisible['element-3']).toBeUndefined()
  })

  it('should disconnect observer on unmount', () => {
    const wrapper = mount(TestComponent)
    
    wrapper.unmount()
    
    expect(mockDisconnect).toHaveBeenCalled()
  })

  it('should handle elements without ID gracefully', () => {
    const wrapper = mount(TestComponent)
    
    // Get the callback function passed to IntersectionObserver
    const observerCallback = mockIntersectionObserver.mock.calls[0][0]
    
    // Simulate intersection with element without ID
    const mockEntry = {
      target: { id: '' },
      isIntersecting: true,
    }
    
    expect(() => observerCallback([mockEntry])).not.toThrow()
    expect(Object.keys(wrapper.vm.isVisible)).toHaveLength(0)
  })
})