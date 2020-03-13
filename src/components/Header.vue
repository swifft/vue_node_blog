<template>
    <div class="blog_header">
        <el-row>
            <el-col :xs="{span: 17, offset: 7}" :sm="{span: 17, offset: 7}" :md="{span: 4, offset: 1}"
                    :lg="{span: 4, offset: 1}">
                <div class="title_left">
                    <h1>Mr.D 博客</h1>
                </div>
            </el-col>
            <el-col :xs="{span: 24, offset: 0}" :sm="{span: 24, offset: 0}" :md="{span: 14, offset: 0}"
                    :lg="{span: 14, offset: 0}">
                <div class="title_middle">
                    <div @click="$router.push('/')" style="cursor: pointer">首页</div>
                    <div @click="$router.push('/home/AboutMe')" style="cursor: pointer">关于我</div>
                    <div v-if="userInfo" class="user">欢迎：{{userInfo.nickname}}<el-button type="danger" round size="mini">退出</el-button></div>
                    <div v-else @click="$router.push('/login')" style="cursor: pointer;">登录/注册</div>
                </div>
            </el-col>
            <el-col :xs="{span: 22, offset: 1}" :sm="{span: 22, offset: 1}" :md="{span: 4, offset: 0}"
                    :lg="{span: 4, offset: 0}">
                <div class="title_right">
                    <el-input placeholder="请输入搜索关键词" size="medium" v-model="searchInfo"></el-input>
                    <el-button type="primary" icon="el-icon-search" size="medium" @click="Search_Article">搜索</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchInfo:'',
                userInfo:''
            }
        },
        mounted() {
            this.userInfo = JSON.parse(localStorage.getItem('UserInfo'));
            // console.log(this.userInfo)
        },
        methods:{
            Message_tips(){
                this.$message.error('该功能正在逐步完善中！！！')
            },
            Search_Article(){
                this.$router.push({name:'searchArticle',query:{search:this.searchInfo}})
            }
        }
    }
</script>

<style scoped>
    .blog_header {
        background-color: rgba(144, 238, 144, 0.3);
    }

    .title_left {
        height: 100px;
        display: flex;
        align-items: center;
    }

    .title_left h1 {
        color: rgba(160, 32, 240, 0.6);
        font-family: 楷体;
    }

    .title_middle {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .title_middle div {
        border: 1px solid rgba(0, 0, 0, 0.3);
        padding: 5px;
        border-radius: 5px 5px 5px 5px;
        font-size: 18px;
        font-family: 楷体;
        color: rgba(0, 0, 0, 0.6);
        background-color: rgba(0, 0, 0, 0.1);
    }

    .title_middle .user{
        border: none;
        background-color:transparent;
    }

    .title_right {
        height: 100px;
        display: flex;
        align-items: center;
    }
</style>