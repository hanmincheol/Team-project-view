
<script setup>
const checkbox = ref(false)

</script>

<template>
  <VCheckbox v-model="checkbox">
    <template #label>
      <div>
        이용약관에 동의합니다.
      </div>
    </template>
  </VCheckbox>
</template>





