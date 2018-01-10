<template>
  <section>
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="in-out">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </section>
</template>

<script>
  import axios from 'axios';
  import { getStore } from '../../config/mUtils';
  export default {
    created () {
      axios.defaults.headers['Authorization'] = 'Bearer ' + getStore('token');
    }
  };
</script>

<style>
  /*客制化mint*/
  .mint-header {
    background-color: #333 !important;
    color: whitesmoke !important;
  }
  .router-fade-leave-active {
  }
  .router-fade-enter {
    transform: translateX(400px);
  }
  .router-fade-enter-active {
    transition: .5s ease;
  }

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

  .el-container.main {
    position: fixed;
  }

  .el-main {
    height: 300px;
  }
</style>
