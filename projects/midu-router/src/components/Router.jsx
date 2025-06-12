import { EVENTS } from '../utils/consts'
import { NAVIGATION_EVENT } from '../utils/consts'
import {match} from 'path-to-regexp'
import { getCurrentPath } from '../utils/utils'


import {useState, useEffect, Children} from 'react'

export function Router ({children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1>}){


  const[currentPath, setCurrentPath] = useState(getCurrentPath())

  useEffect(()=>{

    const onLocationchange = () =>{

      setCurrentPath(getCurrentPath())

    }

    window.addEventListener(NAVIGATION_EVENT, onLocationchange)
    window.addEventListener(EVENTS.POPSTATE, onLocationchange)

    return() => {
      window.removeEventListener(NAVIGATION_EVENT, onLocationchange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationchange)
    }

  }, [])

  let routeParams = {}

  // add routes from children <Route /> components
  const routesFromChildren = Children.map(children, ({props, type}) => {

    const {name} = type
    const isRoute = name === 'Route'
    return isRoute ? props : null
  })

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean)


  //Checa a que pagina se regiere el path actual
  const Page = routesToUse.find( ({path}) => {

    if(path === currentPath) return true

    //Se ha usado path-to-regex para encontrar rutas dinamicas

    const matcherUrl = match(path, {decode: decodeURIComponent } )
    const matched = matcherUrl(currentPath)
    if(!matched) return false

    routeParams = matched.params //{query:
    return true

})?.Component


  return (Page ? <Page routeParams={routeParams}/> : <DefaultComponent routeParams={routeParams}/>)

}
