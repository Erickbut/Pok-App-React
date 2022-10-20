import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Styles/inputSearch-Allpoke.css'

const InputSearch = () => {

  const navigate = useNavigate()

  const submit = e =>{
    e.preventDefault()
    navigate(`/pokedex/${e.target.search.value.trim().toLowerCase()}`)
  }

  return (
    <form onSubmit={submit}>
      <input className='input-search' id='search' type="text" placeholder='👉Search your favorite pokémon' />
      <button className='btn-search'>Search🔍</button>
    </form>
  )
}

export default InputSearch