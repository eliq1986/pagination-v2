
// Global Variables
const studentListItems = document.querySelectorAll("li.student-item");
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


function pagination(list, page) {

    const containerDiv = document.querySelector("div.page");
    console.log(containerDiv);

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


function setActiveClass(event) {

  const paginationLinks = document.querySelectorAll("div.pagination a");

  const pageNumber = parseInt(event.target.textContent);

  showPage(studentListItems, pageNumber);

  paginationLinks.forEach(link => link.className = "");
  paginationLinks[pageNumber - 1].className = "active";
}

function obtrusiveNoResults() {
  const classPage = document.querySelector("div.page");
  const noResultsTemplate = `
    <h2>No results have been found</h2>
    <h3>Thanos must of snapped his finger</h3>
  `;
  const div = document.createElement("div");
  div.setAttribute("no-results", "");
  div.innerHTML = noResultsTemplate;
  classPage.appendChild(div);
  displayNoResults(false)
}


function displayNoResults(bool) {

  if(bool) {
    document.querySelector("div[no-results]").style.display = "block";
  } else {
    document.querySelector("div[no-results]").style.display = "none";

  }

}


function displayResults(namesMatchSearchInput) {
  const paginationDiv = document.querySelector("div.pagination");
  if(paginationDiv === null) {
    showPage(namesMatchSearchInput, 1);
    pagination(namesMatchSearchInput, 1);
  } else {
    paginationDiv.style.display = "block";
    const parentNode = paginationDiv.parentNode;
    parentNode.removeChild(paginationDiv);
    showPage(namesMatchSearchInput, 1);
    pagination(namesMatchSearchInput, 1);


  }

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
   let enteredInputValue = searchInput.value.trim();
   enteredInputValue = enteredInputValue.split(" ");
   const firstName = enteredInputValue[0];
   const lastName = enteredInputValue[enteredInputValue.length - 1];


      studentNames.forEach(student => {
        const firstAndLastName = student.textContent.toLowerCase().split(" ");
        if (firstAndLastName.indexOf(firstName.toLowerCase()) > -1 || firstAndLastName.indexOf(lastName.toLowerCase()) > -1) {
           namesMatchSearchInput.push(student.parentNode.parentNode);
        } else {
          student.parentNode.parentNode.style.display = "none";
        }
     });

        if (namesMatchSearchInput.length < 1 || enteredInputValue.length < 1) {
          displayNoResults(true);
          const paginationDiv = document.querySelector("div.pagination");
          if(paginationDiv !== null ){
              const parentNode = paginationDiv.parentNode;
              parentNode.removeChild(paginationDiv);
          }

        } else {
          displayNoResults(false);
          displayResults(namesMatchSearchInput);
        }






});
