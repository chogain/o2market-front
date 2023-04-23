const mainProductSlide = document.querySelector("#product-recommendation-slide");

const products = [
  {
    name: "1친환경 블루베리(100g)",
    price: "10,900원",
    imageSrc: "../../assets/images/product-bluberry.jpg",
    altText: "블루베리",
    link: "#",
  },
  {
    name: "2오렌지(1.2kg)",
    price: "8,000원",
    imageSrc: "../../assets/images/product-orange.jpeg",
    altText: "오렌지",
    link: "#",
  },
  {
    name: "3토마토(1kg)",
    price: "7,900원",
    imageSrc: "../../assets/images/product-tomato.jpg",
    altText: "토마토",
    link: "#",
  },
  {
    name: "4곶감(16입)",
    price: "16,500원",
    imageSrc: "../../assets/images/product-gotgam.jpg",
    altText: "곶감",
    link: "#",
  },
  {
    name: "5친환경 블루베리(100g)",
    price: "10,900원",
    imageSrc: "../../assets/images/product-bluberry.jpg",
    altText: "블루베리",
    link: "#",
  },
  {
    name: "6오렌지(1.2kg)",
    price: "8,000원",
    imageSrc: "../../assets/images/product-orange.jpeg",
    altText: "오렌지",
    link: "#",
  },
  {
    name: "7토마토(1kg)",
    price: "7,900원",
    imageSrc: "../../assets/images/product-tomato.jpg",
    altText: "토마토",
    link: "#",
  },
  {
    name: "8곶감(16입)",
    price: "16,500원",
    imageSrc: "../../assets/images/product-gotgam.jpg",
    altText: "곶감",
    link: "#",
  },
  {
    name: "9오렌지(1.2kg)",
    price: "8,000원",
    imageSrc: "../../assets/images/product-orange.jpeg",
    altText: "오렌지",
    link: "#",
  },
  {
    name: "10토마토(1kg)",
    price: "7,900원",
    imageSrc: "../../assets/images/product-tomato.jpg",
    altText: "토마토",
    link: "#",
  },
  {
    name: "11곶감(16입)",
    price: "16,500원",
    imageSrc: "../../assets/images/product-gotgam.jpg",
    altText: "곶감",
    link: "#",
  },
];

export default function ProductCard() {
  // #product-container 선택 후 js로 동적으로 내용 삽입
  const productTemplate = `
    <div id="product-container">
      <h2 class="title">이 상품 어때요?</h2>
      <div class="carousel-wrapper">
        <ul class="card-container slides">
      </div>
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
  `;

  const productCardList = products.map(
    (product) =>
      `<li class="product">
        <a href="#">
          <div><img src=${product.imageSrc} alt=${product.altText}></div>
          <h3 class="product-name">${product.name}</h3>
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

  let currentIdx = 0;
  let slideCount = slide.length;
  let slideWidth = slide[0].clientWidth + 20; // 20은 margin값
  let slideItems = 4;
  let currentSlidePage = 1;
  let currentSlideCnt = slideItems;
  let slidePage = parseInt(slideCount / slideItems);

  slides.style.width = slideWidth * slideCount + "px";

  function moveSlide(num) {
    slides.style.left = -num * slideWidth + "px";
    currentIdx = num;
  }

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
