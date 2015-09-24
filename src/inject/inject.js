
function getElementByXpath(path) {
	try{
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent.trim().replace(/[^\w\s]/gi, '');
	} catch(e){
		return "";
	}
}

chrome.runtime.sendMessage({type: "showicon"}, function(response) {
	console.log(response);
});
