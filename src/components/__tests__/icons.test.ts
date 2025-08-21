import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Sun, Moon, Star, Heart, Shield, Zap, Check, ArrowRight, Github, Twitter, Instagram, Mail } from 'lucide-vue-next'

describe('Lucide Vue Next Icons', () => {
  it('should render Sun icon', () => {
    const wrapper = mount(Sun)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('should render Moon icon', () => {
    const wrapper = mount(Moon)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('should render Star icon', () => {
    const wrapper = mount(Star)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('should render Heart icon', () => {
    const wrapper = mount(Heart)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('should render Shield icon', () => {
    const wrapper = mount(Shield)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('should render Zap icon', () => {
    const wrapper = mount(Zap)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('should render Check icon', () => {
    const wrapper = mount(Check)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('should render ArrowRight icon', () => {
    const wrapper = mount(ArrowRight)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('should render Github icon', () => {
    const wrapper = mount(Github)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('should render Twitter icon', () => {
    const wrapper = mount(Twitter)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('should render Instagram icon', () => {
    const wrapper = mount(Instagram)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('should render Mail icon', () => {
    const wrapper = mount(Mail)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('should accept size prop', () => {
    const wrapper = mount(Heart, {
      props: { size: 24 }
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('24')
    expect(svg.attributes('height')).toBe('24')
  })

  it('should accept class prop', () => {
    const wrapper = mount(Star, {
      props: { class: 'text-yellow-400' }
    })
    expect(wrapper.classes()).toContain('text-yellow-400')
  })
})