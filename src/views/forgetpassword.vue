<template>
    <div class="bg">
        <video autoplay="autoplay" loop="loop" class="video_background" muted>
            <source src="../assets/mountains.mp4" type="video/mp4">
        </video>
        <div class="login_container">
            <el-col :xs="{span: 22, offset: 1}" :sm="{span: 22, offset: 1}"
                    :md="{span: 7, offset: 8}"
                    :lg="{span: 7, offset: 8}">
                <div class="login_box" :style="{display:isShow1}">
                    <div class="login_logo">
                        <img src="../assets/images/login_img.jpg" alt="">
                    </div>
                    <div class="login_title">Forget Password</div>
                    <div class="content">
                        <el-form :model="forgetPassword" status-icon :rules="forgetRule" ref="forgetRef">
                            <el-form-item prop="email">
                                <el-input v-model="forgetPassword.email" prefix-icon="el-icon-message" placeholder="请输入邮箱"></el-input>
                            </el-form-item>
                            <el-form-item prop="code">
                                <el-col :xs="{span: 13, offset: 0}" :sm="{span: 13, offset: 0}"
                                        :md="{span: 12, offset: 0}"
                                        :lg="{span: 17, offset: 0}">
                                <el-input v-model="forgetPassword.code" prefix-icon="el-icon-document-checked" placeholder="请输入验证码"></el-input>
                                </el-col>
                                <el-button style="margin-left: 10px" type="info" plain round @click="getCode" size="small" :disabled="forgetPassword.is_disabled">{{forgetPassword.getCodeMsg}}
                                </el-button>
                            </el-form-item>
                            <el-form-item style="display: flex;justify-content: center">
                                <el-button type="primary" round @click="codeSubmit">提交</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div class="login_box" :style="{display:isShow2}">
                    <div class="login_logo">
                        <img src="../assets/images/login_img.jpg" alt="">
                    </div>
                    <div class="login_title">Forget Password</div>
                    <div class="content">
                        <el-form :model="changePassword" status-icon :rules="changeRule" ref="changeRef">
                            <el-form-item prop="password">
                                <el-input v-model="changePassword.password" prefix-icon="el-icon-lock" placeholder="请输入密码" show-password></el-input>
                            </el-form-item>
                            <el-form-item prop="compass">
                                <el-input v-model="changePassword.compass" prefix-icon="el-icon-lock" placeholder="请再次输入密码" show-password></el-input>
                            </el-form-item>
                            <el-form-item style="display: flex;justify-content: center">
                                <el-button type="primary" round @click="changePass">更改密码</el-button>
                            </el-form-item>
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
            const comparePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.changePassword.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                forgetPassword: {
                    email: '',
                    code: '',
                    getCodeMsg: '点击获取验证码',
                    is_disabled: false,
                    result_code: ''
                },
                changePassword: {
                    password: '',
                    compass: ''
                },
                forgetRule: {
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '请输入验证码', trigger: 'blur'}
                    ]
                },
                changeRule: {
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    compass: [
                        {validator: comparePassword, trigger: 'blur'}
                    ]
                },
                isShow1: '',
                isShow2: 'none'
            }
        },
        mounted() {

        },
        methods:{
            getCode() {
                this.$refs.forgetRef.validateField('email',(res)=>{
                    // console.log(res)
                    if (res == '请输入邮箱'){
                        this.$message.error('请填写邮件');
                    }
                    if (res == ''){
                        this.$axios.get('/v1/user/getCode?email=' + this.forgetPassword.email).then((res) => {
                            console.log(res)
                            if (res.data.meta.status == 200 && res.data.meta.msg == 'ok') {
                                this.$message.success('发送成功');
                                this.forgetPassword.result_code = res.data.data.code;
                                let time = 180;
                                let timer_code = setInterval(() => {
                                    if (time == 0) {
                                        clearInterval(timer_code);
                                        this.forgetPassword.result_code = ''
                                    } else {}
                                }, 1000);
                                let timer = setInterval(() => {
                                    if (time == 0) {
                                        clearInterval(timer);
                                        this.forgetPassword.is_disabled = false;
                                        this.forgetPassword.getCodeMsg = '重新发送验证码'
                                    } else {
                                        this.forgetPassword.getCodeMsg = time +' ' +'秒后重试';
                                        this.forgetPassword.is_disabled = true;
                                        time--;
                                    }
                                }, 1000);
                            }else {
                                this.$message.error(res.data.data);
                            }
                        });
                    }
                })

            },
            codeSubmit() {
                // console.log(this.forgetPassword.result_code)
                this.$refs.forgetRef.validate((valid) => {
                    if (valid) {
                        if (this.forgetPassword.result_code == '') {
                            this.$message.error('验证码过期,请重新获取');
                            return;
                        } else {
                            if (this.forgetPassword.result_code = this.forgetPassword.code) {
                                this.$message.success('验证通过');
                                setTimeout(()=>{
                                    this.isShow1 = 'none';
                                this.isShow2 = ''
                                },1000)
                            } else {
                                this.$message.error('验证码错误');
                            }
                        }
                    } else {
                        this.$message.error('请填写相关信息');
                        return false;
                    }
                })
            },
            changePass() {
                const data = {
                    email: this.forgetPassword.email,
                    password : this.changePassword.password
                }
                this.$refs.changeRef.validate((valid)=>{
                    // console.log(valid)
                    if (valid){
                        this.$axios.post('/v1/user/changePass',data).then((res)=>{
                            // console.log(res)
                            if (res.data.meta.status == 200 && res.data.meta.msg == 'ok') {
                                this.$message.success('密码修改成功！');
                                this.$router.push('/login')
                            }else {
                                this.$message.error('服务器开小差了！');
                            }
                        })
                    }else {
                        this.$message.error('您填写的信息有误！');
                        return false;
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