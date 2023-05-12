<template>
  <div class="t-registration">
    <form  @submit.stop.prevent="Submit()">
      <div class="t-registration__form">
        <h2>{{ registration.title }}</h2>
        <div class="t-social">
          <a class="t-social__item" :href="url + '/user/auth?authclient=facebook'"><img src="/img/social/Facebook.png"></a>
          <a class="t-social__item" :href="url + '/user/auth?authclient=vkontakte'"><img src="/img/social/VK.png"></a>
        </div>
        <template v-for="(item, index) in form">
            
          <div class="t-input" :key="'input-'+item.name" :class="{_error: item.error}">
            <label>{{ item.label }}</label>
            <input v-model="item.value" :type="item.type" :placeholder="item.placeholder" @focus="Focus(index)">
          </div>
          <template v-if="item.type =='email' && notActivated">
            <span class="t-registration__input-message"
                :key="'text-'+item.name">
              {{ registration.notActivated }}
            </span>
            <span class="t-link t-link_center" :key="'btn-'+item.name" 
                @click="resendEmail(item)">
              {{ registration.notActivatedBtn}}
            </span>
          </template>
        </template>
        <template v-if="!mobileState">
          <div class="t-input">
            <input type="checkbox" id="personal_info" class="t-checkbox" v-model="personalInfo">
            <label for="personal_info">
              {{ registration.personalData_1 }}
              <a href="/terms_service" target="_blank" rel="nofollow">{{ registration.personalData_2 }}</a>
              {{ registration.personalData_3 }}
              <a href="/terms_service" target="_blank" rel="nofollow">{{ registration.personalData_4 }}</a>
              {{ registration.personalData_5 }}
              <a href="/terms_service" target="_blank" rel="nofollow">{{ registration.personalData_6 }}</a>
            </label>
          </div>
          <button class="t-btn" :disabled="!personalInfo"><span>{{ registration.registration }}</span></button>
          <!--<button class="t-btn t-btn_border" @click.stop.prevent="modalDialogType_authOpen()"><span>{{ registration.auth }}</span></button>-->
        </template>
      </div>
      <div v-if="mobileState" class="t-registration__buttons">
        <div class="t-input">
          <input type="checkbox" id="personal_info_mobile" class="t-checkbox" v-model="personalInfo">
          <label for="personal_info_mobile">
              {{ registration.personalData_1 }}
              <a href="/terms_service" target="_blank" rel="nofollow">{{ registration.personalData_2 }}</a>
              {{ registration.personalData_3 }}
              <a href="/terms_service" target="_blank" rel="nofollow">{{ registration.personalData_4 }}</a>
              {{ registration.personalData_5 }}
              <a href="/terms_service" target="_blank" rel="nofollow">{{ registration.personalData_6 }}</a>
          </label>
        </div>
        <button class="t-btn" :disabled="!personalInfo"><span>{{ registration.registration }}</span></button>
        <button class="t-btn t-btn_border" @click.stop.prevent="modalDialogType_authOpen()"><span>{{ registration.auth }}</span></button>
      </div>
    </form>

  </div>
</template>

<script>
    import {store} from '../../store'

    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';

    export default {
        data(){
            return{
                urlPersonalData: window.location.protocol + '//api.' + window.location.host + '/handbook/personal_data',
                urlUserAgreement: window.location.protocol + '//api.' + window.location.host + '/handbook/user_agreement',
                urlOffer: window.location.protocol + '//api.' + window.location.host + '/handbook/personal_data',
                url: 'https://' + window.location.host,
                action: 'user',
                form: [
                    {
                        label: store.getters['staticText/registration'].email,
                        name: 'fd[email]',
                        type: 'email',
                        value: '',
                        placeholder: '',
                        error: false,
                        errorText: '',
                        pattern: /^[^@]{2,}@[^@.]{2,}\.[^@]{2,}$/
                    },
                    {
                        label: store.getters['staticText/registration'].password,
                        name: 'fd[password]',
                        type: 'password',
                        value: '',
                        placeholder: store.getters['staticText/registration'].passwordPlaceholder,
                        error: false,
                        errorText: store.getters['staticText/registration'].passwordError,
                        pattern: /^[a-zA-Z0-9_]{8,30}$/
                    }
                ],
                notActivated: false, //если пользователь не активировал аккаунт, по ссылке в письме
                personalInfo: false
            }
        },
        computed: {
            ...mapGetters(['mobileState']),
            ...mapGetters('staticText', ['registration']),
        },
        methods: {
            ...mapActions('modal', ['modalDialogType_authOpen', 'modalDialogClose']),
            ...mapActions('msg', ['showMsg']),

            Submit(){
                let is_valid = true;

                for(let i = 0; i < this.form.length; i++){
                    if(this.form[i].pattern !== '') {
                        if (!this.form[i].pattern.test(this.form[i].value)) {
                            this.form[i].error = true;
                            is_valid = false;
                            if(this.form[i].errorText !== ''){
                                this.showMsg(this.form[i].errorText);
                            }
                        }
                    }
                }

                if(!this.personalInfo){
                    is_valid = false;
                }

                if(is_valid){
                    let fd = new FormData();

                    for(let i = 0; i < this.form.length; i++){
                        fd.append(this.form[i].name, this.form[i].value)
                    }

                    fd.append('personalInfo', this.personalInfo);

                    this.$http.post('user', fd)
                        .then(response => {
                            if(response.body.success){
                                this.showMsg(response.body.message);
                                this.modalDialogClose();
                            } else{
                                let text = '';
                                for(let key in response.body.errors){
                                    text += response.body.errors[key]
                                }
                                for(let i = 0; i < this.form.length; i++){
                                    this.form[i].error = true;
                                }
                                this.showMsg(text)
                                if ( response.body.notActivated ) {
                                  this.notActivated = true;
                                }
                            }
                        }, response => {
                            this.modalDialogClose();
                            this.showMsg('Упс, что-то пошло не так, попробуйте позже')
                        });
                }
            },
            resendEmail(item){
                let fd = new FormData();
                fd.append(item.name, item.value)
                this.$http.post('user/resend', fd)
                    .then(response => {
                        if(response.body.success){
                            this.showMsg(response.body.message);
                            this.modalDialogClose();
                        } else{
                            let text = '';
                            for(let key in response.body.errors){
                                text += response.body.errors[key]
                            }
                            for(let i = 0; i < this.form.length; i++){
                                this.form[i].error = true;
                            }
                            this.showMsg(text)
                        }
                    }, response => {
                        this.modalDialogClose();
                        this.showMsg('Упс, что-то пошло не так, попробуйте позже')
                    });
            },
            Focus(i){
                this.form[i].error = false
            }
        }
    }
</script>

<style lang="sass">
.t-registration
  display: flex
  align-items: stretch
  &__form
    width: 320px
    margin: 0 auto
    background: #ffffff
    padding: 24px
    border-radius: 16px
  &__wrapper
    width: 632px
    background: #ffffff
    padding: 24px 16px 24px 24px
    border-radius: 16px
  &__input-message
    position: relative
    top: -16px
    display: inline-block
    font-size: 14px
    line-height: 1.2

@media(max-width: 769px)
  .t-registration
    display: block
    width: 100%
    &__form
      margin-bottom: 8px
    &__wrapper
      width: 100%
      height: 320px
      margin-bottom: 8px
    &__buttons
      width: 320px
      margin: 0 auto
      background: #ffffff
      padding: 24px
      border-radius: 16px
      margin-bottom: 24px
</style>
