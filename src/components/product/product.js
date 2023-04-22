const mainProductSlide = document.querySelector("#product-recommendation-slide");

const products = [
  {
    name: "친환경 블루베리(100g)",
    price: "10,900원",
    imageSrc: "../../assets/images/product-bluberry.jpg",
    altText: "블루베리",
    link: "#",
  },
  {
    name: "오렌지(1.2kg)",
    price: "8,000원",
    imageSrc: "../../assets/images/product-orange.jpeg",
    altText: "오렌지",
    link: "#",
  },
  {
    name: "토마토(1kg)",
    price: "7,900원",
    imageSrc: "../../assets/images/product-tomato.jpg",
    altText: "토마토",
    link: "#",
  },
  {
    name: "곶감(16입)",
    price: "16,500원",
    imageSrc: "../../assets/images/product-gotgam.jpg",
    altText: "곶감",
    link: "#",
  },
];

export default function ProdcutCard() {
  // #product-container 선택 후 js로 동적으로 내용 삽입
  let productTemplate = `
    <section id="product-container">
        <div class="slide-left">
          <span class="material-symbols-outlined">
            chevron_left
          </span>
        </div>
        <div class="slide-right">
          <span class="material-symbols-outlined">
            chevron_right
          </span>
        </div>
        <h2 class="title">이 상품 어때요?</h2>
        <div class="card-container">
          {{__product_card__}}
        </div>
      </section>
  `;

  const productCardList = [];
  products.forEach((product) => {
    productCardList.push(`
      <article class="product"><a href="#">
          <div><img src=${product.imageSrc} alt=${product.altText}></div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">${product.price}</p>
        </a>
      </article>
    `);
  });

  productTemplate = productTemplate.replace(
    "{{__product_card__}}",
    productCardList.join(""),
  );

  mainProductSlide.innerHTML = productTemplate;
}
