import Vue from 'vue';
export default {
	namespaced: true,
	state: {
		items: {},
	},
	getters: {
		items(state){
			return state.items;
		}
	},
	mutations: {
		addItems(state, item){
            state.items[item.url] = item.data;
		},
	},
	actions: {
        loadItems(store, to){
			return new Promise((resolve, reject) => {
				let url = process.env.NODE_ENV !== 'production' ? 
					'meta.json' : 
					'meta';
					url+='?url='+to.path;
				Vue.http.get(url)
					.then(response => response.json())
					.then(data => {
						store.commit('addItems', {
							url: to.path,
							data: data
						});
						resolve();
					});
			})
		}
	}
};