const $ = (selector) => document.querySelector(selector);
const $All = (selector) => document.querySelectorAll(selector);

const imgEls = $All(".product-main-img");
const productNameEls = $All(".product-name");
const priceEls = $All(".product-price");
const companyEl = $(".company");
const reviewEl = $(".review");

const minusBtns = $All(".minus");
const plusBtns = $All(".plus");
const countEls = $All(".count");
const totalPriceEls = $All(".total-price");

/* 구매 수량 */
let count = parseInt(countEls[0].textContent);

// const http = "http://localhost:5500";
// const productId = "/5";

const http = "";

const queryString = window.location.search;

// Further parsing:
const params = new URLSearchParams(queryString);
const productId = parseInt(params.get("productId"));

/* 서버에 GET 요청을 보내서 데이터 가져옴 */
fetch(`${http}/api/v1/products/${productId}`)
  .then((response) => response.json())
  .then((datas) => {
    /* 상품 정보 할당 */
    const productName = datas.productName;
    const imgUri = datas.imageUri;
    const description = datas.description;
    const price = datas.price;
    const company = datas.company;
    // 지금 이렇게 하면 index.html 나와서 주석처리 함
    // const productId = document.location.href.split("/");
    console.log(productId);

    /* 동일한 클래스를 가진 태그에 동일한 데이터 삽입 */
    PutSameValueinSameClass(imgEls, `<img src="${imgUri}" alt="${productName}">`);
    PutSameValueinSameClass(productNameEls, productName);
    PutSameValueinSameClass(priceEls, addComma(price));
    for (let i = 0; i < totalPriceEls.length; i++) {
      totalPriceEls[i].textContent = `${addComma(parseInt(price) * count)}원`;
    }
    $(".description").innerHTML = description;
    companyEl.innerHTML = company;

    /* 구매 수량 이벤트 등록 */
    minusBtns.forEach((minusBtn) => {
      minusBtn.addEventListener("click", () => {
        if (count <= 1) {
          alert("최소 구매 수량은 1개 입니다.");
          return;
        }

        count--;
        countEls.forEach((countEl) => {
          countEl.textContent = count;
        });
        totalPriceEls.forEach((totalPriceEl) => {
          totalPriceEl.textContent = `${addComma(parseInt(price) * count)}원`;
        });
      });
    });

    plusBtns.forEach((plusBtn) => {
      plusBtn.addEventListener("click", () => {
        count++;
        countEls.forEach((countEl) => {
          countEl.textContent = count;
        });
        totalPriceEls.forEach((totalPriceEl) => {
          totalPriceEl.textContent = `${addComma(parseInt(price) * count)}원`;
        });
      });
    });

    /* 장바구니 정보 local storage에 등록 */
    $All(".cart-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        // const url = window.location.href; // 현재 페이지 URL 가져오기
        // const productId = url.substring(url.lastIndexOf("/") + 1);

        let maxIndex = 0;
        let sameProductIndex = -1;

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
          if (data.productName === productName) {
            sameProductIndex = key;
            break;
          }
          maxIndex = Math.max(maxIndex, Number(key));
        }

        const dataToSave = {
          id: sameProductIndex !== -1 ? sameProductIndex : maxIndex + 1,
          productName,
          price,
          count,
          description,
        };

        localStorage.setItem(dataToSave.id, JSON.stringify(dataToSave));
        alert("상품이 장바구니에 성공적으로 담겼습니다.");
      });
    });
  });

/* 상품 정보 form */
const order = `
  <section class="order-layout">
  <section class="order-container">
  <div class="close">X</div>
  <div class="order-product-info">
    <div class="order-text">구매 상품</div>
    <div class="order-product-name"></div>
    <div class="order-text">상품 개수</div>
    <div class="order-product-count"></div>
  </div>
  <div class="order-info">
      <label for="order-address" class="label">주소</label>
      <input class="order-address" id="address" type="text" placeholder="주소를 입력해 주세요." autocomplete="on">
  </div>
    <div class="cart-summary">
      <dl>
        <dt class="text">상품금액</dt>
        <dd id="sum-all-items" class="result-text"></dd>
        <dt class="text">배송비</dt>
        <dd class="result-text">3,000원</dd>
        <dt class="text">결제예정금액</dt>
        <dd id="total-price"></dd>
      </dl>
      <button type="button" class="button green-bg" id="submitButton">
        결제하기
      </button>
    </div>
  </section>
  </section>
  `;

/* 모든 구매하기 버튼 클릭 시 구매 정보 DB에 전송 */
$All(".payment-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
    const orderEl = document.createElement("div");
    orderEl.innerHTML = order;
    $("main").append(orderEl);

    const quantity = countEls[0].innerHTML;
    const price = Number(priceEls[0].innerHTML.replace(/,/g, ""));

    $(".order-product-name").innerHTML = productNameEls[0].innerHTML;
    $(".order-product-count").innerHTML = quantity;
    $("#sum-all-items").innerHTML = `${addComma(price * quantity)}원`;
    $("#total-price").innerHTML = `${addComma(price * quantity + 3000)}원`;

    $(".close").addEventListener("click", () => {
      $("main").removeChild(orderEl);
    });

    const userId = localStorage.getItem("userId"); // 주문 조회할 ID
    const token = localStorage.getItem("token"); // 사용자 토큰
    $("#submitButton").addEventListener("click", () => {
      fetch(`${http}/api/v1/orders/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderItems: [
            {
              productId: productId.substring(1),
              quantity: quantity,
              price: price,
              productName: productNameEls[0].innerHTML,
            },
          ],
          orderAddr: $("#address").value,
          deliveryState: 0,
          deleteFlag: false,
        }),
      })
        .then((response) => {
          /* 서버 응답 처리 */
          if (response.ok) {
            alert("결재 완료 되었습니다.");
            window.location.href = "../orderCompleted/index.html";
            console.log("결재 완료");
          } else {
            alert(`결재 실패
다시 시도해 주세요.`);
            console.error("결재 실패:", response.status);
          }
        })
        .catch((error) => {
          alert(`결재 실패
다시 시도해 주세요.`);
          console.error("서버 응답 실패:", error);
        });
    });
  });
});

/* 같은 클래스를 가진 태그에 같은 값 삽입 */
function PutSameValueinSameClass(elements, inputValue) {
  elements.forEach((El) => {
    El.innerHTML = inputValue;
  });
}

/* 가격에 ,(쉼표) 삽입 */
function addComma(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// /* 해당 상품의 상품평 등록 (구현 X) */
// fetch("user.json")
//   .then((res) => res.json())
//   .then((users) => {
//     const reviews = [];
//     if (!users.review) {
//       const noReviewText = document.createElement("p");
//       noReviewText.innerText = "리뷰가 없습니다.";
//       noReviewText.classList.add("bottom-text");
//       reviewEl.appendChild(noReviewText);
//     } else {
//       for (const item of users) {
//         for (const review of item.reviews) {
//           if (review.productId === "4") {
//             const masckedName = item.name.charAt(0) + "*".repeat(item.name.length - 1);
//             const newDiv = document.createElement("div");
//             newDiv.innerHTML = `
//             <div class="bottom-text">${masckedName}님</div>
//             <p class="review-text">${review.review}</p>`;
//             reviews.push(newDiv);
//           }
//         }
//       }
//       const countReview = document.createElement("div");
//       countReview.innerHTML = `총 <span class="font">${reviews.length}</span>개의 리뷰가 있습니다.`;
//       document.querySelector(".review-counter").innerText = reviews.length;
//       countReview.classList.add("review-count", "bottom-text");
//       reviewEl.appendChild(countReview);
//       for (const review of reviews) {
//         reviewEl.appendChild(review);
//       }
//     }
//   });
