<template>
  <v-layout
    class="h-screen"
  >
    <v-app-bar
      elevation="1"
    >
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Ó o Gás</v-toolbar-title>
      <v-spacer />
      <v-btn
        @click="theme.toggle()"
        :icon="theme.current.value.dark ? 'mdi-weather-night' : 'mdi-white-balance-sunny'"
      />
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
    >
      <v-list-item title="Vendas" to="/" />
      <v-list-item title="Vendedores" to="/vendedores" />
    </v-navigation-drawer>
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
const theme = useTheme()
const drawer = ref(false)
</script>

<style>
body, html, #__nuxt {
  overflow: hidden;
}
</style>