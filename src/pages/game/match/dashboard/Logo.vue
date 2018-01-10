<template>
  <h1 class="logo">Match</h1>
</template>

<script>
  export default {};
</script>

<style scoped>
  .logo {
    width: 100px;
    line-height: 90px;
    margin: 0;
    padding: 5px;
    border-radius: 5px;
    background-color: #5979ac;
    color: #fff;
    text-align: center;
  }

  a {
    text-decoration: none;
    color: #fff;
  }

  @media screen and (max-width: 450px) {
    .logo {
      width: 120px;
    }
  }

  @media screen and (max-width: 380px) {
    .logo {
      width: 100px;
    }
  }

  @media screen and (max-width: 360px) {
    .logo {
      width: 80px;
    }

    a {
      font-size: 16px;
    }
  }
</style>
