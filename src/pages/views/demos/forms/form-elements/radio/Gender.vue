<script setup>
import { ref } from 'vue'

const selectedRadio = ref('')

const colorsRadio = [
  { value: 'Info', gender: '남자' },
  { value: 'Warning', gender: '여자' },
]
</script>

<template>
  <VRadioGroup
    v-model="selectedRadio"
    inline
  >
    <div>
      <VRadio
        v-for="radio in colorsRadio"
        :key="radio.value"
        v-model="selectedRadio"
        :label="radio.gender"
        :color="radio.value.toLocaleLowerCase()"
        :value="radio.value.toLocaleLowerCase()"
      />
    </div>
  </VRadioGroup>
</template>
