console.log("index.js: loaded");

const heading = document.querySelector("h2");
const headingText = heading.textContent;
console.log(headingText);

const button = document.createElement("button");
button.textContent = "Push Me";
document.body.appendChild(button);

const main = () => {
	fetchUserInfo("candy12t");
};

const fetchUserInfo = userId => {
	fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
		.then(response => {
			if(!response.ok) {
				console.error("error response", response);
			} else {
				return response.json().then(userInfo => {
					const view = createView(userInfo);
					displayView(view);
				});
			}
		}).catch(error => {
			console.error(error);
		});
};

const createView = userInfo => {
	return escapeHTML`
	<h4>${userInfo.name} (@${userInfo.login})</h4>
	<img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
	<dl>
		<dt>Location</dt>
		<dd>${userInfo.location}</dd>
		<dt>Repositories</dt>
		<dd>${userInfo.public_repos}</dd>
	</dl>
	`;
};

const displayView = view => {
	const result = document.getElementById("result");
	result.innerHTML = view;
};

const escapeSpecialChars = str => {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
};

const escapeHTML = (strings, ...values) => {
	return strings.reduce((result, str, i) => {
		const value = values[i-1];
		if(typeof value === "string") {
			return result + escapeSpecialChars(value) + str;
		} else {
			return result + String(value) + str;
		}
	});
};


// const fetchUserInfo = userId => {
// 	fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
// 		.then(response => {
// 			console.log(response.status);
// 			if(!response.ok) {
// 				console.error("error response", response);
// 			} else {
// 				return response.json();
// 			}
// 		})
// 		.then(userInfo => console.log(userInfo))
// 		.catch(error => {
// 			console.error(error);
// 		});
// };
