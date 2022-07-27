<template>
<el-space wrap fill v-loading="loading" style="display: flex">
    <el-button type="primary" round @click="refetch" style="max-width: 80px" :loading="loading">Re-shuffle</el-button>
    <el-card v-for="team in teams" :key="team.name" class="box-card" >
      <template #header>
        <div class="card-header">
          <span>{{team.name}}</span>
          <span>Team ID: {{team.id}}</span>
        </div>
      </template>
      <el-collapse v-for="(user, index) in team.users" :key="user.email">
      <el-collapse-item :name="index +1 ">
        <template v-if="user.isTeamLead" #title>
          {{user.firstName}}<el-icon><UserFilled /></el-icon>
        </template>
        <template v-else #title>
          {{user.firstName}}
        </template>
        <el-descriptions
    class="margin-top"
    :column="3"
    border
  >
  <el-descriptions-item label="Photo" width="150px" label-align="left" align="center" span="1"><el-avatar :src="imageUrl"/></el-descriptions-item>
  <el-descriptions-item label="User first name" width="150px" label-align="left" align="center" span="1">{{user.firstName}}</el-descriptions-item>
  <el-descriptions-item label="User last name" width="150px" label-align="left" align="center" span="1"> {{user.lastName}}</el-descriptions-item>
  <el-descriptions-item label="Email" width="150px" label-align="left" align="center" span="1">{{user.email}}</el-descriptions-item>
  <el-descriptions-item label="Role" width="150px" label-align="left" align="center" span="1">Developer</el-descriptions-item>
  <el-descriptions-item label="Hacker ID" width="150px" label-align="left" align="center" span="1">{{user.id}}</el-descriptions-item>
  
  </el-descriptions>
      </el-collapse-item>
      
      
    </el-collapse>
    </el-card>
  </el-space>
</template>

<script>
import {useQuery} from '@vue/apollo-composable'
import { computed } from 'vue'
import {GET_Teams_QUERY} from './query.ts'
import { UserFilled } from '@element-plus/icons-vue'

export default {
  name: "TeamsGenerator",
  props: {
  },
  setup() {
    const useGetTeams = () => {
      const {result, loading, refetch } = useQuery(GET_Teams_QUERY)
      const teams = computed(()=>result.value?.getTeams)
      const members = computed(()=>result.value?.getTeams?.users)
      return { teams, members, loading, refetch}
    }
    
    const { teams, members, loading, refetch} = useGetTeams()
    const imageUrl= 'https://images4.bamboohr.com/63453/photos/2520-0-4.jpg?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9pbWFnZXM0LmJhbWJvb2hyLmNvbS82MzQ1My8qIiwiQ29uZGl0aW9uIjp7IkRhdGVHcmVhdGVyVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjU4ODg0Nzg2fSwiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2NjE0NzY3OTZ9fX1dfQ__&Signature=LpIXKyA~eP8wTthQy7cdNT7pYb-bMCqAB8aXbHEz47c36junSjQieeDXwNWvkPVytZfr9gTk70duWMWGRxiIrCSplShyB5ZQPKOrdRhs0sFjc0Yyco5kBW5lIZ-TRLHFDZegQomwfahH77xASybFHiah9QsLSFsaOXZiB5w84u2aPpB2WUeV1HhV7BpBsmQTd9EvuLqE9Er26cWGvvYKeYo6MmIp5Gmnd6eYp33BPfbm3ucQH2NYgPJte87cV~fu15-A5knjJB52E~nILJUmZyBZ-B0rRmYDBKUf-LIxdzmMla8MghGdmP3offMD7Qf9a~H4THinQllFYC~N9s~kDA__&Key-Pair-Id=APKAIZ7QQNDH4DJY7K4Q'
    return { teams, loading, refetch, UserFilled, imageUrl, members}
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>
