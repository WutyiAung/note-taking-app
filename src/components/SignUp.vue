<template>

  <div class="wrapper">
    <h1>Signup</h1>
    <p v-if="error" id="error-message" style="color: red;">{{ error }}</p>
    <p id="error-message"></p>
    <form id="form" @submit.prevent="signUp">
       <div>
            <label for="firstname-input">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/></svg>
            </label>
            <input type="text" name="firstname" id="firstname-input" placeholder="Name" v-model="displayName">
       </div>
       <div>
            <label for="email-input">
                <span>@</span>
            </label>
            <input type="email" name="email" id="email-input" placeholder="Email" v-model="email">
       </div>
       <div>
            <label for="password-input">
                 <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z"/></svg>
            </label>
            <input type="password" name="password" id="password-input" placeholder="Password" v-model="password">
       </div>
       <button type="submit">Signup</button>
    </form>

    <p>Already have an Account ?<a @click="toggle">login</a> </p>
  </div>


</template>

<script>

import { ref } from 'vue';
import userSignup from '@/composables/userSignup';
export default {
 setup(props, {emit}){
  let email = ref("");
  let password = ref("");
  let displayName = ref("");

  let {error, signup } = userSignup();
  let toggle = () => {
    emit("toggle");
  }

  let signUp = async() => {
    error.value = '';
    await signup(email.value, password.value, displayName.value);
  }


  return { toggle, signUp, error ,email, password, displayName }
  
 }
}
</script>

<style>
.wrapper {
  background-color: var(--base-color);
  height: 100vh;
  max-width: 600px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem auto;
  border-radius: 0 20px 20px 0; /* Uncomment if desired */
}

h1 {
  font-size: 2.5rem;
  font-weight: 900;
  text-transform: uppercase;
}

form {
  margin-top: 20px;
  width: 100%; /* Set to 100% to make it responsive */
  max-width: 400px; /* Limit max width for better appearance */
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

form > div {
  width: 100%;
  display: flex;
  justify-content: center;
}

form label {
  flex-shrink: 0;
  height: 50px;
  width: 50px;
  background-color: var(--accent-color);
  fill: var(--base-color);
  color: var(--base-color);
  border-radius: 10px 0 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 500;
}

form input {
  box-sizing: border-box;
  flex-grow: 1;
  min-width: 0;
  height: 50px;
  padding: 1em;
  font: inherit;
  border-radius: 0 10px 10px 0;
  border: 2px solid var(--input-color);
  border-left: none;
  background-color: var(--input-color);
  transition: 150ms ease;
}

form input:hover {
  border-color: var(--accent-color);
}

form input:focus {
  outline: none;
  border-color: var(--text-color);
}

div:has(input:focus) > label {
  background-color: var(--text-color);
}

form input::placeholder {
  color: var(--text-color);
}

form button {
  margin-top: 10px;
  border: none;
  border-radius: 1000px;
  padding: .85em 4em;
  background-color: var(--accent-color);
  color: var(--base-color);
  font: inherit;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: 150ms ease;
}

form button:hover {
  background-color: var(--text-color);
}

form button:focus {
  outline: none;
  background-color: var(--text-color);
}
p{
  margin-top: 1rem;
}

a {
  text-decoration: none;
  color: var(--accent-color);
  cursor: pointer;
}

a:hover {
  text-decoration: underline;
}

/* Responsive Styles */
@media (max-width: 1100px) {
  .wrapper {
      width: 90%; /* Adjust width for mid-size screens */
      max-width: 600px; /* Keep max width */
      border-radius: 0; /* Optional: Remove border-radius on smaller screens */
  }
}

@media (max-width: 600px) {
  .wrapper {
      padding: 5px;
      max-width: 100%;
      height: auto; /* Allow height to adjust based on content */
  }

  h1 {
      font-size: 2rem; /* Slightly smaller font size */
  }

  form {
      width: 90%; /* Full width for mobile */
      gap: 8px; /* Smaller gap between elements */
  }

  form input {
      height: 40px; /* Adjust input height */
      padding: 0.75em; /* Adjust padding */
  }

  form label {
      height: 40px; /* Adjust label height */
      width: 40px; /* Adjust label width */
      font-size: 1.2em; /* Slightly smaller icon */
  }

  form button {
      padding: .75em 3em; /* Adjust button padding */
  }
}

</style>