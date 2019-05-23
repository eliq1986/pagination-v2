// Global Variables
const studentListItems = document.querySelectorAll("li.student-item");
const maxStudentsPerPage = 10;

//function invoked upon page load
function onPageLoad() {
  pagination(studentListItems,1);
  showPage(studentListItems, 1);
  appendsObtrusiveJS();
}

//returns start index; takes two parameters.
const getStartIndex = (page, maxPerPage) => (page  * maxStudentsPerPage) - maxStudentsPerPage;


//returns end index; takes two parameters
const getEndIndex = (page, maxPerPage) => page * maxStudentsPerPage;

function appendsObtrusiveJS() {
  const div = document.createElement("div");
  div.className = "student-search";

  const input = document.createElement("input");
  input.placeholder = "Search for students...";
  const button = document.createElement("button");
  button.textContent = "Search";
  div.appendChild(input);
  div.appendChild(button);

  document.querySelector("div.page-header").appendChild(div);
}

//takes 3 arguments; loops over student list and displays block or none
function displayStudentsItem(listOfStudents,startIndex, endIndex) {
  for(let i = 0; i < listOfStudents.length; i++) {

     if([i] >= startIndex && [i] < endIndex) {
       listOfStudents[i].style.display = "block";
     }else {
       listOfStudents[i].style.display = "none";
     }
  }

}


//function calls three functions within that show appropriate list.
function showPage(list, page){

  const startIndex = getStartIndex(page, maxStudentsPerPage);
  const endIndex = getEndIndex(page, maxStudentsPerPage);
  displayStudentsItem(list, startIndex, endIndex);

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




function setActiveClass(event) {
  const paginationLinks = document.querySelectorAll("div.pagination a");
  const pageNumber = parseInt(event.target.textContent);

  showPage(studentListItems, pageNumber);

  paginationLinks.forEach(link => link.className = "");
  paginationLinks[pageNumber - 1].className = "active";
}

//******Invoked function calls set up page load******//
onPageLoad();

//Click event is captuered by parent UL element
document.querySelector("div.pagination ul").addEventListener("click", event => {
  event.target.tagName === "A" ? setActiveClass(event) : null;
});
