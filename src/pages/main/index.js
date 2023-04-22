import MainBanner from "../../components/banner/bannerSlide.js";
import Layout from "../../components/layout/index.js";
import ProdcutCard from "../../components/product/product.js";

const run = () => {
  window.addEventListener("DOMContentLoaded", async () => {
    Layout();
    MainBanner();
    ProdcutCard();
  });
};

run();
