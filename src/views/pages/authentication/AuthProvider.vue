<script setup>
import { useTheme } from 'vuetify'

const { global } = useTheme()

const authProviders = [
  {
    icon: 'mdi-facebook',
    color: '#4267b2',
    colorInDark: '#4267b2',
    url:'https://www.facebook.com/',
  },
  {
    icon: 'mdi-twitter',
    color: '#1da1f2',
    colorInDark: '#1da1f2',
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
    color: '#db4437',
    colorInDark: '#db4437',
    url: 'https://www.google.com/',
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
