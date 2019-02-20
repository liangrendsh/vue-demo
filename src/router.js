 import VueRouter from 'vue-router'
 //1.引入tabber组件
 import homeContainer from './components/tabbar/homeContainer.vue'
 import member from './components/tabbar/member.vue'
 import search from './components/tabbar/search.vue'
 import shopcar from './components/tabbar/shopcar.vue'
 //引入新闻组件相关
 import NewsList from './components/news/newslist.vue'
 import NewsInfo from './components/news/newsinfo.vue'
 //图片分享组件列表
 import PhotoList from './components/photos/photolist.vue'
 import PhotoInfo from './components/photos/photoinfo.vue'
 //注册商品组件
 import GoodsList from './components/goods/goodsList.vue'
 import GoodsInfo from './components/goods/goodsInfo.vue'
 //商品图文与评论
 import GoodsComment from './components/goods/goodsComment.vue'
 import GoodsDesc from './components/goods/goodsDesc.vue'

 //3.创建路由对象
 var router = new VueRouter({
 	routes: [
 		{
 			path: '/',
 			redirect: '/home'
 		},
 		{
 			path: '/home',
 			component: homeContainer
 		},
 		{
 			path: '/member',
 			component: member
 		},
 		{
 			path: '/search',
 			component: search
 		},
 		{
 			path: '/shopcar',
 			component: shopcar
 		},
 		{
 			path: '/home/newslist',
 			component: NewsList
 		},
 		{
 			path: '/home/newsinfo/:id',
 			component: NewsInfo
 		},
 		{
 			path: '/home/photolist',
 			component: PhotoList
 		},
 		{
 			path: '/home/photoinfo/:id',
 			component: PhotoInfo
 		},
 		{
 			path: '/home/goodslist',
 			component: GoodsList
 		},
 		{
 			path: '/home/goodsinfo/:id',
 			component: GoodsInfo,
 			name: 'goodsinfo'
 		},
 		{
 			path: '/home/goodsdesc/:id',
 			component: GoodsDesc,
 			name: 'goodsdesc'
 		},
 		{
 			path: '/home/goodscomment/:id',
 			component: GoodsComment,
 			name: 'goodscomment'
 		}

 	],

 	linkActiveClass: 'mui-active'
 })
 export default router