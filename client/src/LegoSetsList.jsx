import React from 'react';

function LegoSetsList({legoSets, setLegoSetsId, addFav}) {
  let contents;
  if (legoSets.length - 1) {
    contents = legoSets.map((legoSet, id) => {
      return (
      <div className='set-container' key={id}>
        <h1 onClick={ () => setLegoSetsId(legoSet.name)}>{legoSet.name}</h1>
        <h3>{legoSet.year}</h3>
        <h3>Set: {legoSet.set_num}</h3> <br />
        <button onClick={() => addFav(legoSet.name)} type="submit">Add to Favorites</button><br/>
        <img src={legoSet.set_img_url} alt={legoSet.set_num}/>

        <br />
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
