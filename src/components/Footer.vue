<template>
    <div class="blog_footer">
        <el-row>
            <el-col :xs="{span: 24, offset: 0}" :sm="{span: 24, offset: 0}" :md="{span: 16, offset: 4}"
                    :lg="{span: 16, offset: 4}">
                <div class="footer">
                    <p>©2020 Designed and Developed by Deng Shilin</p>
                    <p>版权所有：Mr.D个人博客</p>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        mounted() {

        },
        methods:{

        }
    }
</script>

<style scoped>
    .blog_footer {
        background-color: rgba(0, 0, 0, 0.6);
    }

    .footer {
        height: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: rgba(255, 255, 255, 0.6);
        font-family: Arial;
    }
</style>