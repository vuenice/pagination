<template>
  <div v-if="total > 0" class="flex items-center justify-between gap-2 w-full">
    <div class="flex items-center gap-2">
      <span class="text-sm text-gray-600">{{ total }} {{ resourceName }}</span>
    </div>
    <div class="flex items-center gap-1">
      <button
        :disabled="currentPage <= 1"
        class="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="goToPage(currentPage - 1)"
      >
        Prev
      </button>
      <button
        v-for="page in visiblePages"
        :key="page"
        :class="['px-3 py-1 border rounded', page === currentPage ? 'bg-blue-500 text-white' : 'hover:bg-gray-50']"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      <button
        :disabled="currentPage >= totalPages"
        class="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="goToPage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  perPage: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    default: 0
  },
  resourceName: {
    type: String,
    default: 'items'
  },
  maxVisiblePages: {
    type: Number,
    default: 5
  }
});

const emit = defineEmits(['update:currentPage', 'page-change']);

const totalPages = computed(() => Math.ceil(props.total / props.perPage));

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, props.currentPage - Math.floor(props.maxVisiblePages / 2));
  const end = Math.min(totalPages.value, start + props.maxVisiblePages - 1);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('update:currentPage', page);
    emit('page-change', page);
  }
};
</script>