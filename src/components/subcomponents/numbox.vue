<template>
	<div>
		<div class="mui-numbox" data-numbox-min='1' data-numbox-max='10'>
			<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
			<input id="test" class="mui-input-numbox" type="number" value="1" ref="numbox" @change="postNumb" />
			<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		</div>
	</div>
</template>

<script>
	import mui from '../../lib/mui/js/mui.min.js'
	export default {
		mounted () {
			mui('.mui-numbox').numbox()
			console.log(this.props)
		},
		methods: {
			postNumb () {
				this.$emit('getCountNumb',parseInt(this.$refs.numbox.value))
			}
		},
		props: ['maxNum'],
		watch: {
			maxNum: function (newVal,oldVal) {
				mui('.mui-numbox').numbox().setOption('max',newVal)
			}
		}
	}
</script>

<style lang="less" scoped>
	
</style>