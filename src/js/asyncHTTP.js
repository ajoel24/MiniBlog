"use strict";
/**
 * * Updating EasyHTTP v2.0 with Async/Await
 * * Changed library name to AsyncHTTP
 * @version 3.0
 * @author Andrew Joel
 * @license Public
 * @fileoverview Implements HTTP requests using async/await
 */

/**
 * * Async makes the function a Promise
 * * Await waits until async function returns something (Fetch)
 * * So no need to pass resolve and reject
 * * The caller function should use then() and catch()
 */

/**
 ** Class for defining HTTP requests
 * @exports HTTP requests
 * @version 1.0
 */
class AsyncHTTP {
	/**
	 * Creates a HTTP GET request
	 * @param {URL} url The API endpoint of the HTTP request
	 * @returns {Promise} The response JSON of the HTTP request
	 */
	async get(url) {
		const GetResponse = await fetch(url, {
			method: "GET"
		});
		const GetResponseText = await GetResponse.json();
		return GetResponseText;
	}

	/**
	 * Creates a HTTP POST request
	 * @param {URL} url The API endpoint of the HTTP request
	 * @param {JSON} data The data to be sent using HTTP POST request
	 * @returns {Promise} The response JSON of the HTTP request
	 */
	async post(url, data) {
		const PostResponse = await fetch(url, {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(data)
		});

		const PostResponseText = await PostResponse.json();
		return PostResponseText;
	}

	/**
	 * Creates a HTTP PUT request
	 * @param {URL} url The API endpoint of the HTTP request
	 * @param {JSON} data The data to be sent using HTTP POST request
	 * @returns {Promise} The response JSON of the HTTP request
	 */
	async put(url, data) {
		const PutResponse = await fetch(url, {
			method: "PUT",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(data)
		});

		const PutResponseText = await PutResponse.json();
		return PutResponseText;
	}

	/**
	 * Creates a HTTP DELETE request
	 * @param {URL} url The API endpoint of the HTTP request
	 * @returns {Promise} The response JSON of the HTTP request
	 */
	async delete(url) {
		const DeleteResponse = await fetch(url, {
			method: "DELETE"
		});

		const DeleteResponseText = await DeleteResponse.json();
		return DeleteResponseText;
	}
}

export const asyncHTTP = new AsyncHTTP();
