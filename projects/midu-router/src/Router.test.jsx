
import { Router } from './components/Router.jsx'
import {describe,it, expect, beforeEach, vi } from 'vitest'
import {render, screen, cleanup} from '@testing-library/react'
import { getCurrentPath } from './utils/utils.js'
import { Link } from './components/LINK.jsx'
import { Route } from './components/Route.jsx'


vi.mock('./utils/utils.js', () => ({

    getCurrentPath: vi.fn()


}))

describe('Router', () => {

    beforeEach(()=>{

        cleanup()
        vi.clearAllMocks()
    })

    it('should render without problems', ()=>{
        
        render(<Router routes={[]}/>)
        expect(true).toBeTruthy

    })

    it('should render 404 if no routes match', ()=>{

        render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />)
        console.log(screen.debug())
        expect(screen.getByText('404')).toBeTruthy()
    })

    it('should render the component of the first route that matches', async ()=>{


        getCurrentPath.mockReturnValue('/about')

        const routes = [
            {
                path: '/',
                Component: () => <h1>Home</h1>
            },
            {
                path: '/about',
                Component: ( ) => <h1>About</h1>
            }
        ]

        render(<Router routes={routes} />)
        const aboutTitle = await screen.findByText('About')

        expect(aboutTitle).toBeTruthy()
    })

    // Test para probar que el direccionamiento esta funcionando de manera correcta

    it('should navigate using Links', async () => {

        
        getCurrentPath.mockReturnValueOnce('/')

        render(
            <Router>  
                
                <Route path='/' Component={() => {
                    return(
                        <>
                        <h1>Home</h1>
                        <Link to='/about'>About</Link>
                        </>
                    )
                }} />
                 <Route path='/about' Component={() => <h1>Hola Que Tal</h1>}/> 
                
                
            </Router>
        )

        //Para probar que se direcciona de manera correcta
        //Click on the link
        screen.getByText('About').click()


        const aboutTitle = await screen.findByText('About')

        // Check that the new route is rendered
        expect(aboutTitle).toBeTruthy()





    })



    }
)

