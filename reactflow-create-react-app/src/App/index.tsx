import Flow from '../Flow';
import './App.css';


const json={
    "type": "header_body_card",
    "card_properties": {
        "height": "100%",
        "width": "180px",
        "bgColor": "#000000",
    },
    "elements": [
        {
            "id": "title_label",
            "style_properties": {
                'color': "red",
            },
            "mar80pgin": [2, 2, 0, 0],
            "value": "This is a heading label"
        },
        {
            "id": "body_label",
            "style_properties": {
                "font_family": "Helvetica",
                "alignment": "center",
                "variant": "h6",
                "color": "#FFFFFF"
            },
            "margin": [2, 2, 0, 0],
            "value": "This is a body label and so the content is larger."
        }
    ]
  }


const JSONtoCSS = (json : any) => {
  let css = "";
  for (let key in json) {
      css += key + ":" + "'" + json[key] + "'";
      if(key!==Object.keys(json).pop()){
          css += ";"
      }
  }
  console.log(css);
  return css;
}

function App() {
  return (
    <div className="App">

      <header className="App-header">Experience Editor UI Example</header>
        <Flow/>
    </div>
  );
}

export default App;
