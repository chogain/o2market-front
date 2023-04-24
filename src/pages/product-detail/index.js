const imgEls = document.querySelectorAll(".product-main-img");
const productNameEls = document.querySelectorAll(".product-name");
const priceEls = document.querySelectorAll(".product-price");
const companyEl = document.querySelector(".company");
const reviewEl = document.querySelector(".review");

const minusBtns = document.querySelectorAll(".minus");
const plusBtns = document.querySelectorAll(".plus");
const countEls = document.querySelectorAll(".count");
const totalPriceEls = document.querySelectorAll(".total-price");

// 구매 수량
let count = parseInt(countEls[0].textContent);

// 로컬에 있는 json 데이터 불러오기
fetch("product.json")
  .then((res) => res.json())
  .then((datas) => {
    /* 상품 정보 할당 */
    const productInfo = datas.find((data) => data.productId === 1);
    PutSameValueinSameClass(
      imgEls,
      `<img src="${"../../assets/images/컬리플라워.jpg"}" alt="이미지 로드 실패">`,
    );
    // 이미지 로드 안되는 버그 고치기!!
    // inputAll(
    //   imgEls,
    //   `<img src="${productInfo.imageUrl}" alt="${productInfo.description}">`,
    // );

    PutSameValueinSameClass(productNameEls, productInfo.productName);
    PutSameValueinSameClass(priceEls, addComma(productInfo.price));
    for (let i = 0; i < totalPriceEls.length; i++) {
      totalPriceEls[i].textContent = `${addComma(parseInt(productInfo.price) * count)}원`;
    }
    companyEl.innerHTML = productInfo.company;

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
          totalPriceEl.textContent = `${addComma(parseInt(productInfo.price) * count)}원`;
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
          totalPriceEl.textContent = `${addComma(parseInt(productInfo.price) * count)}원`;
        });
        // priceEls.forEach((priceEl) => {
        //   priceEl.textContent = `${addCommas(productPrice * count)}원`;
        // });
      });
    });
  });

// /* 해당 상품의 상품평 등록 */
// fetch("user.json")
//   .then((res) => res.json())
//   .then((users) => {
//     const reviews = [];
//     for (const item of users) {
//       for (const review of item.reviews) {
//         if (review.productId === "4") {
//           const masckedName = item.name.charAt(0) + "*".repeat(item.name.length - 1);
//           const newDiv = document.createElement("div");
//           newDiv.innerHTML = `
//             <div class="bottom-text">${masckedName}님</div>
//             <p class="review-text">${review.review}</p>`;
//           reviews.push(newDiv);
//         }
//       }
//     }
//     if (reviews.length === 0) {
//       const noReviewText = document.createTextNode("리뷰가 없습니다.");
//       reviewEl.appendChild(noReviewText);
//     } else {
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

/* 가격에 ,(쉼표) 삽입 */
function addComma(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 라우터...?
// const { Router } = require('express');
//  const router.get("/products/:productId", async (req, res, next) => {

//   try {
//     const { productId } = req.params;
//   const product = await totalData.findOne({ productId });

//   } catch (err) {
//     console.log(err.message);
//     alert("에러가 발생했습니다.")
//   }
//  })
