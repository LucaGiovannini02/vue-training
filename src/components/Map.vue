<script setup lang="ts">
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import IconLocationSVG from '../assets/icon-location.svg'
import { onMounted, ref, toRef } from "vue";
import L, { DivIcon } from "leaflet";

const props = defineProps({
    lat: { type: Number, required: true },
    lon: { type: Number, required: true }
})

const lat = toRef(props, 'lat')
const lon = toRef(props, 'lon')

const svgIcon = ref<DivIcon | null>(null);

onMounted(async () => {
  const response = await fetch(IconLocationSVG);
  const svgText = await response.text();

  svgIcon.value = L.divIcon({
    html: svgText,
    className: "",
    iconSize: [24, 40],
    iconAnchor: [12, 40],
  });
});
</script>

<template>
    <div class="w-full h-full">
        <l-map class="z-0" draggable="false" ref="map" :zoom=8 :center="[lat, lon]" :use-global-leaflet="false">
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
                name="OpenStreetMap"></l-tile-layer>
            <l-marker v-if="svgIcon" :icon="svgIcon" :draggable="false" :lat-lng="[lat, lon]" :visible="true" />
        </l-map>
    </div>
</template>