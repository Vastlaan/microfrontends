import React, { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import {StylesProvider, createGenerateClassName} from "@material-ui/core/styles"
import Loading from './components/Loading'

const generateClassName = createGenerateClassName({
  productionPrefix: "co"
})

const AuthAppLazy = lazy(()=>import('./components/AuthApp'))
const MarketingAppLazy = lazy(()=>import('./components/MarketingApp'))

export default function App(){

  const [signedIn, onSignIn] = useState(false)

  return(
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <Header signedIn={signedIn} onSignOut={()=>onSignIn(false)}/>
        <Suspense fallback={<Loading/>}>
          <Switch>
            {/* almost equivalent of calling render method in the route */}
            <Route path='/auth'>
              <AuthAppLazy onSignIn={()=>onSignIn(true)} />
            </Route>
            <Route path='/' component={MarketingAppLazy} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </BrowserRouter>
  )
}