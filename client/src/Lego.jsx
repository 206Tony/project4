import React, { useState, useEffect} from 'react';
import LegoSetsList from './LegoSetsList';
import LegoThemes from './LegoThemes';
//import Nav from './MyNav';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

function Lego(props) {
  const [legoSets, setLegoSets] = useState([])
  const [legoSetsId, setLegoSetsId] = useState({})
  const user = props.user;
  const sets = 'https://rebrickable.com/api/v3/lego/sets/?key=36e941f5870960d3742c4fa017ce16fd';
  // SHOW only
  const [themes, legoThemes] = useState([0])
  const theme = 'https://rebrickable.com/api/v3/lego/themes/?key=36e941f5870960d3742c4fa017ce16fd'
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

  // useEffect( () => {
  //   axios.get(theme).then((res) => { 
  //     legoThemes(res.data.results);
  //     console.log("Running this many times...")
  //   })
  // }, [])

  useEffect( () => {
    console.log("Running all the sets...")
    axios.get(`/api/${user}`).then((res) => {
      setLegoSetsId(res.data);
    })
  }, [legoSetsId])


  return (
    
    <Router>
      <div>
        <Route exact path='/sets' render = { () => <LegoSetsList legoSets={legoSets} setLegoSetsId={setLegoSetsId}/>}/>
        <Route exact path='/themes' render = { () => <LegoThemes themes={themes}/> } />
        {/* <Route exact path='/*' render = { () =><Nav themes={themes} legoThemes={legoThemes} props={props} /> }/> */}
      </div>
    </Router>
  )
}

export default Lego;


// 'https://rebrickable.com/api/v3/lego/

// ?key=36e941f5870960d3742c4fa017ce16fd',
