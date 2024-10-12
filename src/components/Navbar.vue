<template>
  <nav class="navbar">
    <ul>
      <!-- SVG Icon for Notes -->
      <li>
        <router-link to="/" class="logo-link">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="note-icon">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m-6-8h6m-2-4H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V7l-4-4z" />
          </svg>
        </router-link>
      </li>
      <li v-if="user">
        <button @click="logout" class="logout-btn">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const user = auth.currentUser;

    const logout = async () => {
      try {
        await signOut(auth);
        router.push('/');
      } catch (error) {
        console.error("Error logging out: ", error);
      }
    };

    return { user, logout };
  }
};
</script>

<style scoped>
/* General Navbar Styles */
.navbar {
  background-color: var(--accent-color);
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar ul {
  list-style-type: none;
  width: 70%;
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
}

.navbar ul li {
  display: inline;
}

/* Link and Icon Styles */
.logo-link {
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
}

.note-icon {
  width: 40px;
  height: 40px;
  color: white;
}

.navbar ul li a:hover {
  text-decoration: underline;
}

/* Logout Button Styles */
.logout-btn {
  color: black;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  border: 2px solid var(--accent-color);
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: var(--bg-color);
}

/* Mobile Styles */
@media (max-width: 600px) {
  .navbar ul {
    flex-direction: column;
    gap: 1rem;
  }

  .note-icon {
    width: 30px;
    height: 30px;
  }

  .logout-btn {
    font-size: 0.9rem;
    padding: 8px 14px;
  }
}
</style>
