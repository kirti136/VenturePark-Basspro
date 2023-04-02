let cont2Products = document.getElementById("cont2-products");
let totalProducts = document.getElementById("totalProducts");

let sortByPrice = document.getElementById("sortByPrice")
let womensData = []

fetch("../Scripts/womens.json")
  .then((res) => {
    return res.json();
  })
  .then((actualData) => {
    // console.log(actualData);
    womensData = actualData
    showData(actualData);
    totalProducts.innerText = actualData.length;
  })
  .catch((err) => {
    console.log(err);
  });

function showData(data) {
  data.forEach((element, index) => {
    let card = document.createElement("div");

    let imgdiv = document.createElement("div");
    imgdiv.setAttribute("id", "imgdiv");

    let image = document.createElement("img");
    image.setAttribute("src", element.image);

    let name = document.createElement("p");
    name.innerText = element.name;

    let discountPrice = document.createElement("p");
    discountPrice.innerText = "$" + element.discountPrice;

    let originalPrice = document.createElement("s");
    originalPrice.innerText = "$" + element.originalPrice;

    let button = document.createElement("button");
    button.innerText = "Add to Cart";

    button.addEventListener("click", () => {
      let cartData = JSON.parse(localStorage.getItem("cart-data"));
      if (cartData === null) {
        cartData = [];
      }

      let isAlreadyInCart = false;

      for (let i = 0; i < cartData.length; i++) {
        if (cartData[i].id === element.id) {
          isAlreadyInCart = true;
          break;
        }
      }
      if (isAlreadyInCart === true) {
        alert("Product is already in Cart.");
      } else {
        cartData.push(element);
        localStorage.setItem("cart-data", JSON.stringify(cartData));
        alert("Prodct successfully added to Cart.");
      }
    });
    imgdiv.append(image);
    card.append(imgdiv, name, discountPrice, originalPrice, button);
    cont2Products.append(card);
  });
}


// sortByPrice.addEventListener("change",()=>{
//   if(sortByPrice.value === "highToLow" ){
//       womensData = womensData.sort((a,b)=> b.originalPrice - a.originalPrice)
//       showData(womensData);
//   }else if(sortByPrice.value === "lowToHigh"){
//     womensData = womensData.sort((a,b)=> a.originalPrice - b.originalPrice);
//     showData(womensData);
//   }else{
//     showData(womensData);
//   }
// })