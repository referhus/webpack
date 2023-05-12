import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import {store} from './store';

import Index from './vue_pages/Index.vue';
import reload from './vue_pages/reload.vue'

const routes = [
    {
        path: '',
        name: 'home',
        component: Index,
        meta: {
            requiresAuth: false,
            title: '«Эй, Ньютон!» — Исключительно современный ум'
        }
    },
    {
        path: '/reload',
        name: 'reload',
        component: reload,
        meta: {
            requiresAuth: false,
            title: '«Эй, Ньютон!»'
        }
    },
];

export const router = new VueRouter({
    routes,
    base: '/',
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        if((to.name !== from.name)){
            if (savedPosition) {
                return savedPosition
            } else {
                return { x: 0, y: 0 }
            }
        } else{
            if(to.params.id){
                if(to.params.id !== from.params.id){
                    if (savedPosition) {
                        return savedPosition
                    } else {
                        return { x: 0, y: 0 }
                    }
                }
            }
        }
    }
});

router.beforeEach((to, from, next) => {
    store.dispatch('menuClose');

    let count = 0;
    store.dispatch('locale/LoadLocale').then(()=>{

        store.dispatch('handbook/LoadSocials').then(() => {
            count++;
            RunNext();
        });

        store.dispatch('staticText/LoadDefaultText').then(() => {
            count++;
            RunNext();
        });
    });

    let RunNext = () => {
        if(count > 1){
            store.dispatch('profile/HasAuth').then((e) => {
                next();
            });
        }
    }
});
