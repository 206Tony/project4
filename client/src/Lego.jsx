import React, { useState, useEffect} from 'react';
import LegoSetsList from './LegoSetsList';
//import Favorites from './Favorites';
import AddFav from './AddFav';
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
  console.log("LEGOPROPS",props)
  const user = props.user;
  const sets = 'https://rebrickable.com/api/v3/lego/sets/?key=36e941f5870960d3742c4fa017ce16fd';
  const [legoSets, setLegoSets] = useState([])
  const [legoSetsId, setLegoSetsId] = useState('')
  const [favorites, setFavorites] = useState([])
  
  const addFav = (legoSets) => {
    const newFav = [...favorites, legoSets]
    setFavorites(newFav);
    var config = {
      headers: {
        Authorization: `Bearer ${props.token}`
      }
    }
    axios.post('/api/sets/', {setApiId: favorites, _id: user._id}, config).then((res) => {
      axios.get('/api/sets/', config).then((res) => {
        setFavorites(res.data)
      })
    })
  }
  
  // console.log("TOK", legoSets)
  const handleSetDelete = (favorites) => {
    axios.delete('/api/sets/'+ favorites, config).then((res) => {
      axios.get('/api/sets', config).then((res) => {
        let fav = res.data.map(favorites => (
          favorites.name
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
    console.log('useeffect2',config)
    axios.get('/api/sets', config).then((res) => {
      setFavorites(res.data)
    })
  },[props.token])

  return (
    <>
      <Router>
        <Route exact path='/sets' render = { () => <LegoSetsList legoSets={legoSets} setLegoSets={setLegoSets} addFav={addFav}/> } />
        <Route exact path='/favorite/sets' render = { () => <AddFav favorites={favorites}  legoSetsId={legoSetsId} handleSetDelete={handleSetDelete}/>}/>
      </Router>
    </>
  )
}

export default Lego;

