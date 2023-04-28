import Footer from "./footer.js";
import Header from "./header.js";
import { checkLoginStatus } from "./login-logout.js";
//import { goToMyPage } from "./login-mypage.js";
import topButton from "./topbutton.js";

const run = () => {
  window.addEventListener("DOMContentLoaded", () => {
    Header();
    Footer();
    topButton();
    checkLoginStatus();
    //goToMyPage();

    // const myPageBtn = document.querySelector("#myPage-btn");
    // myPageBtn.addEventListener("click", () => {
    //   const token = localStorage.getItem("token");
    //   if (token) {
    //     // 로그인 되어 있으면 마이페이지로 이동
    //     window.location.href = "../../pages/myPage/index.html";
    //   } else {
    //     // 로그인 되어 있지 않으면 로그인 페이지로 이동
    //     window.location.href = "../../pages/login/index.html";
    //   }
    // });
  });
};

run();
