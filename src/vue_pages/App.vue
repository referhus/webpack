<template>
  <main id="app">
    <transition name="load">
      <cmp-load v-if="$route.name === 'home' && !load"></cmp-load>
    </transition>

    <transition name="fade">
      <cmp-preload v-if="preload"></cmp-preload>
    </transition>

    <cmp-header></cmp-header>

    <transition name="route">
      <router-view class="t-page" :class="{'_load': load}"></router-view>
    </transition>

    <transition name="fade">
      <cmp-modal v-if="modalDialogState"></cmp-modal>
    </transition>

    <transition name="fade">
      <cmp-msg v-if="msgState"></cmp-msg>
    </transition>

    <transition name="fade">
      <div v-if="visibleMsgCookies && load" class="t-block-cookies">
        <div class="t-block-cookies__container">
          <p class="t-block-cookies__text">{{ cookiesText.text }}</p>
          <div class="t-block-cookies__btn">
            <button class="t-btn" @click="changeMsgCookies"><span>{{ cookiesText.btnOk }}</span></button>
          </div>
        </div>
      </div>
    </transition>

    <span class="t-openCallBack" :class="{_absolute: callbackAbsolute}" @click.stop.prevent="modalDialogType_callbackOpen()" v-if="!mobileState">
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13 2C6.9248 2 2 6.92578 2 13C2 15.4297 2.78687 17.6738 4.11963 19.4922C4.3208 19.7676 4.36841 20.125 4.24634 20.4434L3.42773 22.5703L5.55591 21.752C5.87354 21.6309 6.23169 21.6777 6.5061 21.8789C8.32617 23.2129 10.5698 24 13 24C19.0752 24 24 19.0742 24 13C24 6.92578 19.0752 2 13 2ZM0 13C0 5.82031 5.82031 0 13 0C20.1797 0 26 5.82031 26 13C26 20.1797 20.1797 26 13 26C10.3289 26 7.84351 25.1934 5.77759 23.8105L2.04541 25.2461C1.86694 25.3145 1.67676 25.3301 1.49634 25.2949C1.3042 25.2578 1.12329 25.1641 0.979248 25.0195C0.699707 24.7402 0.611084 24.3223 0.75293 23.9531L2.18872 20.2207C0.806152 18.1562 0 15.6699 0 13ZM13 7C11.3433 7 10 8.34375 10 10C10 10.5527 9.55225 11 9 11C8.44775 11 8 10.5527 8 10C8 7.23828 10.2385 5 13 5C15.7615 5 18 7.23828 18 10C18 12.4199 16.2822 14.4375 14 14.9004V15.5C14 16.0527 13.5522 16.5 13 16.5C12.4478 16.5 12 16.0527 12 15.5V14C12 13.4473 12.4478 13 13 13C14.6567 13 16 11.6562 16 10C16 8.34375 14.6567 7 13 7ZM13 20C13.5522 20 14 19.5527 14 19C14 18.4473 13.5522 18 13 18C12.4478 18 12 18.4473 12 19C12 19.5527 12.4478 20 13 20Z" fill="#52A8F2"/>
      </svg>
    </span>

    <cmp-footer v-show="$route.name !== 'home' || load"></cmp-footer>
  </main>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';

    import Header from '../vue_components/Header.vue'
    import Footer from '../vue_components/Footer.vue'
    import ModalDialog from '../vue_components/ModalDialog/Index.vue'
    import Msg from '../vue_components/Msg.vue'
    import Load from '../vue_components/Load.vue'
    import Preload from '../vue_components/Preload.vue'

    export default {
        data() {
            return {
                visibleMsgCookies: false
            }
        },
        components: {
            'cmp-header': Header,
            'cmp-footer': Footer,
            'cmp-modal': ModalDialog,
            'cmp-msg': Msg,
            'cmp-load': Load,
            'cmp-preload': Preload
        },
        computed: {
            ...mapGetters(['mobileState', 'callbackAbsolute', 'load', 'preload']),
            ...mapGetters('modal',['modalDialogState']),
            ...mapGetters('msg',['msgState']),
            ...mapGetters('staticText', ['cookiesText'])
        },
        methods: {
            ...mapActions('modal', ['modalDialogType_callbackOpen']),
            changeMsgCookies() {
                localStorage.setItem('visibleMsgCookies', 'false');
                this.visibleMsgCookies = false;
            }
        },
        mounted() {
            (localStorage.getItem('visibleMsgCookies') === 'false') ?
                this.visibleMsgCookies = false :
                this.visibleMsgCookies = true;
        }
    }
</script>

<style lang="sass">
.t-btn
  display: inline-block
  padding: 16px
  color: #ffffff
  background: $turquoise
  box-shadow: $shadow
  font-weight: bold
  font-size: 18px
  outline: none
  border: none
  border-radius: 50px
  line-height: 100%
  cursor: pointer
  transition: all .2s
  position: relative
  text-align: center
  @media (max-width: 769px)
    font-size: 16px
    box-shadow: none
  span
    position: relative
    z-index: 2
  svg
    margin-left: 8px
  path
    transition: all .2s
    fill: #ffffff
  &:before
    content: ''
    position: absolute
    z-index: 1
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $blue_gradient
    transition: opacity .2s
    border-radius: 50px
  &_border
    border: 1px solid $border
    background: transparent
    color: $blue
    &:before
      content: none
      display: none
  &_white
    background: #ffffff
    color: $blue
    path
      fill: $blue
    &:before
      content: none
      display: none
  &_215
    width: 215px
    @media (max-width: 769px)
      width: 199px
  &_full
    width: 100%
  &_m_b
    margin-bottom: 8px
  &_file
    overflow: hidden
    input
      position: absolute
      left: -99999px
  &_invite
    margin-top: 24px
    span
      display: flex
      align-items: center
      justify-content: center
    svg
      margin-left: 20px
  
  &:disabled, &._disabled
    background: $disabled
    pointer-events: none
    cursor: default
    &:before
      opacity: 0

.t-btn-wrapper
  display: flex
  justify-content: space-between

  // &:disabled, &._disabled
  //   background: $disabled
  //   pointer-events: none
  //   cursor: default
  //   &:before
  //     opacity: 0

.t-inputBox
  display: flex
  align-items: flex-start
  justify-content: flex-start
  flex-wrap: wrap
  margin: 0 -12px
  &_start
    justify-content: flex-start
  &_column
    flex-direction: column
    &-start
      align-items: flex-start
  .t-input
    margin: 0 12px 24px
  &_wrap
    .t-input
      &:last-child
        margin-bottom: 0


.t-input
  width: 100%
  margin-bottom: 24px
  position: relative
  &__subtext
    display: block
    margin-bottom: 16px
    font-size: 14px
    line-height: 17px
  label:not(.t-btn)
    display: block
    font-weight: bold
    margin-bottom: 8px
    line-height: 1.2
  input, textarea
    width: 100%
    background-color: $input
    background-repeat: no-repeat
    background-position: top right
    border: none
    border-radius: 8px
    padding: 0 16px
    color: $black
    font-family: 'rubik', Arial, sans-serif
    font-size: 16px
    line-height: 40px
    outline: none
    transition: all .2s
    &::placeholder
      color: $blue
    &:disabled
      pointer-events: none
      cursor: default
      padding: 0
      background: transparent
      line-height: 1.2
      height: auto
      + .mx-input-append
        opacity: 0
    &._border
      background: transparent
      border: 1px solid rgba($disabled, 0.4)
  textarea
    resize: none
    line-height: 1.2
    padding: 10px 16px
  .mx-datepicker.disabled
    opacity: 1
    cursor: default
  .mx-input
    height: 40px
    box-shadow: none
  .mx-input-append
    transition: opacity .2s
    width: 40px
    height: 40px
    padding: 0
    background: url('/img/calendar.png') no-repeat center
    svg
      display: none!important
  .v-select
    .vs__actions
      padding: 0
    .open-indicator
      width: 40px
      height: 40px
      background: url('/img/select.png') no-repeat center
      position: absolute
      top: 0
      right: 0
      transition: all .2s
      &:before
        content: none
        display: none
    .dropdown-toggle
      width: 100%
      background: $input
      border: none
      border-radius: 8px
      padding: 0
      height: 40px
      position: relative
      .clear
        display: none
    .vs__selected-options
      padding: 0
      width: 100%
      flex: none
    .selected-tag
      border: none
      border-radius: 0
      color: $black
      transition: padding .2s
    &.single
      input
        position: absolute
        top: 0
        left: 0
        padding: 0 40px 0 16px!important
        line-height: 40px!important
        width: 100%!important
        margin: 0!important
        transition: none
      .selected-tag
        display: block
        line-height: 40px
        white-space: nowrap
        overflow: hidden
        width: 100%
        text-overflow: ellipsis
        margin: 0
        padding: 0 40px 0 16px
    &.unsearchable
      input[type=search]
        opacity: 1
    .dropdown-menu
      margin-top: 8px
      border: none
      background: #FFFFFF
      box-shadow: 0 24px 48px rgba(0, 108, 202, 0.2)
      border-radius: 16px
      padding: 0
      >.highlight
        >a
          background: $blue!important
          color: #ffffff!important
      .active
        >a
          background: transparent
          color: $black
      li
        > a
          padding: 16px
          color: $black
          white-space: normal
    &.open
      &.single
        .selected-tag
          display: none
      .dropdown-toggle
        border-radius: 8px
      .open-indicator
        transform: scale(1, -1)
    &.disabled
      .dropdown-toggle, .dropdown-toggle input
        background: transparent
        cursor: default
        height: auto
      .open-indicator
        opacity: 0
        cursor: default
      .selected-tag
        padding: 0
        line-height: 1.2
  &__description
    margin-top: 18px
  &_30
    width: calc(100%/3 - 24px)
  &_70
    width: calc(200%/3 - 24px)
  &_320
    width: 368px
    padding-right: 48px
    max-width: 100%
  &_auto
    width: auto
    margin-right: 40px
  &_buttons
    margin-bottom: 32px
    display: flex
    align-items: center
    justify-content: flex-start
    &:last-child
      margin-bottom: 0
    .t-btn:not(:last-child)
      margin-right: 8px
  &_checkbox
    > label
      margin-bottom: 24px
    > div
      margin-bottom: 16px
      display: flex
      justify-content: flex-start
      &:last-child
        margin-bottom: 0
      label
        margin-bottom: 0
  &_checkbox-small
    > div
      margin-bottom: 16px
      display: flex
      justify-content: flex-start
      &:last-child
        margin-bottom: 0
      label
        margin-bottom: 0
  &._error
    input, textarea
      background-image: url('/img/input_error.png')
    .t-multiSelect__tag, .t-topicsSelect__tag, .v-select .dropdown-toggle
      &:before
        content: ''
        position: absolute
        top: 0
        right: 40px
        width: 40px
        height: 40px
        background-image: url('/img/input_error.png')
    .v-select
      input
        background: none
  &._success
    input, textarea
      background-image: url('/img/input_ok.png')
  &__delete
    cursor: pointer
    position: absolute
    bottom: 0
    right: 0
    width: 40px
    height: 40px
    background: transparent
    border: none
    display: flex
    align-items: center
    justify-content: center
  &__hint
    color: $grey
    font-size: 14px
    display: block
    margin-top: 8px
  &._disabled
    pointer-events: none
    *
      pointer-events: none
    .v-select
      .dropdown-toggle
        background: transparent
      .selected-tag
        color: $disabled
      .open-indicator
        display: none
        pointer-events: none
    input
      background: transparent!important
      color: $disabled!important

.t-checkbox
  vertical-align: top
  margin: 0 8px 0 0
  width: 16px
  height: 16px
  + label
    cursor: pointer
    font-family: 'rubik', Arial, sans-serif
    font-weight: normal
    padding: 0 0 0 24px
    position: relative
    font-size: 16px
    color: $black
    transition: all .2s
    a
      color: $blue
  &:not(checked)
    position: absolute
    opacity: 0
    + label
      &:before
        content: ''
        position: absolute
        top: 1px
        left: 0
        width: 16px
        height: 16px
        border-radius: 4px
        background: $disabled
        transition: background .2s
      &:after
        content: ''
        width: 16px
        height: 16px
        left: 0
        top: 1px
        position: absolute
        background: url('/img/checkbox.png') no-repeat center
        opacity: 0
        transition: opacity .2s
  &:checked
    + label
      &:before
        background: $blue
      &:after
        opacity: 1

.t-checkbox_label
  overflow: hidden
  // width: 100%
  display: block
  cursor: pointer
  font-family: 'rubik', Arial, sans-serif
  font-weight: normal!important
  // padding: 0 0 0 24px
  position: relative
  font-size: 16px
  color: $black
  // transition: all .2s
  // margin: 0
  // &:before
  //   content: ''
  //   position: absolute
  //   top: 1px
  //   left: 0
  //   width: 16px
  //   height: 16px
  //   border-radius: 4px
  //   background: $disabled
  //   transition: background .2s
  // &:after
  //   content: ''
  //   width: 16px
  //   height: 16px
  //   left: 0
  //   top: 1px
  //   position: absolute
  //   background: url('/img/checkbox.png') no-repeat center
  //   opacity: 0
  //   transition: opacity .2s
  // input
  //   position: absolute
  //   opacity: 0
  // &._checked
  //   &:before
  //     background: $blue
  //   &:after
  //     opacity: 1
  &._grey
    color: $grey !important

.t-checkbox_vertical
  vertical-align: top
  margin: 0 8px 0 0
  width: 16px
  height: 16px
  + label
    cursor: pointer
    font-family: 'rubik', Arial, sans-serif
    font-weight: bold
    padding: 0 0 0 32px
    position: relative
    font-size: 16px
    color: $black
    transition: all .2s
    a
      color: $blue
  &:not(checked)
    position: absolute
    opacity: 0
    + label
      &:before
        content: ''
        position: absolute
        top: 3px
        left: 0
        width: 24px
        height: 14px
        border-radius: 7px
        background: $disabled
        transition: background .2s
      &:after
        content: ''
        width: 14px
        height: 14px
        left: 0
        top: 3px
        position: absolute
        background: #ffffff
        transition: left .2s
        box-shadow: 0 3px 4px rgba(0, 108, 202, 0.3)
        border-radius: 50%
  &:checked
    + label
      &:before
        background: $blue
      &:after
        left: 10px

.t-radio
  vertical-align: top
  margin: 0 8px 0 0
  width: 16px
  height: 16px
  + label
    cursor: pointer
    font-family: 'rubik', Arial, sans-serif
    font-weight: normal
    padding: 0 0 0 24px
    position: relative
    font-size: 16px
    color: $black
    transition: all .2s
    a
      color: $blue
  &:not(checked)
    position: absolute
    opacity: 0
    + label
      &:before
        content: ''
        position: absolute
        top: 1px
        left: 0
        width: 16px
        height: 16px
        border-radius: 50%
        background: $disabled
        transition: background .2s
      &:after
        content: ''
        width: 16px
        height: 16px
        left: 0
        top: 1px
        position: absolute
        border-radius: 50%
        box-sizing: border-box
        border: 3px solid $blue
        opacity: 0
        transition: opacity .2s
  &:checked
    + label
      &:before
        background: $blue
        box-shadow: 0px 3px 4px rgba(0, 108, 202, 0.3)
      &:after
        opacity: 1

.t-selectMobile
  width: 175px
  height: 40px
  margin-right: 8px
  background-color: $input
  background-repeat: no-repeat
  background-position: top right
  border: none
  border-radius: 8px
  padding: 0 40px 0 16px
  color: $black
  font-family: 'rubik', Arial, sans-serif
  font-size: 16px
  line-height: 40px
  outline: none
  transition: all .2s
  position: relative
  &::placeholder
    color: $blue
  &-container
    position: relative
.t-selectMobile-time
  position: absolute
  padding: 12px
  top: 0
  right: 8px
  display: flex
  align-items: center
  justify-content: center

.t-file
  display: flex
  align-items: center
  justify-content: flex-start
  margin-bottom: 16px
  &__info
    font-size: 14px
    line-height: 17px
    color: $grey
    width: 192px
    margin: 0 8px
  &__name
    font-weight: bold
    font-size: 16px
    line-height: 19px
    color: $black
  &__del
    cursor: pointer
    transition: box-shadow .3s
    border-radius: 100px
    &:hover
      box-shadow: $shadow
  &_full
    .t-file
      &__name
        text-overflow: ellipsis
        overflow: hidden


.t-work-area
  width: 100%
  max-width: 1440px
  margin: 0 auto
  padding: 24px 88px 200px 40px
  &_error
    width: 1008px
    max-width: 100%
    margin: 0 auto
    padding: 64px 24px 200px
  &__row
    display: flex
    align-items: stretch
    justify-content: space-between
  &__column
    &_small
      flex: none
      width: 320px
      &:first-child
        margin-right: 32px
      &:last-child
        margin-left: 32px
      &._min
        width: 304px
      &_create
        width: 400px
    &_big
      width: calc(100% - 352px)
      flex: none
      &._only
        width: 100%
      &_create
        width: calc(100% - 432px)
  &__cell
    width: 100%
    padding: 24px
    @extend %substrate
    &_small
      padding: 8px
    &_promo
      width: 100%
      padding: 16px 8px 8px
      @extend %substrate_promo
      h2
        font-size: 16px
        margin: 0 0 16px
        text-align: center
      + .t-work-area__cell_promo
        margin-top: 8px
      + .t-btn
        margin-top: 24px
    + .t-work-area__cell
      margin-top: 32px
  h1
    margin: 0 0 24px
    flex: none
    width: 100%

.t-promo-course
  display: flex
  align-items: stretch
  justify-content: flex-start
  flex-wrap: wrap
  margin-top: 32px
  margin-bottom: 24px
  &__item-title
    text-align: center
    margin-bottom: 16px
  &__item
    margin-right: 24px
    width: calc(100% / 3 + 24px/3 - 24px )
    padding: 16px 8px 8px
    @extend %substrate_promo
    &:nth-child(3n)
      margin-right: 0
  @media (max-width: 1200px)
    &__item
      width: calc(100% / 2 + 24px/2 - 24px)
  @media (max-width: 769px)
    margin-bottom: 8px
    &__item
      width: 100%
      margin-bottom: 16px

.t-promo
  &__btn
    margin-top: 32px
    &:first-child
      margin-top: 0
    @media (max-width: 769px)
      padding: 0 24px


.t-swipper
  position: relative
  overflow: hidden
  margin-top: 32px
  margin-bottom: 32px
  .swiper-container
    margin: 0 -12px -16px
    padding: 0 12px 32px
  .swiper-slide
    margin: 0
    max-width: 100%
  &__pagination
    display: flex
    align-items: center
    justify-content: center
    margin: 0 auto
    .swiper-pagination-bullet
      margin: 0 2px
      background: $disabled
      opacity: 1
    .swiper-pagination-bullet-active
      background: $turquoise

@media (min-width: 770px)
  .t-btn
    &:hover
      &:before
        opacity: 0
    &_border:hover
      background: transparent
      border-color: $turquoise
      color: $turquoise
    &_white:hover
      background: $turquoise
      color: #ffffff
      path
        fill: #ffffff


@media (max-width: 1024px)
  .t-input
    &_tablet_full
      width: 100%

@media (max-width: 769px)
  .t-inputBox
    margin: 0 0 24px
    .t-input
      margin: 0 0 24px
      &:last-child
        margin-bottom: 0

  .t-input
    &_auto
      width: 100%
    &_30
      width: 100%
    &_70
      width: 100%
    &_buttons
      flex-direction: column
      .t-btn
        display: block
        margin-right: 0
        width: 100%
        + .t-btn
          margin-top: 8px

  .t-work-area
    padding: 0 0 16px
    h1
      margin-bottom: 16px
    .t-calendar
      margin: 0 auto
    &_error
      padding: 0 0 16px
    &__row
      flex-direction: column
    &__column_small
      width: 100%
      margin: 0
      &:first-child
        margin: 0 auto
      &:last-child
        margin-left: 0
        margin-top: 32px
      .t-calendar_small
        margin: 0 auto
        width: calc(100% - 32px)
      &_create
        order: -1
        &:last-child
          margin-top: 16px
          margin-bottom: 32px
    &__column_big
      width: 100%
      &:last-child
        margin-top: 32px
      &>*:last-child
        margin-bottom: 0
    &__cell
      max-width: 100%
      margin: 0 auto
      padding: 16px
      &_promo
        width: 336px
        max-width: 100%
        margin: 0 auto
        padding: 16px 0 8px
        .t-teacherItem
          margin: 0 auto

@media (max-width: 450px)
  .t-work-area
    &__cell
      &_promo
        width: 100%
        .t-teacherItem
          width: 100%
.swiper-pagination-bullet
  transition: all .3s
  flex: 0 0 auto
.swiper-pagination-bullets-dynamic
  margin: auto
  .swiper-pagination-bullet
    &:not([class ^= "swiper-pagination-bullet swiper-pagination-bullet-active"])
      opacity: 0
@media (max-width: 450px)
  .t-work-area
    &__cell
      &_promo
        width: 100%
        .t-teacherItem
          width: 100%


.t-block-cookies
  position: fixed
  bottom: 40px
  left: 80px
  width: calc(100% - 160px)
  z-index: 2
  display: flex
  justify-content: center
  &__container
    max-width: 1000px
    width: 100%
    @extend %substrate
    padding: 24px
    display: flex
    flex-direction: column
    align-items: center
  &__text
    text-align: center
  &__btn
    margin-top: 16px
    display: flex
    align-items: center
    /*.t-btn:first-child*/
      /*margin-right: 16px*/

@media (max-width: 770px)
  .t-block-cookies
    bottom: 80px
    left: 16px
    width: calc(100% - 32px)
    &__container
      padding: 16px
    &__text
      font-size: 14px

</style>
