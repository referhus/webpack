<template>
  <div class="t-transactions" v-if="transactions">
    <h2 v-if="small" class="_small">
        {{ transactionsText.last }}
        
        <cmp-search v-if="!small" :type="'transactions'"></cmp-search>
    </h2>
    <h2 v-else>
        {{ transactionsText.history }} 
        <cmp-search v-if="!small" :type="'transactions'"></cmp-search>
    </h2>
    <div class="t-transactions__list">
      <div class="t-transactionsItem" v-for="(item, index) in transactions.items">
        <span class="t-transactionsItem__type">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="item.type === 0">
            <path d="M4 13L4 1M4 13L1 9M4 13L7 9" stroke="#F39049" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" v-else>
            <path d="M4 1L4 13M4 1L1 5M4 1L7 5" stroke="#52A8F2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <p class="t-transactionsItem__date">{{ item.date }}</p>
        <p class="t-transactionsItem__cost _bold">{{ item.cost }} ₽</p>
        <p class="t-transactionsItem__description">{{ item.description }}</p>
      </div>
    </div>
    <div class="t-balance__buttons">
      <router-link v-if="small" class="t-btn t-btn_white" :to="{name: 'finance'}"><span>{{ transactionsText.history }}</span></router-link>
      <button class="t-btn t-btn_white" @click.prevent="modalDialogType_promoOpen()" v-if="small">
        <span>
          {{ balanceText.code }}
          <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.08155 1.13274C6.42863 0.326777 7.57137 0.326779 7.91845 1.13274L8.92819 3.47746C9.07296 3.81363 9.38984 4.04385 9.7543 4.07765L12.2963 4.31342C13.17 4.39446 13.5232 5.48127 12.8639 6.06042L10.946 7.74529C10.671 7.98686 10.55 8.35937 10.6304 8.71644L11.1917 11.2069C11.3847 12.0629 10.4602 12.7346 9.70564 12.2866L7.51056 10.9832C7.19584 10.7963 6.80416 10.7963 6.48944 10.9832L4.29436 12.2866C3.53983 12.7346 2.61533 12.0629 2.80827 11.2069L3.36956 8.71644C3.45004 8.35937 3.329 7.98686 3.05402 7.74529L1.13609 6.06042C0.476825 5.48127 0.829953 4.39446 1.70372 4.31342L4.24571 4.07765C4.61016 4.04385 4.92704 3.81363 5.07181 3.47746L6.08155 1.13274Z"
                  fill="#52A8F2"/>
          </svg>
        </span>
      </button>
    </div>

    <cmp-pagination v-if="!small && transactions._meta.pageCount > 1" :pages="transactions._meta.pageCount"></cmp-pagination>
  </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    import Pagination from './Pagination.vue'
    export default {
        props: ['small'],
        computed: {
            ...mapGetters('staticText', ['transactionsText', 'balanceText']),
            ...mapGetters('profile', ['transactions'])
        },
        components: {
            'cmp-pagination': Pagination
        },
        methods: {
            ...mapActions('modal', ['modalDialogType_promoOpen'])
        }
    }
</script>

<style lang="sass">
.t-transactions
  position: relative
  &:not(:first-child)
    margin-top: 32px
  h2
    color: $blue
    margin: 0 0 24px
    font-size: 22px
    &._small
      font-size: 16px
      margin-bottom: 0
  &__list
    margin: 0 0 32px
    display: flex
    flex-direction: column
    padding-left: 48px
    &._small
      padding-left: 0
      .t-transactionsItem:last-child
        border-bottom: none
  > *:last-child
    margin-bottom: 0

.t-transactionsItem
  padding: 16px 0
  border-bottom: 1px solid $border
  display: flex
  flex-wrap: wrap
  align-items: center
  position: relative
  &__type
    width: 40px
    height: 40px
    position: absolute
    top: 50%
    left: -48px
    display: flex
    align-items: center
    justify-content: center
    margin-top: -20px
  p
    &._bold
      font-weight: bold
      color: $blue
  &__date
    margin-right: 24px
    @media (max-width: 1080px)
      margin-right: auto
  &__cost    
    margin-right: 24px
    @media (max-width: 1080px)
      margin-right: unset
  &__description
    margin-right: 24px
    @media (max-width: 1440px)
      width: 100%


@media (max-width: 769px)
  .t-transactions
    //border-top: 1px solid $border
    //margn-top: 24px
    //padding-top: 24px
    h2
      margin-bottom: 16px
      &._small
        margin-bottom: 16px
    &__list
      margin-bottom: 24px
      padding-left: 0
    .t-btn
      display: block
    .t-search-filter
      margin-bottom: 24px
  .t-transactionsItem
    align-items: flex-start
    padding: 0 0 8px
    margin-bottom: 8px
    &__date
      color: $grey
      width: 100%    
      order: -1
    &__type
      position: relative
      top: 0
      left: 0
      height: auto
      align-self: center
      margin-top: 0
      margin-bottom: 10px
    &:last-child
      margin-bottom: 0
    p
      margin-right: 0
      margin-bottom: 8px
      &:last-child
        margin-bottom: 0
</style>
