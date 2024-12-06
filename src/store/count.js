import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useCountStore = defineStore('count', () => {
  const count = ref(100);
  const double = computed(() => {
    return count.value * 2;
  });

  function add() {
    count.value++;
  }
  return {
    count,
    double,
    add,
  };
});
