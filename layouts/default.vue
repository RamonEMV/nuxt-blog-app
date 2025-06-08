<script setup lang="ts">
import type { NuxtLink } from '#components';

const store = userStore()
const profileRoute = "/profiles/" + store.user?.id
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-row gap-2 m-2">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/login">Login</NuxtLink>
      <NuxtLink v-bind:to="profileRoute">Profile</NuxtLink>
      <NuxtLink to="/signup">Signup</NuxtLink>
    </div>
    <div class="p-4">
      <slot />
    </div>
  </div>

</template>
