// 로그인 필수값 확인 함수
function loginCheck() {
  let inputId = document.getElementById("id").value;
  let inputPassword = document.getElementById("password").value;
  let emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 정규식...

  if (inputId.length === 0) {
    alert("아이디를 입력하세요.");
    return false;
  } else if (!emailRegExp.test(inputId)) {
    alert("이메일 형식이 올바르지 않습니다.");
    return false;
  } else if (inputPassword.length === 0) {
    alert("비밀번호를 입력하세요.");
    return false;
  } else if (inputPassword.length < 6) {
    alert("비밀번호를 6자리 이상 입력해주세요.");
    return false;
  } else {
    document.getElementById("loginForm").submit();
    alert(`${inputId}님 환영합니다.`);
  }
}
