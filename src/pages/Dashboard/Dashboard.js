import React, { PropTypes } from 'react';
import PageTitle from '../../components/PageTitle';
import DashboardBox from '../../components/DashboardBox';
import Donut from '../../components/Donut';
import ClusterStore from '../../stores/ClusterStore';
import _ from 'lodash';

class Dashboard extends React.Component {

  static propTypes = {
    nodes: PropTypes.array.isRequired,
    frameworks: PropTypes.array.isRequired,
    stats: PropTypes.object.isRequired
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  cpuStats() {
    let stats = this.props.stats;
    let cpuFree = stats.cpusTotal - stats.cpusUsed;
    return ([
      {name: '已使用', count: _.round(stats.cpusUsed, 2), color: 'red'},
      {name: '闲置', count: _.round(cpuFree, 2), color: 'green'}
    ]);
  }

  memoryStats() {
    let stats = this.props.stats;
    let memoryFree = stats.memTotal - stats.memUsed;
    return ([
      {name: '已使用', count: ClusterStore.convertMBtoGB(stats.memUsed), color: 'red'},
      {name: '闲置', count: ClusterStore.convertMBtoGB(memoryFree), color: 'green'}
    ]);
  }

  diskStats() {
    let stats = this.props.stats;
    let diskFree = stats.diskTotal - stats.diskUsed;
    return ([
      {name: '已使用', count: ClusterStore.convertMBtoGB(stats.diskUsed), color: 'red'},
      {name: '闲置', count: ClusterStore.convertMBtoGB(diskFree), color: 'green'}
    ]);
  }

  taskStats() {
    let stats = this.props.stats;
    return ([
      {name: '运行中', count: stats.tasksRunning, color: 'green'},
      {name: '等待中', count: stats.tasksStaging, color: 'amber'}
    ]);
  }

  nodeStats() {
    let stats = this.props.stats;
    return ([
      {name: '已连接', count: stats.slavesConnected, color: 'green'},
      {name: '已断开', count: stats.slavesDisconnected, color: 'red'}
    ]);
  }

  render() {
    let title = '集群展示板';
    this.context.onSetTitle(title);
    return (
      <div>
        <PageTitle title={title} />
        <div className="row">
          <DashboardBox title="处理器使用量">
            <Donut title="总共处理器数" data={this.cpuStats()} />
          </DashboardBox>

          <DashboardBox title="内存使用量">
            <Donut title="总共内存(GB)" data={this.memoryStats()} />
          </DashboardBox>

          <DashboardBox title="磁盘使用量">
            <Donut title="总共磁盘(GB)" data={this.diskStats()} />
          </DashboardBox>

          <DashboardBox title="任务">
            <Donut title="总共任务" data={this.taskStats()} />
          </DashboardBox>

          <DashboardBox title="节点">
            <Donut title="总共节点数" data={this.nodeStats()} />
          </DashboardBox>
        </div>
      </div>
    );
  }

}

export default Dashboard;
