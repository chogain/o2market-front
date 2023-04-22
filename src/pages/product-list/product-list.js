// 생성한 태그 삽입할 컨테이너
const container = document.getElementById("productContainer");
const countProduct = document.querySelector("p");
// 버튼
const headerVegetable = document.querySelectorAll(".item__name")[0];
const headerFruit = document.querySelectorAll(".item__name")[1];
const filterTotal = document.getElementById("total-btn");
const filterVegetable = document.getElementById("vegetable-btn");
const filterFruit = document.getElementById("fruit-btn");
const sortNew = document.getElementById("new-btn");
const sortHighPrice = document.getElementById("higt-price-btn");
const sortLowPrice = document.getElementById("low-price-btn");
const sortABC = document.getElementById("abc-btn");

// json 데이터 불러오기
fetch("product.json")
  .then((res) => res.json())
  .then((datas) => {
    insertData(datas);
  });

// 상품 생성하여 html에 삽입하는 함수
function insertData(datas) {
  container.innerHTML = "";
  countProduct.innerHTML = datas.length;
  datas.forEach(({ productName, description, price, imageUrl }) => {
    container.innerHTML += `
    <article class="product">
      <div>
        <img src="${imageUrl}" alt="${description}" />
      </div>
      <h3 class="product-name">${productName}</h3>
      <p class="product-price">${price}</p>
    </article>
  `;
  });
}

// 클릭한 버튼 css 토글하는 함수
function toggleClass(className1, El, className2) {
  document.querySelector(className1).classList.remove(className2);
  El.classList.add(className2);
}

// 카테고리 필터해서 필터된 데이터 반환하는 함수
function categoryFilter(button, category, className1, El, className2) {
  button.addEventListener("click", () => {
    toggleClass(className1, El, className2);

    fetch("product.json")
      .then((res) => res.json())
      .then((datas) => {
        container.innerHTML = "";
        const dataBox = datas.filter((data) => {
          return data.categoryType === category;
        });
        return insertData(dataBox);
      });
  });
}

// 카테고리 찾아 필터된 데이터 리턴하는 함수
function categoryData(category) {
  return fetch("product.json")
    .then((res) => res.json())
    .then((datas) => {
      const dataBox = datas.filter((data) => {
        return data.categoryType === category;
      });
      return dataBox;
    });
}

// 전체버튼 클릭시 이벤트 등록
fetch("product.json")
  .then((res) => res.json())
  .then((datas) =>
    filterTotal.addEventListener("click", () => {
      toggleClass(".bg-darkgreen", filterTotal, "bg-darkgreen");
      insertData(datas);
    }),
  );

// 카테고리 클릭 시 해당하는 데이터만 필터링하는 이벤트 등록
categoryFilter(filterVegetable, "채소", ".bg-darkgreen", filterVegetable, "bg-darkgreen");
categoryFilter(filterFruit, "과일", ".bg-darkgreen", filterFruit, "bg-darkgreen");

async function findCategory() {
  let dataBox;
  if (filterTotal.classList.contains("bg-darkgreen")) {
    const res = await fetch("product.json");
    const datas = await res.json();
    dataBox = datas;
  } else if (filterVegetable.classList.contains("bg-darkgreen")) {
    dataBox = await categoryData("채소");
  } else if (filterFruit.classList.contains("bg-darkgreen")) {
    dataBox = await categoryData("과일");
  }
  return dataBox;
}

// 정렬 방식 클릭 시 카테고리 확인 후 해당하는 데이터만 정렬하는 이벤트 등록
sortNew.addEventListener("click", async () => {
  toggleClass(".font", sortNew, "font");
  const foundCategory = await findCategory();
  const sortedData = foundCategory.sort((a, b) => b.productId - a.productId);
  insertData(sortedData);
});

sortHighPrice.addEventListener("click", async () => {
  toggleClass(".font", sortHighPrice, "font");
  const foundCategory = await findCategory();
  const sortedData = foundCategory.sort((a, b) => b.price - a.price);
  insertData(sortedData);
});

sortLowPrice.addEventListener("click", async () => {
  toggleClass(".font", sortLowPrice, "font");
  const foundCategory = await findCategory();
  const sortedData = foundCategory.sort((a, b) => a.price - b.price);
  insertData(sortedData);
});

sortABC.addEventListener("click", async () => {
  toggleClass(".font", sortABC, "font");
  const foundCategory = await findCategory();
  const sortedData = foundCategory.sort((a, b) =>
    a.productName.localeCompare(b.productName),
  );
  insertData(sortedData);
});
