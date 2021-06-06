import React, { Component } from 'react';
import Container from '@material-ui/core/Container';

import './App.css';
import Feed from './components/Feed';

class App extends Component {
    render() {
        return (
            <Container maxWidth="md">
                <Feed />
            </Container>
        );
    }
}

export default App;

// Feed
// - FeedItem
//   - History