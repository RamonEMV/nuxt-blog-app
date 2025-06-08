<script setup lang="ts">
import { addSeconds } from 'date-fns'
const state = reactive({
  email: '',
  password: ''
})

const authCookie = useCookie('auth', { httpOnly: true, expires: addSeconds(new Date(), 3600) })
const onSubmit = async (e: any) => {
  console.log(e)
  const res = await $fetch('/api/auth/login', { method: 'POST', body: state })
  console.log(res)
  if (res.id) {
    console.log(authCookie)
    authCookie.value = 'true'
  }

}
</script>

<template>
  <UForm :state="state" class="space-y-4" @submit="onSubmit">
    {{ authCookie || 'asd' }}
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormField>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>
