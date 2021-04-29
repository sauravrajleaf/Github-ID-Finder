import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import Navbar from "./Components/Layout/Navbar";
import Users from "./Components/Users/Users";
import Search from "./Components/Users/Search";
import Alert from "./Components/Layout/Alert";

import "./App.css";

class App extends Component {
	state = {
		users: [],
		loading: false,
		alert: null,
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

		// console.log(res.data.items);

		this.setState({ users: res.data.items, loading: false });
	};

	clearUsers = () => {
		this.setState({ users: [], loading: false });
	};

	setAlert = (msg, type) => {
		this.setState({ alert: { msg, type } });

		setTimeout(() => this.setState({ alert: null }), 3000);
	};

	render() {
		const { users, loading } = this.state;
		return (
			<div className='App'>
				<Navbar title='Github ID Finder' />
				<Alert alert={this.state.alert} />
				{/* <UserItem /> */}
				<Search
					searchUsers={this.searchUsers}
					clearUsers={this.clearUsers}
					showClear={users.length > 0 ? true : false}
					setAlert={this.setAlert}
				/>
				<div className='container'>
					<Users loading={loading} users={users} />
				</div>
			</div>
		);
	}

	// static PropTyes = {
	// 	searchUsers: PropTypes.func.isRequired,
	// };
}

export default App;
