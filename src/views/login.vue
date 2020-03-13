<template>
    <div class="bg">
        <video autoplay="autoplay" loop="loop" class="video_background" muted>
            <source src="../assets/mountains.mp4" type="video/mp4">
        </video>
        <div class="login_container">
            <el-col :xs="{span: 22, offset: 1}" :sm="{span: 22, offset: 1}"
                    :md="{span: 7, offset: 8}"
                    :lg="{span: 7, offset: 8}">
                <div class="login_box">
                    <div class="login_logo">
                        <img src="../assets/images/login_img.jpg" alt="">
                    </div>
                    <div class="login_title">Login</div>
                    <div class="content">
                        <el-form :model="loginForm" status-icon :rules="loginRule" ref="loginRef">
                            <el-form-item prop="email">
                                <el-input prefix-icon="el-icon-message" placeholder="请输入邮箱" v-model="loginForm.email"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input prefix-icon="el-icon-lock" show-password type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
                            </el-form-item>
                            <div class="boxInfo">
                                <p style="cursor: pointer;color: dodgerblue" @click="$router.push('/forget')">忘记密码？</p>
                                <p style="cursor: pointer;color: dodgerblue" @click="$router.push('/register')">注册</p>
                            </div>
                            <div class="btn">
                                <el-button type="warning" round style="width: 150px" @click="login">登录</el-button>
                            </div>
                        </el-form>
                    </div>
                </div>
            </el-col>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loginForm: {
                    email: '',
                    password: ''
                },
                loginRule:{
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { type:'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            login(){
                this.$refs.loginRef.validate((valid)=>{
                    if (valid){
                        const validateCode = new TencentCaptcha('2034439345', (res) =>{
                            if (res.ret == 0){
                                // console.log(res)
                                this.$axios.post('/v1/user/login',this.loginForm).then((res)=>{
                                    // console.log(res)
                                    if (res.data.meta.status == 200 && res.data.meta.msg == 'ok') {
                                        console.log(res.data);
                                        localStorage.setItem('UserInfo',res.data.data.nickname)
                                        this.$message.success('登录成功');
                                        this.$router.push('/index')
                                        // console.log(res.data);
                                        const userInfo = {'nickname':res.data.data.nickname, 'email': res.data.data.email,'id':res.data.data._id};
                                        localStorage.setItem('UserInfo',JSON.stringify(userInfo));
                                        this.$message.success('登录成功');
                                        this.$router.push('/')
                                    }else {
                                        this.$message.error(res.data.data);
                                    }
                                })
                            }else {
                                this.$message.error('登录异常，请重新登陆');
                            }
                        })
                        validateCode.show();
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .bg{
        height: 100%;
        width: 100%;

    }

    .video_background{
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
        position: fixed;
        z-index: -9999;
        left: 0;
        top: 0;
    }

    .login_container{
        position: relative;
        top: 20%;
    }

    .login_box{
        width: 100%;
        background-color: rgba(255, 255, 255, 0.6);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        border-radius: 10px 10px 10px 10px;
    }

    .login_logo{
        transform: translateY(-50%);
        width: 150px;
        height: 150px;
        padding: 5px;
        border: 1px solid #cccccc;
        border-radius: 50%;
        background-color: #eeeeee;
    }

    .login_logo img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        box-shadow: 0 0 5px 5px rgba(255, 255, 255, 0.5);
    }

    .login_title{
        margin-bottom: 20px;
        margin-top: -60px;
        font-size: 38px;
        font-weight: bold;
        font-family: Birthland-Ea4Ze-2;
    }

    .content{
        width: 80%;
    }

    .boxInfo{
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        margin-bottom: 35px;
    }

    .btn{
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
    }

    .el-icon-lock{
        color: #ff6633;
    }
</style>