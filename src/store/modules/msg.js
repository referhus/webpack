export default {
    namespaced: true,
    state: {
        msgState: false,
        text: '',
    },
    getters: {
        msgState(state){
            return state.msgState;
        },
        text(state){
            return state.text;
        }
    },
    mutations: {
        showMsg(state, data){
            state.text = data;
            state.msgState = true;
        },
        closeMsg(state){
            state.msgState = false;
            state.text = '';
        }
    },
    actions: {
        showMsg(store, data){
            store.commit('showMsg', data)
        },
        showMsgObj(store, data){
            if( typeof data == 'string' ){
                store.commit('showMsg', data)
            } else {
                for(var key in data) {
                    data[key].forEach((item2)=>{
                        store.commit('showMsg', item2)
                    })
                }
            }
        },
        closeMsg(store){
            store.commit('closeMsg')
        }
    }
};