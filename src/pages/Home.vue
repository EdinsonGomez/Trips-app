<template>
  <div class="tabs">
    <Tabs value="0">
      <TabList>
        <Tab value="0">Viajes</Tab>
      </TabList>
  
      <TabPanels>
        <TabPanel value="0">
          <TripsTable :data="tripsList" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { useToast } from 'primevue/usetoast';
  import { getTripsService } from '@/services/trips';
  import TripsTable from '@/components/trips/TripsTable.vue';

  const toast = useToast();
  const tripsList = ref([]);

  const fetchTrips = async () => {
      try {
        const res = await getTripsService();
  
        tripsList.value = res.trips;
      } catch(error) {
        console.log('[Trips error]: ', error);
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: error?.message ?? 'No se ha podido obtener los viajes en estos momentos, intente de nuevo',
          life: 10000,
        });
      }
    }

  onMounted(() => {
    fetchTrips();
  })
</script>