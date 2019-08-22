import React from 'react';

function AddFav({favorites, handleSetDelete}) {
  let content;
  content = favorites.map((favorite, id) => {
    return (
      <div key={id}>
        <h1>{favorite.setName}</h1>
        <button onClick={ () => handleSetDelete(favorite._id.toString())}>Delete</button>
      </div>
    )
  })
  return (
    <div className="set-favs">
      favs
      {content}
    </div>
  )
}
export default AddFav;