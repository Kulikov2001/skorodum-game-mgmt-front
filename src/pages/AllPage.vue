<template>
    
    <div class="wrapper">
        <h1>Все игры</h1>
        <GamesListComponent />
    </div>
</template>
<script setup lang="ts">
import GamesListComponent from '@/components/gamesList/GamesListComponent.vue';


</script>
<style scoped>
h1 {
    text-align: center;
    font-weight: bold;
}
.wrapper {

}
</style>
