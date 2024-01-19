import axios from '@axios'

export const useCalendarStore = defineStore('calendar', {
  // arrow function recommended for full type inference
  state: () => ({
    availableCalendars: [
      {
        color: 'error',
        label: 'Personal',
      },
      {
        color: 'primary',
        label: 'Business',
      },
      {
        color: 'warning',
        label: 'Family',
      },
      {
        color: 'success',
        label: 'Holiday',
      },
      {
        color: 'info',
        label: 'ETC',
      },
    ],
    selectedCalendars: ['Personal', 'Business', 'Family', 'Holiday', 'ETC'],
  }),
  actions: {
    async fetchEvents() {
      return axios.get('/apps/calendar/events', { params: { calendars: this.selectedCalendars.join(',') } })
    },

    // Axios 라이브러리를 사용하여 /apps/calendar/events 경로로 POST 요청을 보내는 것을 의미. 
    // 요청 데이터로는 { event } 객체가 전달된다.
    // 함수는 비동기 함수로 작성되었으므로
    // await 키워드나 then 메소드를 사용하여 해당 함수의 호출 결과를 처리할 수 있음.

    async addEvent(event) {
      return axios.post('/apps/calendar/events', { event })
    },
    async updateEvent(event) {
      return axios.post(`/apps/calendar/events/${event.id}`, { event })
    },
    async removeEvent(eventId) {
      return axios.delete(`/apps/calendar/events/${eventId}`)
    },
  },
})
