
import './App.css'
import {TwitterFollowCard} from './TwitterFollowCard';
export default function App() {

const formatUserName = (userName)   => `@${userName}`;

return(

<section className='App'>
        <TwitterFollowCard
        formatUserName={formatUserName}
        userName="midudev"
        name="Miguel Angel Duran"
    />
         <TwitterFollowCard
        formatUserName={formatUserName}
        userName="pheralb"
        name="Pablo Hernandez"
    />
        <TwitterFollowCard
        formatUserName={formatUserName}
        userName="elonmusk"
        name="Elon Musk"
    />
    
    </section>
    
   )

}