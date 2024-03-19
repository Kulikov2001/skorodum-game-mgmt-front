<template>
    <div class="wrapper">
        <InputComponent placeholder="Напишите вопрос" v-model="questionName" />
        <QuestionMediaComponent />
        <div class="accordion__wrapper">
            <!-- TODO: Здесь тоже индусятину убрать-->
            <AccordionItem
                class="create-q-accord"
                :title="'Открытый вопрос'"
                :is-open="activeAccordionElem.includes('Открытый') ? true : false"
                @titleClick="toggleAccordion('Открытый')"
            >
                <OpenQuestionComponent
                    :class="{ active: activeAccordionElem.includes('Открытый') }"
                />
            </AccordionItem>

            <AccordionItem
                class="create-q-accord"
                :title="'Закрытый вопрос'"
                :is-open="activeAccordionElem.includes('Закрытый') ? true : false"
                @title-click="toggleAccordion('Закрытый')"
            >
                <ClosedQuestionComponent
                    v-model="test"
                    :class="{ active: activeAccordionElem.includes('Закрытый') }"
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
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/game'
const test = ref<any>(null)

const store = useGameStore()

const questionName = computed({
    get: () => {
        return store.currentQuestion.question ?? ''
    },
    set: (val: string) => {
        store.currentQuestion.question = val
    }
})

import type { IMedia } from '@/stores/game'
const qmedia: IMedia = {
    id: 1,
    show_image: true,
    video: {
        before: 'mybeforevide.mp4',
        after: 'myaftervideo.mp4'
    },
    image: {
        before: '',
        after: '',
        player_displayed: false
    }
}
const activeAccordionElem = ref<string[]>(['Закрытый'])
const toggleAccordion = (val: string) => {
    if (activeAccordionElem.value.includes(val)) {
        activeAccordionElem.value = activeAccordionElem.value.filter((item) => item != val)
    } else {
        activeAccordionElem.value.push(val)
    }
}
</script>
<style scoped>
.create-q-accord {
    background-color: white;
    margin: 1em auto;
}
.wrapper {
    transition: max-height 2s ease;
    overflow: hidden;
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
