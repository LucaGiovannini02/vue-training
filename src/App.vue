<script setup lang="ts">
import Form from './components/Form.vue';
import IpInfo from './components/IpInfo.vue';
import Map from './components/Map.vue';
import { onMounted, reactive, ref } from 'vue';
import { GeoAPI } from './utils/axios';
import { OpenStreetMapAPI } from './utils/axios';
import { GeoResponse } from './Models/GeoResponse';
import { OpenStreetMapResponse } from './Models/OpenStreetMapResponse';
import { isIP } from 'is-ip';
import isValidDomain from 'is-valid-domain';
import Alert from './components/Alert.vue';

let showError = ref(false)

const info = reactive({
  ip: '',
  location: '',
  timezone: '',
  isp: '',
})

const location = reactive({
  lat: 0,
  lon: 0
})

const getPosition = (ipOrDomain: string | null = null) => {
  let endpoint = "country"

  if (ipOrDomain != null && ipOrDomain != '') {
    if (isIP(ipOrDomain)) {
      endpoint += `?ipAddress=${ipOrDomain}`
    } else if (isValidDomain(ipOrDomain)) {
      endpoint += `?domain=${ipOrDomain}`
    } else {
      showError.value = true
      setTimeout(() => showError.value = false, 4000)
      return
    }
  }

  info.ip = ''
  info.location = ''
  info.timezone = ''
  info.isp = ''

  GeoAPI.get<GeoResponse>(endpoint).then((data) => {
    info.ip = data.data.ip
    info.location = data.data.location.region + ", " + data.data.location.country
    info.timezone = data.data.location.timezone
    info.isp = data.data.isp

    OpenStreetMapAPI.get<OpenStreetMapResponse>(`search?format=json&q=${info.location}`).then((data) => {
      location.lat = Number(data.data[0].lat)
      location.lon = Number(data.data[0].lon)
    })
  })
}

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
    <div class="absolute bottom-half z-10">
      <IpInfo :ip="info.ip" :location="info.location" :timezone="info.timezone" :isp="info.isp" />
    </div>
  </div>
  <div class="h-[75%] lg:h-[70%] w-full">
    <Map :lat="location.lat" :lon="location.lon" />
  </div>
  <Transition>
    <Alert v-if="showError" message="Invalid ip or domain" />
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