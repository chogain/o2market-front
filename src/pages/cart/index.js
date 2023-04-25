document.addEventListener("DOMContentLoaded", function () {
  const itemContainer = document.querySelector(".add-order");
  let resultPrice = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const cartItem = JSON.parse(localStorage.getItem(localStorage.key(i)));
    const totalPrice = cartItem.price * cartItem.count;
    const itemHtml = `
      <article class="add-cart">
        <input type="checkbox" class="checking" checked />
        <span class="product">${cartItem.productName}</span>
        <span class="price">${cartItem.price}</span>
        <div class="count-box">
          <div class="minus">-</div>
          <p class="count">${cartItem.count}</p>
          <div class="plus">+</div>
        </div>
        <span class="total-price">${addComma(totalPrice)}원</span>
      </article>`;
    itemContainer.insertAdjacentHTML("beforeend", itemHtml);
    resultPrice += totalPrice;
  }

  const sumAllItems = document.querySelector("#sum-all-items");
  const totalprice = document.querySelector("#total-price");
  sumAllItems.innerHTML = `${addComma(resultPrice)}원`;
  totalprice.innerHTML = `${addComma(resultPrice + 3000)}원`;

  itemContainer.addEventListener("click", (event) => {
    if (event.target.matches(".minus, .plus")) {
      const countElem = event.target.parentNode.querySelector(".count");
      const priceElem = event.target.parentNode.previousElementSibling;
      const totalPriceElem = event.target.parentNode.nextElementSibling;
      const price = parseInt(priceElem.innerHTML);
      let count = parseInt(countElem.innerHTML);
      if (event.target.classList.contains("plus")) {
        count += 1;
      } else if (count > 1) {
        count -= 1;
      } else {
        alert("최소 구매 수량은 1개 입니다.");
      }
      countElem.innerHTML = count;
      const totalPrice = price * count;
      totalPriceElem.innerHTML = `${addComma(totalPrice)}원`;
      const itemsPrice = Array.from(
        document.querySelectorAll(".add-cart .total-price"),
      ).reduce((acc, item) => acc + parseInt(item.textContent.replace(/[^\d]/g, "")), 0);
      sumAllItems.innerHTML = `${addComma(itemsPrice)}원`;
      totalprice.innerHTML = `${addComma(itemsPrice + 3000)}원`;
    }
  });

  const toggleAll = document.querySelector(".all-select-text");
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  toggleAll.addEventListener("click", () => {
    if (toggleAll.innerHTML == "전체선택해제") {
      checkboxes.forEach((checkbox) => {
        checkbox.checked = !checkbox.checked;
      });
    } else {
      checkboxes.forEach((checkbox) => {
        checkbox.checked = checkbox.checked;
      });
      toggleAll.innerHTML == "전체선택";
    }
  });
  const deletebtn = document.querySelector("#partialDelete");
  deletebtn.addEventListener("click", () => {
    if (
      document.querySelectorAll('input[type="checkbox"].checking:checked').length === 0
    ) {
      alert("삭제할 상품이 없습니다.");
    }
    document
      .querySelectorAll('input[type="checkbox"].checking:checked')
      .forEach((checkbox) => checkbox.closest(".add-cart").remove());
    const itemsPrice = Array.from(
      document.querySelectorAll(".add-cart .total-price"),
    ).reduce((acc, item) => acc + parseInt(item.textContent.replace(/[^\d]/g, "")), 0);
    sumAllItems.innerHTML = `${addComma(itemsPrice)}원`;
    totalprice.innerHTML = `${addComma(itemsPrice + 3000)}원`;
    if (itemsPrice == 0) {
      if (!confirm("장바구니의 모든 상품이 삭제됩니다.")) {
        location.reload();
      }
    }
  });
});

/* 가격에 ,(쉼표) 삽입 */
function addComma(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
