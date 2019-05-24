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


function appendLinks(list) {

  const ulPagination = document.querySelector("ul.js-pagination");
console.log(ulPagination);
  const numberOfPaginationLinks = Math.ceil(list.length / maxStudentsPerPage);
 console.log(numberOfPaginationLinks);
  for(let i =1; i<=numberOfPaginationLinks; i++) {

  let li = document.createElement("li");

  let a = document.createElement("a");

  a.textContent = [i];

  a.setAttribute("href", "#")

  li.appendChild(a)

  ulPagination.appendChild(li);

  }

}

function setFirstLinkActiveClass(page, list) {
document.querySelectorAll("div.pagination a")[page - 1].className = "active";

}


function pagination(list, page) {

  const containerDiv = document.querySelector("div.page");

//******need to fix this as it adds duplicate attributes****///
  const jsContainerAttribute = document.createAttribute("js-container");

  containerDiv.setAttributeNode(jsContainerAttribute);

  const jsContainer = document.querySelector("div[js-container]");

  const div = document.createElement("div");

  div.setAttribute("class", "pagination");

  jsContainer.appendChild(div);

  const ul = document.createElement("ul");

  ul.setAttribute("class", "js-pagination");

  div.appendChild(ul);

  if(list.length < 10) {
    appendLinks(list, 1);
    setFirstLinkActiveClass(1);
  } else {
    appendLinks(list, page);

    setFirstLinkActiveClass(page, list);
  }



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



document.querySelector("div.student-search button").addEventListener("click", (e)=> {
 let searchInput = document.querySelector("div.student-search input");
 const studentNames = document.querySelectorAll("div.student-details h3");
 const namesMatchSearchInput = [];
 studentNames.forEach(student => {
   if(student.textContent.toLowerCase() !== searchInput.value.toLowerCase()) {
      student.parentNode.parentNode.style.display = "none";
   } else {
     namesMatchSearchInput.push(student.parentNode.parentNode);
   }

 });

   const paginationDiv = document.querySelector("div.pagination");
   const parentNode = paginationDiv.parentNode;
   parentNode.removeChild(paginationDiv);
   pagination(namesMatchSearchInput, 1);
   showPage(namesMatchSearchInput, 1);
});
