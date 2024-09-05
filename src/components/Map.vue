<script setup lang="ts">
import { LMap, LMarker, LTileLayer } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { toRef } from "vue";
import IconLocationSVG from '../assets/icon-location.svg';
import { LIcon } from "@vue-leaflet/vue-leaflet";

const props = defineProps({
    lat: { type: Number, required: true },
    lon: { type: Number, required: true }
})

const lat = toRef(props, 'lat')
const lon = toRef(props, 'lon')
</script>

<template>
    <div class="w-full h-full">
        <l-map class="z-0" draggable="false" ref="map" :zoom=8 :center="[lat, lon]" :use-global-leaflet="false">
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
                name="OpenStreetMap"></l-tile-layer>
            <l-marker :draggable="false" :lat-lng="[lat, lon]" :visible="true">
                <l-icon :icon-url="IconLocationSVG" />
            </l-marker>
        </l-map>
    </div>
</template>