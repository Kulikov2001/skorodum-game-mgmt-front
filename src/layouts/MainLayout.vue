<template>
    <div class="main__wrapper" :class="[$route.path === '/bank' ? 'bank' : '']">
        <LogoComponent />
        <MenuComponent />
        <main>
            <router-view v-slot="{ Component }">
                <transition name="fade" :duration="150">
                    <component :is="Component" />
                </transition>
            </router-view>
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
            case '/games':
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
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

</style>

<style v-if="$route.path === '/bank'">
@media screen and (max-width: 600px){
    .main__wrapper.bank{
        padding:0 !important;
    }
}
</style>