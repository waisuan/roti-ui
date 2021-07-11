import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import FeedItem from './FeedItem';

import data from '../data/machines.json';

class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            data: data,
            clonedData: {}
        };

        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSaveEdit = this.handleSaveEdit.bind(this);
        this.handleSaveDelete = this.handleSaveDelete.bind(this);
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

    handleCancel(index) {
        if (index in this.state.clonedData) {
            this.setState(prevState => ({
                data: [
                    ...prevState.data.slice(0, index),
                    {...prevState.clonedData[index]},
                    ...prevState.data.slice(index+1)
                ]
            }), () => { 
                this.removeFromClonedData(index);
            });
        }
    }

    handleSaveEdit(index) {
        if (index in this.state.clonedData) {
            this.removeFromClonedData(index);
        }
    }

    handleSaveDelete(index) {
        const tmp = [...this.state.data];
        tmp.splice(index, 1);
        this.setState({data: tmp});
        if (index in this.state.clonedData) {
            this.removeFromClonedData(index);
        }
    }

    removeFromClonedData(index) {
        const tmp = {...this.state.clonedData}
        delete tmp[index];
        this.setState({clonedData: tmp});
    }

    render() {
        const feedItems = this.state.data.map((rec, index) => {
            return (
                <Grid key={rec.serialNumber} item xs={12}>
                    <FeedItem 
                        index={index}
                        item={rec}
                        onItemChange={(k, v) => { this.handleItemChange(k, v, index); }} 
                        onCancel={() => { this.handleCancel(index); }}
                        onSaveEdit={() => { this.handleSaveEdit(index); }}
                        onSaveDelete={() => { this.handleSaveDelete(index); }}
                    />
                </Grid>
            );
        });
        return (
            <Grid container spacing={1}>
                {/* <Grid item xs>
                    <Typography variant="caption" color="textSecondary">
                        Add...
                    </Typography>
                </Grid> */}
                {feedItems}
            </Grid>
        );
    }
}

export default Feed;