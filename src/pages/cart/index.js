document.addEventListener("DOMContentLoaded", function () {
  const itemContainer = document.querySelector(".add-order");
  let resultPrice = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const cartItem = JSON.parse(localStorage.getItem(localStorage.key(i)));
    itemContainer.insertAdjacentHTML(
      "beforeend",
      `<article class="add-cart">
                <input type="checkbox" class="checking"/>
                <span class="product">${cartItem.productName}</span>
                <span class="price">${cartItem.price}</span>
                <div class="count-box">
                  <div class="minus">-</div>
                  <p class="count">${cartItem.count}</p>
                  <div class="plus">+</div>
                </div>
                <span class="total-price">${addComma(
                  cartItem.price * cartItem.count,
                )}원</span>
              </article>`,
    );
    resultPrice += cartItem.price * cartItem.count;
  }
  document.querySelector("#sum-all-items").innerHTML = `${addComma(resultPrice)}원`;
  document.querySelector("#total-price").innerHTML = `${addComma(resultPrice + 3000)}원`;

  // minus 버튼에 이벤트 리스너 등록
  document.querySelectorAll(".minus").forEach((minus) => {
    const next = minus.nextElementSibling;
    minus.addEventListener("click", () => {
      if (parseInt(next.innerHTML) <= 1) {
        alert("최소 구매 수량은 1개 입니다.");
      } else {
        next.innerHTML = parseInt(next.innerHTML) - 1;
        /* 해당 상품의 합계 바꿈 */
        const thisPrice = parseInt(
          next.parentElement.previousElementSibling.innerHTML.replace(/[^\d]/g, ""),
        );
        const thisPriceSum = parseInt(
          next.parentElement.nextElementSibling.innerHTML.replace(/[^\d]/g, ""),
        );
        next.parentElement.nextElementSibling.innerHTML = `${addComma(
          thisPriceSum - thisPrice,
        )}원`;
        /* 상품금액, 결재예정금액 바꿈 */
        const price = parseInt(
          next.parentElement.previousElementSibling.innerHTML.replace(/[^\d]/g, ""),
        );
        const sumAllItems = parseInt(
          document.querySelector("#sum-all-items").innerHTML.replace(/[^\d]/g, ""),
        );
        document.querySelector("#sum-all-items").innerHTML = `${addComma(
          sumAllItems - price,
        )}원`;
      }
    });
  });

  // plus 버튼에 이벤트 리스너 등록
  document.querySelectorAll(".plus").forEach((plus) => {
    const pre = plus.previousElementSibling;
    plus.addEventListener("click", () => {
      pre.innerHTML = parseInt(pre.innerHTML) + 1;
      /* 해당 상품의 합계 바꿈 */
      const thisPrice = parseInt(
        pre.parentElement.previousElementSibling.innerHTML.replace(/[^\d]/g, ""),
      );
      const thisPriceSum = parseInt(
        pre.parentElement.nextElementSibling.innerHTML.replace(/[^\d]/g, ""),
      );
      pre.parentElement.nextElementSibling.innerHTML = `${addComma(
        thisPriceSum + thisPrice,
      )}원`;
      /* 상품금액, 결재예정금액 바꿈 */
      const price = parseInt(
        pre.parentElement.previousElementSibling.innerHTML.replace(/[^\d]/g, ""),
      );

      const sumAllItems = parseInt(
        document.querySelector("#sum-all-items").innerHTML.replace(/[^\d]/g, ""),
      );
      document.querySelector("#sum-all-items").innerHTML = `${addComma(
        sumAllItems + price,
      )}원`;
    });
  });
});

/* 가격에 ,(쉼표) 삽입 */
function addComma(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
