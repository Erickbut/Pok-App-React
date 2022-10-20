import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CardPoke from '../components/pokedex/CardPoke'
import InputSearch from '../components/pokedex/InputSearch'
import Pagination from '../components/pokedex/Pagination'
import SelectByType from '../components/pokedex/SelectByType'
/*import  '../components/pokedex/styles/letter-header.css'*/


const Pokedex = () => {

  const [pokemons, setPokemons] = useState()

  const [typeSelected, setTypeSelected] = useState('All Pokemons')

  useEffect(() => {
    if (typeSelected !== 'All Pokemons') {
      //Si seleccionó un tipo
      axios.get(typeSelected)
        .then(res => {
          const result = res.data.pokemon.map(e => e.pokemon)
          setPokemons(result)
        })
        .catch(err => console.log(err))
    } else {
      //si quiero todos los pokemons
      const URL = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
      axios.get(URL)
        .then(res => setPokemons(res.data.results))
        .catch(err => console.log(err))
    }
  }, [typeSelected])

  const userName = useSelector(state => state.userName)

  // Logica de paginacion
  const [page, setPage] = useState(1)
  const [pokePerpage, setPokePerpage] = useState(8)
  //       1 -1         8  = 0
  //       2   -1       8  = 8
  //       3   -1       8  = 16
  const initialPoke = (page - 1) * pokePerpage
  //              = initialPoke + pokePerpage + 1
  const finalPoke = page * pokePerpage

  return (
    <section className='section-pokedex' >
      <header className='header-poke'>
        <img className='pokedex_img' src="/images/home/pokedex.png" alt="" />
        <div className='black-text'>
            <span className='red-text'>{'Welcome '} {userName} {'😄'}</span>
            <div>, here you can find your favorite pokémon❗</div>
        </div>
      </header>
      <aside className='aside-poke'>
        <InputSearch />
        <SelectByType setTypeSelected={setTypeSelected} setPage={setPage} />
        <Pagination
          page={page}
          pagesLength={pokemons && Math.ceil(pokemons.length / pokePerpage)}
          setPage={setPage}
        />

      </aside>
      
      <main className='main-poke'>
        <div className='card-container'>
          {
            pokemons?.slice(initialPoke, finalPoke).map(pokemon => (
              <CardPoke
                key={pokemon.url}
                url={pokemon.url}
              />
            ))
          }
        </div>
      </main>
      <Pagination
          page={page}
          pagesLength={pokemons && Math.ceil(pokemons.length / pokePerpage)}
          setPage={setPage}
        />
        <div>
          -----
        </div>
        <div>
          -----
        </div>
    </section>
  )
}

export default Pokedex