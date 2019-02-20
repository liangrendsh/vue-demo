<template>
	<div class="shopcar-container">
		<!-- 购物详情 -->
		<div class="mui-card" v-for="(item,id) in goodslist" :key="item.id">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<div class="goods-list">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChange(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
						<img :src="item.thumb_path" alt="">
						<div class="info">
							<h1>{{ item.title }}</h1>
							<p>
								<span class="price">￥{{ item.sell_price }}</span>&nbsp;&nbsp;
								<numbox :countInit="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>&nbsp;&nbsp;
								<a href="#" @click.prevent="removeGoods(item.id, id)">删除</a>
							</p>
						</div>
					</div>
					
				</div>
			</div>
		</div>
		<!-- 商品结算 -->
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<div class="left">
						<p>总计(不包含运费)</p>
						<p>已勾选<span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span>件，总价￥<span class="red">{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
					</div>
					<mt-button type="danger" size="small">去结算</mt-button>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import numbox from '../subcomponents/shopcar-numbox.vue'
	export default {
		data () {
			return {
				goodslist: []
			}
		},
		created () {
			this.goodsCar()
		},
		methods: {
			goodsCar () {
				//获取公共区域中car中都有哪些数据，将id存起来
				var idArr = []
				this.$store.state.car.forEach(item => {
					return idArr.push(item.id)
				})
				if (idArr.length <= 0) {
					return
				}
				this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then(res => {
					if (res.body.status === 0) {
						this.goodslist = res.body.message
					}
				})
			},
			removeGoods (goodsid,id) {
				this.goodslist.splice(id,1)
				this.$store.commit('remove',goodsid)

			},
			selectedChange (id, value) {
				//点击开关，头部状态到store中
				// console.log(id,value)
				this.$store.commit('updataGoodsSelected',{id:id,selected:value})
			}
		},
		components: {
			numbox
		}
	}
</script>

<style scoped lang="less">
	.shopcar-container{
		background: #eee;
		overflow: hidden;
		.goods-list{
			display: flex;
			align-items: center;
			h1{
				font-size: 14px;
			}
			img{
				width: 60px;
				height: 60px;
			}
			.price{
				color: red;
			}
			.info{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
			p{
				display: flex;
				align-items: center;
			}

		}
		.mui-card-content-inner{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.red{
				color: red;
				font-weight: bold;
			}
		}		
	}

</style>