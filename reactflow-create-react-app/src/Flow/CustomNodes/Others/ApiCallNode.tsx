import { memo, FC, CSSProperties, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

const sourceHandleStyleA: CSSProperties = { left: 50 };
const sourceHandleStyleB: CSSProperties = {
  right: 50,
  left: 'auto',
};

const getworkflow = async(ApiLink:string,Method:string,Headers:string,Body:string) => {
  
const response = await fetch(ApiLink, {
    method: Method,
    mode: 'no-cors',
    headers: {Headers},
    body: Body
 });
console.log(response);
  
}


const ApiCallNode: FC<NodeProps> = ({ data, xPos, yPos }) => {
  const [ApiLink, setApiLink] = useState("");
  const [Method, setMethod] = useState("");
  const [Headers, setHeaders] = useState("");
  const [Body, setBody] = useState("");

  return (
    <>
      <Handle type="target" position={Position.Top} />
        <div>
          <h4>API Trigger Node</h4>
            <label>ApiLink:</label><input type={"text"} value={ApiLink} onChange={(e)=>{setApiLink(e.target.value)}} /><br/>
            <label>Method:</label><input type={"text"} value={Method} onChange={(e)=>{setMethod(e.target.value)}} /><br/>
            <label>Headers:</label><input type={"text"} value={Headers} onChange={(e)=>{setHeaders(e.target.value)}} /><br/>
            <label>Body(JSON):</label><input type={"text"} value={Body} onChange={(e)=>{setBody(e.target.value)}} /><br/>
            
            <button onClick={()=>{getworkflow(ApiLink,Method,Headers,Body)}}>Test</button>
        </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={sourceHandleStyleB}
      />
    </>
  );
};

export default memo(ApiCallNode);
