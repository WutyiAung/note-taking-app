<template>
  <router-view />
</template>

<script>

export default{

}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

:root {
  --accent-color: #8672FF;
  --base-color: white;
  --text-color: #2E2B41;
  --input-color: #F3F0FF;
}

* {
  margin: 0;
  padding: 0;
}

html {
  font-family: 'Poppins', sans-serif;
  font-size: 12pt;
  color: var(--text-color);
  text-align: center;
}

body {
  min-height: 100vh;
}

@media (max-width: 600px) {
  h1 {
    font-size: 1.5rem;
  }
}
</style>
