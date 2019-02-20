<template>
	<div>
		<mt-swipe :auto="4000">
            <!-- 使用v-for循环一定要记得使用 key -->
            <!-- 指定轮播图获取数据的这个是luboList -->
            <mt-swipe-item v-for="item in luboList" v-bind:key="item.id">
                <img :src="item.img" alt="" :class="{full:isfull}">
 		 </mt-swipe-item>
        </mt-swipe>
	</div>
</template>

<script>
	export default {
		data () {
			return {

			}
		},
		methods: {

		},
		props: ['luboList','isfull']
	}
</script>

<style lang="less" scoped>
	.mint-swipe {
	    height: 200px;
		text-align: center;
	    .mint-swipe-item {
	        &:nth-child(1) {
	            
	        }

	        &:nth-child(2) {
	            
	        }

	        &:nth-child(3) {
	            
	        }

	        img {
	            
	            height: 100%;
	        }
	    }
	    .full{
	    	width: 100%;
	    }
}
</style>