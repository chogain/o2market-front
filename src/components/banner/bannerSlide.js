const mainBannerSlide = document.querySelector("#main-banner-slide");

export default function MainBanner() {
  const mainBannerSlideTemplate = `
   <section class="banner">
      <div class="slide-container">
      </div>

      <div class="slide-prev">
        <span class="material-symbols-outlined">
          arrow_back_ios_new
        </span>
      </div>
      <div class="slide-next">
        <span class="material-symbols-outlined">
          arrow_forward_ios
        </span>
      </div>
      <ul class="slide-pagination"></ul>
    </section>
`;

  const mainBannerImages = ["img01", "img02", "img03", "img04"];
  const mainBannnerList = mainBannerImages.map(
    (image) =>
      `<div class="slide-item">
      <a herf="#" class="banner-link">
        <img class="banner-img" src="../../assets/images/banner-${image}.png" alt=${image} />
      </a>
    </div>`,
  );

  mainBannerSlide.innerHTML = mainBannerSlideTemplate;
  const slideContainer = mainBannerSlide.querySelector(".slide-container");
  slideContainer.innerHTML = mainBannnerList.join("");
}

// =====================슬라이드 기능 구현=====================
export function BannerSlide() {
  // 슬라이드 전체 크기(width 구하기)
  const slide = document.querySelector(".slide-container");
  let slideWidth = slide.clientWidth;

  // 버튼 엘리먼트 선택하기
  const prevBtn = document.querySelector(".slide-prev");
  const nextBtn = document.querySelector(".slide-next");

  // 슬라이드 전체를 선택해 값을 변경해주기 위해 슬라이드 전체 선택하기
  let slideItems = document.querySelectorAll(".slide-item");
  // 현재 슬라이드 위치가 슬라이드 개수를 넘기지 않게 하기 위한 변수
  const maxSlide = slideItems.length;

  //  1이라는 초기값 할당. 슬라이드 쇼에서 현재 보여지는 슬라이드의 페이지 번호를 나타냄
  let currSlide = 1;

  // 페이지네이션 생성
  const pagination = document.querySelector(".slide-pagination");

  for (let i = 0; i < maxSlide; i++) {
    if (i === 0) pagination.innerHTML += "<li class='active'>•</li>";
    else pagination.innerHTML += "<li>•</li>";
  }

  const paginationItems = document.querySelectorAll(".slide-pagination > li");

  // 무한 슬라이드를 위해 start, end 슬라이드 복사하기
  const startSlide = slideItems[0];
  const endSlide = slideItems[slideItems.length - 1];
  const startElem = document.createElement("div");
  const endElem = document.createElement("div");

  //endSlide 요소에 적용된 클래스(class)를 endElem 요소에 복제
  endSlide.classList.forEach((c) => endElem.classList.add(c));
  endElem.innerHTML = endSlide.innerHTML;

  //startSlide 요소에 적용된 클래스를 startElem 요소에 복제하고, startSlide 요소의 내부 HTML 코드를 startElem 요소에 복사
  startSlide.classList.forEach((c) => startElem.classList.add(c));
  startElem.innerHTML = startSlide.innerHTML;

  // 첫번째 슬라이드를 마지막에 추가하고, 마지막 슬라이드를 첫번째에 추가함으로써, 마치 무한 루프처럼 슬라이드를 보여주는 효과를 만들어냄
  // before() 메소드는 인자로 전달된 요소를 자신의 이전 형제 요소로 추가하고, after() 메소드는 인자로 전달된 요소를 자신의 다음 형제 요소로 추가
  slideItems[0].before(endElem);
  slideItems[slideItems.length - 1].after(startElem);

  // 슬라이드 전체를 선택해 값을 변경해주기 위해 슬라이드 전체 선택하기
  slideItems = document.querySelectorAll(".slide-item");

  //offset : 다음 슬라이드가 나타날 위치를 계산하기 위한 것
  let offset = slideWidth + currSlide;
  slideItems.forEach((i) => {
    i.setAttribute("style", `left: ${-offset}px`);
  });

  function nextMove() {
    currSlide++;
    // 마지막 슬라이드 이상으로 넘어가지 않게 하기 위해서
    if (currSlide <= maxSlide) {
      // 슬라이드를 이동시키기 위한 offset 계산
      const offset = slideWidth * currSlide;
      // 각 슬라이드 아이템의 left에 offset 적용
      slideItems.forEach((i) => {
        i.setAttribute("style", `left: ${-offset}px`);
      });
      // 슬라이드 이동 시 현재 활성화된 pagination 변경
      paginationItems.forEach((i) => i.classList.remove("active"));
      paginationItems[currSlide - 1].classList.add("active");
    } else {
      // 무한 슬라이드 기능 - currSlide 값만 변경해줘도 되지만 시각적으로 자연스럽게 하기 위해 아래 코드 작성
      //현재 위치한 슬라이드가 마지막 슬라이드에 도달했을 때, 슬라이드를 처음 위치로 이동시키는 효과를 자연스럽게 보이기 위해서 transition 속성을 0으로 설정하여 바로 이동하도록 구현
      currSlide = 0;
      let offset = slideWidth * currSlide;
      slideItems.forEach((i) => {
        i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`); //화면 전환을 즉시 발생시키는 역할
      });
      currSlide++;
      offset = slideWidth * currSlide;
      //셋타임아웃 함수가 없으면 이전 슬라이드가 다 사라지기 전에 새로운 슬라이드가 보이기 때문에 화면 전환이 부자연스러움
      setTimeout(() => {
        // 각 슬라이드 아이템의 left에 offset 적용
        slideItems.forEach((i) => {
          i.setAttribute("style", `transition: ${0.8}s; left: ${-offset}px`); //화면 전환을 부드럽게 만드는 역할
        });
      }, 0);
      // // 슬라이드 이동 시 현재 활성화된 pagination 변경
      paginationItems.forEach((i) => i.classList.remove("active"));
      paginationItems[currSlide - 1].classList.add("active");
    }
  }
  function prevMove() {
    currSlide--;
    // 1번째 슬라이드 이하로 넘어가지 않게 하기 위해서
    if (currSlide > 0) {
      // 슬라이드를 이동시키기 위한 offset 계산
      const offset = slideWidth * currSlide;
      // 각 슬라이드 아이템의 left에 offset 적용
      slideItems.forEach((i) => {
        i.setAttribute("style", `left: ${-offset}px`);
      });
      // 슬라이드 이동 시 현재 활성화된 pagination 변경
      paginationItems.forEach((i) => i.classList.remove("active"));
      paginationItems[currSlide - 1].classList.add("active");
    } else {
      // 무한 슬라이드 기능 - currSlide 값만 변경해줘도 되지만 시각적으로 자연스럽게 하기 위해 아래 코드 작성
      currSlide = maxSlide + 1;
      let offset = slideWidth * currSlide;
      // 각 슬라이드 아이템의 left에 offset 적용
      slideItems.forEach((i) => {
        i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
      });
      currSlide--;
      offset = slideWidth * currSlide;
      setTimeout(() => {
        // 각 슬라이드 아이템의 left에 offset 적용
        slideItems.forEach((i) => {
          // i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
          i.setAttribute("style", `transition: ${0.8}s; left: ${-offset}px`);
        });
      }, 0);
      // 슬라이드 이동 시 현재 활성화된 pagination 변경
      paginationItems.forEach((i) => i.classList.remove("active"));
      paginationItems[currSlide - 1].classList.add("active");
    }
  }

  // 버튼 엘리먼트에 클릭 이벤트 추가하기
  nextBtn.addEventListener("click", () => {
    // 이후 버튼 누를 경우 현재 슬라이드를 변경
    nextMove();
  });
  // 버튼 엘리먼트에 클릭 이벤트 추가하기
  prevBtn.addEventListener("click", () => {
    // 이전 버튼 누를 경우 현재 슬라이드를 변경
    prevMove();
  });

  // 브라우저 창의 크기가 변경될 때 slideWidth를 변경하기 위해
  window.addEventListener("resize", () => {
    slideWidth = slide.clientWidth;
  });

  // 각 페이지네이션 클릭 시 해당 슬라이드로 이동하기
  for (let i = 0; i < maxSlide; i++) {
    // 각 페이지네이션마다 클릭 이벤트 추가하기
    paginationItems[i].addEventListener("click", () => {
      // 클릭한 페이지네이션에 따라 현재 슬라이드 변경해주기(currSlide는 시작 위치가 1이기 때문에 + 1)
      currSlide = i + 1;
      // 슬라이드를 이동시키기 위한 offset 계산
      const offset = slideWidth * currSlide;
      // 각 슬라이드 아이템의 left에 offset 적용
      slideItems.forEach((i) => {
        i.setAttribute("style", `left: ${-offset}px`);
      });
      // 슬라이드 이동 시 현재 활성화된 pagination 변경
      paginationItems.forEach((i) => i.classList.remove("active"));
      paginationItems[currSlide - 1].classList.add("active");
    });
  }

  // 드래그(스와이프) 이벤트를 위한 변수 초기화
  let startPoint = 0;
  let endPoint = 0;

  // PC 클릭 이벤트 (드래그)
  slide.addEventListener("mousedown", (e) => {
    startPoint = e.pageX; // 마우스 드래그 시작 위치 저장
  });

  slide.addEventListener("mouseup", (e) => {
    endPoint = e.pageX; // 마우스 드래그 끝 위치 저장
    if (startPoint < endPoint) {
      // 마우스가 오른쪽으로 드래그 된 경우
      prevMove();
    } else if (startPoint > endPoint) {
      // 마우스가 왼쪽으로 드래그 된 경우
      nextMove();
    }
  });

  // 모바일 터치 이벤트 (스와이프)
  slide.addEventListener("touchstart", (e) => {
    startPoint = e.touches[0].pageX; // 터치가 시작되는 위치 저장
  });
  slide.addEventListener("touchend", (e) => {
    endPoint = e.changedTouches[0].pageX; // 터치가 끝나는 위치 저장
    if (startPoint < endPoint) {
      // 오른쪽으로 스와이프 된 경우
      prevMove();
    } else if (startPoint > endPoint) {
      // 왼쪽으로 스와이프 된 경우
      nextMove();
    }
  });

  // 기본적으로 슬라이드 루프 시작하기
  let loopInterval = setInterval(() => {
    nextMove();
  }, 3000);

  // 슬라이드에 마우스가 올라간 경우 루프 멈추기
  slide.addEventListener("mouseover", () => {
    clearInterval(loopInterval);
  });

  // 슬라이드에서 마우스가 나온 경우 루프 재시작하기
  slide.addEventListener("mouseout", () => {
    loopInterval = setInterval(() => {
      nextMove();
    }, 3000);
  });
}
