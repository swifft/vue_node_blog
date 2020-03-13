<template>
    <div>
        <Header></Header>
        <div class="blog_main">
            <div class="main">
                <el-col :xs="{span: 24, offset: 0}" :sm="{span: 24, offset: 0}" :md="{span: 10, offset: 4}"
                        :lg="{span: 10, offset: 4}">
                    <div class="main_left">
                        <router-view></router-view>
                    </div>
                </el-col>
                <Main_right></Main_right>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import 'element-ui/lib/theme-chalk/display.css';
    import Header from "../components/Header";
    import Footer from "../components/Footer";
    import Main_right from "../components/Main_right";

    export default {
        components: {
            Header,
            Footer,
            Main_right
        },
        data() {
            return {}
        },
        mounted() {

        },
        methods: {}
    }
</script>

<style scoped>
    .blog_main {
        background-color: #cccccc;
    }

    .main {
        /*border: 1px solid red;*/
        display: flex;
    }

    .main_left {
        display: flex;
        flex-direction: column;
        margin: 5px;
    }
</style>