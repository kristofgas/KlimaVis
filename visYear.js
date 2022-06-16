    // Create a DataSet (allows two way data-binding)
    const container2 = document.getElementById("visualization2")
        
    const items2 = new vis.DataSet(eventArray.concat(itemArrayYear));

    const options2 = {
        orientation: { axis: 'both', item: 'top' },

        min: "2012-01-01",
        max: "2022-10-11",
        zoomMin: 1000 * 60 * 60 * 24 * 31 * 120,


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



    const timeline2 = new vis.Timeline(container2, items2, options2);
    timeline2.on('select', function (props) {

        // create empty array to hold ids of items with the same class name
        var sameClassNameIds = []

        // selected item/s ids given to you as an array on selection
        console.log(props.items2)

        // define a variable which get and hold the selected item's object by filtering the timeline
        var selectedItem = items2.get({
            filter: function (item) {
                //return id from timeline matching id in props.items
                return props.items2.indexOf(item.id) !== -1;
            }
        });

        // here is the selected item's className
        try {
            var selectedClassName = selectedItem[0].content
        } catch (error) {

        }

        // retrieve all items with the above className
        var sameClassNameItems = items2.get({
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
        timeline2.setSelection(sameClassNameIds)

    });