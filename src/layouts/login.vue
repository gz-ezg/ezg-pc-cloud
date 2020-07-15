
<template>
  <div class="login" @keydown.enter="handleSubmit">
    <Spin size="large" v-if="!sso" fix>
      <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
      <div>正在登录中...</div>
    </Spin>
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>亿账柜信息管理平台
        </p>
        <Tabs value="1">
          <TabPane name="1" label="扫码登陆">
            <div id="wxcode" class="wx-code"></div>
            <p class="login-tip">© 亿账柜版权所有woa3.0</p>
          </TabPane>
          <TabPane name="2" label="账号密码登录">
            <div class="form-con" @on-keydown="keyDown">
              <Form ref="loginForm" :model="form" :rules="rules">
                <FormItem prop="userName" style="margin-bottom:24px">
                  <Input v-model="form.userName" placeholder="用户名" />
                  <span slot="prepend">
                    <Icon :size="16" type="person"></Icon>
                  </span>
                </FormItem>
                <FormItem prop="password" style="margin-bottom:24px">
                  <Input type="password" v-model="form.password" placeholder="密码" />
                  <span slot="prepend">
                    <Icon :size="14" type="locked"></Icon>
                  </span>
                </FormItem>
                <FormItem prop="code" v-if="yzmShow" id="code">
                  <Input v-model="form.code" placeholder="验证码" style="width: 60%" />
                  <Img
                    id="randCodeImage"
                    :src="yzm_url"
                    style="float: right;height: 32px"
                    @click="change_yzm"
                  />
                </FormItem>
                <FormItem prop="isSave" style="margin-bottom:6px">
                  <Checkbox v-model="isSave">七天免登陆</Checkbox>
                </FormItem>
                <FormItem>
                  <Button @click="handleSubmit" type="primary" long :loading="loading">登录</Button>
                </FormItem>
              </Form>
              <p class="login-tip">© 亿账柜版权所有woa3.0</p>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { async } from "q";
import { oweOrderListByFollowby } from "@A/order";

export default {
  data() {
    return {
      sso: true,
      isSave: false,
      form: {
        userName: "",
        password: "",
        code: "",
        count: ""
      },
      rules: {
        userName: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      yzm_url: "/api/user/createImg",
      yzmShow: false,
      loading: false,
      code: ""
    };
  },
  methods: {
    getRequest() {},
    get_login(code) {},
    get_wx_code() {
      window.WwLogin({
        id: "wxcode", //#id
        appid: "ww35cf36c59582b438",
        agentid: "1000004",
        redirect_uri: "http%3a%2f%2fcloud.zgcfo.com%2f%23%2flogin",
        // "redirect_uri" :"http%3a%2f%2fyc.zgcfo.com%3a8089%2fapi%2fuser%2fm%2flogin%2f1000052",
        state: "web_login",
        //href: "https://cloud.zgcfo.com/api/assets/upload/commonImg/wx_code.css"
        href: "https://zgcfo.oss-cn-shenzhen.aliyuncs.com/commonImg/wx_code.css"
        
      });
    },
    handleSubmit() {
      let _self = this;
      let _submit = {};
      this.loading = true;
      _submit.username = _self.form.userName;
      _submit.password = _self.form.password;
      if (_self.count > 2) {
        _submit.randomCode = _self.form.code;
      }

      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let url = "api/user/login/";
          function success(response) {
            _self.loading = false;
            if (_self.isSave == true) {
              Cookies.set("7user", _self.form.userName, { expires: 7 });
              Cookies.set("7password", _self.form.password, { expires: 7 });
              Cookies.set("7issave", _self.isSave, { expires: 7 });
            } else {
              Cookies.set("7user", "");
              Cookies.set("7password", "");
              Cookies.set("7issave", "");
            }

            Cookies.set("user", _self.form.userName);
            Cookies.set("password", _self.form.password);
            localStorage.setItem("realname", response.data.data.user.realname);
            localStorage.setItem("id", response.data.data.user.id);
            localStorage.setItem("companyname", "");
            _self.getUserRole(response.data.data.user.id);
            // _self.checkOweOrderList(response.data.data.user.id);
            //  此处需要写一个promise.all
          }
          function fail(response) {
            _self.loading = false;
            _self.count = response.data.errCount;
            if (_self.count > 2) {
              // _self.$Message.error(response.data.msg);
              _self.yzmShow = true;
              _self.getImg();
              // $('#code').show()
            } else if (_self.count < 3) {
              // _self.$Message.error(response.data.msg);
              // $('#code').hide()
              _self.yzmShow = false;
              _self.getImg();
            } else {
              // _self.$Message.error(response.data.msg);
              _self.getImg();
            }
          }
          console.log(this.$Post);
          this.$Post(url, _submit, success, fail);
        } else {
          this.loading = false;
        }
      });
    },
    getInterfaceItem(re) {
      let url = "api/menu/getInterfaceItemByUserId";

      let config = {
        params: {
          userId: re
        }
      };
      const success = async re => {
        Cookies.set("access", re.data.data.interfaces.join());
        localStorage.setItem(
          "access_array",
          JSON.stringify(re.data.data.interfaces)
        );
        Cookies.set("operations", re.data.data.operations.join());

        // 会计登录判断

        if (localStorage.getItem("Main_Role") == "kuaiji") {
          return this.$router.push("/accountantCenter");
        }
        // 登录判断
        let resp = [];
        try {
          let id = localStorage.getItem("id");
          resp = await oweOrderListByFollowby({ id });
        } catch (error) {
          console.log(error);
        } finally {
          if (resp.length) {
            localStorage.setItem("arrearList", JSON.stringify(resp));
            this.$router.push("/arrearageCenter");
          } else {
            this.$router.push({
              name: "home_index"
            });
          }
        }
      };

      this.$Get(url, config, success);
    },

    getImg() {
      let date = new Date();
      this.yzm_url = "/api/user/createImg?a=" + date.getTime();
    },

    keyDown(e) {
      if (e.code == "Enter") {
        this.handleSubmit();
      }
    },

    getUserRole(e) {
      let _self = this;
      let url = `api/user/checkUserRoleByUserId`;
      let config = {
        params: {
          userId: e
        }
      };

      function success(res) {
        _self.getInterfaceItem(e);
        let temp = [];
        for (let i = 0; i < res.data.data.length; i++) {
          temp.push(res.data.data[i].rolecode);
        }

        //  主要角色map对象 或者可以写成一个枚举对象，使用对象实现
        let roleMap = new Map([
          ["salers", "salers"],
          ["kj", "kuaiji"],
          ["kjbgd", "kuaiji"],
          ["jzkj", "kuaiji"],
          ["servicer", "shangshi"],
          ["ssbgd", "shangshi"],
          ["planner", "qihua"],
          ["qhbgd", "qihua"],
          ["auditing", "shenji"],
          ["sjbgd", "shenji"],
          ["jianzhi", "qudao"]
        ]);

        for (let j = 0; j < temp.length; j++) {
          if (roleMap.get(temp[j])) {
            localStorage.setItem("Main_Role", roleMap.get(temp[j]));
            break;
          } else if (j == temp.length - 1) {
            localStorage.setItem("Main_Role", "other");
          }
        }
        let str = JSON.stringify(temp);
        localStorage.setItem("Role", str);
      }

      this.$Get(url, config, success);
    },
    sso_login(userName, timeStamp, token) {
      let _self = this;
      let url = "api/user/ssoLogin";

      config = {
        params: {
          userName: userName,
          timeStamp: timeStamp,
          token: token
        }
      };

      function success(response) {
        // console.log(response)
        Cookies.set("user", userName);
        Cookies.set("password", "123456");
        localStorage.setItem("realname", response.data.data.user.realname);
        localStorage.setItem("id", response.data.data.user.id);
        localStorage.setItem("companyname", "");
        // _self.getAllTSTypeGroups()
        _self.getInterfaceItem(response.data.data.user.id);
        _self.getUserRole(response.data.data.user.id);
      }

      function fail(err) {
        _self.$Message.error("请输入账号密码登录！");
        _self.sso = true;
        // window.location.reload()
      }

      this.$Get(url, config, success, fail);
    },
    get_sso_params(config) {
      let _self = this;

      if (config.length == 3) {
        return new Promise(function(resolve, reject) {
          let params = [];
          for (let i = 0; i < config.length; i++) {
            params[i] = config[i].split("=")[1];
            console.log(params);
          }
          resolve(params);
        });
      } else {
        console.log("正常登录！");
      }
    },
    //  修改验证码
    change_yzm() {
      this.getImg();
    }
  },
  mounted() {
    this.get_wx_code();
    let code = "";
    let setinterval = setInterval(() => {
      // console.log("1")
      let after = window.location.search;
      after = after.substr(1) || window.location.hash.split("?")[1];
      if (after) {
        code = after.split("=")[1];
        // console.log(code)
        if (code) {
          let _self = this;
          let url = `api/user/qy/login`;
          let config = {
            params: {
              code: code
            }
          };
          function success(res) {
            console.log(res.data.data.realname);
            Cookies.set("user", "");
            localStorage.removeItem("realname");
            localStorage.removeItem("id");
            localStorage.removeItem("companyname");
            Cookies.set("user", res.data.data.realname);
            localStorage.setItem("realname", res.data.data.realname);
            localStorage.setItem("id", res.data.data.id);
            localStorage.setItem("companyname", "");
            _self.getUserRole(res.data.data.id);
          }

          function fail(err) {
            _self.$router.push("/login");
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
          this.$Get(url, config, success, fail);
          clearInterval(setinterval);
        }
      }
    }, 1000);
    if (Cookies.get("7issave")) {
      this.isSave = JSON.parse(Cookies.get("7issave"));
      if (Cookies.get("7user") && this.isSave) {
        this.form.userName = Cookies.get("7user");
        this.form.password = Cookies.get("7password");
        this.handleSubmit();
      }
    }
  }
};
</script>

<style lang="less">
/*html{*/
/*display: flex;*/
/*justify-content: center;*/
/*}*/
.login {
  width: 100%;
  height: 100%;
  background-image: url("https://file.iviewui.com/iview-admin/login_bg.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
  &-con {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
       .form-con {
      padding: 10px 0 0;
    }
    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}
</style>