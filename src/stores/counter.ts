import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGeneratorStore = defineStore('generator', () => {
    const count = ref(0)

    return {}
})
