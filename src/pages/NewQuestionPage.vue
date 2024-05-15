<template>
    <div>
        <NotificationComponent v-model="store.globalNotification" />
        <TitleBarComponent :title="'Новый вопрос'" :back="['Вернуться к банку вопросов', '/bank']" />
        <CreateQuestionComponent :hideBtn="true" :class="{ active: activeAccordionElem.includes('Создать') }" />

        <ButtonsBarComponent
                @save="handleSave"
                @cancel="handleCancel"
                @share="handleShare"
                :save="true"
                :cancel="true"
                :share="true"
        />
    </div>
</template>
<script setup lang="ts">
import ButtonsBarComponent from '@/components/base/ButtonsBarComponent.vue'
import TitleBarComponent from '@/components/base/TitleBarComponent.vue'
import CreateQuestionComponent from '@/components/newRound/CreateQuestionComponent.vue'
import { onMounted, ref } from 'vue'
import { useGameStore} from '@/stores/game'
import type {IRound} from '@/stores/game'
import NotificationComponent from '@/components/base/NotificationComponent.vue'
import {useRouter} from "vue-router";
const router = useRouter();
const store = useGameStore()
const activeAccordionElem = ref<string[]>(['Создать', 'Банк'])
const toggleAccordion = (val: string) => {
    if (activeAccordionElem.value.includes(val)) {
        activeAccordionElem.value = activeAccordionElem.value.filter((item) => item != val)
    } else {
        activeAccordionElem.value.push(val)
    }
}

const handleSave = async() => {
    if (router.currentRoute.value.params.id){
       await store.updateQuestion(parseInt(router.currentRoute.value.params.id[0]));
    } else {
       await store.createQuestion().then((res)=> console.log(res));
    }
}
const handleCancel = () => {
    store.clearRound()
    store.clearQuestion()
}
const handleShare = async() => {
    const shareData = {
        title: `${store.currentQuestion.question}`,
        text: "Посмотри мой вопрос скородум!",
        url: `${window.location.href}`,
    };
    try {
        await navigator.share(shareData);
    } catch (e) {
        console.error(e);
    }
}
</script>
<style scoped>
.bigelem {
    margin: 1em auto;
}
.bigelem .accord {
    background-color: white;
}
</style>
