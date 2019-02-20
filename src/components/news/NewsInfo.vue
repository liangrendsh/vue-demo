<template>
	<div class="newsinfo">
		<h3 class="title"> {{ newsinfo.title }} </h3>
		<p class="subtitle">
			<span>发表时间:{{ newsinfo | dataFormat }}　</span>
			<span>点击 {{ newsinfo.click }} 次</span>
		</p>
		<hr>
		<div class="content" v-html="newsinfo.content"></div>

		<comment-box :newsid=this.id></comment-box>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	//1.导入评论子组件
	import comment from '../subcomponents/comment.vue'
	export default {
		data () {
			return {
				//将传递过来的id值挂载到 data属性中
				id: this.$route.params.id,
				newsinfo: {}
			}
		},
		created () {
			this.getNewsInfo()
		},
		methods: {
			getNewsInfo () {//获取新闻详情
				this.$http.get('api/getnew/' + this.id).then(res => {
					if (res.body.status === 0) {
						this.newsinfo = res.body.message[0]
					} else {
						Toast('获取信息失败')
					}
				})
			}
		},
		components: {
			//2.注册子组件
			'comment-box': comment
		}
	}
</script>

<style lang="less" scoped>
	.newsinfo{
		padding: 5px;
		.title{
			font-size: 16px;
			text-align: center;
			margin: 15px 0;
			color: #ff0000;
		}
		.subtitle{
			font-size: 13px;
			color: #226aff;
			display: flex;
			justify-content: space-between;
		}
		.content{


		}
	}
</style>