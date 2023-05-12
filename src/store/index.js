import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import profile from './modules/profile'
import modal from './modules/modal'
import coursesList from './modules/coursesList'
import teachers from './modules/teachers'
import msg from './modules/msg'
import handbook from './modules/handbook'
import locale from './modules/locale'
import staticText from './modules/staticText'
import meta from './modules/meta'

export const store = new Vuex.Store({
	state: {
        newNotice: 0,
        newMsg: [],
        mobileState: false,
        load: false,
        preload: false,
        menuState: false,
        menuState_profile: false,
        callbackAbsolute: false,
        filterState: false,
        sortState: false,
	},
	getters: {
        mobileState(state){
            return state.mobileState
        },

        load(state){
            return state.load
        },
        preload(state){
            return state.preload;
        },
        menuState(state){
            return state.menuState
        },
        menuState_profile(state){
            return state.menuState_profile
        },
        callbackAbsolute(state){
            return state.callbackAbsolute
        },
        filterState(state){
            return state.filterState
        },
        sortState(state){
            return state.sortState
        },
        newNotice(state){
            return state.newNotice;
        },
        newMsg(state){
            return state.newMsg;
        }
	},
	mutations: {
        UpdateNotice(state, data){
            state.newNotice = data
        },
        UpdateMsg(state, data){
            state.newMsg = data.map((item) => {
                return parseInt(item)
            })
        },
        ClearNotice(state){
            state.newNotice = 0;
        },
        ClearMsg(state){
            state.newMsg = [];
        },
        updateMobileState(state, data){
            state.mobileState = data
        },
        Loading(state){
            state.load = true
        },
        UpdatePreloadState(state, data){
            state.preload = data;
        },
        menuOpen(state){
            state.menuState_profile = false;
            state.menuState = true
        },
        menuOpen_profile(state){
            state.menuState = false;
            state.menuState_profile = true
        },
        menuClose(state){
            state.menuState = false;
            state.menuState_profile = false
        },
        callbackSetAbsolute(state){
            state.callbackAbsolute = true
        },
        callbackSetNoAbsolute(state){
            state.callbackAbsolute = false
        },
        filterOpen(state){
            state.filterState = true
        },
        filterClose(state){
            state.filterState = false
        },
        sortOpen(state){
            state.sortState = true
        },
        sortClose(state){
            state.sortState = false
        },
	},
	actions: {
        UpdateNotice(context, data){
            context.commit('UpdateNotice', data)
        },
        UpdateMsg(context, data){
            context.commit('UpdateMsg', data)
        },
        ClearNotice(context){
            context.commit('ClearNotice')
        },
        ClearMsg(context){
            context.commit('ClearMsg')
        },
        updateMobileState(context, data){
            context.commit('updateMobileState', data)
        },
        UpdatePreloadState(context, data){
            context.commit('UpdatePreloadState', data)
        },
        Loading(context){
            context.commit('Loading')
        },
        menuOpen(context){
            context.commit('menuOpen')
        },
        menuOpen_profile(context){
            context.commit('menuOpen_profile')
        },
        menuClose(context){
            context.commit('menuClose')
        },
        callbackSetAbsolute(context){
            context.commit('callbackSetAbsolute')
        },
        callbackSetNoAbsolute(context){
            context.commit('callbackSetNoAbsolute')
        },
        filterOpen(context){
            context.commit('filterOpen')
        },
        filterClose(context){
            context.commit('filterClose')
        },
        sortOpen(context){
            context.commit('sortOpen')
        },
        sortClose(context){
            context.commit('sortClose')
        },
	},
    modules: {
        profile,
        modal,
        coursesList,
        teachers,
        msg,
        handbook,
        locale,
        staticText,
        meta,
    },
	strict: process.env.NODE_ENV !== 'production'
});