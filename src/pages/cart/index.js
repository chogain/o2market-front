const $ = (selector) => document.querySelector(selector);
const $All = (selector) => document.querySelectorAll(selector);

const http = "http://localhost:5500";
// const http = "";

document.addEventListener("DOMContentLoaded", function () {
  const itemContainer = $(".add-order");
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

  /* minus 버튼에 이벤트 리스너 등록 */
  $All(".minus").forEach((minus) => {
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
        const sumAllItems = parseInt($("#sum-all-items").innerHTML.replace(/[^\d]/g, ""));
        $("#sum-all-items").innerHTML = `${addComma(sumAllItems - price)}원`;
        $("#total-price").innerHTML = `${addComma(sumAllItems - price + 3000)}원`;
      }
    });
  });

  /* plus 버튼에 이벤트 리스너 등록 */
  $All(".plus").forEach((plus) => {
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
      const sumAllItems = parseInt($("#sum-all-items").innerHTML.replace(/[^\d]/g, ""));
      $("#sum-all-items").innerHTML = `${addComma(sumAllItems + price)}원`;
      $("#total-price").innerHTML = `${addComma(sumAllItems + price + 3000)}원`;
    });
  });

  const toggleAll = $(".all-select-text");
  const checkboxes = $All('input[type="checkbox"]');

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

  const deleteBtn = $("#delete-btn");

  deleteBtn.addEventListener("click", () => {
    const checkboxes = $All('input[type="checkbox"]');
    /* 체크된 체크박스와 같은 이름의 local storage 데이터를 지움 */
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

  const orderItems = [];
  for (let i = 0; i < localStorage.length; i++) {
    const orderCount = $All(".count")[1].innerHTML;
    try {
      const key = localStorage.key(i);
      if (!Number(key)) {
        continue;
      }
      const rawData = localStorage.getItem(key);
      let data = JSON.parse(rawData);
      console.log(data.id);
      let orderItem = {
        productId: Number(data.id),
        quantity: Number(orderCount),
        price: data.price,
        productName: data.productName,
      };
      orderItems.push(orderItem);
    } catch (e) {
      console.log(e);
      continue;
    }
  }

  $(".button").addEventListener("click", () => {
    /* 모든 체크박스가 체크되어있지 않으면 결재할 수 없음 */
    const checkboxes = $All('input[type="checkbox"]');
    let allChecked = true;
    for (let i = 0; i < checkboxes.length; i++) {
      if (!checkboxes[i].checked) {
        allChecked = false;
        break;
      }
    }
    if (!allChecked) {
      alert("구매하지 않을 상품은 삭제 후 구매 부탁드립니다.");
    } else {
      window.scrollTo({
        behavior: "smooth",
        top: 0,
      });
      const orderEl = document.createElement("div");
      orderEl.innerHTML = order;
      $("main").append(orderEl);
      $("#order-sum-all-items").innerHTML = $("#sum-all-items").innerHTML;
      $("#order-total-price").innerHTML = $("#total-price").innerHTML;
      const userId = localStorage.getItem("userId"); // 주문 조회할 ID
      const token = localStorage.getItem("token"); // 사용자 토큰
      alert(token);
      $(".close").addEventListener("click", () => {
        $("main").removeChild(orderEl);
      });

      $("#order-submit-button").addEventListener("click", () => {
        // console.log(
        //   JSON.stringify({
        //     orderItems: orderItems,
        //     orderAddr: $("#address").value,
        //     deliveryState: 0,
        //     deleteFlag: false,
        //   }),
        // );
        // alert(token);
        fetch(`${http}/api/v1/orders/${userId}`, {
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
            alert(token);
            /* 서버 응답 처리 */
            if (response.ok) {
              alert("결재 완료 되었습니다.");
              alert(token);
              // window.location.href = `${http}/pages/orderCompleted${userId}`;
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
    }
  });
});

/* 가격에 ,(쉼표) 삽입 */
function addComma(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
