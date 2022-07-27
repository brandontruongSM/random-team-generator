<template>
  <el-row :gutter="10">
    <el-col :span="18">
      <el-input  v-model="email" placeholder="Email Address" />
    </el-col >
    <el-col :span="5">
      <el-button @click="getUser">Verify</el-button>
    </el-col>
  </el-row>
  <el-row :gutter="10" v-if="hackerProfile">
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
    <el-col v-if="active === 1">
      <el-row :gutter="10">
        <el-col>
          <h2>Hacker skillz 🛠️</h2>
          <h3>What would you like to hack? (doesn't have to be what you're hired for!)</h3>
        </el-col >
        <el-col>
          <span>Interests</span>
        </el-col>
        <el-col>
          <el-checkbox-group :max="1">
            <el-checkbox label="Frontend" />
            <el-checkbox label="Backend" />
            <el-checkbox label="Design" />
            <el-checkbox label="Product" />
          </el-checkbox-group>
        </el-col>
      </el-row>
    </el-col>
    <el-col v-if="active === 2">
      <el-row :gutter="10">
        <el-col>
          <h2>Hacker Team Profile 🤝</h2>
          <h3>Lets find you a team</h3>
        </el-col >
        <el-col :span="12">
          <p>Would you like to lead a team?</p>
          <el-switch
            size="large"
            active-text="Yes"
            inactive-text="No"
          />
        </el-col>
        <el-col :span="12">
          <p>Are you senior level?</p>
          <el-switch
            size="large"
            active-text="Yes"
            inactive-text="No"
          />
        </el-col>
        <el-col>
          <p>How long have you been to SiteMinder?</p>
          <el-select v-model="value" placeholder="">
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
    <el-button style="margin-top: 12px" @click="next" type="primary">{{ active === 2 ? 'Submit' : 'Next'}}</el-button>
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
    const hackerProfile = ref(null)
    const getUser = () => {
      alert('check if user exists')
    }
    const next = () => {
      if (active.value++ < 2) return

      // do something submit the data
    }

    const back = () => {
      if (active.value-- === 0) alert('do something')
    }
    
    return {
      getUser,
      email,
      next,
      active,
      back,
      hackerProfile
    }
  }
};
</script>

<style scoped>
.el-select {
  width: 100%;
}

.el-checkbox-group {
  display: flex;
  flex-direction: column;
}
</style>
