import React, { Fragment, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./Components/Layout/Navbar";
import Users from "./Components/Users/Users";
import Search from "./Components/Users/Search";
import Alert from "./Components/Layout/Alert";
import About from "./Components/Pages/About";
import User from "./Components/Users/User";

import "./App.css";

const App = () => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);

	const searchUsers = async text => {
		setLoading(true);
		// console.log(text);

		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		// console.log(res.data);

		setUsers(res.data.items);
		setLoading(false);
	};

	//GET A SINGLE GITHUB USER
	const getUser = async username => {
		setLoading(true);

		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		// console.log(res.data);

		setUser(res.data);
		setLoading(false);
	};

	//GET USERS REPOS
	const getUserRepos = async username => {
		setLoading(true);

		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		// console.log(res.data);

		setRepos(res.data);
		setLoading(false);
	};

	const clearUsers = () => {
		setUsers([]);
		setLoading(false);
	};

	const showAlert = (msg, type) => {
		setAlert({ msg, type });

		setTimeout(() => setAlert(null), 3000);
	};

	return (
		<Router>
			<div className='App'>
				<Navbar title='Github ID Finder' />
				<div className='container'>
					<Alert alert={alert} />
					<Switch>
						<Route
							exact
							path='/'
							render={props => (
								<Fragment>
									<Search
										searchUsers={searchUsers}
										clearUsers={clearUsers}
										showClear={users.length > 0 ? true : false}
										setAlert={showAlert}
									/>

									<Users loading={loading} users={users} />
								</Fragment>
							)}
						/>
						<Route exact path='/about' component={About} />
						<Route
							exact
							path='/user/:login'
							render={props => (
								<User
									{...props}
									getUser={getUser}
									getUserRepos={getUserRepos}
									repos={repos}
									user={user}
									loading={loading}
								/>
							)}
						/>
					</Switch>
				</div>
			</div>
		</Router>
	);
};

export default App;
