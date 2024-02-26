<template>
<div class="card">
  <h2 class="title">{{props.title}}</h2>
</div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue';
const props = defineProps({
  foo: String
})
</script>

<style scoped>

</style>