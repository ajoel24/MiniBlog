import Materialize from "../../node_modules/materialize-css/dist/js/materialize";

/**
 ** Handles the User Interface
 * @fileoverview Contains the UI controller functions for
 * mainpulating the DOM
 *
 * @author Andrew Joel
 * @version 1.0
 * @exports UI controllers
 * @requires MaterializeCSS
 */
class UI {
	constructor() {
		this.ipPostTitle = document.querySelector("#post-title");
		this.ipPostBody = document.querySelector("#post-body");
		this.btnPost = document.querySelector("#post-submit");
		this.divPosts = document.querySelector("#posts");
		this.ipPostID = document.querySelector("#post-id");
		this.formState = "add";
	}

	/**
	 * Displays posts from the API server
	 * @param {JSON} data The posts fetched from API server
	 * @returns {void}
	 */
	showPosts(data) {
		let postHTML = "";
		data.forEach(post => {
			postHTML += `
        <div class="row">
          <div class="col s10 offset-s1 m6 offset-m3">
            <div class="card-large card-panel blue">
              <div class="card-content white-text" id="post-display">
                <span class="card-title">
                  <h3>${post.title}</h3>
                </span>
                <div class="row">
                  <div class="col s10 offset-s1 m8 offset-m2">
                    ${post.body}
                  </div>
                </div>
                <div class="row">
                  <div class="card-action">
                    <div class="col s1 m1">
                        <a href="#" class="edit" data-id=${post.id}>
                          <i class="small material-icons white">mode_edit</i>
                        </a>
                      </div>
                      <div class="col s3 m2 offset-s1">
                        <a href="#" class="delete" data-id=${post.id}>
                          <i class="small material-icons white">delete</i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
		});
		this.divPosts.innerHTML = postHTML;
	}

	/**
	 * Creates a toast message
	 * @param {string} message The message to be displayed in toast
	 * @returns {void}
	 */
	showToast(message) {
		Materialize.toast({
			html: message,
			displayLength: 2000,
			inDuration: 300,
			outDuration: 300,
			activationPercent: 0.8
		});
	}

	/**
	 * Clears the form fields
	 */
	clearFields() {
		this.ipPostTitle.value = "";
		this.ipPostBody.value = "";
	}

	/**
	 * Fills the form fields with current edit post
	 * @param {JSON} postJSON The JSON data of current post
	 * @returns {void}
	 */
	fillFields(postJSON) {
		this.ipPostID.value = postJSON.id;
		this.ipPostTitle.value = postJSON.title;
		this.ipPostBody.value = postJSON.body;
		this.changeState("edit");
	}

	/**
	 * Changes the form state
	 * @param {string} type The state of the form
	 */
	changeState(type) {
		if (type === "edit") {
			this.btnPost.className =
				"btn btn-large white blue-text col s6 m6 l4 offset-s3 offset-m3 offset-l4";
			this.btnPost.innerHTML = `Update Post<i class="material-icons right">mode_edit</i>`;
			this.addCancelButton(this.btnPost);
		} else if (type === "add") {
			this.btnPost.className =
				"btn btn-large white black-text col s4 m4 l2 offset-s4 offset-m4 offset-l5";
			this.btnPost.innerHTML = `Post It<i class="material-icons right">note_add</i>`;
			this.removeCancelButton();
			this.clearFields();
			this.clearIDField();
		}
	}

	addCancelButton(btn) {
		const btnCancel = document.createElement("button");
		btnCancel.className = btn.className;
		btnCancel.classList.add("post-cancel");
		btnCancel.classList.replace("white", "red");
		btnCancel.classList.replace("blue-text", "white-text");
		btnCancel.innerHTML = `Cancel<i class="material-icons right">cancel</i>`;

		const parent = btn.parentElement;
		const formEnd = document.querySelector("#form-end");
		parent.insertBefore(btnCancel, formEnd);
	}

	removeCancelButton() {
		if (document.querySelector(".post-cancel"))
			document.querySelector(".post-cancel").remove();
	}

	clearIDField() {
		this.ipPostID.value = "";
	}
}

export const ui = new UI();
