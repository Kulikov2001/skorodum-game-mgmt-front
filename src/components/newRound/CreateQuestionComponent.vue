<template>
    <div class="wrapper">
        <InputComponent placeholder="Напишите вопрос" v-model="questionName" />
        <QuestionMediaComponent @uploaded="handleUploaded($data)" />
        <div class="accordion__wrapper">
            <!-- TODO: Здесь тоже индусятину убрать-->
            <AccordionItem
                class="create-q-accord"
                :title="'Открытый вопрос'"
                :is-open="!closedQuestionAccordioned"
                @titleClick="toggleAccordion('Открытый')"
            > <!--  :is-open="activeAccordionElem.includes('Открытый') ? true : false" -->
                <OpenQuestionComponent
                    :class="{ active: !closedQuestionAccordioned }"
                    :hideBtn="hideBtn"
                />
            </AccordionItem>

            <AccordionItem
                class="create-q-accord"
                :title="'Закрытый вопрос'"
                :is-open="closedQuestionAccordioned"
                @title-click="toggleAccordion('Закрытый')"
            ><!-- :is-open="activeAccordionElem.includes('Закрытый') ? true : false" -->
                <ClosedQuestionComponent
                    :class="{ active: closedQuestionAccordioned }"
                    :hideBtn="hideBtn"
                />
            </AccordionItem>
        </div>
    </div>
</template>
<script setup lang="ts">
import QuestionMediaComponent from '@/components/question/QuestionMediaComponent.vue'
import InputComponent from '@/components/base/InputComponent.vue'
import AccordionItem from '@/components/Accordion/AccordionComponent.vue'
import ClosedQuestionComponent from '@/components/question/ClosedQuestionComponent.vue'
import OpenQuestionComponent from '@/components/question/OpenQuestionComponent.vue'
import {ref, computed, watch, onMounted, onUnmounted} from 'vue'
import { useGameStore} from '@/stores/game'
import type {IQuestion} from '@/stores/game'
const router = useRouter();
const store = useGameStore()
const props = defineProps<{
    hideBtn?: boolean;
}>();
const questionName = computed({
    get: () => {
        return store.currentQuestion.question ?? ''
    },
    set: (val: string) => {
        store.currentQuestion.question = val
    }
})
const handleUploaded = async(data: any) => {
    console.info(data);
}
const hideBtn = ref<boolean>(props.hideBtn);
import type { IMedia } from '@/stores/game'
import {useRouter} from "vue-router";

const closedQuestionAccordioned = ref<boolean>(true);
const activeAccordionElem = ref<string[]>(['Закрытый'])
const toggleAccordion = (val: string) => {
    // if (activeAccordionElem.value.includes(val)) {
    //     activeAccordionElem.value = activeAccordionElem.value.filter((item) => item != val)
    // } else {
    //     activeAccordionElem.value.push(val)
    // }
    closedQuestionAccordioned.value = !closedQuestionAccordioned.value;
}
watch(closedQuestionAccordioned, (newVal: boolean) => {
    if (newVal){
        store.currentQuestion.type = 'select'
    } else {
        store.currentQuestion.type = 'text'
    }
});

onMounted(()=>{
    store.clearQuestion()
    if (router.currentRoute.value.params.id) {
        let _id = router.currentRoute.value.params.id
        switch (typeof _id) {
            case 'string':
                break
            case 'object':
                _id = _id[0]
                break
        }
        let parsedId = parseInt(_id)
        if (typeof parsedId === 'number') {
            store.getQuestion(parsedId).then((res: IQuestion)=>{store.currentQuestion = res});
        }
    }
})
onUnmounted(()=>{
    store.clearQuestion();
})
</script>
<style scoped>
.create-q-accord {
    background-color: white;
    margin: 1em auto;
}
.wrapper {
    transition: max-height 2s ease;
    overflow: hidden;
    padding: 1em;
}
.wrapper:not(.active) {
    max-height: 0;
}
.wrapper.active {
    max-height: none !important;
}
.accordion__wrapper :deep(h2) {
    color: var(--text-darker);
    font-size: 1.25em;
}
</style>
