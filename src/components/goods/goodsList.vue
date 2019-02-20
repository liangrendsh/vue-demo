<template>
	<div class="goodslist">
		<!-- <router-link class="goodsitem" v-for="item in goodsList" :key="item.id" :to="'/home/goodsinfo/' + item.id" tag="div">
			<img :src="item.img_url" alt="">
			<h1>{{ item.title }}</h1>
			<div class="info">
				<p class="price">
					<span class="now">￥{{ item.sell_price }}</span>
					<span class="old">￥{{ item.market_price }}</span>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩{{ item.stock_quantity }}件</span>
				</p>
			</div>
		</router-link> -->

		<div class="goodsitem" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
			<img :src="item.img_url" alt="">
			<h1>{{ item.title }}</h1>
			<div class="info">
				<p class="price">
					<span class="now">￥{{ item.sell_price }}</span>
					<span class="old">￥{{ item.market_price }}</span>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩{{ item.stock_quantity }}件</span>
				</p>
			</div>
		</div>
	
		<mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				pageindex: 1,
				goodsList: []
			}
		},
		created () {
			this.getGoodsList()
		},
		methods: {
			//获取商品列表数据
			getGoodsList () {
				this.$http.get('api/getgoods?pageindex=' + this.pageindex ).then( res => {
					if (res.body.status === 0) {
						this.goodsList = this.goodsList.concat(res.body.message)
					}
				})
			},
			getMore () {
				this.pageindex++
				this.getGoodsList()
			},
			goDetail (id) {
				console.log(this.$router)
				//使用js形式进行路由导航
				// this.$router.push('/home/goodsinfo/' + id)
				//使用方式2 传入一个对象 path是路径
				this.$router.push({path: '/home/goodsinfo/' + id})
				//使用方式3 命名路由 不需要将参数拼接进去，将参数传递在parans属性中
				//name:属性值是当前这个路由匹配规则中的名字，是routes属性值的第4个属性
				this.$router.push({name: 'goodsinfo', params: {id: id}})

			}
		}
	}
</script>

<style lang="less" scoped>
	.goodslist{
		display: flex;
		flex-wrap: wrap;
		padding: 8px;
		justify-content: space-between;
		margin:3px 0;
		.goodsitem{
			width: 49%;
			border:1px solid #ccc;
			box-shadow: 3px 3px 5px #ccc;
			margin-bottom: 5px;
			padding: 2px;
			min-height: 293px;
			display:flex;
			flex-direction: column;
			justify-content: space-between;
			img{
				width: 100%;
			}
			h1{
				font-size: 14px;
			}
			.info{
				background:#ddd;
				margin: 0;
				padding: 5px;
				.price{
					display: flex;
					justify-content: space-between;
					.now{
						color:red;
						font-weight: bold;
					}
					.old{
						text-decoration: line-through;
					}
				}
				.sell{
					display: flex;
					justify-content: space-between;
					font-size: 12px;
				}
			}
		}
	}
</style>