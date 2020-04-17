async function onSortCall(){

    const sort = document.getElementById('sortby').value
    

    const resp = await fetch('/todos/' + sort, { method: 'GET' })
    const todos = await resp.json()
(function() {

	var trim = function( str ) {
		var trimmed = "";
		if( typeof String.prototype.trim !== "function" ) {
			trimmed = str.replace( /^\s+|\s+$/gm, "" );
		} else {
			trimmed = str.trim();
		}
		
		return trimmed;
	};
	
	
	var sortByDate = function( elements, order ) {
		var arr = [];
		
		
		for( var i = 0; i < elements.length; ++i ) {
			var obj = {},
				el = elements[i],
				
				time = el.querySelector( "time" ).firstChild.nodeValue,
				date = new Date( trim( time ) ),
				timestamp = date.getTime(); // Unix timestamp
				
				obj.html = el.outerHTML; // The whole HTML string of an element
				obj.time = timestamp;
				
				arr.push( obj );
		}
		
		
		var sorted = arr.sort(function( a, b ) {
			
			if( order == "ASC" ) {
				return a.time > b.time;
			} else {
				return b.time > a.time;
			}
			
		});
		
		return sorted;
	};
	
})()

function sortByPriority(data){
    var sortOrder = ['High', 'Medium', 'Low'];   
            data.sort(
                function (a, b) {                              
                    if (a.priority == b.priority) {       
                        return a.Title.localeCompare(b.title); 
                    } else {                                   
                        return sortOrder.indexOf(a.priority) - sortOrder.indexOf(b.priority); 
                    }
                }
            );
}

var listToSort=document.getElementsByClassName("abc");
if(document.getElementById("sort").value=="dueDate")
{
    sortByDate(listToSort,ASC);
}
else if(document.getElementById("sort").value=="dueDate")
{
    sortByPriority(listToSort);
}
}