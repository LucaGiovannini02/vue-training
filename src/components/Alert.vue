<script setup lang="ts">
import { toRef } from 'vue';

const props = defineProps({ message: String, show: Boolean })
const message = toRef(props, 'message')
</script>

<template>
    <div class="absolute bottom-4 left-4 font-light bg-red-400 bg-opacity-90 px-4 py-2 min-w-64 rounded-lg">
        {{ message }}
    </div>
</template>