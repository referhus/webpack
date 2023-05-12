<template>
	<div class="t-msg">
		<span class="t-msg__close" @click.stop.prevent="closeMsg()"></span>
		<div class="t-msg__text" v-html="text"></div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {mapActions} from 'vuex'

	export default {
	    computed: {
			...mapGetters('msg', ['text'])
		},
		methods: {
			...mapActions('msg', ['closeMsg'])
		},
		created() {
			setTimeout(() => {
				this.closeMsg();
			}, 4000)
		}
	}
</script>

<style lang="sass">
.t-msg
	width: 276px
	max-width: 100%
	position: fixed
	top: 140px
	right: 60px
	padding: 24px
	background: #ffffff
	box-shadow: 0 24px 48px rgba(0, 108, 202, 0.2)
	border-radius: 16px
	z-index: 101
	&__close
		cursor: pointer
		position: absolute
		top: -28px
		right: -28px
		background: #ffffff
		border-radius: 50%
		width: 56px
		height: 56px
		box-shadow: 0 24px 32px rgba(0, 108, 202, 0.1)
		&:before, &:after
			content: ''
			position: absolute
			top: 50%
			margin-top: -1px
			left: 15px
			width: 28px
			height: 2px
			background: $blue
			border-radius: 1px
		&:before
			transform: rotate(45deg)
		&:after
			transform: rotate(-45deg)

@media (max-width: 769px)
	.t-msg
		top: 44px
		padding: 44px 24px 24px
		right: calc(100% - 138px - 50%)
		&__close
			right: calc(100% - 28px - 50%)
</style>