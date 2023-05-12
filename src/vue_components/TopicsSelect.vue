<template>
  <div class="t-topicsSelect" :class="{_disabled: disabled}" @click.stop="">
    <div class="t-topicsSelect__tag t-dropdown-tag" :class="{_open: open}"
        @click.stop="DropdowOpen">{{ value_text.length ? value_text : topics.empty }}</div>
    <div class="t-topicsSelect__dropdow" v-show="open">
      <template >
          <span class="t-topicsSelect__title">{{topics.title}}</span>
          <span class="t-topicsSelect__close" @click="DropdowClose()"></span>
          <div class="t-optionItem__wrapper">
              <div class="t-optionItem__col" v-for="i in 3"  :key="'topicsSelect__col'+i" >
                  <div v-for="(item, index) in options_updated.items.slice((i-1)*(1 + Math.trunc(options_updated.items.length/3)), (i)*(1+Math.trunc(options_updated.items.length/3)))" 
                      :key="'topicsSelect__col'+index" 
                      class="t-topicsSelect__item t-optionItem">
                    <div class="t-optionItem__tag">
                      <input :id="'t-topicsSelect__checkbox'+item.value" class="t-checkbox" type="checkbox" :value="{ value: item.value, label: item.label}" v-model="checkedTopics">
                      <label :for="'t-topicsSelect__checkbox'+item.value" class="t-checkbox_label _null">
                      </label>
                      <span :title="item.label"
                          class="t-checkbox_label"
                          :class="{_grey: item.grey}"
                          @click="ItemDropdowToggle(item)">
                          <span v-for=" (i, j) in Cut(item.label).split(' ')" :key="j" > 
                            {{i}}
                            <svg
                              v-if="(j + 1) === Cut(item.label).split(' ').length && !item.grey && item.dropDoown != undefined"
                              :class="{_open:item.dropDoown}"
                              width="16" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M3.99961 10.8008L3.99961 1.20078M3.99961 10.8008L1.59961 7.60078M3.99961 10.8008L6.39961 7.60078" stroke="#52A8F2" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg> 
                          </span>
                      </span>
                    </div>
                    <transition name="fade">
                      <div v-if="!item.grey && item.dropDoown != undefined" v-show="item.dropDoown" class="t-optionItem__dropdown">
                        <div class="t-optionItem" v-for="(item2, index2) in item.items" :key="'topicsSelect__options'+index2">
                          <input :id="'t-topicsSelect__checkbox'+item2.value" class="t-checkbox" type="checkbox" :value="{ value: item2.value, label: item2.label}" v-model="checkedTopics">
                          <label :for="'t-topicsSelect__checkbox'+item2.value" class="t-checkbox_label t-optionItem__text" :class="{_grey: item2.grey}">
                            <span :title="item2.label ">{{ item2.label }}</span>
                          </label>
                        </div>
                        <template v-if="addForm">
                          <transition name="fade" mode="out-in">
                              <div v-if="item.newVal == undefined " :key="'add-form-'+item.value" @click="openAddOption(item)" class="t-optionAdd t-optionItem">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8 1C8 0.447715 7.55228 0 7 0C6.44772 0 6 0.447715 6 1V6H1C0.447715 6 0 6.44772 0 7C0 7.55228 0.447715 8 1 8H6V13C6 13.5523 6.44772 14 7 14C7.55228 14 8 13.5523 8 13V8H13C13.5523 8 14 7.55228 14 7C14 6.44772 13.5523 6 13 6H8V1Z" fill="#52A8F2"/>
                                </svg>
                                <span>
                                  {{topics.addNew}}
                                </span>
                              </div>
                              <form v-if="item.newVal != undefined " :key="'add-form-'+item.value" class="t-optionAddForm t-optionItem" @submit.stop.prevent="AddOption(item)">
                                <div class="t-input" :class="{_error: item.error}">
                                    <input 
                                        :ref="'optionAdd'+item.value" 
                                        v-model="item.newVal" 
                                        :placeholder="'Название темы'"
                                        @focus="focusAddOption(item)">
                                </div>
                                <div class="t-input_buttons">
                                    <button class="t-btn t-btn_full">
                                      <span>{{topics.yes}}</span>
                                    </button>
                                    <button type="button" class="t-btn t-btn_white t-btn_full" @click="item.newVal = undefined">
                                      <span>{{topics.no}}</span>
                                    </button>
                                </div>
                              </form>
                          </transition>
                        </template>
                      </div>
                    </transition>
                </div>
                <template v-if="addForm&&(i==3)">
                    <div v-if="options_updated.newVal == undefined " @click="openAddOption(options_updated)"  class="t-optionAdd t-optionItem">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 1C8 0.447715 7.55228 0 7 0C6.44772 0 6 0.447715 6 1V6H1C0.447715 6 0 6.44772 0 7C0 7.55228 0.447715 8 1 8H6V13C6 13.5523 6.44772 14 7 14C7.55228 14 8 13.5523 8 13V8H13C13.5523 8 14 7.55228 14 7C14 6.44772 13.5523 6 13 6H8V1Z" fill="#52A8F2"/>
                      </svg>
                      <span>
                          {{topics.addNew}}
                      </span>
                    </div>
                    <form v-if="options_updated.newVal != undefined " class="t-optionAddForm t-optionItem" @submit.stop.prevent="AddOption(options_updated)">
                      
                      <div class="t-input" :class="{_error: options_updated.error}">
                          <input 
                              :ref="'optionAddRoot'" 
                              v-model="options_updated.newVal" 
                              :placeholder="'Название темы'"
                              @focus="focusAddOption(options_updated)">
                      </div>
                      
                      <div class="t-input_buttons">
                          <button class="t-btn t-btn_full">
                            <span>{{topics.yes}}</span>
                          </button>
                          <button type="button" class="t-btn t-btn_white t-btn_full" @click="options_updated.newVal = undefined">
                            <span>{{topics.no}}</span>
                          </button>
                      </div>
                    </form>
                </template>
              </div>
          </div>
      </template>
    </div>
  </div>
</template>

<script>
  import VBar from 'v-bar'
  import Vue from 'vue'

  import {mapGetters,mapActions} from 'vuex';

  export default {
      components: { VBar },
      // props: ['value', 'options', 'disabled', 'addForm'],

      props: {
        value: Array, 
        options: Array, 
        disabled: Boolean, 
        name: String,
        placeholder: String,
        addForm: {
          type: Boolean,
          default: true,
        }
      },
      data() {
          return{
              open: false,
              hasOptions: true,
              options_updated: {
                items: undefined,
                newVal: undefined, 
                error: undefined, 
                value: false
              },
              newOptionRegEx: /^[а-яА-Яa-zA-Z0-9.,/_]+( +[а-яА-Яa-zA-Z0-9.,/_]+)*$/,
              disabledTopics: true,
              checkedTopics: this.value
          }
      },
      computed: {
          ...mapGetters('staticText', ['topics']),
          value_text(){
              let val = '';
              for(let i = 0; i < this.checkedTopics.length; i++){
                  val += this.checkedTopics[i].label;
                  if((i+1) < this.checkedTopics.length)
                      val += ', ';
              }
              return val;
          },
      },
      watch: {
          open(newVal){
            if (newVal) {
              document.addEventListener('click', this.DropdowClose);
            } else {
              this.$emit('input', this.checkedTopics)
              document.removeEventListener('click', this.DropdowClose);
            }
          },
          value(){
            this.checkedTopics = this.value
          }
      },
      methods: {
          ...mapActions('msg', ['showMsg']),
          Cut(text){
            if (text.length >= 56){
              return text.slice(0, 56) + '...'
            }
            return text
          },
          DropdowOpen(){
              this.open = !this.open
          },
          DropdowClose(){
              this.open = false;
          },
          ItemDropdowToggle(item){
              if(item.dropDoown != undefined){
                  item.dropDoown = !item.dropDoown
              }
          },
          openAddOption(item){
            item.newVal = ''; 
            setTimeout(() => {
              // поставить фокус на инпут при отркытии формы добавления новой темы
              if(item.value) {
                // дочерний список
                this.$refs['optionAdd'+item.value][0].focus();
              } else {
                // корневой список
                this.$refs['optionAddRoot'][0].focus();
              }
            }, 200);
          },
          focusAddOption(item){
            item.error = false;
          },
          AddOption(item){
              if (this.newOptionRegEx.test(item.newVal)){
                  let new_op = {
                      label: item.newVal,
                      value: item.value + '-' + item.items.length,
                  };

                  let new_op_full = Object.assign({}, new_op, {grey: true} );
                  item.items.push(new_op_full);
                  this.$set(this.checkedTopics, this.checkedTopics.length, new_op);
                  item.newVal = undefined;
                  this.showMsg('Тема будет доступна другим пользователям после проверки модератором.');
              } else {                
                item.error = true
              }
          },
      },
      created(){
          this.options_updated.items = JSON.parse(JSON.stringify(this.options));
          for (let i = 0; i < this.options_updated.items.length; i++) {
            let dropDoown = false;
            if(!this.addForm){
              dropDoown = undefined;
            }
            if ( this.options_updated.items[i].items) {
              dropDoown = false;
              for (let j = 0; j < this.options_updated.items[i].items.length; j++) {
                  let item = {}
                  item.label = this.options_updated.items[i].items[j].label;
                  item.value = this.options_updated.items[i].items[j].value;
                  for (let k = 0; k < this.value.length; k++) {
                    if ( this.options_updated.items[i].items[j].value === this.value[k].value ) {
                      dropDoown = true;
                      break;
                    }
                  }
                  if (dropDoown)
                    break;
              }
            } else {

            this.$set(this.options_updated.items[i], 'items', [] )
            }

            this.$set(this.options_updated.items[i], 'dropDoown', dropDoown )
            this.$set(this.options_updated.items[i], 'newVal', undefined )
            this.$set(this.options_updated.items[i], 'error', undefined )
          }
      }
  }
</script>

<style lang="sass">

.t-optionItem
  max-width: 272px
  position: relative
  margin-bottom: 16px 
  &__col
    display: flex
    flex-direction: column
    width: calc(100%/3 - 16px)
    min-width: 250px
    @media (max-width: 1330px)
      width: 100%
  &__wrapper
    display: flex
    flex-wrap: wrap
    height: auto
    max-height: 70vh
    max-height: calc(80vh - 96px)
    overflow-y: scroll
    touch-action: manipulation
    touch-action: pan-y
    -webkit-overflow-scrolling: touch
  &__text
    span
      max-height: 42px
      overflow: hidden
      text-overflow: ellipsis
  &__tag
    &:hover
      span 
        color: $turquoise
      svg
        path
          stroke: $turquoise
    span
      line-height: 1.3
      cursor: pointer
      transition: color .3s
      display: inline-block
      width: calc(100% - 50px)
      display: flex
      flex-wrap: wrap
      span 
        display: inline
        width: fit-content
        white-space: nowrap
        margin-right: 0.5em
    svg
      margin-top: 2px
      margin-left: 8px
      cursor: pointer
      transition: transform .3s
      display: inline-block
      path 
        transition: stroke .3s
      &._open
        transform: scaleY(-1)
  &__dropdown
    width: calc(100% - 16px)
    margin-left: 16px
    margin-top: 8px
    margin-bottom: -16px
    display: flex
    flex-direction: column
  .t-checkbox
    width: 16px 
    & + label
      float: left
    &_label._null
      width: 16px
      height: 16px

.t-optionAdd
  display: flex
  justify-content: flex-start
  align-items: center
  cursor: pointer
  svg
    margin: -2px 8px -1px 2px
  span
    line-height: 1.2em

.t-optionAddForm
  padding-bottom: 20px
  .t-input
    margin: 0
  .t-input_buttons
    margin-top: 8px

.t-topicsSelect
  width: 100%
  position: relative
  &__title
    display: inline-block
    margin-bottom: 16px
    font-weight: bold
    line-height: 1.2
    font-size: 24px
    color: $blue
  &__close
    position: absolute
    cursor: pointer
    top: 16
    right: 16px
    width: 24px
    height: 24px
    border-radius: 50%
    background: #ffffff
    // box-shadow: 0 24px 32px rgba(0, 108, 202, 0.1)
    box-shadow: 0px 10.2857px 13.7143px rgba(0, 108, 202, 0.1)
    z-index: 2
    &:before, &:after
      content: ''
      position: absolute
      left: 50%
      top: 50%
      margin: -1px 0 0 -6px
      width: 12px
      height: 1px
      border-radius: 1px
      background: #52A8F2
    &:before
      transform: rotate(45deg)
    &:after
      transform: rotate(-45deg)

  &__tag
    width: 100%
    padding: 0 40px 0 16px
    line-height: 40px
    background: $input
    border-radius: 8px
    cursor: pointer
    position: relative
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    transition: all .2s
    &:after
      content: ''
      position: absolute
      top: 0
      right: 0
      width: 40px
      height: 40px
      background: url('/img/select.png') no-repeat center
      transition: all .2s
    &._disabled
      pointer-events: none
      cursor: default
      opacity: .5
    &._open
      &:after
        transform: scale(1, -1)
  &__dropdow
    position: absolute
    top: 100%
    left: 0
    // width: 100%
    width: calc(100% + 50% + 12px)
    z-index: 50
    margin-top: 8px
    margin-bottom: 80px
    background: #FFFFFF
    box-shadow: 0 24px 48px rgba(0, 108, 202, 0.2)
    border-radius: 16px
    padding: 16px
    display: flex
    flex-direction: column
    flex-wrap: wrap
    @media (max-width: 1330px)
      width: 100%
    // @media (max-width: 769px)
    //   width: 100%
  &__text
    text-align: center
    margin: 0 0 16px
    color: $blue
  &__hint
    margin: 16px 0 0
    color: $grey
    font-size: 14px
    text-align: center
  &._disabled
    pointer-events: none
    cursor: default
    .t-topicsSelect__tag
      padding: 0
      background: transparent
      // line-height: 1.2
      &:after
        opacity: 0
  
  &._30
    .t-topicsSelect__dropdow
      width: calc(100%*3 + 12px)
      max-width: 60vw
      @media (max-width: 769px)
        width: 100%
        max-width: 100%
  &._right
    .t-topicsSelect__dropdow
      left: unset
      right: 0


</style>