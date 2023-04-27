import Footer from "./footer.js";
import Header from "./header.js";
import topButton from "./topbutton.js";

const run = () => {
  window.addEventListener("DOMContentLoaded", () => {
    Header();
    Footer();
    topButton();
  });
};

run();
