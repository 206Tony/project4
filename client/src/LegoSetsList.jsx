import React from 'react';

function LegoSetsList({legoSets, setLegoSetsId}) {
  let contents;
  if (legoSets.length - 1) {
    contents = legoSets.map((legoSet, id) => {
      return (
      <div className='set-container' key={id}>
        <h1 onClick={ () => setLegoSetsId(legoSet.name)}>{legoSet.name}</h1>
        <h3>{legoSet.year}</h3>
        <img src={legoSet.set_img_url} alt={legoSet.set_num}/>
        <br />

        {/* <p onClick={ () => setLegoSetsId(legoSet.name)} >{legoSet.name}</p> */}
        {/* <button onClick={ () => handlePDelete(pokemon.name)}>Delete</button> */} 
      </div>      
      )
    })
  } else {
    contents = <p>No sets found!</p>
  }
  return (
    <div className="lego-set-list">
      {contents}
    </div>
  );
}
export default LegoSetsList;

// import React from 'react';

// function CatsList({cats, handleCatChange}) {
//   let content;
//   if (cats.length) {
//     content = cats.map((cat, id) => {
//       return <p onClick={() => handleCatChange(cat.id)} key={id}>{cat.name}</p>
//     })
//   } else {
//     content = <p>No cats found!</p>
//   }
//   return (
//     <>
//     <div className="App">
//       {content}
//     </div>
//     </>
//   );
// }

// export default CatsList;