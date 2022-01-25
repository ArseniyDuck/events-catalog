import React from 'react';
import { imageUrl } from 'tools/functions';
import s from './Banner.module.scss';


type PropsType = {
   photo: string | null
   title: string
   subtitle: string
}

const Banner: React.FC<PropsType> = (props) => {
   return (
      <div className={s.banner}>
         <div className={`${s.photo} ibg`}>
            {props.photo && <img src={imageUrl(props.photo)} alt='banner' />}
         </div>
         <div className={s.titlesContainer}>
            <h1 className={s.title}>
               {props.title}
            </h1>
            <p className={s.subtitle}>
               {props.subtitle}
            </p>
         </div>
      </div>
   );
}

export default Banner;