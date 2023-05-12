<template>
  <div class="t-dialog">
    <v-bar v-if="!mobileState" wrapper="t-dialog__scroll" >
      <div class="t-dialog__wrapper">
        <div class="t-dialog__overlay" @click.stop.prevent="Close()"></div>
        <div class="t-dialog__content" >
          <span class="t-dialog__close" @click.stop.prevent="Close()"></span>
          <component v-bind:is="modalDialogType" :key="modalDialogType" :props="modalDialogProps"></component>
        </div>
      </div>
    </v-bar>
    <div class="t-dialog__wrapper" v-else>
      <div class="t-dialog__overlay" @click.stop.prevent="Close()"></div>
      <div class="t-dialog__content" >
        <span class="t-dialog__close" @click.stop.prevent="Close()"></span>
        <component v-bind:is="modalDialogType" :key="modalDialogType" :props="modalDialogProps"></component>
      </div>
    </div>
  </div>
</template>

<script>
  import VBar from 'v-bar'

  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';

  import Auth from './Auth.vue'
  import Registration from './Registration.vue'
  import CallBack from './Callback.vue'
  import PasswordReset from './PasswordReset.vue'

  export default {
      components: {
          Auth,
          Registration,
          CallBack,
          PasswordReset,
          VBar
      },
      computed: {
          ...mapGetters(['mobileState']),
          ...mapGetters('modal',{
              modalDialogType: 'modalDialogType',
              modalDialogProps: 'modalDialogProps'
          })
      },
      methods: {
          ...mapActions('modal',{
              Close: 'modalDialogClose'
          })
      }
  }
</script>

<style lang="sass">
.t-dialog
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 100
  &__close
    position: absolute
    cursor: pointer
    top: -24px
    right: -24px
    width: 56px
    height: 56px
    border-radius: 50%
    background: #ffffff
    box-shadow: 0 24px 32px rgba(0, 108, 202, 0.1)
    z-index: 2
    &:before, &:after
      content: ''
      position: absolute
      left: 50%
      top: 50%
      margin: -1px 0 0 -13px
      width: 26px
      height: 2px
      border-radius: 1px
      background: #52A8F2
    &:before
      transform: rotate(45deg)
    &:after
      transform: rotate(-45deg)
  &__scroll
    width: 100%
    height: 100%
  &__overlay
    position: fixed!important
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: $over
    z-index: 1
  &__wrapper
    width: 100%
    height: 100%
    display: flex
    align-items: center
    justify-content: center
  &__content
    position: relative
    z-index: 1
    h2
      margin: 0 0 16px
      color: $blue
    .t-social
      display: flex
      align-items: center
      justify-content: flex-start
      margin: 0 0 24px
      button
        cursor: pointer
        background: transparent
        border: none
        outline: none
        img
          display: block
        &:not(:last-child)
          margin-right: 8px
    .t-link
      display: table
      color: $blue
      font-size: 14px
      line-height: 1.2
      margin: 0 auto 24px
      cursor: pointer
    .t-btn
      // width: 100%
      margin-bottom: 8px
      &:last-child
        margin-bottom: 0

@media(max-width: 769px)
  .t-dialog
    &__close
      top: unset
      bottom: calc(100% + 20px)
      right: 0
      left: 0
      margin: auto
    .bar--wrapper
      position: relative
      width: 100%
      height: 100%
      overflow-y: hidden!important
      overflow-x: hidden!important
      > *
        padding-right: 0!important
        padding-bottom: 0 !important
    &__wrapper
      padding-top: 88px
      overflow-y: auto
      overflow-x: hidden
      display: block
</style>
