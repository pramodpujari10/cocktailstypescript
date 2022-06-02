import React,{useRef,useEffect} from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
    {/* TypeScript */}
  const {setSearchTerm}:any=useGlobalContext();
  const searchValue=useRef<HTMLInputElement | null>(null)
  const searchCocktail=()=>{
     setSearchTerm(searchValue.current?.value)
  }
  useEffect(() => {
    searchValue.current?.focus()
    
  }, [])
  const handleSubmit=(e: React.FormEvent)=>{
    e.preventDefault()
  }
  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search your favorite cocktail</label>
          <input
            type="text"
            id="name"
            ref={searchValue}
            onChange={searchCocktail}
          />
        </div>
      </form>
    </section>
  );
}

export default SearchForm
