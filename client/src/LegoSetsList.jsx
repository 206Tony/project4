import React from 'react';

function LegoSetsList({legoSets, addFav}) {
  let contents;
  if (legoSets) {
    contents = legoSets.map((legoSet, id) => {
      return (
      <div  className="list-container" key={id}>
        <h6 className="set-title">{legoSet.name}</h6>
        <p>Year: {legoSet.year} Set: {legoSet.set_num}</p>
        <img src={legoSet.set_img_url} alt={legoSet.set_num} 
                className='set-container' 
                  style={{height: '160px',
                          width: '180px',
                          textAlign: 'center',
                          justifyContent: 'space-between',
                          padding: '5px'  
                  }}/><br />
        <button className="add-button" onClick={() => addFav(legoSet.name)} type="submit">Add to Favorites</button><br/>
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
