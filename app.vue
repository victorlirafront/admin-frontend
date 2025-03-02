<script setup>
import AppFooter from "./src/components/footer/AppFooter.vue"
import AppHeader from "./src/components/header/AppHeader.vue"
import 'toastify-js/src/toastify.css';
</script>


<template>
  <div>
    <AppHeader/>
    <NuxtPage />
    <AppFooter/>
  </div>
</template>

<style src="~/src/assets/style.css"></style>