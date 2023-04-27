const $ = (selector) => document.querySelector(selector);
const $All = (selector) => document.querySelectorAll(selector);

document.addEventListener("DOMContentLoaded", function () {
  const itemContainer = document.querySelector(".add-order");
  let resultPrice = 0;
  for (let i = 0; i < localStorage.length; i++) {
    try {
      const cartItem = JSON.parse(localStorage.getItem(localStorage.key(i)));
      if (!cartItem.productName) {
        return false;
      }
      itemContainer.insertAdjacentHTML(
        "beforeend",
        `
      <article class="add-cart">
        <input type="checkbox" class="checking" checked />
        <span class="product">${cartItem.productName}(${cartItem.productId})</span>
        <span class="price">${cartItem.price}</span>
        <div class="count-box">
          <div class="minus">-</div>
          <p class="count">${cartItem.count}</p>
          <div class="plus">+</div>
        </div>
        <span class="total-price">${addComma(cartItem.price * cartItem.count)}원</span>
      </article>`,
      );
      resultPrice += cartItem.price * cartItem.count;
    } catch (error) {
      continue;
    }
  }

  $("#sum-all-items").innerHTML = `${addComma(resultPrice)}원`;
  $("#total-price").innerHTML = `${addComma(resultPrice + 3000)}원`;

  // minus 버튼에 이벤트 리스너 등록
  document.querySelectorAll(".minus").forEach((minus) => {
    const count = minus.nextElementSibling;
    minus.addEventListener("click", () => {
      if (parseInt(count.innerHTML) <= 1) {
        alert("최소 구매 수량은 1개 입니다.");
      } else {
        count.innerHTML = parseInt(count.innerHTML) - 1;
        /* 해당 상품의 합계 바꿈 */
        const thisPrice = parseInt(
          count.parentElement.previousElementSibling.innerHTML.replace(/[^\d]/g, ""),
        );
        const thisPriceSum = parseInt(
          count.parentElement.nextElementSibling.innerHTML.replace(/[^\d]/g, ""),
        );
        count.parentElement.nextElementSibling.innerHTML = `${addComma(
          thisPriceSum - thisPrice,
        )}원`;
        /* 상품금액, 결재예정금액 바꿈 */
        const price = parseInt(
          count.parentElement.previousElementSibling.innerHTML.replace(/[^\d]/g, ""),
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
    const count = plus.previousElementSibling;
    plus.addEventListener("click", () => {
      count.innerHTML = parseInt(count.innerHTML) + 1;
      /* 해당 상품의 합계 바꿈 */
      const thisPrice = parseInt(
        count.parentElement.previousElementSibling.innerHTML.replace(/[^\d]/g, ""),
      );
      const thisPriceSum = parseInt(
        count.parentElement.nextElementSibling.innerHTML.replace(/[^\d]/g, ""),
      );
      count.parentElement.nextElementSibling.innerHTML = `${addComma(
        thisPriceSum + thisPrice,
      )}원`;
      /* 상품금액, 결재예정금액 바꿈 */
      const price = parseInt(
        count.parentElement.previousElementSibling.innerHTML.replace(/[^\d]/g, ""),
      );
      const sumAllItems = parseInt(
        document.querySelector("#sum-all-items").innerHTML.replace(/[^\d]/g, ""),
      );
      document.querySelector("#sum-all-items").innerHTML = `${addComma(
        sumAllItems + price,
      )}원`;
    });
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
          try {
            const key = localStorage.key(i);
            const rawData = localStorage.getItem(key);
            let data = JSON.parse(rawData);
            if (!data.productName) {
              return false;
            }
            if (data.productName === name) {
              localStorage.removeItem(key);
              location.reload();
            }
          } catch (e) {
            continue;
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

  document.querySelector(".button").addEventListener("click", () => {
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

    // const localData = [];
    // for (let i = 0; i < localStorage.length; i++) {
    //   const key = localStorage.key(i);
    //   const rawData = localStorage.getItem(key);
    //   let data;
    //   try {
    //     data = JSON.parse(rawData);
    //   } catch (e) {
    //     console.error(`Invalid JSON string: ${rawData}`);
    //     continue;
    //   }
    //   localData.push(data);
    // }

    const orderItems = [];
    for (let i = 0; i < localStorage.length; i++) {
      const orderCount = document.querySelectorAll(".count")[1].innerHTML;
      try {
        const key = localStorage.key(i);
        if (!Number(key)) {
          continue;
        }
        const rawData = localStorage.getItem(key);
        let data = JSON.parse(rawData);
        let orderItem = {
          productId: data.productId,
          quantity: orderCount,
          price: data.price,
          productName: data.productName,
        };
        orderItems.push(orderItem);
      } catch (e) {
        console.log(e);
        continue;
      }
    }

    console.log(orderItems);
    const orderId = "64458af4b890a33b60d299f3"; // 주문 조회할 ID
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDQ4ZmE2ZDAxZTQzMjAwMDBkNTVmOWUiLCJpYXQiOjE2ODI1NjUwMDR9.gq7r3RUBo1ae2ASYJqH6Vpu7mI1Eqif4dqfmIW5xcg4"; // 사용자 토큰
    fetch("http://localhost:5500/api/v1/orders/64458af4b890a33b60d299f3", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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

// /* 가격에 ,(쉼표) 삽입 */
function addComma(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
