<template>
  <el-row v-loading.fullscreen.lock="loading || saving" :gutter="10" v-if="!hackerProfile">
    <el-col :span="18">
      <el-input  v-model="email" placeholder="Email Address" />
    </el-col >
    <el-col :span="5">
      <el-button :disabled="loading" @click="verifyHacker">Verify</el-button>
    </el-col>
  </el-row>
  <el-row :gutter="10" v-loading.fullscreen.lock="loading || saving" v-else>
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
          <el-input disabled v-model="hackerProfile.email"></el-input>
        </el-col>
        <el-col>
          <p>First Name</p>
          <el-input v-model="hackerProfile.firstName"></el-input>
        </el-col>
        <el-col>
          <p>Last Name</p>
          <el-input v-model="hackerProfile.lastName"></el-input>
        </el-col>
        <el-col :span="12">
          <p>Department</p>
          <el-select v-model="hackerProfile.department" placeholder="Department">
            <el-option v-for="department in departments"
              :key="department"
              :label="department"
              :value="department"
            />
          </el-select>
        </el-col>
        <el-col :span="12">
          <p>Location</p>
          <el-select v-model="hackerProfile.location" placeholder="Location">
            <el-option v-for="location in locations"
              :key="location"
              :label="location"
              :value="location"
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
          <el-checkbox v-model="hackerProfile.isFrontend" label="Frontend" />
        </el-col>
        <el-col>
          <el-checkbox v-model="hackerProfile.isBackend" label="Backend" />
        </el-col>
        <el-col>
          <el-checkbox v-model="hackerProfile.isQualityAnalyst" label="Quality Analyst" />
        </el-col>
        <el-col>
          <el-checkbox v-model="hackerProfile.isDesigner" label="Design" />
        </el-col>
        <el-col>
          <el-checkbox v-model="hackerProfile.isProduct" label="Product" />
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
            v-model="hackerProfile.isTeamLead"
            size="large"
            active-text="Yes"
            inactive-text="No"
          />
        </el-col>
        <el-col :span="12">
          <p>Are you senior level?</p>
          <el-switch
            v-model="hackerProfile.isSenior"
            size="large"
            active-text="Yes"
            inactive-text="No"
          />
        </el-col>
        <el-col>
          <p>How long have you been to SiteMinder?</p>
          <el-select v-model="hackerProfile.tenure" placeholder="">
            <el-option
              :key="0.5"
              :label="'Less than a year'"
              :value="0.5"
            />
            <el-option
              :key="1"
              :label="'1-2 years'"
              :value="1"
            />
            <el-option
              :key="2"
              :label="'2-4 years'"
              :value="2"
            />
            <el-option
              :key="5"
              :label="'5+ years'"
              :value="5"
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
import { useQuery, useMutation } from '@vue/apollo-composable'
import _ from 'lodash'
import { computed, ref } from 'vue';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { VERIFY_HACKER_QUERY, CREATE_USER_PROFILE_MUTATION, UPDATE_USER_PROFILE_MUTATION  } from './query.ts'

export default {
  name: "ProfilePage",
  props: {
    msg: String,
  },
  setup() {
    const router = useRouter()
    const email = ref(null)
    //@TODO CREATE API CALL TO GET THIS OPTIONS
    const departments = [
      'Analytics',
      'Application Services',
      'Architecture',
      'Business Operations',
      'CRM Operations',
      'Customer Success',
      'Exec Mgt',
      'Finance',
      'GDS',
      'Global Support',
      'Growth Operations',
      'HR',
      'iOPS',
      'ICT',
      'Legal',
      'Marketing',
      'Onboarding Success',
      'Partnerships',
      'Product',
      'Sales',
      'Security',
      'Shared Support Services',
      'Strategic Operations',
      'Tech',
    ]

    //@TODO CREATE API CALL TO GET THIS OPTIONS
    const locations = [
      'Sydney',
      'Manila'
    ]

    const {onResult: onResultVerifyHacker, loading, refetch: getVerifyHacker, onError} = useQuery(VERIFY_HACKER_QUERY, {
      enabled: !!email.value
    })

    const { mutate: createUserProfile, loading: creating } = useMutation(CREATE_USER_PROFILE_MUTATION, {
      variables: {},
    })

    const { mutate: updateUserProfile, loading: updating } = useMutation(UPDATE_USER_PROFILE_MUTATION, {
      variables: {},
    })

    const active = ref(0)
    let hackerProfile = ref(null)

    const next = async () => {
      if (active.value === 2) {
        const payload = {
          ...hackerProfile.value
        }

        delete payload.__typename
        try {
          if (+payload.id > 0) {
            await updateUserProfile({ input: payload, id: +payload.id})
          } else {
            await createUserProfile({ input: payload })
          }

          ElMessage({
            showClose: true,
            message: 'Successfully saved your hacker profile.',
            type: 'success',
          })
          router.push(`/`)
        } catch {
          ElMessage({
            showClose: true,
            message: 'Oops, something went wrong saving your hacker profile.',
            type: 'error',
          })
        }

      }

      active.value = active.value < 2 ? active.value + 1 : active.value
    }

    const back = () => {
      if (active.value-- === 0) {
        reset()
      }
    }

    const verifyHacker = async () => {
      getVerifyHacker({
        email: email.value,
        enabled: true
      })
    }

    onResultVerifyHacker((result) => {
      hackerProfile.value = _.cloneDeep(result?.data?.verifyHacker) || {}

    })

    onError(() => {
      if (!email.value) return

      ElMessage({
        showClose: true,
        message: 'Oops, something went wrong verifying your hacker profile.',
        type: 'error',
      })
    })

    const saving = computed(() => creating.value || updating.value)

    const reset = () => {
      hackerProfile.value = null
      email.value = null
      active.value = 0
    }
    
    return {
      email,
      next,
      active,
      back,
      hackerProfile,
      loading,
      verifyHacker,
      departments,
      locations,
      saving,
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
