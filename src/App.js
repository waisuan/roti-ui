import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import {
    Routes,
    Route,
    BrowserRouter
} from "react-router-dom";
  

import './App.css';
import Feed from './components/Feed/Feed';
import NotFoundPage from './NotFoundPage';

class App extends Component {
    render() {
        return (
            <Container maxWidth="md">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Feed />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </BrowserRouter>
            </Container>
        );
    }
}

export default App;