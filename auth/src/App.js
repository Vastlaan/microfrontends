import React from 'react'
// We use Router instead of BrowserRouter, to not mess with url address. Only Host (Container) app will make use of BrowserRouter
import {Switch, Route, Router} from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from '@material-ui/styles'

import Signin from './components/Signin'
import Signup from './components/Signup'


const generateClassName = createGenerateClassName({
  productionPrefix: "auth"
})

export default function App({history, onSignIn}){
  return(
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history} >
          <Switch>
            <Route path='/auth/signin' render={()=><Signin onSignIn={onSignIn} />} />
            <Route path='/auth/signup' render={()=><Signup onSignIn={onSignIn} />} />
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  )
}