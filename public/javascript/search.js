//implement search
var inputSearch = document.getElementById('input');
if (inputSearch == null) {
    //do nothing, just to avoid error on inputSearch when null;
} else {
  inputSearch.addEventListener('keyup', () => {
    this.searchHandler();
  });

}




function searchHandler(event) {
  var filter, cards, txtValue;
  filter = jsUcfirst(inputSearch.value);
  // console.log(filter)
  cards = document.getElementById("cards");
 var li = cards.getElementsByTagName('li');

 for (var i = 0; i < li.length; i++) {
  var a = li[i].getElementsByClassName("next-recipe")[0];
if (a) {
  txtValue = a.textContent || a.innerText;

  // console.log(txtValue);
  if (txtValue.indexOf(filter) > -1) {
    li[i].style.display = "";
  } else {
    li[i].style.display = "none";
  }
}
}
}

jsUcfirst = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
