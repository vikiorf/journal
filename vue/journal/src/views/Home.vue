<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <side-bar />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import SideBar from '@/components/SideBar.vue'


export default {
  name: "Home",
  components: {
    HelloWorld,
    SideBar
  }
};
</script>

<style scoped>
  .home {
    /* grid-area: 1 / 1 / 13 / 13;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px; */
  }
</style>
