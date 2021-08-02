import { mount } from 'auth/Auth'
import React, {useEffect, useRef} from 'react'
import { useHistory } from 'react-router-dom'

export default function AuthApp({onSignIn}) {

  const ref=useRef()
  const history = useHistory()

  useEffect(()=>{
    const {onParentNavigate} = mount(ref.current, {
      
      initialPath: history.location.pathname,
      onSignIn,
      onNavigate: (location)=>{
        // location is passed by the history.listen(onNavigate) in remote app (child app)
        console.log('navigated: ', location)

        // path coming from updated child component
        const nextPathName = location.pathname

        // current path for host(container) 
        const { pathname } = history.location

        // check if the current host path is not up to date with child path, then update it
        if(pathname !== nextPathName){
          history.push(nextPathName)
        }
      }
    })

    history.listen(onParentNavigate)
  },[])

  return (
    <div ref={ref}> </div>
  )
}
