// just setting a global var to hold response array
let responseObjItems;


document.addEventListener('DOMContentLoaded', function() {
// data dump for our response
function dumpResponse() {
  // `this` will refer to the `XMLHTTPRequest` object that executes this function
  const responseObj = JSON.parse(this.responseText);
  // sort out the items
  let responseObjItems = responseObj.items;
  // reduce array to 10 items.
  responseObjItems.length=10;

  // here we will render our search results from git hub
  const tr = "<tr>";
  const tbody = document.getElementById('resultTable');

  responseObjItems.forEach((item, index) => {
    console.log(item.tags_url);
  // #### UGLY -- reset tr each loop as a fix for items building up.
    let tr = "<tr>";
    // create our HTML string
      tr += "<td class='rT'>" + item.name + "</td>" + "<td class='rT'>" + item.language + "</td><td></td><td class='rT'><a href='#' id='addButton' data-remote='true' >Add</a></td></tr>";
      /* We add the table row to the table body */
      tbody.innerHTML += tr;
    });

    // add eventListners for addButton
    const add = document.getElementById("addButton");

    add.onclick = (e) => {
    // store github name and language
    e.preventDefault();
    const gitName = e.path[2].children[0].innerText;
    const gitLanguage = e.path[2].children[1].innerText;
    var savedItem = 'favourites[name]=' + gitName  + '1&favourites[language]=' + gitLanguage ;
      Rails.ajax({
        url: "/favourites/",
        type: "POST",
        data: savedItem,
        success: function(data) {
          // lets ammend the table inreal time till the user wants to refresh.
          let savedTable = document.getElementById('savedTable');
          let tr = "<tr>";
          tr = "<td class= 'rT'>" + gitName + "<td><td class= 'rT'>" + gitLanguage + "<th class='lT'></th><a href='/delete' class='delete' data-remote='true' confirm='Are you sure to delete this item?'>Delete</a>";
          savedTable.innerHTML += tr;
        }
      });
    };
}

// search submarine, with XHMLHttpRequest technology for retrieving data from the GitHub API
const printRepoSearch = (data) => {
  var request = new XMLHttpRequest();
  // Prime the torpedo  (event handler)
  request.onload = dumpResponse;
  // Flood the tubes (init request), pass in the var containing search string
  request.open('get', 'https://api.github.com/search/repositories?q=' + data + '&sort=stars&order=desc', true);
  // Fire away!
  request.send();
}

// set search Element in const
const search = document.getElementById("searchButton");

// add eventListners for inputData(search bar)
search.onclick = (e) => {
  e.preventDefault();
  let inputValue = document.getElementById("inputData");
  let pass = inputValue.value;
  const valueOutput = printRepoSearch(pass);
};
// search.onkeypress = (e) => {
//   // just checking to see if its the Enter key
//   if (e.key === "Enter") {
//   let inputValue = document.getElementById("inputData");
//   let pass = inputValue.value;
//   printRepoSearch(pass);
//   }
// }


// delete link confirmation JavaScriptvar deleteLinks = document.querySelectorAll('.delete');
const deleteLink = document.getElementById('delete');
  deleteLink.addEventListener('click', function(e) {
      e.preventDefault();
      var choice = confirm(this.getAttribute('data-confirm'));
      var indexNum;
      if (choice) {
        Rails.ajax({
          url: "/favourites/",
          type: "DELETE",
          data: e.path[2].children[0].innerText,
          success: function(data) {
            console.log('success');
          }
        });
      }
  });





});
