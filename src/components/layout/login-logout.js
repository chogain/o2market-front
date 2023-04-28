// 로그인 상태 체크하는 함수
export function checkLoginStatus() {
  const loginBtn = document.querySelector("#login-btn");
  // 토큰 가져오기
  const token = localStorage.getItem("token");

  if (token) {
    // 토큰이 있으면
    loginBtn.textContent = "로그아웃"; // 버튼 텍스트를 로그아웃으로 변경
    loginBtn.classList.remove("login"); // login 클래스 제거
    loginBtn.classList.add("logout"); // logout 클래스 추가
    loginBtn.addEventListener("click", handleLogout); // 로그아웃 클릭 이벤트 추가
  } else {
    // 토큰이 없으면
    loginBtn.textContent = "로그인"; // 버튼 텍스트를 로그인으로 변경
    loginBtn.classList.remove("logout"); // logout 클래스 제거
    loginBtn.classList.add("login"); // login 클래스 추가
    loginBtn.addEventListener("click", handleLogin); // 로그인 클릭 이벤트 추가
  }
}

// 로그인 클릭 시 처리하는 함수
export function handleLogin() {
  // 로그인 처리 로직
  // 로그인 페이지에서 토큰 발급 후 로컬 스토리지에 저장하는 코드 필요
  checkLoginStatus(); // 로그인 상태 체크
}

// 로그아웃 클릭 시 처리하는 함수
export function handleLogout() {
  // 로그아웃 처리 로직
  localStorage.clear(); // 토큰 삭제
  checkLoginStatus(); // 로그인 상태 체크
}

// 초기 로그인 상태 체크
