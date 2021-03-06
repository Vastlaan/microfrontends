import React from 'react'
// We use Router instead of BrowserRouter, to not mess with url address. Only Host (Container) app will make use of BrowserRouter
import {Switch, Route, Router} from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from '@material-ui/styles'

import Landing from './components/Landing'
import Pricing from './components/Pricing'

const generateClassName = createGenerateClassName({
  productionPrefix: "ma"
})

export default function App({history}){
  return(
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history} >
          <Switch>
            <Route exact path='/pricing' component={Pricing}/>
            <Route path="/" component={Landing} />
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  )
}