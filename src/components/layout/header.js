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
                    <!-- <li><a href="/product/1">양상추</a></li> -->
                    <li><a href="/product/2">양배추</a></li>
                    <li><a href="/product/3">시금치</a></li>
                    <li><a href="/product/4">파슬리</a></li>
                    <li><a href="/product/5">청경채</a></li>
                  
                  
                  </ul>
                </li>
                <li>
                  <h4>열매채소</h4>
                  <ul>
                    <li><a href="/product/10">파프리카</a></li>
                    <li><a href="/product/11">가지</a></li>
                    <li><a href="/product/12">청피망</a></li>
                    <li><a href="/product/13">홍고추</a></li>
                    <li><a href="/product/14">고추</a></li>
                    <li><a href="/product/15">완두콩</a></li>
                    
                  </ul>
                </li>
                <li>
                  <h4>뿌리채소</h4>
                  <ul>
                    <li><a href="/product/5">양파</a></li>
                    <li><a href="/product/5">자색양파</a></li>
                    <li><a href="/product/5">통마늘</a></li>
                    <li><a href="/product/5">새척당근</a></li>
                    <li><a href="/product/5">고구마</a></li>
              

                  </ul>
                </li>
                <li>
                  <h4>버섯</h4>
                  <ul>
                    <li><a href="/product/5">양송이버섯</a></li>
                    <li><a href="/product/5">표고버섯</a></li>
                    <li><a href="/product/5">새송이섯</a></li>
                    <li><a href="/product/5">팽이버섯</a></li>
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
                    <li><a href="/product/5">블루베리</a></li>
                    <li><a href="/product/5">오렌지</a></li>
                    <li><a href="/product/5">토마토</a></li>
                    <li><a href="/product/5">천도복숭아</a></li>
                    <li><a href="/product/5">키위</a></li>
                  </ul>
                </li>
                <li>
                  <h4>열대 과일</h4>
                  <ul>
                    <li><a href="/product/5">납작복숭아</a></li>
                    <li><a href="/product/5">메론</a></li>
                    <li><a href="/product/5">바나나</a></li>
                    <li><a href="/product/5">아보카도</a></li>
                    <li><a href="/product/5">체리</a></li>
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
            <a href="../../pages/myPage/index.html" id="myPage-btn">마이페이지</a>
          </li>
          <li>
            <a href="../../pages/cart/index.html">장바구니</a>
          </li>
        </ul>
      </div>
    </div>
`;
}
