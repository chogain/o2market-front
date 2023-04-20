//최하단에 <footer id="footer"></footer> 생성
function Footer() {
  const footer = document.querySelector("footer");
  footer.innerHTML = `
        <div class="inner">
            <ul class="menu">
            <li>
                <a href="javascript:void(0)" class="green">회사소개</a>
            </li>
            <li>
                <a href="javascript:void(0)" class="green">가맹안내</a>
            </li>
            <li>
                <a href="javascript:void(0)" class="green">채용정보</a>
            </li>
            <li>
                <a href="javascript:void(0)" class="green">이용약관</a>
            </li>
            <li>
                <a href="javascript:void(0)" class="green">개인정보처리방침</a>
            </li>
            </ul>
            <div class="info">
            <span>사업자등록번호 000-00-00000</span>
            <span>(주)오이마켓</span>
            <span>TEL : 02) 0000-0000 / FAX : 02) 0000-0000</span>
            <span>개인정보 책임자 : xxx</span>
            </div>
    
            <p class="copyright">
            &copy; <span class="this-year"></span> O2 Market Company. All Right Reserved.
            </p>
        </div>
    `;
}
Footer();
