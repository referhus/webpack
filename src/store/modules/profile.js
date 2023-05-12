import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        user_info: {},
        balance: null,
        transactions: {
            items: [],
            _meta:{totalCount:0,pageCount:0,currentPage:1,perPage:20}
        },
        blackList: {
            items: [],
            _meta:{totalCount:0,pageCount:0,currentPage:1,perPage:20}
        },
        settings: null,
        documents: {
            items: [],
            _meta:{totalCount:0,pageCount:0,currentPage:1,perPage:20}
        },
        hasAuth: false,
        hasRequest: false,
        socketToken: null
    },
    getters: {
        user(state){
            return state.user_info;
        },
        documents(state){
            return state.documents;
        },
        balance(state){
            return state.balance;
        },
        transactions(state){
            return state.transactions;
        },
        blackList(state){
            return state.blackList;
        },
        settings(state){
            return state.settings;
        },
        hasAuth(state){
            return state.hasAuth;
        },
        hasRequest(state){
            return state.hasRequest;
        },
        socketToken(state){
            return state.socketToken;
        }
    },
    mutations: {
        logOut(state){
            state.user_info = {};
            state.hasAuth = false;
        },
        logIn(state){
            state.hasAuth = true;
        },
        setRequest(state){
            state.hasRequest = true;
        },
        setUserInfo(state, data){
            state.user_info = data
        },
        setDocuments(state, data){
            state.documents = data
        },
        setBalance(state, data){
            state.balance = data
        },
        setTransactions(state, data){
            data.items.forEach(item => {
                let date = new Date(item.date);
                let yy = date.getFullYear();
                let mm =  ('0' + (date.getMonth() + 1)).slice(-2) 
                let dd = ('0' + date.getDate()).slice(-2)
                let hours = date.getHours();
                let minutes =  date.getMinutes();
                let time = (hours>=10?hours:'0'+hours)+':'+ (minutes>=10?minutes:'0'+minutes)
                item.date = dd+ '.' + mm + '.' +  yy  + ' ' + time
            });
            state.transactions = data;
        },
        setBlackList(state, data){
            state.blackList = data;
        },
        setSettings(state, data){
            state.settings = data
        },
        updateInfo(state, data){
            for(let i = 0; i < data.length; i++){
                state.user_info[data[i].name] = data[i].value
            }
        },
        updateContacts(state, data){
            state.user_info.contacts = data
        },
        updateVideo(state, data){
            state.user_info.video = data
        },
        updateAvatar(state, data){
            state.user_info.img = data
        },
        updateLogin(state, data){
            state.user_info.login = data
        },
        updateUrl(state, data){
            state.user_info.url = data
        },
        updatePrivacy(state, data){
            state.user_info.privacy = data
        },
        updateNotification(state, data){
            state.user_info.notification = data
        },
        SetSocketToken(state, data){
            state.socketToken = data
        },
        ClearSocketToken(state, data){
            state.socketToken = null
        }
    },
    actions: {
        logOut(store){
            return new Promise((resolve, reject) => {
                Vue.http.get('logOut.json')
                    .then(response => response.json())
                    .then(data => {
                        if(data.success) {
                            store.commit('logOut');
                            store.commit('ClearSocketToken');
                            resolve();
                        } else {
                            reject(data.error);
                        }
                    });
            })
        },
        logIn({commit, dispatch}){
            commit('logOut');
            commit('logIn');

            dispatch('GetSocketToken');
        },
        LoadUserInfo ({ commit }) {
            let url = process.env.NODE_ENV !== 'production' ? 'profile/profile.json' : 'profile/profile';
            return new Promise((resolve, reject) => {
                Vue.http.get(url)
                    .then(response => response.json())
                    .then(data => {
                        commit('setUserInfo' ,data);
                        resolve();
                    })
            })
        },
        LoadDocuments ({commit}, data){
            let url = process.env.NODE_ENV !== 'production' ? 'documents.json' : 'documents';

            return new Promise((resolve, reject) => {
                Vue.http.get(url, {params: data})
                    .then(response => response.json())
                    .then(data => {
                        commit('setDocuments' ,data);
                        resolve();
                    })
            })
        },
        LoadBalance ({ commit }) {
            let url = process.env.NODE_ENV !== 'production' ? 'profile/balance.json' : 'profile/balance';
            return new Promise((resolve, reject) => {
                Vue.http.get(url)
                    .then(response => response.json())
                    .then(data => {
                        commit('setBalance' ,data);
                        resolve();
                    }, () => {
                        reject();
                    })
            })
        },
        LoadTransactions ({ commit }, data) {
            let url = process.env.NODE_ENV !== 'production' ? 'profile/transactions.json' : 'profile/transactions';
            return new Promise((resolve, reject) => {
                Vue.http.get(url, {params: data})
                    .then(response => response.json())
                    .then(data => {
                        commit('setTransactions' ,data);
                        resolve();
                    })
            })
        },
        LoadBlackList ({ commit }){
            let url = process.env.NODE_ENV !== 'production' ? 'profile/black_list.json' : 'profile/blackList';

            return new Promise((resolve, reject) => {
                Vue.http.get(url)
                    .then(response => response.json())
                    .then(data => {
                        commit('setBlackList' ,data);
                        resolve();
                    })
            })
        },
        setSettings(store, data){
            store.commit('setSettings', data);
        },
        updateInfo(store, data){
            store.commit('updateInfo', data);
        },
        updateContacts(store, data){
            store.commit('updateContacts', data);
        },
        updateVideo(store, data){
            store.commit('updateVideo', data);
        },
        updateAvatar(store, data){
            store.commit('updateAvatar', data);
        },
        updateLogin(store, data){
            store.commit('updateLogin', data);
        },
        updateUrl(store, data){
            store.commit('updateUrl', data);
        },
        updatePrivacy(store, data){
            store.commit('updatePrivacy', data);
        },
        updateNotification(store, data){
            store.commit('updateNotification', data);
        },
        HasAuth  ({commit, dispatch}){
            if(!this.state.profile.hasRequest) {
                return new Promise((resolve, reject) => {
                    Vue.http.get('has_auth.json')
                        .then(response => response.json())
                        .then(data => {
                            commit('setRequest');
                            if (data.success){
                                if(data.newMessages)
                                    this.dispatch('UpdateMsg', data.newMessages);
                                if(data.newNotice)
                                    this.dispatch('UpdateNotice', data.newNotice);

                                commit('logIn');

                                if(process.env.NODE_ENV === 'production'){
                                    dispatch('GetSocketToken');
                                }
                            }
                            if (data.message)
                                resolve(data.message);
                            else
                                resolve(false)
                        })
                })
            } else{
                return new Promise((resolve, reject) => {
                    resolve(false);
                })
            }
        },
        GetSocketToken({ commit }){
            Vue.http.get('websocket')
                .then(response => response.json())
                .then(data => {
                    commit('SetSocketToken',data)
                });
        }
    }
};