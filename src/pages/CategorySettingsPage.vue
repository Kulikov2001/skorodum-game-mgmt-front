<template>
    <Transition name="fade" mode="in-out">
        <NotificationComponent v-model="notification" v-if="notification.message" />
    </Transition>
    <h1>Настройки категорий</h1>
    <TransitionGroup tag="ul" move-class="good-slide">
        <li v-for="(item, key) in categories" :key="key">
            <div class="title" contenteditable="true" @keyup="handleChange($event, item)">
                {{ item.name }}
            </div>
            <div class="btns">
                <EditableIco class="btn" width="18" />
                <DeleteBtn @click="deleteCategory(item)" class="btn" width="18" />
            </div>
        </li>
    </TransitionGroup>
    <div class="addCat">
        <h3>Добавить новую категорию</h3>
        <InputComponent
            v-model="userinput"
            class="input-add"
            style="text-align: center; padding: 1.5em; margin: 1em auto"
            :placeholder="'Название категории'"
        />
        <button @click="createCategory" color="">Добавить</button>
    </div>
</template>

<script setup lang="ts">
import DeleteBtn from '@/assets/DeleteBtn.vue'
import EditableIco from '@/assets/EditableIco.vue'
import InputComponent from '@/components/base/InputComponent.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { config } from '@/config'
import { useGameStore } from '@/stores/game'
import NotificationComponent from '@/components/base/NotificationComponent.vue'
import type { INotification } from '@/components/base/NotificationComponent.vue'
import LoaderComponent from '@/components/base/LoaderComponent.vue'
const store = useGameStore()
const notification = ref<INotification>({
    isFixed: false,
    type: '',
    message: '',
    clear: () => {
        notification.value.message = ''
        notification.value.type = ''
        notification.value.isFixed = false
    }
})
const handleChange = async (event: Event, item: any) => {
    const newName = (event.target as HTMLDivElement).innerText
    await axios
        .patch(config.urls.update.category + item.id + '/', { name: newName })
        .catch(function (error) {
            notification.value.message = error.message
            notification.value.type = 'error'
        })
    await refreshCategories()
}
interface IItem {
    id: number
    name: string
}
const categories = ref<
    {
        id: number
        name: string
    }[]
>([{ id: -1, name: 'Нет данных' }])
const userinput = ref('')
const refreshCategories = async () => {
    await axios
        .get(config.urls.get.all.categories)
        .then(function (res) {
            if (res.status === 200) {
                categories.value = res.data
            } else {
                notification.value.message = res.data
                notification.value.type = 'error'
            }
        })
        .catch(function (error) {
            notification.value.message = error.message
            notification.value.type = 'error'
            setTimeout(() => refreshCategories(), 1500)
        })
}
const deleteCategory = async (item: IItem) => {
    await axios.delete(config.urls.delete.category + item.id + '/').catch(function (error) {
        if (error.response.status === 404) {
            notification.value.message = 'Категория ' + item.name + ' уже удалена'
            notification.value.type = 'error'
            notification.value.isFixed = true
            refreshCategories()
            setTimeout(() => notification.value.clear(), 2000)
        } else {
            notification.value.message = error.message
            notification.value.type = 'error'
        }
    })
    await refreshCategories()
}
const createCategory = async () => {
    if (userinput.value !== '') {
        await axios
            .post(config.urls.create.category, { name: userinput.value })
            .then(function (res) {
                if (res.status === 201) {
                    notification.value.message =
                        'Категория "' + res.data.name ?? '' + '" успешно добавлена'
                    notification.value.type = 'success'
                } else {
                    notification.value.message = res.data
                    notification.value.type = 'error'
                }
            })
            .catch(function (error) {
                notification.value.message = error.message
                notification.value.type = 'error'
            })
        await refreshCategories()
    }
}
onMounted(() => {
    refreshCategories()
})
</script>

<style scoped>
.btn {
    cursor: pointer;
}
.addCat {
    text-align: center;
}
h3 {
    font-weight: bold;
    margin: 0.5em;
    color: var(--text-darker);
}
.input-add :deep(input::placeholder) {
    text-align: left !important;
}
.v-enter-from {
    opacity: 0;
}
.v-enter-to {
    opacity: 1;
}
.v-enter-active,
.v-leave-active,
.good-slide {
    transition: all 1s;
}
.v-leave-active {
}
.v-leave-from {
    opacity: 1;
}
.v-leave-to {
    opacity: 0;
}
h1 {
    text-align: center;
    font-weight: bold;
}
ul {
    margin: 2em auto;
}
li {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--text-grey);
    padding: 0.5em;
}
.title {
    font-weight: 500;
    color: black;
}
.btns :deep(svg) {
    margin: 0 0.5em;
    stroke: var(--text-grey);
    stroke-width: 0.5;
}
</style>
