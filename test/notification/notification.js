if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service_worker.js?1');
}

const vapidPublicKey = "BKXg1d_L9ghd198hV2PIb2aYSV6tMwu3YjEYHjrB601fkI6yD2Z9FBra8N9KTwdrQ2d6WTzToii75-OIqMbCwjg"

const notification_btn = document.querySelector("#notification-button")
const btn = document.querySelector("#action-button")
// btn.addEventListener("click", (event) => {
//   // 서비스워커가 준비 될 때 까지 기다리기
//   navigator.serviceWorker.ready
//     .then((registration) => {
//       registration.pushManager.getSubscription()
//       .then((subscription) => {
//         // 이미 구독중
//         if (subscription) {
//           console.log("데이터베이스에 저장?")
//         }
//         // 새로 구독 시키기
//         else {
//           registration.pushManager.subscribe({
//             userVisibleOnly: true,
//             applicationServerKey: key
//           })
//           .then((subscription) => {
//             // 여기도 백엔드에 전송해서 저장 예정
//           })
//         }
//       })

//     })
// })

notification_btn.addEventListener("click", (event) => {
  subscribePush()
})

btn.addEventListener("click", async (event) => {
  // const url = "http://127.0.0.1:8000"
  const url = "https://rubber-aprilette-lazyfarmerer-19b210c4.koyeb.app"
  await fetch(`${url}/api/notification/test`)
  console.log("완료")
})

// base64url → Uint8Array 변환 함수
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for(let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// 서비스 워커가 준비되면 푸시 구독 요청
async function subscribePush() {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
  });

  console.log("푸시 구독 성공:", subscription);
  console.log(JSON.stringify(subscription));

  // 구독 정보 서버에 저장
  // const url = "http://127.0.0.1:8000"
  const url = "https://rubber-aprilette-lazyfarmerer-19b210c4.koyeb.app"
  await fetch(`${url}/api/notification/save-subscription`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subscription)
  });

  alert("푸시 알림 구독 완료!");
}