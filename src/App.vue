<script setup lang="ts">
import { onMounted } from 'vue';
import Alert from './components/Alert.vue';
import Form from './components/Form.vue';
import IpInfo from './components/IpInfo.vue';
import Map from './components/Map.vue';
import useGeoLocation from './composables/useGeoLocation';

const { info, location, getPosition, showError, errorMessage, pending } = useGeoLocation();

onMounted(() => {
  getPosition()
})
</script>

<template>
  <div
    class="h-[45%] lg:h-[30%] relative flex flex-col lg:justify-between py-8 items-center bg-[url(./assets/pattern-bg-mobile.png)] md:bg-[url(./assets/pattern-bg-desktop.png)] bg-cover bg-center">
    <h1 class="mb-8 md:mb-14 lg:mb-0 text-white text-3xl font-semibold">IP Address Tracker</h1>
    <Form @submit:value="getPosition($event)" />
    <div class="h-[50px]"></div>
    <div class="absolute bottom-half z-20">
      <IpInfo :ip="info.ip" :location="info.location" :timezone="info.timezone" :isp="info.isp" />
    </div>
  </div>
  <div class="h-[75%] lg:h-[70%] w-full">
    <Map :loading="pending" :lat="location.lat" :lon="location.lon" />
  </div>
  <Transition>
    <Alert v-if="showError" :message="errorMessage" />
  </Transition>
</template>

<style scoped>
.bottom-half {
  position: absolute;
  bottom: 0px;
  transform: translateY(50%);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>