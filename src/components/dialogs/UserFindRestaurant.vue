<script setup>
const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:isDialogVisible'])
</script>

<template>
  <!-- 👉 upgrade plan -->
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 650"
    :model-value="props.isDialogVisible"
    @update:model-value="val => $emit('update:isDialogVisible', val)"
  >
    <VCard class="py-8">
      <!-- 👉 dialog close btn -->
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="$emit('update:isDialogVisible', false)"
      />

      <VCardItem class="text-center">
        <VCardTitle class="text-h5 mb-5">
          음식점
        </VCardTitle>

        <VCardSubtitle>
          찾아서
        </VCardSubtitle>
      </VCardItem>

      <VCardText class="d-flex align-center flex-column flex-sm-nowrap px-15">
        <div class="d-flex justify-space-between flex-wrap">
          일괄로 처리해서 나중에 데이터 분기 시켜야 함
        </div>
        <VBtn
          class="mt-5"
          @click="$emit('update:isDialogVisible', false)"
        >
          확인
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
