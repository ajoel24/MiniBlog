import { asyncHTTP } from "./asyncHTTP";
import { ui } from "./ui";

/**
 ** Main file
 */

/**
 ** API endpoint
 */
const API_URL = "http://localhost:3000/posts";

/**
 ** Event listeners
 */
document.addEventListener("DOMContentLoaded", getPosts);
ui.btnPost.addEventListener("click", addPosts);
document.querySelector("#posts").addEventListener("click", deletePosts);
document.querySelector("#posts").addEventListener("click", editStatePosts);
document.querySelector(".card-panel").addEventListener("click", cancelEdit);
/**
 ** Fetches posts from API server
 * @method asyncHTTP.get(url) Makes a HTTP GET request
 * @method ui.showPosts(data) Displays the posts
 * @method ui.showToast(msg) Displays a toast message
 * @returns {void}
 */
function getPosts() {
	asyncHTTP
		.get(API_URL)
		.then(data => ui.showPosts(data))
		.catch(err => ui.showToast("Some error occured :( Try again"));
}

/**
 ** Creates a new post and adds it to the API JSON file
 * @method asyncHTTP.post(url,data) Makes a HTTP POST request
 * @method ui.showToast(msg) Displays a toast message
 * @method ui.clearFields() Clears the form fields
 * @see getPosts()
 * @returns {void}
 */
function addPosts() {
	const title = ui.ipPostTitle.value;
	const body = ui.ipPostBody.value;
	const id = ui.ipPostID.value;

	let postJSON = {
		title,
		body
	};

	if (title != "" && body != "") {
		if (id === "") {
			asyncHTTP
				.post(API_URL, postJSON)
				.then(() => {
					ui.showToast("Post added!");
					ui.changeState("add");
					getPosts();
				})
				.catch(() => ui.showToast("Some error occured :("));
		} else {
			asyncHTTP
				.put(`${API_URL}/${id}`, postJSON)
				.then(() => {
					ui.showToast("Post updated!");
					ui.clearFields();
					getPosts();
				})
				.catch(() => ui.showToast("Some error occured :("));
		}
	} else {
		ui.showToast("Post is empty!");
	}
}

/**
 ** Deletes a post from the API JSON file
 * @param {Event} e The event object
 * @method asyncHTTP.delete(url) Makes a HTTP DELETE request
 * @method ui.showToast(msg) Displays a toast message
 * @see getPosts()
 * @returns {void}
 */
function deletePosts(e) {
	e.preventDefault();
	if (e.target.parentElement.classList.contains("delete")) {
		if (confirm("Are you sure you want to delete this post?")) {
			let id = e.target.parentElement.dataset.id;
			asyncHTTP
				.delete(`${API_URL}/${id}`)
				.then(() => {
					ui.showToast("Post deleted!");
					getPosts();
				})
				.catch(() => ui.showToast("Something went wrong"));
		}
	}
}

/**
 * Changes the state to Edit and edits the post
 * @param {Event} e The Event object
 * @method ui.fillFields(currentPostJSON) Converts form fields to Edit state
 * @returns {void}
 */
function editStatePosts(e) {
	if (e.target.parentElement.classList.contains("edit")) {
		let currentPostTitle =
			e.target.parentElement.parentElement.parentElement.parentElement
				.previousElementSibling.previousElementSibling.firstElementChild
				.textContent;
		let currentPostBody =
			e.target.parentElement.parentElement.parentElement.parentElement
				.previousElementSibling.firstElementChild.innerText;
		let currentPostID = e.target.parentElement.dataset.id;

		let currentPostJSON = {
			id: currentPostID,
			title: currentPostTitle,
			body: currentPostBody
		};

		ui.fillFields(currentPostJSON);
	}
}

function cancelEdit(e) {
	if (e.target.classList.contains("post-cancel")) {
		ui.changeState("add");
	}
	e.preventDefault();
}
