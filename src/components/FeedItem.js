import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

import FeedItemUncollapsed from './FeedItemUncollapsed';
import FeedItemCollapsed from './FeedItemCollapsed';
import './FeedItem.css';

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
        return (
            <Paper className="feedItem">
                {
                    this.state.itemState === "collapsed" ?
                        <FeedItemCollapsed item={this.props.item} onUncollapse={this.handleUncollapse}/>
                    :
                        <FeedItemUncollapsed
                            item={this.props.item}
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