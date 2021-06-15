import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import FeedItem from './FeedItem';

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [{
            serialNumber: 'S001', 
            customer: 'Evan', 
            state: 'State', 
            district: 'District',
            accountType: 'Type',
            model: 'Model',
            brand: 'Brand',
            status: 'Status',
            tncDate: '2021-01-01',
            ppmDate: '2021-12-31',
            reportedBy: 'Reporter',
            personInCharge: 'Person',
            createdOn: '2019-01-01',
            updatedOn: '2019-12-31'
        },
        {
            serialNumber: 'S002', 
            customer: 'Evan', 
            state: 'State', 
            district: 'District',
            accountType: 'Type',
            model: 'Model',
            brand: 'Brand',
            status: 'Status',
            tncDate: '2021-01-01',
            ppmDate: '2021-12-31',
            reportedBy: 'Reporter',
            personInCharge: 'Person',
            createdOn: '2019-01-01',
            updatedOn: '2019-12-31'
        }],
        clonedData: {}
    };

        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleCancelChange = this.handleCancelChange.bind(this);
    }

    handleItemChange(key, value, index) {
        if (!(index in this.state.clonedData)) {
            this.setState(prevState => ({
                clonedData: {...prevState.clonedData, [index]: prevState.data[index]}
            }));
        }

        this.setState(prevState => ({
            data: [
                ...prevState.data.slice(0, index),
                {...prevState.data[index], [key]: value},
                ...prevState.data.slice(index+1)
            ]
        }));
    }

    handleCancelChange(index) {
        if (index in this.state.clonedData) {
            this.setState(prevState => ({
                data: [
                    ...prevState.data.slice(0, index),
                    {...prevState.clonedData[index]},
                    ...prevState.data.slice(index+1)
                ]
            }), () => { 
                const tmp = {...this.state.clonedData}
                delete tmp[index];
                this.setState({clonedData: tmp});
            });
        }
    }

    render() {
        const feedItems = this.state.data.map((rec, index) => {
            return (
                <Grid key={rec.serialNumber} item xs={12}>
                    <FeedItem index={index} item={rec} onItemChange={this.handleItemChange} onCancelChange={this.handleCancelChange}/>
                </Grid>
            );
        });
        return (
            <Grid container spacing={1}>
                {feedItems}
            </Grid>
        );
    }
}

export default Feed;