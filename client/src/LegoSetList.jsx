import React from 'react';

function LegoSetList({legoSets}) {
  let contents;
  if (legoSets.length - 1) {
    contents = legoSets.map((legoSet, id) => {
      return (
      <div className='list' key={id}>
        <h1>{legoSet.name}</h1>
        <h3>{legoSet.year}</h3>
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
export default LegoSetList;