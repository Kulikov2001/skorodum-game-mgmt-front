import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/layouts/MainLayout.vue'),
            meta: { title: 'Скородум',transition: 'slide-left'},
            children: [
                {
                    path: '/new',
                    name: 'Новая игра',
                    meta: { title: 'Скородум',transition: 'slide-left'},
                    component: () => import('@/pages/NewPage.vue')
                },
                {
                    path: '/new/round',
                    name: 'Новый раунд',
                    meta: { title: 'Скородум',transition: 'slide-left'},
                    component: () => import('@/pages/NewRoundPage.vue')
                },
                {
                    path: '/bank',
                    name: 'Новый раунд',
                    meta: { title: 'Скородум',transition: 'slide-left'},
                    component: () => import('@/pages/BankPage.vue')
                },
            ]
        },
        {
            path: '/all',
            name: 'Все игры',
            component: () => import('@/layouts/MainLayout.vue'),
            meta: { title: 'Скородум',transition: 'slide-left'},
            children: [
                {
                    path: '',
                    name: 'Все игры',
                    component: () => import('@/pages/AllPage.vue')
                }
            ]
        },
        {
            path: '/bank',
            name: 'Банк',
            component: () => import('@/layouts/MainLayout.vue'),
            meta: { title: 'Скородум',transition: 'slide-left'},
            children: [
                {
                    path: '/bank',
                    name: 'Банк',
                    component: () => import('@/pages/BankPage.vue')
                }
            ]
        },
        {
            path: '/bank/settigns',
            name: 'Банк вопросов',
            component: () => import('@/layouts/MainLayout.vue'),
            meta: { title: 'Скородум',transition: 'slide-left'},
            children: [
                {
                    path: '/bank/settings',
                    name: 'Банк',
                    component: () => import('@/pages/CategorySettingsPage.vue')
                }
            ]
        }
    ]
});

export default router
