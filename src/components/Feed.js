import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import FeedControlBar from './FeedControlBar';
import FeedItem from './FeedItem';
// import FeedItemNew from './FeedItemNew';
import './FeedItem.css';

import data from '../data/machines.json';
import newData from '../data/new_machine.json';

class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            data: data,
            clonedData: {},
            control: ''
        };

        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSaveEdit = this.handleSaveEdit.bind(this);
        this.handleSaveDelete = this.handleSaveDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        // this.renderNewFeedItem = this.renderNewFeedItem.bind(this);
        this.renderExistingFeedItems = this.renderExistingFeedItems.bind(this);
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

    handleAdd() {
        this.setState({control: 'add_item'});
    }

    // renderNewFeedItem() {
    //     const feedItemNew = (
    //         <Grid item xs={12}>
    //             <FeedItemNew/>
    //         </Grid>
    //     );
        
    //     return (
    //         <Grid container spacing={1}>
    //             {feedItemNew}
    //         </Grid>
    //     );
    // }

    renderExistingFeedItems() {
        const feedControlBar = (
            <Grid item xs={12}> 
                <FeedControlBar 
                    onAdd={this.handleAdd} 
                />
            </Grid>
        );

        var items = this.state.data;
        if (this.state.control === "add_item") {
            items = [newData, ...items];
        }
        const feedItems = items.map((rec, index) => {
            return (
                <Grid key={rec.serialNumber} item xs={12}>
                    <FeedItem 
                        index={index}
                        item={rec}
                        isNew={rec.serialNumber === "" ? true : false}
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
                {feedControlBar}
                {feedItems}
            </Grid>
        );
    }

    render() {
        // if (this.state.control === "add_item") {
        //     return this.renderNewFeedItem();
        // } else {
        //     return this.renderExistingFeedItems();
        // }

        return this.renderExistingFeedItems();
    }
}

export default Feed;