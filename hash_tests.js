// 'hash' for anchor portion of url instead of 'search' for query portion. 
// See http://www.w3schools.com/jsref/obj_location.asp
function setHashValue(key, value) {

  if (getHashValue(key) != null) {
    updateHashValue(key, value)
    console.log("Replacing hash value")          
  }
  else {
    addHashValue(key, value)
    console.log("Adding hash value")
  }
  
}
function getHashValue(key) {
    var matches = location.hash.match(new RegExp(key+"=([^;]*)"));
    return matches ? matches[1] : null;
  }
function addHashValue(key, value) {
  var hash = location.hash;
  hash += (";" + key + "=" + value)
  document.location.hash = hash
}
function updateHashValue(key, value) {
  var hash = document.location.hash;
  hash = hash.replace(new RegExp(key + "=([^;]*)"), key + "=" + value)
  document.location.hash = hash
}