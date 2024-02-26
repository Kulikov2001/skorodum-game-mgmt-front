<template>
    <div class="wrapper">
        <ol class="list">
            <li v-for="(item, key) in mock" :key="key" class="list__item">
                <div class="list__wrapper">
                    <div class="list__info">
                        <span class="title">{{ item.name }}</span>
                        <span class="date"> | {{ item.date }}</span>
                        <span v-if="item.isDraft" class="draft">черновик</span>
                    </div>
                    <div class="btns__wrapper">
                        <span class="btn download"><DownloadBtn width="19" /></span>
                        <span class="btn delete"><DeleteBtn width="18" /></span>
                        <span class="btn share"><ShareBtn width="16" /></span>
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
const mock = [
    {
        name: 'ЦАРЬ-ПЛОТНИК (старшая группа)',
        date: '2021-08-27',
        isDraft: false
    },
    {
        name: 'ЦАРЬ-ПЛОТНИК (старшая группа)',
        date: '2021-08-27',
        isDraft: false
    },
    {
        name: 'ЦАРЬ-ПЛОТНИК (старшая группа)',
        date: '2021-08-27',
        isDraft: false
    },
    {
        name: 'ЦАРЬ-ПЛОТНИК (старшая группа)',
        date: '2021-08-27',
        isDraft: false
    },
    {
        name: 'ЦАРЬ-ПЛОТНИК (старшая группа)',
        date: '2021-08-27',
        isDraft: false
    },
    {
        name: 'ЦАРЬ-ПЛОТНИК (старшая группа)',
        date: '2021-08-27',
        isDraft: false
    },
    {
        name: 'ЦАРЬ-ПЛОТНИК (старшая группа)',
        date: '2021-08-27',
        isDraft: false
    }
]
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
</style>
