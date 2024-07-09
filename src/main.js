import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';

import 'primeicons/primeicons.css'
import './styles/main.scss';
import { definePreset } from '@primevue/themes';

const MyPresset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}'
    }
  }
})

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: MyPresset,
    options: {
      prefix: 'p',
    },
    ptOptions: {
      mergeSections: false,
      mergeProps: true,
    }
  }
});
app.use(ToastService);
app.mount('#app');
