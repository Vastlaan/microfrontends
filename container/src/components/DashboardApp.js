import { mount } from 'dashboard/Dashboard'
import React, {useEffect, useRef} from 'react'

export default function DashboardApp() {

  const ref=useRef()

  useEffect(()=>{
    mount(ref.current)
  },[])

  return (
    <div ref={ref}> </div>
  )
}
