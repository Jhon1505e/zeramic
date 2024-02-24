<template>
  <div>
    <NavBar />
    <NuxtPage class="pt-20" />
    
    <div v-if="$route.path !== '/'">
      <Footer />
    </div>
  </div>
</template>
