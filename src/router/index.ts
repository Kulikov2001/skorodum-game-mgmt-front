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
                }
            ]
        },
        {
            path: '/new/round',
            name: 'Новый раунд',
            component: () => import('@/layouts/MainLayout.vue'),
            meta: { title: 'Скородум'},
            children: [
                {
                    path: '/new/round',
                    name: 'Новый раунд',
                    meta: { title: 'Скородум',transition: 'slide-left'},
                    component: () => import('@/pages/NewRoundPage.vue')
                }
            ]
        },
        {
            path: '/games',
            name: 'Все игры',
            component: () => import('@/layouts/MainLayout.vue'),
            meta: { title: 'Скородум'},
            children: [
                {
                    path: '',
                    name: 'Все игры',
                    component: () => import('@/pages/AllPage.vue')
                },
                {
                    path: ':id',
                    name: 'Конкретная игра',
                    component: () => import('@/pages/CurrentGamePage.vue'),
                    props: true
                },
            ]
        },
        {
            path: '/game/',
            name: 'Раунд',
            component: () => import('@/layouts/MainLayout.vue'),
            meta: { title: 'Раунд'},
            children: [
                {
                    path: '/bank/settings',
                    name: 'Настройки категорий',
                    component: () => import('@/pages/CurrentGamePage.vue')
                }
            ]
        },
        {
            path: '/bank',
            name: 'Банк',
            component: () => import('@/layouts/MainLayout.vue'),
            meta: { title: 'Банк'},
            children: [
                {
                    path: '',
                    name: 'Банк',
                    component: () => import('@/pages/BankPage.vue')
                },
                {
                    path: '/bank/settings',
                    name: 'Настройки категорий',
                    component: () => import('@/pages/CategorySettingsPage.vue')
                }
            ]
        },
    ]
});

export default router
