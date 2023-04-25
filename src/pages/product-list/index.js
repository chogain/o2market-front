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

// json 데이터 불러오기
// fetch("http://localhost:5500/api/v1/products")
//   .then((res) => res.json())
//   .then((items) => {
//     items.forEach((item) => {
//       console.log(Object.keys(items).length);
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//   });

fetch("http://localhost:5500/api/v1/products")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    // data.forEach((item) => {
    //   console.log(Object.keys(datas).length);
    //   if (!data.length) {
    //     container.innerHTML = "해당하는 상품이 없습니다.";
    //   }
    //   container.insertAdjacentHTML(
    //     "beforeend",
    //     `<article class="product pointer">
    //       <div>
    //         <img src="${item.imageUrl}" alt="${item.productName}" />
    //       </div>
    //       <h3 class="product-name">${item.productName}</h3>
    //       <p class="product-price">${addComma(parseInt(item.price))}</p>
    //     </article>
    //   `,
    //   );
    // });
  });

// function putitemCard(datas) {
//   container.innerHTML = "";
//   console.log(Object.keys(datas).length);
//   countProduct.innerHTML = Object.keys(datas).length;
//   datas.forEach((obj) => {
//     container.insertAdjacentHTML(
//       "beforeend",
//       `<article class="product pointer">
//         <div>
//           <img src="${obj.imageUrl}" alt="${obj.productName}" />
//         </div>
//         <h3 class="product-name">${obj.productName}</h3>
//         <p class="product-price">${addComma(parseInt(obj.price))}</p>
//       </article>
//     `,
//     );
//   });
// }
