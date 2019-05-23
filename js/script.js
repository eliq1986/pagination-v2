// Global Variables
const studentListItems = document.querySelectorAll(".student-item");
const maxStudentsPerPage = 10;


function getStartIndex(page, maxPerPage) {
 return (page  * maxStudentsPerPage) - maxStudentsPerPage;
}

function getEndIndex(page, maxPerPage) {
return (page * maxStudentsPerPage);
}


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




function pagination(list, page) {
  const containerDiv = document.querySelector("div.page");
  const jsContainerAttribute = document.createAttribute("js-container");
  containerDiv.setAttributeNode(jsContainerAttribute);

  const jsContainer = document.querySelector("div[js-container]");
  const div = document.createElement("div");
  div.setAttribute("class", "pagination");
  jsContainer.appendChild(div);

  const ul = document.createElement("ul");
  div.appendChild(ul);
const numberOfPaginationLinks = Math.ceil(list.length / maxStudentsPerPage);
for(let i =1; i<numberOfPaginationLinks; i++) {
let li = document.createElement("li");
let a = document.createElement("a");
a.textContent = [i];
a.setAttribute("href", "#")
li.appendChild(a)
ul.appendChild(li);

}
const paginationActive = document.querySelectorAll("div.pagination a")[page - 1];
paginationActive.className = "active";
}

pagination(studentListItems,1);

document.querySelector("div.pagination ul").addEventListener("click", (e)=> {
  const paginationActive = document.querySelectorAll("div.pagination a");
  const pageNumber = parseInt(e.target.textContent);
  showPage(studentListItems, pageNumber);
  for(let i = 0; i<paginationActive.length; i++) {
    paginationActive[i].className = "";
  }
  paginationActive[pageNumber - 1].className = "active";
});

showPage(studentListItems, 1);
