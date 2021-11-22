import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

import FeedItemUncollapsed from './FeedItemUncollapsed';
import FeedItemCollapsed from './FeedItemCollapsed';

class FeedItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showState: "collapsed"
        };

        this.handleCollapse = this.handleCollapse.bind(this);
        this.handleUncollapse = this.handleUncollapse.bind(this);
    }

    handleCollapse() {
        this.setState({showState: "collapsed"});
    }

    handleUncollapse() {
        this.setState({showState: "uncollapsed"});
    }

    render() {
        const isNew = this.props.itemState === "new";
        const isCollapsed = (this.state.showState === "collapsed" && !isNew) 
                            || this.props.itemState === "deleted";
        const shouldElevate = isNew ? 5 : 1;

        return (
            <Paper className="feedItem" elevation={shouldElevate}>
                {
                    isCollapsed ?
                        <FeedItemCollapsed item={this.props.item} onUncollapse={this.handleUncollapse}/>
                    :
                        <FeedItemUncollapsed
                            item={this.props.item}
                            itemState={this.props.itemState}
                            onSaveEdit={this.props.onSaveEdit}
                            onSaveDelete={this.props.onSaveDelete}
                            onCancel={this.props.onCancel}
                            onCollapse={this.handleCollapse}
                        />
                }
            </Paper>
        );
    }
}

export default FeedItem;