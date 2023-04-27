import MainBanner, { BannerSlide } from "../../components/banner/bannerSlide.js";
import Layout from "../../components/layout/index.js";
import ProductCard from "../../components/product/product.js";

const run = () => {
  window.addEventListener("DOMContentLoaded", async () => {
    Layout();
    MainBanner();
    BannerSlide();
    ProductCard();
  });
};

run();
