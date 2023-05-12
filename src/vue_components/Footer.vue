<template>
  <footer :class="{'_load': load}">
    <div class="t-footerMenu">
      <router-link :to="{name: 'about'}" rel="nofollow">{{ footer.menu_1 }}</router-link>
      <router-link :to="{name: 'terms_service'}" rel="nofollow">{{ footer.menu_2 }}</router-link>
      <router-link :to="{name: 'faq'}" rel="nofollow">{{ footer.menu_3 }}</router-link>
      <router-link :to="{name: 'contacts'}" rel="nofollow">{{ footer.menu_4 }}</router-link>
    </div>
    <div class="t-copyright">© {{ footer.copyright }} {{ year }}</div>
    <div class="t-social">
      <a v-for="(items, index) in socials" :key="index" :href="items.link" target="_blank" rel="nofollow"><img :src="items.img"></a>
    </div>
    <div class="t-developer">
      <a href="http://tdsgn.ru" target="_blank" rel="nofollow"><img src="/img/tdsgn.png"></a>
    </div>
  </footer>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
      data(){
          return {
              year: new Date().getFullYear()
          }
      },
      computed: {
          ...mapGetters(['mobileState', 'load']),
          ...mapGetters('staticText', ['footer']),
          ...mapGetters('handbook', ['socials']),
      }
  }
</script>

<style lang="sass">
footer
  background: #ffffff
  padding: 24px
  display: flex
  align-items: center
  justify-content: space-between
  flex-wrap: wrap
  flex: none
  opacity: 0
  &._load
    opacity: 1

.t-footerMenu
  width: 100%
  flex: none
  display: flex
  align-items: center
  justify-content: center
  margin: 0 0 40px
  a
    line-height: 1.2
    margin: 0 12px
    font-weight: bold

.t-copyright
  color: $blue
  font-weight: bold
  width: 200px
  flex: none
  line-height: 1.2
.t-developer
  width: 200px
  flex: none
  display: flex
  justify-content: flex-end

.t-social
  display: flex
  align-items: center
  justify-content: center
  a
    margin: 0 4px
  img
    display: block

@media (max-width: 769px)
  footer
    padding: 24px 24px 96px
    .t-social
      order: 2
      width: 100%
      margin-bottom: 24px
    .t-copyright
      order: 3
    .t-developer
      order: 4
  .t-copyright, .t-developer
    width: auto
  .t-footerMenu
    flex-direction: column
    margin-bottom: 32px
    order: 1
    a
      margin: 0 0 16px
      &:last-child
        margin-bottom: 0
</style>