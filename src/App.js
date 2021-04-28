import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import Navbar from "./Components/Layout/Navbar";
import Users from "./Components/Users/Users";
import Search from "./Components/Users/Search";

import "./App.css";

class App extends Component {
	state = {
		users: [],
		loading: false,
	};

	static PropTyes = {
		searchUsers: PropTypes.func.isRequired,
	};

	// async componentDidMount() {
	// 	// console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);
	// 	this.setState({ loading: true });
	// }

	searchUsers = async text => {
		this.setState({ loading: true });
		// console.log(text);

		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		console.log(res.data.items);

		this.setState({ users: res.data.items, loading: false });
	};

	render() {
		return (
			<div className='App'>
				<Navbar title='Github ID Finder' />
				{/* <UserItem /> */}
				<Search searchUsers={this.searchUsers} />
				<div className='container'>
					<Users loading={this.state.loading} users={this.state.users} />
				</div>
			</div>
		);
	}
}

export default App;
