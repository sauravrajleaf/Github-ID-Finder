import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Spinner from "../Layout/Spinner";

class User extends Component {
	componentDidMount() {
		this.props.getUser(this.props.match.params.login);
	}

	render() {
		const {
			name,
			avatar_url,
			location,
			bio,
			blog,
			company,
			website,
			login,
			html_url,
			followers,
			following,
			public_repos,
			public_gists,
			hireable,
		} = this.props.user;

		const { loading } = this.props;

		if (loading) return <Spinner />;
		else {
			return (
				<Fragment>
					<Link to='/' className='btn btn-ligt'>
						Back To Search
					</Link>
					Hireable :{" "}
					{hireable ? (
						<i className='fas fa-check text-success' />
					) : (
						<i className='fas fa-times-circle text-danger' />
					)}
					<div className='card grid-2'>
						<div className='all-center'>
							<img
								src={avatar_url}
								alt=''
								className='round-img'
								style={{ width: "150px" }}
							/>
							<h1>{name}</h1>
							<p>location: {location}</p>
						</div>
						<div>
							{bio && (
								<Fragment>
									<h3>Bio</h3>
									{bio}
								</Fragment>
							)}
							<a href={html_url} className='btn btn-dark my-1'>
								Visit My Github Profile
							</a>
							<ul>
								<li>
									{login && (
										<Fragment>
											<strong>Username:</strong> {login}
										</Fragment>
									)}
								</li>
								<li>
									{company && (
										<Fragment>
											<strong>Company:</strong> {company}
										</Fragment>
									)}
								</li>
								<li>
									{blog && (
										<Fragment>
											<strong>Blog Website:</strong> {blog}
										</Fragment>
									)}
								</li>
							</ul>
						</div>
					</div>
					<div className='card text-center'>
						<div className='badge badge-primary'>Followers: {followers}</div>
						<div className='badge badge-success'>Following: {following}</div>
						<div className='badge badge-light'>
							Public Repos: {public_repos}
						</div>
						<div className='badge badge-dark'>Public Gists: {public_gists}</div>
					</div>
				</Fragment>
			);
		}
	}

	static propTypes = {
		loading: PropTypes.bool.isRequired,
		user: PropTypes.object.isRequired,
		getUser: PropTypes.func.isRequired,
	};
}

export default User;
