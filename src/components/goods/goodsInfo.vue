<template>
    <div class="goodsinfo-container">
        <!-- 小球 -->
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="flag" ref="ball"></div>
        </transition>
        <!-- 轮播 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :luboList="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>
        <!-- 购买 -->
        <div class="mui-card">
            <div class="mui-card-header"> {{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        <span class="old">市场价: ￥{{ goodsinfo.market_price }}</span>
                        &nbsp;&nbsp;&nbsp;
                        <span class="now">销售价: ￥{{ goodsinfo.sell_price }}</span>
                    </p>
                    <p>
                        购买数量: <numbox @getCountNumb="countFun" :maxNum="goodsinfo.stock_quantity"></numbox>
                    </p>
                    <mt-button type="primary" size="small">立即购买</mt-button>
                    <mt-button type="primary" size="small" @click="addToShopCar">加入购物车</mt-button>
                </div>
            </div>
        </div>
        <!-- 参数 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:{{ goodsinfo.goods_no }}</p>
                    <p>商品库存:{{ goodsinfo.stock_quantity }}</p>
                    <p>上架时间:{{ goodsinfo.add_time | dataFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(goodsinfo.id)">图文介绍</mt-button>
                <br>
                <mt-button type="danger" size="large" plain @click="goComme(goodsinfo.id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import lunbotu from '../subcomponents/swiper.vue'
import numbox from '../subcomponents/numbox.vue'
export default {
    data() {
        return {
            id: this.$route.params.id,
            lunbotu: [],
            goodsinfo: {},
            flag: false,
            countSelect: 1
        }
    },
    created() {
        this.getLunBu()
        this.getGoodsInfo()
    },
    methods: {
        getLunBu() {
            this.$http.get('api/getthumimages/' + this.id).then(res => {
                if (res.body.status === 0) {
                    res.body.message.forEach(item => {
                        item.img = item.src
                    })
                    this.lunbotu = res.body.message
                }
            })
        },
        getGoodsInfo() {
            this.$http.get('api/goods/getinfo/' + this.id).then(res => {
                if (res.body.status === 0) {
                    this.goodsinfo = res.body.message[0]
                }
            })
        },
        goDesc(id) {
            this.$router.push({ name: 'goodsdesc', params: { id: id } })
        },
        goComme(id) {
            this.$router.push({ name: 'goodscomment', params: { id: id } })
        },
        beforeEnter(el) {
            el.style.transform = 'translate(0,0)'
        },
        enter(el, done) {
            el.offsetWidth
            //获取小球在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect()
            //获取购物车徽标在页面中的位置
            const badgePosition = document.getElementById('badge').getBoundingClientRect()
            const xDist = badgePosition.left - ballPosition.left
            const yDist = badgePosition.top - ballPosition.top
            el.style.transform = `translate(${xDist}px,${yDist}px)`
            el.style.transition = 'all 0.3s ease-out'
            done()
        },
        afterEnter(el) {
            this.flag = !this.flag
        },
        countFun(number) {
            this.countSelect = number
            console.log(this.countSelect)
        },
        addToShopCar() {
            this.flag = !this.flag
            //拼接处要加入store中car数组的商品信息对象
            var goodsinfo = { 
            	id: this.id, 
            	count: this.countSelect, 
            	price: this.goodsinfo.sell_price, 
            	selected: true 
            }
            //调用store中的 mutation 中的addToCar方法天机商品信息
            this.$store.commit('addToCar', goodsinfo)
        }
    },
    components: {
        'swiper': lunbotu,
        'numbox': numbox
    }
}
</script>
<style scoped lang="less">
.now {
    font-size: 14px;
    color: red;
    font-weight: bold;
}

.mui-card-footer {
    display: block;
}

.goodsinfo-container {
    position: relative;
}

.ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: red;
    position: absolute;
    z-index: 999;
    left: 78px;
    top: 362px;
}
</style>