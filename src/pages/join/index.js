// 이름 입력 검사(정규식 조건은 없음. input 접근 이후에 값이 비어있으면 p태그가 나오게)

// id가 name인 태그를 name으로 변수 선언
let name = document.getElementById("name");
// id가 정상적으로 입력되었는지 확인하기 위한 변수 선언. 기본값은 false로 지정
let isValidName = false;
// id가 name_warning인 태그를 nameWarning으로 변수 선언
let nameWarning = document.getElementById("name_warning");

// blur -> 해당 태그에 focus가 되었다가 나갈때 동작
// addEventListener는 지정한 이벤트가 발생했을때 호출되는 함수. 여기서는 blur 이벤트가 발생하면 호출됨
name.addEventListener("blur", () => {
  // name 태그에 value, 즉 값이 있으면 name 스타일, nameWarning 스타일 이렇게. 값이 있다는건 조건을 만족한다는 것(유효성검사가 있는 경우 유효성 검사를 통과하면)이기 때문에 isValidName 값 = true
  if (name.value) {
    name.style.borderColor = "black";
    nameWarning.style.display = "none";
    isValidName = true;
  } else {
    // name 태그에 value 값이 없으면 name 스타일, nameWarning 스타일 이렇게. 조건을 만족하지 못하기 때문에 isValidName 값 = false
    name.style.borderColor = "red";
    nameWarning.style.display = "flex";
    nameWarning.style.color = "red";
    nameWarning.textContent = "이름을 입력하세요";
    nameWarning.style.fontSize = "15px";
    isValidName = false;
  }
});

// id 입력 검사(정규식 조건은 없음)
// let id = document.getElementById("id");
// let idWarning = document.getElementById("id_warning");
// let isValidId = false;

// id.addEventListener("blur", () => {
//   if (id.value) {
//     id.style.borderColor = "black";
//     idWarning.style.display = "none";
//     isValidId = true;
//   } else {
//     id.style.borderColor = "red";
//     idWarning.style.display = "flex";
//     idWarning.style.color = "red";
//     idWarning.textContent = "아이디를 입력하세요";
//     idWarning.style.fontSize = "15px";
//     isValidId = false;
//   }
// });

// 패스워드 입력 검사
let password = document.getElementById("password");
// (?=.*[a-zA-Z]) : 적어도 하나의 영문자가 포함되어야함
// (?=.*\d) : 적어도 하나의 숙자가 포함되어야함
// (?=.*[@$!%*#?&]) : 적어도 하나의 특수문자가 포함되어야 함
// [A-Za-z\d@$!%*#?&]{8,} : 영문자, 숫자, 특수문자 중 하나 이상을 포함하는 최소 8자 이상의 문자열
// $ : 문자열의 끝
let passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
let passwordWarning = document.getElementById("password_warning");
let isValidPassword = false;

password.addEventListener("blur", () => {
  // trim() : 문자열의 양쪽 끝 공백 제거
  let inputPassword = password.value.trim();
  // test() : 정규표현식과 문자열을 매개변수로 받아서 해당 문자열이 정규표현식과 일치하는지 검사
  if (passwordPattern.test(inputPassword)) {
    password.style.borderColor = "black";
    passwordWarning.style.display = "none";
    isValidPassword = true;
  } else {
    password.style.borderColor = "red";
    passwordWarning.style.display = "flex";
    passwordWarning.style.color = "red";
    passwordWarning.textContent = "패스워드를 확인하세요";
    passwordWarning.style.fontSize = "15px";
    isValidPassword = false;
  }
});

// 패스워드체크 입력 검사
let passwordCheck = document.getElementById("passwordCheck");
let passwordCheckWarning = document.getElementById("passwordCheck_warning");
let isValidPasswordCheck = false;

passwordCheck.addEventListener("blur", () => {
  //패스워드의 value 와 패스워드체크의 value 가 동일한지 확인
  if (password.value == passwordCheck.value) {
    passwordCheck.style.borderColor = "black";
    passwordCheckWarning.style.display = "none";
    isValidPasswordCheck = true;
  } else {
    password.style.borderColor = "red";
    passwordCheckWarning.style.display = "flex";
    passwordCheckWarning.style.color = "red";
    passwordCheckWarning.textContent = "패스워드를 확인하세요";
    passwordCheckWarning.style.fontSize = "15px";
    isValidPasswordCheck = false;
  }
});

// 이메일 입력 검사
let email = document.getElementById("email");
// [a-zA-Z0-9._%+-]+ : 이메일에서 @ 앞부분. 영문 대소문자, 숫자, (. _ % + -) 중 하나 이상의 연속된 문자열로 올 수 있음
// [a-zA-Z0-9.-]+ : 도메인 부분. 영문 대소문자, 숫자, (. -) 중 하나 이상이 연속된 문자열로 올 수 있음
// [a-zA-Z]{2,} : 이메일 주소에서 도메인 부분의 최상의 도메인. 영문 대소문자가 두개 이상 연속된 문자열로 올 수 있음. 최상위 도메인은 두 개의 문자로 구성되어야 함. 예를 들면 abc@naver.example.com 에서 최상위 도메인은 example.com이 됨
let emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/u;
let emailWarning = document.getElementById("email_warning");
let isValidEmail = false;

email.addEventListener("blur", () => {
  let inputEmail = email.value.trim();
  if (emailPattern.test(inputEmail)) {
    email.style.borderColor = "black";
    emailWarning.style.display = "none";
    isValidEmail = true;
  } else {
    email.style.borderColor = "red";
    emailWarning.style.display = "flex";
    emailWarning.style.color = "red";
    emailWarning.textContent = "이메일 주소를 확인하세요";
    emailWarning.style.fontSize = "15px";
    isValidEmail = false;
  }
});

// 폰 입력 검사
let phone = document.getElementById("phone");
// ^ : 문자열 시작 위치
// 01 : 01로 시작한다는 뜻. 즉 02,051,032 등등 지역번호는 입력 불가
// ([0|1|6|7|8|9]?) : [0|1|6|7|8|9]은 이 숫자들중 하나의 숫자와 일치함. ?는 앞에 []에 있는 숫자들이 있을수도, 없을수도 있다는 뜻.
// -? : -가 있을 수도 있고 없을 수도 있음
// ([0-9]{3,4}) : 0~9까지의 숫자 중 3자리 혹은 4자리가 일치함. ()로 묶여 있기 때문에 이 부분은 하나의 그룹으로 처리됨.
// ([0-9]{4}) : 0~9까지의 숫자가 4자리 일치함. ()로 묶여 있기 때문에 이 부분도 하나의 그룹으로 처리됨
// $ : 문자열의 끝을 나타냄
let phonePattern = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
let phoneWarning = document.getElementById("phone_warning");
let isValidPhone = false;

phone.addEventListener("blur", () => {
  let inputPhone = phone.value.trim();
  if (phonePattern.test(inputPhone)) {
    phone.style.borderColor = "black";
    phoneWarning.style.display = "none";
    isValidPhone = true;
  } else {
    phone.style.borderColor = "red";
    phoneWarning.style.display = "flex";
    phoneWarning.style.color = "red";
    phoneWarning.textContent = "휴대폰 번호를 확인하세요";
    phoneWarning.style.fontSize = "15px";
    isValidPhone = false;
  }
});

// 회원가입 폼 버튼 체크 함수
function registerCheck(e) {
  e.preventDefault();
  const nameInput = document.getElementById("name").value;
  // const idInput = document.getElementById("id").value;
  const passwordInput = document.getElementById("password").value;
  const passwordCheckInput = document.getElementById("passwordCheck").value;
  const emailInput = document.getElementById("email").value;
  const phoneInput = document.getElementById("phone").value;
  const addressInput = document.getElementById("address").value;

  if (!isValidName) {
    alert("이름을 입력하세요");
    return false;
  }
  if (!isValidPassword) {
    alert("패스워드를 확인하세요");
    return false;
  }
  if (!isValidPasswordCheck) {
    alert("패스워드를 확인하세요");
    return false;
  }
  if (!isValidEmail) {
    alert("이메일을 확인하세요");
    return false;
  }
  if (!isValidPhone) {
    alert("휴대폰 번호를 확인하세요");
    return false;
  }

  // 여기 자리에 서버로 보내는 동작을 시키면 됨
  // http://localhost:5500/api/v1/users/register
  fetch("/api/v1/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailInput,
      password: passwordInput,
      name: nameInput,
      address: addressInput,
      phone: phoneInput,
      roleType: 1,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      window.location.href = "../main/index.html";
    })
    .catch((error) => {
      console.error("에러 발생");
    });
}
