<template>
	<div>
		<div class="mui-numbox" data-numbox-min='1' data-numbox-max='10'>
			<button class="mui-btn mui-btn-numbox-minus" type="button" @click="postNumb">-</button>
			<input id="test" class="mui-input-numbox" type="number" :value="countInit" ref="numbox" @change="postNumb" readonly="readonly" />
			<button class="mui-btn mui-btn-numbox-plus" type="button" @click="postNumb">+</button>
		</div>
	</div>
</template>

<script>
	import mui from '../../lib/mui/js/mui.min.js'
	export default {
		mounted () {
			mui('.mui-numbox').numbox()
		},
		methods: {
			postNumb () {
				//数据改变
				// console.log(this.$refs.numbox.value)
				this.$store.commit('updateGoodsInfo',{
					id:this.goodsid, 
					count: this.$refs.numbox.value
				})
			}
		},
		props: ['countInit','goodsid']

	}
</script>

<style lang="less" scoped>
	
</style>