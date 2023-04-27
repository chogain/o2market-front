const token = localStorage.getItem("Authorization");
const userId = localStorage.getItem("userId");

function updateMemberInformation(e) {
  e.preventDefault(); // prevent the default form submit action

  const nameInput = document.getElementById("name").value;
  const phoneInput = document.getElementById("phone").value;
  const addressInput = document.getElementById("address").value;

  // http://localhost:5500/api/v1/users/${userId}
  fetch(`/api/v1/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify({
      name: nameInput,
      // password: passwordInput,
      phone: phoneInput,
      address: addressInput,
    }),
  })
    .then((response) => {
      return response.json(); // 반환 값 처리
    })
    .then((data) => {
      console.log("User information updated successfully:", data);
      window.location.href = "../main/index.html";
    })
    .catch((error) => {
      console.error("Error updating user information:", error);
    });
}

// 인풋받는
const nameInput = document.getElementById("name");
const passwordInput = document.getElementById("password");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");

//http://localhost:5500/api/v1/users/${userId}
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
    // console.log(data);

    nameInput.value = data.name;
    // passwordInput.value = data.password;
    emailInput.value = data.email;
    phoneInput.value = data.phone;
    addressInput.value = data.address;
  })
  .catch((error) => {
    console.error("Error fetching user information:", error);
  });

// fetch(`http://localhost:5500/api/v1/users/${userId}`, {
//   method: "PATCH",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `${token}`,
//   },
//   body: JSON.stringify({
//     name: nameInput,
//     // password: passwordInput,
//     phone: phoneInput,
//     address: addressInput,
//   }),
// })
//   .then((response) => {
//     return response.json(); // 반환 값 처리
//   })
//   .then((data) => {
//     console.log("User information updated successfully:", data);
//   })
//   .catch((error) => {
//     console.error("Error updating user information:", error);
//   });

// function updateMemberInformation(member) {
//   // HTML 폼에 회원 정보 채우기
//   const nameInput = document.getElementById("name");
//   const idInput = document.getElementById("id");
//   const emailInput = document.getElementById("email");
//   const phoneInput = document.getElementById("phone");
//   const addressInput = document.getElementById("address");

//   nameInput.value = member[0].name;
//   idInput.value = member[0].id;
//   emailInput.value = member[0].email;
//   phoneInput.value = member[0].phone;
//   addressInput.value = member[0].address;

//   // 폼 전송 이벤트 핸들러 등록
//   const form = document.querySelector(".memberForm");
//   form.addEventListener("submit", (event) => {
//     event.preventDefault();

//     // 입력한 회원 정보 가져오기
//     const name = nameInput.value;
//     const id = idInput.value;
//     const email = emailInput.value;
//     const phone = phoneInput.value;
//     const address = addressInput.value;

//     // 수정된 회원 정보 서버에 전송
//     fetch("http://localhost:3000/member", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name,
//         id,
//         email,
//         phone,
//         address,
//       }),
//     })
//       .then((response) => {
//         if (response.ok) {
//           alert("회원 정보 수정이 완료되었습니다.");
//         } else {
//           alert("회원 정보 수정에 실패했습니다.");
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//         alert("회원 정보 수정에 실패했습니다.");
//       });
//   });
// }

// fetch("http://localhost:3000/member")
//   .then((response) => response.json())
//   .then((member) => {
//     updateMemberInformation(member);
//   })
//   .catch((error) => {
//     console.error(error);
//     alert("회원 정보를 가져오는 데 실패했습니다.");
//   });
