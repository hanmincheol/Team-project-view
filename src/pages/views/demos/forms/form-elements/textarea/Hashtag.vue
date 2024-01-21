<script setup>
import { ref, watch } from 'vue'

const textareaValue = ref('')
const rules = [v => v.length <= 2000 || '2000이하로 작성하세요']
const hashtags = ref([])

watch(textareaValue, () => {
  const matches = textareaValue.value.match(/#\s*\S+/g) || []

  hashtags.value = matches.map(hashtag => hashtag.replace(/\s/g, ''))
})

const removeHashtag = hashtag => {
  const index = hashtags.value.indexOf(hashtag)
  if (index > -1) {
    hashtags.value.splice(index, 1)
    textareaValue.value = hashtags.value.join(' ')
  }
}
</script>

<template>
  <VTextarea
    v-model="textareaValue"
    :rules="rules"
    rows="2"
    placeholder="#해쉬태그"
    no-resize
  />

  <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
    <span
      v-for="(hashtag, index) in hashtags"
      :key="index"
      style="margin-right: 10px;"
    >
      {{ hashtag }} 
      <button 
        style="padding: 10px; margin-left: 5px; cursor: pointer;" 
        @click="() => removeHashtag(hashtag)"
      >
        x
      </button>
    </span>
  </div>
</template>
