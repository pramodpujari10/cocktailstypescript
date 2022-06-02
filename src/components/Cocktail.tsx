import React from 'react'
import { Link } from 'react-router-dom'

interface Props{
  name:string;
  id:number;
  info:string;
  glass:string;
  // image:unknown;
  image?: string;
}

const Cocktail = ({image,name,id,info,glass}:Props) => {
  return (
    <article className="cocktail">
      <div className="img-container">
        <img src={image} alt={name} />
      </div>
      <div className="cocktail-footer">
        <h3>{name}</h3>
        <h4>{glass}</h4>
        <p>{info}</p>
        <Link to={`/cocktail/${id}`} className='btn btn-primary btn-details'>Details</Link>
      </div>
    </article>
  )
}

export default Cocktail
