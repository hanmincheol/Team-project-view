<script setup>
const selectedOption = ref({
  state: '건강을 위해서',
  value: '건강을 위해서',
})

const items = [
  {
    state: '건강을 위해서',
    value: '건강을 위해서',
  },
  {
    state: '살을 빼기 위해서',
    value: '살을 빼기 위해서',
  },
  {
    state: '살을 찌우기 위해서',
    value: '살을 찌우기 위해서',
  },
  {
    state: '근육을 키우기 위해서',
    value: '근육을 키우기 위해서',
  },
  {
    state: '벨런스 맞는 식단을 위해서',
    value: '벨런스 맞는 식단을 위해서',
  },
]
</script>

<template>
  <VSelect
    v-model="selectedOption"
    :hint="`${selectedOption.state}`"
    :items="items"
    item-title="state"
    item-value="abbr"
    label="Select"
    persistent-hint
    return-object
    single-line
  />
</template>
