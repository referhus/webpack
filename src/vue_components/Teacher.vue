<template>
  <router-link v-if="data" :to="{name: 'user', params: {url: data.url}}" class="t-teacherItem">
    <img class="t-teacherItem__img" :src="data.img" v-if="data.img !== ''">
    <img class="t-teacherItem__img" src="/img/default_img.png" v-else>
    <div class="t-teacherItem__name">{{ data.name }}</div>
    <div class="t-teacherItem__address" v-if="data.address !== ''">{{ data.address }}</div>
    <div class="t-teacherItem__age" v-if="data.age !== ''">{{ data.age }}</div>
    <div class="t-teacherItem__footer">
      <cmp-rating :rate="data.rate" size="small"></cmp-rating>
      <div class="t-teacherItem__reviews">{{ data.reviews }} {{ declOfNum }}</div>
    </div>
  </router-link>
</template>

<script>
  import {mapGetters} from 'vuex';

  import Rating from './Rating.vue'

  export default {
    props: ['data'],
    components: {
      'cmp-rating': Rating
    },
    computed: {
      ...mapGetters('staticText', ['reviewsCountArr']),
      declOfNum() {
        let cases = [2, 0, 1, 1, 1, 2];

        return this.reviewsCountArr[(this.data.reviews % 100 > 4 && this.data.reviews % 100 < 20) ? 2 : cases[(this.data.reviews % 10 < 5) ? this.data.reviews % 10 : 5]];
      }
    }
  }
</script>

<style lang="sass">
  .t-teacherItem
    display: flex
    flex-direction: column
    width: 100%
    height: 100%
    padding: 24px
    margin: 0 auto
    @extend %substrate
    @extend %substrate_hover
    &__img
      width: 100%
      display: block
      height: 256px
      object-fit: cover
      margin-bottom: 16px
    &__name
      font-weight: bold
      font-size: 24px
      line-height: 1.1
      margin-bottom: 10px
      color: $blue
    &__address
      font-weight: bold
      margin-bottom: 8px
      line-height: 1.2
    &__age
      font-size: 14px
      line-height: 1.2
      color: $grey
      margin-bottom: 16px
    &__footer
      display: flex
      align-items: center
    &__rate
      display: flex
      align-items: center
      justify-content: flex-start
      list-style-type: none
      margin-right: 16px
      li
        width: 16px
        height: 16px
        display: flex
        svg
          width: 50%
          height: 100%
        &:not(:last-child)
          margin-right: 4px
    &__reviews
      font-size: 14px
      line-height: 1.2
      color: $grey

  @media(max-width: 769px)
    .t-teacherItem
      max-width: 100%
      padding: 16px
      &__footer 
        margin-top: auto
</style>
