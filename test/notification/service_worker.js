self.addEventListener("install", (event) => {
  console.log("서비스 워커 인스톨 시 인듯")
});

self.addEventListener("push", (event) => {
  let data = {
    title: "내가 보냄",
    body: "기본 내용",
    icon: "/icons/icon-192.png",
  };

  if (event.data) {
    try {
      data = event.data.json();  // JSON 형식 메시지를 받는 경우
    } catch (e) {
      data.body = event.data.text(); // 텍스트 메시지인 경우
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
    })
  );
});