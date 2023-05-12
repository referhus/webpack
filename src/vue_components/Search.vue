<template>
    <div class="t-search-filter" :class="{ '_filter-only':(type == 'transactions')}">
        <form v-if="type != 'transactions'" class="t-search" @submit.stop.prevent="SubmitSearch()">
            <div class="t-input">
                <input :placeholder="placeholder[type]" v-model="q"/>
            </div>
            <transition name="fade">
                <span class="t-search__clear" v-if="clearState" @click.stop.prevent="Clear()">
                  <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L13 13M13 1L1 13" stroke="#52A8F2" stroke-width="2"/>
                  </svg> 
                </span>
            </transition>
            <button class="t-search__submit">
                <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M12 5.5C12 7.43311 10.4331 9 8.5 9C6.56689 9 5 7.43311 5 5.5C5 3.56689 6.56689 2 8.5 2C10.4331 2 12 3.56689 12 5.5ZM14 5.5C14 8.5376 11.5376 11 8.5 11C7.34253 11 6.26831 10.6426 5.38232 10.0317L1.70703 13.707C1.31665 14.0977 0.68335 14.0977 0.292969 13.707C-0.0976562 13.3167 -0.0976562 12.6833 0.292969 12.293L3.96826 8.61768C3.35742 7.73169 3 6.65747 3 5.5C3 2.4624 5.4624 0 8.5 0C11.5376 0 14 2.4624 14 5.5Z"
                          fill="#52A8F2" fill-opacity="1"/>
                </svg>
            </button>
        </form>
        <div class="t-filter" v-if="type !== 'search'">
            <div class="t-search-filter__openLink"
                 :class="{_active: $route.query.transactions || $route.query.courses || $route.query.topics}"
                 @click.prevent="filterOpen">
        <span>
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M1 13C1 13.5527 1.44727 14 2 14C2.55273 14 3 13.5527 3 13V5.73242C3.27344 5.57422 3.50586 5.35156 3.67773 5.08594C3.88086 4.77344 4 4.40039 4 4C4 3.3291 3.66992 2.73535 3.16406 2.37207C3.11133 2.33398 3.05664 2.29883 3 2.2666V1C3 0.672852 2.8418 0.381836 2.59961 0.199219C2.43164 0.0742188 2.22461 0 2 0C1.44727 0 1 0.447266 1 1V2.26758C0.402344 2.61328 0 3.25977 0 4C0 4.72363 0.384766 5.35742 0.960938 5.70898L1 5.73242V13ZM7 13C7 13.5527 7.44727 14 8 14C8.55273 14 9 13.5527 9 13V11.7324C9.29297 11.5625 9.53906 11.3203 9.71289 11.0303C9.89453 10.7295 10 10.377 10 10C10 9.25977 9.59766 8.61328 9 8.26758V1C9 0.447266 8.55273 0 8 0C7.44727 0 7 0.447266 7 1V8.26758C6.83008 8.36523 6.67578 8.48828 6.54297 8.62988C6.20703 8.98828 6 9.46973 6 10C6 10.7402 6.40234 11.3867 7 11.7324V13ZM14 14C13.4473 14 13 13.5527 13 13V8.73145C12.9707 8.71484 12.9414 8.69727 12.9141 8.67871C12.3633 8.32227 12 7.7041 12 7C12 6.25977 12.4023 5.61328 13 5.26758V1C13 0.447266 13.4473 0 14 0C14.5527 0 15 0.447266 15 1V5.26758C15.5977 5.61328 16 6.25977 16 7C16 7.23828 15.959 7.4668 15.8828 7.67871C15.7207 8.125 15.4062 8.49805 15 8.73242V13C15 13.2793 14.8848 13.5312 14.7012 13.7129C14.5215 13.8906 14.2734 14 14 14Z"
                  fill="#52A8F2"/>
          </svg>
        </span>
                {{ search.filterTitle }}
            </div>
            <div class="t-fs-dialog" v-show="filterState">
                <span v-if="mobileState" class="t-fs-dialog__close" @click.prevent="filterClose()"></span>
                <transition name="fade">
                    <form class="t-filterForm" @submit.prevent="SubmitFilter()" v-show="filterState">

                        <div class="t-input" v-for="(input, index) in filter[type]" :key="index"
                             v-if="!input.onlyMembers || (input.onlyMembers && hasAuth)"
                             :class="{'t-input_checkbox': input.type == 'checkbox_list' || input.type == 'radio_list'}">
                            <label>{{ input.title }}</label>

                            <template v-if="input.type == 'checkbox_list'">
                                <div v-for="(checkbox, index_checkbox) in input.items"
                                     :key="'filter_checkbox_' + index_checkbox">
                                    <input type="checkbox" v-model="checkbox.checked"
                                           :id="input.name + '_' + index_checkbox" class="t-checkbox">
                                    <label :for="input.name + '_' + index_checkbox">{{ checkbox.title }}</label>
                                </div>
                            </template>

                            <template v-if="input.type == 'radio_list'">
                                <div v-for="(radio, index_radio) in input.items" :key="'courses_radio_' + index_radio">
                                    <input type="radio" v-model="input.value" :value="radio.value"
                                           :id="input.name + '_' + index_radio" class="t-radio">
                                    <label :for="input.name + '_' + index_radio">{{ radio.title }}</label>
                                </div>
                            </template>
                            
                            <cmp-topics-select v-if="input.type === 'topics_select'"
                                            :value="input.value"
                                            :options="input.options"
                                            :addForm="false"
                                            :name="input.name"
                                            :placeholder="input.placeholder"
                                            class="_30 _right"
                                            v-model="input.value"
                            ></cmp-topics-select>

                        </div>
                        <button class="t-btn"><span>{{ search.filterBtn }}</span></button>
                        <button class="t-btn t-btn_white" @click.stop.prevent="ClearFilter()">
                            <span>{{ search.filterClear }}</span></button>
                    </form>
                </transition>
            </div>
        </div>
        <div class="t-sort" v-if="type == 'full'">
            <div class="t-search-filter__openLink" @click.prevent="sortOpen">
        <span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M0.723827 10.4473L2.10566 13.2109C2.47432 13.9482 3.52607 13.9482 3.89473 13.2109L5.27656 10.4473C5.60908 9.78223 5.12544 9 4.38227 9H4.00019V1C4.00019 0.447754 3.55244 0 3.00019 0C2.44795 0 2.00019 0.447754 2.00019 1V9H1.61811C0.87495 9 0.391307 9.78223 0.723827 10.4473ZM11.8947 0.789062C11.5261 0.0517578 10.4743 0.0517578 10.1057 0.789062L8.72383 3.55273C8.39131 4.21777 8.87495 5 9.61811 5H10.0002V13C10.0002 13.5522 10.4479 14 11.0002 14C11.5524 14 12.0002 13.5522 12.0002 13V5H12.3823C13.1254 5 13.6091 4.21777 13.2766 3.55273L11.8947 0.789062Z"
                  fill="#52A8F2"/>
          </svg>
        </span>
                <template v-if="!$route.query.sort">{{ search.sort_1 }}</template>
                <template v-else>
                    <template v-if="$route.query.sort === 'date'">{{ search.sort_1 }}</template>
                    <template v-if="$route.query.sort === 'popular'">{{ search.sort_2 }}</template>
                    <template v-if="$route.query.sort === 'price'">{{ search.sort_3 }}</template>
                </template>
            </div>

            <div class="t-fs-dialog" v-show="sortState">
                <span v-if="mobileState" class="t-fs-dialog__close" @click.prevent="sortClose()"></span>
                <transition name="fade">
                    <div class="t-sort__box" v-show="sortState">
                        <router-link
                                :to="{name: $route.name, query: Object.assign({}, $route.query, {sort: 'date'}, {page: 1})}"
                                :class="{_active: !$route.query.sort || $route.query.sort === 'date'}">{{ search.sort_4
                            }}
                        </router-link>
                        <router-link
                                :to="{name: $route.name, query: Object.assign({}, $route.query, {sort: 'popular'}, {page: 1})}"
                                :class="{_active: $route.query.sort === 'popular'}">{{ search.sort_5 }}
                        </router-link>
                        <router-link
                                :to="{name: $route.name, query: Object.assign({}, $route.query, {sort: 'price'}, {page: 1})}"
                                :class="{_active: $route.query.sort === 'price'}">{{ search.sort_6 }}
                        </router-link>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
  import { store } from '../store'

  import { mapGetters } from 'vuex';
  import { mapActions } from 'vuex';

  import TopicsSelect from './TopicsSelect.vue'
  import MultiSelect from './MultiSelect.vue'

  export default {
    props: ['type'],
    components: {
      'cmp-topics-select': TopicsSelect,
      'cmp-multi-select': MultiSelect
    },
    data() {
      return {
        action_search: {
          full: 'search_courses',
          search: 'search',
          transactions: 'search_transactions'
        },
        placeholder: {
          full: store.getters['staticText/search'].searchPlaceholderFull,
          search: store.getters['staticText/search'].searchPlaceholder,
          transactions: store.getters['staticText/search'].searchPlaceholderTransactions,
        },
        q: '',
        filter: {
          transactions: [
            {
              title: store.getters['staticText/search'].transactionsTitle,
              type: 'checkbox_list',
              name: 'transactions',
              items: [
                {
                  value: 1,
                  title: store.getters['staticText/search'].transactions_1,
                  checked: false
                },
                {
                  value: 2,
                  title: store.getters['staticText/search'].transactions_2,
                  checked: false
                },
                {
                  value: 3,
                  title: store.getters['staticText/search'].transactions_3,
                  checked: false
                }
              ]
            }
          ],
          full: [
            {
              title: store.getters['staticText/search'].coursesTitle,
              type: 'radio_list',
              name: 'courses',
              onlyMembers: true,
              value: 1,
              items: [
                {
                  value: 1,
                  title: store.getters['staticText/search'].courses_1
                },
                {
                  value: 2,
                  title: store.getters['staticText/search'].courses_2
                },
                {
                  value: 3,
                  title: store.getters['staticText/search'].courses_3
                }
              ]
            },
            // {
            //   type: 'select_multi',
            //   name: 'field_knowledge',
            //   title: store.getters['staticText/search'].fieldKnowledge,
            //   value: [],
            //   options: store.getters['handbook/field_knowledge'],
            //   placeholder: '',
            //   error: false,
            //   pattern: '',
            //   required: false
            // },
            {
              type: 'topics_select',
              name: 'topics',
              title: store.getters['staticText/search'].interestingTopics,
              value: [],
              options: store.getters['handbook/topics'],
              placeholder: '',
              error: false,
              pattern: '',
              required: false
            }
          ]
        },
        sort: ''
      }
    },
    computed: {
      ...mapGetters(['filterState', 'sortState', 'mobileState']),
      ...mapGetters('staticText', ['search']),
      ...mapGetters('profile', {
        hasAuth: 'hasAuth'
      }),
      clearState() {
        return this.q !== ''
      },
    },
    methods: {
      ...mapActions(['filterOpen', 'filterClose', 'sortOpen', 'sortClose']),
      SubmitSearch() {
        if (this.$route.name === 'finance' && this.type === 'transactions')
          this.$router.push({ name: this.$route.name, query: { q: this.q, sort: this.$route.query.sort, page: 1 } });
        else
          this.$router.push({ name: 'courses', query: { q: this.q, sort: this.$route.query.sort, page: 1 } });
      },
      SubmitFilter() {
        let query = {};
        for (let i = 0; i < this.filter[this.type].length; i++) {
          switch (this.filter[this.type][i].type) {
            case 'radio_list':
              query[this.filter[this.type][i].name] = this.filter[this.type][i].value;
              break;
            case 'checkbox_list':
              let check = [];
              for (let j = 0; j < this.filter[this.type][i].items.length; j++) {
                if (this.filter[this.type][i].items[j].checked)
                  check.push(this.filter[this.type][i].items[j].value)
              }
              if (check.length)
                query[this.filter[this.type][i].name] = check.join(',');
              break;
            case 'topics_select':
              let check_multi = [];
              for (let j = 0; j < this.filter[this.type][i].value.length; j++) {
                check_multi.push(this.filter[this.type][i].value[j].value)
              }
              if (check_multi.length)
                query['q'+this.filter[this.type][i].name] = check_multi.join(',');
              break;
            default:
              break;
          }
        }

        this.$router.push({
          name: this.$route.name,
          query: Object.assign({ q: this.$route.query.q }, { sort: this.$route.query.sort }, { page: 1 }, query)
        });

        this.filterClose();
      },
      Clear() {
        this.q = '';

        let query = {};
        for (let key in this.$route.query) {
          if (key !== 'q') {
            query[key] = this.$route.query[key]
          }
        }

        this.$router.push({ name: this.$route.name, query: Object.assign(query, { page: 1 }) });
      },
      updateSelect(index, e) {
        this.filter.full[index].value = e;
      },
        updateTopics(e) {
            this.filter.full[2].options = e;
        },
      ClearFilter() {
        for (let i = 0; i < this.filter[this.type].length; i++) {
          switch (this.filter[this.type][i].type) {
            case 'radio_list':
              this.filter[this.type][i].value = 1;
              break;
            case 'checkbox_list':
              for (let j = 0; j < this.filter[this.type][i].items.length; j++) {
                this.filter[this.type][i].items[j].checked = false;
              }
              break;
            case 'topics_select':
              this.filter[this.type][i].value = [];
              // for (let j = 0; j < this.filter[this.type][i].options.length; j++) {
              //   this.filter[this.type][i].options[j].checked = false;
              //   this.filter[this.type][i].value = [];
              // }
              break;
            default:
              break;
          }
        }

        this.$router.push({
          name: this.$route.name,
          query: Object.assign({ q: this.$route.query.q }, { sort: this.$route.query.sort }, { page: 1 })
        });

        this.filterClose();
      }
    },
    mounted() {
      if (this.$route.query.q)
        this.q = this.$route.query.q;
      if (this.type !== 'search')
        for (let i = 0; i < this.filter[this.type].length; i++) {
          let query = this.$route.query[this.filter[this.type][i].name];
          if (query) {
            switch (this.filter[this.type][i].type) {
              case 'radio_list':
                this.filter[this.type][i].value = query;
                break;
              case 'checkbox_list':
                let arr2 = query.split(',');
                for (let j = 0; j < this.filter[this.type][i].items.length; j++) {
                  if (arr2.indexOf(this.filter[this.type][i].items[j].value + '') >= 0) {
                    this.filter[this.type][i].items[j].checked = true;
                  }
                }
                break;
              case 'select_multi':
                let arr = query.split(',');
                for (let j = 0; j < this.filter[this.type][i].options.length; j++) {
                  if (arr.indexOf(this.filter[this.type][i].options[j].value + '') >= 0) {
                    this.filter[this.type][i].options[j].checked = true;
                    if (this.filter[this.type][i].type === 'select_multi') {
                      this.filter[this.type][i].value.push(this.filter[this.type][i].options[j]);
                    }
                  }
                }
                break;
              default:
                break;
            }
          }
        }
    }
  }
</script>

<style lang="sass">
    .t-search-filter
        width: 100%
        display: flex
        align-items: center
        justify-content: flex-start
        &._filter-only
            width: unset
            position: absolute
            right: 0
            top: 0
            @media (max-width: 769px)
                position: relative
            .t-filterForm 
                left: unset
                right: 0

        &__openLink
            margin: 0 8px
            display: flex
            align-items: center
            cursor: pointer
            span
                width: 40px
                height: 40px
                position: relative
                display: flex
                align-items: center
                justify-content: center
            &._active
                span:after
                    content: ''
                    position: absolute
                    top: 4px
                    right: 4px
                    width: 6px
                    height: 6px
                    border-radius: 50%
                    background: $accented

    .t-search
        max-width: 62.391%
        flex: 1
        position: relative
        .t-input
            margin: 0
            input
                background-color: #F5FBFC
                font-size: 18px
                line-height: 150%
                &::placeholder
                  color: #AAB6BE
                &[placeholder] 
                    padding: 10px 32px 10px 48px
                    text-overflow: ellipsis
                    overflow: hidden

                &::-webkit-input-placeholder
                    opacity: 1
                    transition: opacity 0.3s ease
                &::-moz-placeholder
                    opacity: 1
                    transition: opacity 0.3s ease
                &:-moz-placeholder
                    opacity: 1
                    transition: opacity 0.3s ease
                &:-ms-input-placeholder
                    opacity: 1
                    transition: opacity 0.3s ease
                &:focus
                    padding: 10px 32px 10px 48px
                    &::-webkit-input-placeholder
                        opacity: 0
                        transition: opacity 0.3s ease
                    &::-moz-placeholder
                        opacity: 0
                        transition: opacity 0.3s ease
                    &:-moz-placeholder
                        opacity: 0
                        transition: opacity 0.3s ease
                    &:-ms-input-placeholder
                        opacity: 0
                        transition: opacity 0.3s ease
        &__submit
            background: none
            border: none
            outline: none
            position: absolute
            top: 0
            left: 0
            width: 40px
            height: 48px
            display: flex
            align-items: center
            justify-content: center
            z-index: 2
            cursor: pointer
            path
                transition: all .2s
        &__clear
            outline: none
            position: absolute
            top: 0
            right: 0
            width: 40px
            height: 48px
            display: flex
            align-items: center
            justify-content: center
            z-index: 2
            cursor: pointer

    .t-filter
        position: relative
        font-size: 16px

    .t-filterForm
        width: 320px
        position: absolute
        z-index: 2
        top: 100%
        left: 8px
        margin-top: 8px
        padding: 24px
        @extend %substrate
        &>.t-btn
            width: 100%
            + .t-btn
                margin-top: 8px

    .t-sort
        position: relative
        &__box
            position: absolute
            z-index: 2
            top: 100%
            left: 8px
            margin-top: 8px
            padding: 24px
            display: flex
            flex-direction: column
            @extend %substrate
            a
                white-space: nowrap
                transition: color .2s
                &._active
                    color: $blue
                &:not(:last-child)
                    margin-bottom: 16px
                @media(min-width: 770px)
                    &:hover
                        color: $blue

    @media (max-width: 769px)
        .t-search-filter
            flex-wrap: wrap
        .t-search
            max-width: 100%
            flex: none
            width: 100%
            .t-input
              input
                font-size: 16px
                line-height: 135%
                &[placeholder] 
                  padding: 11px 12px 11px 44px
                &:focus
                  padding: 11px 12px 11px 44px

            &__submit, &__clear
                height: 44px

        .t-filter, .t-sort
            margin-top: 8px

        .t-fs-dialog
            position: fixed
            top: 0
            left: 0
            right: 0
            bottom: 0
            overflow-x: hidden
            overflow-y: auto
            z-index: 2
            background: $over
            padding: 88px 0 80px
            &__close
                position: absolute
                cursor: pointer
                top: 16px
                right: 0
                left: 0
                margin: auto
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
        .t-filterForm, .t-sort__box
            top: 0
            left: 0
            right: 0
            margin: auto
            max-width: 100%
            width: 320px
            position: relative
</style>