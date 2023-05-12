<template>
  <div class="t-preload">
    <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M187.225 148.317C184.928 146.433 189.909 124.585 191.183 117.146C222.321 102.019 202.826 161.11 187.225 148.317Z" stroke="#52A8F2" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M63.7902 148.317C66.088 146.433 61.1066 124.585 59.8324 117.146C28.6943 102.019 48.1894 161.11 63.7902 148.317Z" stroke="#52A8F2" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M125.904 196.487C144.175 196.878 158.994 188.332 169.095 174.732C179.123 161.231 184.5 142.809 184.5 123C184.5 103.981 183.087 85.7366 174.882 72.1575C166.351 58.038 151.133 49.883 126.067 49.5123C100.914 49.1402 85.6431 57.312 77.1031 71.6483C68.9137 85.3962 67.5 103.982 67.5 123C67.5 142.822 72.8832 160.897 82.923 174.223C93.0276 187.635 107.778 196.1 125.904 196.487Z" stroke="#52A8F2" stroke-width="9"/>
      <path d="M195.509 68.0687C203.438 98.9953 192.206 116.049 185.599 120.71C185.599 96.0342 177.283 77.5374 176.515 72.1813C96.5718 33.3585 69.4283 93.2925 65.8494 128.112C65.8494 109.194 41.0459 110.837 31.9896 72.1813C20.4276 22.8302 61.72 -13.3604 92.2767 4.73495C122.833 22.8303 185.599 29.4105 195.509 68.0687Z" fill="#52A8F2"/>
      <ellipse cx="100.887" cy="121.867" rx="4.72574" ry="4.7235" fill="#52A8F2"/>
      <ellipse cx="128.6" cy="223.872" rx="8.61212" ry="9.11111" fill="#52A8F2"/>
      <ellipse cx="151.926" cy="121.867" rx="4.72574" ry="4.7235" fill="#52A8F2"/>
      <path d="M117.701 124.699C120.221 126.125 128.294 128.121 134.343 124.699" stroke="#52A8F2" stroke-width="7.78183"/>
      <path d="M115.74 123C115.74 132.089 108.323 139.5 99.1201 139.5C89.9168 139.5 82.5 132.089 82.5 123C82.5 113.911 89.9168 106.5 99.1201 106.5C108.323 106.5 115.74 113.911 115.74 123Z" stroke="#52A8F2" stroke-width="9"/>
      <path d="M169.5 123C169.5 132.089 162.083 139.5 152.88 139.5C143.677 139.5 136.26 132.089 136.26 123C136.26 113.911 143.677 106.5 152.88 106.5C162.083 106.5 169.5 113.911 169.5 123Z" stroke="#52A8F2" stroke-width="9"/>
      <path d="M108.371 82.0006L82.4004 93.375" stroke="#52A8F2" stroke-width="12" stroke-linecap="round"/>
      <path d="M172.799 91.2604L146.001 81.999" stroke="#52A8F2" stroke-width="12" stroke-linecap="round"/>
      <path d="M135.337 161.79C131.238 163.931 120.935 166.521 112.508 159.754" stroke="#52A8F2" stroke-width="12" stroke-linecap="round"/>
      <path d="M126.854 219.251C129.337 220.768 129.337 224.375 126.854 225.892L104.991 239.245C102.398 240.829 99.0716 238.963 99.0716 235.925V209.217C99.0716 206.179 102.398 204.313 104.991 205.897L126.854 219.251Z" fill="#52A8F2"/>
      <path d="M126.854 219.251C129.337 220.768 129.337 224.375 126.854 225.892L104.991 239.245C102.398 240.829 99.0716 238.963 99.0716 235.925V209.217C99.0716 206.179 102.398 204.313 104.991 205.897L126.854 219.251Z" fill="#52A8F2"/>
      <path d="M130.346 219.251C127.862 220.768 127.862 224.375 130.346 225.892L152.209 239.245C154.801 240.829 158.128 238.963 158.128 235.925V209.217C158.128 206.179 154.801 204.313 152.209 205.897L130.346 219.251Z" fill="#52A8F2"/>
      <path d="M130.346 219.251C127.862 220.768 127.862 224.375 130.346 225.892L152.209 239.245C154.801 240.829 158.128 238.963 158.128 235.925V209.217C158.128 206.179 154.801 204.313 152.209 205.897L130.346 219.251Z" fill="#52A8F2"/>
    </svg>
    <h1>{{ load.title }}</h1>
    <p>{{ load.load }} — {{ percent }}%</p>
  </div>
</template>

<script>
    import {mapGetters ,mapActions} from 'vuex'

    export  default {
        data(){
            return {
                percent: 0,
                imgCount: 0,
                img: 0,
                step: 0
            }
        },
        computed: {
            ...mapGetters('staticText', ['load'])
        },
        methods: {
            ...mapActions(['Loading']),
            ImgLoad(){
                this.percent += this.step;

                this.img++;

                if(this.img === this.imgCount){
                    this.percent = 100;

                    setTimeout(() => {
                        this.Loading();
                    }, 200)
                }
            }
        },
        mounted(){
            this.imgCount = document.querySelectorAll('img').length;
            this.step = Math.floor(100 / this.imgCount);

            for (let i= 0; i < this.imgCount; i++) {
                let img_copy        = new Image();
                img_copy.src        = document.images[i].src;
                img_copy.onload     = this.ImgLoad;
                img_copy.onerror    = this.ImgLoad;
            }
        }
    }
</script>

<style lang="sass">
.t-preload
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  background: #ffffff
  z-index: 999999999
  svg
    margin-bottom: 28px
  h1
    color: $blue
    font-size: 44px
    margin-bottom: 22px
  p
    color: $grey

@media (max-width: 769px)
  .t-preload
    svg
      width: 144px
      height: 144px
      margin-bottom: 24px
    h1
      font-size: 36px
      margin-bottom: 8px
</style>