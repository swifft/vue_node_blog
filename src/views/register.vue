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
                    <div class="login_title">Register</div>
                    <div class="content">
                        <el-form :model="registerForm" :rules="RegisterRules" ref="RegisterRef" status-icon>
                            <el-form-item prop="nickname">
                                <el-input prefix-icon="el-icon-user" placeholder="请输入昵称" v-model="registerForm.nickname"></el-input>
                            </el-form-item>
                            <el-form-item prop="email">
                                <el-input prefix-icon="el-icon-message" placeholder="请输入邮箱" v-model="registerForm.email"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input prefix-icon="el-icon-lock" show-password type="password" placeholder="请输入密码" v-model="registerForm.password"></el-input>
                            </el-form-item>
                            <el-form-item prop="compass">
                                <el-input prefix-icon="el-icon-lock" show-password type="password" placeholder="请输入确认密码" v-model="registerForm.compass"></el-input>
                            </el-form-item>
                            <div style="display: flex">
                                <el-input prefix-icon="el-icon-document-checked" placeholder="请输入验证码" v-model="registerForm.code"></el-input>
                                <div @click="refreshCode" style="cursor: pointer">
                                    <Captcha :identifyCode="identifyCode"></Captcha>
                                </div>
                            </div>
                            <div class="boxInfo">
                                <p style="cursor: pointer" @click="$router.push('/login')">已有账号，去登录<i class="el-icon-arrow-right"></i></p>
                            </div>
                            <div class="btn">
                                <el-button type="primary" round style="width: 150px" @click="Register">注册</el-button>
                            </div>
                        </el-form>
                    </div>
                </div>
            </el-col>
        </div>
    </div>
</template>

<script>
    import Captcha from '../components/Captcha'

    export default {
        components:{
          Captcha
        },
        data() {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                registerForm:{
                    nickname:'',
                    email:'',
                    password:'',
                    compass:'',
                    code:''
                },
                RegisterRules:{
                    nickname: [
                        { required: true, trigger: 'blur', message: '请输入昵称' },
                        { min: 2, message: '至少2个字符之间', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, trigger: 'blur', message: '请输入邮箱' },
                        { type:'email', message: '请输入正确的邮箱', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 16, message: '长度在3-16字符之间', trigger: 'blur' }
                    ],
                    compass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                },
                identifyCodes: '1234567890',
                identifyCode: '',
            }
        },
        methods:{
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min)
            },
            refreshCode() {
                this.identifyCode = '';
                this.makeCode(this.identifyCodes, 4)
            },
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
                }
            },
            Register(){
                this.$refs.RegisterRef.validate((valid) => {
                    if (valid){
                        if (this.identifyCode != this.registerForm.code){
                            this.$message.error('验证码不正确,请重新输入')
                        }else {
                            this.$axios.post('/v1/user/register',this.registerForm).then(res =>{
                                    // console.log(res)
                                    if (res.data.meta.status == 400){
                                        this.$message.error(res.data.data)
                                    }
                                    if (res.data.meta.status == 200){
                                        this.$message.success('注册成功')
                                        this.$router.push('./login');
                                    }
                            });
                        }
                    }
                })
            }
        },
        created() {
            this.refreshCode()
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
        justify-content: flex-end;
        margin-top: 10px;
        margin-bottom: 35px;
        font-size: 12px;
        color: rgba(255, 69, 0, 0.7);
    }

    .btn{
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
    }
</style>