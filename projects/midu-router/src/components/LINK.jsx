import { EVENTS } from "../utils/consts"
import { BUTTONS } from "../utils/consts"

const NAVIGATION_EVENT = EVENTS.PUSHSTATE

function navigate(href){

  window.history.pushState({}, '', href)
  // crear un evento personalizado para avisar que ha cambiado la URL
  const navigationEvent = new Event(NAVIGATION_EVENT)
  window.dispatchEvent(navigationEvent)
}

export function Link({target, to, ...props}){

    const handleClick = (event) => {

        //  Se hacen estas verificaciones par que el navegador respete cuando se hace un commandclick
        // esto permite abrir pestañas nuevas
        
        const isMainEvent = event.button === BUTTONS.primary //primary click
        const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
        const isManageableEvent = target === undefined || target === '_self'

        if (isMainEvent && isManageableEvent && !isModifiedEvent){
            event.preventDefault()
            navigate(to)
        } 
        
    }

    return <a onClick={handleClick} href={to} target={target} {...props}/> 
}



