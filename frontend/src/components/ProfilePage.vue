<template>
  <el-row :gutter="10">
    <el-col :span="18">
      <el-input  v-model="email" placeholder="Email Address" />
    </el-col >
    <el-col :span="5">
      <el-button @click="getUser">Submit</el-button>
    </el-col>
  </el-row>
  <el-row :gutter="10">
    <el-col>
      <el-steps :active="active" finish-status="success">
        <el-step title="Step 1" />
        <el-step title="Step 2" />
        <el-step title="Step 3" />
      </el-steps>
    </el-col>
    <el-col v-if="active === 0">
    <el-row :gutter="10">
      <el-col>
        <h2>Hacker Profile 👨🏻‍💻</h2>
        <h3>Lets get to know you! </h3>
      </el-col >
      <el-col>
        <span>SiteMinder Email</span>
        <el-input></el-input>
      </el-col>
      <el-col>
        <p>First Name</p>
        <el-input></el-input>
      </el-col>
      <el-col>
        <p>Last Name</p>
        <el-input></el-input>
      </el-col>
      <el-col :span="12">
        <p>Department</p>
        <el-select v-model="value" placeholder="Department">
          <el-option
            :key="'Test'"
            :label="'Test'"
            :value="'Test'"
          />
        </el-select>
      </el-col>
      <el-col :span="12">
        <p>Location</p>
        <el-select v-model="value" placeholder="Location">
          <el-option
            :key="'Test'"
            :label="'Test'"
            :value="'Test'"
          />
        </el-select>
      </el-col>
    </el-row>

    </el-col>
    <el-button style="margin-top: 12px" @click="back">{{ active ? 'Back' : 'Cancel'}}</el-button>
    <el-button style="margin-top: 12px" @click="next" type="primary">Next step</el-button>
  </el-row>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "ProfilePage",
  props: {
    msg: String,
  },
  setup() {
    const active = ref(0)
    const email = ref()
    const getUser = () => {
      alert('check if user exists')
    }
    const next = () => {
      if (active.value++ > 2) active.value = 0
    }

    const back = () => {
      if (active.value-- === 0) alert('do something')
    }
    
    return {
      getUser,
      email,
      next,
      active,
      back
    }
  }
};
</script>

<style scoped>
.el-select {
  width: 100%;
}
</style>
