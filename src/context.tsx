import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
 const AppContext = React.createContext<Prov | null>(null)
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
type MyComponentProps = React.PropsWithChildren<{}>

const AppProvider = ({ children }:MyComponentProps) => {
  const [loading,setLoading]=useState<boolean>(true)
  const [searchTerm,setSearchTerm]=useState<string>('ab')
  
  const [cocktails,setCocktails]=useState<Drink[]>([])

  const fetchDrinks=async()=>{
    try {
      const response= await fetch(`${url}${searchTerm}`)
      const data=await response.json()
      
      const {drinks}=data;
      if(drinks){
        const newCocktails:Drink[]=drinks.map((item:Drink)=>{
        const {idDrink, strAlcoholic,strDrink,strDrinkThumb,strGlass}=item;
        return { id: idDrink, name: strDrink, image: strDrinkThumb ,info:strAlcoholic,glass:strGlass};
      })
      setCocktails(newCocktails);
    }else{
      setCocktails([])
    }
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
      
    }
  }
useEffect(()=>{
  fetchDrinks()

},[searchTerm])

  return <AppContext.Provider value={{
    loading,setSearchTerm,cocktails,searchTerm
  }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
