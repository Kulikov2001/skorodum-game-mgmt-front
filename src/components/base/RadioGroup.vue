<template>
    <input type="radio" hidden class="radiogroup" v-model="modelValue" />
    <MyRadio
        v-for="(item, key) in props.data"
        :key="key"
        :val="item.val"
        :checked="isChecked(item.val)"
        class="myradio"
        @click="provideCheck(props.data[key])"
    >
        {{ item.label }}
    </MyRadio>
</template>
<style scoped></style>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import MyRadio from '@/components/base/MyRadio.vue'
const props = defineProps<{
    data: any[]
}>()
const modelValue = defineModel()
const provideCheck = (selected: any) => {
    modelValue.value = selected.val
}

function isChecked(itemval: string) {
    return itemval === modelValue.value
}
</script>
