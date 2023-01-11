import config from "./env";

const BASE_URL = config.api.baseUrl;

export var Server = {
	get: async function (url, isAuth, customOptions, customHeader) {
		var requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				...customHeader,
			},
		};
		if (customOptions)
			requestOptions = { ...requestOptions, ...customOptions };

		if (isAuth) {
			let token = localStorage.getItem("t_id");
			// console.log(token);
			requestOptions.headers["Authorization"] = `Bearer ${token}`;
			requestOptions.headers["x-auth-token"] = `Bearer ${token}`;
			// console.log("yesnext");
		}
		const a = await fetch(BASE_URL + url, requestOptions);
		// console.log(a);
		return await a.json();
	},

	getWithToken: async function (url, token, customOptions, customHeader) {
		var requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				...customHeader,
			},
		};
		if (customOptions)
			requestOptions = { ...requestOptions, ...customOptions };

		const a = await fetch(
			BASE_URL + url + `?token=${token}`,
			requestOptions
		);
		return await a.json();
	},

	post: async function (url, payload, isAuth, customOptions, customHeader) {
		var requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				...customHeader,
			},
			body: JSON.stringify(payload),
		};
		if (customOptions)
			requestOptions = { ...requestOptions, ...customOptions };
		if (isAuth) {
			let token = localStorage.getItem("t_id");
			requestOptions.headers["Authorization"] = `Bearer ${atob(token)}`;
			requestOptions.headers["x-auth-token"] = `Bearer ${atob(token)}`;
		}

		const a = await fetch(BASE_URL + url, requestOptions);
		// if (a.status === 200) {
		let jsonResponse = {};
		try {
			jsonResponse = await a.json();
		} catch (e) {
			console.log("unable to parse as json", e);
		}
		return jsonResponse;
		// } else {
		// 	let err = { http_error: a.status, response: a };
		// 	throw err;
		// }
	},

	put: async function (
		url,
		id,
		payload,
		isAuth,
		customOptions,
		customHeader
	) {
		var requestOptions = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				...customHeader,
			},
			body: JSON.stringify(payload),
		};
		if (customOptions)
			requestOptions = { ...requestOptions, ...customOptions };
		if (isAuth) {
			let token = localStorage.getItem("t_id");
			requestOptions.headers["Authorization"] = `Bearer ${atob(token)}`;
			requestOptions.headers["x-auth-token"] = `Bearer ${atob(token)}`;
		}

		const a = await fetch(BASE_URL + url + "/" + id, requestOptions);
		// if (a.status === 200) {
		let jsonResponse = {};
		try {
			jsonResponse = await a.json();
		} catch (e) {
			console.log("unable to parse as json", e);
		}
		return jsonResponse;
		// } else {
		// 	let err = { http_error: a.status };
		// 	throw err;
		// }
	},

	redirectPost: (url, data) => {
		var form = document.createElement("form");
		document.body.appendChild(form);
		form.method = "post";
		form.action = url;
		for (var name in data) {
			var input = document.createElement("input");
			input.type = "hidden";
			input.name = name;
			input.value = data[name];
			form.appendChild(input);
		}
		form.submit();
	},
};

export default Server;
