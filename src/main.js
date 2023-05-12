import Vue from 'vue'
import App from './vue_pages/App.vue'

import {store} from './store'
import {router} from './routes'
import {mapGetters} from 'vuex'

import './js/device.min'

import VueCookie from 'vue-cookie'
import VueResource from 'vue-resource'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueStickyKit from 'vue-stickykit'
import YmapPlugin from 'vue-yandex-maps'
import VueTextareaAutosize from 'vue-textarea-autosize'

import vSelect from 'vue-select'
import Search from './vue_components/Search.vue'

import Vue2TouchEvents from 'vue2-touch-events'

Vue.use(VueCookie);
Vue.use(VueResource);
Vue.use(VueAwesomeSwiper);
Vue.use(VueStickyKit);
Vue.use(YmapPlugin);
Vue.use(VueTextareaAutosize);
Vue.use(Vue2TouchEvents)

Vue.component('v-select', vSelect);
Vue.component('cmp-search', Search);

Date.prototype.daysInMonth = function() {
    return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};

new Vue({
    store,
    router,
    el: '#app',
    render: h => h(App),
    computed: {
        ...mapGetters('profile', ['hasAuth']),
        ...mapGetters(['hasAuth'])
    },
    methods: {
        getCoords(elem) {
            let box = elem.getBoundingClientRect();
            let body = document.body;
            let docEl = document.documentElement;

            let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
            let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

            let clientTop = docEl.clientTop || body.clientTop || 0;
            let clientLeft = docEl.clientLeft || body.clientLeft || 0;

            let top = box.top + scrollTop - clientTop;
            let left = box.left + scrollLeft - clientLeft;

            return {
                top: top,
                left: left
            };
        },

        resize(){
            device.mobile() || window.innerWidth < 770 ?
                store.dispatch('updateMobileState', true) :
                store.dispatch('updateMobileState', false);

        },
        CloseMenuServ(e){
            let menu = document.querySelector('.t-headerMenu');
            if(menu !== null){
                let target = e.target;
                let its_menu = target === menu || menu.contains(target);
                if (!its_menu && (store.getters.menuState || store.getters.menuState_profile)) {
                    store.dispatch('menuClose')
                }
            }
        },
        CloseFilter(e){
            let filter = document.querySelector('.t-filter');
            if(filter !== null){
                let target = e.target;
                let its_filter = target === filter || filter.contains(target);
                if (!its_filter && store.getters.filterState) {
                    store.dispatch('filterClose')
                }
            }
        },
        CloseSort(e){
            let sort = document.querySelector('.t-sort');
            if(sort !== null){
                let target = e.target;
                let its_sort = target === sort || sort.contains(target);
                if (!its_sort && store.getters.sortState) {
                    store.dispatch('sortClose')
                }
            }
        }
    },
    beforeCreate(){
        device.mobile() || window.innerWidth < 770 ?
            store.dispatch('updateMobileState', true) :
            store.dispatch('updateMobileState', false);

        window.onresize = () => {
            this.resize();
        };

        window.onscroll = () => {
            if(!this.mobile){
                let nav_pos = this.$root.getCoords(document.querySelector('footer')).top;

                let scrollTop = 0;

                try{
                    scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
                    let stop = scrollTop + window.innerHeight;

                    nav_pos >= stop ? store.dispatch('callbackSetNoAbsolute') : store.dispatch('callbackSetAbsolute');
                }
                catch (error){
                    store.dispatch('callbackSetNoAbsolute')
                }
            }
        };
    },
    mounted(){
        document.addEventListener('click', (e) => {
            this.CloseMenuServ(e);
            this.CloseFilter(e);
            this.CloseSort(e);
        });
    }
});


