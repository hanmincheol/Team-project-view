<script setup>
import useDatabase from '@/views/apps/chat/chatData.js'
import { formatDate } from '@core/utils/formatters'
import { computed, defineProps } from 'vue'


const props = defineProps({
  newChat: {
    type: Object,
    required: true,
  },
})

let { activeChat, database, fetchFriendDatabase } = useDatabase()

console.log("activeChat------------")
console.log(activeChat) //내가 받은 메세지
console.log("datavbase------------")
console.log(database)
console.log("props.newChat------------")
console.log(props.newChat) //내가 보낸 메세지



const contact = computed(() => {
  if (activeChat.value) {
    return {
      id: activeChat.value.messages.senderId,
      avatar: props.newChat?.contact?.avatar,
    }
  } else {
    return {
      id: null,
      avatar: null,
    }
  }
})

const newContact = computed(() => ({
  id: props.newChat?.contact?.id,
  avatar: props.newChat?.contact?.avatar,
}))

const resolveFeedbackIcon = feedback => {
  if (feedback.isSeen)
    return {
      icon: 'mdi-check-all',
      color: 'success',
    }
  else if (feedback.isDelivered)
    return {
      icon: 'mdi-check-all',
      color: undefined,
    }
  else
    return {
      icon: 'mdi-check',
      color: undefined,
    }
}

const msgGroups = computed(() => {
  let activeMessages = []
  let newMessages = []
  const _msgGroups = []

  if (activeChat.value && activeChat.value.messages) {
    activeMessages = activeChat.value.messages.map(msg => ({
      ...msg,
      senderId: contact.value.id,
    }))
  }

  if (props.newChat?.chat && props.newChat.chat.messages) {
    newMessages = props.newChat.chat.messages.map(msg => ({
      ...msg,
      senderId: newContact.value.id,
    }))
  }

  const messages = [...activeMessages, ...newMessages]

  messages.sort((a, b) => new Date(a.time) - new Date(b.time))

  let msgSenderId = messages[0]?.senderId
  let msgGroup = {
    senderId: msgSenderId,
    messages: [],
  }

  messages.forEach((msg, index) => {
    if (msg.message.trim() === '') {
      return
    }
    if (msgSenderId === msg.senderId) {
      msgGroup.messages.push(msg)
    } else {
      msgSenderId = msg.senderId
      _msgGroups.push(msgGroup)
      msgGroup = {
        senderId: msg.senderId,
        messages: [msg],
      }
    }
    if (index === messages.length - 1) {
      _msgGroups.push(msgGroup)
    }
  })
  console.log("점검!!!!!!")
  console.log(_msgGroups)
  
  return _msgGroups
})
</script>

<template>
  <div class="chat-log pa-5">
    <div
      v-for="(msgGrp, index) in msgGroups"
      :key="msgGrp.senderId + String(index)"
      class="chat-group d-flex align-start"
      :class="[{
        'flex-row-reverse': msgGrp.senderId !== contact.id,
        'mb-8': msgGroups.length - 1 !== index,
      }]"
    >
      <div
        class="chat-avatar"
        :class="msgGrp.senderId !== contact.id ? 'ms-4' : 'me-4'"
      >
        <VAvatar size="32">
          <VImg :src="msgGrp.senderId === contact.id ? contact.avatar : profileUser?.avatar" />
        </VAvatar>
      </div>
      <div
        class="chat-body d-inline-flex flex-column"
        :class="msgGrp.senderId !== contact.id ? 'align-end' : 'align-start'"
      >
        <p
          v-for="(msgData, msgIndex) in msgGrp.messages"
          :key="msgData.time"
          class="chat-content text-sm py-3 px-4 elevation-1"
          :class="[
            msgGrp.senderId === contact.id ? 'bg-surface chat-left' : 'bg-primary text-white chat-right',
            msgGrp.messages.length - 1 !== msgIndex ? 'mb-3' : 'mb-1',
          ]"
        >
          {{ msgData.message }}
        </p>
        <div :class="{ 'text-right': msgGrp.senderId !== contact.id }">
          <span class="text-xs me-1 text-disabled">{{ formatDate(msgGrp.messages[msgGrp.messages.length - 1].time, { hour: 'numeric', minute: 'numeric' }) }}</span>
          <VIcon
            v-if="msgGrp.senderId !== contact.id"
            size="16"
            :color="resolveFeedbackIcon(msgGrp.messages[msgGrp.messages.length - 1].feedback).color"
          >
            {{ resolveFeedbackIcon(msgGrp.messages[msgGrp.messages.length - 1].feedback).icon }}
          </VIcon>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang=scss>
.chat-log {
  .chat-content {
    border-end-end-radius: 6px;
    border-end-start-radius: 6px;

    &.chat-left {
      border-start-end-radius: 6px;
    }

    &.chat-right {
      border-start-start-radius: 6px;
    }
  }
}
</style>
