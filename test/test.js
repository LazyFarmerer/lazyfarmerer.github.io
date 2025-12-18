import { auth, onAuthStateChanged } from "/00_resource/utils/auth.js"


const result = document.querySelector("#result")

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    return
  }

  const token = await user.getIdToken();

  const url = "http://127.0.0.1:8000"
  // const url = "https://rubber-aprilette-lazyfarmerer-19b210c4.koyeb.app"
  const response = await fetch(`${url}/api/homepage/test`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "project-Name": "homepage",
        "Authorization": `Bearer ${token}`
      },
    }
  )
  const code = await response.text()
  result.innerHTML = code

})



