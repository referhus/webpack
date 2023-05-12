export default {
    namespaced: true,
    state: {
        modalDialogState: false,
        modalDialogType: null,
        modalDialogProps: null,
    },
    getters: {
        modalDialogState(state){
            return state.modalDialogState;
        },
        modalDialogType(state){
            return state.modalDialogType;
        },
        modalDialogProps(state){
            return state.modalDialogProps;
        }
    },
    mutations: {
        modalDialogType_authOpen(state){
            state.modalDialogType = 'Auth';
            state.modalDialogState = true
        },
        modalDialogType_registrationOpen(state){
            state.modalDialogType = 'Registration';
            state.modalDialogState = true
        },
        modalDialogType_callbackOpen(state){
            state.modalDialogType = 'CallBack';
            state.modalDialogState = true
        },
        modalDialogType_passwordReset(state){
            state.modalDialogType = 'PasswordReset';
            state.modalDialogState = true
        },
        modalDialogType_refillOpen(state, props){
            state.modalDialogType = 'Refill';
            state.modalDialogState = true;
            state.modalDialogProps = props;
        },
        modalDialogType_signUpOpen(state){
            state.modalDialogType = 'SignUp';
            state.modalDialogState = true
        },
        modalDialogType_reviewOpen(state){
            state.modalDialogType = 'Review';
            state.modalDialogState = true
        },
        modalDialogType_promoOpen(state){
            state.modalDialogType = 'Promo';
            state.modalDialogState = true
        },
        modalDialogType_inviteOpen(state){
            state.modalDialogType = 'Invite';
            state.modalDialogState = true
        },
        modalDialogType_withdrawalOpen(state){
            state.modalDialogType = 'Withdrawal';
            state.modalDialogState = true
        },
        modalDialogType_timezoneOpen(state){
            state.modalDialogType = 'Timezone';
            state.modalDialogState = true
        },
        modalDialogType_reportOpen(state, props){
            state.modalDialogType = 'Report';
            state.modalDialogState = true;
            state.modalDialogProps = props;
        },

        modalDialogType_dialogAddNewUser(state, props){
            state.modalDialogType = 'DialogAddNewUser';
            state.modalDialogState = true;
            state.modalDialogProps = props;
        },
        modalDialogType_dialogCreateNew(state, props){
            state.modalDialogType = 'DialogCreateNew';
            state.modalDialogState = true;
            state.modalDialogProps = props;
        },
        modalDialogType_dialogRemove(state, props){
            state.modalDialogType = 'DialogRemove';
            state.modalDialogState = true;
            state.modalDialogProps = props;
        },
        // modalDialogType_dialogLeave(state, props){
        //     state.modalDialogType = 'DialogLeave';
        //     state.modalDialogState = true;
        //     state.modalDialogProps = props;
        // },
        modalDialogType_dialogRename(state, props){
            state.modalDialogType = 'DialogRename';
            state.modalDialogState = true;
            state.modalDialogProps = props;
        },
        modalDialogType_bannerAdd(state){
            state.modalDialogType = 'BannerAdd';
            state.modalDialogState = true
        },
        modalDialogClose(state){
            state.modalDialogType = null;
            state.modalDialogState = false
        },
    },
    actions: {
        modalDialogType_authOpen(store){
            store.commit('modalDialogType_authOpen')
        },
        modalDialogType_registrationOpen(store){
            store.commit('modalDialogType_registrationOpen')
        },
        modalDialogType_callbackOpen(store){
            store.commit('modalDialogType_callbackOpen')
        },
        modalDialogType_passwordReset(store){
            store.commit('modalDialogType_passwordReset')
        },
        modalDialogType_refillOpen(store, props){
            store.commit('modalDialogType_refillOpen', props)
        },
        modalDialogType_signUpOpen(store){
            store.commit('modalDialogType_signUpOpen')
        },
        modalDialogType_reviewOpen(store){
            store.commit('modalDialogType_reviewOpen')
        },
        modalDialogType_promoOpen(store){
            store.commit('modalDialogType_promoOpen')
        },
        modalDialogType_inviteOpen(store){
            store.commit('modalDialogType_inviteOpen')
        },
        modalDialogType_withdrawalOpen(store){
            store.commit('modalDialogType_withdrawalOpen')
        },
        modalDialogType_timezoneOpen(store){
            store.commit('modalDialogType_timezoneOpen')
        },
        modalDialogType_reportOpen(store, props){
            store.commit('modalDialogType_reportOpen', props);
        },

        modalDialogType_dialogAddNewUser(store, props){
            store.commit('modalDialogType_dialogAddNewUser', props);
        },
        modalDialogType_dialogCreateNew(store, props){
            store.commit('modalDialogType_dialogCreateNew', props);
        },
        modalDialogType_dialogRemove(store, props){
            store.commit('modalDialogType_dialogRemove', props);
        },
        // modalDialogType_dialogLeave(store, props){
        //     store.commit('modalDialogType_dialogLeave', props);
        // },
        modalDialogType_dialogRename(store, props){
            store.commit('modalDialogType_dialogRename', props);
        },
        modalDialogType_bannerAdd(store){
            store.commit('modalDialogType_bannerAdd');
        },
        modalDialogClose(store){
            store.commit('modalDialogClose')
        }
    }
};
