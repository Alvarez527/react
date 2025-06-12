import { Link } from "../components/LINK"


export default function Homepage(){
  return(

    <main>
      <h1>Home</h1>
      <p>Esta es una página de ejemplo para crear un React Router desde cero</p>
      <Link to='/about'>Ir a Sobre Nosotros</Link>
    </main>
  )
}