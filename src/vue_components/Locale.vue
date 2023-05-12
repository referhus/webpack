<template>
  <div class="t-locale" v-if="mobileState">
    <select @change="SetLocale($event.target.value)">
      <option v-for="item in locale"
              :key="'locale_' + item.value" :selected="$router.history.base === item.value || $router.history.base === ('/' + item.value)"
              :value="item.value">
        {{ item.label }}
      </option>
    </select>
  </div>
  <div class="t-locale" v-else>
    <div class="t-locale__active" @click.prevent="OpenLinks">
      <template v-for="item in locale" v-if="($router.history.base === item.value) || ($router.history.base === ('/' + item.value))">{{ item.label }}</template>
    </div>
    <div class="t-locale__links" v-if="open">
      <button class="t-locale__link"
              v-for="item in locale"
              :class="{_active: $router.history.base === item.value || $router.history.base === ('/' + item.value)}"
              :key="'locale_' + item.value"
              @click.prevent="SetLocale(item.value)">
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue';
    import {mapGetters, mapActions} from 'vuex';

    export  default {
        data(){
            return {
                open: false
            }
        },
        computed: {
            ...mapGetters('locale', ['locale']),
            ...mapGetters(['mobileState'])
        },
        methods: {
            ...mapActions('staticText', ['ClearDefault']),
            SetLocale(e){
                this.open = false;

                this.$cookie.set('locale', e, { expires: '1Y' });

                if(e === '') {
                    this.$router.history.base = '';
                    if(process.env.NODE_ENV !== 'production')
                        Vue.http.options.root = '/json_requests';
                    else
                        Vue.http.options.root = window.location.protocol + '//api.' + window.location.host;
                } else {
                    this.$router.history.base = '/' + e;
                    if(process.env.NODE_ENV !== 'production')
                        Vue.http.options.root = '/json_requests';
                    else
                        Vue.http.options.root = window.location.protocol + '//api.' + window.location.host + '/' + e;
                }
                Vue.cookie.set('locale', e, { expires: '1Y' });
                this.ClearDefault();

                this.$router.push({ name: 'reload', query: { path: this.$route.fullPath } });
            },
            OpenLinks(){
                this.open = true;
            }
        },
        mounted(){
            let _this = this;

            document.addEventListener('click', function (e) {
                let menu = document.querySelector('.t-locale');
                if(menu !== null){
                    let target = e.target;
                    let its_menu = target === menu || menu.contains(target);
                    if (!its_menu && _this.open) {
                        _this.open = false;
                    }
                }
            })
        }
    }
</script>

<style lang="sass">
  .t-locale
    position: relative
    select
      outline: none
      color: $border
      font-size: 16px
      line-height: 1.2
      background: transparent
      border: none
      appearance: none
    &__active
      padding: 14px 24px
      color: $border
      font-size: 16px
      line-height: 1.2
      cursor: pointer
    &__links
      padding: 14px 24px 24px
      position: absolute
      top: 0
      right: 0
      background: #FFFFFF
      box-shadow: 0 24px 48px rgba(0, 108, 202, 0.2)
      border-radius: 16px
      display: flex
      flex-direction: column
      align-items: flex-end
    &__link
      margin-top: 8px
      background: transparent
      border: none
      font-size: 16px
      font-family: 'rubik', Arial, sans-serif
      outline: none
      line-height: 1.2
      cursor: pointer
      &._active
        order: -1
        margin-top: 0
        margin-bottom: 38px
        color: $blue
</style>