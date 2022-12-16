import { SetStateAction, useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Node,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  ReactFlowInstance,
  Controls,
  useReactFlow,
} from 'reactflow';
import axios from 'axios';

import CustomNode from './CustomNodes/Others/CustomNode';
import MobileNode from './CustomNodes/Others/MobileNode';
import WorkflowNode from './CustomNodes/Others/WorkflowNode';
import StartNode from './CustomNodes/StartNode';
import ApiCallNode from './CustomNodes/Others/ApiCallNode';
import SingleButtonNode from './CustomNodes/SingleButtonCard';
import DoubleButtonNode from './CustomNodes/DoubleButtonCard';
import EndNode from './CustomNodes/EndNode';


// this is important! You need to import the styles from the lib to make it work
import 'reactflow/dist/style.css';

import './Flow.css';
import { stringify } from 'querystring';


const nodeTypes = {
  custom: CustomNode,
  mobile: MobileNode,
  workflow: WorkflowNode,
  start: StartNode,
  apicall: ApiCallNode,
  singlebutton: SingleButtonNode,
  doublebutton: DoubleButtonNode,
  endnode: EndNode,
};

const initialNodes: Node[] = [
    {
        id: "1",
        nodeId: "e2bf3e3f-63f1-44e9-9f9a-43a3bffc4d02",
        nodeType: "UINode",
        nodeLabel: "Carousel Card",
        childNodes: [
            {                
                nodeId: "e2bf3e3f-63f1-44e9-9f9a-43a3bffc4d03",
                transitionExpression: "[stashCreationCardClicked] == true"
            }
        ],
        cardData: {
            cardHtml: "<div>hi</div>",
            cardProperties: {
                height: "50%",
                width: "50%",
                bgColor: "#ffffff"
            },
            podProperties: {
                podId :"15d52901-e35e-4879-abbe-0e0ddfe332fe",
                podType: "carousel",
                podWidth: "300%",
                podHeight: "150px",
                maxCards: "3",
                horizontalScrolling : "true",
                verticalScrolling: "false"
            },
            elements: [
                {
                    cid: "xx1",
                    component: "image",
                    styleProperties: {
                        width: "40%",
                        height: "20%",
                        alignment: "center",
                        margin: [
                            2,
                            2,
                            0,
                            0
                        ]
                    },
                    src: "https://imgs.search.brave.com/a5Lr0RTcLiZWPF57sp9cgD0zzT3nuxI_kC9UxF7U0wY/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/dHJhdmVsYWxlcnRz/LmNhL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE5LzA3L3NodXR0/ZXJzdG9ja182NDQ3/NDA0OTVmZWF0Lmpw/Zw",
                    title: "Image",
                    editableProperties: [
                        {
                            key: "styleProperties.width",
                            label: "width"
                        }
                    ]
                },
                {
                    cid: "xx2",
                    component: "label",
                    styleProperties: {
                        fontFamily: "Helvetica",
                        variant: "h5",
                        alignment: "center",
                        color: "#000000",
                        margin: [
                            2,
                            2,
                            0,
                            0
                        ]
                    },
                    label: "Stash",
                    title: "Pitch",
                    editableProperties: [
                        {
                            key: "value",
                            label: "text"
                        }, 
                        {
                            key: "styleProperties.color",
                            label: "color"
                        }
                    ]
                },
                {   
                    cid: "xx3",
                    component: "label",
                    styleProperties: {
                        fontFamily: "Helvetica",
                        alignment: "center",
                        variant: "h7",
                        color: "#000000",
                        margin: [
                            2,
                            2,
                            0,
                            0
                        ]
                    },
                    label: "Flexi-savings account. Insanely smart",
                    title: "Content",
                    editableProperties: [
                        {
                            key: "value",
                            label: "text"
                        }, 
                        {
                            key: "styleProperties.color",
                            label: "color"
                        }
                    ]
                },
                {   
                    cid: "xx4",
                    component: "button",
                    varName: "stashCreationCardClicked",
                    value: false,
                    styleProperties: {
                        fontFamily: "Helvetica",
                        alignment: "center",
                        variant: "contained",
                        color: "#ffffff",
                        bgColor:"#000000",
                        margin: [
                            2,
                            2,
                            0,
                            0
                        ]
                    },
                    label: "Next",
                    title: "button",
                    onClick: "1+2",
                    editableProperties: [
                        {
                            key: "value",
                            label: "text"
                        }, 
                        {
                            key: "styleProperties.color",
                            label: "color"
                        },
                        {
                            key: "styleProperties.bgColor",
                            label: "bgColor"
                        }
                    ]
                }
            ]
        },
        action: {},
        transitionExpression: "",
        position: { x: 0, y: 200 },
        draggable: false,
    },
    {
        id:"2",
        nodeId: "e2bf3e3f-63f1-44e9-9f9a-43a3bffc4d03",
        nodeType: "UINode",
        nodeLabel: "Product Description card",
        childNodes: [
            {
                nodeId: "e2bf3e3f-63f1-44e9-9f9a-43a3bffc4d04",
                transitionExpression: "[btnStashGetStartedClicked] == false && [cancelStashGetStartedClicked] == true"
            },
            {
                nodeId: "e2bf3e3f-63f1-44e9-9f9a-43a3bffc4d05",
                transitionExpression: "[btnStashGetStartedClicked] == true && [cancelStashGetStartedClicked] == false"
            }
        ],
        cardData: {
            cardHtml: "<div>hi</div>",
            cardProperties: {
                height: "50%",
                width: "50%",
                bgColor: "#ffffff"
            },
            podId: "759e724d-ab85-4306-af47-cfb95dea8b9e",
            podType: "FullScreen",
            podProperties: {
                podId :"74d44e3e-6fb4-4701-97b5-3894e327ba69",
                podType: "Full_Screen", 
                podWidth:"100%",
                podHeight:"100%",
                maxCards: "1",
                horizontalScrolling : "false",
                verticalScrolling: "true"
            },
            elements: [
                {
                    cid: "xx1",
                    component: "image",
                    styleProperties: {
                        width: "40%",
                        height: "20%",
                        alignment: "center",
                        margin: [
                            2,
                            2,
                            0,
                            0
                        ]
                    },
                    src: "https://imgs.search.brave.com/a5Lr0RTcLiZWPF57sp9cgD0zzT3nuxI_kC9UxF7U0wY/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/dHJhdmVsYWxlcnRz/LmNhL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE5LzA3L3NodXR0/ZXJzdG9ja182NDQ3/NDA0OTVmZWF0Lmpw/Zw",
                    title: "Image",
                    editableProperties: [
                        {
                            key: "styleProperties.width",
                            label: "width"
                        }
                    ]
                },
                {
                    cid: "xx2",
                    component: "label",
                    styleProperties: {
                        fontFamily: "Helvetica",
                        variant: "h5",
                        alignment: "center",
                        color: "#000000",
                        margin: [
                            2,
                            2,
                            0,
                            0
                        ]
                    },
                    label: "What is a Stash?",
                    title: "Pitch",
                    editableProperties: [
                        {
                            key: "value",
                            label: "text"
                        }, 
                        {
                            key: "styleProperties.color",
                            label: "color"
                        }
                    ]
                },
                {   
                    cid: "xx3",
                    component: "label",
                    styleProperties: {
                        fontFamily: "Helvetica",
                        alignment: "center",
                        variant: "h7",
                        color: "#000000",
                        margin: [
                            2,
                            2,
                            0,
                            0
                        ]
                    },
                    label: "Stash is a Goal based Savings account.",
                    title: "Description",
                    editableProperties: [
                        {
                            key: "value",
                            label: "text"
                        }, 
                        {
                            key: "styleProperties.color",
                            label: "color"
                        }
                    ]
                },
                {   
                    cid: "xx4",
                    component: "label",
                    styleProperties: {
                        fontFamily: "Helvetica",
                        alignment: "center",
                        variant: "h7",
                        color: "#000000",
                        margin: [
                            2,
                            2,
                            0,
                            0
                        ]
                    },
                    label: "You can save towards any goal from buying your dream car to sending your kid to a good school.",
                    title: "Content",
                    editableProperties: [
                        {
                            key: "value",
                            label: "text"
                        }, 
                        {
                            key: "styleProperties.color",
                            label: "color"
                        }
                    ]
                },
                {   
                    cid: "xx5",
                    component: "button",
                    varName: "btnStashGetStartedClicked",
                    value: false,
                    styleProperties: {
                        fontFamily: "Helvetica",
                        alignment: "center",
                        variant: "contained",
                        color: "#ffffff",
                        bgColor:"#000000",
                        margin: [
                            2,
                            2,
                            0,
                            0
                        ]
                    },
                    label: "Get Started",
                    title: "button",
                    event: "onGetStartedClicked",
                    editableProperties: [
                        {
                            key: "value",
                            label: "text"
                        }, 
                        {
                            key: "styleProperties.color",
                            label: "color"
                        },
                        {
                            key: "styleProperties.bgColor",
                            label: "bgColor"
                        }
                    ]
                }
            ]
        },
        action: {},
        transitionExpression: "[stashCreationCardClicked] == true",
        position: { "x": 0, "y": 400 },
        draggable: false,
    },    
    {
        id: "3",
        nodeId: "e2bf3e3f-63f1-44e9-9f9a-43a3bffc4d05",
        nodeType: "UINode",
        nodeLabel: "Goal screen",
        childNodes: [
            {
                nodeId: "e2bf3e3f-63f1-44e9-9f9a-43a3bffc4d06",
                transitionExpression: "[btnGoalContinueClicked] == true"
            }
        ],
        cardData: {
            cardHtml: "<div>hi</div>",
            cardProperties: {
                height: "100%",
                width: "100%",
                bgColor: "#908E8D"
            },
            podId: "759e724d-ab85-4306-af47-cfb95dea8b9e",
            podType: "FullScreen",
            podProperties:{
                podId :"74d44e3e-6fb4-4701-97b5-3894e327ba69",
                podType: "FullScreen", 
                podWidth:"100%",
                podHeight:"100%",
                maxCards: "1",
                horizontalScrolling : false,
                verticalScrolling: true
            },
            elements: [
                {
                    cid: "xx1",
                    component: "image",
                    styleProperties: {
                        width: "100%",
                        height: "20%",
                        alignment: "center",
                        margin: [
                            2,
                            2,
                            0,
                            0
                        ]
                    },
                    src: "https://imgs.search.brave.com/a5Lr0RTcLiZWPF57sp9cgD0zzT3nuxI_kC9UxF7U0wY/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/dHJhdmVsYWxlcnRz/LmNhL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE5LzA3L3NodXR0/ZXJzdG9ja182NDQ3/NDA0OTVmZWF0Lmpw/Zw",
                    title: "Image",
                    editableProperties: [
                        {
                            key: "styleProperties.width",
                            label: "width"
                        }
                    ]
                },
                {
                    cid: "xx2",
                    component: "label",
                    styleProperties: {
                        fontFamily: "Helvetica",
                        variant: "h5",
                        alignment: "center",
                        color: "#ffffff",
                        margin: [
                            2,
                            2,
                            0,
                            0
                        ]
                    },
                    label: "What is your goal?",
                    title: "Title",
                    editableProperties: [
                        {
                            key: "value",
                            label: "text"
                        }, 
                        {
                            key: "styleProperties.color",
                            label: "color"
                        }
                    ]
                },
                {   
                    cid: "xx3",
                    component: "textField",
                    varName: "goalAmount",
                    value: "",
                    styleProperties: {
                        fontFamily: "Helvetica",
                        alignment: "center",
                        variant: "outlined",
                        color: "#FFFFFF",
                        margin: [
                            2,
                            2,
                            0,
                            0
                        ]
                    },
                    placeholder: "Goal Amount",
                    inputType: "number",
                    title: "Goal Amount",
                    event: "onGoalAmountInput",
                    editableProperties: [
                        {
                            key: "styleProperties.color",
                            label: "color"
                        },
                        {
                            key: "styleProperties.bgColor",
                            label: "bgColor"
                        }
                    ]
                },
                {   
                    cid: "xx4",
                    component: "textField",
                    varName: "stashName",
                    value: "",
                    styleProperties: {
                        fontFamily: "Helvetica",
                        alignment: "center",
                        variant: "outlined",
                        color: "#FFFFFF",
                        margin: [
                            2,
                            2,
                            0,
                            0
                        ]
                    },
                    placeholder: "Name your stash",
                    inputType: "text",
                    title: "Stash Name",
                    event: "onStashNameInput",
                    editableProperties: [
                        {
                            key: "styleProperties.color",
                            label: "color"
                        },
                        {
                            key: "styleProperties.bgColor",
                            label: "bgColor"
                        }
                    ]
                },
                {   
                    cid: "xx5",
                    component: "button",
                    varName: "btnGoalContinueClicked",
                    value: false,
                    styleProperties: {
                        fontFamily: "Helvetica",
                        alignment: "center",
                        variant: "contained",
                        color: "#ffffff",
                        bgColor:"#000000",
                        margin: [
                            2,
                            2,
                            0,
                            0
                        ]
                    },
                    label: "Next",
                    event: "btnGoalContinueHandler",
                    title:"button",
                    editableProperties: [
                        {
                            key: "value",
                            label: "text"
                        }, 
                        {
                            key: "styleProperties.color",
                            label: "color"
                        },
                        {
                            key: "styleProperties.bgColor",
                            label: "bgColor"
                        }
                    ]
                }
            ]
        },
        action: {},
        transitionExpression: "[btnStashGetStartedClicked] == true && [cancelStashGetStartedClicked] == false",
        position: { x: 0, y: 600 },
        draggable: false,
    }
]




const initialEdges: Edge[] = [
  { id: 'button1-click', label: 'Button Click',source: '1', target: '2', labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 }},
  { id: 'button2-click', label: 'Button Click',source: '2', target: '3', labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 } },
  { id: 'button3-click', label: 'Button Click',source: '3', sourceHandle:'a',target: '4', labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 } },
  { id: 'button4-click', label: 'Button Click',source: '3', sourceHandle:'b',target: '5', labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 } },
  { id: 'button5-click', label: 'Button Click',source: '4', target: '6',labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 }},
];

function Flow() {
  const [ID,setID]= useState(2);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [properties, setProperties]= useState<any>([])
  const [nodeData,setNodeData] = useState<any>({data: { label: 'FD Flow Card 1', card:'<div style="border-style: solid;"><div><h1 id="heading">Heading</h1><h2 id="desc">Description</h2></div><div><button id="buttonlabel">Label</button></div></div>', inputs:['Heading','Description']}})
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance>();
  const [type, setType]=useState<any>("")

  // const { setViewport, zoomIn, zoomOut } = useReactFlow();



  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // const SetGraph=()=>{
  //       axios.get('http://localhost:9000/v1/templates/6')
  //       .then(res=>{
  //         var graph = res.data.flow_ui;
  //         const data= JSON.parse(graph);
  //         setNodes(data.nodes);
  //         setEdges(data.edges);
  //       })
  //       .catch(err=>{
  //         console.log(err);
  //       })
  //   }

  const onElementClick = (event: any, object: any) => {
    console.log(object.data.label);
    document.getElementById('preview')!.innerHTML = object.data.card;
    
    setType(object.type)
    setNodeData(object);
  }
  

  const SaveGraph =async()=>{
    const graphdata = rfInstance!.toObject();
    console.log(graphdata);
    const lol= {
      "flow_ui": JSON.stringify(graphdata),
  }
    await fetch('http://localhost:9000/v1/templates/11',{
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body:  JSON.stringify(lol),
    })
    console.log(lol);
    
  }
    

  const addNode = useCallback(() => {
    const newNode = {
      id: `randomnode_${+new Date()}`,
      type: 'singlebutton',
      data: { label: 'FD Flow Card 5' , card: ' <div style="border-style: solid;"><div><h1 id="heading">Heading</h1><h2 id="desc">Description</h2></div><div><button id="buttonlabel">Label</button></div></div>'},
      position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
    };

    setNodes((ns) => ns.concat(newNode));
  }, []);

  const PreviewChange =(e:any, field:string)=>{
    document.getElementById(field)!.innerHTML=e.target!.value
  }

  const SavetoGraph =()=>{
    nodeData.data.card= document.getElementById("preview")!.innerHTML
  }

  

  return (
    <div className="App">
    <h4>Input ID:</h4><input value={ID} placeholder={String(ID)} onChange={e=>{setID(parseInt(e.target.value))}} type="number"/>
    <div className='wrapper'>
      
      <div className="Flow"
    style={{
      height: "70vh",
      width: "50vw",
      border: "1px solid black",
      marginRight: "10vw",
      marginLeft: "10vw"
    }}
    >
      <button onClick={SaveGraph}>Save</button>
      <button onClick={addNode}>Add Node</button>
      {/* <button onClick={SetGraph}>Restore Graph From Database</button> */}
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
        onInit={setRfInstance}
        style={{ background: '#FFFAFA',}}
        onNodeClick={onElementClick}
      >
        {/* <MiniMap/> */}
        <Controls />
      </ReactFlow>
    </div>
      
      
      
      
      <div id="authoring" style={{marginRight: "10vw"}}>
        <h1>{nodeData.data.label}</h1>
        <h2 id="preview"></h2> 
        <h2 id="Properties">
          {
            type==="start" ? (<div><h4>Heading</h4><input className="heading" onChange={(e)=>{PreviewChange(e, 'heading')}} placeholder={document.getElementById("heading")!.innerHTML}/><br/><h4>Description</h4><input className="desc" onChange={(e)=>{PreviewChange(e, 'desc')}} placeholder={document.getElementById("desc")!.innerHTML} /></div>)
            :(type==="singlebutton" ? (<div><h4>Heading</h4><input className="heading" onChange={(e)=>{PreviewChange(e, 'heading')}} placeholder={document.getElementById("heading")!.innerHTML}/><br/><h4>Description</h4><input className="desc" onChange={(e)=>{PreviewChange(e, 'desc')}} placeholder={document.getElementById("desc")!.innerHTML}/><br/><h4>ButtonLabel</h4><input className="buttonlabel" onChange={(e)=>{PreviewChange(e, 'buttonlabel')}} placeholder={document.getElementById("buttonlabel")!.innerHTML}/></div>) 
            : (type==="doublebutton" ? (<div><h4>Heading</h4><input className="heading" onChange={(e)=>{PreviewChange(e, 'heading')}} placeholder={document.getElementById("heading")!.innerHTML}/><br/><h4>Description</h4><input className="desc" onChange={(e)=>{PreviewChange(e, 'desc')}} placeholder={document.getElementById("desc")!.innerHTML}/><br/><h4>ButtonLabel1</h4><input className="buttonlabel1" onChange={(e)=>{PreviewChange(e, 'buttonlabel1')}} placeholder={document.getElementById("buttonlabel1")!.innerHTML}/><br/><h4>ButtonLabel2</h4><input className="buttonlabel2" onChange={(e)=>{PreviewChange(e, 'buttonlabel2')}} placeholder={document.getElementById("buttonlabel2")!.innerHTML}/></div>) 
            : ""))
          }
        </h2>
        <button onClick={(e)=>{SavetoGraph()}}>Save Changes</button>
        
      </div>
    </div>
    </div>
  );
}

export default Flow;





