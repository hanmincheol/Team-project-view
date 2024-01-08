<script setup>
const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:isDialogVisible'])

const selectedPlan = ref('standard')

const categorys = [
  {
    icon: 'mdi-food-drumstick-outline',
    title: '육류/해물',
  },
  {
    icon: 'mdi-lock-outline',
    title: '샐러드',
  },
  {
    icon: 'mdi-bookmark-outline',
    title: '도시락',
  },
  {
    icon: 'mdi-bell-outline',
    title: '샌드위치',
  },
  {
    icon: 'mdi-link-variant',
    title: '분식',
  },
]

const isConfirmDialogVisible = ref(false)
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
      <VCardText class="d-flex align-center flex-column flex-sm-nowrap px-15">
        <VCard 
          v-for="category in categorys"
          :key="category.icon"
        >
          <VBtn
            :icon="category.icon"
            variant="text"
            :text="category.title"
          />
        </VCard>
      </VCardText>
    </VCard>
  </VDialog>
</template>
