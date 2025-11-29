import { auth, signInWithEmailAndPassword, onAuthStateChanged, signOut, deleteUser } from "/00_resource/utils/auth.js"

const delay_time = document.querySelector('span[data-time="delay_time"]')
let timerId;


function startTimer(starttime) {
  delay_time.textContent = starttime

  timerId = setInterval(() => {
    const time = Number(delay_time.textContent)
    delay_time.textContent = time + 1
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId)
  timerId = null
}


// 회원가입
document.querySelector("#signup-form").addEventListener("submit", async (event) => {
  event.preventDefault()

  const email = document.getElementById("signup-email")
  const password = document.getElementById("signup-password")
  const button = document.getElementById("signup-button")
  const result = document.getElementById("result")
  result.textContent = ""

  // 버튼 비활성화
  button.disabled = true
  startTimer(0)

  try {
    const url = "https://rubber-aprilette-lazyfarmerer-19b210c4.koyeb.app"
    // const url = "http://127.0.0.1:8000"
    const sns_type = "email"
    const response = await fetch(`${url}/api/auth/signup/homepage/${sns_type}`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.value, pw: password.value })
      },
    )
    
    const jsonResponse = await response.json()

    if (response.status != 200) {
      console.log(jsonResponse)
      throw new Error(`오류 남 ${jsonResponse.message}`)
    }

    result.innerHTML = /*html*/ `
    <p>결과 - ${jsonResponse.message}</p>
    <p>이메일 - ${jsonResponse.email}</p>
    <p>uid - ${jsonResponse.uid}</p>
    `
    // 회원가입 성공했을때만 지우기
    email.value = ""
    password.value = ""
  }
  catch (error) {
    result.innerHTML = /*html*/ `
      <p>결과 - 회원가입 실패</p>
      <p>오류내용 - ${error}</p>
    `
  }
  finally {
    // 버튼 활성화
    button.disabled = false
    stopTimer()
  }
})

// 로그인
document.querySelector("#login-form").addEventListener("submit", async (event) => {
  event.preventDefault()
  
  const email = document.getElementById('login-email')
  const password = document.getElementById('login-password')
  const button = document.getElementById("login-button")
  const result = document.getElementById("result")
  result.textContent = ""

  // 버튼 비활성화
  button.disabled = true
  stopTimer()

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)

    result.innerHTML = /*html*/ `
      <p>결과 - 로그인성공!</p>
      <p>이메일 - ${userCredential.user.email}</p>
      <p>uid - ${userCredential.user.uid}</p>
      <p>토큰 - ${userCredential.user.accessToken.substring(0, 30)} ...</p>
    `
    // 로그인 성공했을때만 지우기
    email.value = ""
    password.value = ""
  }
  catch (error) {
    result.innerHTML = /*html*/ `
      <p>결과 - 로그인 실패</p>
      <p>오류내용 - ${error}</p>
    `
  }
  finally {
    // 버튼 활성화
    button.disabled = false
    stopTimer()
  }
})

// 로그아웃
document.querySelector("#logout-button").addEventListener("click", (event) => {
  const button = event.target
  const result = document.getElementById("result")
  result.textContent = ""

  // 버튼 비활성화
  button.disabled = true
  startTimer(0)

  signOut(auth)
    .then(() => {
      console.log("로그아웃 성공")
      result.textContent = "로그아웃 성공"
    })
    .catch((error) => {
      console.log(error);
      result.textContent = /* html */ `
        <p>결과 - 회원가입 실패</p>
        <p>오류내용 - ${error}</p>
      `
    })
    .then(() => {
      // 버튼 활성화
      button.disabled = false
      stopTimer()
    })
})

// 회원 탈퇴
document.querySelector("#delete-button").addEventListener("click", (event) => {
  const button = event.target
  const result = document.getElementById("result")
  const user = auth.currentUser;

  // 버튼 비활성화
  button.disabled = true
  stopTimer()

  deleteUser(user)

  // 버튼 활성화
  button.disabled = false
  stopTimer()
})

// 상태변화 시 알아서 작동
onAuthStateChanged(auth, async (user) => {
  const data_curr_status = document.querySelector("[data-curr-status]")
  const data_curr_html = document.querySelector("[data-curr-html]")

  if (user) {
    data_curr_status.textContent = "로그인 상태 " + user.email
  } else {
    data_curr_status.textContent = "로그아웃 상태"
  }

  const token = user
                ? await user.getIdToken()
                : ""

  try {
    const url = "https://rubber-aprilette-lazyfarmerer-19b210c4.koyeb.app"

    const response = await fetch(`${url}/api/database/test/homepage`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    )
    const jsonResponse = await response.json()
    console.log(jsonResponse)
    data_curr_html.innerHTML = jsonResponse.data.code.code
  } catch (error) {
    data_curr_html.innerHTML = "<p>html 가져오기 실패</p>"
  }
});
