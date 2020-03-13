<template>
    <div>
        <el-card class="box-card">
            <div class="content">
                <p>
                    系统搜索到约有<strong style="color: #ff6633">{{articleList.length}}</strong>项符合<strong style="color: orange">{{search_info}}</strong>的查询结果
                </p>
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
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                articleList:[],
                search_info:''
            }
        },
        mounted() {
           const search =this.$route.query.search;
           this.search_info = search;
           this.$axios.get('/v1/article/search?search=' + search).then((res) => {
                   console.log(res)
                   if (res.data.meta.msg == 'ok') {
                       this.articleList = res.data.data;
                   }
           });
        },
        methods:{
            getArticle(id){
                this.$router.push({name:'getArticle',query:{id:id}})
            }
        }
    }
</script>

<style scoped>
    .content{
        border-top: 1px solid #ccc;
    }

    .content p{
        border-bottom: 1px solid #ececec;
        padding: 15px 10px;
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
</style>