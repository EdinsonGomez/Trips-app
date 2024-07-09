<template>
  <div class="trip">
    <div>
      <Button
        icon="pi pi-arrow-left"
        label="Ver viajes"
        aria-label="back-trip"
        text
        @click="onClick"
      />
    </div>
    <div id="map" class="trip__map" />
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { getTripByIdService } from '@/services/trips';
  import { useToast } from 'primevue/usetoast';
  import { useRoute, useRouter } from 'vue-router';
  import { drawPolygon, loadMap, loadMarkers } from '@/utils/mapsHelper';

  const route = useRoute();
  const router = useRouter();
  const toast = useToast();

  const tripData = ref({});
  const maps = ref(null);

  const onClick = () => {
    router.push('/');
  }

  const drawMarkers = async () => {
    const dataMarkers = [];

    if (tripData.value?.start && tripData.value?.start?.lat && tripData.value?.start?.lon) {
      dataMarkers.push({
        lat: tripData.value.start.lat,
        lon: tripData.value.start.lon,
        key: 'start',
        title: 'Inicio',
      });
    };

    if (tripData.value?.end && tripData.value?.end?.lat && tripData.value?.end?.lon) {
      dataMarkers.push({
        lat: tripData.value.end.lat,
        lon: tripData.value.end.lon,
        key: 'end',
        title: 'Fin',
      });
    };

    await loadMarkers(dataMarkers, maps.value);
    
    maps.value.setCenter({
      lat: tripData.value.start.lat,
      lng: tripData.value.start.lon
    });
  }

  const initMap = async () => {
    if (!maps.value) {
      const thisMap = await loadMap('map');
      maps.value = thisMap;
    };

    drawMarkers();
    
    if (tripData.value?.boundingBox?.length) {
      const paths = tripData.value.boundingBox.map((p) => ({
        lat: p.lat,
        lng: p.lon
      }));

      drawPolygon(paths, maps.value);
    }
  };

  const fetchTripData = async () => {
    try {
      if (!route.params.id) return;

      const res = await getTripByIdService(route.params.id);

      tripData.value = res;
      initMap();
    } catch(error) {
      console.log('[Trip Details error]: ', error);
    }
  };
  
  onMounted(() => {
    fetchTripData();
  })
</script>

<style lang="scss">
  .map {
    width: 90vw;
    height: 90vh;
  }
</style>