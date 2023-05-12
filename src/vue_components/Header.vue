<template>
  <header class="t-load-progress" :class="{'_load': load, '_loading': preload}">
    <router-link :to="{name: 'home'}" class="t-logo">
      <img :src="mobileState ? '/img/logo_mobile.png' : '/img/logo.png'">
      <p class="t-logo__name" v-if="!mobileState">{{ header.logo }}<span>{{ header.logoSub }}</span></p>
    </router-link>

    <div class="t-header" v-if="!mobileState">
      <cmp-search v-if="$route.name !== 'home' && $route.name !== 'courses' && !mobileState" :type="'search'"></cmp-search>

      <div class="t-header__auth" v-if="hasAuth">
        <router-link :to="{name: 'courses_create'}" class="t-btn"><span>{{ header.create }}</span></router-link>
        <router-link :to="{name: 'notice'}" class="t-header__link">
          <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.4853 6.5148C23.3137 5.34324 21.4142 5.34324 20.2427 6.5148L24.4853 6.5148ZM20.2427 6.51483C19.8626 6.89492 19.6058 7.35163 19.4723 7.83524C18.4396 7.38931 17.3432 7.23932 16.2448 7.35959C14.355 7.56648 12.5396 8.56107 11.0503 10.0503L8.92897 12.1717C8.04083 13.0598 7.45739 13.0726 7.21423 13.0379C7.06409 13.0164 6.94686 12.9628 6.86916 12.9162C6.8308 12.8932 6.80496 12.8736 6.79322 12.8641C6.79164 12.8628 6.79035 12.8618 6.78937 12.8609C6.52917 12.6137 6.15558 12.5244 5.81077 12.6288C5.4578 12.7357 5.1923 13.0281 5.11997 13.3898L6.10055 13.5859C5.11997 13.3898 5.11984 13.3904 5.1197 13.3911L5.11941 13.3926L5.11879 13.3957L5.11739 13.4031L5.114 13.4217C5.11149 13.4358 5.10852 13.4535 5.10528 13.4746C5.09879 13.5167 5.0912 13.5726 5.08395 13.6414C5.06946 13.779 5.05636 13.9687 5.05636 14.2046C5.05636 14.6767 5.10887 15.3332 5.30719 16.1265C5.52686 17.0052 5.92203 18.0381 6.60793 19.164C5.66776 19.5232 5.00003 20.4337 5.00003 21.5001C5.00003 22.8808 6.11931 24.0001 7.50003 24.0001C8.42047 24.0001 9.22473 23.5027 9.65866 22.762C11.6277 24.5232 13.4524 25.3376 14.8736 25.693C15.6669 25.8913 16.3234 25.9438 16.7956 25.9438C17.0315 25.9438 17.2211 25.9307 17.3588 25.9162C17.4276 25.9089 17.4834 25.9013 17.5256 25.8949C17.5467 25.8916 17.5643 25.8887 17.5785 25.8861L17.5971 25.8827L17.6044 25.8813L17.6076 25.8807L17.609 25.8804C17.6097 25.8803 17.6104 25.8802 17.4143 24.8996L17.6104 25.8802C17.8917 25.8239 18.1352 25.6496 18.2792 25.4015C18.4222 25.155 18.4533 24.8594 18.3647 24.5887C18.3648 24.589 18.3649 24.5892 18.3649 24.5893L18.3644 24.5878L18.3638 24.5859L18.3634 24.5847L18.3633 24.5842C18.3612 24.5772 18.357 24.563 18.3514 24.5425C18.3402 24.5014 18.3236 24.4354 18.3065 24.3499C18.2718 24.1768 18.2375 23.9348 18.2375 23.6621C18.2375 23.1092 18.375 22.5246 18.8285 22.0712L20.9498 19.9498C22.4391 18.4606 23.4337 16.6451 23.6405 14.7554C23.7608 13.6569 23.6108 12.5605 23.1649 11.5278C23.6485 11.3943 24.1052 11.1375 24.4853 10.7575M21.6569 9.34326C22.0474 9.73376 22.6806 9.73376 23.071 9.34326L23.0711 9.34323C23.4616 8.95271 23.4616 8.31955 23.0711 7.92904L23.071 7.92901C22.6806 7.53851 22.0474 7.53851 21.6569 7.92901L21.6569 7.92904C21.2664 8.31955 21.2664 8.95271 21.6569 9.34324M18.3632 24.5841C18.3637 24.5856 18.3642 24.5872 18.3647 24.5887C18.3645 24.5879 18.364 24.5864 18.3633 24.5842L18.3632 24.5841ZM16.2434 23.9126C16.2396 23.8316 16.2375 23.748 16.2375 23.6622C16.2375 22.8009 16.4535 21.6177 17.4143 20.6569L19.5356 18.5356C20.78 17.2912 21.5058 15.8773 21.6524 14.5377C21.7958 13.2284 21.398 11.9127 20.2427 10.7575C19.0874 9.60216 17.7717 9.20437 16.4624 9.34771C15.1228 9.49437 13.7089 10.2202 12.4645 11.4646L10.3432 13.5859C9.18902 14.74 8.07767 15.1125 7.12486 15.039C7.15353 15.223 7.19321 15.4244 7.24748 15.6414C7.55575 16.8745 8.34614 18.6599 10.3432 20.6569C12.3403 22.654 14.1256 23.4444 15.3587 23.7527C15.6929 23.8362 15.9899 23.8852 16.2434 23.9126ZM6.80664 12.8778C6.80665 12.8778 6.80665 12.8778 6.80665 12.8778L6.80664 12.8778ZM24.4853 10.7574C25.6569 9.58587 25.6569 7.6864 24.4853 6.51483L24.4853 10.7574ZM21.6569 9.34326C21.6569 9.34325 21.6569 9.34325 21.6569 9.34324L21.6569 9.34326ZM8.00003 21.5001C8.00003 21.2239 7.77617 21.0001 7.50003 21.0001C7.22388 21.0001 7.00003 21.2239 7.00003 21.5001C7.00003 21.7762 7.22388 22.0001 7.50003 22.0001C7.77617 22.0001 8.00003 21.7762 8.00003 21.5001Z" fill="#B8D7F5"/>
          </svg>
          <span v-if="newNotice > 0">{{ newNotice }}</span>
        </router-link>
        <router-link :to="{name: 'dialog'}" class="t-header__link">
          <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447715 0.447715 0 1 0H23C23.5523 0 24 0.447715 24 1V17C24 17.5523 23.5523 18 23 18H1C0.447715 18 0 17.5523 0 17V1ZM2 2V3.45105L12 9.81469L22 3.45105V2H2ZM22 5.82167L12.5369 11.8437C12.2093 12.0521 11.7907 12.0521 11.4631 11.8437L2 5.82167V16H22V5.82167Z" fill="#B8D7F5"/>
          </svg>
          <span v-if="newMsg.length">{{ 100>newMsg.length?newMsg.length:'99+' }}</span>
        </router-link>
        <button class="t-header__link" @click.prevent="menuOpenProfile($event)">
          <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 7C6 4.23853 8.23853 2 11 2C13.7615 2 16 4.23853 16 7C16 9.76147 13.7615 12 11 12C8.23853 12 6 9.76147 6 7ZM15.2336 12.575C16.9148 11.2964 18 9.2749 18 7C18 3.13403 14.866 0 11 0C7.13403 0 4 3.13403 4 7C4 9.2749 5.08521 11.2964 6.76636 12.575C5.55786 12.8911 4.36938 13.3445 3.45386 13.9412C1.69434 15.0884 0.822998 16.6677 0.402344 18.4292C0 20.1138 0 22.0181 0 23.8843V23.8877V23.9609V24C0 24.5522 0.447754 25 1 25C1.55225 25 2 24.5522 2 24V23.9609C2 22.0063 2.00537 20.3269 2.34766 18.8938C2.677 17.5146 3.30566 16.4255 4.54614 15.6167C5.27661 15.1404 6.35205 14.7297 7.552 14.4395C8.74194 14.1519 9.98145 14 11 14C12.0186 14 13.2581 14.1519 14.448 14.4395C15.6479 14.7297 16.7234 15.1404 17.4539 15.6167C18.6943 16.4255 19.323 17.5146 19.6523 18.8938C19.9946 20.3269 20 22.0063 20 23.9609V24C20 24.5522 20.4478 25 21 25C21.5522 25 22 24.5522 22 24V23.9609V23.8877V23.8843C22 22.0181 22 20.1138 21.5977 18.4292C21.177 16.6677 20.3057 15.0884 18.5461 13.9412C17.6306 13.3445 16.4421 12.8911 15.2336 12.575Z" fill="#B8D7F5"/>
          </svg>
        </button>
      </div>
      <div class="t-header__notAuth" v-else>
        <button class="t-btn" @click.prevent="modalDialogType_registrationOpen()"><span>{{ header.registration }}</span></button>
        <button class="t-btn t-btn_border" @click.stop.prevent="modalDialogType_authOpen()"><span>{{ header.auth }}</span></button>
      </div>

      <cmp-locale></cmp-locale>

      <div class="t-burger" @click.prevent="OpenMenu($event)"><span></span></div>
    </div>

    <template v-else>
      <template v-if="hasAuth">
        <router-link :to="{name: 'notice'}" class="t-header__link">
          <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.4853 6.5148C23.3137 5.34324 21.4142 5.34324 20.2427 6.5148L24.4853 6.5148ZM20.2427 6.51483C19.8626 6.89492 19.6058 7.35163 19.4723 7.83524C18.4396 7.38931 17.3432 7.23932 16.2448 7.35959C14.355 7.56648 12.5396 8.56107 11.0503 10.0503L8.92897 12.1717C8.04083 13.0598 7.45739 13.0726 7.21423 13.0379C7.06409 13.0164 6.94686 12.9628 6.86916 12.9162C6.8308 12.8932 6.80496 12.8736 6.79322 12.8641C6.79164 12.8628 6.79035 12.8618 6.78937 12.8609C6.52917 12.6137 6.15558 12.5244 5.81077 12.6288C5.4578 12.7357 5.1923 13.0281 5.11997 13.3898L6.10055 13.5859C5.11997 13.3898 5.11984 13.3904 5.1197 13.3911L5.11941 13.3926L5.11879 13.3957L5.11739 13.4031L5.114 13.4217C5.11149 13.4358 5.10852 13.4535 5.10528 13.4746C5.09879 13.5167 5.0912 13.5726 5.08395 13.6414C5.06946 13.779 5.05636 13.9687 5.05636 14.2046C5.05636 14.6767 5.10887 15.3332 5.30719 16.1265C5.52686 17.0052 5.92203 18.0381 6.60793 19.164C5.66776 19.5232 5.00003 20.4337 5.00003 21.5001C5.00003 22.8808 6.11931 24.0001 7.50003 24.0001C8.42047 24.0001 9.22473 23.5027 9.65866 22.762C11.6277 24.5232 13.4524 25.3376 14.8736 25.693C15.6669 25.8913 16.3234 25.9438 16.7956 25.9438C17.0315 25.9438 17.2211 25.9307 17.3588 25.9162C17.4276 25.9089 17.4834 25.9013 17.5256 25.8949C17.5467 25.8916 17.5643 25.8887 17.5785 25.8861L17.5971 25.8827L17.6044 25.8813L17.6076 25.8807L17.609 25.8804C17.6097 25.8803 17.6104 25.8802 17.4143 24.8996L17.6104 25.8802C17.8917 25.8239 18.1352 25.6496 18.2792 25.4015C18.4222 25.155 18.4533 24.8594 18.3647 24.5887C18.3648 24.589 18.3649 24.5892 18.3649 24.5893L18.3644 24.5878L18.3638 24.5859L18.3634 24.5847L18.3633 24.5842C18.3612 24.5772 18.357 24.563 18.3514 24.5425C18.3402 24.5014 18.3236 24.4354 18.3065 24.3499C18.2718 24.1768 18.2375 23.9348 18.2375 23.6621C18.2375 23.1092 18.375 22.5246 18.8285 22.0712L20.9498 19.9498C22.4391 18.4606 23.4337 16.6451 23.6405 14.7554C23.7608 13.6569 23.6108 12.5605 23.1649 11.5278C23.6485 11.3943 24.1052 11.1375 24.4853 10.7575M21.6569 9.34326C22.0474 9.73376 22.6806 9.73376 23.071 9.34326L23.0711 9.34323C23.4616 8.95271 23.4616 8.31955 23.0711 7.92904L23.071 7.92901C22.6806 7.53851 22.0474 7.53851 21.6569 7.92901L21.6569 7.92904C21.2664 8.31955 21.2664 8.95271 21.6569 9.34324M18.3632 24.5841C18.3637 24.5856 18.3642 24.5872 18.3647 24.5887C18.3645 24.5879 18.364 24.5864 18.3633 24.5842L18.3632 24.5841ZM16.2434 23.9126C16.2396 23.8316 16.2375 23.748 16.2375 23.6622C16.2375 22.8009 16.4535 21.6177 17.4143 20.6569L19.5356 18.5356C20.78 17.2912 21.5058 15.8773 21.6524 14.5377C21.7958 13.2284 21.398 11.9127 20.2427 10.7575C19.0874 9.60216 17.7717 9.20437 16.4624 9.34771C15.1228 9.49437 13.7089 10.2202 12.4645 11.4646L10.3432 13.5859C9.18902 14.74 8.07767 15.1125 7.12486 15.039C7.15353 15.223 7.19321 15.4244 7.24748 15.6414C7.55575 16.8745 8.34614 18.6599 10.3432 20.6569C12.3403 22.654 14.1256 23.4444 15.3587 23.7527C15.6929 23.8362 15.9899 23.8852 16.2434 23.9126ZM6.80664 12.8778C6.80665 12.8778 6.80665 12.8778 6.80665 12.8778L6.80664 12.8778ZM24.4853 10.7574C25.6569 9.58587 25.6569 7.6864 24.4853 6.51483L24.4853 10.7574ZM21.6569 9.34326C21.6569 9.34325 21.6569 9.34325 21.6569 9.34324L21.6569 9.34326ZM8.00003 21.5001C8.00003 21.2239 7.77617 21.0001 7.50003 21.0001C7.22388 21.0001 7.00003 21.2239 7.00003 21.5001C7.00003 21.7762 7.22388 22.0001 7.50003 22.0001C7.77617 22.0001 8.00003 21.7762 8.00003 21.5001Z" fill="#B8D7F5"/>
          </svg>
          <span v-if="newNotice > 0">{{ newNotice }}</span>
        </router-link>
        <router-link :to="{name: 'dialog'}" class="t-header__link">
          <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447715 0.447715 0 1 0H23C23.5523 0 24 0.447715 24 1V17C24 17.5523 23.5523 18 23 18H1C0.447715 18 0 17.5523 0 17V1ZM2 2V3.45105L12 9.81469L22 3.45105V2H2ZM22 5.82167L12.5369 11.8437C12.2093 12.0521 11.7907 12.0521 11.4631 11.8437L2 5.82167V16H22V5.82167Z" fill="#B8D7F5"/>
          </svg>
          <span v-if="newMsg.length">{{ 100>newMsg.length?newMsg.length:'99+' }}</span>
        </router-link>
        <button class="t-header__link" @click.prevent="menuOpenProfile($event)">
          <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 7C6 4.23853 8.23853 2 11 2C13.7615 2 16 4.23853 16 7C16 9.76147 13.7615 12 11 12C8.23853 12 6 9.76147 6 7ZM15.2336 12.575C16.9148 11.2964 18 9.2749 18 7C18 3.13403 14.866 0 11 0C7.13403 0 4 3.13403 4 7C4 9.2749 5.08521 11.2964 6.76636 12.575C5.55786 12.8911 4.36938 13.3445 3.45386 13.9412C1.69434 15.0884 0.822998 16.6677 0.402344 18.4292C0 20.1138 0 22.0181 0 23.8843V23.8877V23.9609V24C0 24.5522 0.447754 25 1 25C1.55225 25 2 24.5522 2 24V23.9609C2 22.0063 2.00537 20.3269 2.34766 18.8938C2.677 17.5146 3.30566 16.4255 4.54614 15.6167C5.27661 15.1404 6.35205 14.7297 7.552 14.4395C8.74194 14.1519 9.98145 14 11 14C12.0186 14 13.2581 14.1519 14.448 14.4395C15.6479 14.7297 16.7234 15.1404 17.4539 15.6167C18.6943 16.4255 19.323 17.5146 19.6523 18.8938C19.9946 20.3269 20 22.0063 20 23.9609V24C20 24.5522 20.4478 25 21 25C21.5522 25 22 24.5522 22 24V23.9609V23.8877V23.8843C22 22.0181 22 20.1138 21.5977 18.4292C21.177 16.6677 20.3057 15.0884 18.5461 13.9412C17.6306 13.3445 16.4421 12.8911 15.2336 12.575Z" fill="#B8D7F5"/>
          </svg>
        </button>
      </template>
      <template v-else>
        <button class="t-btn t-btn_openAuth" @click.stop.prevent="modalDialogType_authOpen()"><span>{{ header.auth }}</span></button>
      </template>

      <cmp-locale></cmp-locale>

      <div class="t-burger" @click.prevent="OpenMenu($event)"><span></span></div>
    </template>

    <transition name="header-fade">
      <div class="t-headerMenu__before" v-if="mobileState && (menuState_profile || menuState)"></div>
    </transition>
    <transition name="fade">
      <nav class="t-headerMenu t-headerMenu_prof" v-if="menuState_profile">
        <!-- <div class="t-headerMenu-before"></div> -->
        <router-link :to="{name: 'profileInfo'}">{{ header.menu_1 }}</router-link>
        <router-link :to="{name: 'my_courses'}">{{ header.menu_2 }}</router-link>
        <router-link :to="{name: 'my_entries'}">{{ header.menu_3 }}</router-link>
        <router-link :to="{name: 'finance'}">{{ header.menu_4 }}</router-link>
        <!--<router-link :to="{name: 'documents'}">{{ header.menu_5 }}</router-link>-->
        <router-link :to="{name: 'my_info'}">{{ header.menu_6 }}</router-link>
        <router-link :to="{name: 'settings'}">{{ header.menu_7 }}</router-link>
        <router-link :to="{name: 'black_list'}">{{ header.menu_14 }}</router-link>
        <button @click.stop.prevent="LocalLogOut()">{{ header.menu_8 }}</button>
      </nav>
    </transition>
    <transition name="header-fade">
      <nav class="t-headerMenu" v-show="menuState">
        <router-link :to="{name: 'courses'}">{{ header.menu_9 }}</router-link>
        <router-link :to="{name: 'about'}">{{ header.menu_10 }}</router-link>
        <router-link :to="{name: 'faq'}">{{ header.menu_12 }}</router-link>
        <router-link :to="{name: 'contacts'}">{{ header.menu_13 }}</router-link>
        <router-link :to="{name: 'courses_create'}" class="t-btn" v-if="mobileState"><span>{{ header.create }}</span></router-link>
        <cmp-search v-if="$route.name !== 'home' && $route.name !== 'courses' && mobileState" :type="'search'"></cmp-search>
      </nav>
    </transition>
  </header>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';

  import Locale from './Locale.vue'

  export default {
      components: {
          'cmp-locale': Locale
      },
      computed: {
          ...mapGetters(['mobileState', 'menuState', 'menuState_profile', 'load', 'preload', 'newNotice', 'newMsg']),
          ...mapGetters('profile', {
              hasAuth: 'hasAuth'
          }),
          ...mapGetters('staticText', ['header'])
      },
      methods: {
          ...mapActions('profile',['logOut']),
          ...mapActions(['ClearNotice', 'ClearMsg']),
          ...mapActions(['menuOpen', 'menuOpen_profile', 'menuClose']),
          ...mapActions('modal', ['modalDialogType_authOpen', 'modalDialogType_registrationOpen']),
          ...mapActions('msg', ['showMsg']),
          menuOpenProfile(e){
            if(!this.menuState_profile) {
              e.stopPropagation();
              this.menuOpen_profile();
            }
          },
          OpenMenu(e){
            if(!this.menuState) {
              e.stopPropagation();
              this.menuOpen()
            }
              // this.menuState ? this.menuClose() : this.menuOpen();
          },
          LocalLogOut(){
              this.menuClose();
              this.logOut()
                .then( ()=>{
                  if(this.$route.meta.requiresAuth) {
                      this.$router.push({name: 'home'});
                  } else {
                      this.$router.go();
                  }
                  this.ClearNotice();
                  this.ClearMsg();
                }, (error)=>{
                  this.showMsg(error)
                })
                .catch(error => {
                    this.showMsg('Упс, что-то пошло не так, попробуйте позже')
                });
          }
      }

  }
</script>

<style lang="sass">
header
  width: 100%
  padding: 24px
  background: #ffffff
  position: fixed
  z-index: 100
  top: 0
  left: 0
  display: flex
  align-items: center
  justify-content: space-between
  opacity: 0
  &._load
    opacity: 1
  &:after
    top: 100%

.t-logo
  display: flex
  align-items: center
  margin-right: 40px
  &__name
    margin-left: 8px
    color: $blue
    font-weight: bold
    line-height: 1.2
    span
      font-weight: normal
      font-size: 12px
      display: block
      margin-top: 1px
      color: $black

.t-header
  display: flex
  align-items: center
  justify-content: flex-end
  flex: 1
  &__notAuth
    flex: none
    display: flex
    align-items: center
    margin-right: 16px
    .t-btn:first-child
      margin-right: 8px
  .t-search-filter
    margin-right: 72px
    max-width: 520px
    flex: 1
  .t-search
    max-width: 100%
  &__auth
    flex: none
    display: flex
    align-items: center
    margin-right: 16px
    .t-btn
      margin-right: 40px
  &__link
    background: transparent
    border: none
    outline: none
    cursor: pointer
    margin-right: 16px
    width: 40px
    height: 40px
    display: flex
    align-items: center
    justify-content: center
    position: relative
    &:last-child
      margin-right: 0
    span
      position: absolute
      top: 0
      right: 0
      background: #986bf2
      color: #fff
      padding: 0 4px
      border-radius: 8px
      line-height: 17px
      font-size: 12px
      font-weight: 700
      min-width: 16px
      text-align: center
      height: 16px

.t-burger
  cursor: pointer
  width: 40px
  height: 40px
  display: flex
  align-items: center
  justify-content: center
  flex: none
  span
    background: $border
    width: 26px
    height: 2px
    border-radius: 1px
    position: relative
    transition: all .2s
    &:before, &:after
      content: ''
      position: absolute
      left: 0
      width: 100%
      height: 2px
      border-radius: 1px
      background: $border
    &:before
      top: -9px
    &:after
      bottom: -9px

.t-headerMenu
  position: absolute
  top: 72px
  right: 24px
  border-radius: 16px
  padding: 24px
  box-shadow: 0 24px 48px rgba(0, 108, 202, 0.2)
  background: #ffffff
  display: flex
  flex-direction: column
  &_prof
    right: 104px
  a:not(.t-btn)
    line-height: 1.2
    white-space: nowrap
    &:not(:last-child)
      margin-bottom: 8px
  button
    cursor: pointer
    display: inline
    background: transparent
    border: none
    outline: none
    font-size: 16px
    font-weight: 400
    font-family: rubik,Arial,sans-serif
    color: #666
    text-align: left
  &__before
    display: block
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 72px
    background: rgba(0, 49, 92, 0.6)
    z-index: -1
@media(max-width: 1140px)
  .t-logo
    margin-right: 24px
  .t-header
    .t-search-filter
      margin-right: 24px
    &__auth
      margin-right: 16px
      .t-btn
        margin-right: 16px
@media(max-width: 1000px)
  .t-header
    .t-search-filter
      display: none

@media(max-width: 769px)
  header
    top: auto
    bottom: 0
    padding: 12px
  .t-logo
    margin-right: 0
  .t-burger
    width: 48px
    height: 48px
  .t-header__link
    width: 48px
    height: 48px
    margin-right: 0
  .t-btn_openAuth
    margin: 0 24px
    flex: 1
  .t-headerMenu
    bottom: 100%
    top: auto
    left: 0
    right: 0
    box-shadow: none
    border-radius: 0
    .t-btn:not(:last-child)
      margin-bottom: 16px
</style>
