import React from 'react';
import _ from 'lodash';

class ErrorBoundary extends React.Component {
	state = {};

	componentDidUpdate(prevProps) {
		if (this.state.error && !_.isEqual(this.props, prevProps)) {
			this.setState({ error: undefined, errorInfo: undefined });
		}
	}

	componentDidCatch(error, errorInfo) {
		this.setState({ error, errorInfo });
	}

	render() {
		if (this.state.errorInfo) {
			return <h1>{this.state.errorInfo}</h1>;
		}
		return this.props.children;
	}
}

ErrorBoundary.propTypes = {
	children: React.Children,
};

export default ErrorBoundary;
