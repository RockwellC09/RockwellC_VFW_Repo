// Christopher Rockwell
// Project: Web App Part 2
// Visual Frameworks 1210

// Wait until DOM is ready
window.addEventListener("DOMContentLoaded", function(){
    
    // getElementBy Id function
    function $(x) {
        
        var element = document.getElementById(x);
        return element;
    }
    
    // create selection using JavaScript
    function makeSel(){
        
        var formsTag = document.getElementsByTagName("form"),
        getLabel = $('times'),
        makeSelect = document.createElement('select');
        makeSelect.setAttribute("id", "time");

        for (i=0, j=timeFrames.length; i<j; i++){
            var makeOption = document.createElement('option');
            var optText = timeFrames[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        getLabel.appendChild(makeSelect);
    }
    
    // variable defaults
    var timeFrames = ["Less than a year", "Between 1-5 years", "Between 5-10 years", "More than 10 years"];
    makeSel();
    var priorityValue;
    var isFirefox = testCSS('MozBoxSizing');
    
    //setting up an input button to display the current range position.
    var element = document.createElement("input");
          element.setAttribute("id", "textInput");
          element.setAttribute("type", "button");
          element.setAttribute("value", "1");
          element.setAttribute("style", "height:30px; ");
         
    var foo = document.getElementById("quan");
    function testCSS(prop) {
    return prop in document.documentElement.style;
}
    //show the range position input button only if the browser isn't Firefox
    function noRange(){
        if (isFirefox === false){
            foo.appendChild(element);
        }
    }
    noRange();
    
    //find the value of selected radio button
    function getSelectedRadio(){
        var radios = document.forms[0].priority;
        for (i=0, j=radios.length;i<j;i++){
            if (radios[i].checked){
                priorityValue =radios[i].value;
            }
        }
    }
    
    function toggleControls(n){
        switch (n){
            case "on":
                $('add-item').style.display = "none";
                $('clearLink').style.display = "inline";
                $('displayLink').style.display = "none";
                $('addNew').style.display = "inline";
                break;
            case "off":
                $('add-item').style.display = "block";
                $('clearLink').style.display = "inline";
                $('displayLink').style.display = "inline";
                $('addNew').style.display = "none";
                $('items').style.display = "none";
                break;
            default:
                return false;
        }
    }
    
    // function to store data entered by user
    function saveData(){
        var id =  Math.floor((Math.random()*10000000)+1); 
        //gather all form field values and store them in an object
        //Object properties contain array with the form label and input values
        getSelectedRadio();
        var item = {}
            item.name = ["Item Name:", $('item-name').value];
            item.brand = ["Item Brand:", $('item-brand').value];
            item.quantity = ["Quantity:", $('quantity').value];
            item.cost = ["Total Cost:", $('total-cost').value];
            item.date = ["Pledge Date:", $('pledge').value];
            item.priority = ["Priority:", priorityValue];
            item.timeFrame = ["Time Frame:", $('time').value];
            item.amountSaved = ["Amount Saved:", $('amount').value];
            item.motivation = ["Motivation:", $('motivation').value];
            item.space = ["<br>", "<br>"];
            
        //save data into local storage: Using Stringify to convert our object into a string
        localStorage.setItem(id, JSON.stringify(item));
        alert("Saved!");
    }
    
    //write data from local stroage to the browser
    function getData(){
        if (localStorage.length === 0){
            alert("There is no data in local storage");
            window.location.reload();
        }
        toggleControls("on");
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        $('items').style.display = "block";
        for(var i=0,j=localStorage.length;i<j;i++){
            var makeLi = document.createElement('li');
            makeList.appendChild(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //convert the string from local storage value back to an object by using JSON.parse()
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeLi.appendChild(makeSubList)
            for (var x in obj){
                var makeSubListItem =document.createElement('li');
                makeSubList.appendChild(makeSubListItem);
                if (obj[x][1] === "High!!!")   {
                    makeSubListItem.style.color = "#CC2525";
                } else if (obj[x][1] === "Medium!!")   {
                    makeSubListItem.style.color = "#C4B50C";
                } else if(obj[x][1] === "Low!"){
                    makeSubListItem.style.color = "#2051BA";
                } else {
                    makeSubListItem.style.color = "white";
                }
                optSubText = "<strong> " + obj[x][0] +"</strong> "+ "<p>" + obj[x][1] + "</p>";
                makeSubListItem.innerHTML = optSubText;
            }
        }
    }
    
    //clear all data submitted
    function clearData(){
        if(localStorage.length === 0){
            alert("There is no data to clear.");
        } else {
            var answer = confirm("Are you sure you want to delete all data?");
            if (answer){
                localStorage.clear();
                alert("All items deleted.");
                window.location.reload();
                return false;
            }
        }
    }
    
    // set link and click events
    var displayLink = $('displayLink');
    displayLink.addEventListener("click", getData);
    var clearLink = $('clearLink');
    clearLink.addEventListener("click", clearData);
    var save = $('submit');
    save.addEventListener("click", saveData);
    
});

