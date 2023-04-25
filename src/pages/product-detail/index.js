const imgEls = document.querySelectorAll(".product-main-img");
const productNameEls = document.querySelectorAll(".product-name");
const priceEls = document.querySelectorAll(".product-price");
const companyEl = document.querySelector(".company");
const reviewEl = document.querySelector(".review");

const minusBtns = document.querySelectorAll(".minus");
const plusBtns = document.querySelectorAll(".plus");
const countEls = document.querySelectorAll(".count");
const totalPriceEls = document.querySelectorAll(".total-price");

/* 구매 수량 */
let count = parseInt(countEls[0].textContent);

fetch("./product.json")
  .then((response) => response.json())
  .then((datas) => {
    /* 상품 정보 할당 */
    const productName = datas.productName;
    const imgUrl = datas.imageUrl;
    const description = datas.description;
    const price = datas.price;
    const company = datas.company;

    PutSameValueinSameClass(imgEls, `<img src="${imgUrl}" alt="${productName}">`);
    PutSameValueinSameClass(productNameEls, productName);
    PutSameValueinSameClass(priceEls, addComma(price));
    for (let i = 0; i < totalPriceEls.length; i++) {
      totalPriceEls[i].textContent = `${addComma(parseInt(price) * count)}원`;
    }
    document.querySelector(".description").innerHTML = description;
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
        // priceEls.forEach((priceEl) => {
        //   priceEl.textContent = `${addCommas(productInfo.price)}원`;
        // });
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
    const sendLocalStorageBtn = document.querySelectorAll(".storage-btn");
    sendLocalStorageBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        let maxIndex = 0;
        let isSameProduct = false;
        let sameProductIndex = -1;
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const data = JSON.parse(localStorage.getItem(key));
          if (data.productName === productName) {
            isSameProduct = true;
            sameProductIndex = key;
            break;
          }
          maxIndex = Math.max(maxIndex, Number(key));
        }

        /* local storage에 같은 상품이 있을 경우 count만 추가 */
        let dataToSave;
        if (isSameProduct) {
          dataToSave = {
            id: sameProductIndex,
            productName: productName,
            price: price,
            count: count,
          };
        } else {
          const newId = maxIndex + 1;
          dataToSave = {
            id: newId,
            productName: productName,
            price: price,
            count: count,
          };
        }

        localStorage.setItem(dataToSave.id, JSON.stringify(dataToSave));
      });
    });
  })
  .catch((error) => console.error("데이터를 받아오는 동안 오류가 발생했습니다.", error));

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

/* 같은 클래스를 가진 태그에 같은 값 삽입 */
function PutSameValueinSameClass(elements, inputValue) {
  elements.forEach((El) => {
    El.innerHTML = inputValue;
  });
}
