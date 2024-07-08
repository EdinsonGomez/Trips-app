<template>
  <div>
    <p>{{ time }}</p>
    <p>{{ data?.address ?? '' }}</p>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import moment from 'moment';

  const props = defineProps({
    data: {
      type: Object,
      default: {}
    }
  });


  const time = computed(() => {
    if (!props.data?.time) return '';

    const date = moment(props.data.time).format('HH:mm DD/MM/YYYY');

    return date;
  })
</script>