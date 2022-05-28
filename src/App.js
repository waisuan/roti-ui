import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
  
import './App.css';
import Feed from './components/Feed/Feed';
import NotFoundPage from './NotFoundPage';
import FeedLog from './components/Feed/FeedLog';

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Feed />}/>
                        <Route path="/log/:id" element={<FeedLog />}/>
                        <Route path="*" element={<NotFoundPage />}/>
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;