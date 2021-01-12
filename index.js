console.log("index.js: loaded");

const heading = document.querySelector("h2");
const headingText = heading.textContent;
console.log(headingText);

const button = document.createElement("button");
button.textContent = "Push Me";
document.body.appendChild(button);

const userId = "candy12t";
fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
	.then(response => {
		console.log(response.status);
		return response.json().then(userInfo => {
			console.log(userInfo);
		});
	});

// fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
// 	.then(response => {
// 		console.log(response.status);
// 		return response.json();
// 	})
// 	.then(userInfo => console.log(userInfo));
