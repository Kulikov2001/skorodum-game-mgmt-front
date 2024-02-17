import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/layouts/MainLayout.vue'),
            meta: { title: 'Скородум' },
            children: [
                {
                    path: '/new',
                    name: 'Новая игра',
                    component: () => import('@/pages/NewPage.vue')
                },
                {
                    path: '/new/round',
                    name: 'Новый раунд',
                    component: () => import('@/pages/NewRound.vue')
                },
                {
                    path: '/all',
                    name: 'Все игры',
                    component: () => import('@/pages/AllPage.vue')
                }
            ]
        },
        {
            path: '/bank',
            name: 'Банк вопросов',
            component: () => import('@/layouts/MainLayout.vue'),
            children: [
                {
                    path: '',
                    name: 'Банк',
                    component: () => import('@/pages/BankPage.vue')
                }
            ]
        }
    ]
})

export default router
