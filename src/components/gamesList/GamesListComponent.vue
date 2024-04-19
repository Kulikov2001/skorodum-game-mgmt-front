<template>
    <NotificationComponent v-model="store.globalNotification" />
    <UploadJSON @reloadrequired="store.getGamesNames()"/>
    <div class="wrapper">
        <ol class="list">
            <li v-for="(item, key) in store.allGames" :key="key" class="list__item">
                <div class="list__wrapper">
                    <div class="list__info" @click="handleRowClick(item.id)">
                        <span class="title">{{ item.game_info.name }}</span>
                        <span class="date"> | {{ item.game_info.date }}</span>
                        <span v-if="item.isDraft" class="draft">черновик</span>
                    </div>
                    <div class="btns__wrapper">
                        <a style="color: var(--main);" download :href="config.urls.download.word + item.id + '/'">Word</a>
                        <span @click="handleDownloadBtn(item.id)" class="btn download"
                            ><DownloadBtn width="19"
                        /></span>
                        <span @click="handleDeleteBtn(item.id)" class="btn delete"
                            ><DeleteBtn width="18"
                        /></span>
                        <span @click="handleShareBtn(item.id)" class="btn share"
                            ><ShareBtn width="16"
                        /></span>
                    </div>
                </div>
            </li>
        </ol>
    </div>
</template>

<script setup lang="ts">
import DownloadBtn from '@/assets/DownloadBtn.vue'
import DeleteBtn from '@/assets/DeleteBtn.vue'
import ShareBtn from '@/assets/ShareBtn.vue'
import { useGameStore } from '@/stores/game'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NotificationComponent from '@/components/base/NotificationComponent.vue'
import UploadJSON from "@/components/base/UploadJSON.vue";
import {config} from "@/config";
const store: any = useGameStore()
const router = useRouter()
//const myconfig = config;
onMounted(() => {
    store.getGamesNames()
})
const handleWordBtn = async(_id: number) => {
    await store.downloadWordGame(_id)
}
const handleDownloadBtn = async (_id: number) => {
    store.downloadGame(_id)
}
const handleDeleteBtn = (_id: number) => {
     store.deleteGame(_id)
     store.getGamesNames()
}
const handleShareBtn = async (_id: number) => {
    alert('Действие зарезервировано')
}
const handleRowClick = async (_id: number) => {
    router.push('/games/' + _id + '/')
}
</script>

<style scoped>
.list__wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.list__item {
    padding: 1em;
    color: black;
}
.date {
    color: var(--text-darker);
    font-size: 0.9em;
}
.btn {
    stroke: var(--text-grey);
    padding: 0.65em;
    cursor: pointer;
}
.list__item:nth-child(even) {
    background: #f8f9fb;
}
@media screen and(min-width:500px) {
    .btns__wrapper {
        display: grid;
        grid-template-columns: repeat(1fr);
    }
    .btn {
        padding: 0 !important;
    }
    :deep(main) {
        width: 100%;
    }
    .list__wrapper,
    .list__item {
        margin-right: 0;
    }
}
</style>
