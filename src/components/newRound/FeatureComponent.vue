<template>
    <div class="wrapper">
        <div v-if="props.ico === 'time'" class="icon">
            <TimeIco />
        </div>
        <h2>&laquo;{{ props.title }}&raquo;</h2>
        <div class="increaser-container">
            <span class="minus" @click="feaMinus">&minus;</span>
            <span class="number">{{ featureVal }}</span>
            <span class="plus" @click="feaPlus">&plus;</span>
        </div>
        <div v-if="props.desc" class="desc">{{ props.desc }}</div>
    </div>
</template>
<style scoped>
*{
    user-select: none;
}
.wrapper {
    display: inline-block;
    color: var(--text-darker);
    padding: 2em;
    text-align: center;
    background-color: white;
    margin: 1em;
    border-radius: 1em;
}
h2 {
    text-align: center;
    font-weight: 500;
}
.increaser-container {
    text-align: center;
    font-weight: bold;
    font-size: 2em;
}
.increaser-container span {
    font-weight: 700;
    padding: 0.5em 0.5em 0.3em 0.5em;
    border-bottom: 1px solid var(--text-darker);
}
.number {
    color: black;
}
.minus,
.plus {
    cursor: pointer;
}
.desc {
    margin-top: 2em;
}
</style>
<script setup lang="ts">
import {onMounted, ref} from 'vue'
import TimeIco from '@/assets/TimeIco.vue';
const props = defineProps<{
    title: string
    max: number
    min: number
    default: number
    desc: string
    ico?: any
    increase: number
}>();
//const featureVal = ref(props.default);
const featureVal = defineModel({default: 0});
onMounted(()=>{
    featureVal.value = props.default;
})
const feaMinus = async() =>{
    ((featureVal.value - props.increase) >= props.min) ? featureVal.value -= props.increase : 0;
}
const feaPlus = async() =>{
    ((featureVal.value + props.increase) <= props.max) ? featureVal.value += props.increase : 0;
}

</script>
