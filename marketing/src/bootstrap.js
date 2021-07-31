import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createMemoryHistory, createBrowserHistory } from 'history'

const mount = (rootElement, { onNavigate, defaultHistory, initialPath }) =>{

  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  })

  // check if onNavigate is provided (we are not in isolation)
  if(onNavigate){
    // below onNavigate function will be called whenever path in memory history will change
    history.listen(onNavigate)
  }

  ReactDOM.render(
    <App history={history} />,
    rootElement
    )

  return{
    onParentNavigate: (location) => {
      // here location comes from parent Host(container) app
      const nextPathName = location.pathname
      
      if(history.pathname !== nextPathName){
        history.push(nextPathName) // this is pathname to update the current history object
      }
    }
  }
}

// check if run in development with root-dev (only present in index.html in separate dev mode)

const root = document.querySelector('#root-dev-marketing')
if(process.env.NODE_ENV==='development' && root){
  mount(root, {defaultHistory: createBrowserHistory()})
}

export { mount }