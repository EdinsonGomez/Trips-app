<template>
  <div class="table">
    <div class="table__filters">
      <InputText
        type="text"
        v-model="filters.start"
        placeholder="Desde"
      />
      
      <InputText
        type="text"
        v-model="filters.end"
        placeholder="Hasta"
      />

      <Button
        label="Borrar Filtros"
        :pt="{
          root: { class: 'table__filters-button' }
        }"
        @click="clearFilters"
      />
    </div>
    
    <DataTable
      :value="filterData"
      :pt="{
        bodyRow: { class: 'table__bodyrow' },
      }"
    >
      <template v-for="col in columns" :key="col.field">
        <Column
          :pt="{
            bodyCell: { class: 'table__bodycell' },
            headerCell: { class: 'table__headercell' },
          }"
          :field="col.field"
          :header="col.header"
        >
          <template #body="slotProps">
            <AddressColumn
              v-if="col.field === 'start' || col.field === 'end'"
              :data="col.field === 'start' ? slotProps.data.start : slotProps.data.end"
            />

            <div v-if="col.field === 'duration'">
              <p>{{ slotProps.data?.distance }} km</p>
              <p>{{ slotProps.data?.duration ? (slotProps.data.duration / 60000).toFixed(2) : 0 }} minutos</p>
            </div>

            <Button
              v-if="col.field === 'actions'"
              icon="pi pi-angle-right"
              severity="info"
              aria-label="open-trip"
              rounded
              @click="() => redirect(slotProps.data.id)"
            />
          </template>
        </Column>
      </template>
      
      <template #empty>
        <p class="table__empty">
          No se encontraron viajes
        </p>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import AddressColumn from './AddressColumn.vue';

  const props = defineProps({
    data: {
      type: Array,
      default: []
    },
  });

  const columns = [
    { field: 'start', header: 'Inicio' },
    { field: 'end', header: 'Término' },
    { field: 'duration', header: 'Distancia y tiempo' },
    { field: 'actions' }
  ]

  const router = useRouter();

  const filters = ref({
    start: '',
    end: ''
  });

  const filterData = computed(() => {
    let resData = [...props.data];
    
    if (filters.value.start) {
      resData = resData.filter((trip) => (
        trip.start.address.toLowerCase().includes(filters.value.start.toLowerCase())
      ));
    }

    if (filters.value.end) {
      resData = resData.filter((trip) => (
        trip.end.address.toLowerCase().includes(filters.value.end.toLowerCase())
      ));
    }

    return resData;
  });

  const clearFilters = () => {
    filters.value = {
      start: '',
      end: ''
    }
  }

  const redirect = (tripId) => {
    router.push(`/trips/${tripId}`);
  }
</script>