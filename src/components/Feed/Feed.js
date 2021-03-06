import React, { Component } from 'react';
import dayjs from 'dayjs';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import API from '../../api/FeedApi';
import FeedControlBar from './FeedControlBar';
import FeedItem from './FeedItem';
import './FeedItem.css';

import newData from '../../data/new_machine.json';

class Feed extends Component {
    constructor(props) {
        super(props);
        
        const currPage = Number((new URLSearchParams(window.location.search)).get("page")) || 1;
        const pageLimit = 50;

        this.state = { 
            data: [],
            totalDataCount: 0,
            pageLimit: pageLimit,
            pageOffset: pageLimit * (currPage - 1),
            currPageDataCount: pageLimit,
            currPage: currPage
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
            });
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
        const dateFormat = "DD/MM/YYYY HH:mm";
        dataRow.createdAt = dayjs(dataRow.createdAt).format(dateFormat);
        dataRow.updatedAt = dayjs(dataRow.updatedAt).format(dateFormat);
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
                this.handleApiResponseErr(index);
                return;
            }
        }

        // TODO remove timeout
        setTimeout(() => {
            this.editApiHandler(updatedData).then(res => {
                if (res) {
                    this.updateStateData(index, {...this.cleanDataRow(res)});
                } else {
                    this.handleApiResponseErr(index);
                }
            });
        }, 2000);
    }

    editApiHandler(targetData) {
        delete targetData.hasError;

        if (targetData.isNew) {
            delete targetData.isNew;
            return API.addFeedItem(targetData);
        } else {
            return API.updateFeedItem(targetData.serialNumber, targetData);
        }
    }

    async handleSaveDelete(index) {
        const data = this.state.data[index];
        if (data.attachment) {
            const res = await API.deleteFile(data.serialNumber, data.attachment);
            if (!res) {
                this.handleApiResponseErr(index);
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
                    this.handleApiResponseErr(index);
                }
            });
        }, 2000);
    }

    handleApiResponseErr(index) {
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
        // Manually update URL to reflect page changes -- for visibility purposes.
        const url = new URL(window.location);
        url.searchParams.set('page', p);
        window.history.pushState({}, '', url);

        this.setState({
            pageOffset: this.state.pageLimit * (p - 1),
            currPage: p
        });
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
                    currPage={this.state.currPage}
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
            <Container maxWidth="md">
                <Grid container spacing={1}>
                    {feedControlBar}
                    {feedItems}
                </Grid>
            </Container>
        );
    }
}

export default Feed;