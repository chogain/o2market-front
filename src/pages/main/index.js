import MainBanner, { BannerSlide } from "../../components/banner/bannerSlide.js";
import ProductCard from "../../components/product/product.js";

const run = () => {
  window.addEventListener("DOMContentLoaded", () => {
    MainBanner();
    BannerSlide();
    ProductCard();
  });
};

run();
