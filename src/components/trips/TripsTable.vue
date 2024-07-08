<template>
  <DataTable :value="data">
    <Column :field="start" header="Inicio">
      <template #body="slotProps">
        <AddressColumn :data="slotProps.data?.start ?? {}" />
      </template>
    </Column>

    <Column :field="end" header="Término">
      <template #body="slotProps">
        <AddressColumn :data="slotProps.data?.end ?? {}" />
      </template>
    </Column>

    <Column :field="end" header="Distancia y tiempo">
      <template #body="slotProps">
        <p>{{ slotProps.data?.distance }} km</p>
        <p>{{ slotProps.data?.duration ? (slotProps.data.duration / 60000).toFixed(2) : 0 }} minutos</p>
      </template>
    </Column>

    <Column :field="actions" header="">
      <template #body="slotProps">
        <Button
          icon="pi pi-angle-right"
          severity="info"
          aria-label="open-trip"
          rounded
          @click="() => redirect(slotProps.data.id)"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import AddressColumn from './AddressColumn.vue';

  defineProps({
    data: {
      type: Array,
      default: []
    },
  });

  const router = useRouter();

  const redirect = (tripId) => {
    router.push(`/trips/${tripId}`);
  }
</script>