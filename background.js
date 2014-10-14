// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) 
  {
	var temp = text;
	
    for(var count = 0; count < temp.length; count++)
	{
	    var curr = temp.charCodeAt(count);
	    if((curr < 32) | (curr > 32 & curr < 48) | (curr > 57 & curr < 65) | (curr > 90 & curr < 97) | (curr > 122))
	    {
	        temp = temp.replace(temp.charAt(count), "%" + temp.charCodeAt(count).toString(16));
			count += 2
		}
		
	}
	
    temp = temp.split(" ");
	console.log(temp);
	var query = "";
	
	for(element in temp)
	{
		if(temp[element] != "")
		{
			query += temp[element] + "+";
		}
	}
	query = query.substr(0, query.length - 1);
		
	console.log(query);
	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.update(tabs[0].id, {url: "https://www.wolframalpha.com/input/?i=" + query});
  });
  });