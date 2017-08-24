
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
import { changeSelectedTab } from '../actions/dashboardActions';
import { connect } from 'react-redux';
import EventViewTabData from './EventViewTabData';
class EventViewTab extends Component {
    constructor(props) {
        super(props);
        this.createTab = this.createTab.bind(this);
        this.createTabs = this.createTabs.bind(this);
        this.createTabsContent = this.createTabsContent.bind(this);
        this.segregateSourceData = this.segregateSourceData.bind(this);
    }
    segregateSourceData(tabName, data) {
        let elements = [];
        console.log(Object.keys(data));
        for (let key of Object.keys(data)) {
            if (key.indexOf(tabName.toLowerCase()) != -1 && !(tabName=='PSP-Paper')) {
                elements.push(<EventViewTabData name={tabName} key={tabName} details={data[key]} />)
            } else if ((key.indexOf('subscriberDetails') != -1) && tabName == 'Contract Details') {
                elements.push(<EventViewTabData name={tabName} key={tabName} details={data[key]} />)
            } else if ((key.indexOf('errorDetails') != -1) && tabName == 'Error Details') {
               elements.push(<EventViewTabData name={tabName} key={tabName} details={data[key]} />)
            }else if ((key.indexOf('paper') != -1) && tabName=='PSP-Paper') {
               elements.push(<EventViewTabData name={tabName} key={tabName} details={data[key]} />)
            }
        }
        return elements;
    }
    createTabsContent(tabNames, tabData) {
        let elementTabs = [];
        if (tabNames !== undefined) {
            for (var i = 0; i < tabNames.length; i++) {
                elementTabs.push(<TabContent for={tabNames[i]} key={tabNames[i]}>
                    {this.segregateSourceData(tabNames[i], tabData)}
                </TabContent>);
            }
            return elementTabs;
        }
    }

    createTabs(tabNames) {
        if (tabNames !== undefined)
            return tabNames.map(this.createTab);
    }
    createTab(tabName) {
        return <TabLink to={tabName} key={tabName}>{tabName} </TabLink>;
    }

    render() {
        if (this.props.eventData !== undefined) {
            return (
                <div >
                    <Tabs
                        name="sourceTab"
                        className="tabs tabs-1"
                        handleSelect={this.changeSelectedTab}
                        selectedTab={this.props.sourceTab} >
                        <div className="tab-links">
                            {this.createTabs(this.props.eventData.source)}
                            {this.createTabsContent(this.props.eventData.source, this.props.eventData)}
                        </div>
                    </Tabs>

                </div>
            );
        }
        else {
            return null;
        }
    }
}
EventViewTab.propTypes = {
};
export default connect((state) => state,
    { changeSelectedTab })(EventViewTab);

