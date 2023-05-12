<template>
	<div class="t-page_home">
		<section class="t-block t-promo">
			<div class="t-block__wrap">
				<div class="t-block__info">
					<h1 class="t-title">{{ pageText.title }}</h1>
					<p class="t-block__subtitle">{{pageText.subtitle}}</p>
					<div class="t-block__buttons_new__section">
						<button class="t-btn t-btn_215" @click.stop.prevent="modalDialogType_registrationOpen()"><span>{{ pageText.study }}</span>
						</button>
					</div>
				</div>
				<div class="t-block__img">
					<div class="t-block__img-wrap t-block__img_step3">
						<img :class="{'animation-1': !mobileState}" src="/img/promo/step_3/1.png">
						<img :class="{'animation-1': !mobileState}" src="/img/promo/step_3/2.png">
						<img :class="{'animation-2': !mobileState}" src="/img/promo/step_3/3.png">
						<img :class="{'animation-2': !mobileState}" src="/img/promo/step_3/4.png">
					</div>
				</div>
			</div>
		</section>
		<section class="t-block">
			<div class="t-block__wrap" :class="{_column: mobileState}">
				<div class="t-block__img">
					<div class="t-block__img-wrap t-block__img_step2">
						<img :class="{'animation-2': !mobileState}" src="/img/promo/step_2/1.png">
						<img :class="{'animation-2': !mobileState}" src="/img/promo/step_2/2.png">
						<img :class="{'animation-1': !mobileState}" src="/img/promo/step_2/3.png">
						<img :class="{'animation-1': !mobileState}" src="/img/promo/step_2/4.png">
						<img :class="{'animation-1': !mobileState}" src="/img/promo/step_2/5.png">
					</div>
				</div>
				<div class="t-block__info">
					<h2 class="t-title _blue">{{ pageText.study_title }}</h2>
					<p class="t-block__subtitle">{{pageText.coursesTitle}}</p>
					<div class="t-block__search">
						<cmp-search :type="'search'"></cmp-search>
					</div>
				</div>
			</div>
		</section>
	
		<cmp-courses-list :type="'popular'"></cmp-courses-list>
		<section class="t-block">
			<div class="t-block__wrap _pt">
				<div class="t-block__info">
					<h1 class="t-title">{{ pageText.teach_title }}</h1>
					<p class="t-block__subtitle">{{pageText.teach_desc}}</p>
					<div class="t-block__buttons_new__section">
						<button class="t-btn t-btn_215" @click.stop.prevent="modalDialogType_registrationOpen()"><span>{{ pageText.teach }}</span>
						</button>
					</div>
				</div>
				<div class="t-block__img">
					<div class="t-block__img-wrap t-block__img_step1">
						<img :class="{'animation-1': !mobileState}" src="/img/promo/step_1/1.png">
						<img :class="{'animation-1': !mobileState}" src="/img/promo/step_1/2.png">
						<img :class="{'animation-2': !mobileState}" src="/img/promo/step_1/3.png">
						<img :class="{'animation-2': !mobileState}" src="/img/promo/step_1/4.png">
					</div>
				</div>
			</div>
		</section>

		<cmp-popular-teachers class="t-teachers_home"></cmp-popular-teachers>
	</div>
</template>

<script>
    let localeText = {
        url: process.env.NODE_ENV !== 'production' ? 'staticText/main.json' : 'staticText',
        main: {
            title: "Хотите учиться новому и зарабатывать на своих знаниях?",
            subtitle: "Индивидуальное обучение через Skype или другую программу для чатов. Учитесь новому, преподавайте то, что знаете.",
            promo_1: 'Выбирайте интересный урок',
            promo_2: 'Удобное время',
            promo_3: 'Начинайте учиться',
            teach: 'Учить',
            or: 'или',
            study: 'Учиться',
            coursesTitle: 'Найдите интересные уроки и курсы',
            teach_title: "Учить просто",
            teach_desc: "У вас знания, опыт, экспертиза? Регистрируйте свои уроки, курсы, консультации. Работайте не выходя из дома.",
            study_title: "Учиться легко",
            study_desc: "Живые уроки один на один с преподавателем или в группе. Учитесь онлайн."
        }
    };

    import {store} from '../store'

    import {mapActions, mapGetters} from 'vuex';

    import CoursesList from '../vue_components/CoursesList.vue'
    import PopularTeachers from '../vue_components/PopularTeachers.vue'

    export default {
		data(){
			return{
				pageText: {},
				swiperOption: {
					autoHeight: true,
					slidesPerView: 1,
					spaceBetween: 24,
					pagination: {
						el: '.t-promo-slider__pagination'
					}
				}
			}
		},
      	components: {
			'cmp-courses-list': CoursesList,
			'cmp-popular-teachers': PopularTeachers
		},
		computed: {
			...mapGetters(['mobileState']),
			...mapGetters('profile', {
				hasAuth: 'hasAuth'
			}),
			...mapGetters('staticText', ['header'])
		},
		methods: {
			...mapActions(['UpdatePreloadState']),
			...mapActions('modal', ['modalDialogType_registrationOpen']),
			...mapActions('coursesList', {
				setCourses: 'setItems'
			}),
			...mapActions('teachers', {
				setTeachers: 'setItems'
			}),
			Load(pageText){
				this.pageText = pageText;
				setTimeout(() => {
					this.UpdatePreloadState(false);
				}, 500)
			}
		},
		beforeRouteLeave (to, from, next) {
			this.UpdatePreloadState(true);
			next();
		},
		beforeRouteEnter (to, from, next) {
			let count = 0;

			let pageText = {};

			store.dispatch('staticText/LoadPageText', localeText).then((data) => {
				pageText = data;

				count++;
				RunNext();
			});

			store.dispatch('staticText/LoadCoursesListText').then(() => {count++;RunNext();});
			store.dispatch('staticText/LoadPopularTeachersText').then(() => {count++;RunNext();});

			store.dispatch('coursesList/LoadCoursesPopular').then(() => {
				count++;
				RunNext();
			});

			store.dispatch('profile/LoadUserInfo').then(() => {
				count++;
				RunNext();
			});

			store.dispatch('teachers/LoadTeachers').then(() => {
				count++;
				RunNext();
			});

			let RunNext = () => {
				if(count > 5)
					next(vm => vm.Load(pageText))
			}
		}
	}
</script>

<style lang="sass">
.t-page_home
	.t-title
		line-height: 1.2
		font-size: 36px
		margin: 0 auto 16px
		text-align: center
	.t-coursesList
		max-width: 960px
		padding: 40px 0
		margin: 0 auto 
.t-block__buttons .t-btn
  min-width: 120px
.t-block__buttons_new
  display: flex
  flex-direction: row
  width: 950px
  justify-content: space-between
  margin-bottom: 66px
  h3
    font-size: 28px
    line-height: 1.2
    color: #52A8F2
    text-align: center
    margin-bottom: 10px
.t-block__buttons_new__section
  text-align: center
  &__second
    max-width: 470px
.t-block__buttons_new__section__description
  border-bottom: 1px solid #DEF1FA
  margin-bottom: 10px
  padding-bottom: 10px
.t-block__subtitle
  text-align: center
  font-size: 18px
  margin: 0 auto 24px	  

.t-block
	background: #ffffff
	&__wrap
		max-width: 960px
		overflow: hidden
		display: flex
		flex-direction: row
		justify-content: space-between
		align-items: center
		margin: 0 auto
		padding-bottom: 108px
		&._pt
			padding-top: 120px
	&__info
		width: calc(100% - 30%)

	&__buttons
		display: flex
		align-items: center
		justify-content: center
		margin-bottom: 66px
		position: relative
		p
			color: $blue
			margin: 0 16px
		&:before, &:after
			content: ''
			position: absolute
			top: 50%
			width: 313px
			height: 1px
			background: $input
		&:before
			right: 100%
			margin-right: 16px
		&:after
			left: 100%
			margin-left: 16px
	&__search
		max-width: 720px
		width: 100%
		margin: 0 auto
		.t-search
			max-width: 100%
		h2
			margin-bottom: 24px
			font-size: 36px
			line-height: 1.2
			color: $blue
			text-align: center

.t-promo
	.t-block
		&__wrap
			max-width: 1383px
			padding: 24px 40px 16px
		&__info
			width: calc(100% - 48%)
		&__img
			width: 42%
			margin-top: -40px


.t-block__img
	width: 38%
	// margin-top: -40px
	&-wrap
		position: relative
		width: 100%
		padding-bottom: 100%
		img
			position: absolute
			pointer-events: none
			transition: transform .2s linear
			&.animation-1
				animation: transform-1 4s infinite
			&.animation-2
				animation: transform-2 4s infinite
			&.animation-3
				animation: transform-3 4s infinite
			&.animation-4
				animation: transform-4 4s infinite
	&_step1
		img
			&:nth-child(4)
				top: 13.5%
				left: 19.8%
				z-index: 3
				width: 21.25%
			&:nth-child(2)
				top: 21%
				left: 29%
				z-index: 2
				width: 36.563%
			&:nth-child(3)
				top: 27%
				left: 10%
				z-index: 4
				width: 80%
			&:nth-child(1)
				top: 19%
				left: 18%
				width: 63.75%
				z-index: 1
	&_step2
		img
			&:nth-child(1)
				top: 17%
				left: 13%
				width: 75%
				z-index: 1
			&:nth-child(2)
				z-index: 3
				top: 16%
				left: 45%
				width: 40.625%
			&:nth-child(3)
				z-index: 4
				top: 34%
				left: 26%
				width: 14.375%
			&:nth-child(4)
				z-index: 4
				top: 14%
				left: 46.5%
				width: 6.875%
			&:nth-child(5)
				z-index: 2
				top: 19%
				left: 22%
				width: 53.125%
	&_step3
		img
			&:nth-child(1)
				z-index: 1
				left: 8%
				top: 20%
				width: 78.75%
			&:nth-child(2)
				z-index: 2
				top: 17%
				left: 31%
				width: 46.875%
			&:nth-child(3)
				z-index: 3
				top: 25%
				left: 29%
				width: 62.813%
			&:nth-child(4)
				z-index: 4
				top: 57%
				left: 11%
				width: 27.19%

		
@media (max-width: 1000px)
	.t-teachers_home
		padding: 0 12px
	.t-block__buttons_new
		max-width: 100%
	.t-promo
 		.t-block
			&__wrap
				max-width: 100%
	.t-block
		&__wrap
			max-width: 100%
			padding: 0 16px
	.t-coursesList__wrap
		margin: 0 !important
		padding: 0 16px
		.t-courseItem
			width: 100% !important

@media (max-width: 769px)
	.t-block
		padding: 16px 16px 80px
		&__wrap
			padding: 0 !important
			flex-direction: column-reverse 
			&._column
				flex-direction: column
		&__info, &__img 
			width: 100% !important
		&__subtitle 
			font-size: 16px
			line-height: 135%
			margin: 0 auto 20px	  
		&__buttons
			margin-bottom: 32px
			flex-direction: column
			width: 100%
			&:before, &:after
				content: none
			.t-btn
				width: 100%
				&:first-child
					margin-bottom: 16px
		&__search
			h2
				margin-bottom: 16px
				font-size: 24px
	.t-promo
		margin-top: -16px
		padding-bottom: 16px
	.t-page_home
		.t-title
			font-size: 24px
			margin-bottom: 12px
			padding: 0
		.t-coursesList
			margin-bottom: 48px
			padding: 32px 16px 0
			h2 
				margin-bottom: 30px

	.t-block__buttons_new
		flex-direction: column
		width: auto
	.t-block__buttons_new__section
		max-width: 300px
		margin: 0 auto 

	// .t-block-slider
	// 	display: flex
	// 	flex-direction: column
	// 	margin: 0 -16px 24px
	// 	width: calc(100% + 32px)
	// 	.swiper-container
	// 		width: 100%
	// 		margin-bottom: 16px
	// 	.swiper-slide
	// 		padding: 0 16px
	// 		display: flex
	// 		flex-direction: column
	// 		align-items: center
	// 		p
	// 			color: $blue
	// 	&__pagination
	// 		display: flex
	// 		align-items: center
	// 		justify-content: center
	// 		.swiper-pagination-bullet
	// 			margin: 0 2px
	// 			background: $disabled
	// 			opacity: 1
	// 		.swiper-pagination-bullet-active
	// 			background: $turquoise

@keyframes transform-1
	0% 
		transform: translateX(0)
	50%
		transform: translateX(10%)	
	100%
		transform: translateX(0)

@keyframes transform-2
	0% 
		transform: translateX(0)
	50%
		transform: translateX(-5%)	
	100%
		transform: translateX(0)


</style>
