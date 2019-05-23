// Global Variables
const studentListItems = document.querySelectorAll(".student-item");
const maxStudentsPerPage = 10;

const getStartIndex = (page, maxPerPage) => (page  * maxStudentsPerPage) - maxStudentsPerPage;

const getEndIndex = (page, maxPerPage) => page * maxStudentsPerPage;

function showPage(list, page){

const startIndex = getStartIndex(page, maxStudentsPerPage);
const endIndex = getEndIndex(page, maxStudentsPerPage);


for(let i = 0; i < studentListItems.length; i++) {

   if([i] >= startIndex && [i] < endIndex) {
     studentListItems[i].style.display = "block";
   }else {
     studentListItems[i].style.display = "none";
   }
}

}

function appendLinks(list,page) {
  const ulPagination = document.querySelector("ul.js-pagination");
  const numberOfPaginationLinks = Math.ceil(list.length / maxStudentsPerPage);
  for(let i =1; i<numberOfPaginationLinks; i++) {
  let li = document.createElement("li");
  let a = document.createElement("a");
  a.textContent = [i];
  a.setAttribute("href", "#")
  li.appendChild(a)
  ulPagination.appendChild(li);
  }

}

function setFirstLinkActiveClass(page) {
document.querySelectorAll("div.pagination a")[page - 1].className = "active";
}

function pagination(list, page) {
const containerDiv = document.querySelector("div.page");
const jsContainerAttribute = document.createAttribute("js-container");
containerDiv.setAttributeNode(jsContainerAttribute);

const jsContainer = document.querySelector("div[js-container]");
const div = document.createElement("div");
div.setAttribute("class", "pagination");
jsContainer.appendChild(div);

const ul = document.createElement("ul");
ul.setAttribute("class", "js-pagination");
div.appendChild(ul);
appendLinks(list, page);
setFirstLinkActiveClass(page);
}

//Invoked function calls set up page load
pagination(studentListItems,1);
showPage(studentListItems, 1);


function setActiveClass(event) {
  const paginationLinks = document.querySelectorAll("div.pagination a");
  const pageNumber = parseInt(event.target.textContent);

  showPage(studentListItems, pageNumber);

  paginationLinks.forEach(link => link.className = "");
  paginationLinks[pageNumber - 1].className = "active";
}

//Click event is captuered by parent UL element
document.querySelector("div.pagination ul").addEventListener("click", event => {
  event.target.tagName === "A" ? setActiveClass(event) : null;
});
