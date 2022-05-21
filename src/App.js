import React, { Component } from 'react';
<<<<<<< HEAD
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';

=======
import Container from '@mui/material/Container';
import {
    Routes,
    Route,
    BrowserRouter
} from "react-router-dom";
  
>>>>>>> b67bf11 (fixup! Migrating mui from v4 to v5)
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