import Vue from 'vue'
import VueRouter from 'vue-router'

//6. 安装路由模块
Vue.use(VueRouter)

//3-0配置vuex

//在这一步将本地存储中的car取出来，放到car中
var car = JSON.parse(localStorage.getItem('car') || '[]')
import Vuex from 'vuex'
Vue.use(Vuex)
var store = new Vuex.Store({
	state: { // this.$store.state.***
			// {id: 商品的id, count: 当前这个商品要购买的数量, price: 商品的单价, selected: true/false 商品选中状态 }
		car: car
		

	},
	mutations: { // this.$store.commit('方法名称','按需传递唯一的参数')
		//点击加入购物车，把store中的商品信息加入其中
		addToCar (state,goodsinfo) {
			//如果购物车之前已经有这个商品，只需要更新当前这个商品的数量即可
			//如果之前没有这个商品，则直接加入购物车

			//假设car中没有这个商品的数据
			var flag = false
			state.car.some(item => {
				if (item.id === goodsinfo.id) {
					item.count += goodsinfo.count
					flag = true
					return true
				}
			})

			//如果flag任然是false，则表明其中没有这个数据，那么就追加进去
			if (!flag) {
				state.car.push(goodsinfo)
			}

			//当到这一步的时候，就将car中的数据存到本地中
			localStorage.setItem('car', JSON.stringify(state.car))

		},
		updateGoodsInfo (state,goodsinfo) {
			state.car.some(item => {
				if (item.id == goodsinfo.id) {
					item.count = parseInt(goodsinfo.count)
					return true
				}
			})
			//更新完之后在存储起来
			localStorage.setItem('car', JSON.stringify(state.car))

		},
		remove (state,id) {
			state.car.some((item,i) => {
				if (item.id == id) {
					state.car.splice(i,1)
					return true
				}
				//再次保存最新的数据
			})
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		updataGoodsSelected (state, info) {
			state.car.some(item => {
				if (item.id == info.id) {
					item.selected = info.selected
					return true
				}
			})
			localStorage.setItem('car', JSON.stringify(state.car))
		}

	},
	getters: { // this.$route.getters.***
		getCount (state) {
			var c = 0
			state.car.forEach(item => {
				c += item.count
			})
			return c
		},
		getGoodsCount: function(state) {
			var o = {}
			state.car.forEach(item => {
				o[item.id] = item.count
			})
			return o
		},
		getGoodsSelected (state) {
			var o = {}
			state.car.forEach(item => {
				o[item.id] = item.selected
			})
			return o
		},
		getGoodsCountAndAmount (state) {
			var o = {
				count: 0,
				amount:0
			}
			state.car.forEach(item => {
				if (item.selected) {
					o.count += item.count
					o.amount += item.price * item.count
				}
			})
			return o
		}
	}
})


//2.按需导入mint ui 中的组件
/*import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
import 'mint-ui/lib/style.css'
//3.注册组件
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
//lazyload组件
Vue.use(Lazyload)*/
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//9. 导入 vue-resource
import VueResource from 'vue-resource'
//10.安装vue-resource
Vue.use(VueResource)

//4.导入 mui 样式文件
import './lib/mui/css/mui.min.css'


//5.导入extra 字体样式文件
 import './lib/mui/css/icons-extra.css'
 // 使用vue-preview插件
import VuePreview from 'vue-preview'

// defalut install
Vue.use(VuePreview)

 //7. 导入自己的router模块
 import router from './router.js'

//1.导入app组件
import app from './App.vue'

//2. 全局配置请求根域名
Vue.http.options.root = 'http://www.liulongbin.top:3005'

//3-0 全局设置post请求的请求格式为表单格式
Vue.http.options.emulateJSON = true



//2-2 引入moment.js 格式化时间的
import moment from 'moment'

//2-1 定义一个全局的过滤器
Vue.filter('dataFormat',function (dataStr, pattern="YYYY-MM-DD HH:MM:SS"){
	//moment直接调用 得到的是当前的时间 moment()
	//如果想要格式化给定的时间要将需要格式化的时间传进去，然后调用 format方法
	return moment(dataStr).format(pattern)
})



var vm = new Vue({
	el: '#app',
	data: {

	},
	methods: {

	},
	render: createElement => createElement(app),
	//8.挂载路由
	router,
	//3-1 挂载vuex
	store: store
})