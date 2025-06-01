
import { useState } from "react";

export function TwitterFollowCard({formatUserName, userName, name}) {
    const imageSrc = `https://unavatar.io/${userName}`;

    const [isFollowing, setIsFollowing] = useState(false);
    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    const text = isFollowing ? 'Siguiendo' : 'Seguir';
    const buttonClassName = isFollowing ? 'md-twitter-followcard-button is-following' : 'md-twitter-followcard-button';



    return(
    

    <article className='md-twitter-followcard'>
        <header className='md-twitter-followcard-header'>
            <img className='md-twitter-followcard-img'  src={imageSrc} alt="React Logo" />
            <div className='md-twitter-followcard-info'>
                <strong className='md-twitter-followcard-name'>
                   {name}
              </strong>
                <span className='md-twitter-followcard-span'>{formatUserName(userName)}</span>
            </div>
        </header>
        <aside>
          <button className={buttonClassName} onClick={toggleFollow}>
                 {text}
            </button>
        </aside>
    </article>

    )
}