<script setup lang="ts">
import { Prisma } from '@prisma/client'
const route = useRoute()
definePageMeta({
  middleware: 'auth',
})

const userQuery = await useFetch<Prisma.UserSelect>('/api/users/' + route.params.id)
</script>

<template>
  <h2>{{ userQuery.data.value?.name || '--' }}</h2>
  <h3>{{ userQuery.data.value?.email || '--' }}</h3>
  Profile {{ route.params.id }} {{ userQuery.data.value?.email }}
  <ul v-for="post in userQuery.data.value?.posts">
    <li>{{ post.title }}</li>
  </ul>
</template>
