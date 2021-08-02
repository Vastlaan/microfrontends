import React, { lazy, Suspense, useState, useEffect } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import Header from './components/Header'
import {StylesProvider, createGenerateClassName} from "@material-ui/core/styles"
import Loading from './components/Loading'
import { createBrowserHistory} from 'history'

const generateClassName = createGenerateClassName({
  productionPrefix: "co"
})

const AuthAppLazy = lazy(()=>import('./components/AuthApp'))
const MarketingAppLazy = lazy(()=>import('./components/MarketingApp'))
const DashboardAppLazy = lazy(()=>import('./components/DashboardApp'))

const history = createBrowserHistory()

export default function App(){

  const [signedIn, onSignIn] = useState(false)

  useEffect(()=>{
    if(signedIn){
      history.push('/dashboard')
    }
  },[signedIn])

  return(
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <Header signedIn={signedIn} onSignOut={()=>onSignIn(false)}/>
        <Suspense fallback={<Loading/>}>
          <Switch>
            {/* almost equivalent of calling render method in the route */}
            <Route path='/auth'>
              <AuthAppLazy onSignIn={()=>onSignIn(true)} />
            </Route>
            <Route path='/dashboard'>
              {!signedIn && <Redirect to="/"/>}
              <DashboardAppLazy />
            </Route>
            <Route path='/' component={MarketingAppLazy} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </Router>
  )
}