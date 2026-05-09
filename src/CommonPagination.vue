<template>
  <div
    v-if="total"
    class="flex flex-wrap md:flex-nowrap items-center justify-between gap-y-3 w-full"
  >
    <!-- Left side: Per page dropdown and total count -->
    <div class="w-full md:w-auto flex items-center gap-4">
      <CommonListbox
        v-if="showPerPageDropdown && total>10"
        button-class="!w-16"
        options-class="!w-16"
        width="w-16"
        :options="perPageOptions"
        :value="selectedPerPage"
        label-key="name"
        value-key="name"
        @update:value="handlePerPageChange"
      />
      <div
        v-if="!hideResourceName"
        class="text-sm font-medium text-grayCust-500 whitespace-nowrap"
      >
        {{ total }} {{ resourceName || $t('items') }}
      </div>
    </div>

    <!-- Right side: Pagination controls -->
    <div
      v-if="totalPages > 1"
      class="w-full md:w-auto flex justify-center"
    >
      <v-pagination
        v-model="currentPageModel"
        :pages="totalPages"
        @update:model-value="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import CommonListbox from '@/shared/common/CommonListbox.vue';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { computed, ref, watch } from 'vue';

export default {
  name: 'CommonPagination',
  components: {
    CommonListbox,
    VPagination
  },
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    perPage: {
      type: [String, Number],
      default: '10'
    },
    total: {
      type: Number,
      default: 0
    },
    // Display props
    resourceName: {
      type: String,
      default: null
    },
    hideResourceName: {
      type: Boolean,
      default: false
    },
    showPerPageDropdown: {
      type: Boolean,
      default: true
    },
    // Per page options
    perPageOptions: {
      type: Array,
      default: () => [
        { id: 1, name: '10' },
        { id: 2, name: '25' },
        { id: 3, name: '50' },
        { id: 4, name: '100' },
      ]
    }
  },
  emits: ['update:currentPage', 'update:perPage', 'page-change', 'per-page-change'],
  setup(props, { emit }) {
    const currentPageModel = computed({
      get: () => props.currentPage,
      set: (value) => {
        emit('update:currentPage', value);
      }
    });

    const selectedPerPage = ref(null);

    const totalPages = computed(() => {
      return Math.ceil(props.total / parseInt(props.perPage));
    });

    watch(() => props.perPage, (newValue) => {
      const perPageValue = newValue.toString();
      selectedPerPage.value = props.perPageOptions.find(option => option.name === perPageValue) || props.perPageOptions[0];
    }, { immediate: true });

    const handlePageChange = (page) => {
      emit('update:currentPage', page);
      emit('page-change', page);
    };

    const handlePerPageChange = (option) => {
      selectedPerPage.value = option;
      emit('update:perPage', option.name);
      emit('per-page-change', option.name);
    };

    return {
      currentPageModel,
      selectedPerPage,
      totalPages,
      handlePageChange,
      handlePerPageChange
    };
  }
};
</script>
