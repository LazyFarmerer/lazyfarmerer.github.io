



const sidebar_list_group = document.querySelector(".sidebar-sticky > .list-group")
const card_list_group = document.querySelector("#card-list")

// fetch_data()
// fetch_test_data()
fetch_spreadsheet_data()

function fetch_spreadsheet_data() {
  const url = "https://docs.google.com/spreadsheets/d/1vP2rveX2xNFurYwQQ-QFB5ujP_UosUYbSwVWhs2hAiI/export?format=tsv&range=A:C"
  fetch(url)
  .then((response) => response.text())
  .then((sites_tsv) => {
    const sites = sites_tsv.split("\n").map((line) => line.split("\t"))
    sites.forEach((site, index) => {
      // 해더 부분 스킵
      if (index === 0) return

      const [title, desc, url] = site

      const sidebar_link = document.createElement("a")
      sidebar_link.setAttribute("class", "list-group-item list-group-item-action")
      sidebar_link.setAttribute("href", `#${title}`)
      sidebar_link.textContent = title
      sidebar_list_group.appendChild(sidebar_link)

      const card = document.createElement("my-card")
      card.setAttribute("id", title)
      card.setAttribute("data-title", title)
      card.setAttribute("data-desc", desc)
      card.setAttribute("data-url", url)
      card_list_group.appendChild(card)
    })
  })
}

function fetch_test_data() {
  response_items = [
    {
      name: "Google",
      description: "구글의 공식 홈페이지입니다.",
      url: "https://www.google.com"
    },
    {
      name: "Naver",
      description: "네이버의 공식 홈페이지입니다.",
      url: "https://www.naver.com"
    },
    {
      name: "Daum",
      description: "다음의 공식 홈페이지입니다.",
      url: "https://www.daum.net"
    },
    {
      name: "GitHub",
      description: "GitHub의 공식 홈페이지입니다.",
      url: "https://github.com"
    }
  ]
  response_items.forEach((item) => {
    const {name: title, description: desc, url} = item

    const sidebar_link = document.createElement("a")
    sidebar_link.setAttribute("class", "list-group-item list-group-item-action")
    sidebar_link.setAttribute("href", `#${title}`)
    sidebar_link.textContent = title
    sidebar_list_group.appendChild(sidebar_link)

    const card = document.createElement("my-card")
    card.setAttribute("id", title)
    card.setAttribute("data-title", title)
    card.setAttribute("data-desc", desc)
    card.setAttribute("data-url", url)
    card_list_group.appendChild(card)
  })
}

function fetch_data() {
  fetch("https://rubber-aprilette-lazyfarmerer-19b210c4.koyeb.app/api/sites")
  .then((response) => response.json())
  .then((response_items) => {
    response_items.forEach((item) => {
      const {name: title, description: desc, url} = item

      const sidebar_link = document.createElement("a")
      sidebar_link.setAttribute("class", "list-group-item list-group-item-action")
      sidebar_link.setAttribute("href", `#${title}`)
      sidebar_link.textContent = title
      sidebar_list_group.appendChild(sidebar_link)

      const card = document.createElement("my-card")
      card.setAttribute("id", title)
      card.setAttribute("data-title", title)
      card.setAttribute("data-desc", desc)
      card.setAttribute("data-url", url)
      card_list_group.appendChild(card)
    })
  })
}