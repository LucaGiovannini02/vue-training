<script setup lang="ts">
import { toRef } from 'vue';

const props = defineProps({
    margin: { type: Boolean, default: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    skeleton: { type: Boolean, default: false }
})

const title = props.title
const margin = props.margin
const content = toRef(props, 'content')
</script>

<template>
    <div class="flex flex-col bg-white min-h-[90px] lg:min-h-[150px] w-[350px] md:w-[500px] lg:w-[250px] p-4 lg:p-8 relative">
        <div class="text-sm font-semibold text-gray-500">
            <div v-if="!skeleton">
                {{ title }}
            </div>

            <div v-else class="w-full h-6 animate-pulse">
                <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-300"></div>
            </div>
        </div>


        <div class="text-2xl font-semibold pt-2">
            <div v-if="!skeleton && content != ''">
                {{ content }}
            </div>

            <div v-else-if="!skeleton">
                /
            </div>

            <div v-else class="w-full h-6 animate-pulse">
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300"></div>
            </div>
        </div>

        <div v-if="margin" class="hidden lg:flex h-full items-center w-[1px] absolute right-0 top-0">
            <div class="h-[75px] w-full bg-gray-400 opacity-40"></div>
        </div>
    </div>
</template>