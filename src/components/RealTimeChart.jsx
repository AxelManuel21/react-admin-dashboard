import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import * as time from 'd3-time';
import { timeFormat } from 'd3-time-format';
import { range, last } from 'lodash';

class RealTimeChart extends Component {
  constructor(props) {
    super(props);

    const date = new Date();
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    this.state = {
      dataA: range(100).map(i => ({
        x: time.timeMinute.offset(date, i * 30),
        y: 10 + Math.round(Math.random() * 20),
      })),
      dataB: range(100).map(i => ({
        x: time.timeMinute.offset(date, i * 30),
        y: 30 + Math.round(Math.random() * 20),
      })),
      dataC: range(100).map(i => ({
        x: time.timeMinute.offset(date, i * 30),
        y: 60 + Math.round(Math.random() * 20),
      })),
    };

    this.formatTime = timeFormat('%Y %b %d');
  }

  componentDidMount() {
    this.timer = setInterval(this.next, 100);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  next = () => {
    const { dataA, dataB, dataC } = this.state;

    const newDataA = dataA.slice(1);
    newDataA.push({
      x: time.timeMinute.offset(last(dataA).x, 30),
      y: 10 + Math.round(Math.random() * 20),
    });

    const newDataB = dataB.slice(1);
    newDataB.push({
      x: time.timeMinute.offset(last(dataB).x, 30),
      y: 30 + Math.round(Math.random() * 20),
    });

    const newDataC = dataC.slice(1);
    newDataC.push({
      x: time.timeMinute.offset(last(dataC).x, 30),
      y: 60 + Math.round(Math.random() * 20),
    });

    this.setState({
      dataA: newDataA,
      dataB: newDataB,
      dataC: newDataC,
    });
  };

  render() {
    const { dataA, dataB, dataC } = this.state;

    return (
      <Line
        margin={{ top: 30, right: 50, bottom: 60, left: 50 }}
        data={[
          { id: 'A', data: dataA },
          { id: 'B', data: dataB },
          { id: 'C', data: dataC },
        ]}
        xScale={{ type: 'time', format: 'native' }}
        yScale={{ type: 'linear', max: 100 }}
        axisTop={{
          format: '%H:%M',
          tickValues: 'every 4 hours',
        }}
        axisBottom={{
          format: '%H:%M',
          tickValues: 'every 4 hours',
          legend: `${this.formatTime(dataA[0].x)} ——— ${this.formatTime(last(dataA).x)}`,
          legendPosition: 'middle',
          legendOffset: 46,
        }}
        axisRight={{}}
        enablePoints={false}
        enableGridX={true}
        curve="monotoneX"
        animate={false}
        motionStiffness={120}
        motionDamping={50}
        isInteractive={false}
        enableSlices={false}
        useMesh={true}
        theme={{
        axis: { ticks: { text: { fontSize: 14 } } },
        grid: { line: { stroke: '#ddd', strokeDasharray: '1 2' } },
        }}
        />
        );
        }
        }
        
        export default RealTimeChart;