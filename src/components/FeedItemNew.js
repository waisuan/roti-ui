import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

import FeedItemForm from './FeedItemForm';

import data from '../data/new_machine.json'

class FeedItemNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: data
        };
    }

    render() {
        return (
            <Paper className="feedItem">
                <FeedItemForm 
                    item={this.state.data}
                    isNew={true}
                    fieldErrors={{}}
                />
            </Paper>
        );
    }
}

export default FeedItemNew;