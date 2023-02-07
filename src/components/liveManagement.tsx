import React from 'react';
import { LiveCategory } from '../utils/enums';
import { LiveManagementStateType } from '../utils/types';
import { LiveTable } from './liveTable';

const tabs = [
  LiveCategory.OnSchedule,
  LiveCategory.Live,
  LiveCategory.Finished,
  LiveCategory.Canceled
];

export class LiveManagement extends React.Component<{}, LiveManagementStateType> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentTab: tabs[0]
    }

    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(e: any) {
    this.setState({
      currentTab: e.target.value
    });
  }

  render() {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row gap-1">
          {tabs.map(tab => (
            <button
              key={tab}
              className="w-120 right-3 p-3 rounded-lg bg-slate-200 cursor-pointer hover:shadow-md transition-all"
              onClick={this.changeTab}
              value={tab}
            >
              {tab}
            </button>
          ))}
        </div>
        <LiveTable currentTab={this.state.currentTab} />
      </div>
    )
  }
}
