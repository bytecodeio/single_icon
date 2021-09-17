looker.plugins.visualizations.add({
  options: {
    icon_uri: {
      section: "Icon",
      type: "string",
      label: "Icon URI",
      display: "text",
      default:
        "https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/4987286121594941299-512.png",
    },
    icon_height: {
      section: "Icon",
      type: "string",
      label: "Icon Height",
      display: "text",
      default: "30px",
    },
    icon_width: {
      section: "Icon",
      type: "string",
      label: "Icon Width",
      display: "text",
      default: "30px",
    },
    icon_left_margin: {
      section: "Icon",
      type: "string",
      label: "Icon Left Margin",
      display: "text",
      default: "6REM",
    },
    flexible: {
      section: "Styling",
      type: "boolean",
      label: "Auto-sizing and layout",
      default: false, 
    },
    left_right: {
      section: "Styling",
      type: "boolean",
      label: "Align icon on left or right",
      default: false,
    },
    background: {
      section: "Styling",
      type: "array",
      label: "Fill color",
      display: "color",
      default: "coral",
    },
    alignment: {
      section: "Styling",
      type: "string",
      label: "Value text alignment",
      display: "text",
      default: "left",
    },
    border_radius: {
      section: "Styling",
      type: "string",
      label: "Border Radius",
      display: "text",
      default: "20px",
    },
    title_label: {
      section: "Title",
      type: "string",
      label: "Label",
      placeholder: "Single Value",
    },
    title_font_size: {
      section: "Title",
      type: "string",
      label: "Font Size",
      placeholder: "16px",
      default: "16px",
    },
    title_font_family: {
      section: "Title",
      type: "string",
      label: "Font Family",
      placeholder: "Open Sans",
      default: "Open Sans",
    },
    title_font_weight: {
      section: "Title",
      type: "string",
      label: "Font Weight",
      placeholder: "normal",
      default: "normal",
    },
    title_color: {
      section: "Title",
      type: "array",
      label: "Fill color",
      display: "color",
      default: "black",
    },
    headerMarginLeft: {
      section: "Title",
      type: "string",
      label: "Header left margin",
      display: "text",
      default: "0px",
    },
    value_font_size: {
      section: "Value",
      type: "string",
      label: "Font Size",
      placeholder: "16px",
      default: "16px",
    },
    value_color: {
      section: "Value",
      type: "array",
      label: "Fill color",
      display: "color",
      default: "black",
    },
    value_font_family: {
      section: "Value",
      type: "string",
      label: "Font Family",
      placeholder: "Open Sans",
      default: "Open Sans",
    },
    value_font_weight: {
      section: "Value",
      type: "string",
      label: "Font Weight",
      placeholder: "normal",
      default: "bold",
    },
    lower_note: {
      section: "Notes",
      type: "string",
      label: "Note beneath text",
      display: "text",
      default: "",
    },
    lower_note_margin: {
      section: "Notes",
      type: "string",
      label: "Lower note upper margin",
      display: "text",
      default: "10px",
    },
    lower_note_text_size: {
      section: "Notes",
      type: "string",
      label: "Lower note text size",
      display: "text",
      default: "10px",
    },
    icon_note: {
      section: "Notes",
      type: "string",
      label: "Icon Hover Note",
      display: "text",
      default: "",
    },
  },
  create: function (element, config) {
    element.innerHTML = `<div class="single_value">Rendering...</div>`;
  },
  updateAsync: function (
    data,
    element,
    config,
    queryResponse,
    details,
    doneRendering
  ) {
    element.innerHTML = "";
    let values = queryResponse.fields.measure_like.map((field) => {
      let key = field.label;
      let value = field.name;
      return { [key]: value };
    });

    let options = this.options;

    options["headerData"] = {
      section: "Value",
      type: "string",
      label: "Measures for Header",
      display: "select",
      values: values,
    };

    this.trigger("registerOptions", options); // register options with parent page to update visConfig

    // Grab the first cell of the data
    var firstRow = data[0];
    var firstCell = firstRow[config.headerData];
    var value = firstCell ? LookerCharts.Utils.htmlForCell(firstCell) : "";

    var maxHeight = element.clientHeight
    var maxWidth = element.clientWidth

    var styleEl = document.createElement("style");
    styleEl.setAttribute("type", "text/css");
    // margin-left: ${config.flexible ? Math.min([maxWidth/3 - maxHeight,0]) +'px' : config.icon_left_margin};
        
    styleEl.innerHTML = `
          @font-face {
            font-family: Open Sans;
            src: url( https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0b.woff2 );
          }
          div {
            background-color: ${config.background};
            text-align: ${config.alignment}
          }
          img {
            height: ${config.flexible ? maxHeight/1.5+'px' : config.icon_height};
            width: ${config.flexible ? maxHeight/1.5+'px' : config.icon_width};
            margin: ${config.flexible ? maxHeight/4 -10 +'px '+maxHeight/4 -10 +'px auto' : '10px 10px auto'};
          }
          .headerDiv {
            display: flex;
            justify-content: space-between;
            font-family: ${config.title_font_family};
            color: ${config.title_color};
            font-size: ${config.flexible ? '4vw' : config.title_font_size};
            font-weight: ${config.title_font_weight};
          }
          #vis {
            border-radius: ${config.border_radius};
            padding: 10px;
            width: calc(100% - 40px);
            display: flex;
            justify-content: space-between;
            flex-direction: column;
          }
          span {
            margin-top: ${config.flexible ? 'auto' : '10px'};
            margin-left: ${config.flexible ? 'auto' : config.headerMarginLeft}
          }
          a {
            font-family: ${config.value_font_family};
            color: ${config.value_color};
            font-size: ${config.flexible ? '13vw' : config.value_font_size};
            font-weight: ${config.value_font_weight};
            text-decoration: none;
          }
          .value {
            font-family: ${config.value_font_family};
            color: ${config.value_color};
            font-size: ${config.flexible ? '13vw' : config.value_font_size};
            text-decoration: none;
            font-weight: ${config.value_font_weight};
          }        
          .headerDiv .tooltiptext {
            visibility: hidden;
            width: 200px;
            background-color: #555;
            color: #fff;
            text-align: center;
            border-radius: 6px;
            padding: 5px 0;
            position: absolute;
            z-index: 100;
            right: 65px;
            opacity: 0;
            transition: opacity 0.3s;
          }
          
          .headerDiv .tooltiptext::after {
            content: "";
            position: absolute;
            right: 65px;
            border-width: 5px;
            border-style: solid;
            border-color: #555 transparent transparent transparent;
          }
          
          .headerDiv:hover .tooltiptext {
            visibility: visible;
            opacity: 1;
          }
          .verticalContainer{
            display: flex; /* or inline-flex */
            flex-direction: column;
            justify-content: space-between;
          }
          .container {
            display: flex; /* or inline-flex */
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
          }
          .title_value {
            display: flex;
            flex-direction: column;
          }
          .lower_note {
            align-self: center;
            margin-top: ${config.lower_note_margin};
            font-size: ${config.lower_note_text_size};
          }
          ;`;

    document.head.appendChild(styleEl);

    if (config.left_right) {
      // upper right aligned icon
      var headerDiv = document.createElement("div");
      headerDiv.setAttribute("class", "headerDiv");

      var labelSpan = document.createElement("span");
      labelSpan.innerHTML = config.title_label;
      headerDiv.appendChild(labelSpan);

      var img = document.createElement("img");
      img.setAttribute("src", config.icon_uri);
      headerDiv.appendChild(img);

      if (config.icon_note && config.icon_note.length > 0) {
        var tooltipSpan = document.createElement("span");
        tooltipSpan.setAttribute("class", "tooltiptext");
        tooltipSpan.innerHTML = config.icon_note;
        headerDiv.appendChild(tooltipSpan);
      }

      var valueDiv = document.createElement("div");
      valueDiv.setAttribute("class", "value");
      valueDiv.innerHTML = value;

      var noteDiv = document.createElement("div");
      noteDiv.setAttribute("class","lower_note")
      noteDiv.innerHTML = config.lower_note

      element.appendChild(headerDiv);
      element.appendChild(valueDiv);
      if (config.lower_note) element.appendChild(noteDiv)
    } else {
      // left aligned icon
      var verticalContainer = document.createElement("div");
      verticalContainer.setAttribute("class","verticalContainer")

      var containerDiv = document.createElement("div");
      containerDiv.setAttribute("class", "container");

      var img = document.createElement("img");
      img.setAttribute("src", config.icon_uri);
      containerDiv.appendChild(img);

      var titleValueDiv = document.createElement("div");
      titleValueDiv.setAttribute("class", "title_value");
      
      var headerDiv = document.createElement("div");
      headerDiv.setAttribute("class", "headerDiv");

      var labelSpan = document.createElement("span");
      labelSpan.innerHTML = config.title_label;
      headerDiv.appendChild(labelSpan);

      if (config.icon_note && config.icon_note.length > 0) {
        var tooltipSpan = document.createElement("span");
        tooltipSpan.setAttribute("class", "tooltiptext");
        tooltipSpan.innerHTML = config.icon_note;
        headerDiv.appendChild(tooltipSpan);
      }

      titleValueDiv.appendChild(headerDiv)

      var valueDiv = document.createElement("div");
      valueDiv.setAttribute("class", "value");
      valueDiv.innerHTML = value;

      titleValueDiv.appendChild(valueDiv);
      containerDiv.appendChild(titleValueDiv);

      if(config.lower_note) {
        var noteDiv = document.createElement("div");
        noteDiv.setAttribute("class","lower_note")
        noteDiv.innerHTML = `<em>${config.lower_note}</em>`

        verticalContainer.appendChild(containerDiv)
        verticalContainer.appendChild(noteDiv)
        element.appendChild(verticalContainer);
      } else {
        element.appendChild(containerDiv)
      }

    }
    doneRendering();
  },
});
