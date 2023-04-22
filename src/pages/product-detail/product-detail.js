const imgEls = document.querySelectorAll(".product-main-img");
const productNameEls = document.querySelectorAll(".product-name");
const priceEls = document.querySelectorAll(".product-price");

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
    // 원하는 데이터 할당
    const productInfo = datas.find((data) => data.productId === 1);
    inputAll(
      imgEls,
      `<img src="${"../../assets/images/컬리플라워.jpg"}" alt="이미지 로드 실패">`,
    );
    // 이미지 로드 안되는 버그 고치기!!
    // inputAll(
    //   imgEls,
    //   `<img src="${productInfo.imageUrl}" alt="${productInfo.description}">`,
    // );

    inputAll(productNameEls, productInfo.productName);
    inputAll(priceEls, addCommas(productInfo.price));
    for (let i = 0; i < totalPriceEls.length; i++) {
      totalPriceEls[i].textContent = `${addCommas(
        parseInt(productInfo.price) * count,
      )}원`;
    }

    // 구매 수량 이벤트 등록
    minusBtns.forEach((minusBtn) => {
      minusBtn.addEventListener("click", () => {
        if (count > 1) {
          count--;
          countEls.forEach((countEl) => {
            countEl.textContent = count;
          });
          totalPriceEls.forEach((totalPriceEl) => {
            totalPriceEl.textContent = `${addCommas(
              parseInt(productInfo.price) * count,
            )}원`;
          });
          // priceEls.forEach((priceEl) => {
          //   priceEl.textContent = `${addCommas(productInfo.price)}원`;
          // });
        } else {
          alert("최소 구매 수량은 1개 입니다.");
        }
      });
    });

    plusBtns.forEach((plusBtn) => {
      plusBtn.addEventListener("click", () => {
        count++;
        countEls.forEach((countEl) => {
          countEl.textContent = count;
        });
        totalPriceEls.forEach((totalPriceEl) => {
          totalPriceEl.textContent = `${addCommas(
            parseInt(productInfo.price) * count,
          )}원`;
        });
        // priceEls.forEach((priceEl) => {
        //   priceEl.textContent = `${addCommas(productPrice * count)}원`;
        // });
      });
    });
  });

// 같은 클래스를 가진 태그에 같은 값 삽입하는 함수
function inputAll(elements, inputValue) {
  elements.forEach((El) => {
    El.innerHTML = "";
    El.innerHTML = inputValue;
  });
}

// 가격에 ,(쉼표) 넣어주는 함수
function addCommas(price) {
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
