<template>
  <form class="t-auth" @submit.stop.prevent="Submit()">
    <h2>{{ auth.title }}</h2>
    <div class="t-social">
      <a class="t-social__item" :href="url + '/user/auth?authclient=facebook'"><img src="/img/social/Facebook.png"></a>
      <a class="t-social__item" :href="url + '/user/auth?authclient=vkontakte'"><img src="/img/social/VK.png"></a>
    </div>
    <div class="t-input" v-for="(item, index) in form" :key="item.name" :class="{_error: item.error}">
      <label>{{ item.label }}</label>
      <input v-model="item.value" :type="item.type" :placeholder="item.placeholder" @focus="Focus(index)">
    </div>
    <span class="t-link t-link_center" @click.stop.prevent="modalDialogType_passwordReset()">{{ auth.passwordReset }}</span>
    <button class="t-btn"><span>{{ auth.signIn }}</span></button>
    <button v-if="mobileState" class="t-btn t-btn_border" @click.stop.prevent="modalDialogType_registrationOpen()"><span>{{ auth.registration }}</span></button>
  </form>
</template>

<script>
  import Vue from 'vue'
  import {store} from '../../store'

  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';

  export default {
      data(){
          return{
              url : 'https://' + window.location.host,
              action: 'auth',
              form: [
                  {
                      label: store.getters['staticText/auth'].email,
                      name: 'fd[email]',
                      type: 'email',
                      value: '',
                      placeholder: '',
                      error: false,
                      pattern: /^[^@]{2,}@[^@.]{2,}\.[^@]{2,}$/
                  },
                  {
                      label: store.getters['staticText/auth'].password,
                      name: 'fd[password]',
                      type: 'password',
                      value: '',
                      placeholder: '',
                      error: false,
                      pattern: /^[a-zA-Z0-9_]{8,30}$/
                  }
              ]
          }
      },
      computed: {
          ...mapGetters(['mobileState']),
          ...mapGetters('staticText', ['auth'])
      },
      methods: {
          ...mapActions('modal', ['modalDialogType_passwordReset', 'modalDialogType_registrationOpen', 'modalDialogClose']),
          ...mapActions('msg', ['showMsg']),
          ...mapActions('profile',['logIn']),
          ...mapActions(['UpdateNotice', 'UpdateMsg']),
          Social(type){

          },
          Submit(){
              let is_valid = true;

              for(let i = 0; i < this.form.length; i++){
                  if(this.form[i].pattern !== '') {
                      if (!this.form[i].pattern.test(this.form[i].value)) {
                          this.form[i].error = true;
                          is_valid = false;
                      }
                  }
              }

              if(is_valid){
                  let fd = new FormData();

                  for(let i = 0; i < this.form.length; i++){
                      fd.append(this.form[i].name, this.form[i].value)
                  }

                  Vue.http.post('auth', fd)
                      .then(response => {
                          if(response.body.success){
                              this.logIn();
                              this.modalDialogClose();
                              if(response.body.newNotice)
                                this.UpdateNotice(response.body.newNotice);
                              if(response.body.newMessages)
                                this.UpdateMsg(response.body.newMessages)
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
              }
          },
          Focus(i){
              this.form[i].error = false
          }
      }
  }
</script>

<style lang="sass">
.t-auth
  width: 320px
  margin: 0 auto
  background: #ffffff
  padding: 24px
  border-radius: 16px
</style>