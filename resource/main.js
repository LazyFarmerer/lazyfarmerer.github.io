

const site_items = document.getElementById("site_items");



fetch("./resource/siteCollection.json")
.then((response) => response.json())
.then((sites) => {
  sites.forEach((site) => {
    const {name, url, description} = site;
  
    const link_li = document.createElement("li");
    const div = document.createElement("div");
    link_li.innerHTML = `
    <div class="grid">
      <a href="${url}" target="_blank" class="contrast" data-tooltip="${description}">${name}</a>
      <small id="site_description">${description}</small>
    </div>
    `;

    site_items.appendChild(link_li);
  });
});
