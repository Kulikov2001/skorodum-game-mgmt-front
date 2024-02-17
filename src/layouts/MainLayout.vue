<template>
    <div class="main__wrapper">
        <LogoComponent />
        <MenuComponent />
        <main>
            <router-view />
        </main>
    </div>
</template>
<script setup lang="ts">
import LogoComponent from '@/components/base/LogoComponent.vue'
import MenuComponent from '@/components/base/MenuComponent.vue'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
const route = useRoute()
console.log(route.fullPath)
watch(
    () => route.fullPath,
    (newPath) => {
        switch (newPath) {
            case '/':
                break
            case '/new':
                break
            case '/all':
                break
        }
    }
)
</script>
<style scoped>
.main__wrapper {
    background: var(--color-underlay);
    padding: 2em;
}
main {
    margin-top: 3em;
}
</style>
