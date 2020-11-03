import React, { useContext, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { Searcher } from "./searcher";
import { Button } from "./bootstrap/button";
import { Context } from "../store/app-context";
import { isAdmin } from "../helpers/tools-helpers";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	let buttonManageUsersHTML = "";
	if (isAdmin(store.loggedUser.idRole) == true) {
		buttonManageUsersHTML = (
			<Fragment>
				<Link to="/manage-users">
					<Button label={"Manage Users"} color={"warning"} />
				</Link>
			</Fragment>
		);
	}

	let buttonIconHTML = (
		<img className="img-fluid" width="40" height="40" src={require("../../img/questioner.png")} alt="logo"></img>
	);
	let buttonMakeQuestionHTML = "";
	let searcherHTML = "";
	let buttonLogoutHTML = "";
	if (store.loggedUser.id !== null) {
		buttonIconHTML = (
			<Link to="/questions">
				<img
					className="img-fluid"
					width="40"
					height="40"
					src={require("../../img/questioner.png")}
					alt="logo"></img>
			</Link>
		);
		buttonMakeQuestionHTML = (
			<Fragment>
				<Link to="/add-question">
					<Button label={"Make Question"} color={"primary"} />
				</Link>
			</Fragment>
		);
		searcherHTML = <Searcher />;
		buttonLogoutHTML = (
			<Button label={"Logout"} color={"secondary"} icon={"fas fa-sign-out-alt"} onClick={logout} />
		);
	}

	async function logout() {
		const accessToken = localStorage.getItem("accessToken");
		actions.setLogoutUser();
		if (accessToken === null) {
			history.push("/");
		}

		localStorage.removeItem("accessToken");
		let json = await actions.fetchLogout();
		history.push("/");
	}

	return (
		<nav className="navbar navbar-expand-md navbar-light bg-light mb-3">
			{buttonIconHTML}
			<button
				className="navbar-toggler my-1"
				type="button"
				data-toggle="collapse"
				data-target="#menu-bar"
				aria-controls="menu-bar"
				aria-expanded="false"
				aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="menu-bar">
				<div className="navbar-nav float-right text-right pr-3 ml-auto">
					<div className="mr-2 my-1">{buttonManageUsersHTML}</div>
					<div className="mr-2 my-1">{searcherHTML}</div>
					<div className="mr-2 my-1">{buttonMakeQuestionHTML}</div>
					<div className="mr-2 my-1">{buttonLogoutHTML}</div>
				</div>
			</div>
		</nav>
	);
};
