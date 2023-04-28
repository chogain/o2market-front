const token = localStorage.getItem("Authorization");
const userId = localStorage.getItem("userId");

// const userId = JSON.parse(localStorage.getItem("userId"));
// const token = JSON.parse(localStorage.getItem("Authorization"));

// const token = JSON.parse(localStorage.getItem("Authorization"));
// const userId = JSON.parse(localStorage.getItem("userId"));

// console.log(token);
// console.log(userId);
// console.log(localStorage);

// let orderNumber;
// let memberId;

// // memberData 초기화
// let memberData = {};

// 이름, 포인트, 쿠폰 정보 출력하는 함수

// 이름 넣기
// http://localhost:5500/api/v1/users/${userId}
fetch(`/api/v1/users/${userId}`, {
  method: "GET",
  headers: {
    Authorization: `${token}`, // 로그인 토큰
  },
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    document.getElementById("name").textContent = data.name;
    // console.log(data);
  })
  .catch((error) => {
    console.error("Error fetching user information:", error);
  });

// 배달 상태 받아오기
// http://localhost:5500/api/v1/orders/${userId}
fetch(`/api/v1/orders/${userId}`, {
  method: "GET",
  headers: {
    Authorization: `${token}`, // 로그인 토큰
  },
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    let preparingForDeliveryCount = 0;
    let inDeliveryCount = 0;
    let deliveryCompleteCount = 0;

    // 각 배송 상태에 따른 주문 수 계산
    data.forEach((order) => {
      if (order.deliveryState === 0) {
        preparingForDeliveryCount++;
      } else if (order.deliveryState === 1) {
        inDeliveryCount++;
      } else if (order.deliveryState === 2) {
        deliveryCompleteCount++;
      }
    });

    // div에 주문 수 표시
    const preparingForDeliveryDiv = document.querySelector(".preparingForDeliveryDiv");
    const inDeliveryDiv = document.querySelector(".inDeliveryDiv");
    const deliveryCompleteDiv = document.querySelector(".deliveryCompleteDiv");

    preparingForDeliveryDiv.textContent = `배송준비중: ${preparingForDeliveryCount}건`;
    inDeliveryDiv.textContent = `배송중: ${inDeliveryCount}건`;
    deliveryCompleteDiv.textContent = `배송완료: ${deliveryCompleteCount}건`;
  })
  .catch((error) => {
    console.error("Error fetching user information:", error);
  });

// 주문 상태 받아오기
//localhost:5500/api/v1/orders/${userId}
fetch(`/api/v1/orders/${userId}`, {
  method: "GET",
  headers: {
    Authorization: `${token}`, // 로그인 토큰
  },
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const orderStateDiv = document.getElementById("orderStateDiv");

    // 주문 정보가 있을 경우
    if (data.length > 0) {
      // 주문 정보를 담은 HTML 요소 생성
      const orderList = document.createElement("ul");

      data.forEach((order) => {
        // 주문에 대한 정보를 담은 HTML 요소 생성
        order.orderItems.forEach((orderItem, index) => {
          const orderItemIndex = index + 1;
          const orderItemElement = document.createElement("li");

          let deliveryStateText;
          if (order.deliveryState === 0) {
            deliveryStateText = "배송준비중";
          } else if (order.deliveryState === 1) {
            deliveryStateText = "배송중";
          } else if (order.deliveryState === 2) {
            deliveryStateText = "배송완료";
          }

          orderItemElement.textContent = `${orderItem.productName} - ${orderItem.quantity}개, ${orderItem.price}원 (${deliveryStateText})`;
          orderList.appendChild(orderItemElement);
        });
      });

      // 주문 정보를 담은 HTML 요소를 div에 추가
      orderStateDiv.appendChild(orderList);

      // "최근 주문내역이 없습니다." 문구 제거
      const orderStateDivHeader = document.getElementById("orderStateDivHeader");
      orderStateDiv.removeChild(orderStateDivHeader);

      // 삭제 버튼 디스플레이 block으로 변경
      const deleteOrderButton = document.getElementById("deleteOrderButton");
      deleteOrderButton.style.display = "block";
    }
  })
  .catch((error) => {
    console.error("Error fetching user information:", error);
  });

//주문취소
// const orderId = ;

// fetch(`http://localhost:5500/api/v1/orders/${userId}`, {
//   method: "DELETE",
//   headers: {
//     Authorization: `${token}`, // 로그인 토큰
//   },
// })
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     //
//   })
//   .catch((error) => {
//     console.error("Error fetching user information:", error);
//   });

// 주문취소
// fetch(`http://localhost:5500/api/v1/orders/${userId}`, {
//   method: "GET",
//   headers: {
//     Authorization: `${token}`, // 로그인 토큰
//   },
// })
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     renderOrderList(data);
//   })
//   .catch((error) => {
//     console.error("Error fetching user information:", error);
//   });

// function renderOrderList(orderList) {
//   const orderStateDiv = document.getElementById("orderStateDiv");
//   const orderStateDivHeader = document.getElementById("orderStateDivHeader");

//   // 주문내역이 없을 경우
//   if (orderList.length === 0) {
//     orderStateDivHeader.textContent = "최근 주문내역이 없습니다.";
//     return;
//   }

//   // 주문내역이 있을 경우
//   orderStateDivHeader.textContent = "주문내역";
//   orderList.forEach((order) => {
//     const orderDiv = document.createElement("div");
//     orderDiv.setAttribute("data-order-id", order._id);

//     const orderInfoDiv = document.createElement("div");
//     const orderAddrP = document.createElement("p");
//     orderAddrP.textContent = `주문 주소: ${order.orderAddr}`;
//     const deliveryStateP = document.createElement("p");
//     deliveryStateP.textContent = `배송 상태: ${order.deliveryState}`;

//     orderInfoDiv.appendChild(orderAddrP);
//     orderInfoDiv.appendChild(deliveryStateP);

//     const orderItemsDiv = document.createElement("div");
//     order.orderItems.forEach((item) => {
//       const orderItemDiv = document.createElement("div");
//       const productNameP = document.createElement("p");
//       productNameP.textContent = `상품명: ${item.productId}`;
//       const quantityP = document.createElement("p");
//       quantityP.textContent = `수량: ${item.quantity}`;
//       const priceP = document.createElement("p");
//       priceP.textContent = `가격: ${item.price}`;

//       orderItemDiv.appendChild(productNameP);
//       orderItemDiv.appendChild(quantityP);
//       orderItemDiv.appendChild(priceP);

//       const deleteButton = document.createElement("button");
//       deleteButton.textContent = "주문 취소";
//       deleteButton.addEventListener("click", () => {
//         deleteOrder(order._id, item._id);
//       });

//       orderItemDiv.appendChild(deleteButton);
//       orderItemsDiv.appendChild(orderItemDiv);
//     });

//     orderDiv.appendChild(orderInfoDiv);
//     orderDiv.appendChild(orderItemsDiv);
//     orderStateDiv.appendChild(orderDiv);
//   });
// }

// // 삭제 함수
// function deleteOrder(userId, orderId, token) {
//   fetch(`http://localhost:5500/api/v1/orders/${userId}/${orderId}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `${token}`, // 로그인 토큰
//     },
//   })
//     .then((response) => {
//       // 삭제가 완료되면 해당 주문 정보를 화면에서 제거합니다.
//       const orderDiv = document.querySelector(`[data-order-id="${orderId}"]`);
//       orderDiv.remove();

//       // 삭제 이후, 최근 주문내역이 없다면 안내 메시지를 보여줍니다.
//       const orderItems = document.querySelectorAll("[data-order-id]");
//       if (orderItems.length === 0) {
//         const orderStateDiv = document.getElementById("orderStateDiv");
//         const orderStateDivHeader = document.getElementById("orderStateDivHeader");
//         orderStateDivHeader.textContent = "최근 주문내역이 없습니다.";
//       }
//     })
//     .catch((error) => {
//       console.error("Error deleting order:", error);
//     });
// }

// 주문 상태 정보 출력하는 함수
// function showOrderState(memberData) {
//   const orderStatus = memberData[0].orderHistory.map((order) => order.orderStatus);

//   const orderReceivedNum = orderStatus.filter((status) => status === "주문접수").length;
//   const paymentCompletedNum = orderStatus.filter(
//     (status) => status === "결제완료",
//   ).length;
//   const preparingForDeliveryNum = orderStatus.filter(
//     (status) => status === "배송준비중",
//   ).length;
//   const inDeliveryNum = orderStatus.filter((status) => status === "배송중").length;
//   const deliveryCompleteNum = orderStatus.filter(
//     (status) => status === "배송완료",
//   ).length;

//   document.querySelector(".orderReceivedDiv").innerText = `주문접수 ${ orderReceivedNum }`;
//   document.querySelector(
//     ".paymentCompletedDiv",
//   ).innerText = `결제완료 ${ paymentCompletedNum }`;
//   document.querySelector(
//     ".preparingForDeliveryDiv",
//   ).innerText = `배송준비중 ${ preparingForDeliveryNum }`;
//   document.querySelector(".inDeliveryDiv").innerText = `배송중 ${ inDeliveryNum }`;
//   document.querySelector(
//     ".deliveryCompleteDiv",
//   ).innerText = `배송완료 ${ deliveryCompleteNum }`;
// }

// // 주문 이력 출력하는 함수
// function showOrderHistory(memberData) {
//   const Div = document.getElementById("orderStateDiv");
//   const id = memberData[0].id;
//   memberData[0].orderHistory.map((key) => {
//     const newDiv = document.createElement("div");
//     newDiv.textContent =
//       key.orderDate +
//       "\n" +
//       key.product +
//       "\n" +
//       key.numberOfProducts +
//       "개\n" +
//       key.orderStatus;

//     if (key.orderStatus === "주문접수" || key.orderStatus === "결제완료") {
//       const cancelButton = document.createElement("button");
//       cancelButton.className = "btn";
//       cancelButton.textContent = "주문취소";
//       cancelButton.onclick = function () {
//         deleteOrder(key.orderNumber);
//       };

//       const changeDiv = document.createElement("div");
//       changeDiv.className = "changeDiv";

//       const changeLabel = document.createElement("label");
//       changeLabel.textContent = "수량: ";
//       const changeSelect = document.createElement("select");
//       for (let i = 1; i <= 10; i++) {
//         const option = document.createElement("option");
//         option.value = i;
//         option.text = i;
//         changeSelect.appendChild(option);
//       }

//       const changeButton = document.createElement("button");
//       changeButton.className = "btn";
//       changeButton.textContent = "주문변경";
//       changeButton.onclick = function () {
//         updateNumberOfProducts(key.orderNumber, changeSelect.value);
//       };

//       changeDiv.appendChild(changeLabel);
//       changeDiv.appendChild(changeSelect);
//       changeDiv.appendChild(changeButton);

//       newDiv.appendChild(cancelButton);
//       newDiv.appendChild(changeDiv);
//     }

//     Div.appendChild(newDiv);
//   });

//   let header = document.getElementById("orderStateDivHeader");
//   if (memberData[0].orderHistory.length > 0) {
//     header.style.display = "none";
//   }
// }

// // fetch 함수 실행
// fetch("http://localhost:3000/member")
//   .then((response) => response.json())
//   .then((data) => {
//     memberData = data;
//     return showMemberInfo(memberData);
//   })
//   .then(() => showOrderState(memberData))
//   .then(() => showOrderHistory(memberData))
//   .catch((error) => console.error(error));

// // 삭제
// function deleteOrder(orderNum) {
//   let orderNumber = String(orderNum);
//   console.log(orderNumber);
//   let memberId = memberData[0].id;

//   fetch(`http://localhost:3000/member/${memberId}`, {
//     method: "DELETE",
//   })
//     .then(() => alert("주문이 취소되었습니다"))
//     .catch(() => alert("주문취소에 실패했습니다"));
// }

// // 변경
// function updateNumberOfProducts(orderNum, newNumberOfProducts) {
//   const orderNumber = String(orderNum);
//   const memberId = memberData[0].id;

//   // 해당 주문을 찾아서 numberOfProducts 값을 변경
//   memberData[0].orderHistory.forEach((order) => {
//     if (order.orderNumber === orderNumber) {
//       order.numberOfProducts = newNumberOfProducts;
//     }
//   });

//   // 서버에 변경된 회원 데이터를 업데이트
//   fetch(`http://localhost:3000/member/${memberId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(memberData[0]),
//   })
//     .then(() => alert("주문 수량이 변경되었습니다"))
//     .catch(() => alert("주문 수량 변경에 실패했습니다"));
// }
