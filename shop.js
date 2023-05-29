class Produkt {
    constructor(id, name, price, category) {
        this.id = id;  // maybe 1000, 1001 for a category, 2000, 2001... for other
        this.name = name;
        this.price = price;
        this.category = category;
    }
}
//WARNING
const categories = ['Kompjuter', 'Laptop', 'Smartphone', 'Aksesore', 'Televizor'];
let produkte = [];
/////////////////////////
let gjitheProduktet = []; //filter for ?search
/////////////////////////

function loadProducts(category) {
    return fetch('kategorite/' + category + '.json')
        .then(response => response.json())
        .then(data => {
            //WARNING
            produkte = data.map(item => new Produkt(item.id, item.name, item.price, category));
            return produkte;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
let productsLoaded = false;

//Asinkron
function loadAllProducts() {
    if (productsLoaded) {
        return Promise.resolve(gjitheProduktet);
    }

    const promises = categories.map(category => loadProducts(category));

    return Promise.all(promises)
        .then(products => {
            gjitheProduktet = products.flat(); //nga [][] ne []
            productsLoaded = true;
            return gjitheProduktet;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
function searchProducts(query) {
    if (query != "")
        document.getElementById('kategori-titull').innerHTML = 'Kerkim - ' + query;
    else
        document.getElementById('kategori-titull').innerHTML = 'Te gjitha produktet';
    const searchQuery = query.toLowerCase();
    const results = gjitheProduktet.filter(product => {
        const productName = product.name.toLowerCase();
        return productName.includes(searchQuery);
    });
    return results;
}

function searchAndShow() {
    const kerkimi = document.getElementById("searchBar").value;
    //maybe change current URL
    loadAllProducts()
        .then(() => {
            const results = searchProducts(kerkimi);
            showProducts(results);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
//Per nga faqet jashte shopping?
function searchNewTab() {
    const kerkimi = document.getElementById("searchBar").value;
    window.open('Produktet.html?kerkim=' + encodeURIComponent(kerkimi));
}
function searchNewTab(kerkimi) {
    loadAllProducts()
        .then(() => {
            const results = searchProducts(kerkimi);
            if (results.length > 0)
                showProducts(results);
            else
                skaRezultate();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
function skaRezultate() {
    const pList = document.getElementById('list-produktesh');

    //fshirje
    pList.innerHTML = '<br><h3>Nuk ka rezultate</h3>';

}
function showProducts(produkte) {
    const pList = document.getElementById('list-produktesh');

    //fshirje
    pList.innerHTML = '';

    //per performance
    const fragment = document.createDocumentFragment();
    //BEJ CSS TE KETYRE KLASAVE
    produkte.forEach(produkt => {
        //krijojme nje div dhe i japim klasen produkt
        const pContainer = document.createElement('div');
        pContainer.classList.add('produkt');
        //LINK!!!
        const pImage = document.createElement('img');
        //IMAZHET SIPAS ID
        pImage.alt = produkt.name;
        pImage.src = 'imagesShop/' + produkt.id + '.png'; //OTHER jpg,etc.?!?
        pImage.classList.add('imazhProdukti');
        //Imazhi si link
        pImage.addEventListener('click', function () {
            window.open('kategorite/' + produkt.category + '/' + produkt.name + '.html', '_blank');
        });
        pContainer.appendChild(pImage);

        const pName = document.createElement('p');
        pName.textContent = produkt.name;
        pContainer.appendChild(pName);

        const pPrice = document.createElement('p1');
        pPrice.textContent = produkt.price + ' Leke';
        pContainer.appendChild(pPrice);

        const pbDiv = document.createElement('div');
        pbDiv.classList.add('perButonat');


        const linkButton = document.createElement('button');
        linkButton.textContent = 'Shiko me teper';
        linkButton.classList.add('shikoMeTeper');
        linkButton.addEventListener('click', () => {
            window.open('kategorite/' + produkt.category + '/' + produkt.name + '.html', '_blank');
        });
        pbDiv.appendChild(linkButton);

        const addButton = document.createElement('button');
        addButton.textContent = 'Shto ';
        addButton.classList.add('shtoNeShporte');
        const iconElement = document.createElement('i');
        iconElement.classList.add('fa', 'fa-shopping-cart');

        // Append the icon to the addButton
        addButton.appendChild(iconElement);

        addButton.setAttribute('data-id', produkt.id); // Attach the id as a data attribute
        addButton.addEventListener('click', () => {
            shtoNeShporte(produkt.id);
        });
        pbDiv.appendChild(addButton);
        pContainer.appendChild(pbDiv);

        fragment.appendChild(pContainer);
    });

    pList.appendChild(fragment);
}

function shfaqKategorite() {
    document.getElementById('kategori-titull').innerHTML = 'Te gjitha kategorite';
    const pList = document.getElementById('kategori');
    //fshirje
    pList.innerHTML = '';

    const fragment = document.createDocumentFragment();

    const kMenu = document.createElement('h2');
    kMenu.innerHTML = 'Kategorite e mundshme';
    fragment.appendChild(kMenu);
    for (let i = 0; i < categories.length; i++) {
        //linqe me kategorite
        const kLink = document.createElement('a');
        kLink.classList.add('linkKategorie');
        kLink.innerHTML = categories[i];
        kLink.setAttribute('href', 'Produktet.html?kategoria=' + categories[i]);
        fragment.appendChild(kLink);
        fragment.appendChild(document.createElement('br'));
    }
    pList.appendChild(fragment);

}

function loadItAll() {
    const urlParams = new URLSearchParams(window.location.search);
    // 
    const categoryTitle = document.getElementById('kategori-titull');
    if (urlParams.has('kategoria')) {
        const category = urlParams.get('kategoria');
        if (category === "Kerkim") {
            categoryTitle.textContent += ' e kerkuara';
            ///
        } else if (categories.includes(category)) {
            categoryTitle.textContent += category;
            loadProducts(category)
                .then(produkte => {
                    showProducts(produkte);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
        else {
            categoryTitle.textContent = "ERROR 404\nKategoria nuk u gjet\nKategorite e vlefshme:";
            //
            shfaqKategorite();
            //
        }
    } else if (urlParams.has('kerkim')) {
        const queryKerkim = urlParams.get('kerkim');
        searchNewTab(queryKerkim);
    }
    else {
        shfaqKategorite();
        searchNewTab(''); //cheat code
    }
}



//SHPORTA

/*
    const firstProductId = produkte.length > 0 ? produkte[0].id : 0;

if(parseInt(inputId / 1000) != firstProductId)
    it ain't the same category (load another one)
    
 */

let shporta = [];
let totalPrice = 0;
////////////////////////////
function shtoNeShporte(id) {
    //Problem solved, but efficiency a bit down, isShopping, isCategory and isSearching booleans?
    const produktShporte = (gjitheProduktet.length < 1) ? produkte.find(produkt => produkt.id === id) : gjitheProduktet.find(produkt => produkt.id === id);
    if (produktShporte) {
        shporta.push(produktShporte);
        updateShporta();
        saveShportaToLocalStorage();
    }
}
function hiqNgaShporta(id) {
    for (let i = 0; i < shporta.length; i++) {
        if (shporta[i].id === id) {
            shporta.splice(i, 1);
            updateShporta();
            saveShportaToLocalStorage();
            break;
        }
    }
}

function updateShporta() {
    const cartItemsElement = document.getElementById('produktetNeShporte');
    const totalPriceElement = document.getElementById('cmimiTotal');
    //fshirje
    cartItemsElement.innerHTML = '';
    //const fragment = document.createDocumentFragment();
    //shtojme produktet
    shporta.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item.name + ' - ' + item.price;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Hiq nga shporta';
        removeButton.classList.add('hiqNgaShporta');
        //
        removeButton.setAttribute('data-id', item.id); // Attach the id as a data attribute
        //
        removeButton.addEventListener('click', () => {
            hiqNgaShporta(item.id);
        });
        listItem.appendChild(removeButton);

        cartItemsElement.appendChild(listItem);
    });
    //Llogarit cmimin
    totalPrice = 0;
    for (const item of shporta) {
        totalPrice += item.price;
    }
    totalPriceElement.textContent = 'TOTALI: ' + totalPrice.toFixed(2) + ' LEK';
}

//button shto ne shporte on clicked  .....

function saveShportaToLocalStorage() {
    localStorage.setItem('shporta', JSON.stringify(shporta));
}

function loadShportaFromLocalStorage() {
    const shportaRuajtur = localStorage.getItem('shporta');
    if (shportaRuajtur) {
        shporta = JSON.parse(shportaRuajtur);
        updateShporta();
    }
}

//