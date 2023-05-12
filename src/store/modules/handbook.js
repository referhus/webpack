import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        socials: {items: []},
    },
    getters: {
        socials(state){
            return state.socials.items;
        },
    },
    mutations: {
        LoadSocials(state, data){
            state.socials = data
        },
    },
    actions: {
        LoadSocials ({ commit }){
            if(!this.state.handbook || !this.state.handbook.socials || !this.state.handbook.socials.items.length){
                let url = process.env.NODE_ENV !== 'production' ? 'handbook/socials.json' : 'handbook/socials';

                return new Promise((resolve, reject) => {
                    Vue.http.get(url)
                        .then(response => response.json())
                        .then(data => {
                            commit('LoadSocials' ,data);
                            resolve();
                        })
                })
            } else{
                return new Promise((resolve, reject) => {
                    resolve();
                })
            }
        },
    }
};