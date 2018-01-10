<template>
  <div style="text-align: left">
    <mt-header title="个人中心">
      <router-link to="/main" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <mt-cell title="头像" is-link>
      <span>修改</span>
      <img slot="icon" :src="profile.avatarUrl" width="24" height="24">
    </mt-cell>
    <mt-cell title="账户" :value="profile.username"></mt-cell>
    <mt-cell title="密码" is-link @click.native="inputPasswordPopV = true">修改</mt-cell>
    <mt-cell title="昵称">
      <mt-field placeholder="输入新昵称" v-model="editedBody.nickname" style="text-align: right"></mt-field>
    </mt-cell>
    <mt-cell title="性别" @click.native="inputGenderPopV = true" is-link>{{editedBody.gender | genderTxt}}</mt-cell>
    <div style="padding: 10px 0; margin: 0 10px">
      <mt-button size="large"  plain style="margin-bottom: 5px" :disabled="!ifChanged" @click="update">保存</mt-button>
      <mt-button size="large" type="default" @click="reset">重置</mt-button>
    </div>

    <mt-popup
      class="input"
      v-model="inputPasswordPopV"
      popup-transition="popup-fade">
      <div style="padding: 20px 30px; border-radius: 5px; background-color: whitesmoke">
        <mt-field placeholder="输入当前密码" v-model="editedPassword.oldOne" style="margin-bottom: 1px"></mt-field>
        <mt-field placeholder="输入新密码" v-model="editedPassword.newOne" style="margin-bottom: 1px"></mt-field>
        <mt-button size="large" plain @click="updatePassword" style="margin-bottom: 5px">
          <mt-spinner :size="20" v-if="ifPopLoading" color="#fff" type="snake"
                      style="display: inline-block"></mt-spinner>
          <span v-else="">更新</span>
        </mt-button>
      </div>
    </mt-popup>

    <mt-popup
      class="input"
      v-model="inputGenderPopV"
      popup-transition="popup-fade">
        <mt-radio
          v-model="editedBody.gender"
          :options="options">
        </mt-radio>
    </mt-popup>
  </div>
</template>

<script>
  import axios from 'axios';
  import { Indicator, Toast } from 'mint-ui';
  export default {
    data () {
      return {
        ifPopLoading: false,
        inputPasswordPopV: false,
        inputGenderPopV: false,
        tempPassword: null,
        editedPassword: {
          newOne: null,
          oldOne: null
        },
        options: [
          {
            label: '男',
            value: 'MALE'
          },
          {
            label: '女',
            value: 'FEMALE'
          },
          {
            label: '无',
            value: 'UNDEFINED'
          }
        ],
        profile: {},
        editedBody: {
          nickname: null,
          gender: null
        },
        ifChanged: false
      };
    },
    watch: {
      'editedBody.nickname': function (val) {
        this.ifChanged = !(val === this.profile.nickname && this.editedBody.gender === this.profile.gender);
      },
      'editedBody.gender': function (val) {
        this.ifChanged = !(val === this.profile.gender && this.editedBody.nickname === this.profile.nickname);
      }
    },
    methods: {
      update () {
        if (this.editedBody.nickname === '') {
          this.toggleToast('昵称不允许为空！');
          return;
        }
        Indicator.open('更新中...');
        axios.patch('/profile/update', {
          nickname: this.editedBody.nickname,
          gender: this.editedBody.gender
        }).then((res) => {
          this.profile = res.data;
          this.ifChanged = false;
          Indicator.close();
          this.toggleToast('更新成功！');
        }).catch(e => {
          console.log(e);
          Indicator.close();
          this.toggleToast('更新失败！');
        });
      },
      reset () {
        this.editedBody.nickname = this.profile.nickname;
        this.editedBody.gender = this.profile.gender;
      },
      toggleToast (message) {
        Toast({
          message,
          position: 'bottom',
          duration: 3000
        });
      },
      updatePassword () {
        if (!this.editedPassword.oldOne) {
          this.toggleToast('当前密码不能为空！');
          return;
        }
        if (!this.editedPassword.newOne) {
          this.toggleToast('新密码不能为空！');
          return;
        }
        this.ifPopLoading = true;
        axios
          .post('/auth/change-password', {}, {
            params: {
              oldPassword: this.editedPassword.oldOne,
              newPassword: this.editedPassword.newOne
            }
          })
          .then(res => {
            this.inputPasswordPopV = false;
            this.ifPopLoading = false;
            this.toggleToast('修改成功！');
          })
          .catch(e => {
            this.ifPopLoading = false;
            this.toggleToast('修改失败！');
          });
      },
      editGender () {
      }
    },
    filters: {
      genderTxt (val) {
        switch (val) {
          case 'MALE':
            return '男';
          case 'FEMALE':
            return '女';
          default:
            return '无';
        }
      }
    },
    activated () {
      this.profile = JSON.parse(this.$route.query.data);
      this.editedBody.nickname = this.profile.nickname;
      this.editedBody.gender = this.profile.gender;
    }
  };
</script>

<style scoped>
  .mint-popup {
    width: 70%;
    background: none;
  }
  .mint-cell-wrapper {
    border: none !important;
  }
  .mint-cell {
    padding: 0 1em !important;
  }
  input.mint-field-core {
    text-align: right !important;
  }
</style>
