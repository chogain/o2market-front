export function goToMyPage(e) {
  e.preventDefault();
  window.location.href = "../../pages/myPage/index.html";
}

// 1. 로그인 했으면 로그인 버튼 가리고 로그아웃, 마이페이지 버튼 보여주기
// 2. 로그인을 안 했는데 `마이페이지 링크`에 접속하려고 하면 로그인 페이지로 이동시켜주기
// 3. 만약 로그인 했는데 로그인 페이지 들어오면 메인 페이지로 튕겨주기
// 5. 페이지에서 로그인을 안 했으면 그냥 해당 페이지에 있어도 됨

export function onLoad() {
  console.log("onLoad 실행");
  const myPageBtn = document.querySelector("#myPage-btn");
  console.log("myPageBtn : ", myPageBtn);

  // 토큰이 있는지 확인하고, 있으면 마이페이지 버튼 표시
  const token = localStorage.getItem("token");

  if (token) {
    myPageBtn.style.display = "block";
    if (window.location.pathname.includes("login")) {
      window.location.href = "../../pages/main/index.html";
    }
  } else {
    if (window.location.pathname.includes("myPage")) {
      window.location.href = "../../pages/main/index.html";
    }
  }
}
