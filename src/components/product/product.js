const mainProductSlide = document.querySelector("#product-recommendation-slide");

async function getData() {
  let response = await fetch("/api/v1/products");
  let data = await response.json();
  return data;
}

export default async function ProductCard() {
  const productData = await getData();

  console.log("productData: ", productData);
  // #product-container 선택 후 js로 동적으로 내용 삽입
  const productTemplate = `
    <section id="product-container">
      <h2 class="title">이 상품 어때요?</h2>
      <div class="carousel-wrapper">
        <ul class="card-container slides">
      </div>
       <div class="prev">
      <span class="material-symbols-outlined">
        chevron_left
      </span>
    </div>
    <div class="next">
      <span class="material-symbols-outlined">
        chevron_right
      </span>
    </div>
    </section>

   
  `;

  const productCardList = productData.map(
    (product) =>
      `<li class="product">
        <a href="../../pages/product-detail/index.html/${product.productId}">
          <div><img src=${product.imageUri} alt=${product.description}></div>
          <h3 class="product-name">${product.productName}</h3>
          <p class="product-price">${product.price}</p>
        </a>
      </li>`,
  );

  mainProductSlide.innerHTML = productTemplate;
  const cardContainer = mainProductSlide.querySelector(".card-container");
  cardContainer.innerHTML = productCardList.join("");
  handleProductCarousel();
}

function handleProductCarousel() {
  let slides = document.querySelector(".slides");
  let slide = document.querySelectorAll(".slides li");
  let prevBtn = document.querySelector(".prev");
  let nextBtn = document.querySelector(".next");

  // 현재 슬라이드의 인덱스를 저장
  let currentIdx = 0;
  // 슬라이드 개수
  let slideCount = slide.length;
  // 요소의 너비 + margin
  let slideWidth = slide[0].clientWidth + 20;
  // 한번에 보여줄 슬라이드 개수
  let slideItems = 4;
  // 현재 슬라이드가 속한 페이지를 저장
  let currentSlidePage = 1;
  // 현재 페이지에서 보여지는 슬라이드의 개수를 저장
  let currentSlideCnt = slideItems;
  // 전체 페이지 수를 저장
  let slidePage = parseInt(slideCount / slideItems);
  // ul 요소의 너비를 전체 슬라이드의 너비 * 슬라이드 개수로 설정
  slides.style.width = slideWidth * slideCount + "px";

  // 슬라이드를 이동시키는 함수를 정의
  // num 인자를 받아 해당하는 위치로 슬라이드를 이동시키고, currentIdx 변수를 업데이트
  function moveSlide(num) {
    slides.style.left = -num * slideWidth + "px";
    currentIdx = num;
  }

  // 다음 슬라이드로 이동하는 버튼에 click 이벤트 리스너를 추가
  // 클릭할 때마다 currentSlidePage 변수를 1 증가
  nextBtn.addEventListener("click", () => {
    currentSlidePage++;

    if (currentSlideCnt === slideCount) {
      // 처음으로 돌아가기
      currentSlidePage = 1;
      currentSlideCnt = slideItems;
      moveSlide(0);
    } else if (currentSlidePage <= slidePage) {
      moveSlide(currentIdx + slideItems);
      currentSlideCnt += slideItems;
    } else {
      // 남은 items까지만 더해주기
      moveSlide(currentIdx + (slideCount % slideItems));
      currentSlideCnt += slideCount % slideItems;
    }
  });

  prevBtn.addEventListener("click", () => {
    // 첫 페이지에서 뒤로가기 클릭 맨 뒤로 이동
    if (currentSlidePage === 1) {
      currentSlidePage = slidePage + 1;
      currentSlideCnt = slideCount;
      moveSlide(slideCount - slideItems);
    } else if (currentSlidePage === slidePage + 1) {
      // 맨 뒤에서 클릭 시 (slideCount % slideItems) 만큼 뒤로가기
      moveSlide(currentIdx - (slideCount % slideItems));
      currentSlideCnt -= slideCount % slideItems;
      currentSlidePage--;
    } else if (currentSlidePage <= slidePage) {
      moveSlide(currentIdx - slideItems);
      currentSlideCnt -= slideItems;
      currentSlidePage--;
    }
  });
}
