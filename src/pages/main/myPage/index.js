const topBtn = document.querySelector(".top-btn");

let orderNumber;
let memberId; // id 변수를 전역 변수로 선언

// memberData 초기화
let memberData = {};

// 이름, 포인트, 쿠폰 정보 출력하는 함수
function showMemberInfo(memberData) {
  document.getElementById("name").innerText = memberData[0].name;
  document.getElementById("point").innerText = memberData[0].point;
  document.getElementById("coupon").innerText = memberData[0].coupon;
}

// 주문 상태 정보 출력하는 함수
function showOrderState(memberData) {
  const orderStatus = memberData[0].orderHistory.map((order) => order.orderStatus);

  const orderReceivedNum = orderStatus.filter((status) => status === "주문접수").length;
  const paymentCompletedNum = orderStatus.filter(
    (status) => status === "결제완료",
  ).length;
  const preparingForDeliveryNum = orderStatus.filter(
    (status) => status === "배송준비중",
  ).length;
  const inDeliveryNum = orderStatus.filter((status) => status === "배송중").length;
  const deliveryCompleteNum = orderStatus.filter(
    (status) => status === "배송완료",
  ).length;

  document.querySelector(".orderReceivedDiv").innerText = `주문접수 ${orderReceivedNum}`;
  document.querySelector(
    ".paymentCompletedDiv",
  ).innerText = `결제완료 ${paymentCompletedNum}`;
  document.querySelector(
    ".preparingForDeliveryDiv",
  ).innerText = `배송준비중 ${preparingForDeliveryNum}`;
  document.querySelector(".inDeliveryDiv").innerText = `배송중 ${inDeliveryNum}`;
  document.querySelector(
    ".deliveryCompleteDiv",
  ).innerText = `배송완료 ${deliveryCompleteNum}`;
}

// 주문 이력 출력하는 함수
function showOrderHistory(memberData) {
  const Div = document.getElementById("orderStateDiv");
  const id = memberData[0].id;
  memberData[0].orderHistory.map((key) => {
    const newDiv = document.createElement("div");
    newDiv.textContent =
      key.orderDate +
      "\n" +
      key.product +
      "\n" +
      key.numberOfProducts +
      "개\n" +
      key.orderStatus;

    if (key.orderStatus === "주문접수" || key.orderStatus === "결제완료") {
      const cancelButton = document.createElement("button");
      cancelButton.className = "btn";
      cancelButton.textContent = "주문취소";
      cancelButton.onclick = function () {
        deleteOrder(key.orderNumber);
      };

      const changeDiv = document.createElement("div");
      changeDiv.className = "changeDiv";

      const changeLabel = document.createElement("label");
      changeLabel.textContent = "수량: ";
      const changeSelect = document.createElement("select");
      for (let i = 1; i <= 10; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = i;
        changeSelect.appendChild(option);
      }

      const changeButton = document.createElement("button");
      changeButton.className = "btn";
      changeButton.textContent = "주문변경";
      changeButton.onclick = function () {
        updateNumberOfProducts(key.orderNumber, changeSelect.value);
      };

      changeDiv.appendChild(changeLabel);
      changeDiv.appendChild(changeSelect);
      changeDiv.appendChild(changeButton);

      newDiv.appendChild(cancelButton);
      newDiv.appendChild(changeDiv);
    }

    Div.appendChild(newDiv);
  });

  let header = document.getElementById("orderStateDivHeader");
  if (memberData[0].orderHistory.length > 0) {
    header.style.display = "none";
  }
}

// fetch 함수 실행
fetch("http://localhost:3000/member")
  .then((response) => response.json())
  .then((data) => {
    memberData = data;
    return showMemberInfo(memberData);
  })
  .then(() => showOrderState(memberData))
  .then(() => showOrderHistory(memberData))
  .catch((error) => console.error(error));

// 삭제
function deleteOrder(orderNum) {
  let orderNumber = String(orderNum);
  console.log(orderNumber);
  let memberId = memberData[0].id;

  fetch(`http://localhost:3000/member/${memberId}`, {
    method: "DELETE",
  })
    .then(() => alert("주문이 취소되었습니다"))
    .catch(() => alert("주문취소에 실패했습니다"));
}

// 변경
function updateNumberOfProducts(orderNum, newNumberOfProducts) {
  const orderNumber = String(orderNum);
  const memberId = memberData[0].id;

  // 해당 주문을 찾아서 numberOfProducts 값을 변경
  memberData[0].orderHistory.forEach((order) => {
    if (order.orderNumber === orderNumber) {
      order.numberOfProducts = newNumberOfProducts;
    }
  });

  // 서버에 변경된 회원 데이터를 업데이트
  fetch(`http://localhost:3000/member/${memberId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memberData[0]),
  })
    .then(() => alert("주문 수량이 변경되었습니다"))
    .catch(() => alert("주문 수량 변경에 실패했습니다"));
}

// 흠... 어렵다
// function deleteOrder(orderNum) {
//   const orderNumber = String(orderNum);

//   fetch("http://localhost:3000/member", {
//     method: "GET",
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       const member = data.find((member) => {
//         return member.orderHistory.some((order) => {
//           return order.orderNumber === orderNumber;
//         });
//       });

//       if (!member) {
//         throw new Error("해당 주문번호를 가진 회원을 찾을 수 없습니다.");
//       }

//       member.orderHistory = member.orderHistory.filter((order) => {
//         return order.orderNumber !== orderNumber;
//       });

//       return fetch(`http://localhost:3000/member/${member.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(member),
//       });
//     })
//     .then(() => alert("주문이 취소되었습니다."))
//     .catch((error) => alert(error.message));
// }
