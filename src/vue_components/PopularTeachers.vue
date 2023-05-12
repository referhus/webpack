<template>
  <section v-if="teachers.length > 0" class="t-teachers">
    <h2>{{ popularTeachers.title }}</h2>
    <swiper :options="mobileState ? swiperOption_mobile : swiperOption" ref="teachers">
      <template v-if="!mobileState">
        <swiper-slide v-for="(index) in parseInt(teachers.length/6) + (teachers.length%6 > 0?1:0)" :key="index">
          <div class="t-teachers__item" v-for="(index2) in 6" :key="index + index2">
            <cmp-teacher :data="teachers[(index-1)*6 + index2 - 1]" ></cmp-teacher>
          </div>
        </swiper-slide>
      </template>
      <template v-else>
        <swiper-slide v-for="(item, index) in teachers.length" :key="index">
            <cmp-teacher :data="teachers[index]" ></cmp-teacher>
        </swiper-slide>
      </template>
    </swiper>
    <div v-if="mobileState" class="t-teachers__pagination" :class="{'_flex-start':(teachers.length > 5)}"></div>
    <div v-else-if="1 < parseInt(teachers.length/6) + (teachers.length%6 > 0?1:0) " class="t-teachers__arrows">
      <div class="t-teachers__prev">
        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 4H13M1 4L5 1M1 4L5 7" stroke="#52A8F2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="t-teachers__next">
        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 4H1M13 4L9 1M13 4L9 7" stroke="#52A8F2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </section>
</template>

<script>
    import {mapGetters} from 'vuex'

    import Teacher from './Teacher.vue'

    export default {
        data(){
            return{
                swiperOption: {
                    slidesPerView: 1,
                    spaceBetween: 24,
                    threshold: 10,
                    navigation: {
                        nextEl: '.t-teachers__next',
                        prevEl: '.t-teachers__prev'
                    }
                },
                swiperOption_mobile: {
                    slidesPerView: 1.25,
                    spaceBetween: 12,
                    threshold: 10,
                    pagination: {
                        el: '.t-teachers__pagination',
                        dynamicBullets: true
                    }
                }
            }
        },
        components: {
            'cmp-teacher': Teacher
        },
        computed: {
            ...mapGetters(['mobileState']),
            ...mapGetters('staticText', ['popularTeachers']),
            ...mapGetters('teachers', {
                teachers: 'items'
            })
        }
    }
</script>

<style lang="sass">
@media(min-width: 770px)
  .t-teachers_home
    .t-teachers__prev, .t-teachers__next
      &:hover:not(.swiper-button-disabled)
        background: #ffffff
        box-shadow: 0 16px 24px rgba(0, 108, 202, 0.1)

.t-teachers
  max-width: 960px
  margin: 0 auto
  position: relative
  h2
    color: $blue
    margin: 0 0 24px
  &__item
    width: calc(100%/3 - 20px + 20px/3)
    //height: calc(100%/2 - 20px)
    margin-bottom: 20px
  .swiper-container
    margin: 0 -12px -32px
    padding: 0 12px 32px
  .swiper-wrapper
    display: flex
    align-items: flex-start
    // flex-wrap: wrap
    // flex-direction: row
    // justify-content: 
  .swiper-slide
    height: unset
    display: flex
    flex-wrap: wrap
    flex-direction: row
    justify-content: space-between
    align-items: stretch
  &__prev, &__next
    width: 40px
    height: 40px
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    outline: none
    border-radius: 100%
    &.swiper-button-disabled
      path
        stroke: #B8D7F5
  &__prev
    margin-right: 16px
  &__arrows
    z-index: 2
    position: absolute
    display: flex
    align-items: center
    justify-content: center
    right: 16px
    top: 16px
  &_home
    margin-bottom: 183px
    padding-bottom: 72px
    h2
      font-size: 36px
      text-align: center
      margin-top: 40px
    .t-teachers__arrows
      left: 0
      right: 0
      bottom: 0
      top: auto
  &:not(.t-teachers_home)
    h2
      padding: 21px 24px
      background: #ffffff
      border-radius: 16px

@media (max-width: 769px)
  .t-teachers
    .swiper-container
      width: 100vw
      margin: 0 0 -8px 
      padding: 0 0 24px
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
    &_home
      padding: 0 16px 80px
      margin-bottom: 0
      overflow: hidden
      margin-top: 10px
      h2
        font-size: 24px
        margin-bottom: 16px
        margin-top: 32px
</style>