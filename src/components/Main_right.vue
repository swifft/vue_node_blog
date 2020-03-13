<template>
    <div class="hidden-sm-and-down main_right">
        <div class="tuiJian">
            <el-card class="box-card">
                <ul>
                    <li>
                        <div>
                            <h2>站长推荐</h2>
                        </div>
                    </li>
                    <li v-for="item in Recommend" :key="item._id" @click="getArticle(item._id)" style="cursor: pointer">
                        <div>
                            <img :src="item.imgURL" alt="">
                        </div>
                        <div>
                            <p>{{item.desc}}</p>
                        </div>
                    </li>
                </ul>
            </el-card>
        </div>
        <div class="reMen">
            <el-card class="box-card">
                <ul>
                    <li>
                        <div>
                            <h2>热门点击</h2>
                        </div>
                    </li>
                    <li v-for="item in HotTips" :key="item._id" @click="getArticle(item._id)" style="cursor: pointer">
                        <div>
                            <p> {{item.desc}}</p>
                        </div>
                    </li>
                </ul>
            </el-card>
        </div>
    </div>
</template>

<script>
    import 'element-ui/lib/theme-chalk/display.css';
    export default {
        data() {
            return {
                Recommend:[],
                HotTips:[]
            }
        },
        mounted() {
            this.$axios.get('/v1/article/recommend').then((res)=>{
                // console.log(res)
                if (res.data.meta.msg == 'ok'){
                    this.Recommend = res.data.data;
                }
            });
            this.$axios.get('/v1/article/getHot').then((res)=>{
                // console.log(res)
                if (res.data.meta.msg == 'ok'){
                    this.HotTips = res.data.data;
                }
            });
        },
        methods:{
            getArticle(id){
                this.$router.push({name:'getArticle',query:{id:id}});
                location.reload()
            }
        }
    }
</script>

<style scoped>
    .main_right {
        margin: 5px;
        display: flex;
        flex-direction: column;
    }

    .main_right > div {
        margin-bottom: 20px;
    }

    .main_right ul {
        width: 400px;
    }

    .main_right li {
        display: flex;
        align-items: center;
        overflow: hidden;
        margin-bottom: 12px;
        padding-bottom: 12px;
        border-bottom: 1px dotted #ccc;
    }

    .main_right .reMen li p {
        text-indent: 0;
    }

    .main_right .reMen li:nth-child(2):before {
        content: "01";
        color: #f63;
        font-size: 16px;
        font-style: italic;
        font-family: arial;
    }

    .main_right .reMen li:nth-child(3):before {
        content: "02";
        color: #f63;
        font-size: 16px;
        font-style: italic;
        font-family: arial;
    }

    .main_right .reMen li:nth-child(4):before {
        content: "03";
        color: #f63;
        font-size: 16px;
        font-style: italic;
        font-family: arial;
    }

    .main_right .reMen li:nth-child(5):before {
        content: "04";
        font-size: 16px;
        font-style: italic;
        font-family: arial;
    }

    .main_right .reMen li:nth-child(6):before {
        content: "05";
        font-size: 16px;
        font-style: italic;
        font-family: arial;
    }

    .main_right .reMen li:nth-child(7):before {
        content: "06";
        font-size: 16px;
        font-style: italic;
        font-family: arial;
    }

    .main_right .reMen li:nth-child(8):before {
        content: "07";
        font-size: 16px;
        font-style: italic;
        font-family: arial;
    }

    .main_right .reMen li:nth-child(9):before {
        content: "08";
        font-size: 16px;
        font-style: italic;
        font-family: arial;
    }

    .main_right .reMen li:nth-child(10):before {
        content: "09";
        font-size: 16px;
        font-style: italic;
        font-family: arial;
    }

    .main_right .reMen li:nth-child(11):before {
        content: "10";
        font-size: 16px;
        font-style: italic;
        font-family: arial;
    }

    .main_right li img {
        width: 100px;
        height: 60px;
    }

    .main_right li p {
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        word-break: break-all;
        overflow: hidden;
        font-size: 14px;
        text-indent: 2em;
        margin-left: 5px;
    }
</style>