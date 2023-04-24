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
    <article class="product pointer">
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
function toggleClass(findhaveClass, El, willtoggledClass) {
  $(findhaveClass).classList.remove(willtoggledClass);
  El.classList.add(willtoggledClass);
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
categoryFilter(filterVegetable, 1, ".bg-darkgreen", filterVegetable, "bg-darkgreen");
categoryFilter(filterFruit, 2, ".bg-darkgreen", filterFruit, "bg-darkgreen");

async function findCategory() {
  let dataBox;
  if (filterTotal.classList.contains("bg-darkgreen")) {
    const res = await fetch("product.json");
    const datas = await res.json();
    dataBox = datas;
  } else if (filterVegetable.classList.contains("bg-darkgreen")) {
    dataBox = await categoryData(1);
  } else if (filterFruit.classList.contains("bg-darkgreen")) {
    dataBox = await categoryData(2);
  }
  return dataBox;
}

// 정렬 방식 클릭 시 카테고리 확인 후 해당하는 데이터만 정렬하는 이벤트 등록
const sortData = async (sortedTag, sortFunc) => {
  toggleClass(".font", sortedTag, "font");
  const foundCategory = await findCategory();
  const sortedData = foundCategory.sort(sortFunc);
  insertData(sortedData);
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
