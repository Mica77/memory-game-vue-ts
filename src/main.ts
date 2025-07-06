import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')

if ('serviceWorker' in navigator) {
  // регистрация сервис-воркера
  navigator.serviceWorker
    .register('./service-worker.js')
    .then((reg) => {
      reg.onupdatefound = () => {
        const installingWorker = reg.installing

        if (!installingWorker) {
          return
        }

        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // Новая версия сервис-воркера доступна
            console.log('New service worker version available.')

            // Опционально: показать уведомление пользователю
            console.log('update sw')
          }
        }
      }
    })
    .catch((err) => console.log('service worker not registered', err))
}
