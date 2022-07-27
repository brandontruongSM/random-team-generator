<template>
<el-space wrap fill style="display: flex">

  <el-row :gutter="20">
    <el-col :span="12"
      ><div class="scrollbar-demo-item"><h2>There are {{teamCounts}} teams registered</h2></div></el-col>
    <el-col :span="12"
      ><div class="scrollbar-demo-item"><h2>There are {{hackerCounts}} hackers registered</h2></div></el-col>
  </el-row>

</el-space>
</template>

<script>
import {useQuery} from '@vue/apollo-composable'
import { computed } from 'vue'
import {GET_Teams_QUERY} from '../team-list/query.ts'


export default {
  name: "DashboardPage",
  props: {
  },
  setup() {
    const { result } = useQuery(GET_Teams_QUERY)
    const teams = computed(()=>result.value?.getTeams)
    const teamCounts = computed(()=>teams.value?.length)
    const hackerCounts = 200
    return { teamCounts, hackerCounts}
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
}
</style>