import React from 'react';

function LegoSetsList({legoSets, addFav}) {
  let contents;
  if (legoSets) {
    contents = legoSets.map((legoSet, id) => {
      return (
      <div  className="list-container" key={id}>
        <h6>{legoSet.name}</h6>
        <p>Year: {legoSet.year} Set: {legoSet.set_num}</p> <br />
        <img src={legoSet.set_img_url} alt={legoSet.set_num} 
                className='set-container' 
                  style={{height: '200px',
                          width: '200px',
                          textAlign: 'center',
                          justifyContent: 'space-between'
              }}/><br />
        <button onClick={() => addFav(legoSet.name)} type="submit">Add to Favorites</button><br/>
      </div>      
      )
    })
  } else {
    contents = <p>No sets found!</p>
  }
  return (
    <div className="list">
      {contents}
    </div>
  );
}
export default LegoSetsList;
