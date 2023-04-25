function displayOrderInfo(data) {
  const orderHistory = data[0].orderHistory;

  // 주문 정보 표시
  const orderNumber = document.getElementById("orderNumber");
  orderNumber.innerText = orderHistory[0].orderNumber;

  const orderDate = document.getElementById("orderDate");
  orderDate.innerText = orderHistory[0].orderDate;

  const totalPayment = document.getElementById("totalPayment");
  const totalPrice = orderHistory.reduce((total, order) => total + order.price, 0);
  totalPayment.innerText = totalPrice.toLocaleString() + "원";

  // 상품 정보 표시
  const productList = document.getElementById("productList");
  const productUl = productList.getElementsByTagName("ul")[0];

  for (let order of orderHistory) {
    const productLi = document.createElement("li");
    productLi.innerText = `${order.product}: ${order.price.toLocaleString()}원`;
    productUl.appendChild(productLi);
  }
}

fetch("http://localhost:3000/member")
  .then((response) => response.json())
  .then((data) => displayOrderInfo(data))
  .catch((error) => console.error(error));
