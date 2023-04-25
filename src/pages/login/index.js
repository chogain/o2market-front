// 로그인에 필요한거 생각 이메일 비밀번호만 서버에 보내면
// let email = document.getElementById("email");
// let isValidEmail = false;

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
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: inputEmail,
      password: inputPassword,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // response body를 JSON으로 변환
      } else {
        throw new Error("Login failed"); // 에러 발생시키기
      }
    })
    .then((data) => {
      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem("token", data.token);
      // alert(`로그인 토큰:${data.token}`);
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
