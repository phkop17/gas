<template>
  <v-layout
    class="h-screen"
  >
    <v-main
      class="d-flex"
    >
      <v-container
        fluid
        class="overflow-y-auto"
      >
        <!-- <v-slide-x-transition hide-on-leave> -->
          <slot />
        <!-- </v-slide-x-transition> -->
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
</script>

<style>
body, html, #__nuxt {
  overflow: hidden;
}
</style>