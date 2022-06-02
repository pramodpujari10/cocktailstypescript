import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

interface Drink{
  name: string;
  image?: string;
  info: string;
  category: string;
  glass: string;
  instructions: string;
  ingredients: string[];
}

const SingleCocktail = () => {
  const {id}=useParams()

  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState<Drink |null>(null);

  useEffect(() => {
    setLoading(true);
    async function getCocktail(){
      try {
        const response=await fetch(`${url}${id}`)
        const data= await response.json()
        console.log(data)
        if(data.drinks){
          const {strAlcoholic:info,strDrink:name,strDrinkThumb:image,strGlass:glass,strCategory:category,strInstructions:instructions,strIngredients1,strIngredients2,strIngredients3,strIngredients4,strIngredients5} =data.drinks[0]
         const ingredients=[strIngredients1,strIngredients2,strIngredients3,strIngredients4,strIngredients5]
         const newCocktail={name,image,info,category,glass,instructions,ingredients}
         setCocktail(newCocktail)

        }else{
          setCocktail(null)
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false);
        
      }
    }

    getCocktail();
  }, [id]);
  if(loading){
    return <Loading />
  }
  if(!cocktail){
    return <h2 className='section-title'>no cocktails to display</h2>
  }
const { name, image, category, info, glass, instructions, ingredients } =
  cocktail;
  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
      <h2 className="section-title">{name} </h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">name:</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category:</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info:</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass:</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">instructions:</span>
            {instructions}
          </p>
          {/* <p>
            <span className="drink-data">ingredients:</span>
            {ingredients.map((item, index) => {
              console.log(item)
              return item ? <span key={index}>{item}</span> : null;
            })}
          </p> */}
        </div>
      </div>
    </section>
  );
}

export default SingleCocktail
