import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import dayjs from 'dayjs';

import API from '../Api';
import FeedControlBar from './FeedControlBar';
import FeedItem from './FeedItem';
import './FeedItem.css';

import newData from '../data/new_machine.json';

class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            data: [],
            totalDataCount: 0,
            pageLimit: 50,
            pageOffset: 0,
            currPageDataCount: 50,
            clonedData: {}
        };

        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSaveEdit = this.handleSaveEdit.bind(this);
        this.handleSaveDelete = this.handleSaveDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);

        this.currPageStats = this.currPageStats.bind(this);
    }

    componentDidMount() {
        this.reloadData();
    }

    componentDidUpdate(_, prevState) {
        if (this.state.pageOffset !== prevState.pageOffset) {
            this.reloadData();
        }
    }

    reloadData() {
        // TODO: Auth, err handling
        API.get(`machines?page_limit=${this.state.pageLimit}&page_offset=${this.state.pageOffset}`)
            .then(res => {
                console.log(res["data"]);
                this.setState({
                    data: this.cleanData(res["data"]["machines"]),
                    totalDataCount: res["data"]["count"],
                    currPageDataCount: res["data"]["machines"].length
                });
            });
    }

    cleanData(data) {
        return data.map(d => {
            Object.entries(d).forEach(entry => {
                const [key, value] = entry;
                d[key] = value || "";
            })
            d["createdAt"] = dayjs(d["createdAt"]).format("DD/MM/YYYY HH:mm");
            d["updatedAt"] = dayjs(d["updatedAt"]).format("DD/MM/YYYY HH:mm");
            return d;
        });
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
        if (this.state.data[index].isNew) {
            this.removeData(index);
        }
    }

    handleSaveEdit(index) {
        if (index in this.state.clonedData) {
            this.removeFromClonedData(index);
        }
        if (this.state.data[index].isNew) {
            this.hydrateNewData(index);
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

    hydrateNewData(index) {
        const tmp = [...this.state.data];
        delete tmp[index].isNew;
        this.setState({data: tmp});
    }

    removeData(index) {
        this.setState(prevState => ({
            data: [
                ...prevState.data.slice(0, index),
                ...prevState.data.slice(index+1)
            ]
        }));
    }

    handleAdd() {
        this.setState(prevState => ({
            data: [newData, ...prevState.data]
        }));
    }

    handlePageChange(_, p) {
        this.setState({pageOffset: this.state.pageLimit * (p - 1)});
    }

    pageCount() {
        return Math.ceil(this.state.totalDataCount / this.state.pageLimit);
    }

    currPageStats() {
        const startOfPage = this.state.pageOffset + 1
        const endOfPage = startOfPage + this.state.currPageDataCount - 1;
        return `(${startOfPage} - ${endOfPage} / ${this.state.totalDataCount})`;
    }

    render() {
        const feedControlBar = (
            <Grid item xs={12}> 
                <FeedControlBar 
                    isAddDisabled={this.state.data[0]?.isNew || false}
                    pageCount={this.pageCount()}
                    currPageStats={this.currPageStats()}
                    onAdd={this.handleAdd}
                    onChangePage={this.handlePageChange}
                />
            </Grid>
        );

        const feedItems = this.state.data.map((rec, index) => {
            return (
                <Grid key={rec.serialNumber} item xs={12}>
                    <FeedItem 
                        index={index}
                        item={rec}
                        isNew={rec.isNew || false}
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
}

export default Feed;