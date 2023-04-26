const $ = (selector) => document.querySelector(selector);
const $All = (selector) => document.querySelectorAll(selector);
let resultPrice = 0;

document.addEventListener("DOMContentLoaded", function () {
  const itemContainer = document.querySelector(".add-order");

  for (let i = 0; i < localStorage.length; i++) {
    const cartItem = JSON.parse(localStorage.getItem(localStorage.key(i)));
    const totalPrice = cartItem.price * cartItem.count;
    const itemHtml = `
      <article class="add-cart">
        <input type="checkbox" class="checking" checked />
        <span class="product">${cartItem.productName}(${cartItem.productId})</span>
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
    if (toggleAll.innerHTML === "전체선택해제") {
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
      toggleAll.innerHTML = "전체선택";
    } else {
      checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
      });
      toggleAll.innerHTML = "전체선택해제";
    }
  });

  const deleteBtn = document.querySelector("#delete-btn");

  deleteBtn.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    // 체크된 체크박스와 같은 이름의 local storage 데이터를 지웁니다.
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const name = checkbox.nextElementSibling.innerHTML.substring(
          0,
          checkbox.nextElementSibling.innerHTML.indexOf("(", 0),
        );
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const rawData = localStorage.getItem(key);
          let data;
          try {
            data = JSON.parse(rawData);
          } catch (e) {
            console.error(`Invalid JSON string: ${rawData}`);
            continue;
          }
          if (data.productName === name) {
            localStorage.removeItem(key);
          }
        }
      }
    });
  });
  const order = `
  <section class="order-layout">
  <section class="order-container">
  <div class="close">X</div>
  <div class="order-info">
      <label for="order-address" class="label">주소</label>
      <input class="order-address" id="address" type="text" placeholder="주소를 입력해 주세요." autocomplete="on">
  </div>
    <div class="cart-summary">
      <dl>
        <dt class="text">상품금액</dt>
        <dd id="order-sum-all-items" class="result-text"></dd>
        <dt class="text">배송비</dt>
        <dd class="result-text">3,000원</dd>
        <dt class="text">결제예정금액</dt>
        <dd id="order-total-price"></dd>
      </dl>
      <button type="button" class="button" id="order-submit-button">
        결제하기
      </button>
    </div>
  </section>
  </section>
  `;

  document.querySelector("button").addEventListener("click", () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
    const orderEl = document.createElement("div");
    orderEl.innerHTML = order;
    $("main").append(orderEl);
    $("#order-sum-all-items").innerHTML = `${addComma(resultPrice)}원`;
    $("#order-total-price").innerHTML = `${addComma(resultPrice + 3000)}원`;

    $(".close").addEventListener("click", () => {
      $("main").removeChild(orderEl);
    });

    const localData = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const rawData = localStorage.getItem(key);
      let data;
      try {
        data = JSON.parse(rawData);
      } catch (e) {
        console.error(`Invalid JSON string: ${rawData}`);
        continue;
      }
      localData.push(data);
    }

    $("#order-submit-button").addEventListener("click", () => {
      const orderItems = [];

      for (let i = 0; i < localStorage.length; i++) {
        const cartItem = JSON.parse(localStorage.getItem(localStorage.key(i)));
        // const orderQuantity =
        const orderItem = {
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          price: cartItem.price,
        };
        orderItems.push(orderItem);
      }
      console.log(orderItems);
    });

    fetch("http://localhost:5500/api/v1/orders/64458af4b890a33b60d299f3", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderItems: orderItems,
        orderAddr: $("#address").value,
        deliveryState: 0,
        deleteFlag: false,
      }),
    })
      .then((response) => {
        // 서버 응답 처리
        if (response.ok) {
          alert("결재 완료 되었습니다.");
          window.location.href = "http://127.0.0.1:3000/src/pages/main/index.html";
          console.log("결재 완료");
        } else {
          alert(`결재 실패
    다시 시도해 주세요.`);
          console.error("결재 실패:", response.statusText);
        }
      })
      .catch((error) => {
        alert(`결재 실패
    다시 시도해 주세요.`);
        console.error("결재 실패:", error);
      });
  });
});

/* 가격에 ,(쉼표) 삽입 */
function addComma(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
