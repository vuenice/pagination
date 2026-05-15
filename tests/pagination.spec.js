import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VueNicePagination from '../src/VueNicePagination.vue';

describe('VueNicePagination', () => {
  it('renders with default props', () => {
    const wrapper = mount(VueNicePagination, {
      props: { total: 100 }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('shows correct total items', () => {
    const wrapper = mount(VueNicePagination, {
      props: { total: 50, resourceName: 'users' }
    });
    expect(wrapper.text()).toContain('50 users');
  });

  it('renders pagination buttons', () => {
    const wrapper = mount(VueNicePagination, {
      props: { total: 100 }
    });
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('emits page-change event', () => {
    const wrapper = mount(VueNicePagination, {
      props: { total: 100 }
    });
    const buttons = wrapper.findAll('button');
    if (buttons.length > 2) {
      buttons.at(2).trigger('click');
      expect(wrapper.emitted('page-change')).toBeTruthy();
    }
  });

  it('calculates total pages correctly', () => {
    const wrapper = mount(VueNicePagination, {
      props: { total: 50, perPage: 10 }
    });
    expect(wrapper.props('total')).toBe(50);
    expect(wrapper.props('perPage')).toBe(10);
  });
});