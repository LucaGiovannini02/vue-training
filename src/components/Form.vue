<script setup lang="ts">
import arrow from '../assets/icon-arrow.svg'

const emit = defineEmits(['submit:value'])
let input = ""

const mySubmit = () => {
    emit('submit:value', input)
}
</script>

<template>
    <form @submit.prevent="mySubmit" class="w-[90%] lg:w-auto">
        <div class="flex h-[50px] rounded-xl overflow-hidden">
            <input v-model="input" type="text h-full" placeholder="Search for any IP address or domain" class="w-full lg:w-[400px] px-4 lg:px-6" />
            <button type="submit" class="bg-black px-4 rounded-r-xl">
                <img :src="arrow" alt="right-arrow">
            </button>
        </div>
    </form>
</template>