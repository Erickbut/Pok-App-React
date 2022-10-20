import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Pokemon404 from '../components/pokedexId/Pokemon404'
import './styles/pokedexbyid.css'

const PokedexById = () => {

  const { id } = useParams()

  const [pokemon, setPokemon] = useState()

  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`
    axios.get(URL)
      .then(res => setPokemon(res.data))
      .catch(err => {
        console.log(err)
        setHasError(true)
      })
  }, [])

  if(hasError){
    return <Pokemon404 />
  }

  return (
    <article>
      <header >
        <img className='card-poke_spriteID' src={pokemon?.sprites.other['official-artwork'].
        front_default} alt="" />
      </header>
      <section>
        <h3 className={`card-poke_nameID letter-${pokemon?.types[0].type.name}`}>{pokemon?.name}</h3>
        <ul className='card-poke_types-containerID'>
        {
            pokemon?.types.map(type => (
              <li key={type.slot} className='card-poke_type'>{type.type.name}</li>
            ))
          }
        </ul>
        <ul className='card-poke_stats-containerID'>
        {
          pokemon?.stats.map(stat => (
            <li key={stat.stat.name} className='card-poke_stat'>
              <span className='card-poke_stat-label'>{stat.stat.name}</span>
              <span className={`card-poke_stat-number letter-${pokemon?.types[0].type.name}`}>{stat.base_stat}</span>
            </li>
          ))
        }
      </ul>
        <div>{pokemon?.movevents}</div>
      </section>
    </article>
  )
}

export default PokedexById