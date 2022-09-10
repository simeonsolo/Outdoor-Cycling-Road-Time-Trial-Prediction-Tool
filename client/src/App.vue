<template>
  <!-- <HelloWorld msg="Welcome to AusCycling" /> -->
  <SideBar />
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import SideBar from "./components/SideBar.vue";

export default {
  name: "app",
  components: {
    // HelloWorld,
    SideBar,
  },
};
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  box-sizing: border-box;
}
</style>

<!-- Global style insert here, feel free to delete/test them out as they have nice fonts -->
<!-- <style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> -->
