
// Global Variables
let studentListItems = document.querySelectorAll("li.student-item");
const maxStudentsPerPage = 10;

//function invoked upon page load
function onPageLoad() {

  pagination(studentListItems,1);

  showPage(studentListItems, 1);

  appendsObtrusiveJS();

  focusOnInputElement();

  obtrusiveNoResults();
}

//returns start index; takes two parameters.
const getStartIndex = (page, maxPerPage) => (page  * maxStudentsPerPage) - maxStudentsPerPage;


//returns end index; takes two parameters
const getEndIndex = (page, maxPerPage) => page * maxStudentsPerPage;


function focusOnInputElement() {
  document.querySelector("div.student-search input").focus();
}


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

   studentListItems.forEach((student)=> student.style.display = "none");

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

  const numberOfPaginationLinks = Math.ceil(list.length / maxStudentsPerPage);

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

  if(list.length !== 0) {
    document.querySelectorAll("div.pagination a")[page - 1].className = "active";
  }

}

function removeLinks() {
  const pagainationLinks = document.querySelectorAll("div.pagination li");
  pagainationLinks.forEach((link)=> {
    const parentLink = link.parentNode;
    parentLink.removeChild(link);
  });
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

    setFirstLinkActiveClass(1, list);

  } else {

    appendLinks(list, page);

    setFirstLinkActiveClass(page, list);
  }

}


function setActiveClass(event, namesFound) {

  const paginationLinks = document.querySelectorAll("div.pagination a");

  const pageNumber = parseInt(event.target.textContent);
  console.log(namesFound);
  showPage(namesFound, pageNumber);

  paginationLinks.forEach(link => link.className = "");

  paginationLinks[pageNumber - 1].className = "active";
}


function removePaginationDiv(paginationDiv) {

  const parentNode = paginationDiv.parentNode;

  parentNode.removeChild(paginationDiv);
}


function obtrusiveNoResults() {

  const classPage = document.querySelector("div.page");

  const thanosImage = "images/thanos.png";

  const noResultsTemplate = `
    <h2>No results have been found</h2>
    <h3>Thanos must of snapped his finger</h3>
    <img src=${thanosImage}>
  `;

  const div = document.createElement("div");

  div.setAttribute("no-results", "");

  div.innerHTML = noResultsTemplate;

  classPage.appendChild(div);

  displayNoResults(false);

}


function displayNoResults(bool) {

  if(bool) {
    document.querySelector("div[no-results]").style.display = "block";
  } else {
    document.querySelector("div[no-results]").style.display = "none";

  }

}


const searchObj = (inputValue) => {

  let enteredSearchInputValue = inputValue.value.trim();

  enteredSearchInputValue = enteredSearchInputValue.split(" ");

  return {
    lengthOfInput: enteredSearchInputValue.length,
    firstName: enteredSearchInputValue[0],
    lastName: enteredSearchInputValue[enteredSearchInputValue.length - 1]
  }
}

//******Invoked function calls set up page load******//
onPageLoad();


document.querySelector("div.student-search button").addEventListener("click", (e)=> {
   let searchInput = document.querySelector("div.student-search input");
   const studentNames = [...document.querySelectorAll("div.student-details h3")];
   studentListItems = [];
   const searchValue = searchInput.value;
   studentNames.forEach( student=> {
     if (student.textContent.includes(searchValue)) {
       studentListItems.push(student.parentNode.parentNode);
     } else {
       student.parentNode.parentNode.style.display ="none";
     }
   });
   showPage(studentListItems, 1);
   removeLinks();
   pagination(studentListItems, 1);
});

//Click event is captuered by parent UL element
document.querySelector("div.pagination ul").addEventListener("click", event => {
  console.log(studentListItems);
  event.target.tagName === "A" ? setActiveClass(event, studentListItems) : null;
});
