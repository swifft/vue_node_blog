<template>
  <div>
    <el-card class="box-card">
      <div class="main_nav">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>文章详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="main_title">
        <div class="title_main">
          <h1>{{Article.title}}</h1>
        </div>
        <el-col
          :xs="{span: 20, offset: 2}"
          :sm="{span: 20, offset: 2}"
          :md="{span: 24, offset: 0}"
          :lg="{span: 24, offset: 0}"
        >
          <div class="info">
            <span>博客人生</span>
            <span>作者：{{Article.author}}</span>
            <span>日期：{{Article.create_time | changeTime()}}</span>
            <span>点击：{{Article.clicks}}</span>
          </div>
        </el-col>
        <div class="content">
          <p>{{Article.content}}</p>
        </div>
        <div class="tags">
          <span v-for="item in Article.tabs" :key="item._id">{{item}}</span>
        </div>
        <div class="about_article">
          <p
            v-if="this.UpArticle"
            style="cursor: pointer"
            @click="getArticle(UpArticle._id)"
          >上一篇:{{UpArticle.title}}</p>
          <p
            v-if="this.DownArticle"
            style="cursor: pointer"
            @click="getArticle(DownArticle._id)"
          >下一篇:{{DownArticle.title}}</p>
        </div>
      </div>
      <div class="comment">
        <div class="comment_title">文章评论</div>
        <div class="comment_main">
          <div class="text_main">
            <textarea placeholder="写下你想说的，开始我们的对话" v-model="content"></textarea>
          </div>
          <div class="comment_btn">
            <el-button type="danger" round @click="Publish">发表</el-button>
          </div>
        </div>
        <div class="comment_member" v-if="Comment_main.data">
          <p>{{Comment_main.count}}人参与，{{Comment_main.data.length}}条评论</p>
        </div>
        <div class="comment_details">
          <div class="comment_box" v-for="item in Comment_main.data" :key="item._id">
            <div class="commentImg">
              <img src="../assets/images/part502.jpg" alt />
            </div>
            <div class="commentInfo">
              <div class="memberInfo">
                <p>{{item.user_id.nickname}}</p>
                <span>{{item.create_time | changeTime()}}</span>
              </div>
              <div class="comment_content">{{item.content}}</div>
            </div>
          </div>
          <div class="comment_box" :style="{display : tips}">
            <div>没人评论，快来抢占沙发吧！！！</div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                Article: {},
                UpArticle: {},
                DownArticle: {},
                Comment_main:[],
                tips:'none',
                content:'',
                userInfo:''
            }
        },
        mounted() {
            this.userInfo = JSON.parse(localStorage.getItem('UserInfo'))
            const id = this.$route.query.id;
            // console.log(id)
            this.$axios.get('/v1/article/getArticleById?id=' + id).then((res) => {
                // console.log(res)
                if (res.data.meta.msg == 'ok') {
                    this.Article = res.data.data;
                }
            });
            this.$axios.get('/v1/article/getUp?id=' + id).then((res) => {
                // console.log(res)
                if (res.data.meta.msg == 'ok') {
                    this.UpArticle = res.data.data;
                }
            });
            this.$axios.get('/v1/article/getDown?id=' + id).then((res) => {
                // console.log(res)
                if (res.data.meta.msg == 'ok') {
                    this.DownArticle = res.data.data;
                }
            });
            this.$axios.get('/v1/article/getComment?id=' + id).then((res) => {
                if (res.data.meta.msg == 'ok') {
                    this.Comment_main = res.data;
                    if (this.Comment_main.data.length == 0){
                        this.tips = 'block';
                    }else {
                        this.tips = 'none';
                    }
                }
            });
        },
        methods: {
            getArticle(id) {
                this.$router.push({name: 'getArticle', query: {id: id}})
                location.reload()
            },
            Publish(){
                if (!this.userInfo){
                    this.$message.error("请先登录！");
                    setTimeout(()=>{
                        this.$router.push('/login');
                    },1000)
                }else{
                    const CommentInfo = {
                        'content':this.content,
                        'user_id':this.userInfo.id,
                        'article_id':this.Article._id
                    }
                    this.$axios.post('/v1/comment/add', CommentInfo).then((res) => {
                        if (res.data.meta.msg == 'ok') {
                            this.$message.success("评论成功");
                            setTimeout(()=>{
                                location.reload()
                            },1000)
                        }else{
                            this.$message.error("服务器开小差了");
                        }
                    });
                }
            }
        }
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
  margin-bottom: 15px;
  text-align: center;
}

.main_title .info {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888;
  font-size: 14px;
}

.main_title .info span {
  margin-right: 30px;
}

.main_title .content {
  word-break: break-word;
  text-align: justify;
}

.main_title .content p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  margin: 26px 0;
  line-height: 30px;
  text-indent: 2em;
  color: #303133;
}

.main_title .tags {
  width: 100%;
  margin: 10px 0;
  font-size: 14px;
}

.main_title .tags span {
  padding: 5px;
  margin-left: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.main_title .about_article {
  width: 100%;
  margin: 10px 0;
}

.main_title .about_article p {
  width: 100%;
  margin: 10px 0;
}

.comment {
  margin-top: 5px;
}

.comment .comment_title {
  font-size: 24px;
  border-bottom: 1px solid #ececec;
  margin-bottom: 5px;
}

.comment .comment_main {
  vborder-radius: 4px;
  background: #f7f7f7;
  padding: 10px;
  box-shadow: inset 2px 2px 6px rgba(0, 0, 0, 0.08);
}

.comment .comment_main .text_main {
  position: relative;
  overflow: hidden;
  padding: 8px 18px;
}

.comment .comment_main .text_main textarea {
  border: none;
  background: none;
  outline: none;
  width: 100%;
  display: block;
  height: 80px;
  line-height: 22px;
  font-size: 14px;
  background-attachment: scroll;
  resize: none;
  padding: 0;
}

.comment .comment_main .comment_btn {
  display: flex;
  justify-content: flex-end;
}

.comment .comment_member {
  font-size: 14px;
  margin: 30px 0;
}

.comment .comment_details {
  background-color: rgba(190, 190, 190, 0.1);
}

.comment .comment_details .comment_box {
  border-bottom: 1px solid #ececec;
  margin: 5px 0;
  padding: 15px 10px;
  display: flex;
}

.comment .comment_details .commentImg img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.comment .memberInfo {
  display: flex;
}

.comment .memberInfo p {
  color: #444;
  font-size: 18px;
  font-weight: 700;
  margin-left: 20px;
}

.comment .memberInfo span {
  color: #aaa;
  font-size: 14px;
  font-weight: 500;
  margin-left: 10px;
}

.comment .commentInfo .comment_content {
  line-height: 26px;
  font-size: 14px;
  word-wrap: break-word;
  color: #555;
  margin-left: 20px;
}
</style>