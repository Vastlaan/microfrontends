import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const mount = (rootElement) =>{
  ReactDOM.render(
    <App />,
    rootElement
    )
}

// check if run in development with root-dev (only present in index.html in separate dev mode)

const root = document.querySelector('#root-dev')
if(process.env.NODE_ENV==='development' && root){
  mount(root)
}

export { mount }