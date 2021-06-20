<template>
  <div id="inspire">

    <core-toolbar />

    <core-drawer />
        
    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>
  </div>
</template>

<script>
  export default {
    components: {
    
    }
  }
</script>
