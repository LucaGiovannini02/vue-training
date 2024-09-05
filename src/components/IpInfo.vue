<script setup lang="ts">
import { toRef } from 'vue';
import InfoCard from './InfoCard.vue';
const props = defineProps({
    ip: { type: String, required: true },
    location: { type: String, required: true },
    timezone: { type: String, required: true },
    isp: { type: String, required: true }
})

const ip = toRef(props, 'ip')
const location = toRef(props, 'location')
const timezone = toRef(props, 'timezone')
const isp = toRef(props, 'isp')
</script>

<template>
    <div class="text-center lg:flex rounded-2xl overflow-hidden">
        <InfoCard title="IP ADRRESS" :content="ip" :skeleton="ip == ''" />

        <InfoCard title="LOCATION" :content="location" :skeleton="location == ''" />

        <InfoCard title="TIMEZONE" :content="timezone" :skeleton="timezone == ''"/>
        
        <InfoCard title="ISP" :content="isp" :skeleton="isp == '' && ip == ''" :margin="false" />
    </div>
</template>