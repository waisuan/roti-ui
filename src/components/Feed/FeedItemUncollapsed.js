import React, { Component } from 'react';
import dayjs from 'dayjs';
import { withRouter } from "../../utils/WithRouter";

import FeedItemFormHeader from './FeedItemFormHeader';
import FeedItemEditHeader from './FeedItemEditHeader';
import FeedItemDeleteHeader from './FeedItemDeleteHeader';
import FeedItemDefaultFooter from './FeedItemDefaultFooter';
import FeedItemForm from './FeedItemForm';
import FeedItemProgressHeader from './FeedItemProgressHeader';
import FeedItemErrorHeader from './FeedItemErrorHeader';

import API from '../../api/FeedApi';

const DATE_FORMAT = 'YYYY-MM-DD';

class FeedItemUncollapsed extends Component {
    constructor(props) {
        super(props);
        this.state = this.defaultState();

        this.handleCancel = this.handleCancel.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSaveEdit = this.handleSaveEdit.bind(this);
        this.handleSaveDelete = this.handleSaveDelete.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleCancelFileUpload = this.handleCancelFileUpload.bind(this);
        this.handleFileDownload = this.handleFileDownload.bind(this);
    }

    defaultState() {
        return {
            formState: this.defaultFormState(),
            prevFormState: "",
            fieldErrors: {},
            clonedData: {},
            failedToSave: false,
            uploadedFile: undefined,
            fileHasChanged: false
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.formState === "saving") {
            if (!prevState.failedToSave &&
                !this.state.failedToSave && 
                this.props.item.hasError) {
                // This block handles changing the state after an unsuccessful save.
                this.revertStateDueToErr();
            } 
            else if ((prevProps.item.version || 0) < this.props.item.version) {
                // This block handles changing the state after a successful save.
                this.resetState();
            }
        }
    }

    handleCancel() {
        this.props.onCancel();
        this.resetState();
    }

    handleSaveEdit() {
        if (!this.clonedDataExists()) {
            this.handleCancel();
            return;
        }
    
        this.props.onSaveEdit(this.state.clonedData, this.state.uploadedFile);
        
        if (this.state.formState === "new") {
            this.setSavingState("new");
        } else {
            this.setSavingState("edit");
        }
    }

    handleSaveDelete() {
        this.props.onSaveDelete();
        this.setSavingState("delete");
    }

    setSavingState(sourceAction) {
        this.setState({
            formState: "saving", 
            prevFormState: sourceAction, 
            failedToSave: false
        });
    }

    revertStateDueToErr() {
        this.setState({
            formState: this.state.prevFormState, 
            prevFormState: "",
            failedToSave: true
        });
    }

    resetState() {
        this.setState(this.defaultState());
    }

    handleDateChange(rawDate, fieldName) {
        const date = dayjs(rawDate, DATE_FORMAT).format(DATE_FORMAT);
        if (date === "Invalid Date") {
            if (!this.state.fieldErrors.hasOwnProperty(fieldName)) {
                this.setState(prevState => ({
                    fieldErrors: {...prevState.fieldErrors, [fieldName]: date}
                }));
            }
        } else if (this.state.fieldErrors.hasOwnProperty(fieldName)) {
            const tmp = {...this.state.fieldErrors};
            delete tmp[fieldName];
            this.setState({fieldErrors: tmp});
        }

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
        this.setState({uploadedFile: file, fileHasChanged: true});
        this.handleItemChange("attachment", file.name);
    }

    handleCancelFileUpload() {
        this.setState({uploadedFile: undefined});
        this.handleItemChange("attachment", "");
    }

    handleFileDownload() {
        if (!this.fileIsDownloadable()) {
            return;
        }

        // TODO handle errors
        this.setState(prevState => ({
            prevFormState: prevState.formState, 
            formState: "downloading"
        }), () => {
            API.downloadFile(this.props.item.serialNumber, this.props.item.attachment)
                .then(res => {
                    if (res) {
                        // Create blob link to download
                        const link = document.createElement('a');
                        link.href = window.URL.createObjectURL(res);
                        link.setAttribute('download', this.props.item.attachment);
                    
                        // Start download
                        link.click();
                    }

                    this.setState(prevState => ({
                        formState: prevState.prevFormState,
                        prevFormState: ""
                    }));
                });
        });
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
        if (this.clonedDataExists()) {
            name = this.state.clonedData.attachment;
        } else {
            name = this.props.item.attachment;
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

    fileIsDownloadable() {
        return Boolean(this.props.item.attachment) && !this.state.fileHasChanged;
    }

    redirectToLog=()=> {
        this.props.navigate(`/log/${this.props.item.serialNumber}`);
    }

    render() {
        const isEditMode = this.state.formState === "edit";
        const isDelMode = this.state.formState === "delete";
        const isNew = this.state.formState === "new";
        const isLoading = this.state.formState === "saving" || this.state.formState === "downloading";
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
        } else if (isLoading) {
            header = <FeedItemProgressHeader />
        } else {
            header = <FeedItemFormHeader 
                        handleEditState={() => { this.setState({formState: "edit"}); }} 
                        handleDelState={() => { this.setState({formState: "delete"}); }}
                        handleCollapse={this.props.onCollapse}
                        redirectToLog={this.redirectToLog} />;
        }
    
        const item = this.clonedDataExists() ? this.state.clonedData : this.props.item;
        
        // TODO maybe pass a file-specific hash instead of separate values ?
        return (
            <div>
                {header}
                {showErrorHeader && <FeedItemErrorHeader />}
                <FeedItemForm 
                    item={item}
                    uploadedFileName={this.uploadedFileName()}
                    fileIsDownloadable={this.fileIsDownloadable()}
                    formState={this.state.formState}
                    dateFormat={DATE_FORMAT}
                    fieldErrors={this.state.fieldErrors}
                    handleItemChange={(e) => { this.handleItemChange(e.target.id, e.target.value); }}
                    handleDateChange={this.handleDateChange}
                    handleFileUpload={this.handleFileUpload}
                    handleCancelFileUpload={this.handleCancelFileUpload}
                    handleFileDownload={this.handleFileDownload}
                />
                {!item.isNew && <FeedItemDefaultFooter createdOn={item.createdAt} updatedOn={item.updatedAt} footerType="uncollapsed"/>}
            </div>
        );
    }
}

export default withRouter(FeedItemUncollapsed);