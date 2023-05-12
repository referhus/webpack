<template>
  <transition-group class="t-pagination" tag="div" name="list-complete">
    <router-link :to="{name: $route.name, query: Object.assign({}, $route.query, {['page' + page_name]: page - 1})}" class="t-pagination__link t-pagination__link_prev" v-if="(page - 1) > 0" :key="'prev'">
      <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 4H13M1 4L5 1M1 4L5 7" stroke="#52A8F2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </router-link>
    <router-link :to="{name: $route.name, query: Object.assign({}, $route.query, {['page' + page_name]: page - 4})}" class="t-pagination__link" v-if="(page - 4) > 0 && page == pages" :key="page - 4">{{ page - 4 }}</router-link>
    <router-link :to="{name: $route.name, query: Object.assign({}, $route.query, {['page' + page_name]: page - 3})}" class="t-pagination__link" v-if="(page - 3) > 0 && (page + 1) >= pages" :key="page - 3">{{ page - 3 }}</router-link>
    <router-link :to="{name: $route.name, query: Object.assign({}, $route.query, {['page' + page_name]: page - 2})}" class="t-pagination__link" v-if="(page - 2) > 0" :key="page - 2">{{ page - 2 }}</router-link>
    <router-link :to="{name: $route.name, query: Object.assign({}, $route.query, {['page' + page_name]: page - 1})}" class="t-pagination__link" v-if="(page - 1) > 0" :key="page - 1">{{ page - 1 }}</router-link>
    <router-link :to="{name: $route.name, query: Object.assign({}, $route.query, {['page' + page_name]: page})}" class="t-pagination__link t-pagination__link_active" :key="page">{{ page }}</router-link>
    <router-link :to="{name: $route.name, query: Object.assign({}, $route.query, {['page' + page_name]: page + 1})}" class="t-pagination__link" v-if="page < pages" :key="page + 1">{{ page + 1 }}</router-link>
    <router-link :to="{name: $route.name, query: Object.assign({}, $route.query, {['page' + page_name]: page + 2})}" class="t-pagination__link" v-if="(page + 1) < pages" :key="page + 2">{{ page + 2 }}</router-link>
    <router-link :to="{name: $route.name, query: Object.assign({}, $route.query, {['page' + page_name]: page + 3})}" class="t-pagination__link" v-if="(page - 2) <= 0 && (page + 2) < pages" :key="page + 3">{{ page + 3 }}</router-link>
    <router-link :to="{name: $route.name, query: Object.assign({}, $route.query, {['page' + page_name]: page + 4})}" class="t-pagination__link" v-if="(page - 1) <= 0 && (page + 3) < pages" :key="page + 4">{{ page + 4 }}</router-link>
    <router-link :to="{name: $route.name, query: Object.assign({}, $route.query, {['page' + page_name]: page + 1})}" class="t-pagination__link t-pagination__link_next" v-if="page < pages" :key="'next'">
      <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 4H1M13 4L9 1M13 4L9 7" stroke="#52A8F2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </router-link>
  </transition-group>
</template>

<script>
    export default {
        data(){
            return {
                page: 1
            }
        },
        props: ['pages', 'name'],
        computed: {
            page_name(){
                return this.name === undefined ? "" : "_" + this.name;
            }
        },
        updated(){
            if(this.$route.query['page' + this.page_name] !== undefined) {
                if(parseInt(this.$route.query['page' + this.page_name]) <= 0 || isNaN(parseInt(this.$route.query['page' + this.page_name])))
                    this.page = 1;
                else
                    this.page = parseInt(this.$route.query['page' + this.page_name]);
            }
        },
        mounted(){
            if(this.$route.query['page' + this.page_name] !== undefined) {
                if(parseInt(this.$route.query['page' + this.page_name]) <= 0 || isNaN(parseInt(this.$route.query['page' + this.page_name])))
                    this.page = 1;
                else
                    this.page = parseInt(this.$route.query['page' + this.page_name]);
            }
        }
    }
</script>

<style lang="sass">
.t-pagination
  display: flex
  align-items: center
  justify-content: flex-start
  &._margin
    margin-bottom: 50px
  &__link
    width: 40px
    height: 40px
    border-radius: 50%
    border: 1px solid transparent
    margin: 0 4px
    color: $blue
    text-align: center
    display: flex
    align-items: center
    justify-content: center
    transition: all .2s
    &_prev
      margin-right: 12px
    &_next
      margin-left: 12px
    &_active
      color: #ffffff
      background: $blue_gradient
      box-shadow: $shadow
    @media(min-width: 770px)
      &:hover
        border-color: $blue
  &_center
    justify-content: center
  &_top
    margin-top: 32px

.list-complete-enter, .list-complete-leave-to
  opacity: 0
  transform: translateY(30px)
.list-complete-leave-active
  position: absolute

@media(max-width: 769px)
  .t-pagination
    padding: 0 16px
    &__link
      width: 30px
      min-width: 30px
      height: 30px
</style>