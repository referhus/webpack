<template>
  <form class="t-passwordReset" @submit.stop.prevent="Submit()">
    <h2>{{ passwordReset.title }}</h2>
    <div class="t-input" v-for="(item, index) in form" :key="index" :class="{_error: item.error}">
      <label>{{ item.label }}</label>
      <input v-model="item.value" :type="item.type" :placeholder="item.placeholder" @focus="Focus(index)">
    </div>
    <p class="t-passwordReset__hint">
      {{ passwordReset.hint }}
    </p>
    <button class="t-btn"><span>{{ passwordReset.btnOk }}</span></button>
    <button class="t-btn t-btn_border" @click.stop.prevent="modalDialogType_authOpen()"><span>{{ passwordReset.btnCancel }}</span></button>
  </form>
</template>

<script>
  import {store} from '../../store'

  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';

  export default {
      data(){
          return{
              action: 'recovery',
              form: [
                  {
                      label: store.getters['staticText/passwordReset'].email,
                      name: 'fd[email]',
                      type: 'email',
                      value: '',
                      placeholder: '',
                      error: false,
                      pattern: /^[^@]{2,}@[^@.]{2,}\.[^@]{2,}$/
                  }
              ],
              personalInfo: false
          }
      },
      computed: {
          ...mapGetters(['mobile']),
          ...mapGetters('staticText', ['passwordReset'])
      },
      methods:{
          ...mapActions('modal', ['modalDialogType_authOpen', 'modalDialogClose']),
          ...mapActions('msg', ['showMsg']),
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

                  this.$http.post(this.action, fd)
                      .then(response => {
                          this.modalDialogClose();
                          this.showMsg(this.passwordReset.msg)
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
.t-passwordReset
  width: 320px
  margin: 0 auto
  background: #ffffff
  padding: 24px
  border-radius: 16px
  &__hint
    color: $grey
    margin: 0 0 16px
    font-size: 14px
  .t-input
    margin: 0 0 16px
</style>