<template>
  <section>
    <transition name="slide">
      <ul v-show="value">
        <slot></slot>
      </ul>
    </transition>
    <transition name="fade">
      <div class="mask" v-show="value" @click="hide"></div>
    </transition>
  </section>
</template>

<script>
  export default {
    props: ['value'],
    data () {
      return {};
    },
    methods: {
      hide () {
        this.$emit('input', false);
      }
    }
  };
</script>

<style scoped>
  .slide-enter {
    transform: translateX(-200px);
  }
  .slide-enter-active {
    transition: .5s ease;
  }
  .slide-leave-active {
    transition: .5s ease;
    transform: translateX(-200px);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */
  {
    opacity: 0
  }

  ul {
    position: fixed;
    top: 0;
    margin-top: 0;
    margin-left: -10px;
    background-color: #333;
    box-shadow: 2px 0 2px #000;
    width: 150px;
    height: 100%;
    z-index: 1001;
    list-style-type: none;
    padding: 20px 0 0 0;
    color: whitesmoke;
    font-size: 20px;
  }

  li {
    padding: 1em !important;
  }

  .mask {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1000;
  }
</style>
