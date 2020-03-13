<template>
    <div>
        <div class="left_carousel">
            <el-carousel height="340px">
                <el-carousel-item v-for="item in planting" :key="item._id">
                    <img :src="item.planting_URL" alt="" @click="getArticle(item.articleId)">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="article_list">
            <ul>
                <li v-for="item in articleList" :key="item._id">
                    <div>
                        <a @click="getArticle(item._id)" title="我的家乡山东作文500字" target="_blank" style="cursor: pointer"><i><img
                                :src="item.imgURL" alt="我的家乡山东作文500字"></i></a>
                    </div>
                    <div>
                        <h2 @click="getArticle(item._id)" style="cursor: pointer">{{item.title}}</h2>
                        <p class="article_list_info">{{item.desc}}</p>
                        <p class="article_list_time"><span><a href="#" target="_blank">{{item.author}}</a></span><span>时间：{{item.create_time | changeTime()}}</span><span>点击：{{item.clicks}}</span>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                articleList:[],
                planting:[]
            }
        },
        mounted() {
            this.$axios.get('/v1/article/getList').then((res)=>{
                // console.log(res)
                if (res.data.meta.msg == 'ok'){
                    this.articleList = res.data.data;
                }
            });
            this.$axios.get('/v1/planting/getPlanting').then((res)=>{
                // console.log(res)
                if (res.data.meta.msg == 'ok'){
                    this.planting = res.data.data;
                }
            })
        },
        methods:{
            getArticle(id){
                this.$router.push({name:'getArticle',query:{id:id}})
            }
        }
    }
</script>

<style scoped>
    .left_carousel {
        padding: 5px;
    }

    .article_list {
        padding: 5px;

    }

    .article_list ul {
        padding: 5px;
        background-color: rgba(255, 255, 255, 0.8);
    }

    .article_list li {
        display: flex;
        overflow: hidden;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px dotted #ccc;
    }

    .article_list li h2 {
        font-family: 楷体;
        margin-left: 5px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        word-break: break-all;
        overflow: hidden;
    }

    .article_list li .article_list_info {
        font-size: 12px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-break: break-all;
        overflow: hidden;
        text-indent: 2em;
        margin: 5px;
        color: rgba(0, 0, 0, 0.8);
        font-family: 微软雅黑;
    }

    .article_list li .article_list_time span {
        margin-left: 5px;
        margin-right: 5px;
        color: #888;
        font-size: 13px;
    }

    .article_list li .article_list_time span a {
        color: #ed4040;
    }

    .article_list li div a i>img{
        width: 140px;
        height: 90px;
    }

    .el-carousel__item img{
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
</style>