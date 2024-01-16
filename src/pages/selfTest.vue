<script setup>
const userTab = ref(null)

const allergy  = [
  {
    icon: 'mdi-account-outline',
    title: '항목에',
    value: 1,
  },
  {
    icon: 'mdi-lock-outline',
    title: '원하는',
  },
  {
    icon: 'mdi-bookmark-outline',
    title: '제목',
  },
  {
    icon: 'mdi-bell-outline',
    title: '정해서',
  },
  {
    icon: 'mdi-link-variant',
    title: '넣기',
  },
]
</script>

<template>
  <CustomRadios
    v-model:selected-radio="checkoutAddressDataLocal.deliveryAddress"
    :radio-content="checkoutAddressDataLocal.addresses"
    :grid-column="{ cols: '12', sm: '6' }"
  >
    sad
  </CustomRadios>
</template>

<style lang="scss">
  @use "@core/scss/template/libs/apex-chart.scss";
</style>
