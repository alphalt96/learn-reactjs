import React from 'react';

import client from '../utils/client';
import { LiveManagementStateType, LiveStateType } from '../utils/types';
import temoraryImage from '../assets/1.jpeg';
import { Pagination } from './pagination';
import { LiveCategory } from '../utils/enums';

const tableCols = [
  'ID', 'Title', 'Status'
];

const pageSize = 8;

export class LiveTable extends React.Component<LiveManagementStateType, LiveStateType> {
  constructor(props: any) {
    super(props);

    this.state = {
      lives: [],
      currentPage: 1,
      totalCount: 1
    }

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount(): void {
    client.getLivesByCategory(
      this.props.currentTab as LiveCategory,
      this.state.currentPage,
      pageSize
    ).then((data) => {
      this.setState((state, props) => ({
        lives: data.data,
        totalCount: data.pagination.totalCount
      }));
    })
  }

  componentDidUpdate(prevProps: Readonly<LiveManagementStateType>, prevState: Readonly<LiveStateType>): void {
    if (
      prevProps.currentTab !== this.props.currentTab ||
      prevState.currentPage !== this.state.currentPage 
    ) {
      let requestPageIndex = 1;

      if (prevState.currentPage !== this.state.currentPage) {
        requestPageIndex = this.state.currentPage;
      }

      client.getLivesByCategory(
        this.props.currentTab as LiveCategory,
        requestPageIndex,
        pageSize
      ).then(data => {
        this.setState({
          lives: data.data,
          totalCount: data.pagination.totalCount,
          currentPage: requestPageIndex
        });
      });
    }
  }

  handlePageChange(pageIndex: number) {
    this.setState({
      currentPage: pageIndex
    });
  }

  render() {
    return (
      <div>
        <table 
          className="table-auto w-full mb-20"
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
        <Pagination
          totalCount={this.state.totalCount}
          pageSize={8}
          currentPage={this.state.currentPage}
          siblingCount={4}
          onPageChange={this.handlePageChange}
        />
      </div>
    )
  }
}
