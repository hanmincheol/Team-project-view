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
      return axios.get('http://localhost:4000/apps/calendar', { params: { calendars: this.selectedCalendars.join(',') } })
    },
    async addEvent(event) {
      return axios.post('http://localhost:4000/apps/calendar', { event })
    },
    async updateEvent(event) {
      return axios.post(`http://localhost:4000/apps/calendar/${event.id}`, { event })
    },
    async removeEvent(eventId) {
      return axios.delete(`http://localhost:4000/apps/calendar/${eventId}`)
    },
  },
})
