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
    id: '1',
    type: 'start',
    data: { label: 'FD Card' , card:'<div style="border-style: solid;"><div><h1 id="heading">Heading</h1><h2 id="desc">Description</h2></div></div>' },
    position: { x: 0, y: 0 },
    draggable: false,
  },
  {
    id: '2',
    type: 'singlebutton',
    data: { label: 'FD Flow Card 1', card:'<div style="border-style: solid;"><div><h1 id="heading">Heading</h1><h2 id="desc">Description</h2></div><div><button id="buttonlabel">Label</button></div></div>'},
    position: { x: 0, y: 200 },
    draggable: false,
  },
  {
    id: '3',
    type: 'doublebutton',
    data: { label: 'FD Flow Card 2', card: '<div style="border-style: solid;"><div><h1 id="heading">Heading</h1><h2 id="desc">Description</h2></div><div><button id="buttonlabel1">Label1</button><button id="buttonlabel2">Label2</button></div></div>' },
    position: { x: 0, y: 400 },
    draggable: false,
  },
  {
    id: '4',
    type: 'singlebutton',
    data: { label: 'FD Flow Card 3' , card: ' <div style="border-style: solid;"><div><h1 id="heading">Heading</h1><h2 id="desc">Description</h2></div><div><button id="buttonlabel">Label</button></div></div>'},
    position: { x: -150, y: 600 },
    draggable: false,
  },
  {
    id: '5',
    type: 'endnode',
    data: { label: 'Feedback Card' },
    position: { x: 150, y: 600 },
    draggable: false,
  },
  {
    id: '6',
    type: 'endnode',
    data: { label: 'Scheduler Card' },
    position: { x: -150, y: 800 },
    draggable: false,
  },  
];

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

  const SetGraph=()=>{
        axios.get('http://localhost:9000/v1/flows/'+ID)
        .then(res=>{
          var graph = res.data.graph_json;
          const data= JSON.parse(graph);
          setNodes(data.nodes);
          setEdges(data.edges);
        })
        .catch(err=>{
          console.log(err);
        })
    }

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
      "graph_json": JSON.stringify(graphdata),
  }
    await fetch('http://localhost:9000/v1/flows/'+ID,{
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body:  JSON.stringify(lol),
    })
    
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
      <button onClick={SetGraph}>Restore Graph From Database</button>
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





