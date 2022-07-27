<template>
  <!-- route outlet -->
  <!-- component matched by the route will render here -->
  <el-container>
    <el-container>
      <el-header><el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
  >
    <el-menu-item index="1"><router-link class="a-link" to="/">Dashboard</router-link></el-menu-item>
    <el-menu-item index="2"><router-link class="a-link" to="/teams">Teams List</router-link></el-menu-item>
    <el-menu-item index="3"><router-link class="a-link" to="/profile">Hacker Profile</router-link></el-menu-item>
    
  </el-menu></el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { ref } from 'vue'

export default {
  name: "App",
  components: {},
  setup() {
    const activeIndex = ref('1')
    return { activeIndex }
  }
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
  display: flex;
  margin-left:100px;
  margin-right: 100px;
}
.a-link {
  text-decoration: none;
}
</style>
