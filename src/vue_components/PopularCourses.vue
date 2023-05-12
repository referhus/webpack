<template>
  <section class="t-courses">
    <div class="t-courses__header">
      <h2>
        Популярные уроки, курсы и консультации
      </h2>
      <router-link :to="{name: 'courses'}" class="t-btn t-btn_white" v-if="!mobileState"><span>Смотреть все</span></router-link>
      <div v-if="!mobileState" class="t-courses__arrows">
        <div class="t-courses__prev">
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4H13M1 4L5 1M1 4L5 7" stroke="#52A8F2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="t-courses__next">
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 4H1M13 4L9 1M13 4L9 7" stroke="#52A8F2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
    <swiper :options="mobileState ? swiperOption_courses_mobile : swiperOption_courses" ref="courses">
      <swiper-slide v-for="(item, index) in courses.items" :key="index">
        <cmp-course :data="item" class="t-courseItem_single"></cmp-course>
      </swiper-slide>
    </swiper>
    <div v-if="mobileState" class="t-courses__pagination" :class="{'_flex-start':(courses.items.length > 5)}"></div>

    <router-link :to="{name: 'courses'}" class="t-btn t-btn_white" v-if="mobileState"><span>Смотреть все</span></router-link>
  </section>
</template>

<script>
    // сделать перевод слов как будет время
    let localeText = {
        url: process.env.NODE_ENV !== 'production' ? 'staticText/main.json' : 'staticText',
        main: {
            title: "Новые уроки и курсы",
            moreBtn: "Смотреть все"
        }
    };
    import {mapGetters} from 'vuex'

    import Course from './Course.vue'

    export default {
        data(){
            return{
                swiperOption_courses: {
                    autoHeight: true,
                    slidesPerView: 3,
                    spaceBetween: 24,
                    threshold: 10,
                    navigation: {
                        nextEl: '.t-courses__next',
                        prevEl: '.t-courses__prev'
                    }
                },
                swiperOption_courses_mobile: {
                    autoHeight: true,
                    slidesPerView: 1,
                    spaceBetween: 24,
                    threshold: 10,
                    pagination: {
                        el: '.t-courses__pagination',
                        dynamicBullets: true
                    }
                }
            }
        },
        components: {
            'cmp-course': Course
        },
        computed: {
            ...mapGetters('coursesList', ['courses']),
            ...mapGetters(['mobileState'])
        }
    }
</script>

<style lang="sass">
  @media(min-width: 770px)
    .t-courses
      h2
        display: flex
        justify-content: space-between
        background: #ffffff
        border-radius: 16px
        align-items: center
  @media (max-width: 769px)
    .t-courses
      &__arrows
        position: absolute
        top: 16px
        right: 16px
</style>