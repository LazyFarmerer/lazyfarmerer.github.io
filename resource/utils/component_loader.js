/**
 * 컴포넌트가져오는 함수
 * @param {string} url 주소
 * @param {function(element): void} callback 함수 (element) => void
 */
export default function loadComponentHTML(url, callback) {

  fetch(url)
  .then((response) => {
    if (!response.ok) throw new Error();
    return response.text()
  })
  .then(htmlContent => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlContent, "text/html")
    const element = doc.body.firstElementChild
    callback(element)
  })
  .catch((error) => {
    console.log(`오류 발생: ${error} (url: ${url})`)
    // loadComponentHTML(url, callback, index + 1)
  })
}



// /**
//  * 대충 상대경로를 알아서 맞춰주는 함수
//  * @param {string} url 주소
//  * @param {function(element): void} callback 함수 (element) => void
//  */
// export default function loadComponentHTML(url, callback, index = 0) {
//   if (index > 5) {
//     console.error(`아니 언제까지 들어갈거임?? (url: ${url}, index: ${index})`);
//     return;
//   }

//   const prefix = "./" + "../".repeat(index) + url

//   fetch(prefix)
//   .then((response) => {
//     if (!response.ok) throw new Error();
//     return response.text()
//   })
//   .then(htmlContent => {
//     const parser = new DOMParser()
//     const doc = parser.parseFromString(htmlContent, "text/html")
//     const element = doc.body.firstElementChild
//     callback(element)
//   })
//   .catch((error) => {
//     console.log(`오류 발생: ${error} (url: ${url}, index: ${index})`)
//     loadComponentHTML(url, callback, index + 1)
//   })
// }