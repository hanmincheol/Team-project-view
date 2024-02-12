<script setup>
const props = defineProps({
  selectedCheckbox: {
    type: Array,
    required: true,
  },
  checkboxContent: {
    type: Array,
    required: true,
  },
  gridColumn: {
    type: null,
    required: false,
  },
})

const emit = defineEmits(['update:selectedCheckbox'])

const selectedOption = ref(structuredClone(toRaw(props.selectedCheckbox)))

watch(selectedOption, () => {
  emit('update:selectedCheckbox', selectedOption.value)
})

const hateFoodchk = ref([])

const checkval = (item) => {
  console.log('값:', item.value, '이름:', item.name);
  if (!hateFoodchk.value.includes(item.name)) {
    hateFoodchk.value.push({ [item.value]: item.name });
  } else {
    const index = hateFoodchk.value.findIndex((element) => element[item.value] === item.name);
    if (index !== -1) {
      hateFoodchk.value.splice(index, 1);
    }
  }
  hateFoodchk.value.sort((a, b) => {
    const valueA = Object.keys(a)[0];
    const valueB = Object.keys(b)[0];
    return valueA - valueB;
  });
  console.log('현재', hateFoodchk.value);
  sendHateFoodList(hateFoodchk);
};

const sendHateFoodList = (val) => {
  emit('HateFoodList', val)
}
</script>

<template>
  <VRow
    v-if="props.checkboxContent && selectedOption"
    v-model="selectedOption"
  >
    <VCol
      v-for="item in props.checkboxContent"
      :key="item.value"
      v-bind="gridColumn"
    >
      <VLabel
        class="custom-input custom-checkbox rounded cursor-pointer w-100"
        :class="selectedOption.includes(item.value) ? 'active' : ''"
      >
        <div>
          <VCheckbox
            v-model="selectedOption"
            :value="item.value"
            @click="checkval(item)"
          />

        </div>
        <img
          :src="item.bgImage"
          alt="bg-img"
          class="custom-checkbox-image"
        >
        <img
          src="src/assets/images/icons/heart_icon.png"
          alt="heart-icon"
          class="heart-icon"
        > <!-- 하트 아이콘 이미지 -->
      </VLabel>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
.custom-checkbox {
  position: relative;
  padding: 0;
  border-width: 2px;
  transition: all 0.5s;

  .custom-checkbox-image {
    block-size: 100%;
    inline-size: 100%;
    min-inline-size: 100%;
  }

  .v-checkbox {
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    visibility: hidden;
  }

  .heart-icon {
    position: absolute;
    z-index: 1; /* 이미지의 층위를 조정 */
    inset-block-start: 50%;
    inset-inline-start: 50%;
    opacity: 0; /* 초기에 투명하게 설정 */
    transform: translate(-50%, -50%);
    transition: opacity 0.5s ease-in-out; /* 효과를 주기 위한 애니메이션 설정 */
  }

  &.active .heart-icon {
    opacity: 1; /* 액티브 상태에서 나타나도록 설정 */
  }
}
</style>

