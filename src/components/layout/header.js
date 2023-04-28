// import checkLoginStatus from "./login-logout.js";
// checkLoginStatus();

// body 태그 아래 <header id="header"></header> 생성
export default function Header() {
  const header = document.querySelector("header");
  // <a href="/" class="title">오이마켓</a>
  header.innerHTML = `
    <div class="inner">
      
      <ul class="main-menu">
        <li class="item">
          <div class="item__name vegetable">  <a href="../../pages/product-list">채소</a></div>
          <div class="item__contents">
            <div class="contents__menu">
              <ul class="inner">
                <li>
                  <h4>잎채소</h4>
                  <ul>
                    <!-- <li><a href="../../../src/pages/product-detail/3">양상추</a></li> -->
                    <li>양배추</li>
                    <li>시금치</li>
                    <li>쑥갓</li>
                    <li>파슬리</li>
                  
                  
                  </ul>
                </li>
                <li>
                  <h4>열매채소</h4>
                  <ul>
                    <li>파프리카</li>
                    <li>가지</li>
                    <li>청피망</li>
                    <li>홍고추</li>
                    <li>고추</li>
                    <li>완두콩</li>
                    
                  </ul>
                </li>
                <li>
                  <h4>뿌리채소</h4>
                  <ul>
                    <li>양파</li>
                    <li>자색양파</li>
                    <li>통마늘</li>
                    <li>새척당근</li>
                    <li>고구마</li>
              

                  </ul>
                </li>
                <li>
                  <h4>버섯</h4>
                  <ul>
                    <li>양송이버섯</li>
                    <li>표고버섯</li>
                    <li>새송이버섯</li>
                    <li>팽이버섯</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li class="item">
          <div class="item__name fruit"><a href="../../pages/product-list">과일</a></div>
          <div class="item__contents">
            <div class="contents__menu">
              <ul class="inner">
                <li>
                  <h4>생과일</h4>
                  <ul>
                    <li>블루베리</li>
                    <li>오렌지</li>
                    <li>토마토</li>
                    <li>천도복숭아</li>
                    <li>키위</li>
                  </ul>
                </li>
                <li>
                  <h4>열대 과일</h4>
                  <ul>
                    <li>납작복숭아</li>
                    <li>메론</li>
                    <li>바나나</li>
                    <li>아보카도</li>
                    <li>체리</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
      
      <h1 class="logo">
        <span class="material-symbols-outlined">spo2</span>
        <a href="../../pages/main/index.html" class="title">O2마켓</a>
      </h1>
      

      <div class="sub-menu">
        <ul class="menu">
          <li>
            <a href="../../pages/login/index.html" id="login-btn" >로그인</a>
          </li>
          <li>
            <a href="../../pages/myPage/index.html">마이페이지</a>
          </li>
          <li>
            <a href="../../pages/cart/index.html">장바구니</a>
          </li>
        </ul>
      </div>
    </div>
`;
}
