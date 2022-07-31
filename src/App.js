import React, { Component, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './component/nav'
import Home from './component/home'
import Sign from './component/sign'
import Explore from './component/explore'
import Nontification from './component/nontification'
import User from './component/user'
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <Nav />
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/sign' element={<Sign />}></Route>
            <Route exact path='/explore' element={<Explore />}></Route>
            <Route exact path='/nontification' element={<Nontification />}></Route>
            <Route exact path='/user' element={<User />}></Route>
          </Routes>
        </div>
      </Router>
    )
  }
}

export default App;
