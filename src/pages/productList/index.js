const $ = (selector) => document.querySelector(selector);
const $All = (selector) => document.querySelectorAll(selector);

// 생성한 태그 삽입할 컨테이너
const container = $("#productContainer");
const countProduct = $("p");
// 버튼
const filterTotal = $("#total-btn");
const filterVegetable = $("#vegetable-btn");
const filterFruit = $("#fruit-btn");
const leafBtn = $("#leaf-vegetable-btn");
const rootBtn = $("#root-vegetable-btn");
const mushroomBtn = $("#mushroom-btn");
const sortNew = $("#new-btn");
const sortHighPrice = $("#higt-price-btn");
const sortLowPrice = $("#low-price-btn");
const sortABC = $("#abc-btn");

// const http = "http://localhost:5500";
const http = "";

/* DB에 저장된 모든 상품을 불러와 신상품순으로 정렬(기본) */
fetch(`${http}/api/v1/products`)
  .then((res) => res.json())
  .then((datas) => {
    console.log(datas);
    const sortedData = datas.sort((a, b) => b.productId - a.productId);
    insertData(sortedData);
    renderProductList(sortedData);
  });

/* html에 상품 정보 삽입하는 함수 */
function insertData(datas) {
  container.innerHTML = "";
  countProduct.innerHTML = datas.length;
  datas.forEach(({ productName, price, imageUri }) => {
    container.innerHTML += `
    <article class="product pointer">
      <div>
        <img src="${imageUri}" alt="${productName}" />
      </div>
      <h3 class="product-name">${productName}</h3>
      <p class="product-price">${addComma(price)}</p>
    </article>
  `;
  });
}

/* 버튼 css 토글하는 함수 */
function toggleClass(findhaveClass, El, willtoggledClass) {
  $(findhaveClass).classList.remove(willtoggledClass);
  El.classList.add(willtoggledClass);
}

/* 카테고리 필터해서 필터된 데이터 반환하는 함수 */
function categoryFilter(button, category, findhaveClass, El, willtoggledClass) {
  button.addEventListener("click", () => {
    toggleClass(findhaveClass, El, willtoggledClass);

    fetch(`${http}/api/v1/products`)
      .then((res) => res.json())
      .then((datas) => {
        container.innerHTML = "";
        const dataBox = datas.filter((data) => {
          return data.category === category;
        });
        toggleClass(".font", sortNew, "font");
        const sortedData = dataBox.sort((a, b) => b.productId - a.productId);
        insertData(sortedData);
        renderProductList(sortedData);
      });
  });
}

/* 카테고리 찾아 필터된 데이터 리턴하는 함수 */
function categoryData(category) {
  return fetch(`${http}/api/v1/products`)
    .then((res) => res.json())
    .then((datas) => {
      const dataBox = datas.filter((data) => {
        return data.category === category;
      });
      return dataBox;
    });
}

// 전체버튼 클릭시 이벤트 등록
filterTotal.addEventListener("click", () => {
  fetch(`${http}/api/v1/products`)
    .then((res) => res.json())
    .then((datas) => {
      toggleClass(".bg-darkgreen", filterTotal, "bg-darkgreen");
      toggleClass(".font", sortNew, "font");
      insertData(datas);
    });
});

/* 카테고리 클릭 시 해당하는 데이터만 필터링하는 이벤트 등록 */
categoryFilter(leafBtn, 1, ".bg-darkgreen", leafBtn, "bg-darkgreen");
categoryFilter(filterVegetable, 2, ".bg-darkgreen", filterVegetable, "bg-darkgreen");
categoryFilter(rootBtn, 3, ".bg-darkgreen", rootBtn, "bg-darkgreen");
categoryFilter(mushroomBtn, 4, ".bg-darkgreen", mushroomBtn, "bg-darkgreen");
categoryFilter(filterFruit, 5, ".bg-darkgreen", filterFruit, "bg-darkgreen");

async function findCategory() {
  let dataBox;
  if (filterTotal.classList.contains("bg-darkgreen")) {
    const res = await fetch(`${http}/api/v1/products`);
    const datas = await res.json();
    dataBox = datas;
  } else if (leafBtn.classList.contains("bg-darkgreen")) {
    dataBox = await categoryData(1);
  } else if (filterVegetable.classList.contains("bg-darkgreen")) {
    dataBox = await categoryData(2);
  } else if (rootBtn.classList.contains("bg-darkgreen")) {
    dataBox = await categoryData(3);
  } else if (mushroomBtn.classList.contains("bg-darkgreen")) {
    dataBox = await categoryData(4);
  } else {
    dataBox = await categoryData(5);
  }
  return dataBox;
}

/* 정렬 방식 클릭 시 카테고리 확인 후 해당하는 데이터만 정렬하는 이벤트 등록 */
const sortData = async (sortedTag, sortFunc) => {
  toggleClass(".font", sortedTag, "font");
  const foundCategory = await findCategory();
  const sortedData = foundCategory.sort(sortFunc);
  insertData(sortedData);
  renderProductList(sortedData);
};

sortNew.addEventListener("click", () =>
  sortData(sortNew, (a, b) => b.productId - a.productId),
);
sortHighPrice.addEventListener("click", () =>
  sortData(sortHighPrice, (a, b) => b.price - a.price),
);
sortLowPrice.addEventListener("click", () =>
  sortData(sortLowPrice, (a, b) => a.price - b.price),
);
sortABC.addEventListener("click", () =>
  sortData(sortABC, (a, b) => a.productName.localeCompare(b.productName)),
);

/* 가격에 ,(쉼표) 삽입 */
function addComma(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// function findProductId(data) {
//   const products = $All(".product");
//   console.log(products.length);
//   for (let i = 0; i < products.length; i++) {
//     products[i].addEventListener("click", () => {
//       const productId = data[i].productId;
//       console.log(productId);
//     });
//     window.location.href = "../product-detail/index.html";
//   }
// }

function renderProductList(data) {
  const products = $All(".product");
  for (let i = 0; i < products.length; i++) {
    products[i].addEventListener("click", () => {
      const productId = data[i].productId;
      console.log(productId);
      window.location.href = `../product-detail/index.html?productId=${productId}`;
    });
  }
}
