import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import dayjs from 'dayjs';

import FeedItemDefaultHeader from './FeedItemDefaultHeader';
import FeedItemEditHeader from './FeedItemEditHeader';
import FeedItemDeleteHeader from './FeedItemDeleteHeader';
import FeedItemDefaultFooter from './FeedItemDefaultFooter';
import FeedItemForm from './FeedItemForm';
import './FeedItem.css';

const DATE_FORMAT = 'YYYY-MM-DD';

class FeedItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formState: "default",
            fieldErrors: {}
        };

        this.handleEditState = this.handleEditState.bind(this);
        this.handleDelState = this.handleDelState.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSaveEdit = this.handleSaveEdit.bind(this);
        this.handleSaveDelete = this.handleSaveDelete.bind(this);
    }

    handleEditState() {
        this.setState({formState: "edit"});
    }

    handleDelState() {
        this.setState({formState: "delete"});
    }

    handleItemChange(e) {
        this.props.onItemChange(e.target.id, e.target.value, this.props.index);
    }

    handleCancel(_) {
        this.props.onCancel(this.props.index);
        this.setState({formState: "default", fieldErrors: {}});
    }

    handleSaveEdit(_) {
        this.props.onSaveEdit(this.props.index);
        this.setState({formState: "default", fieldErrors: {}});
    }

    handleSaveDelete(_) {
        this.props.onSaveDelete(this.props.index);
    }

    handleDateChange(date, fieldName) {
        if (!this.isDateValid(date)) {
            this.setState(prevState => ({fieldErrors: {...prevState.fieldErrors, [fieldName]: 1}}));
        } else {
            if (fieldName in this.state.fieldErrors) {
                const tmp = {...this.state.fieldErrors};
                delete tmp[fieldName];
                this.setState({fieldErrors: tmp});
            }
            this.props.onItemChange(fieldName, date, this.props.index);
        }
    }

    isDateValid(date) {
        return dayjs(date, DATE_FORMAT).format(DATE_FORMAT) === date;
    }

    render() {
        const isEditMode = this.state.formState === "edit";
        const isDelMode = this.state.formState === "delete";
        const isSaveDisabled = Object.keys(this.state.fieldErrors).length !== 0;

        let header;
        if (isEditMode) {
            header = <FeedItemEditHeader handleCancel={this.handleCancel} isSaveDisabled={isSaveDisabled} handleSaveEdit={this.handleSaveEdit}/>;
        } else if (isDelMode) {
            header = <FeedItemDeleteHeader handleCancel={this.handleCancel} handleSaveDelete={this.handleSaveDelete}/>;
        } else {
            header = <FeedItemDefaultHeader handleEditState={this.handleEditState} handleDelState={this.handleDelState}/>;
        }

        return (
            <Paper className="feedItem">
                {header}
                <FeedItemForm 
                    item={this.props.item}
                    isReadOnly={!isEditMode}
                    dateFormat={DATE_FORMAT}
                    fieldErrors={this.state.fieldErrors}
                    handleItemChange={this.handleItemChange}
                    handleDateChange={this.handleDateChange}
                />
                <FeedItemDefaultFooter createdOn={this.props.item.createdOn} updatedOn={this.props.item.updatedOn}/>
            </Paper>
        );
    }
}

export default FeedItem;