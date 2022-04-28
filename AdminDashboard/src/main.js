import { createApp } from 'vue'
import App from './App.vue'
import {store} from './store';
import { ValidationProvider } from 'vee-validate';

import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas ,faUserSecret  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './style.css'
import DashboardLayout from './components/DashboardLayout.vue';
import EmptyLayout from './components/EmptyLayout.vue';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
library.add(fas,faUserSecret )

const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueLoading)

app.mount('#app')
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('ValidationProvider', ValidationProvider)
app.component('default-layout', DashboardLayout)
app.component('empty-layout', EmptyLayout)
