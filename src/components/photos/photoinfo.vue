<template>
	<div class="photoinfo-container">
		<h3> {{ photoinfo.title }} </h3>
		<p class="subtitle">
			<span>发布时间： {{ photoinfo.add_time | dataFormat }} </span>
			<span>点击次数： {{ photoinfo.click }} </span>
		</p>
		<hr>

		<!-- 缩略图区域 -->
		<vue-preview :slides="list"></vue-preview>


		<div class="content" v-html="photoinfo.content"></div>

		<!-- 评论子组件 -->
		<cmt-box :newsid="id"></cmt-box>
	</div>
</template>

<script>
	//导入子组件
	import comment from '../subcomponents/comment.vue'
	export default {
		data () {
			return {
				id: this.$route.params.id,
				photoinfo: {},
				list: []
			}
		},
		created () {
			this.getPhotoInfo()
			this.getThumbs()
		},
		methods: {
			//获取图片详情
			getPhotoInfo () {
				this.$http.get('api/getimageInfo/' + this.id).then(result => {
					if (result.body.status === 0) {
						this.photoinfo = result.body.message[0]
					}
				})
			},
			getThumbs () {
				//获取缩略图
				this.$http.get('api/getthumimages/' + this.id).then(res => {
					if (res.body.status === 0) {
						//循环图片的每一个数组，补全图片宽和高
						res.body.message.forEach(item => {
							item.w = 600
							item.h = 400
						})
						//保存数据
						this.list = res.body.message
					}
				})
			},
			handleClose () {
		        console.log('close event')
		      }
			
		},
		components: {
			'cmt-box': comment
		}
	}
</script>

<style lang="less" scoped> 
	.photoinfo-container{
		padding: 3px;
		h3{
			color:#26a2ff;
			font-size: 15px;
			text-align: center;
			margin: 15px 0;
		}
		.subtitle{
			display: flex;
			justify-content: space-between;
			span{
				
			}
		}
		.content{
			font-size: 13px;
			line-height: 25px;
		}
	}
</style>