<template>
	<div class="goodsdes_container">
		<h3>{{ info.title }}</h3>
		<hr>
		<div class="content" v-html="info.content"></div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				info: {}
			}
		},
		created () {
			this.getGoodsInfo()
		},
		methods: {
			getGoodsInfo () {
				this.$http.get('api/goods/getdesc/' + this.$route.params.id).then(res => {
					if (res.body.status === 0) {
						console.log(res)
						this.info = res.body.message[0]
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.goodsdes_container{
		padding: 4px;
		h3{
			font-size: 16px;
			color:#226aaf;
			text-align: center;
			margin: 15px 0;
		}
		.content{
			img{
				width: 100%;
			}
		}
	}
</style>