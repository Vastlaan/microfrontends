import React from 'react'
// We use Router instead of BrowserRouter, to not mess with url address. Only Host (Container) app will make use of BrowserRouter
import {Switch, Route, Router} from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from '@material-ui/styles'

import Signin from './components/Signin'
import Signup from './components/Signup'


const generateClassName = createGenerateClassName({
  productionPrefix: "au"
})

export default function App({history}){
  return(
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history} >
          <Switch>
            <Route path='/auth/signin' component={Signin} />
            <Route path='/auth/signup' component={Signup} />
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  )
}