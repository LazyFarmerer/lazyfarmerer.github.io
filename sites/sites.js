



const sidebar_list_group = document.querySelector(".sidebar-sticky > .list-group")
const card_list_group = document.querySelector("#card-list")


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

      const card = document.createElement("contents-card")
      card.setAttribute("id", title)
      card.innerHTML = /*html*/ `
        <span data-slot="title">${title}</span>
        <span data-slot="desc">${desc}</span>
        <a data-slot="button" target="_blank" href="${url}">링크</a>
      `
      card_list_group.appendChild(card)
    })
  })
}

function fetch_data() {
  fetch("https://rubber-aprilette-lazyfarmerer-19b210c4.koyeb.app/api/sites")
  .then((response) => response.json())
  .then((response_items) => {
    response_items.detail.forEach((item) => {
      const {name: title, description: desc, url} = item

      const sidebar_link = document.createElement("a")
      sidebar_link.setAttribute("class", "list-group-item list-group-item-action")
      sidebar_link.setAttribute("href", `#${title}`)
      sidebar_link.textContent = title
      sidebar_list_group.appendChild(sidebar_link)

      const card = document.createElement("contents-card")
      card.setAttribute("id", title)
      card.innerHTML = /*html*/ `
        <span data-slot="title">${title}</span>
        <span data-slot="desc">${desc}</span>
        <a data-slot="url" target="_blank" href="${url}" class="btn btn-primary">바로가기</a>
      `
      card_list_group.appendChild(card)
    })
  })
}