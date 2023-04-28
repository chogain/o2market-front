const userId = localStorage.getItem("userId"); // 주문 조회할 ID
const token = localStorage.getItem("token"); // 사용자 토큰

if (!token) {
  window.location.href = "../login/index.html"; // 로그인 페이지 URL 넣기
}

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const date = now.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${date}`;
}

async function loadOrderCompleted() {
  try {
    const response = await fetch(`/api/v1/orders/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log(data);

    if (!data || !data[0]) {
      console.log("주문 정보를 가져올 수 없습니다.");
      return;
    }

    const order = data[0]; // API에서 가져온 첫 번째 주문 정보 사용

    // 주문번호 표시
    const orderNumberElem = document.querySelector("#orderNumber");
    if (orderNumberElem) {
      orderNumberElem.innerHTML = order._id; // order.id
    }

    //주문일시 표시
    const orderDateElem = document.querySelector("#orderDate");
    if (orderDateElem) {
      orderDateElem.innerHTML = getCurrentDateTime();
    }

    // 상품정보 및 결제금액 표시
    const itemsContainer = document.querySelector("#productList ul");
    let totalPrice = 0;

    order.orderItems.forEach((item) => {
      const totalItemPrice = item.price * item.quantity;
      totalPrice += totalItemPrice;

      const itemHtml = `
        <li>
          <span>${item.productName}</span>
          <span>${item.quantity}개</span>
          <span>${item.price.toLocaleString()}원</span>
        </li>`;
      itemsContainer.insertAdjacentHTML("beforeend", itemHtml);
    });

    // 총 결제금액 표시
    const totalPriceElem = document.querySelector("#totalPayment");
    if (totalPriceElem) {
      totalPriceElem.innerHTML = `${(+totalPrice + 3000).toLocaleString()}원`;
    }

    const orderAddressElem = document.querySelector("#orderAddress");
    if (orderAddressElem) {
      orderAddressElem.innerHTML = order.orderAddr;
    }
  } catch (error) {
    console.error("주문 정보를 가져오는 도중 오류가 발생했습니다.", error);
  }
}

// 가격에 ,(쉼표) 삽입하는 함수
// function addComma(price) {
//   return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

loadOrderCompleted();
