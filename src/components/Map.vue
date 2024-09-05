<script setup lang="ts">
import { LIcon, LMap, LMarker, LTileLayer } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { toRef } from "vue";
import { Vue3Lottie } from "vue3-lottie";
import AnimationLottie from "../assets/Animation.json";
import IconLocationSVG from '../assets/icon-location.svg';

const props = defineProps({
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    loading: { type: Boolean, default: false }
})

const lat = toRef(props, 'lat')
const lon = toRef(props, 'lon')
const loading = toRef(props, 'loading')
</script>

<template>
    <div class="relative w-full h-full">
        <div v-if="loading" class="w-full h-full absolute top-0 left-0 z-10 flex justify-center items-center bg-gray-200 bg-opacity-70">
            <Vue3Lottie :animation-data="AnimationLottie" :height="200" :width="200" />
        </div>
        <div class="w-full h-full">
            <l-map class="z-0" draggable="false" ref="map" :zoom=8 :center="[lat, lon]" :use-global-leaflet="false">
                <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
                    name="OpenStreetMap"></l-tile-layer>
                <l-marker v-if="!loading" :draggable="false" :lat-lng="[lat, lon]" :visible="true">
                    <l-icon :icon-url="IconLocationSVG" />
                </l-marker>
            </l-map>
        </div>
    </div>
</template>