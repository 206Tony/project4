import React from 'react';

function AddFav({legoSetsId, favorites, handleSetDelete}) {
  let content;
  content = favorites.map((set, id) => {
    return (
      <div key={id}>
        <button onClick={ () => legoSetsId(set.name)} >{set.name}</button>
        <button onClick={ () => handleSetDelete(set.name)}>Delete</button>
      </div>
    )
  })
  return (
    <div className="set-favs">
      <h1></h1>
      {content}
    </div>
  )
}
export default AddFav;