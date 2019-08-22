import React, { useState, useEffect} from 'react';
import LegoSetsList from './LegoSetsList';
import AddFav from './AddFav';
import axios from 'axios';
import {
  //BrowserRouter as Router,
  Route
  // Link
} from 'react-router-dom';

function Lego(props) {
  const config = {
    headers: {
      Authorization: `Bearer ${props.token}`
    }
  }
  const user = props.user;
  const sets = 'https://rebrickable.com/api/v3/lego/sets/?key=36e941f5870960d3742c4fa017ce16fd';
  const [legoSets, setLegoSets] = useState([])
  const [legoSet, setLegoSet] = useState('')
  const [favorites, setFavorites] = useState([])

  const addFav = (legoSet) => {
    const newFav = [...favorites, legoSet]
    setFavorites(newFav);
  
    axios.post('/api/sets', {_id: user._id, setName: legoSet}, config).then((fav) => {
      setFavorites(fav.data);
      // axios.get('/api/sets', config).then((res) => {
      //   console.log(res.data)
      //   setFavorites(res.data.set)
      // })
    })
  }
  
  // console.log("TOK", legoSets)
  const handleSetDelete = (current) => {
    axios.delete(`/api/sets/${current}`, config).then((res) => {
      axios.get('/api/sets', config).then((res) => {
        console.log('user after delete: ', res.data)
         setFavorites(res.data.set)
      })
    })
  } 
  
  useEffect( () => {
    //console.log("config", config)
    axios.get(sets).then((res) => { 
      setLegoSets(res.data.results);
    })
  }, [])

  useEffect( () => {
    console.log("config", config)
    if (props.token) {
      axios.get('/api/sets', config).then((res) => { 
        console.log('get user info: ', res.data)
        setLegoSet(res.data);
        setFavorites(res.data.set)
      })
    }
  }, [props.token])

  return (
    <>
      <Route exact path='/sets' render = { () => <LegoSetsList legoSets={legoSets} user={user} addFav={addFav}/> } />
      <Route exact path='/favorites' render = { () => <AddFav favorites={favorites} handleSetDelete={handleSetDelete}/> } />
    </>
  )
}

export default Lego;



