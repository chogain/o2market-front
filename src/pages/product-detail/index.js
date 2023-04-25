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

/* 로컬에 있는 json 데이터 불러오기 */
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
          if (data.productName === productInfo.productName) {
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
            productName: productInfo.productName,
            price: productInfo.price,
            count: count + JSON.parse(localStorage.getItem(sameProductIndex)).count,
          };
        } else {
          const newId = maxIndex + 1;
          dataToSave = {
            id: newId,
            productName: productInfo.productName,
            price: productInfo.price,
            count,
          };
        }

        localStorage.setItem(dataToSave.id, JSON.stringify(dataToSave));
      });
    });
  });

/* 해당 상품의 상품평 등록 */
fetch("user.json")
  .then((res) => res.json())
  .then((users) => {
    const reviews = [];
    if (!users.review) {
      const noReviewText = document.createElement("p");
      noReviewText.innerText = "리뷰가 없습니다.";
      noReviewText.classList.add("bottom-text");
      reviewEl.appendChild(noReviewText);
    } else {
      for (const item of users) {
        for (const review of item.reviews) {
          if (review.productId === "4") {
            const masckedName = item.name.charAt(0) + "*".repeat(item.name.length - 1);
            const newDiv = document.createElement("div");
            newDiv.innerHTML = `
            <div class="bottom-text">${masckedName}님</div>
            <p class="review-text">${review.review}</p>`;
            reviews.push(newDiv);
          }
        }
      }
      const countReview = document.createElement("div");
      countReview.innerHTML = `총 <span class="font">${reviews.length}</span>개의 리뷰가 있습니다.`;
      document.querySelector(".review-counter").innerText = reviews.length;
      countReview.classList.add("review-count", "bottom-text");
      reviewEl.appendChild(countReview);
      for (const review of reviews) {
        reviewEl.appendChild(review);
      }
    }
  });

/* 같은 클래스를 가진 태그에 같은 값 삽입 */
function PutSameValueinSameClass(elements, inputValue) {
  elements.forEach((El) => {
    El.innerHTML = inputValue;
  });
}

// // 두번째 시도
// window.location.href = "http://localhost:5500/api/v1/products/64410645ad088180b3542f78";
// fetch("http://localhost:5500/api/v1/products/64410645ad088180b3542f78")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//     const productName = data.productName;
//     const imgUrl = data.imageUrl;
//     const description = data.description;
//     const price = data.price;

//     /* 받아온 데이터 삽입 */
//     if (!imgUrl) {
//       PutSameValueinSameClass(imgEls, "이미지 로드 실패");
//     }
//     PutSameValueinSameClass(imgEls, `<img src="${imgUrl}" alt="${description}">`);
//     PutSameValueinSameClass(productNameEls, productName);
//     PutSameValueinSameClass(priceEls, addComma(price));
//     for (let i = 0; i < totalPriceEls.length; i++) {
//       totalPriceEls[i].textContent = `${addComma(parseInt(price) * count)}원`;
//     }
//     companyEl.innerHTML = data.company;

//     /* 구매수량 버튼 활성화 */
//     minusBtns.forEach((minusBtn) => {
//       minusBtn.addEventListener("click", () => {
//         if (count <= 1) {
//           alert("최소 구매 수량은 1개 입니다.");
//           return;
//         }

//         count--;
//         countEls.forEach((countEl) => {
//           countEl.textContent = count;
//         });
//         totalPriceEls.forEach((totalPriceEl) => {
//           totalPriceEl.textContent = `${addComma(parseInt(price) * count)}원`;
//         });
//       });
//     });

//     plusBtns.forEach((plusBtn) => {
//       plusBtn.addEventListener("click", () => {
//         count++;
//         countEls.forEach((countEl) => {
//           countEl.textContent = count;
//         });
//         totalPriceEls.forEach((totalPriceEl) => {
//           totalPriceEl.textContent = `${addComma(parseInt(price) * count)}원`;
//         });
//       });
//     });
//   });

// // 서버랑 연결되는지 확인해야하는 코드
// window.location.href = "http://localhost:5500/api/v1/products/64410645ad088180b3542f78";
// const getProductData = async () => {
//   try {
//     const response = await fetch(
//       "http://localhost:5500/api/v1/products/64410645ad088180b3542f78",
//     );
//     const response = await fetch("./product.json");
//     const productData = await response.json();
//     console.log(productData[0]);
//     const productName = productData[0].productName;
//     const imgUrl = productData[0].imageUrl;
//     const description = productData[0].description;
//     const price = productData[0].price;
//     const _id = productData[0]._id;

//     /* 받아온 데이터 삽입 */
//     if (!imgUrl) {
//       PutSameValueinSameClass(imgEls, "이미지 로드 실패");
//     }
//     PutSameValueinSameClass(imgEls, `<img src="${imgUrl}" alt="${description}">`);
//     PutSameValueinSameClass(productNameEls, productName);
//     PutSameValueinSameClass(priceEls, addComma(price));
//     for (let i = 0; i < totalPriceEls.length; i++) {
//       totalPriceEls[i].textContent = `${addComma(parseInt(price) * count)}원`;
//     }
//     companyEl.innerHTML = productData.company;

//     /* 구매수량 버튼 활성화 */
//     minusBtns.forEach((minusBtn) => {
//       minusBtn.addEventListener("click", () => {
//         if (count <= 1) {
//           alert("최소 구매 수량은 1개 입니다.");
//           return;
//         }

//         count--;
//         countEls.forEach((countEl) => {
//           countEl.textContent = count;
//         });
//         totalPriceEls.forEach((totalPriceEl) => {
//           totalPriceEl.textContent = `${addComma(parseInt(price) * count)}원`;
//         });
//       });
//     });

//     plusBtns.forEach((plusBtn) => {
//       plusBtn.addEventListener("click", () => {
//         count++;
//         countEls.forEach((countEl) => {
//           countEl.textContent = count;
//         });
//         totalPriceEls.forEach((totalPriceEl) => {
//           totalPriceEl.textContent = `${addComma(parseInt(price) * count)}원`;
//         });
//       });
//     })
//   }
// };

/* 가격에 ,(쉼표) 삽입 */
function addComma(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
