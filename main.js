let carts = document.querySelectorAll('.pr-bt');
// product details
let products = 
    [
        {
            name: 'Adidas Yeezy 350 V2',
            tag: 'a1',
            price: 8999,
            inCart: 0
        },
        {
            name: 'Adidas × Human Race NMD',
            tag: 'a2',
            price: 6999,
            inCart: 0
        },
        {
            name: 'Adidas × Overkill EQT',
            tag: 'a3',
            price: 7999,
            inCart: 0
        },
        {
            name: 'Adidas × Bape NMD',
            tag: 'a4',
            price: 12999,
            inCart: 0
        },
        {
            name: 'Nike × Sacai LDWaffle',
            tag: 'n1',
            price: 5999,
            inCart: 0
        },
        {
            name: 'Nike × Undercover Element',
            tag: 'n2',
            price: 7999,
            inCart: 0
        },
        {
            name: 'Nike Air Force 1',
            tag: 'n3',
            price: 4999,
            inCart: 0
        },
        {
            name: 'Nike × Acronym',
            tag: 'n4',
            price: 8999,
            inCart: 0
        },
        {
            name: 'Off-White × Air Jordan 1',
            tag: 'o1',
            price: 17999,
            inCart: 0
        },
        {
            name: 'Off-White × Nike Zoom',
            tag: 'o2',
            price: 8999,
            inCart: 0
        },
        {
            name: 'Off-White × Air Max 97',
            tag: 'o3',
            price: 12999,
            inCart: 0
        },
        {
            name: 'Off-White × Chuck Taylor',
            tag: 'o4',
            price: 7999,
            inCart: 0
        }
    ]
// click function
for(let i=0 ;i < carts.length ; i++)
{
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}
// to show cart value even if it is refreshed
function onLoadCartNumbers()
{
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers)
    {
        document.querySelector('.btn-number span').textContent = productNumbers;
    }
}
// to check the value of cart and keep on increasing it
function cartNumbers(product) {
    //console.log("the product clicked is", product);
    //to put value of productNumber in local storage
    let productNumbers = localStorage.getItem('cartNumbers');
    //returns NAN so to convert it into an integer
    productNumbers = parseInt(productNumbers);
    //first to check if null or not if not the increase the cart number
    if(productNumbers)
    {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.btn-number span').textContent = productNumbers + 1;
    }
    //if null then assign it number 1
    else
    {
       localStorage.setItem('cartNumbers', 1);
       document.querySelector('.btn-number span').textContent = 1; 
    }
    //to call new function which takes input from this cartNUmbers
    setItems(product);
}
//to check product is clicked once or more and increase its particular count
function setItems(product)
{
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null)
    {
        if(cartItems[product.tag] == undefined)
        {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else
    {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}

function totalCost(product)
{
    let cartCost = localStorage.getItem('totalCost');
    console.log("My cartcost is", cartCost);
    
    if(cartCost != null)
    {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    else
    {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart()
{
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.product-list');
    let cartCost = localStorage.getItem('totalCost');
    if(cartItems && productContainer)
    {
        //console.log("running");
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product-title">
                <img src="./images/${item.tag}.jpg" height="80px" width="80px" class="productContainer-image">
                <div class="productContainer-name">${item.name}</div>
            </div>
            <div class="price">₹${item.price}</div>
            <div class="quantity">
                <div class="productContainer-quantity">
                <ion-icon name="remove-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon name="add-circle"></ion-icon>
                </div>
            </div>
            <div class="total">
                ₹${item.inCart *  item.price}
            </div>
            `;
        });
        productContainer.innerHTML += `
        <div class="total-container">
            <h4 class="totalContainer-title">
                TOTAL
            </h4>
            <h4 class="totalContainer-price">
                ₹${cartCost}
            </h4>
        </div>
        `;
    }
}

function deleteItems() { 
            // Clear local storage items. 
            localStorage.clear(); 
            window.location.reload(true);
        } 

//to load it as soon as the script is run for getting the cartNumber
onLoadCartNumbers();
displayCart();