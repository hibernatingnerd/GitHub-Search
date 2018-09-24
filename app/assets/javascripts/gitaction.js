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
  var tr = "<tr>";
  var tbody = document.getElementById('resultTable');

  responseObjItems.forEach((item, index) => {
    console.log(item.tags_url);

    var tr = "<tr>";
      /* Must not forget the $ sign */
      tr += "<td>" + item.name + "</td>" + "<td>" + item.language + "</td><td></td><td><button id='addButton', remote=true>Add</button></td></tr>";
      /* We add the table row to the table body */
      tbody.innerHTML += tr;
    });

    // add eventListners for addButton

    const add = document.getElementById("addButton");
      add.onclick = (e) => {
        var stuff = 'favourites[name]=' + e.path[2].children[0].innerText + '1&favourites[language]=' + e.path[2].children[1].innerText ;
          Rails.ajax({
          url: "/favourites/",
          type: "POST",
          data: stuff,
          success: function(data) {
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






});
