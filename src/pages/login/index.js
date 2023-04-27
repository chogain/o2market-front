const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

// 로그인 토큰 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDQ3NzExZjI3YzdkYjQ1MGJlODYwYmEiLCJpYXQiOjE2ODI0Nzg0NDl9.YkNiLP6sUpRtDwTxjZjDTFCBvB_3aaExGiXzU3BFflo

// 로그인 필수값 확인 함수
// 로그인 필수값 확인 함수
function loginCheck(e) {
  e.preventDefault();
  const inputEmail = document.getElementById("email").value;
  const inputPassword = document.getElementById("password").value;
  const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 정규식…
  const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  // 이메일 검사
  if (!emailRegExp.test(inputEmail)) {
    alert("올바른 이메일 주소를 입력해주세요.");
    return;
  }

  // 비밀번호 검사
  if (!passwordRegExp.test(inputPassword)) {
    alert("비밀번호는 영문자, 특수문자, 숫자가 포함된 8자리 이상의 수 입니다.");
    return;
  }

  fetch("http://localhost:5500/api/v1/users/signIn", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // 로그인 토큰
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: inputEmail,
      password: inputPassword,
    }),
  })
    .then((response) => {
      return response.json(); // response body를 JSON으로 변환
    })
    .then((data) => {
      // 토큰을 로컬 스토리지에 저장

      // const userId = data.userId; // 서버에서 반환한 사용자 식별자 값
      // const token = data.token;
      // localStorage.setItem("userId", JSON.stringify({ id: userId }));
      // localStorage.setItem("token", JSON.stringify({ token: token }));
      localStorage.setItem("userId", data.userId); // 로컬 스토리지에 저장
      localStorage.setItem("token", data.token);
      localStorage.setItem("Authorization", `Bearer ${data.token}`);
      // alert(userId);
      window.location.href = "http://127.0.0.1:3000/src/pages/main/index.html";
      // alert(`로그인 토큰:${data.token}`);
      // alert(data._id);
      // console.log(data.token);
    })
    .catch((error) => {
      console.error("Error logging in:", error);
      if (error.message === "Login failed") {
        alert("이메일과 비밀번호를 확인해주세요.");
      } else {
        alert(error.message);
      }
    });
}
