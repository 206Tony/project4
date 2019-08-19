import React, { useState, useEffect} from 'react';
import LegoSetsList from './LegoSetsList';
import LegoThemes from './LegoThemes';
import AddFaves from './AddFav';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

function Lego(props) {
  const [legoSets, setLegoSets] = useState([])
  const [legoSetsId, setLegoSetsId] = useState({})
  const [favorites, setFavorites] = useState([])
  const user = props.user;
  const sets = 'https://rebrickable.com/api/v3/lego/sets/?key=36e941f5870960d3742c4fa017ce16fd';

  const addFav = (legoSets) => {
    const newFav = [...favorites, legoSets]
    setFavorites(newFav);

    axios.post(`/api/sets`, {legoSets}).then((res) => {
      favorites(res.data)
    })
  }

  const handleSetDelete = (legoSets) => {
    axios.delete(`/api/sets/${legoSets}/`).then((res) => {
      axios.get(`/api/sets`).then((res) => {
        let fav = res.data.map(legoSets => (
          legoSets.name
        ))
         setFavorites(fav)
      })
    })
  } 
  // SHOW only
  //const [themes, legoThemes] = useState([0])
  //const theme = 'https://rebrickable.com/api/v3/lego/themes/?key=36e941f5870960d3742c4fa017ce16fd'
  //const partsCategories = 'https://rebrickable.com/api/v3/lego/part_category/?key=36e941f5870960d3742c4fa017ce16fd'
  //const parts = 'https://rebrickable.com/api/v3/lego/parts/?key=36e941f5870960d3742c4fa017ce16fd'
  // const [legos, setLegos] = useState([
  //   partsCategories, 
  //   themes, 
  //   parts, 
  //   sets
  // ])

  useEffect( () => {
    axios.get(sets).then((res) => { 
      setLegoSets(res.data.results);
      console.log("Running this many times...")
    })
  }, [])

  useEffect( () => {
    console.log("Running all the sets...")
    axios.get(`/api/sets/${legoSetsId}`).then((res) => {
      setFavorites(res.data);
    })
  }, [legoSetsId])


  return (
    
    <Router>
      <div>
        <Route exact path='/sets' render = { () => <LegoSetsList legoSets={legoSets} setLegoSetsId={setLegoSetsId} addFav={addFav}/>}/>
        <AddFaves favorites={favorites}  legoSetsId={legoSetsId} handleSetDelete={handleSetDelete}/>
      </div>
    </Router>
  )
}

export default Lego;


// 'https://rebrickable.com/api/v3/lego/

// ?key=36e941f5870960d3742c4fa017ce16fd',
