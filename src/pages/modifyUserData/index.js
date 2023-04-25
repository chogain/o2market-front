function updateMemberInformation(member) {
  // HTML 폼에 회원 정보 채우기
  const nameInput = document.getElementById("name");
  const idInput = document.getElementById("id");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const addressInput = document.getElementById("address");

  nameInput.value = member[0].name;
  idInput.value = member[0].id;
  emailInput.value = member[0].email;
  phoneInput.value = member[0].phone;
  addressInput.value = member[0].address;

  // 폼 전송 이벤트 핸들러 등록
  const form = document.querySelector(".memberForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // 입력한 회원 정보 가져오기
    const name = nameInput.value;
    const id = idInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;
    const address = addressInput.value;

    // 수정된 회원 정보 서버에 전송
    fetch("http://localhost:3000/member", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        id,
        email,
        phone,
        address,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("회원 정보 수정이 완료되었습니다.");
        } else {
          alert("회원 정보 수정에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("회원 정보 수정에 실패했습니다.");
      });
  });
}

fetch("http://localhost:3000/member")
  .then((response) => response.json())
  .then((member) => {
    updateMemberInformation(member);
  })
  .catch((error) => {
    console.error(error);
    alert("회원 정보를 가져오는 데 실패했습니다.");
  });
