<template>
    <div class="cmt-container">
        <h3>发表评论:</h3>
        <textarea placeholder="请输入评论" v-model="message"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp; 发表时间: {{ item.add_time | dataFormat() }}
                </div>
                <div class="cmt-body">
                    {{ item.content === 'undefined' ? '此用户很懒，什么也没写' : item.content }}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="more">加载更多</mt-button>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    data() {
        return {
            pageindex: 1,
            comments: [],
            message: ''
        }
    },
    created() {
        this.getComments()
    },
    methods: {
        getComments() {
            this.$http.get('api/getcomments/' + this.newsid + '?pageindex=' + this.pageindex).then(result => {
                if (result.body.status === 0) {
                    this.comments = this.comments.concat(result.body.message)
                    Toast('获取评论')
                } else {
                    Toast('获取评论失败')
                }
            })
        },
        more() {
            this.pageindex++
            this.getComments()
        },
        postComment() {
            // 校验是否为空
            if (this.message.trim().length === 0) return Toast('啥都不写发个鸡儿')
            // console.log(this.newsid,this.$route.params.id)
            this.$http.post('api/postcomment/' + this.$route.params.id, { content: this.message.trim() })
                .then(result => {
                    if (result.body.status === 0) {
                        //拼接出一个评论对象
                        var cmt = { user_name: '匿名', add_time: Date.now(), content: this.message.trim() }
                        this.comments.unshift(cmt)
                        this.message = ''

                    } else {
                        Toast('发表失败')
                    }
                })
        }
    },
    props: ['newsid']
}
</script>
<style lang="less" scoped>
.cmt-container {
    h3 {
        font-size: 18px;
    }

    .cmt-list {
        margin-top: 15px;
        padding: 5px;

        .cmt-item {
            margin-bottom: 10px;

            .cmt-title {
                border-radius: 5px;
                background: #ccc;
                font-size: 13px;
                line-height: 35px;
            }

            .cmt-body {
                text-indent: 2em;

            }
        }
    }
}
</style>