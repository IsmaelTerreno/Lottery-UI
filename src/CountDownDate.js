import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './CountDownDate.scss';

const mapNumber = (number, in_min, in_max, out_min, out_max) => {
  return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

const describeArc = (x, y, radius, startAngle, endAngle) => {

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}

class CountDownDate extends React.Component {
	state = {
		days: undefined,
		hours: undefined,
		minutes: undefined,
		seconds: undefined
	}
	
	componentDidMount() {
    const processTime = () => {
			const { timeTillDate, timeFormat } = this.props;
			const eventTime = moment(timeTillDate, timeFormat);
			const currentTime = moment();
			const diffTime = moment(eventTime - currentTime);
			const countdown = moment.duration(diffTime);
			const days = countdown.days();
			const hours = countdown.hours() ;
			const minutes = countdown.minutes();
			const seconds = countdown.seconds();

			this.setState({ days, hours, minutes, seconds });
		};
    processTime();
		this.interval = setInterval(processTime, 1000);
	}

	componentWillUnmount() {
		if(this.interval) {
			clearInterval(this.interval);
		}
	}
	
	render() {
		const { days, hours, minutes, seconds } = this.state;
		const daysRadius = mapNumber(days, 30, 0, 0, 360);
		const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
		const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
		const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

		if(!seconds) {
			return null;
		}
		
		return (
			<div className={"countdown-main " + this.props.classNameCustom}>
				<h1 className="countdown-title">Next draw countdown</h1>
				<div className='countdown-wrapper'>
					<div className='countdown-item'>
						<SVGCircle radius={daysRadius} />
						{days}
						<span>days</span>
					</div>
					<div className='countdown-item'>
						<SVGCircle radius={hoursRadius} />
						{hours}
						<span>hours</span>
					</div>
					<div className='countdown-item'>
						<SVGCircle radius={minutesRadius} />
						{minutes}
						<span>minutes</span>
					</div>
					<div className='countdown-item'>
						<SVGCircle radius={secondsRadius} />
						{seconds}
						<span>seconds</span>
					</div>
				</div>
			</div>
		);
	}
}

const SVGCircle = ({ radius }) => (
	<svg className='countdown-svg'>
		<path fill="none" stroke="#333" strokeWidth="4" d={describeArc(50, 50, 48, 0, radius)}/>
	</svg>
);

CountDownDate.defaultProps = {
  timeFormat: "MM DD YYYY, h:mm a",  
};

CountDownDate.propTypes = {
  timeTillDate: PropTypes.string,
  timeFormat: PropTypes.string,
  classNameCustom: PropTypes.string,
};

export default CountDownDate;
