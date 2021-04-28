import React from "react";
import PropTypes from "prop-types";

import Useritem from "./UserItem";
import Spinner from "../Layout/Spinner";

const Users = ({ users, loading }) => {
	if (loading) {
		return (
			<div>
				<Spinner />
			</div>
		);
	} else {
		return (
			<div className='div' style={userStyle}>
				{users.map((user) => (
					<Useritem key={user.id} user={user} />
				))}
			</div>
		);
	}
};

Users.propTypes = {
	users: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
};

const userStyle = {
	display: "grid",
	gridTemplateColumns: "repeat(3,1fr)",
	gridGap: "1rem",
};

export default Users;
