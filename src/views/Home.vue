<template>
    <Login v-if="isLogin" @toggle="toggle"></Login>
    <SignUp v-if="!isLogin" @toggle="toggle"></SignUp>
</template>

<script>

import { ref } from 'vue';
import Login from '@/components/Login.vue';
import SignUp from '@/components/SignUp.vue';
export default {
  components: {
    Login, SignUp
  },
  setup() {
    let isLogin = ref(false);
    let toggle = () => {
      isLogin.value = !isLogin.value;
    }
    return { isLogin , toggle }
  }
}
</script>

<style>

</style>