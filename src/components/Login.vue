<template>
    <div class="wrapper">
        <h1>Login</h1>
        <p v-if="error" id="error-message" style="color: red;">{{ error }}</p>
        <form id="form" @submit.prevent="loginUser">
            <div>
                <label for="email-input">
                    <span>@</span>
                </label>
                <input type="email" name="email" id="email-input" placeholder="Email" v-model="email">
            </div>
            <div>
                <label for="password-input">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path
                            d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z" />
                    </svg>
                </label>
                <input type="password" name="password" id="password-input" placeholder="Password" v-model="password">
            </div>

            <button type="submit">Login</button>
        </form>
        <p>New here? <a @click="toggle">Create an Account</a></p>
    </div>
</template>

<script>
import userLogin from '@/composables/userLogin';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup(props, {emit}) {
        let router = useRouter();
        let email = ref("");
        let password = ref("");
        let { error, login } = userLogin();
        let toggle = () => {
            emit("toggle");
        }

        let loginUser = async() =>{
          await login(email.value, password.value);
          router.push('/note');
        }
        return { toggle, email, password, error , loginUser}
  }
}
</script>

<style></style>