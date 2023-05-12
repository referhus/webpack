<template>
  <section class="t-coursesList" :class="{'t-coursesList_small': type === 'all'}">
    <h2 v-if="type === 'popular'">{{ coursesList.title }}</h2>

    <div class="t-coursesList__wrap" v-if="mobileState && type === 'popular'">
      <swiper :options="swiperOption_courses" ref="courses_popular">
        <swiper-slide v-for="(item, index) in courses.items" :key="index">
          <cmp-course :data="item"></cmp-course>
        </swiper-slide>
      </swiper>
      <div class="t-coursesList__pagination" :class="{'_flex-start':(courses.items.length > 5)}"></div>
    </div>
    <div v-else class="t-coursesList__wrap">
      <cmp-course v-for="(item, index) in courses.items" :key="index" :data="item"></cmp-course>
    </div>

    <div class="t-coursesList__buttons" v-if="type === 'popular'">
      <router-link :to="{name: 'courses'}" class="t-btn t-btn_white" rel="nofollow"><span>{{ coursesList.all }}</span></router-link>
    </div>
    <cmp-pagination v-if="type === 'all' && courses._meta.pageCount > 1" :pages="courses._meta.pageCount"></cmp-pagination>
  </section>
</template>

<script>
  import {mapGetters} from 'vuex';

  import Course from './Course.vue';
  import Pagination from './Pagination.vue'

  export default {
      data(){
          return{
              swiperOption_courses: {
                  autoHeight: true,
                  slidesPerView: 1.25,
                  spaceBetween: 12,
                  threshold: 10,
                  pagination: {
                      el: '.t-coursesList__pagination',
                        dynamicBullets: true
                  }
              }
          }
      },
      props: ['type'],
      computed: {
          ...mapGetters(['mobileState']),
          ...mapGetters('coursesList', ['courses']),
          ...mapGetters('staticText', ['coursesList'])
      },
      components: {
          'cmp-pagination': Pagination,
          'cmp-course': Course
      }
  }
</script>

<style lang="sass">
.t-coursesList
  padding: 0 12px
  display: flex
  flex-direction: column
  &_small
    padding: 0
    margin-top: 24px
    .t-coursesList__wrap
      margin-bottom: 8px
  &__wrap
    display: flex
    align-items: stretch
    justify-content: flex-start
    flex-wrap: wrap
    margin: 0 -12px -41px
    &_margin
      margin-bottom: 8px
  &__buttons
    margin-top: 57px
    display: flex
    justify-content: center
  h2
    width: 100%
    margin-bottom: 32.4px
    text-align: center
    color: $blue
    font-size: 36px

@media (max-width: 769px)
  .t-coursesList
    padding: 0

    &_small
      margin-top: 16px
    &__wrap
      width: 100vw
      margin-left: -16px !important
      padding-left: 16px
      padding-right: 0
      .swiper-container
        width: 100%
        padding-bottom: 16px
        .t-courseItem
          margin: 0 auto
          display: block
    &__pagination
      display: flex
      align-items: center
      justify-content: center
      width: 100%
      .swiper-pagination-bullet
        margin: 0 2px
        background: $disabled
        opacity: 1
      .swiper-pagination-bullet-active
        background: $turquoise
    &__buttons
      margin-top: 24px
      padding: 0 24px
      .t-btn
        width: 100%
    h2
      padding: 0
      font-size: 24px
      margin-bottom: 16px
</style>