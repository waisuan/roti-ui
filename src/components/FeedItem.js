import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

import FeedItemUncollapsed from './FeedItemUncollapsed';
import FeedItemCollapsed from './FeedItemCollapsed';

class FeedItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemState: "collapsed"
        };

        this.handleCollapse = this.handleCollapse.bind(this);
        this.handleUncollapse = this.handleUncollapse.bind(this);
    }

    handleCollapse() {
        this.setState({itemState: "collapsed"});
    }

    handleUncollapse() {
        this.setState({itemState: "uncollapsed"});
    }

    render() {
        const isCollapsed = this.state.itemState === "collapsed" && !this.props.isNew;
        const shouldElevate = this.props.isNew ? 5 : 1;

        return (
            <Paper className="feedItem" elevation={shouldElevate}>
                {
                    isCollapsed ?
                        <FeedItemCollapsed item={this.props.item} onUncollapse={this.handleUncollapse}/>
                    :
                        <FeedItemUncollapsed
                            item={this.props.item}
                            isNew={this.props.isNew}
                            onCancel={this.props.onCancel}
                            onSaveEdit={this.props.onSaveEdit}
                            onItemChange={this.props.onItemChange}
                            onSaveDelete={this.props.onSaveDelete}
                            onCollapse={this.handleCollapse}
                        />
                }
            </Paper>
        );
    }
}

export default FeedItem;