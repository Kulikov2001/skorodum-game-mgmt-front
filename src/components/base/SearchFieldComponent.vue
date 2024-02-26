<template>
    <div class="search-wrapper">
        <span class="search-zoom">
            <SearchLoop />
        </span>
    </div>
    <InputComponent
        class="search-field"
        :placeholder="'Поиск по категориям'"
        v-model="searchText"
    />
</template>

<script setup lang="ts">
import InputComponent from '@/components/base/InputComponent.vue'
import SearchLoop from '@/assets/SeachLoop.vue'
import { ref } from 'vue'

const searchText = ref('')
</script>

<style scoped>
.search-field {
    text-align: left;
    padding: 1em 1em 1em 3em;
    width: 40%;
}
.search-wrapper {
    position: relative;
}
.search-field::placeholder {
    text-align: left;
    text-transform: none;
    font-weight: 500;
}
.search-field :deep(input) {
}
.search-zoom {
    position: absolute;
    z-index: 1;
    top: 0.8em;
    left: 0.7em;
    max-width: 1em !important;
    display: block;
}
</style>
