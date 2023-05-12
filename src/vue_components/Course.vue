<template>
  <router-link v-if="data" :to="{name: 'courses_info', params: {id: data.id, slug: data.slug}}" class="t-courseItem" :class="{_belonging: data.belonging}">
    <div class="t-courseItem__header">
      <div class="t-courseItem__cost"><span>{{ data.price }}</span><img src="/img/rub.png"></div>
      <cmp-rating :rate="data.rate" size="small"></cmp-rating>
    </div>
    <div class="t-courseItem__type" v-if="type !== ''">{{ type }}</div>
    <div class="t-courseItem__name">{{ data.name }}</div>
    <div class="t-courseItem__statusBar" v-if="data.status_bar !== ''">{{ data.status_bar }}</div>
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
          ...mapGetters('staticText', ['hoursArr', 'minuteArr', 'lessonsCountArr', 'courseTypeArr']),
          duration(){
              if(this.data){
                  if(this.data.type !== 3){
                      let h = Math.floor(this.data.duration / 60);
                      let m = this.data.duration - (h * 60);

                      if (h > 0)
                          if (m > 0)
                              return h + ' ' + this.declOfNum(h, this.hoursArr) + ' ' + m + ' ' + this.declOfNum(m, this.minuteArr);
                          else
                              return h + ' ' + this.declOfNum(h, this.hoursArr);
                      else
                          return m + ' ' + this.declOfNum(m, this.minuteArr);
                  }
              }
              return false
          },
          type(){
              switch(this.data.type){
                  case 1:
                  case 2:
                      return this.courseTypeArr[this.data.type - 1] + ', ' + this.duration;
                  case 3:
                      if(this.data.lessons)
                        return this.courseTypeArr[this.data.type - 1] + ', ' + this.data.lessons.length + ' ' + this.declOfNum(this.data.lessons.length, this.lessonsCountArr);
                      else
                        return this.courseTypeArr[this.data.type - 1]
                  default:
                      return '';
              }
          }
      },
      methods: {
          declOfNum(n, titles) {
              return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
          }
      }
  }
</script>

<style lang="sass">
.t-courseItem
  display: inline-block
  width: calc(100% / 3 - 24px)
  min-height: 164px
  padding: 16px 16px 12px
  position: relative
  margin: 0 12px 41px
  @extend %substrate
  @extend %substrate_hover
  &_single
    margin: 0
    width: 100%
    max-width: 100%
    min-width: 100%
  &__header
    display: flex
    flex-wrap: wrap
    align-items: center
    justify-content: flex-start
    width: 100%
    margin-bottom: 7px
    line-height: 19px
  &__cost
    flex: none
    font-weight: bold
    color: $blue
    display: flex
    align-items: center
    margin-right: 16px
    line-height: 1.2
    img
      margin-left: 4px
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
  &__type
    font-size: 14px
    line-height: 1.2
    color: $blue
    white-space: nowrap
    flex: 1
    overflow: hidden
    text-overflow: ellipsis
    margin-bottom: 8px
  &__name
    font-weight: bold
    margin-bottom: 8px
    display: -webkit-box
    -webkit-line-clamp: 3
    -webkit-box-orient: vertical
    overflow: hidden
    line-height: 1.2
  &__statusBar
    font-size: 14px
    line-height: 1.2
    color: $grey
  > *:last-child
    margin-bottom: 0
@media (max-width: 1200px)
  .t-courseItem
    width: calc(100% / 2 - 24px)
@media (max-width: 950px)
  .t-courseItem
    width: calc(100% / 1 - 24px)
    margin-right: 0
    margin-left: 0
@media (max-width: 940px)
  .t-courseItem
    max-width: 100%
@media (max-width: 769px)
  .t-courseItem
    margin: 0 auto 8px
    width: 320px
    &__single
      display: block
</style>
