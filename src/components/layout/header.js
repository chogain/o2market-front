// body 태그 아래 <header id="header"></header> 생성
export default function Header() {
  const header = document.querySelector("header");
  // <a href="/" class="title">오이마켓</a>
  header.innerHTML = `
    <div class="inner">
      <h1 class="logo">
        <p class="material-symbols-outlined">spo2<span>마켓</span></p>
      </h1>
      
      <ul class="main-menu">
        <li class="item">
          <div class="item__name">채소</div>
          <div class="item__contents">
            <div class="contents__menu">
              <ul class="inner">
                <li>
                  <h4>잎채소</h4>
                  <ul>
                    <li>쪽파</li>
                    <li>깻잎</li>
                    <li>상추</li>
                    <li>샐러리</li>
                    <li>양배추</li>
                  </ul>
                </li>
                <li>
                  <h4>열매채소</h4>
                  <ul>
                    <li>고추</li>
                    <li>단호박</li>
                    <li>파프리카</li>
                    <li>가지</li>
                    <li>컬리플라워</li>

                  </ul>
                </li>
                <li>
                  <h4>뿌리채소</h4>
                  <ul>
                    <li>고구마</li>
                    <li>당근</li>
                    <li>무우</li>
                    <li>콜라비</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li class="item">
          <div class="item__name">과일</div>
          <div class="item__contents">
            <div class="contents__menu">
              <ul class="inner">
                <li>
                  <h4>과일</h4>
                  <ul>
                    <li>사과</li>
                    <li>참외</li>
                    <li>메론</li>
                    <li>바나나</li>
                    <li>오렌지</li>
                    <li>토마토</li>
                    <li>매실</li>
                  </ul>
                </li>
                <li>
                  <h4>과일 가공품</h4>
                  <ul>
                    <li>곶감</li>
                    <li>건망고</li>
                    <li>냉동 아보카도</li>
                    <li>냉동 애플망고</li>
                    <li>아이스 홍시</li>
                    <li>바나나 칩</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>

      <div class="sub-menu">
        <ul class="menu">
          <li>
            <a href="/signin">로그인</a>
          </li>
          <li>
            <a href="/mypage">마이페이지</a>
          </li>
          <li>
            <a href="/mycart">장바구니</a>
          </li>
        </ul>
      </div>
    </div>
`;
}
