<template>
    <div>
        <!-- 轮播图 -->
        <swiper :luboList="luboList" :isfull="true"></swiper>
        <!-- nav导航 六宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div></router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
            		<img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">留言反馈</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
            		<img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
            		<img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">图片分享</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
            		<img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div></a></li>
         
        </ul>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import lunbotu from '../subcomponents/swiper.vue'
export default {
    data() {
        return {
            luboList: []
        }
    },
    created() {
        this.getLunbo()
        
    },
    methods: {
        getLunbo() {
            this.$http.get('api/getlunbo').then(result => {
                if (result.body.status === 0) {
                    this.luboList = result.body.message
                } else {
                    Toast('数据加载失败')
                }
            })
        }
    },
    components: {
        'swiper': lunbotu
    }
}
</script>
<style lang="less" scoped>

.mui-grid-view.mui-grid-9 {
	background: #fff;
   .mui-table-view-cell{
   		border:none;
   		font-size: 13px;
        li{
            width: 33.333px;
        }
	   	img{
	   		width: 60px;
	   	}

   }

}
</style>