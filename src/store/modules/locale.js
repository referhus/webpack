import Vue from 'vue'
import {router} from '../../routes'

export default {
    namespaced: true,
    state: {
        locale: []
    },
    getters: {
        locale(state){
            return state.locale;
        }
    },
    mutations: {
        LoadLocale(state, data){
            state.locale = data.items
        }
    },
    actions: {
        LoadLocale(context){
            return new Promise((resolve, reject) => {
                if (context.state.locale.length > 0){
                    resolve();
                } else {
                    let url_locale = process.env.NODE_ENV !== 'production' ? '/json_requests/locale.json' : window.location.protocol + '//api.' + window.location.host + '/locale';
                    let tz = new Date().getTimezoneOffset()/60;
                    Vue.http.options.credentials = true;
                    Vue.http.get(url_locale, {params:{timezone: tz}})
                        .then(response => response.json())
                        .then(_json => {
                            context.commit('LoadLocale' ,_json);
                            
                            let base_local = '';

                            let locale_arr = [];
                            for(let i = 0; i < _json.items.length; i ++){
                                locale_arr.push(_json.items[i].value);
                            }
                            let path = [];
                            for(let i = 0; i < router.options.routes.length; i++){
                                path.push(router.options.routes[i].path);
                            }
                
                            let locale = Vue.cookie.get('locale');
                            let pathname = window.location.pathname.split('/');
                
                            if(locale === null){
                                if(pathname[1] === ''){
                                    locale = navigator.systemLanguage || window.navigator.language || navigator.userLanguage || navigator.browserLanguage;
                
                                    if(locale_arr.indexOf(locale) >= 0){
                                        Vue.cookie.set('locale', locale, { expires: '1Y' });
                
                                        base_local = locale;
                                    } else{
                                        Vue.cookie.set('locale', '', { expires: '1Y' });
                                    }
                                } else{
                                    if(locale_arr.indexOf(pathname[1]) >= 0){
                                        Vue.cookie.set('locale', pathname[1], { expires: '1Y' });
                
                                        base_local = pathname[1];
                                    } else{
                                        if(path.indexOf('/' + pathname[1]) >= 0){
                                            Vue.cookie.set('locale', '', { expires: '1Y' });
                                        } else{
                                            console.log('error')
                                        }
                                    }
                                }
                            } else{
                                if(locale === pathname[1]){
                                    base_local = locale;
                                } else{
                                    if(locale_arr.indexOf(pathname[1]) >= 0){
                                        Vue.cookie.set('locale', pathname[1], { expires: '1Y' });
                
                                        base_local = pathname[1];
                                    } else{
                                        if(path.indexOf('/' + pathname[1]) >= 0){
                                            Vue.cookie.set('locale', '', { expires: '1Y' });
                                        } else{
                                            console.log('error')
                                        }
                                    }
                                }
                            }
                
                            // Vue.http.options.credentials = true;
                            if(process.env.NODE_ENV !== 'production')
                                Vue.http.options.root = '/json_requests';
                            else
                                Vue.http.options.root = window.location.protocol + '//api.' + window.location.host + '/' + base_local;
                
                            if(base_local === '')
                                router.history.base = base_local;
                            else 
                                router.history.base = '/' + base_local;

                            resolve();
                        })    
                }
            })
        }
    }
};