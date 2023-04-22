/*
html에서 작성 시 구조 예시
<section id="productContainer">
  <article class="product">
    <div>
      <img src="./컬리플라워.jpg" alt="컬리플라워">
    </div>
    <h3 class="product-name">컬리플라워(50g)</h3>
    <p class="product-price">10,000원</p>
  </article>
</section>
 */

/* 
js 파일 작성 예시
서버에서 받은 json 파일 각각 삽입
document.querySelector('#productContainer').innerHTML = 
`<article class="product">
  <div>
    <img src="" alt="">
  </div>
  <h3 class="product-name"></h3>
  <p class="product-price"></p>
</article>`
*/

// 유효성 검사 아직 구현 X

// css 적용
document.querySelectorAll(".prouct").forEach((product) => {
  product.style.cssText = `
  display: inline-block;
	margin: 10px 10px;`;
});

document.querySelectorAll(".product div").forEach((div) => {
  div.style.cssText = `
  overflow: hidden;
	height: 330px;
	width: 251px;`;
});

document.querySelectorAll(".product img").forEach((img) => {
  img.addEventListener("mouseout", () => {
    img.style.cssText = `
    object-fit: cover;
    height: 100%;
    transition: transform 1s;`;
  });
  img.addEventListener("mouseover", () => {
    img.style.cssText = `
    transform: scale(1.1);
    transition: transform 1s;`;
  });
});

document.querySelectorAll(".product-name").forEach((name) => {
  name.style.cssText = `
  font-size: 18px;
	margin: 20px 0;`;
});

document.querySelectorAll(".product-price").forEach((price) => {
  price.style.cssText = `
  font-size: 18px;`;
});
