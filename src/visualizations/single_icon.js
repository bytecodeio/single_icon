looker.plugins.visualizations.add({
    options: {
        icon_uri: {
          section: "Styling",
          type: "string",
          label: "Icon URI",
          display: "text",
          default: "https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/4987286121594941299-512.png"
        },
        background: {
            section: "Styling",
            type: "array",
            label: "Fill color",
            display: "color"
        },
        top_label: {
          section: "Data",
          type: "string",
          label: "Label",
          placeholder: "Single Value"
        }
    },
	create: function(element, config){
    element.innerHTML = `<div class="single_value">Rendering...</div>`;
    },
	updateAsync: function(data, element, config, queryResponse, details, doneRendering){
        
        element.innerHTML = ''
        let values = queryResponse.fields.measure_like.map((field) => {
            let key =    field.label
            let value =  field.name
            return {[key]: value}
        })
        let options = this.options;

        options["headerData"] =
        {
            section: "Data",
            type: "string",
            label: "Measure for Header",
            display: "select",
            values: values,
        }
        if (config.headerData == null) {
            this.trigger('registerOptions', options) // register options with parent page to update visConfig
        }
        
        // Grab the first cell of the data
        var firstRow = data[0];
        var firstCell = firstRow[config.headerData];
        var value = LookerCharts.Utils.htmlForCell(firstCell);
        
        

        //  Montserrat:
        //  https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2);}'+
         
        var styleEl = document.createElement('style');
        styleEl.setAttribute('type',"text/css")
        styleEl.innerHTML = `
          @font-face {
            font-family: Open Sans;
            src: url( https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0b.woff2 );
          }
          div {
            font-family: Open Sans;
            background-color: coral;
          }
          img {
            height: 30px;
            width: 30px;
            margin: 10px 10px auto;
          }
          .headerDiv {
            display: flex;
            justify-content: space-between;
          }
          #vis {
            border-radius: 10px;
            padding: 10px;
            width: calc(100% - 40px);
            display: flex;
            justify-content: space-between;
            flex-direction: column;
          }
          span {
            margin-top: 10px;
          }
          .value {
            font-size: 30px;
          }
          ;`

        document.head.appendChild(styleEl);

        var headerDiv = document.createElement('div');
        headerDiv.setAttribute('class','headerDiv');

        var labelSpan = document.createElement('span');
        labelSpan.innerHTML = config.top_label;
        headerDiv.appendChild(labelSpan)

        var img = document.createElement('img')
        img.setAttribute('src',config.icon_uri)
        headerDiv.appendChild(img)

        var valueDiv = document.createElement('div')
        valueDiv.setAttribute('class','value')
        valueDiv.innerHTML = value

         element.appendChild(headerDiv)
         element.appendChild(valueDiv)
        
    
       
		doneRendering()
	}
});