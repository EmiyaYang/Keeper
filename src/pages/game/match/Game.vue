<template>
  <div class="game-panel">
    <mt-header title="配对">
      <router-link to="/main" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <!-- 组装三个部分组件 -->
    <Dashboard></Dashboard>
    <Chessboard></Chessboard>
    <Status></Status>
  </div>
</template>

<script>
  import Dashboard from './dashboard/Dashboard';
  import Chessboard from './card/Chessboard';
  import Status from './footer/PlayStatus';

  import { mapActions } from 'vuex';
  import { STATUS } from '../../../store/statusEnum';

  export default {
    methods: {
      ...mapActions([
        'updateStatus',
        'reset'
      ])
    },
    created () {
      this.updateStatus(STATUS.READY);
      this.reset();
    },
    components: {Dashboard, Chessboard, Status}
  };
</script>

<style scoped>
  .game-panel {
    width: 100%;
    height: 100%;
    background-color: #faf8ef;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    position: fixed;
    flex-direction: column;
  }
</style>
