<template>
    <div class="category__wrapper">
        <h2>Категории</h2>
        <SearchFieldComponent @userinput="handleChange" v-model="searchText" :placeholder="'Поиск по категориям'" />

        <div class="checkboxes__wrapper">
            <MySwitchComponent
                v-for="category in searchResult"
                @click="handleCategoryClick(category)"
                :key="category.id"
                :class="{
                    active: categoryFormModel.selected.some((item) => item.name === category.name)
                }"
            >
                {{ category.name }}</MySwitchComponent
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import SearchFieldComponent from '@/components/base/SearchFieldComponent.vue'
import MySwitchComponent from '@/components/base/MySwitchComponent.vue'
import { config } from '@/config'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useGameStore } from '@/stores/game'

const store = useGameStore()
export interface ICategory {
    id: number
    name: string
}
const categoryFormModel = defineModel<{
    selected: ICategory[]
    searchText: string
}>({
    default: {
        selected: [],
        searchText: ''
    }
})

const handleCategoryClick = async (_data: ICategory) => {
    if (categoryFormModel.value.selected.some((already) => already.id === _data.id)) {
        categoryFormModel.value.selected = categoryFormModel.value.selected.filter(
            (already) => already.id !== _data.id
        )
    } else {
        categoryFormModel.value.selected.push(_data)
    }
}

const searchText = ref('')
const searchResult = ref<ICategory[]>([])
const handleChange = async () => {
    categoryFormModel.value.searchText = searchText.value
    axios
        .get(config.urls.search.categories + '?query=' + encodeURIComponent(searchText.value))
        .then(function (res) {
            if (res.status === 200) {
                searchResult.value = res.data.results
                categoryFormModel.value.selected.forEach(
                    (item) => !searchResult.value.includes(item) ?? searchResult.value.unshift(item)
                )
            }
        })
}
onMounted(() => {
    categoryFormModel.value.selected = store.getQuestionCategories()
})
</script>

<style scoped>
.checkboxes__wrapper {
    display: inline-flex;
    flex-wrap: wrap;
}
h2 {
    font-weight: 700;
    margin: 1em auto;
}
.category__wrapper {
    margin: 0.5em;
}
.vs-switch {
    width: 5em !important;
    min-height: 50px !important;
    font-size: 24px;
}
.item-on,
.item-off {
    min-width: 50px !important;
}
.vs-switch--circle {
    min-height: 50px !important;
}
@media screen and (max-width: 500px) {
    .checkboxes__wrapper {
        margin-top: 1em;
    }
    :deep(.checkbox__wrapper) {
        margin: 0.75em;
    }
}
</style>
