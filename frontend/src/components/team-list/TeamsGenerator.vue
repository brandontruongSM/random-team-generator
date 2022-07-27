<template>
<!-- <div>
  <h1>TeamsGenerator page is here!</h1>
  <div v-for='user in users' :key="user.firstName">
    <p>{{user.firstName}}</p>
  </div>
</div> -->
<el-space direction="vertical" v-loading="loading">
    <el-card v-for="user in users" :key="user.email" class="box-card" style="width: 250px">
      <template #header>
        <div class="card-header">
          <span>Team</span>
        </div>
      </template>
      <!-- <div v-for="o in 4" :key="o" class="text item">
        {{ 'List item ' + o }}
      </div> -->
      <div><p>{{user.firstName}}</p><p>{{user.email}}</p></div>
    </el-card>
  </el-space>
</template>

<script>
import {useQuery} from '@vue/apollo-composable'
import { computed } from 'vue'
import {GET_USERS_QUERY} from './query.ts'


export default {
  name: "TeamsGenerator",
  props: {
    msg: String,
  },
  setup() {
    const {result, loading} = useQuery(GET_USERS_QUERY)
    const users = computed(()=>result.value?.getUsers)
    return {users, loading}
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
