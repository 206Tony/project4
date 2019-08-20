import React, { useState, useEffect} from 'react';
import LegoSetsList from './LegoSetsList';
import Favorites from './Favorites';
import AddFaves from './AddFav';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  // Link
} from 'react-router-dom';

function Lego(props) {
  var config = {
    headers: {
      Authorization: `Bearer ${props.token}`
    }
  }
  const user = props.user;
  const sets = 'https://rebrickable.com/api/v3/lego/sets/?key=36e941f5870960d3742c4fa017ce16fd';
  const [legoSets, setLegoSets] = useState([])
  const [legoSetsId, setLegoSetsId] = useState({})
  //const [oneSets, setOneSets] = useState()
  const [favorites, setFavorites] = useState([])
  const addFav = (legoSetId) => {
    const newFav = [...favorites, legoSetId]
    setFavorites(newFav);
    var config = {
      headers: {
        Authorization: `Bearer ${props.token}`
      }
    }
    axios.post('/api/sets/', legoSets.map(legoSet => (legoSet.name)), config).then((res) => {
      axios.get('/api/sets/', {legoSets}, config).then((res) => {
        setFavorites(res.data)
      })
    })
  }
  
  // console.log("TOK", legoSets)
  const handleSetDelete = (legoSets) => {
    axios.delete('/api/sets/' + legoSets).then((res) => {
      axios.get('/api/sets', config).then((res) => {
        let fav = res.data.map(legoSets => (
          legoSets.name
        ))
         setFavorites(fav)
      })
    })
  } 
  
  useEffect( () => {
    axios.get(sets).then((res) => { 
      setLegoSets(res.data.results);
      // console.log("Running this many times...")
    })
  }, [])

  useEffect( () => {
    // console.log("Running all the sets...")
    axios.get(`/api/sets/${user}`, config).then((res) => {
      setFavorites(res.data.user);
    })
  }, [favorites])
  

  return (
    <>
      <Router>
        <Route exact path='/sets' render = { () => <LegoSetsList legoSets={legoSets} setLegoSetsId={setLegoSetsId} addFav={addFav}/> } />
        <Route AddFaves favorites={favorites}  legoSetsId={legoSetsId} handleSetDelete={handleSetDelete}/>
        {/* <Route exact path={`/favorite/sets/${legoSets}`} render = { () => <Favorites legoSets={legoSets}/> } /> */}
      </Router>
    </>
  )
}

export default Lego;

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

// 'https://rebrickable.com/api/v3/lego/

// ?key=36e941f5870960d3742c4fa017ce16fd',
