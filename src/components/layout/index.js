import Footer from "./footer.js";
import Header from "./header.js";
import { checkLoginStatus } from "./login-logout.js";
import topButton from "./topbutton.js";

const run = () => {
  window.addEventListener("DOMContentLoaded", () => {
    Header();
    Footer();
    topButton();
    checkLoginStatus();
  });
};

run();
