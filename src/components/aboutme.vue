<template>
    <div>
        <el-card class="box-card">
            <div class="main_nav">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>关于我</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="main_title">
                <div class="title_main">
                    <h1>关于我</h1>
                </div>
                <div class="content">
                    <el-col :xs="{span: 24, offset: 0}" :sm="{span: 24, offset: 0}"
                            :md="{span: 18, offset: 3}"
                            :lg="{span: 18, offset: 3}">
                        <div style="display: flex;justify-content: space-between;width: 100%;margin-bottom: 20px" class="aboutInfo">
                            <ul>
                                <li>
                                    <strong>姓名：</strong>邓世林
                                </li>
                                <li>
                                    <strong>学历：</strong>本科
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <strong>邮箱：</strong>gxnudsl@gmail.com
                                </li>
                                <li>
                                    <strong>院校：</strong>广西师范大学
                                </li>
                            </ul>
                        </div>
                    </el-col>
                    <div style="width: 100%">
                        <p>时间过得真的很快，一眨眼已经快到了大三的尽头，即将踏入繁杂的社会。</p>
                        <p>加之今年我国爆发的新型冠状病毒疫情，留给我们的时间就真的不多了，我们在为武汉加油，为祖国加油的同时，更应该做好自己的事情。</p>
                        <p><img src="http://121.36.94.53/images/yiqing.jpg" alt=""></p>
                        <p>有时候总会说，正在成长的我们要不负时光韶华。回首往昔，曾经的那个懵懵懂懂的少年已然逝去，作为现在花样年华的我们更应该珍惜时光带给我们的记忆。</p>
                        <p>前几年有一部非常经典的时空穿越电影，叫《时空恋旅人》(别被片名误导，根本不是一个爱情片)，影片科幻外皮下包裹的是对时间的严肃探讨：</p>
                        <p>假设你拥有时空穿梭的能力，你会怎么过你的一生，是尽情挥霍使它加速，还是抓住每一秒把时间无限延长？</p>
                        <p><img src="http://121.36.94.53/images/2020.jpg" alt=""></p>
                        <p>虽然一小时确是60分钟，一分钟是由60秒组成，但对每个人而言，永远存在“相对时间”。有些时刻漫长得好像永远，有些时刻却转瞬即逝得像没发生过。</p>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        mounted() {

        },
        methods: {}
    }
</script>

<style scoped>
    .main_nav {
        padding-bottom: 20px;
        border-bottom: #ececec 1px solid;
        color: #888;
    }

    .main_title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 15px;
        padding-bottom: 10px;
        border-bottom: #ececec 1px solid;
    }

    .main_title .title_main h1 {
        text-align: center;
        font-size: 22px;
        margin-bottom: 25px;
        text-align: center;
    }

    .main_title .content {
        word-break: break-word;
        text-align: justify;
        display: flex;
        flex-direction: column;
    }

    .main_title .content p {
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        margin: 10px 0;
        line-height: 30px;
        text-indent: 2em;
        color: #303133;
    }

    .main_title .content p img{
        width: 80%;
        margin-left: 30px;
    }


    .aboutInfo ul li {
        margin-top: 15px;

    }

    .aboutInfo ul li strong {
        color: orange;
    }
</style>