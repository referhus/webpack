import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        items: []
    },
    getters: {
        items(state){
            return state.items;
        }
    },
    mutations: {
        setItems(state, data){
            state.items = data.items;
        }
    },
    actions: {
        LoadTeachers ({commit}){
            if(!this.state.teachers.items.length) {
                return new Promise((resolve, reject) => {
                    Vue.http.get('teachers_popular.json')
                        .then(response => response.json())
                        .then(data => {
                            commit('setItems', data);
                            resolve();
                        })
                })
            } else{
                return new Promise((resolve, reject) => {
                    resolve();
                })
            }
        }
    }
};