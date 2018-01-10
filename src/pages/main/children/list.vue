<template>
  <section style="margin: 0 10px">
    <span style="position: fixed; top: 10px; left: 5px;" @click="showNav = true">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="32px" id="Layer_1" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve"><path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"/></svg>
    </span>
    <span style="position: fixed; top: 10px; right: 10px;" @click="goToSearch">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="32px" id="Layer_1" style="enable-background:new 0 0 16 16;" version="1.1" viewBox="0 0 16 16" width="25px" xml:space="preserve"><path d="M15.7,14.3l-3.105-3.105C13.473,10.024,14,8.576,14,7c0-3.866-3.134-7-7-7S0,3.134,0,7s3.134,7,7,7  c1.576,0,3.024-0.527,4.194-1.405L14.3,15.7c0.184,0.184,0.38,0.3,0.7,0.3c0.553,0,1-0.447,1-1C16,14.781,15.946,14.546,15.7,14.3z   M2,7c0-2.762,2.238-5,5-5s5,2.238,5,5s-2.238,5-5,5S2,9.762,2,7z"/></svg>
    </span>
    <img src="../../../assets/LOGO_Keeper.svg" style="height: 100px; padding: 60px 0 80px">
    <div v-if="ifLoading" style="text-align: center; padding-top: 60px">
      <mt-spinner :size="60" color="#333" type="snake" style="display: inline-block"></mt-spinner>
    </div>
    <section v-else="">
      <h3 v-if="collections.length <= 0" style="margin: 40px">
        暂无学习集
      </h3>
      <mt-cell-swipe
        class="collection"
        v-else=""
        v-for="(item, index) in collections"
        :key="'collection:' + index"
        :right="right"
        @click.native="viewCollection(item)"
        @touchend.native = "renewIndex(index, item.id)">
        <div slot="title" style="text-align: left">{{item.name}}</div>
        <span>{{ item.cardCount }}张卡片</span>
      </mt-cell-swipe>
    </section>
    <div style="width: 100%; text-align: right; position: fixed; bottom: 3%; right: 7%">
      <mt-palette-button @click.native="createCollection" content="+"
                         mainButtonStyle="color:#333; background-color:whitesmoke; border: 1px solid #333; ">
        <div class="my-icon-button"></div>
      </mt-palette-button>
    </div>
    <navigation v-model="showNav">
      <li style="margin-bottom: 30px">
        <!--<img class="avatar" src="../../assets/if_avatar_103310.png" alt="">-->
        <img class="avatar" :src="profile.avatarUrl">
        <span style="display: block; font-size: 16px">{{profile.nickname}}</span>
      </li>
      <li @click="goToDashboard">个人中心</li>
      <!--<router-link tag="li" to="/">个人中心</router-link>-->
      <li>设置</li>
      <router-link tag="li" to="/">退出</router-link>
      <!--<li>退出</li>-->
    </navigation>
    <mt-popup
      class="confirm"
      v-model="confirmPopV"
      position="bottom">
      <div>
        <mt-button size="large" type="danger" @click="deleteCollection">确认删除</mt-button>
        <mt-button size="large" @click="confirmPopV = false">取消</mt-button>
      </div>
    </mt-popup>
  </section>
</template>

<script>
  import navigation from '../../../components/navigation';
  import { Toast, MessageBox, Indicator } from 'mint-ui';
  import axios from 'axios';
  import { getStore } from '../../../config/mUtils';
  export default {
    data () {
      return {
        confirmPopV: false,
        selectedIndex: null,
        selectedId: null,
        ifLoading: true,
        showNav: false,
        right: [{
          content: '删除',
          style: {background: '#333', color: '#fff', border: 'none'},
          handler: () => {
            MessageBox.confirm('确定执行此操作?').then(action => {
              this.deleteCollection();
            });
//            this.confirmPopV = true;
          }
        }],
        collections: [],
        filters: {
          page: 0,
          size: 10
        },
        profile: {}
      };
    },
    methods: {
      getCollections () {
        axios.get('/collections', {
          params: {
            username: getStore('username'),
            page: this.filters.page,
            size: this.filters.size
          }
        }).then(res => {
          this.collections = res.data.content;
          this.ifLoading = false;
        }).catch(e => {
          console.log(e);
          this.ifLoading = false;
        });
      },
      createCollection () {
        if (this.ifLoading) {
          this.toggleToast('集合列表尚未加载完毕');
          return;
        }
        Indicator.open('创建中...');
        axios.post('/collections', {}, {
          params: {
            name: 'undefined'
          }
        }).then((res) => {
          this.collections.unshift(res.data);
          Indicator.close();
          this.toggleToast('创建成功！');
        }).catch(e => {
          console.log(e);
          Indicator.close();
          this.toggleToast('创建失败！');
        });
      },
      deleteCollection () {
        Indicator.open('删除中...');
        axios
          .delete('/collections/' + this.selectedId)
          .then((res) => {
            this.collections.splice(this.selectedIndex, 1);
            Indicator.close();
            this.toggleToast('删除成功！');
          })
          .catch(e => {
            console.log(e);
            Indicator.close();
            this.toggleToast('删除失败！');
          });
      },
      getProfile () {
        axios.get('/profile', {
          params: {
            username: getStore('username')
          }
        }).then((res) => {
          this.profile = res.data;
        }).catch(e => {
          console.log(e);
        });
      },
      toggleToast (message) {
        Toast({
          message,
          position: 'bottom',
          duration: 3000
        });
      },
      goToDashboard (profile) {
        if (this.profile === {}) return;
        this.$router.push({path: '/main/dashboard', query: {data: JSON.stringify(this.profile)}});
        this.showNav = false;
      },
      goToSearch () {
        this.$router.push({path: '/main/search'});
      },
      viewCollection (data) {
        this.$router.push({path: '/main/collection', query: {data: JSON.stringify(data)}});
      },
      renewIndex (index, id) {
        this.selectedIndex = index;
        this.selectedId = id;
      }
    },
    created () {
      this.getProfile();
    },
    activated () {
      this.getCollections();
    },
    components: {
      navigation
    }
  };
</script>

<style>
  .confirm.mint-popup {
    width: 100%;
    background: none;
  }

  li {
    padding: 0.7em 0;
  }

  li > .avatar {
    border-radius: 50%;
    width: 75px;
  }

  .collection.mint-cell-swipe {
    margin-bottom: 10px;
    border-radius: 5px;
    -webkit-font-smoothing: antialiased;
    padding: 1px 0.5em;
    background-color: whitesmoke;
    border: 1px solid #333;
    color: #333;
  }

  .collection .mint-cell-wrapper {
    font-size: 16px;
    border: none;
    /*border-radius: 5px;*/
    /*box-shadow: 0 4px 16px 0 rgba(0,0,0,0.2), 0 4px 20px 0 rgba(0,0,0,0.19);*/
  }

  .el-container.main {
    position: fixed;
  }

  .el-main {
    height: 300px;
  }
</style>
