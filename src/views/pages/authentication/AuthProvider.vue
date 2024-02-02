<script setup>
import { useTheme } from 'vuetify'

const { global } = useTheme()

const authProviders = [
  {
    icon: 'mdi-facebook',
    color: '#4267B2',
    colorInDark: '#4267B2',
    url: 'https://www.facebook.com/',
  },
  {
    icon: 'mdi-twitter',
    color: '#1DA1F2',
    colorInDark: '#1DA1F2',
    url: 'https://twitter.com/',
  },
  {
    icon: 'mdi-github',
    color: '#272727',
    colorInDark: '#fff',
    url: 'https://github.com/',
  },
  {
    icon: 'mdi-google',
    color: '#DB4437',
    colorInDark: '#DB4437',
    url: 'http://localhost:4000/oauth2/authorization/google',
  },
]
</script>

<template>
  <VBtn
    v-for="link in authProviders"
    :key="link.icon"
    :icon="link.icon"
    :href="link.url"
    variant="text"
    :color="global.name.value === 'dark' ? link.colorInDark : link.color"
  />
</template>
