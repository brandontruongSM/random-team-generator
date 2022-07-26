<template>
  <!-- route outlet -->
  <!-- component matched by the route will render here -->
  <el-container>
    <el-aside width="200px">
      <p>
        <!-- use the router-link component for navigation. -->
        <!-- specify the link by passing the `to` prop. -->
        <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
        <router-link to="/">Teams</router-link>
        <router-link to="/profile">Profile</router-link>
      </p>
    </el-aside>
    <el-container>
      <!-- <el-header>Header</el-header> -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
  display: flex
}
</style>
