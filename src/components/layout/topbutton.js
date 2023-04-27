// footer 바로 위에 <a href="#Top" class="top-btn">TOP</a>
export default function topButton() {
  const topBtn = document.querySelector(".top-btn");

  topBtn.addEventListener("click", (e) => {
    e.preventDefault();

    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  });
}
