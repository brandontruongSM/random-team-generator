<template>
<el-space wrap fill  v-loading="loading" style="display: flex">
    <el-button type="primary" round @click="refetch({refresh: true})" style="max-width: 80px" :loading="loading">Re-shuffle</el-button>
    <el-card v-for="team in teams" :key="team.name" class="box-card" >
      <template #header>
        <div class="card-header">
          <span>{{team.name}}</span>
        </div>
      </template>
      <el-collapse v-for="(user, index) in team.users" :key="user.email">
      <el-collapse-item :name="index +1 ">
        <template v-if="user.isCaptain" #title>
          {{user.firstName}}<el-icon><UserFilled /></el-icon>
        </template>
        <template v-else #title>
          {{user.firstName}}
        </template>

 <el-row :gutter="10">
    <el-col :span="4"><img
          :src="user.profilePic"
          class="image"
        /></el-col>
    <el-col :span="20"><el-descriptions
    class="margin-top"
    :column="3"
    border
  >
  <el-descriptions-item label="User first name" width="150px" label-align="left" align="center" span="1">{{user.firstName}}</el-descriptions-item>
  <el-descriptions-item label="User last name" width="150px" label-align="left" align="center" span="1"> {{user.lastName}}</el-descriptions-item>
  <el-descriptions-item label="Email" width="150px" label-align="left" align="center" span="1">{{user.email}}</el-descriptions-item>
  <el-descriptions-item label="Role" width="150px" label-align="left" align="center" span="1">{{user.role}}</el-descriptions-item>
  <el-descriptions-item label="Hacker ID" width="150px" label-align="left" align="center" span="0">{{user.id}}</el-descriptions-item>
  
  </el-descriptions></el-col>
  </el-row>



        

  

      </el-collapse-item>
      
      
    </el-collapse>
    </el-card>
  </el-space>
</template>

<script>
import {useQuery} from '@vue/apollo-composable'
import { ref, watch, } from 'vue'
import {GET_Teams_QUERY} from './query.ts'
import { UserFilled } from '@element-plus/icons-vue'

export default {
  name: "TeamsGenerator",
  props: {
  },
  setup() {
    // const useGetTeams = () => {
    //   const hackerteams = ref([])
    //   const { loading, refetch, onResult } = useQuery(GET_Teams_QUERY, { refresh: false })
    //   onResult((result)=>{
    //     hackerteams.value = result.data.getTeams
    //   })

    //   return { hackerteams, loading, refetch}
    // }
     const hackerteams = ref([])
      const { loading, refetch, onResult } = useQuery(GET_Teams_QUERY, { refresh: false }, { fetchPolicy: 'network-only' })
      onResult((result)=>{
        hackerteams.value = result.data.getTeams
      })


    // const { hackerteams, loading, refetch} = useGetTeams()
    console.log("ssssss ~ hackerteams", hackerteams)

    const teams = ref([])
    watch(hackerteams, () => {
  
    teams.value = hackerteams.value.map(team => {
      const users = team?.users.map(user => {
            if (user.isFrontend) {
              return {...user, role: 'Frontend developer', isCaptain: user.id === team.captainId }
            }
            if (user.isBackend) {
              return {...user, role: 'Backend developer', isCaptain: user.id === team.captainId}
            }
            if (user.isDesigner) {
              return {...user, role: 'Designer', isCaptain: user.id === team.captainId}
            }
            if (user.isProduct) {
              return {...user, role: 'Product owner', isCaptain: user.id === team.captainId}
            }
            if (user.isQualityAnalyst) {
              return {...user, role: 'Quality analyst', isCaptain: user.id === team.captainId}
            } 
            return  {...user, role: 'Team lead', isCaptain: user.id === team.captainId}
      })
      return {
        ...team,
        users
      }
    })
  })
    console.log('ssssss', teams)

    return { teams, loading, refetch, UserFilled}
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
