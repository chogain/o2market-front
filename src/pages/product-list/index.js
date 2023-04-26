const $ = (selector) => document.querySelector(selector);

// 생성한 태그 삽입할 컨테이너
const container = $("#productContainer");
const countProduct = $("p");
// 버튼
const filterTotal = $("#total-btn");
const filterVegetable = $("#vegetable-btn");
const filterFruit = $("#fruit-btn");
const sortNew = $("#new-btn");
const sortHighPrice = $("#higt-price-btn");
const sortLowPrice = $("#low-price-btn");
const sortABC = $("#abc-btn");

if (window.location.href == "http://localhost:5500/api/v1/products") {
  fetch("http://localhost:5500/api/v1/products")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        console.log(Object.keys(data).length);
        if (!data.length) {
          container.innerHTML = "해당하는 상품이 없습니다.";
        }
        container.insertAdjacentHTML(
          "beforeend",
          `<article class="product pointer">
          <div>
            <img src="${item.imageUrl}" alt="${item.productName}" />
          </div>
          <h3 class="product-name">${item.productName}</h3>
          <p class="product-price">${addComma(parseInt(item.price))}</p>
        </article>
      `,
        );
        countProduct.innerHTML = container.childElementCount;
      });
    });
} else if (window.location.href == "http://localhost:5500/api/v1/products?category=1") {
  fetch("http://localhost:5500/api/v1/products?category=1")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        console.log(Object.keys(data).length);
        if (!data.length) {
          container.innerHTML = "해당하는 상품이 없습니다.";
        }
        container.insertAdjacentHTML(
          "beforeend",
          `<article class="product pointer">
          <div>
            <img src="${item.imageUrl}" alt="${item.productName}" />
          </div>
          <h3 class="product-name">${item.productName}</h3>
          <p class="product-price">${addComma(parseInt(item.price))}</p>
        </article>
      `,
        );
        countProduct.innerHTML = container.childElementCount;
      });
    });
} else if (
  (window.location.href == window.location.href) ==
  "http://localhost:5500/api/v1/products?category=1"
) {
  fetch("http://localhost:5500/api/v1/products?category=2")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        console.log(Object.keys(data).length);
        if (!data.length) {
          container.innerHTML = "해당하는 상품이 없습니다.";
        }
        container.insertAdjacentHTML(
          "beforeend",
          `<article class="product pointer">
        <div>
          <img src="${item.imageUrl}" alt="${item.productName}" />
        </div>
        <h3 class="product-name">${item.productName}</h3>
        <p class="product-price">${addComma(parseInt(item.price))}</p>
      </article>
    `,
        );
        countProduct.innerHTML = container.childElementCount;
      });
    });
}
filterVegetable.addEventListener("click", () => {
  // 새로운 CSS 파일 경로
  var cssFilePath = "./index.css";
ß
  // 새로운 페이지로 이동
  location.href = "http://localhost:5500/api/v1/products?category=1";

  // 새로운 페이지에서도 사용할 CSS 파일 로드
  var head = document.getElementsByTagName("head")[0];
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = cssFilePath;
  head.appendChild(link);

  fetch("http://localhost:5500/api/v1/products?category=1")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});

// 새로운 CSS 파일 경로
var cssFilePath = "./index.css";

// 새로운 페이지로 이동
location.href = "http://localhost:5500/api/v1/products?category=1";

// 새로운 페이지에서도 사용할 CSS 파일 로드
var head = document.getElementsByTagName("head")[0];
var link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = cssFilePath;
head.appendChild(link);

/* 가격에 ,(쉼표) 삽입 */
function addComma(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getProductList(apiUrl) {
  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      data.forEach((item) => {
        html += `<div>${item.name} - ${item.price}</div>`;
      });
      return html;
    });
}

const allButton = document.getElementById("allButton");
const vegetableButton = document.getElementById("vegetableButton");
const fruitButton = document.getElementById("fruitButton");
const productListDiv = document.getElementById("productList");

filterTotal.addEventListener("click", () => {
  const apiUrl = "http://product";

  getProductList(apiUrl).then((html) => {
    productListDiv.innerHTML = html;
  });
});

filterVegetable.addEventListener("click", () => {
  const apiUrl = "http://product?category=1";

  getProductList(apiUrl).then((html) => {
    productListDiv.innerHTML = html;
  });
});

filterFruit.addEventListener("click", () => {
  const apiUrl = "http://product?category=2";

  getProductList(apiUrl).then((html) => {
    productListDiv.innerHTML = html;
  });
});

if (filterFruit === "http://localhost:5500/api/v1/products") {
  fetch("http://localhost:5500/api/v1/products")
    .then((reponse) => response.json())
    .then((datas) => {});
}

async function productList() {
  const container = $("#productContainer");
  const products = await 
}