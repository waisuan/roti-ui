import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import dayjs from 'dayjs';

import API from '../api/FeedApi';
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
        API.getFeed(this.state.pageLimit, this.state.pageOffset)
            .then(data => {
                if (Object.keys(data).length !== 0 ) {
                    this.setState({
                        data: this.cleanDataRows(data.machines),
                        totalDataCount: data.count,
                        currPageDataCount: data.machines.length
                    });
                }
            })
    }

    cleanDataRows(dataRows) {
        return dataRows.map(d => {
            return this.cleanDataRow(d);
        });
    }

    cleanDataRow(dataRow) {
        Object.entries(dataRow).forEach(entry => {
            const [key, value] = entry;
            if (key === "tncDate" || key === "ppmDate") {
                dataRow[key] = value?.length === 0 ? null : value;
            } else {
                dataRow[key] = value || "";
            }
        })
        dataRow.createdAt = dayjs(dataRow.createdAt).format("DD/MM/YYYY HH:mm");
        dataRow.updatedAt = dayjs(dataRow.updatedAt).format("DD/MM/YYYY HH:mm");
        return dataRow;
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
        const targetData = this.state.data[index];
        
        this.editApiHandler(targetData).then(res => {
            if (res) {
                if (index in this.state.clonedData) {
                    this.removeFromClonedData(index);
                }
                this.updateStateData(index, {...this.cleanDataRow(res)});
            } else {
                // TODO handle err
            }
        });
    }

    editApiHandler(targetData) {
        if (targetData.isNew) {
            delete targetData.isNew;
            return API.addFeedItem(targetData) 
        } else {
            return API.updateFeedItem(targetData.serialNumber, targetData);
        }
    }

    handleSaveDelete(index) {
        const deletedItem = { serialNumber: this.state.data[index].serialNumber, isDeleted: true };

        API.deleteFeedItem(deletedItem.serialNumber)
            .then(res => {
                if (res) {
                    this.updateStateData(index, deletedItem);
                    if (index in this.state.clonedData) {
                        this.removeFromClonedData(index);
                    }
                } else {
                    // TODO handle err
                }
            });
    }

    removeFromClonedData(index) {
        const tmp = {...this.state.clonedData}
        delete tmp[index];
        this.setState({clonedData: tmp});
    }

    removeData(index) {
        this.setState(prevState => ({
            data: [
                ...prevState.data.slice(0, index),
                ...prevState.data.slice(index+1)
            ]
        }));
    }

    updateStateData(index, changes) {
        this.setState(prevState => ({
            data: [
                ...prevState.data.slice(0, index),
                changes,
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
            let itemState = null;
            if (rec.isNew) {
                itemState = "new";
            } else if (rec.isDeleted) {
                itemState = "deleted";
            }

            return (
                <Grid key={rec.serialNumber} item xs={12}>
                    <FeedItem 
                        index={index}
                        item={rec}
                        itemState={itemState}
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