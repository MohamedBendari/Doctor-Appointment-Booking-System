import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// استدعاء bootstrap

import '@fortawesome/fontawesome-free/css/all.min.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// استدعاء bootstrap icons
import 'bootstrap-icons/font/bootstrap-icons.css'

// استدعاء Tailwind (الملف موجود في src/index.css)
import './index.css'

createApp(App)
  .use(router)
  .mount('#app')
