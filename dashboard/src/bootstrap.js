import {createApp} from 'vue'
import Dashboard from './components/Dashboard.vue'

const mount = (rootElement) =>{
  const app = createApp(Dashboard)
  app.mount(rootElement)
}

// check if run in development with root-dev (only present in index.html in separate dev mode)
const root = document.querySelector('#root-dev-dashboard')
if(process.env.NODE_ENV==='development' && root){
  mount(root)
}

export { mount }