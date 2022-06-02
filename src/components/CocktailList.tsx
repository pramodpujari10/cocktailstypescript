import React from 'react'
import Cocktail from './Cocktail'
import Loading from './Loading'
import { useGlobalContext } from '../context'
interface Drink{
  idDrink:number;
   strAlcoholic:string;
   strDrink:string;
   strDrinkThumb:string;
   strGlass:string;
}
interface Prov{
  loading:boolean;
  setSearchTerm:React.Dispatch<React.SetStateAction<string>>;
  cocktails:Drink[];
  searchTerm:string;
}

const CocktailList = () => {
    {/* TypeScript */}
  const {loading,cocktails}:Prov |any  =useGlobalContext()
  console.log(cocktails)
  if(loading){
    return <Loading />
  } if (cocktails.length<1){
    return (
          <h2 className="section-title">No cocktails matched your search criteria</h2>
    )
  }
  return (
    <section className="section">
      <h2 className="section-title">
        cocktails`
      </h2>
      <div className="cocktails-center">

        {/* TypeScript */}
        {cocktails.map((item:any)=>{
          return <Cocktail key={item.id} {...item} />
        })}
      </div>

    </section>
  )
}

export default CocktailList
