<template>
  <div class="t-multiSelect" :class="{_disabled: disabled}">
    <div class="t-multiSelect__tag" :class="{_open: open}"
        @click="DropdowOpen">{{ value_text.length ? value_text : select.empty }}</div>
    <div class="t-multiSelect__dropdow" v-show="open">
      <form class="t-input t-search" @submit.stop.prevent="Search">
        <input v-model="q" :placeholder="select.search">
        <button class="t-search__submit">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 5.5C12 7.43311 10.4331 9 8.5 9C6.56689 9 5 7.43311 5 5.5C5 3.56689 6.56689 2 8.5 2C10.4331 2 12 3.56689 12 5.5ZM14 5.5C14 8.5376 11.5376 11 8.5 11C7.34253 11 6.26831 10.6426 5.38232 10.0317L1.70703 13.707C1.31665 14.0977 0.68335 14.0977 0.292969 13.707C-0.0976562 13.3167 -0.0976562 12.6833 0.292969 12.293L3.96826 8.61768C3.35742 7.73169 3 6.65747 3 5.5C3 2.4624 5.4624 0 8.5 0C11.5376 0 14 2.4624 14 5.5Z" fill="#84C1F6" fill-opacity="0.4"></path>
          </svg>
        </button>
      </form>
      <template v-if="hasOptions">
        <v-bar wrapper="t-multiSelect__wrapper">
          <div class="t-multiSelect__options">
            <div class="t-input" v-for="(item, index) in options_updated" :key="'multiSelect__options'+index" v-if="item.show">
              <input :id="'t-checkbox'+item.value" class="t-checkbox" type="checkbox" 
                  :checked="item.checked" 
                  @change="Change(index, $event.target.checked)">
              <label :for="'t-checkbox'+item.value" class="t-checkbox_label _null">
                {{ item.label }}
              </label>
            </div>
          </div>
        </v-bar>
      </template>
      <template v-else>
        <p class="t-multiSelect__text">{{ select.searchNot }}</p>
        <button class="t-btn t-btn_white t-btn_full" @click.stop.prevent="AddOption()"><span>{{ select.add }}</span></button>
        <p class="t-multiSelect__hint">{{ select.hint }}</p>
      </template>
    </div>
  </div>
</template>

<script>
  import VBar from 'v-bar'

  import {mapGetters,mapActions} from 'vuex';

  export default {
      components: { VBar },
      props: ['value', 'options', 'name', 'disabled'],
      data() {
          return{
              open: false,
              q: '',

              hasOptions: true,
              options_updated: [],
              disabledTopics: true
          }
      },
      computed: {
          ...mapGetters('staticText', ['select']),
          value_text(){
              let val = '';

              for(let i = 0; i < this.value.length; i++){
                  val += this.value[i].label;

                  if((i+1) < this.value.length)
                      val += ', ';
              }

              return val;
          },
      },
      watch: {
          value(){
            if(this.options){
                this.options_updated = JSON.parse(JSON.stringify(this.options));
                
                for(let i = 0; i < this.options_updated.length; i++){
                    if(this.value.length) {
                        for (let k = 0; k < this.value.length; k++) {
                            if (this.options_updated[i].value === this.value[k].value) {
                                this.$set(this.options_updated[i], 'checked', true);
                                break;
                            } else {
                                this.$set(this.options_updated[i], 'checked', false)
                            }
                        }
                    } else
                        this.$set(this.options_updated[i], 'checked', false);
                    this.$set(this.options_updated[i], 'show', true)
                }
            }
          },
          options(){
              if(this.options){
                  this.options_updated = JSON.parse(JSON.stringify(this.options));

                  for(let i = 0; i < this.options_updated.length; i++){
                      if(this.value.length) {
                          for (let k = 0; k < this.value.length; k++) {
                              if (this.options_updated[i].value === this.value[k].value) {
                                  this.$set(this.options_updated[i], 'checked', true);
                                  break;
                              } else {
                                  this.$set(this.options_updated[i], 'checked', false)
                              }
                          }
                      } else
                          this.$set(this.options_updated[i], 'checked', false);
                      this.$set(this.options_updated[i], 'show', true)
                  }
              }
          },
          q(){
              this.Search();
          }
      },
      methods: {
          ...mapActions('msg', ['showMsg']),
          DropdowOpen(){
              this.open = !this.open
          },
          DropdowClose(){
              this.open = false;
              this.q = '';
          },
          Search(){
              if(this.q.length > 1){
                  let count = 0;

                  let q = this.q.toLowerCase();
                  for(let i = 0; i < this.options_updated.length; i++){
                      let str = this.options_updated[i].label.toLowerCase();
                      if(str.indexOf(q) >= 0){
                          this.options_updated[i].show = true;
                          count++;
                      } else{
                          this.options_updated[i].show = false;
                      }
                  }

                  count ? this.hasOptions = true : this.hasOptions = false;
              } else{
                  for(let i = 0; i < this.options_updated.length; i++){
                      this.options_updated[i].show = true;
                      this.hasOptions = true;
                  }
              }
          },
          toggleDropdown(e){
              let dropdow = this.$el;
              if(dropdow !== null){
                  let target = e.target;
                  let its_dropdow = target === dropdow || dropdow.contains(target);
                  if (!its_dropdow && this.open) {
                      this.DropdowClose();
                  }
              }
          },
          AddOption(){
              let new_op = {
                  label: this.q,
                  value: 0 - this.options_updated.length,
                  grey: true,
                  checked: true
              };

              this.$set(this.options_updated, this.options_updated.length, new_op);

              let new_val = [];

              for(let i = 0; i < this.options_updated.length; i++){
                  if(this.options_updated[i].checked)
                      new_val.push(this.options_updated[i])
              }

              this.$emit('updateSelect', new_val);
              
              this.q = '';
          },
          Change(index, e){
              this.options_updated[index].checked = e;

              let new_val = [];

              // let knowId = [];
              
              for(let i = 0; i < this.options_updated.length; i++){
                  if(this.options_updated[i].checked) {
                      new_val.push({label: this.options_updated[i].label, value: this.options_updated[i].value});
                      // knowId.push(this.options_updated[i].value);
                  }
              }

              this.$emit('updateSelect', new_val);
          }
      },
      created(){

          this.options_updated = JSON.parse(JSON.stringify(this.options));

          for(let i = 0; i < this.options_updated.length; i++){
              if(this.value.length) {
                  for (let k = 0; k < this.value.length; k++) {
                      if (this.options_updated[i].value === this.value[k].value) {
                          this.$set(this.options_updated[i], 'checked', true);
                          break;
                      } else {
                          this.$set(this.options_updated[i], 'checked', false)
                      }
                  }
              } else
                  this.$set(this.options_updated[i], 'checked', false);
              this.$set(this.options_updated[i], 'show', true)
          }

          document.addEventListener('click', (e) => this.toggleDropdown(e));
      }
  }
</script>

<style lang="sass">
.t-multiSelect
  width: 100%
  position: relative
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
    width: 100%
    z-index: 3
    margin-top: 8px
    background: #FFFFFF
    box-shadow: 0 24px 48px rgba(0, 108, 202, 0.2)
    border-radius: 16px
    padding: 16px
    .t-search
      max-width: 100%
      margin: 0 0 16px!important
  &__wrapper
    width: 100%
    max-height: 376px
    .bar--vertical
      width: 1px!important
      margin-right: 0!important
      background: $input!important
      border-radius: 0!important
    .bar--vertical-internal
      background: $blue!important
      opacity: 1!important
    .bar--container
      max-height: 376px
    .bar--wrapper
      position: relative!important
      max-height: 400px
    .t-input
      margin-bottom: 19px
      &:last-child
        margin-bottom: 0
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
    .t-multiSelect__tag
      padding: 0
      background: transparent
      // line-height: 1.2
      &:after
        opacity: 0
</style>