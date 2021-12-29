<template>
  <div>
    <el-card class="login-form-layout">
      <el-form autoComplete="on"
               :model="loginForm"
               :rules="loginRules"
               ref="loginForm"
               label-position="left">
        <div style="text-align: center">
          <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
        </div>
        <h2 class="login-title color-main">易圣通Mall后台</h2>
        <el-form-item prop="username">
          <el-input name="username"
                    type="text"
                    v-model="loginForm.username"
                    autoComplete="on"
                    placeholder="请输入用户名">
          <span slot="prefix">
            <svg-icon icon-class="user" class="color-main"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password"
                    :type="pwdType"
                    @keyup.enter.native="handleLogin"
                    v-model="loginForm.password"
                    autoComplete="on"
                    placeholder="请输入密码">
          <span slot="prefix">
            <svg-icon icon-class="password" class="color-main"></svg-icon>
          </span>
            <span slot="suffix" @click="showPwd">
            <svg-icon icon-class="eye" class="color-main"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px;text-align: center">

          <el-button style="width: 30%" type="primary" :loading="loading"
                     @click.native.prevent="handleLogin">
            密码登录
          </el-button>
          <el-button style="width: 40%" type="primary" :loading="loading" @click="faceMain">
            人脸识别登录
          </el-button>
          <el-button style="width: 20%" type="primary" @click.native.prevent="handleTry">
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <img :src="login_center_bg" class="login-center-layout">
    <el-dialog
      title="用户注册"
      :visible.sync="regVisible"
      :show-close="true"
      :center="true"
      @close='closeReg'
      width="40%">
      <div style="text-align: center">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="校验密码" prop="repwd" >
            <el-input v-model="ruleForm.repwd" show-password></el-input>
          </el-form-item>
          <el-form-item label="头像" prop="pic">
              <el-image  :src="ruleForm.pic">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
            <el-button   icon="el-icon-camera" @click="faceMain">采集头像</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

    </el-dialog>


    <el-dialog
      title="人脸识别登录"
      :visible.sync="faceVisible"
      :show-close="true"
      :center="true"
      @close='closeLogin'
      width="40%">
      <el-row :gutter="24">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <video ref='video' id="video"  width="100%" height="70%" muted="muted"
                   style="display: none"></video>
            <canvas ref='canvas' id="canvas" width='400' height='440' style="display: none"></canvas>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="takePic" v-show="getPicFlag" plain>获取脸</el-button>
        <el-button @click="flogin" v-show="loginFlag" plain>登录</el-button>
      </span>
        <!--拍照-->
    </el-dialog>
    </div>

</template>

<script>
  //import {isvalidUsername} from '@/utils/validate';
  import {setSupport,getSupport,setCookie,getCookie} from '@/utils/support';
  import { getToken, setToken, removeToken } from '@/utils/auth'
  import SingleUpload from '@/components/Upload/singleUpload'
  //导入该图片变量
  import weishushulogo from '@/assets/images/weishushu.jpg';
  import login_center_bg from '@/assets/images/login_center_bg.png'
  import { reg }from '@/api/reg'
  import {Message} from "element-ui";
  const fLoginParam = {
    imgdata:null
  };
  export default {
    components:{SingleUpload},
    name: 'login',
    data() {

      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('校验密码不能为空！'))
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次密码不匹配，请检查后再次输入！'))
        } else {
          callback()
        }
      }

      // const validateUsername = (rule, value, callback) => {
      //   if (!isvalidUsername(value)) {
      //     callback(new Error('请输入正确的用户名'))
      //   } else {
      //     callback()
      //   }
      // };
      const validatePass = (rule, value, callback) => {
        if (value.length < 3) {
          callback(new Error('密码不能小于3位'))
        } else {
          callback()
        }
      };


      return {
        ruleForm: {
          username: '',
          password: '',
          repwd: '',
          pic:''

        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          repwd: [
            { required: true,validator: validatePass2, trigger: 'blur' }
          ],
          pic:[
            {required: true, message: '请选择你的头像', trigger: 'blur'}
          ]

        },
        regParam: Object.assign({}, this.ruleForm),
        blobFile: null,
        picData:null,
        modal: {
          visibleCamera: false
        },
        floginP: Object.assign({}, fLoginParam),
       // canvas: null,
        //video: null,
        MediaStreamTrack: null,

        loginForm: {
          username: '',
          password: '',
        },
        loginRules: {
          username: [{required: true, trigger: 'blur'}],
          password: [{required: true, trigger: 'blur', validator: validatePass}]
        },
        loading: false,
        pwdType: 'password',
        login_center_bg,
        regVisible:false,
        faceVisible:false,
        canvas: null,
        video: null,
        loginFlag:false,
        getPicFlag:false,
        //导出该变量 以方便html中使用
        weishushulogo,
      }

    },

    created() {
      this.loginForm.username = getCookie("username");
      this.loginForm.password = getCookie("password");
      if(this.loginForm.username === undefined||this.loginForm.username==null||this.loginForm.username===''){
        this.loginForm.username = 'admin';
      }
      if(this.loginForm.password === undefined||this.loginForm.password==null){
        this.loginForm.password = '';
      }

    },
    mounted() {//已经完成渲染

    },

    methods: {
      closeReg(){
        this.regVisible =false;
        setSupport(true);
        this.resetForm("ruleForm")
        console.log('close!');
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {//校验成功
            reg(this.ruleForm).then(response => {
              console.log("data:"+response.data)
              if(response.data.error_code==500){
                Message({
                  message: "用户已经注册！",
                  type: 'error',
                  duration: 3 * 1000
                })
              }else{
                Message({
                  message: "注册用户成功！",
                  type: 'success',
                  duration: 3 * 1000
                })
                this.closeReg();

                //this.$router.push({path: '/login'})

              }
            });
          } else {//失败
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.ruleForm.pic="";
        console.log("ruleForm")
      },
      flogin(){
        this.$store.dispatch('FLogin', this.floginP).then(() => {//登录成功 设置Cookie
          this.loading = false;
          this.$router.push({path: '/'})//路由根 成功，跳转主页
        }).catch(() => {
          this.loading = false
        })

      },
      takePic() {//拍照
        //let that = this
        this.canvas = document.getElementById('canvas')
        this.video = document.getElementById('video')
        this.$refs.canvas.getContext('2d').clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)//清除画布
        this.$refs.canvas.getContext('2d').drawImage(this.video, 235, 0, this.$refs.canvas.width, this.$refs.canvas.height, 0, 0, this.$refs.canvas.width, this.$refs.canvas.height) //清空画布

        let dataurl = this.canvas.toDataURL()
        if(this.regVisible){//注册界面
          this.loginFlag=false
          this.ruleForm.pic=dataurl
          //关闭头像采集
          this.faceVisible=false;
          this.closeLogin();
        }else{//登录界面
          //删除字符串前的提示信息 "data:image/png;base64,"
          /// console.log(dataurl)
          var b64 = dataurl.substring(22);
          this.floginP.imgdata=b64//图像信息给后台
          this.blobFile = this.dataURLtoFile(dataurl, 'camera.jpg')
        }
        //video 隐藏
        this.modal.visibleCamera = false // 关闭摄像头弹层
        this.$refs.video.style="display:none"
        this.$refs.canvas.style="display:block"
        this.MediaStreamTrack && this.MediaStreamTrack.stop()


        this.loginFlag=true
        this.getPicFlag=false
        console.log("关闭了");

      },
      dataURLtoFile(dataurl, filename) {
        let arr = dataurl.split(',')
        let mime = arr[0].match(/:(.*?);/)[1]
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], filename, {type: mime})
      },
      closeLogin() {
        this.$refs.canvas.getContext('2d').clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)//清除画布
        this.$refs.video.style="display:none"
        this.$refs.canvas.style="display:none"
        this.MediaStreamTrack && this.MediaStreamTrack.stop()
      },
      faceMain(){
        this.faceVisible =true
        this.loginFlag=false
        this.handleCamera()

      },
      handleCamera() {
        console.log("handleCamera")
        //this.$refs.canvas.getContext('2d').clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)//清除画布
        let that = this
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          }).then(function (stream) {
            //console.log(stream)
            that.$refs.video.style="display:block"

            //this.modal.visibleCamera = true // 打开摄像头弹层
            that.MediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[1]
            that.$refs.video.srcObject = stream
            that.$refs.video.play()
            that.getPicFlag=true

          }).catch(function (err) {
            console.log(err)
          })
        } else if (navigator.getMedia) {
          navigator.getMedia({
            video: true
          }).then(function (stream) {
            that.MediaStreamTrack = stream.getTracks()[1]
            that.$refs.video.srcObject = stream
            that.$refs.video.play()
          }).catch(function (err) {
            console.log(err)
          })
        }
      },

      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },

      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store.dispatch('Login', this.loginForm).then(() => {//登录成功 设置Cookie
              this.loading = false;
              setCookie("username",this.loginForm.username,15);
              setCookie("password",this.loginForm.password,15);

              this.$router.push({path: '/'})//路由根 成功，跳转主页
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('参数验证不合法！');
            return false
          }
        })
      },
      handleTry(){
        this.regVisible =true
      },
      faceConfirm(){
        this.faceVisible =false;
        setSupport(true);
      },
      dialogConfirm(){

      },
      dialogCancel(){
        this.regVisible = false;
        setSupport(false);
      }
    }
  }
</script>

<style scoped>
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: 140px auto;
    border-top: 10px solid #409EFF;
  }

  .login-title {
    text-align: center;
  }

  .login-center-layout {
    background: #409EFF;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 200px;
  }


  .bg-purple {
    background: #FFFFFF;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

</style>
