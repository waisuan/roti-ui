import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
  
import './App.css';
import Feed from './components/Feed/Feed';
import NotFoundPage from './NotFoundPage';
import FeedLog from './components/Feed/FeedLog';

class App extends Component {
    render() {
        return (
            <Container maxWidth="md">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <Feed />
                        </Route>
                        <Route path="/log/:id">
                            <FeedLog />
                        </Route>
                        <Route path="*">
                            <NotFoundPage />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </Container>
        );
    }
}

export default App;