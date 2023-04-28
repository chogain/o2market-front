// body 태그 아래 <header id="header"></header> 생성
export default async function Header() {
  const header = document.querySelector("header");

  header.innerHTML = `
    <div class="inner">
      
      <ul class="main-menu">
        <li class="item">
          <div class="item__name vegetable">  <a href="../../pages/product-list">채소</a></div>
          <div class="item__contents">
            <div class="contents__menu">
              <ul class="inner category">
                <li>
                  <h4>잎채소</h4>
                  <ul class="vegetable-category"></ul>
                </li>
                <li>
                  <h4>열매채소</h4>
                  <ul class="vegetable-category2"></ul>
                </li>
                <li>
                  <h4>뿌리채소</h4>
                  <ul class="vegetable-category3"></ul>
                </li>
                <li>
                  <h4>버섯</h4>
                  <ul class="vegetable-category4"></ul>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li class="item">
          <div class="item__name fruit"><a href="../../pages/product-list">과일</a></div>
          <div class="item__contents">
            <div class="contents__menu">
              <ul class="inner">
                <li>
                  <h4>생과일</h4>
                  <ul class="fruit-category"></ul>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
      
      <h1 class="logo">
        <span class="material-symbols-outlined">spo2</span>
        <a href="../../pages/main/index.html" class="title">O2마켓</a>
      </h1>
      

      <div class="sub-menu">
        <ul class="menu">
          <li>
            <a href="../../pages/login/index.html" id="login-btn" >로그인</a>
          </li>
          <li>
            <a href="../../pages/myPage/index.html" id="myPage-btn">마이페이지</a>
          </li>
          <li>
            <a href="../../pages/cart/index.html">장바구니</a>
          </li>
        </ul>
      </div>
    </div>
`;

  const productData = await getData();

  const vegetables = productData.filter((product) => product.category === 1); // 잎채소
  const vegetables2 = productData.filter((product) => product.category === 2); // 열매채소
  const vegetables3 = productData.filter((product) => product.category === 3); // 뿌리채소
  const vegetables4 = productData.filter((product) => product.category === 4); // 버섯
  const fruits = productData.filter((product) => product.category === 5); // 생과일

  const vegetableCategory = document.querySelector(".vegetable-category");
  const vegetableCategory2 = document.querySelector(".vegetable-category2");
  const vegetableCategory3 = document.querySelector(".vegetable-category3");
  const vegetableCategory4 = document.querySelector(".vegetable-category4");
  const fruitCategory = document.querySelector(".fruit-category");

  const vegetableProducts = vegetables.map(
    (vegetable) =>
      `
      <li>
        <a href="../../pages/product-list/index.html/${vegetable.productId} ">
          ${vegetable.productName.match(/^\D+/)}
        </a>
      </li>
    `,
  );

  vegetableCategory.innerHTML = vegetableProducts.join("");

  const vegetableProducts2 = vegetables2.map(
    (vegetable) =>
      `
      <li>
         <a href="../../pages/product-list/index.html/${vegetable.productId} ">
          ${vegetable.productName.match(/^\D+/)}
        </a>
      </li>
    `,
  );

  vegetableCategory2.innerHTML = vegetableProducts2.join("");

  const vegetableProducts3 = vegetables3.map(
    (vegetable) =>
      `
      <li>
         <a href="../../pages/product-list/index.html/${vegetable.productId} ">
          ${vegetable.productName.match(/^\D+/)}
        </a>
      </li>
    `,
  );

  vegetableCategory3.innerHTML = vegetableProducts3.join("");

  const vegetableProducts4 = vegetables4.map(
    (vegetable) =>
      `
      <li>
         <a href="../../pages/product-list/index.html/${vegetable.productId} ">
          ${vegetable.productName.match(/^\D+/)}
        </a>
      </li>
    `,
  );

  vegetableCategory4.innerHTML = vegetableProducts4.join("");

  const fruitProducts = fruits.map(
    (fruit) =>
      `
      <li>
        <a href="../../pages/product-list/index.html/${fruit.productId}">
          ${fruit.productName.match(/^\D+/)}
        </a>
      </li>
    `,
  );
  fruitCategory.innerHTML = fruitProducts.join("");
}

async function getData() {
  let response = await fetch("http://localhost:5500/api/v1/products");
  let data = await response.json();
  return data;
}

async function handleCategory() {
  const productData = await getData();
  console.log("productData : ", productData);

  const vegetable = productData.filter((product) => product.category === 1);
  const fruit = productData.filter((product) => product.category === 5);

  const vegetableCategory = document.querySelector("#vegetable-category");
  const fruitCategory = document.querySelector("#fruit-category");
}

// handleCategory();
