<template>
<el-space wrap fill style="display: flex">

  <el-row :gutter="20">
    <el-col :span="12"
      ><div class="scrollbar-demo-item"><h2>There are {{teamCounts}} teams registered</h2></div></el-col>
    <el-col :span="12"
      ><div class="scrollbar-demo-item"><h2>There are {{hackerCounts}} hackers registered</h2></div></el-col>
    <el-col :span="6  ">
      <div class="scrollbar-demo-item">
        <h2>Participating Departments</h2>
        <span class="department" v-for="department in registeredDepartments" :key="department">
          {{ department }}
        </span>
      </div>
    </el-col>
  </el-row>

</el-space>
</template>

<script>
import {useQuery} from '@vue/apollo-composable'
import { computed } from 'vue'
import _ from 'lodash'
import {GET_Teams_QUERY} from '../team-list/query.ts'
import { GET_USERS_QUERY } from './query.ts';


export default {
  name: "DashboardPage",
  props: {
  },
  setup() {
    const { result } = useQuery(GET_Teams_QUERY, { refresh: false })
    const { result: usersResult } = useQuery(GET_USERS_QUERY)
    const teams = computed(()=>result.value?.getTeams)
    const teamCounts = computed(()=>teams.value?.length ?? 0)
    const hackers = computed(() => usersResult.value?.getUsers || [])
    const hackerCounts = computed(() => hackers.value?.length ?? 0)
    const registeredDepartments = computed(() => _.uniq(hackers.value?.map(hacker => hacker.department)))
    
    return { teamCounts, hackerCounts, hackers, registeredDepartments }
  }
};

</script>

<style>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  flex-direction: column;
}

.department {
  font-weight: bold;
  font-size: 20px;
}
</style>