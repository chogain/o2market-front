document.querySelector("#productContainer").innerHTML = `<article class="product">
  <div>
    <img src="" alt="">
  </div>
  <h3 class="product-name"></h3>
  <p class="product-price"></p>
</article>`;

document.querySelectorAll(".product").forEach((product) => {
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
