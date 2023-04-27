const loginBtn = document.querySelector("#login-btn");

// 로그인 상태 체크하는 함수
function checkLoginStatus() {
  // 토큰 가져오기
  const token = localStorage.getItem("token");

  if (token) {
    // 토큰이 있으면
    loginBtn.textContent = "로그아웃"; // 버튼 텍스트를 로그아웃으로 변경
    loginBtn.removeEventListener("click", handleLogin); // 로그인 클릭 이벤트 제거
    loginBtn.addEventListener("click", handleLogout); // 로그아웃 클릭 이벤트 추가
  } else {
    // 토큰이 없으면
    loginBtn.textContent = "로그인"; // 버튼 텍스트를 로그인으로 변경
    loginBtn.removeEventListener("click", handleLogout); // 로그아웃 클릭 이벤트 제거
    loginBtn.addEventListener("click", handleLogin); // 로그인 클릭 이벤트 추가
  }
}

// 로그인 클릭 시 처리하는 함수
function handleLogin() {
  // 로그인 처리 로직
  localStorage.setItem("token", "my_token"); // 토큰 저장
  checkLoginStatus(); // 로그인 상태 체크
}

// 로그아웃 클릭 시 처리하는 함수
function handleLogout() {
  // 로그아웃 처리 로직
  localStorage.removeItem("token"); // 토큰 삭제
  checkLoginStatus(); // 로그인 상태 체크
}

// 초기 로그인 상태 체크
checkLoginStatus();
