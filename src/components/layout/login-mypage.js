// 사용자가 마이페이지에 들어갈 때 호출되는 함수
export function goToMyPage() {
  const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰을 가져옴

  if (token) {
    // 토큰이 있으면 마이페이지로 이동
    window.location.href = "../../pages/myPage/index.html";
  } else {
    // 토큰이 없으면 로그인 페이지로 이동
    window.location.href = "../../pages/login/index.html";
  }
}

// 메인 페이지 로딩 시 호출되는 함수
export function onLoad() {
  const myPageBtn = document.querySelector("#myPage-btn"); // 마이페이지 버튼 요소 가져오기
  myPageBtn.addEventListener("click", goToMyPage); // 마이페이지 버튼 클릭 시 goToMyPage 함수 호출
}
