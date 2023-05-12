<template>
  <form class="t-callBack" @submit.stop.prevent="Submit()">
    <h2>{{ callback.title }}</h2>
    <div class="t-input" v-for="(item, index) in form" :key="index" :class="{_success: item.success}">
      <label>{{ item.label }}</label>

      <textarea v-if="item.type === 'textarea'" v-model="item.value" :placeholder="item.placeholder" @focus="Focus(index)"></textarea>
      <template v-else>
        <input v-model="item.value" :type="item.type" :placeholder="item.placeholder" @focus="Focus(index)">
        <p class="t-callBack__hint">{{ callback.emailHint }}</p>
      </template>
    </div>
    <div class="t-input">
      <input type="checkbox" id="personal_info" class="t-checkbox" v-model="personalInfo">
      <label for="personal_info">
        {{ callback.personalData_1 }}
        <a href="#" download rel="nofollow">{{ callback.personalData_2 }}</a>
        {{ callback.personalData_3 }}
        <a href="#" download rel="nofollow">{{ callback.personalData_4 }}</a>
      </label>
    </div>
    <button class="t-btn" :disabled="disabledBtn" :class="{_disabled: disabledBtn}"><span>{{ callback.btn }}</span></button>
  </form>
</template>

<script>
    import {store} from '../../store'

    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';

    export default {
        data(){
            return{
                // disabledBtn: false,
                sending: false,
                action: 'callback',
                form: [
                    {
                        label: store.getters['staticText/callback'].textTitle,
                        name: 'fd[text]',
                        type: 'textarea',
                        value: '',
                        placeholder: '',
                        success: false,
                        pattern: ''
                    },
                    {
                        label: store.getters['staticText/callback'].emailTitle,
                        name: 'fd[email]',
                        type: 'email',
                        value: '',
                        placeholder: '',
                        success: false,
                        pattern: /^[^@]{2,}@[^@.]{2,}\.[^@]{2,}$/
                    }
                ],
                personalInfo: false
            }
        },
        computed: {
            ...mapGetters(['mobile']),
            ...mapGetters('staticText', ['callback']),
            disabledBtn(){
                let is_valid = true;
                if (this.sending){
                    return true
                }
                for(let i = 0; i < this.form.length; i++){
                    if(this.form[i].pattern !== '') {
                        if (!this.form[i].pattern.test(this.form[i].value)) {
                            is_valid = false;
                        } else {
                            this.form[i].success = true;
                        }
                    } else{
                        if (this.form[i].value === '') {
                            is_valid = false;
                        } else {
                            this.form[i].success = true;
                        }
                    }
                }
                if(!this.personalInfo){
                    is_valid = false;
                }

                return !is_valid
            }
        },
        methods: {
            ...mapActions('modal', ['modalDialogClose']),
            ...mapActions('msg', ['showMsg']),
            Submit(){
                if(!this.disabledBtn){
                    this.sending = true
                    let fd = new FormData();

                    for(let i = 0; i < this.form.length; i++){
                        fd.append(this.form[i].name, this.form[i].value)
                    }

                    this.$http.post(this.action, fd)
                        .then(response => {
                            this.sending = false;
                            this.modalDialogClose();
                            this.showMsg(this.callback.msgSuccess)
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
.t-callBack
  width: 320px
  margin: 0 auto
  background: #ffffff
  padding: 24px
  border-radius: 16px
  &__hint
    font-size: 14px
    color: $grey
    margin-top: 8px
  .t-input:after
    bottom: 25px
</style>