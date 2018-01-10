<template>
  <div class="status-bar">
    <Logo></Logo>
    <Match-info></Match-info>
    <Score></Score>
  </div>
</template>

<script>
  import Logo from './Logo';
  import MatchInfo from './MatchInfo';
  import Score from './Score';

  export default {
    components: {Logo, MatchInfo, Score}
  };
</script>

<style scoped>
  .status-bar {
    width: 100%;
    padding: 10px 0;
    display: flex;
    justify-content: space-around;
    align-items: stretch;
  }
</style>
