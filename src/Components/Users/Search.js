import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
	state = {
		text: "",
	};

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	onSubmit = e => {
		e.preventDefault();
		if (this.state.text === "") {
			this.props.setAlert("Please Enter Something", "light");
		} else {
			this.props.searchUsers(this.state.text);
			this.setState({ text: "" });
		}
	};

	render() {
		const { showClear, clearUsers } = this.props;
		return (
			<div>
				<form onSubmit={this.onSubmit} className='form' style={searchStyle}>
					<input
						type='text'
						name='text'
						placeholder='Search Users....'
						value={this.state.text}
						onChange={this.onChange}
					/>
					<input
						type='submit'
						value='Search'
						className='btn btn-dark btn-block'
					/>
				</form>
				{showClear && (
					<button className='btn btn -light btn-block' onClick={clearUsers}>
						Clear
					</button>
				)}
			</div>
		);
	}

	static PropTyes = {
		searchUsers: PropTypes.func.isRequired,
		clearUsers: PropTypes.func.isRequired,
		showClear: PropTypes.bool.isRequired,
		setAlert: PropTypes.func.isRequired,
	};
}

const searchStyle = {
	display: "grid",
};

export default Search;
