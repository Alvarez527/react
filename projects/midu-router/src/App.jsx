import { lazy, Suspense } from 'react' //Para Hacer Lazy Loading de pAGINAS
import { EVENTS } from './utils/consts.js'
import { Link } from './components/LINK.jsx'
import { NAVIGATION_EVENT } from './utils/consts.js'
import {Router} from './components/Router.jsx'
import {Page404} from './Pages/404'
import { Route } from './components/Route.jsx'


const LazyAboutPage = lazy(()=> import('./Pages/AboutPage.jsx'))
const LazyHomePage = lazy(() => import('./Pages/Home.jsx'))
const LazySearchPage = lazy(() => import('./Pages/SearchPage.jsx'))


import './App.css'


const appRoutes = [


  {
    path: '/search/:query',
    Component: LazySearchPage
  }
]


function App() {

  return (

    <main>
      <Suspense fallback={<div>Loading...</div>}>
      <Router routes={appRoutes} defaultComponent={Page404}>
        <Route path='/' Component={LazyHomePage} />
        <Route path='/about' Component={LazyAboutPage}/>
      </Router> 
      </Suspense>
    </main>

  )
}

export default App
