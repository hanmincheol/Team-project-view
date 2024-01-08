import axios from '@axios'

export const useChatStore = defineStore('chat', {
  //상태(State) 초기화
  //contacts: 사용자의 연락처 목록을 저장하는 배열.
  //chatsContacts: 채팅과 관련된 연락처 목록을 저장하는 배열.
  //profileUser: 현재 사용자의 프로필 정보.
  //activeChat: 현재 활성화된 채팅 정보.
  state: () => ({
    contacts: [],
    chatsContacts: [],
    profileUser: undefined,
    activeChat: null,
  }),
  actions: {
    //채팅 및 연락처를 가져오는 비동기 액션.
    //서버로부터 데이터를 가져와 chatsContacts, contacts, profileUser 상태를 업데이트
    async fetchChatsAndContacts(q) {
      const { data } = await axios.get('/apps/chat/chats-and-contacts', {
        params: { q },
      })

      const { chatsContacts, contacts, profileUser } = data

      this.chatsContacts = chatsContacts
      this.contacts = contacts
      this.profileUser = profileUser
    },

    //특정 사용자의 채팅 정보를 가져오는 비동기 액션.
    //서버로부터 데이터를 가져와 activeChat 상태를 업데이트
    async getChat(userId) {
      const { data } = await axios.get(`/apps/chat/chats/${userId}`)

      this.activeChat = data
    },

    //메시지를 전송하는 비동기 액션.
    //서버로부터 메시지 및 채팅 정보를 받아와 상태를 업데이트
    async sendMsg(message) {
      const senderId = this.profileUser?.id
      const { data } = await axios.post(`/apps/chat/chats/${this.activeChat?.contact.id}`, { message, senderId })
      const { msg, chat } = data

      //서버로부터 받은 응답 데이터에서 chat 값이 undefined가 아닐 때 실행
      //새로운 채팅이 생성되었다고 판단
      if (chat !== undefined) {
        const activeChat = this.activeChat

        this.chatsContacts.push({
          ...activeChat.contact,
          chat: {
            id: chat.id,
            lastMessage: [],
            unseenMsgs: 0,
            messages: [msg],
          },
        })
        if (this.activeChat) {
          this.activeChat.chat = {
            id: chat.id,
            messages: [msg],
            unseenMsgs: 0,
            userId: this.activeChat?.contact.id,
          }
        }
      }
      else {
        this.activeChat?.chat?.messages.push(msg)
      }

      // 현재 활성화된 채팅 창에 해당하는 연락처의 채팅 정보에 마지막 메시지를 설정하는 역할
      const contact = this.chatsContacts.find(c => {
        if (this.activeChat)
          return c.id === this.activeChat.contact.id
        
        return false
      })

      contact.chat.lastMessage = msg
    },
  },
})
