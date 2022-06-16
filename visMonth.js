
    
                // Create a DataSet (allows two way data-binding)
                const container1 = document.getElementById("visualization1")
        
                const items1 = new vis.DataSet(eventArray.concat(itemArrayMonth));

                const options1 = {
                    orientation: { axis: 'both', item: 'top' },
 
                    min: "2012-01-01",
                    max: "2022-10-11",
                    zoomMin: 1000 * 60 * 60 * 24 * 31 * 10,

        
                    margin: {
                        item: 4,
                        axis: 10
        
                    },
                    stack: true,
                    verticalScroll: true,
                    zoomKey: "ctrlKey",
                    selectable: true,
                    template: function (item) {
                        if (item.content == "LA" || item.content == "V" || item.content == "DF" || item.content == "NB")
                            return '<h1 id="' + item.className + '">' + item.content + '</h1>';
                        else if (item.content == "S" || item.content == "EL" || item.content == "ALT" || item.content == "KF" || item.content == "RV" || item.content == "SF")
                            return '<h2 id="right" class="' + item.className + '">' + item.content + '</h2>';
                        else {
                            return '<h6 id="some" class="some">' + item.content + '</h6>';
                        }
                    }
                };
        
        
       
                const timeline1 = new vis.Timeline(container1, items1, options1);
                timeline1.on('select', function (props) {
        
                    // create empty array to hold ids of items with the same class name
                    var sameClassNameIds = []
        
                    // selected item/s ids given to you as an array on selection
                    console.log(props.items1)
        
                    // define a variable which get and hold the selected item's object by filtering the timeline
                    var selectedItem = items1.get({
                        filter: function (item) {
                            //return id from timeline matching id in props.items
                            return props.items1.indexOf(item.id) !== -1;
                        }
                    });
        
                    // here is the selected item's className
                    try {
                        var selectedClassName = selectedItem[0].content
                    } catch (error) {
        
                    }
        
                    // retrieve all items with the above className
                    var sameClassNameItems = items1.get({
                        filter: function (item) {
                            //return items from timeline matching query
                            return item.content === selectedClassName;
                        }
                    });
                    // loop over retrieved array of items pushing each item id into an array
                    sameClassNameItems.forEach(function (item) {
                        sameClassNameIds.push(item.id)
                    })
        
                    // feed the setSelection method the array of ids you'd like it to select and highlight
                    timeline1.setSelection(sameClassNameIds)
        
                });