import { memo, FC, CSSProperties, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

const sourceHandleStyleA: CSSProperties = { left: 50 };
const sourceHandleStyleB: CSSProperties = {
  right: 50,
  left: 'auto',
};

const getworkflow = async(name:string) => {
  if(name=="HTTP"){
    const response = await fetch("http://localhost:5678/webhook/2f6bded0-b590-4acc-b1f8-302ef444b3d9", {
      method: 'POST',
      mode: 'no-cors',
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;Access-Control-Allow-Origin: *;X-N8N-API-KEY:n8n_api_354cfabff50597304f7b742b34d93504ad97fa2a8030932eecbf864c512446be1ae026ec7ef677f0; accept: application/json' } });
    console.log(response);
  }
}


const CustomNode: FC<NodeProps> = ({ data, xPos, yPos }) => {
  const [workflowname, setWorkflowname] = useState("");

  return (
    <>
      <Handle type="target" position={Position.Top} />
        <div>
          <h4>Workflow Trigger Node</h4>
            <input type={"text"} value={workflowname} onChange={(e)=>{setWorkflowname(e.target.value)}} />
            <button onClick={()=>{getworkflow(workflowname)}}>Test</button>
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

export default memo(CustomNode);
