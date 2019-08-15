import React, { useState, useEffect} from 'react';
import LegoSetList from './LegoSetList';
//import Api from './Api';
import axios from 'axios';

function Lego() {
  const [legoSets, setLegoSets] = useState([0])
  const partsCategories = 'https://rebrickable.com/api/v3/lego/part_category/?key=36e941f5870960d3742c4fa017ce16fd'
  const themes = 'https://rebrickable.com/api/v3/lego/themes/?key=36e941f5870960d3742c4fa017ce16fd'
  const parts = 'https://rebrickable.com/api/v3/lego/parts/?key=36e941f5870960d3742c4fa017ce16fd'
  const sets = 'https://rebrickable.com/api/v3/lego/sets/?key=36e941f5870960d3742c4fa017ce16fd'
  // const [legos, setLegos] = useState([
  //   partsCategories, 
  //   themes, 
  //   parts, 
  //   sets
  // ])


  useEffect( () => {
    axios.get([themes]).then((res) => {
      setLegoSets(res.data.results);
      console.log("Running this many times...")
    })
  }, [])

  return (
    <div>
      <LegoSetList legoSets={legoSets}/>
    </div>
  )
}

export default Lego;


// 'https://rebrickable.com/api/v3/lego/

// ?key=36e941f5870960d3742c4fa017ce16fd',
