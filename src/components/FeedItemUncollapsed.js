import React, { Component } from 'react';
import dayjs from 'dayjs';

import FeedItemFormHeader from './FeedItemFormHeader';
import FeedItemEditHeader from './FeedItemEditHeader';
import FeedItemDeleteHeader from './FeedItemDeleteHeader';
import FeedItemDefaultFooter from './FeedItemDefaultFooter';
import FeedItemForm from './FeedItemForm';

const DATE_FORMAT = 'YYYY-MM-DD';

class FeedItemUncollapsed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formState: this.defaultFormState(),
            fieldErrors: {}
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSaveEdit = this.handleSaveEdit.bind(this);
    }

    handleCancel() {
        this.props.onCancel();
        this.resetState();
    }

    handleSaveEdit() {
        this.props.onSaveEdit();
        this.resetState();
    }

    resetState() {
        this.setState({formState: this.defaultFormState(), fieldErrors: {}});
    }

    handleDateChange(date, fieldName) {
        if (!this.isDateValid(date)) {
            this.setState(prevState => ({ fieldErrors: {...prevState.fieldErrors, [fieldName]: 1} }));
        } else {
            if (fieldName in this.state.fieldErrors) {
                const tmp = {...this.state.fieldErrors};
                delete tmp[fieldName];
                this.setState({fieldErrors: tmp});
            }
            this.props.onItemChange(fieldName, date);
        }
    }

    defaultFormState() {
        return this.props.isNew ? "new" : "default";
    }

    isDateValid(date) {
        return dayjs(date, DATE_FORMAT).format(DATE_FORMAT) === date;
    }

    render() {
        const isEditMode = this.state.formState === "edit";
        const isDelMode = this.state.formState === "delete";
        const isNew = this.state.formState === "new";
        const isSaveDisabled = Object.keys(this.state.fieldErrors).length !== 0;
    
        let header;
        if (isEditMode) {
            header = <FeedItemEditHeader 
                        handleCancel={this.handleCancel}
                        handleSaveEdit={this.handleSaveEdit} 
                        isSaveDisabled={isSaveDisabled}/>;
        } else if (isNew) {
            header = <FeedItemEditHeader
                        isNew={isNew}
                        handleCancel={this.handleCancel}
                        handleSaveEdit={this.handleSaveEdit} 
                        isSaveDisabled={isSaveDisabled}/>;
        } else if (isDelMode) {
            header = <FeedItemDeleteHeader 
                        handleCancel={this.handleCancel} 
                        handleSaveDelete={() => { this.props.onSaveDelete(); }}/>;
        } else {
            header = <FeedItemFormHeader 
                        handleEditState={() => { this.setState({formState: "edit"}); }} 
                        handleDelState={() => { this.setState({formState: "delete"}); }}
                        handleCollapse={this.props.onCollapse}/>;
        }
    
        return (
            <div>
                {header}
                <FeedItemForm 
                    item={this.props.item}
                    formState={this.state.formState}
                    dateFormat={DATE_FORMAT}
                    fieldErrors={this.state.fieldErrors}
                    handleItemChange={(e) => { this.props.onItemChange(e.target.id, e.target.value); }}
                    handleDateChange={this.handleDateChange}
                />
                {!isNew && <FeedItemDefaultFooter createdOn={this.props.item.createdOn} updatedOn={this.props.item.updatedOn} footerType="uncollapsed"/>}
            </div>
        );
    }
}

export default FeedItemUncollapsed;