import React from 'react';

function AddFav({favorites, legoSets, handleSetDelete}) {
  let content;
  content = favorites.map((favorite, id) => {
    return (
      <div key={id}>
        <h1>favorite.name</h1>
        <button onClick={ () => legoSets(favorite.name)} >{favorite.name}</button> 
        <button onClick={ () => handleSetDelete(favorite.name)}>Delete</button>
      </div>
    )
  })
  return (
    <div className="set-favs">
      {content}
    </div>
  )
}
export default AddFav;