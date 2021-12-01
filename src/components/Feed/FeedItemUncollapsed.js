import React, { Component } from 'react';
import dayjs from 'dayjs';

import FeedItemFormHeader from './FeedItemFormHeader';
import FeedItemEditHeader from './FeedItemEditHeader';
import FeedItemDeleteHeader from './FeedItemDeleteHeader';
import FeedItemDefaultFooter from './FeedItemDefaultFooter';
import FeedItemForm from './FeedItemForm';
import FeedItemProgressHeader from './FeedItemProgressHeader';
import FeedItemErrorHeader from './FeedItemErrorHeader';

const DATE_FORMAT = 'YYYY-MM-DD';

class FeedItemUncollapsed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formState: this.defaultFormState(),
            prevState: "",
            fieldErrors: {},
            clonedData: {},
            failedToSave: false,
            uploadedFile: undefined
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSaveEdit = this.handleSaveEdit.bind(this);
        this.handleSaveDelete = this.handleSaveDelete.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleCancelFileUpload = this.handleCancelFileUpload.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.formState === "saving") {
            if (!prevState.failedToSave &&
                !this.state.failedToSave && 
                this.props.item.hasError) {
                this.revertStateDueToErr();
            } else if ((prevProps.item.version || 0) < this.props.item.version) {
                this.resetState();
            }
        }
    }

    handleCancel() {
        this.props.onCancel();
        this.resetState();
    }

    handleSaveEdit() {
        if (!this.clonedDataExists() && !this.state.uploadedFile) {
            this.handleCancel();
            return;
        }

        // TODO handle removed files        
        this.props.onSaveEdit(this.state.clonedData, this.state.uploadedFile);
        
        if (this.state.clonedData.isNew) {
            this.setSavingState("new");
        } else {
            this.setSavingState("edit");
        }
    }

    // TODO handle files
    handleSaveDelete() {
        this.props.onSaveDelete();
        this.setSavingState("delete");
    }

    setSavingState(sourceAction) {
        this.setState({
            formState: "saving", 
            prevState: sourceAction, 
            failedToSave: false
        });
    }

    revertStateDueToErr() {
        this.setState({
            formState: this.state.prevState, 
            prevState: "",
            failedToSave: true
        });
    }

    resetState() {
        this.setState({
            formState: this.defaultFormState(), 
            prevState: "", 
            fieldErrors: {}, 
            clonedData: {}, 
            failedToSave: false,
            uploadedFile: undefined
        });
    }

    handleDateChange(rawDate, fieldName) {
        const date = dayjs(rawDate, DATE_FORMAT).format(DATE_FORMAT);
        this.handleItemChange(fieldName, date);
    }

    handleItemChange(key, value) {
        if (!this.clonedDataExists()) {
            this.setState({clonedData: {...this.props.item, [key]: value}});
        } else {
            this.setState(prevState => ({
                clonedData: {...prevState.clonedData, [key]: value}
            }));
        }
    }

    handleFileUpload(e) {
        const file = e.target.files[0];
        this.setState({uploadedFile: file});
        this.handleItemChange("attachment", file.name);
    }

    handleCancelFileUpload() {
        this.setState({uploadedFile: undefined});
        this.handleItemChange("attachment", "");
    }

    defaultFormState() {
        if (this.props.item.isNew) {
            return "new";
        } else if (this.props.item.isDeleted) {
            return "delete";
        }

        return "default";
    }

    clonedDataExists() {
        return Object.keys(this.state.clonedData).length !== 0;
    }

    isSaveDisabled() {
        return Object.keys(this.state.fieldErrors).length !== 0 
            || (this.state.formState === "new" && !this.state.clonedData.serialNumber);
    }

    uploadedFileName() {
        let name = "";
        if (this.state.uploadedFile === undefined) {
            if (this.clonedDataExists()) {
                name = this.state.clonedData.attachment;
            } else {
                name = this.props.item.attachment;
            }
        } else {
            name = this.state.uploadedFile.name;
        }

        return this._truncate(name);
    }

    _truncate(string) {
        if (!string) {
            return "";
        }

        const maxLength = 25;

        return (string.length > maxLength) ? string.substr(0, maxLength-1) + '...' : string;
    }

    render() {
        const isEditMode = this.state.formState === "edit";
        const isDelMode = this.state.formState === "delete";
        const isNew = this.state.formState === "new";
        const isSaving = this.state.formState === "saving";
        const showErrorHeader = this.state.failedToSave;
        const isSaveDisabled = this.isSaveDisabled();
    
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
                        handleSaveDelete={this.handleSaveDelete}/>;
        } else if (isSaving) {
            header = <FeedItemProgressHeader />
        } else {
            header = <FeedItemFormHeader 
                        handleEditState={() => { this.setState({formState: "edit"}); }} 
                        handleDelState={() => { this.setState({formState: "delete"}); }}
                        handleCollapse={this.props.onCollapse}/>;
        }
    
        const item = this.clonedDataExists() ? this.state.clonedData : this.props.item;
        
        return (
            <div>
                {header}
                {showErrorHeader && <FeedItemErrorHeader />}
                <FeedItemForm 
                    item={item}
                    uploadedFileName={this.uploadedFileName()}
                    formState={this.state.formState}
                    dateFormat={DATE_FORMAT}
                    fieldErrors={this.state.fieldErrors}
                    handleItemChange={(e) => { this.handleItemChange(e.target.id, e.target.value); }}
                    handleDateChange={this.handleDateChange}
                    handleFileUpload={this.handleFileUpload}
                    handleCancelFileUpload={this.handleCancelFileUpload}
                />
                {!item.isNew && <FeedItemDefaultFooter createdOn={item.createdAt} updatedOn={item.updatedAt} footerType="uncollapsed"/>}
            </div>
        );
    }
}

export default FeedItemUncollapsed;