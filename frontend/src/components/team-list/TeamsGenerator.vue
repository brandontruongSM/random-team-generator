<template>
  <h1>TeamsGenerator page is here!</h1>
</template>

<script>
import {useQuery} from '@vue/apollo-composable'
import gql from 'graphql-tag'
const GET_USERS_QUERY = gql`
query getUsers {
    getUsers {
      firstName
      email
    }
  }
`

export default {
  name: "TeamsGenerator",
  props: {
    msg: String,
  },
  setup() {
    const {result} = useQuery(GET_USERS_QUERY)
    console.log("ssssss ~ result", result)
    return result
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
