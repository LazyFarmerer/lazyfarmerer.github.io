const siteCollectionJson = JSON.parse(JSON.stringify(site));

let siteCollectionItems = document.getElementById("siteCollectionItems");


// 반복문 돌면서 집어넣기
for (let index = 0; index < siteCollectionJson.length; index++) {
    const siteInfo = siteCollectionJson[index];

    const newElement = document.createElement( "li" );
    newElement.innerHTML = `<a href="${siteInfo.url}" target="_blank" class="contrast" data-tooltip="${siteInfo.description}">${siteInfo.name}</a>`;
    siteCollectionItems.appendChild(newElement);
}