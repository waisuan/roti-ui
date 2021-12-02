import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import dayjs from 'dayjs';

import API from '../../api/FeedApi';
import FeedControlBar from './FeedControlBar';
import FeedItem from './FeedItem';
import './FeedItem.css';

import newData from '../../data/new_machine.json';

class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            data: [],
            totalDataCount: 0,
            pageLimit: 50,
            pageOffset: 0,
            currPageDataCount: 50
        };

        this.handleSaveEdit = this.handleSaveEdit.bind(this);
        this.handleSaveDelete = this.handleSaveDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
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

    handleCancel(index) {
        const currentData = this.state.data[index];
        if (currentData.isNew) {
            this.removeData(index);
        } else if (currentData.hasError) {
            delete currentData.hasError;
            this.updateStateData(index, currentData);
        }
    }

    async handleSaveEdit(index, updatedData, uploadedFile) {
        if (uploadedFile) {
            const res = await API.uploadFile(updatedData.serialNumber, uploadedFile);
            if (!res) {
                this.handleApiResonseErr(index);
                return;
            }
        }

        // TODO remove timeout
        setTimeout(() => {
            this.editApiHandler(updatedData).then(res => {
                if (res) {
                    this.updateStateData(index, {...this.cleanDataRow(res)});
                } else {
                    this.handleApiResonseErr(index);
                }
            });
        }, 2000);
    }

    editApiHandler(targetData) {
        delete targetData.hasError;

        if (targetData.isNew) {
            delete targetData.isNew;
            return API.addFeedItem(targetData) 
        } else {
            return API.updateFeedItem(targetData.serialNumber, targetData);
        }
    }

    async handleSaveDelete(index) {
        const data = this.state.data[index];
        if (data.attachment) {
            const res = await API.deleteFile(data.serialNumber, data.attachment);
            if (!res) {
                this.handleApiResonseErr(index);
                return;
            }
        }

        const deletedItem = { serialNumber: data.serialNumber, isDeleted: true };
        // TODO remove timeout
        setTimeout(() => {
            API.deleteFeedItem(deletedItem.serialNumber)
            .then(res => {
                if (res) {
                    this.updateStateData(index, deletedItem);
                } else {
                    this.handleApiResonseErr(index);
                }
            });
        }, 2000);
    }

    handleApiResonseErr(index) {
        const currentData = this.state.data[index];
        currentData.hasError = true;
        this.updateStateData(index, currentData);
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
            return (
                <Grid key={rec.serialNumber} item xs={12}>
                    <FeedItem 
                        index={index}
                        item={rec}
                        onSaveEdit={(updatedData, uploadedFile) => { this.handleSaveEdit(index, updatedData, uploadedFile); }}
                        onSaveDelete={() => { this.handleSaveDelete(index); }}
                        onCancel={() => { this.handleCancel(index); }}
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