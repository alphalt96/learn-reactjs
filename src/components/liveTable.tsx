import React from 'react';

import client from '../utils/client';
import { LiveManagementStateType, LiveStateType } from '../utils/types';
import temoraryImage from '../assets/1.jpeg';

const tableCols = [
  'ID', 'Title', 'Status'
];

export class LiveTable extends React.Component<LiveManagementStateType, LiveStateType> {
  constructor(props: any) {
    super(props);

    this.state = {
      lives: []
    }
  }

  componentDidMount(): void {
    this.setState((state, props) => ({
      lives: client.getLivesByCategory(this.props.currentTab)
    }));
  }

  componentDidUpdate(prevProps: Readonly<LiveManagementStateType>, prevState: Readonly<LiveStateType>): void {
    if (prevProps.currentTab !== this.props.currentTab) {
      const updatedLiveList = client.getLivesByCategory(this.props.currentTab);
      this.setState({
        lives: updatedLiveList
      });
    }
  }

  render() {
    return (
      <div>
        <table 
          className="table-auto w-full"
        >
          <thead>
            <tr>
              {tableCols.map((colName) => {
                return (
                  <th
                    key={colName}
                    className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-500 text-left"
                  >{colName}</th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {this.state.lives.map(live => {
              return (
                <tr key={live.id}>
                  <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{live.id}</td>
                  <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{live.title}</td>
                  <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{live.status}</td>
                  <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                    {/* temopary disabled */}
                    {/* {live.image} */}
                    <img
                      className="w-14 h-12 rounded-lg"
                      src={temoraryImage} alt="live-photo"
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
