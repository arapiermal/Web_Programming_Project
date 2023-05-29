if (document.getElementById("searchButton")) {
	document.getElementById("searchButton").addEventListener("click", searchFromMain);
}
if (document.getElementById("search-input")) {
	document.getElementById("search-input").addEventListener("keypress", function (event) {
		if (event.key === "Enter") {
			searchFromMain();
		}
	});
}


function searchFromMain() {
	const kerkimi = document.getElementById("search-input").value;
	window.open('Produktet.html?kerkim=' + encodeURIComponent(kerkimi));
}

