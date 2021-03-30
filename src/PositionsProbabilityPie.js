import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';
const TYPE_OTHER_TICKETS = 'TYPE_OTHER_TICKETS';
const TYPE_YOUR_TICKETS = 'TYPE_OTHER_TICKETS';
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, payload, percent, value, color, type } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#fff">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={color}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={color}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={color} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={color} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#fff">{`${value} Ticket${value > 1 ? 's':''}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#fff">
        {`${(type === TYPE_YOUR_TICKETS) ? 'Chance of winning' : 'Chance of others'} ${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    width: '100%', 
    height: 300
  },
}));

const PositionsProbabilityPie = ({totalPositions, countPosition}) => {
  const classes = useStyles();
  const data = [
    { name: 'Your tickets', value: countPosition, color: '#fbc509', type: TYPE_YOUR_TICKETS},
    { name: 'Others tickets', value: totalPositions, color: '#ececec', type: TYPE_OTHER_TICKETS },
  ];
  const [ activeIndex, setActiveIndex ] = useState(0);
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return(
    <div className={classes.root}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

PositionsProbabilityPie.defaultProps = {
  totalPositions: 0,
  countPosition: 0,
};

PositionsProbabilityPie.propTypes = {
  totalPositions: PropTypes.number,
  countPosition: PropTypes.number,
};

export default PositionsProbabilityPie;
