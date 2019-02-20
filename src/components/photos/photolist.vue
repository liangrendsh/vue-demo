<template>
	<div>
		<div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a :class="['mui-control-item', item.id === 0 ? 'mui-active' : '']" href="#item1mobile" data-wid="tab-top-subpage-1.html" v-for="item in photoCategory" v-bind:key="item.id" @click="getPhotosById(item.id)">
						{{ item.title }}
					</a>
				
				</div>
			</div>
		</div>

		<!-- 图片列表区域 -->
		<ul class="photo-list">
		  <router-link :to="'/home/photoinfo/' + item.id" v-for="(item, i) in list" :key="item.id" tag="li">
		    <img v-lazy="item.img_url">
		    <div class="info">
		    	<h1 class="info-title"> {{ item.title }} </h1>
		    	<div class="info-body"> {{ item.zhaiyao }} </div>
		    </div>
		  </router-link>
		</ul>

	</div>
</template>

<script>
	//1.导入mui js 文件
	
	import mui from '../../lib/mui/js/mui.min.js'
	
	export default {
		data () {
			return {
				photoCategory: [],
				list: [] //图片列表数据
			}
		},
		created () {
			this.getPhotoCategory()
			this.getPhotosById(0)
		},
		mounted () { // 当组件dom结构渲染好，并且放到页面中，会执行这个函数
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			})
		},
		methods: {
			getPhotoCategory () {
				this.$http.get('api/getimgcategory').then(result => {
					if (result.body.status === 0) {
						var all = {title: '全部', id: 0}
						result.body.message.unshift(all)
						this.photoCategory = result.body.message
					}
				})
			},
			getPhotosById (id) {
				this.$http.get('api/getimages/' + id).then( result => {
					if (result.body.status === 0) {
						// console.log(result)
						this.list = result.body.message
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	*{
		touch-action:pan-y;
	}
	
	.photo-list{
		margin: 0;
		padding: 0;
		padding: 10px;
		padding-bottom: 0;
		li{
			list-style: none;
			background: #ccc;
			text-align: center;
			margin-top: 10px;
			box-shadow: 0 0 5px #999;
			position: relative;
			img{
				width: 100%;
				/*display: block;*/
				vertical-align: middle;
			}
			img[lazy=loading] {
			  width: 40px;
			  height: 300px;
			  margin: auto;
			}
			.info{
				text-align: left;
				position: absolute;
				bottom: 0;
				background: rgba(0,0,0,.5);
				max-height: 84px;
				.info-title{
					text-align: center;
					color:#fff;
					font-size: 14px;
				}
				.info-body{
					color:#fff;
					font-size: 12px;
				}
			}
			
			
		}

	}
</style>