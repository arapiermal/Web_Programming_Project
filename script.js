// script.js
document.addEventListener("DOMContentLoaded", function () {
    var productContainer = document.getElementById("product-container");

    // Product data
    var products = [
        {
            name: "Computer 1",
            image: "computer1.jpg",
            description: "Description of Computer 1"
        },
        {
            name: "Computer 2",
            image: "computer2.jpg",
            description: "Description of Computer 2"
        },
        {
            name: "IPhone14promax",
            image: "phone1.jpg",
            description: "Description of Phone 1"
        },
        {
            name: "Phone 2",
            image: "phone2.jpg",
            description: "Description of Phone 2"
        },
        {
            name: "Accessory 1",
            image: "accessory1.jpg",
            description: "Description of Accessory 1"
        },
        {
            name: "Accessory 2",
            image: "accessory2.jpg",
            description: "Description of Accessory 2"
        }
    ];

    // Generate product items
    for (var i = 0; i < products.length; i++) {
        var product = products[i];

        var productItem = document.createElement("div");
        productItem.classList.add("product-item");

        var productImage = document.createElement("img");
        productImage.src = product.image;

        var productName = document.createElement("h2");
        productName.textContent = product.name;

        var productDescription = document.createElement("p");
        productDescription.textContent = product.description;

        productItem.appendChild(productImage);
        productItem.appendChild(productName);
        productItem.appendChild(productDescription);

        productContainer.appendChild(productItem);
    }
});
