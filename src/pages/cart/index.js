window.onload = function () {
  const itemContainer = document.querySelector(".add-order");
  const minusBtns = document.querySelectorAll(".minus");
  const plusBtns = document.querySelectorAll(".plus");
  const countEls = document.querySelectorAll(".count");
  const totalPriceEls = document.querySelectorAll(".total-price");

  const allSelectBtn = document.querySelector("#allSelectCheckbox");
  const checkboxes = document.querySelectorAll(".checking");

  fetch("order.json")
    .then((res) => res.json())
    .then((orders) =>
      orders.forEach((data) => {
        if (data.orderId === 1) {
          let resultPrice = 0;
          data.orderItems.forEach(({ productId, price, quantity }) => {
            itemContainer.innerHTML += `<article class="add-cart">
              <input type="checkbox" class="checking"/>
              <span class="product">${productId}</span>
              <span class="price">${price}</span>
              <div class="count-box">
                <div class="minus">-</div>
                <p class="count">${quantity}</p>
                <div class="plus">+</div>
              </div>
              <span class="total-price">${addCommas(price * quantity)}원</span>
            </article>`;
            resultPrice += price * quantity;
          });

          document.querySelector("#itemPriceAll").innerHTML = `${addCommas(
            resultPrice,
          )}원`;
          document.querySelector("#totalPrice").innerHTML = `${addCommas(
            resultPrice + 3000,
          )}원`;
        }
      }),
    )
    .catch((error) => {
      console.error(error);
    });
};

// 버튼들 활성화
// 전체선택 버튼
// allSelectBtn.addEventListener("click", () => {
//   checkboxes.forEach((checkbox) => {
//     checkbox.checked = allSelectBtn.checked;
//   });
// });

// 구매 수량 이벤트
// minusBtns.forEach((minusBtn) => {
//   minusBtn.addEventListener("click", () => {
//     if (count > 1) {
//       count--;
//       countEls.forEach((countEl) => {
//         countEl.textContent = count;
//       });
//       totalPriceEls.forEach((totalPriceEl) => {
//         totalPriceEl.textContent = `${addCommas(parseInt(productInfo.price) * count)}원`;
//       });
//       // priceEls.forEach((priceEl) => {
//       //   priceEl.textContent = `${addCommas(productInfo.price)}원`;
//       // });
//     } else {
//       alert("최소 구매 수량은 1개 입니다.");
//     }
//   });
// });

// plusBtns.forEach((plusBtn) => {
//   plusBtn.addEventListener("click", () => {
//     count++;
//     countEls.forEach((countEl) => {
//       countEl.textContent = count;
//     });
//     totalPriceEls.forEach((totalPriceEl) => {
//       totalPriceEl.textContent = `${addCommas(parseInt(productInfo.price) * count)}원`;
//     });
//     // priceEls.forEach((priceEl) => {
//     //   priceEl.textContent = `${addCommas(productPrice * count)}원`;
//     // });
//   });
// });

// 가격에 ,(쉼표) 넣어주는 함수
function addCommas(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 전체선택 버튼
function allSelect(allSelectBtn, _btsn) {
  allSelectBtn.addEventListenver("isChecked", () => {
    console.log("체크됨");
  });
}
