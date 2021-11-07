// Jeff Warren s0203223
// Fall 2021
// Web233 Javascript
// Date: 11/7/2021 (Week 13 Assignment)
// Shopping List App Version 4.0 (GitHub version)

//v4.0 Add popup describing app when visitors load webpage the first time
window.onload = function() {
alert("Welcome to 'Shopping List' App!\n\nCreated by Rock Valley College student Jeff Warren\n**Javascript(Web233)");
populateshoppinglistonload();
displayShoppinglists();
clearFocus();
};

//create empty shoppinglist array to store items
var shoppinglist = [];
//v 3.1 addtocart empty array
var addtocart = [];


//v 3.0 Create Objects for shoppinglist
var MyItems = {
  //name:"",
  name:""
  //price:""
};

//v 3.0 Update function addShoppinglist by adding objects
//function addShoppinglist(item,cost)
function addShoppinglist(item)
{
  //v 3.0 declare variable for groc string
  var groc="";
  //v 3.0 v 3.0 declare variable for loop count
  var count=0;
  //v 3.0 edit value for MyItems.name
  MyItems.name=item;
  //v 3.0 edit value for MyItems.cost
  //MyItems.price=cost;
  //v 3.0 for loop through object propterties and 
  for (var x in MyItems)
  {
    if (count===1)
    {
      groc += "$";
    }
    //add to groc string from object array item
    groc += MyItems[x];
    if (count===0)
    {
      //groc += " | ";
    }
    //increment count by 1
    count++;
  }
  //push to shoppinglist
  shoppinglist.push(groc);
  //display shoppinglist
  displayShoppinglists();
  //v 4.0 save cookie
  savecookie();
  //v 4.0 read cookie on load and display
  window.onload = function() {
  populateshoppinglistonload();
   displayShoppinglists();
  };

  //v 2.1: call function 'clearFocus'
  clearFocus();
}

//function deleteShoppinglist(position) for deleting a shoppinglist item
function deleteShoppinglist(position) {
  shoppinglist.splice(position, 1);
  displayShoppinglist();
}

//v 2.1 add function 'clearFocus'
function clearFocus()
{
  //v 2.1: clear inputbox value out by id
  document.getElementById("item").value = "";
  //v 3.0 clear cost field
  //document.getElementById("cost").value = "";
  //v 2.1: set focus on inputbox after text is cleared
  document.getElementById("item").focus();
}

//v3.1
function changeShoppinglist(position) {
 var arrays = shoppinglist[position];
 arrays = arrays.split("|");
 var e1 = arrays[0];
 var e2 = arrays[1];
 var ReplacedAmount = e2.replace(/\$/g,'');
 var eitem = prompt("Please enter new item", e1);
 var ecost = prompt("Please enter your name", ReplacedAmount);
 //shoppinglist[position] = eitem + " | " + '$' + ecost;
 shoppinglist[position] = eitem;
 displayShoppinglists();
 displayShoppingCart()
}

//v3.1
function changeShoppingCart(position) {
  document.getElementById("MyCart").innerHTML = shoppinglist[position];
  var arrays = addtocart[position];
  arrays = arrays.split(",");
  var e1 = arrays[0];
  var e2 = arrays[1];
  var ReplacedAmount = e2.replace(/\$/g,'');
  var eitem = prompt("Please enter new item", e1);
  var ecost = prompt("Please enter your name", ReplacedAmount);
  //addtocart[position] = eitem + "," + '$' + ecost;
  addtocart[position] = eitem;
  displayShoppinglists();
  displayShoppingCart() 
}

//v3.1 
function addbacktoshoppinglist(item,num) {
  //push to deleteShoppingCar
   deleteShoppingCart(num);
  shoppinglist.push(item);
  //display shoppinglist
  displayShoppinglists();
//v3.1 display displayShoppingCart() 
  displayShoppingCart() 
  clearFocus();
}

//v 3.1 Update function addShoppinglist by adding objects
function addtoshopcart(item, num) {
    deleteShoppinglists(num);
    addtocart.push(item);
  //display shoppinglist
  displayShoppinglists();
//v3.1 display displayShoppingCart() 
  displayShoppingCart() 
  //Clear
  clearFocus();
}

//v 3.1
function displayShoppinglists() {
var TheList = "";
var arrayLength = shoppinglist.length;
for (var i = 0; i < arrayLength; i++) {
var btndelete =  ' <input class="button" name="delete" type="button" value="Remove Item" onclick="deleteShoppinglists(' + i + ')" />';
var btnupdate =  ' <input class="button" name="edit" type="button" value="Edit Item" onclick="changeShoppinglist(' + i + ')" />';
var arrays = shoppinglist[i];
arrays = "'"+arrays+"'";
var btnaddcart =  ' <input class="button" name="add" type="button" value="Add to Shopping Cart" onclick="addtoshopcart('+arrays+','+ i +')" />';
TheList = TheList + shoppinglist[i] + '&emsp;' + btndelete + ' ' +  btnupdate + ' ' + btnaddcart + '<br>';
}
document.getElementById("MyList").innerHTML = 'Shopping List ' + '<br>' + TheList;
}

//v3.2
function displayShoppingCart() {
var TheList = "";
var TheRow = "";
var TheButtons = "";
var arrayLength = addtocart.length;
for (var i = 0; i < arrayLength; i++) {
var btndelete =  ' <input class="button" id="remove" name="delete" type="button" value="Remove Item" onclick="deleteShoppingCart(' + i + ')" />';
//v 3.2 remove edit button
var arrays = addtocart[i];
arrays = "'"+arrays+"'";
//v 3.2 change add button to checkbox
var btnaddlist =  '<label><input name="add" type="checkbox" id="adds" value="Add to Shopping List" onclick="addbacktoshoppinglist('+arrays+',' + i + ')" checked="checked"/>Add</label>';
TheRow =  "<li>" + addtocart[i] + '&emsp;' + btndelete + ' ' +  ' ' + btnaddlist + '<br></li>';
TheList += TheRow;
}
//3.2 When Checkbox checked and under "Shopping Cart" and unchecked above "Shopping Cart"
if (arrayLength > 0)
{
 document.getElementById("MyCart").innerHTML = 'Shopping Cart ' + '<br><ul>' + TheList + '</ul>';
}else{
 document.getElementById("MyCart").innerHTML = '';
}
}

//v3.1
function deleteShoppinglists(position) {
  shoppinglist.splice(position, 1);
  displayShoppinglists();
  displayShoppingCart() 
}

//v3.1
function deleteShoppingCart(position) {
  addtocart.splice(position, 1);
  displayShoppinglists();
  displayShoppingCart() 
}

//v 4.0 save cookie
function savecookie()
{
  delete_cookie('warrenlist');
   var date = new Date();
   //keeps for a year
    date.setTime(date.getTime() + Number(365) * 3600 * 1000);
   document.cookie = 'warrenlist' + "=" + escape(shoppinglist.join(',')) + "; path=/;expires = " + date.toGMTString();
}

//v 4.0 read cookie and return
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

//v 4.0 delete cookie
function delete_cookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//v 4.0 populateshoppinglistonload()
function populateshoppinglistonload()
{
  shoppinglist = [];
  addtocart = [];
  //load cookie into array
  var y = readCookie('konkollist'); //replace konkol with YOUR last name
  //remove unwanted chars and format
  y = remove_unwanted(y); 
  //spit array by comma %2C
  y = y.split('%2C');
  if (y) {
    shoppinglist = y;
   }
}

//v. 4.0 remove and format cookie
function remove_unwanted(str) {  
    
  if ((str===null) || (str===''))  
       return false;  
 else  
   str = str.toString();  
   str = str.replace(/%20/g, "");
   str = str.replace(/%24/g, "$"); 
   str = str.replace(/%7C/g, " | ");
  return str.replace(/[^\x20-\x7E]/g, '');  
} 

