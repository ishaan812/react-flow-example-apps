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

const json1: Node[] = [
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
            cardHtml: `<style data-emotion="css n0ckvz-MuiCard-root">.css-n0ckvz-MuiCard-root{overflow:hidden;width:140px;height:140px;background:blue;color:white;}</style><style data-emotion="css 17h39wu-MuiPaper-root-MuiCard-root">.css-17h39wu-MuiPaper-root-MuiCard-root{background-color:#fff;color:rgba(0, 0, 0, 0.87);-webkit-transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;border-radius:4px;box-shadow:0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);overflow:hidden;width:140px;height:140px;background:black;color:white;}</style><div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-17h39wu-MuiPaper-root-MuiCard-root"><style data-emotion="css fc4fch-MuiCardActionArea-root">.css-fc4fch-MuiCardActionArea-root{display:block;text-align:inherit;width:100%;}.css-fc4fch-MuiCardActionArea-root:hover .MuiCardActionArea-focusHighlight{opacity:0.04;}@media (hover: none){.css-fc4fch-MuiCardActionArea-root:hover .MuiCardActionArea-focusHighlight{opacity:0;}}.css-fc4fch-MuiCardActionArea-root.Mui-focusVisible .MuiCardActionArea-focusHighlight{opacity:0.12;}</style><style data-emotion="css b6lsxj-MuiButtonBase-root-MuiCardActionArea-root">.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center;position:relative;box-sizing:border-box;-webkit-tap-highlight-color:transparent;background-color:transparent;outline:0;border:0;margin:0;border-radius:0;padding:0;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;vertical-align:middle;-moz-appearance:none;-webkit-appearance:none;-webkit-text-decoration:none;text-decoration:none;color:inherit;display:block;text-align:inherit;width:100%;}.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root::-moz-focus-inner{border-style:none;}.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root.Mui-disabled{pointer-events:none;cursor:default;}@media print{.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root{-webkit-print-color-adjust:exact;color-adjust:exact;}}.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root:hover .MuiCardActionArea-focusHighlight{opacity:0.04;}@media (hover: none){.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root:hover .MuiCardActionArea-focusHighlight{opacity:0;}}.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root.Mui-focusVisible .MuiCardActionArea-focusHighlight{opacity:0.12;}</style><button class="MuiButtonBase-root MuiCardActionArea-root css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root" tabindex="0" type="button" ><style data-emotion="css 46bh2p-MuiCardContent-root">.css-46bh2p-MuiCardContent-root{padding:16px;}.css-46bh2p-MuiCardContent-root:last-child{padding-bottom:24px;}</style><div class="MuiCardContent-root css-46bh2p-MuiCardContent-root"><style data-emotion="css ag7rrr-MuiTypography-root">.css-ag7rrr-MuiTypography-root{margin:0;font-family:"Roboto","Helvetica","Arial",sans-serif;font-weight:400;font-size:1.5rem;line-height:1.334;letter-spacing:0em;}</style><h5 class="MuiTypography-root MuiTypography-h5 css-ag7rrr-MuiTypography-root">Personal Banking</h5><style data-emotion="css tsiuxe-MuiStack-root">.css-tsiuxe-MuiStack-root{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-top:20px;}</style><div class="MuiStack-root css-tsiuxe-MuiStack-root"><style data-emotion="css 1x1568-MuiTypography-root">.css-1x1568-MuiTypography-root{margin:0;font-family:"Roboto","Helvetica","Arial",sans-serif;font-weight:400;font-size:1rem;line-height:1.5;letter-spacing:0.00938em;color:cyan;}</style><p class="MuiTypography-root MuiTypography-body1 css-1x1568-MuiTypography-root" onclick="myFunction()">Find out </p><style data-emotion="css i4bv87-MuiSvgIcon-root">.css-i4bv87-MuiSvgIcon-root{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:1em;height:1em;display:inline-block;fill:currentColor;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;-webkit-transition:fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;transition:fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;font-size:1.5rem;}</style><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ChevronRightIcon"><path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg></div></div><style data-emotion="css 1v2exvi-MuiCardActionArea-focusHighlight">.css-1v2exvi-MuiCardActionArea-focusHighlight{overflow:hidden;pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;border-radius:inherit;opacity:0;background-color:currentcolor;-webkit-transition:opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;transition:opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;}</style><span class="MuiCardActionArea-focusHighlight css-1v2exvi-MuiCardActionArea-focusHighlight"></span></button></div>`,
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
        draggable: false
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
            cardHtml: `<div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-1nlvjwg-MuiPaper-root-MuiCard-root">
        <div style="height:20%;width:100%"><img id="xx1" src="https://imgs.search.brave.com/a5Lr0RTcLiZWPF57sp9cgD0zzT3nuxI_kC9UxF7U0wY/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/dHJhdmVsYWxlcnRz/LmNhL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE5LzA3L3NodXR0/ZXJzdG9ja182NDQ3/NDA0OTVmZWF0Lmpw/Zw" alt="hi" width="100%"/>
        </div>
        <h1 class="MuiTypography-root MuiTypography-h5 css-1opxj2i-MuiTypography-root" id="xx2">
            What is your goal?
        </h1>
        <div class="MuiFormControl-root MuiTextField-root css-1cqlhsk-MuiFormControl-root-MuiTextField-root">
            <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root" data-shrink="false" for="xx3" id="xx3-label">
                Goal Amount
            </label>
            <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root">
                <input aria-invalid="false" id="xx3" type="text" class="MuiInputBase-input MuiOutlinedInput-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input" value=""/>
                <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline">
                    <legend class="css-yjsfm1">
                        <span>Goal Amount</span>
                    </legend>
                </fieldset>
                </div>
            </div>
            <div class="MuiFormControl-root MuiTextField-root css-1cqlhsk-MuiFormControl-root-MuiTextField-root">
                <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root" data-shrink="false" for="xx4" id="xx4-label">
                    Stash Name
                </label>
                <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root">
                    <input aria-invalid="false" id="xx4" type="text" class="MuiInputBase-input MuiOutlinedInput-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input" value=""/>
                    <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline">
                        <legend class="css-yjsfm1"><span>Stash Name</span></legend>
                        </fieldset>
                    </div>
                </div>
                <button class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-12l85fc-MuiButtonBase-root-MuiButton-root" tabindex="0" type="button" id="xx5">Next</button></div></div>`,
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
    }    
]
const json2: Node[]= [
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
            cardHtml: `<style data-emotion="css jpjmk5-MuiCard-root">.css-jpjmk5-MuiCard-root{overflow:hidden;width:300px;height:140px;background:black;color:white;}</style><style data-emotion="css 14mmgaw-MuiPaper-root-MuiCard-root">.css-14mmgaw-MuiPaper-root-MuiCard-root{background-color:#fff;color:rgba(0, 0, 0, 0.87);-webkit-transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;border-radius:4px;box-shadow:0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);overflow:hidden;width:280px;height:140px;background:blue;color:white;}</style><div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-14mmgaw-MuiPaper-root-MuiCard-root"><style data-emotion="css fc4fch-MuiCardActionArea-root">.css-fc4fch-MuiCardActionArea-root{display:block;text-align:inherit;width:100%;}.css-fc4fch-MuiCardActionArea-root:hover .MuiCardActionArea-focusHighlight{opacity:0.04;}@media (hover: none){.css-fc4fch-MuiCardActionArea-root:hover .MuiCardActionArea-focusHighlight{opacity:0;}}.css-fc4fch-MuiCardActionArea-root.Mui-focusVisible .MuiCardActionArea-focusHighlight{opacity:0.12;}</style><style data-emotion="css b6lsxj-MuiButtonBase-root-MuiCardActionArea-root">.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center;position:relative;box-sizing:border-box;-webkit-tap-highlight-color:transparent;background-color:transparent;outline:0;border:0;margin:0;border-radius:0;padding:0;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;vertical-align:middle;-moz-appearance:none;-webkit-appearance:none;-webkit-text-decoration:none;text-decoration:none;color:inherit;display:block;text-align:inherit;width:100%;}.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root::-moz-focus-inner{border-style:none;}.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root.Mui-disabled{pointer-events:none;cursor:default;}@media print{.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root{-webkit-print-color-adjust:exact;color-adjust:exact;}}.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root:hover .MuiCardActionArea-focusHighlight{opacity:0.04;}@media (hover: none){.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root:hover .MuiCardActionArea-focusHighlight{opacity:0;}}.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root.Mui-focusVisible .MuiCardActionArea-focusHighlight{opacity:0.12;}</style><button class="MuiButtonBase-root MuiCardActionArea-root css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root" tabindex="0" type="button"><style data-emotion="css 1yijrg0-MuiCardContent-root">.css-1yijrg0-MuiCardContent-root{padding:16px;padding:20px;}.css-1yijrg0-MuiCardContent-root:last-child{padding-bottom:24px;}</style><div class="MuiCardContent-root css-1yijrg0-MuiCardContent-root"><style data-emotion="css ag7rrr-MuiTypography-root">.css-ag7rrr-MuiTypography-root{margin:0;font-family:"Roboto","Helvetica","Arial",sans-serif;font-weight:400;font-size:1.5rem;line-height:1.334;letter-spacing:0em;}</style><div class="MuiTypography-root MuiTypography-h5 css-ag7rrr-MuiTypography-root">Get 8% on FD Today.</div><style data-emotion="css 7gvv57-MuiStack-root">.css-7gvv57-MuiStack-root{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;margin-top:10px;}</style><div class="MuiStack-root css-7gvv57-MuiStack-root"><style data-emotion="css 1x1568-MuiTypography-root">.css-1x1568-MuiTypography-root{margin:0;font-family:"Roboto","Helvetica","Arial",sans-serif;font-weight:400;font-size:1rem;line-height:1.5;letter-spacing:0.00938em;color:cyan;}</style><p class="MuiTypography-root MuiTypography-body1 css-1x1568-MuiTypography-root">Convert your extra 40,000 cash into FD at 8% rates</p></div></div><style data-emotion="css 1v2exvi-MuiCardActionArea-focusHighlight">.css-1v2exvi-MuiCardActionArea-focusHighlight{overflow:hidden;pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;border-radius:inherit;opacity:0;background-color:currentcolor;-webkit-transition:opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;transition:opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;}</style><span class="MuiCardActionArea-focusHighlight css-1v2exvi-MuiCardActionArea-focusHighlight"></span></button></div>`,
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
    }
    ]
const json3: Node[]= [
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
            cardHtml: `<style data-emotion="css jpjmk5-MuiCard-root">.css-jpjmk5-MuiCard-root{overflow:hidden;width:300px;height:140px;background:black;color:white;}</style><style data-emotion="css 14mmgaw-MuiPaper-root-MuiCard-root">.css-14mmgaw-MuiPaper-root-MuiCard-root{background-color:#fff;color:rgba(0, 0, 0, 0.87);-webkit-transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;border-radius:4px;box-shadow:0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);overflow:hidden;width:280px;height:140px;background:blue;color:white;}</style><div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-14mmgaw-MuiPaper-root-MuiCard-root"><style data-emotion="css fc4fch-MuiCardActionArea-root">.css-fc4fch-MuiCardActionArea-root{display:block;text-align:inherit;width:100%;}.css-fc4fch-MuiCardActionArea-root:hover .MuiCardActionArea-focusHighlight{opacity:0.04;}@media (hover: none){.css-fc4fch-MuiCardActionArea-root:hover .MuiCardActionArea-focusHighlight{opacity:0;}}.css-fc4fch-MuiCardActionArea-root.Mui-focusVisible .MuiCardActionArea-focusHighlight{opacity:0.12;}</style><style data-emotion="css b6lsxj-MuiButtonBase-root-MuiCardActionArea-root">.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center;position:relative;box-sizing:border-box;-webkit-tap-highlight-color:transparent;background-color:transparent;outline:0;border:0;margin:0;border-radius:0;padding:0;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;vertical-align:middle;-moz-appearance:none;-webkit-appearance:none;-webkit-text-decoration:none;text-decoration:none;color:inherit;display:block;text-align:inherit;width:100%;}.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root::-moz-focus-inner{border-style:none;}.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root.Mui-disabled{pointer-events:none;cursor:default;}@media print{.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root{-webkit-print-color-adjust:exact;color-adjust:exact;}}.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root:hover .MuiCardActionArea-focusHighlight{opacity:0.04;}@media (hover: none){.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root:hover .MuiCardActionArea-focusHighlight{opacity:0;}}.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root.Mui-focusVisible .MuiCardActionArea-focusHighlight{opacity:0.12;}</style><button class="MuiButtonBase-root MuiCardActionArea-root css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root" tabindex="0" type="button"><style data-emotion="css 1yijrg0-MuiCardContent-root">.css-1yijrg0-MuiCardContent-root{padding:16px;padding:20px;}.css-1yijrg0-MuiCardContent-root:last-child{padding-bottom:24px;}</style><div class="MuiCardContent-root css-1yijrg0-MuiCardContent-root"><style data-emotion="css ag7rrr-MuiTypography-root">.css-ag7rrr-MuiTypography-root{margin:0;font-family:"Roboto","Helvetica","Arial",sans-serif;font-weight:400;font-size:1.5rem;line-height:1.334;letter-spacing:0em;}</style><div class="MuiTypography-root MuiTypography-h5 css-ag7rrr-MuiTypography-root">Get 8% on FD Today.</div><style data-emotion="css 7gvv57-MuiStack-root">.css-7gvv57-MuiStack-root{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;margin-top:10px;}</style><div class="MuiStack-root css-7gvv57-MuiStack-root"><style data-emotion="css 1x1568-MuiTypography-root">.css-1x1568-MuiTypography-root{margin:0;font-family:"Roboto","Helvetica","Arial",sans-serif;font-weight:400;font-size:1rem;line-height:1.5;letter-spacing:0.00938em;color:cyan;}</style><p class="MuiTypography-root MuiTypography-body1 css-1x1568-MuiTypography-root">Convert your extra 40,000 cash into FD at 8% rates</p></div></div><style data-emotion="css 1v2exvi-MuiCardActionArea-focusHighlight">.css-1v2exvi-MuiCardActionArea-focusHighlight{overflow:hidden;pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;border-radius:inherit;opacity:0;background-color:currentcolor;-webkit-transition:opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;transition:opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;}</style><span class="MuiCardActionArea-focusHighlight css-1v2exvi-MuiCardActionArea-focusHighlight"></span></button></div>`,
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
    }
    ]

const initialNodes: Node[] = [
    {
        id: "1",
        nodeId: "e2bf3e3f-63f1-44e9-9f9a-43a3bffc4d02",
        nodeType: "UINode",
        nodeLabel: "Carousel Card",
        childNodes: [
            {                
                nodeId: "e2bf3e3f-63f1-44e9-9f9a-43a3bffc4d03",
                transitionExpression: ""
            }
        ],
        cardData: {
            cardHtml: `<style data-emotion="css n0ckvz-MuiCard-root">.css-n0ckvz-MuiCard-root{overflow:hidden;width:140px;height:140px;background:blue;color:white;}</style><style data-emotion="css 17h39wu-MuiPaper-root-MuiCard-root">.css-17h39wu-MuiPaper-root-MuiCard-root{background-color:#fff;color:rgba(0, 0, 0, 0.87);-webkit-transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;border-radius:4px;box-shadow:0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);overflow:hidden;width:140px;height:140px;background:black;color:white;}</style><div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-17h39wu-MuiPaper-root-MuiCard-root"><style data-emotion="css fc4fch-MuiCardActionArea-root">.css-fc4fch-MuiCardActionArea-root{display:block;text-align:inherit;width:100%;}.css-fc4fch-MuiCardActionArea-root:hover .MuiCardActionArea-focusHighlight{opacity:0.04;}@media (hover: none){.css-fc4fch-MuiCardActionArea-root:hover .MuiCardActionArea-focusHighlight{opacity:0;}}.css-fc4fch-MuiCardActionArea-root.Mui-focusVisible .MuiCardActionArea-focusHighlight{opacity:0.12;}</style><style data-emotion="css b6lsxj-MuiButtonBase-root-MuiCardActionArea-root">.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center;position:relative;box-sizing:border-box;-webkit-tap-highlight-color:transparent;background-color:transparent;outline:0;border:0;margin:0;border-radius:0;padding:0;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;vertical-align:middle;-moz-appearance:none;-webkit-appearance:none;-webkit-text-decoration:none;text-decoration:none;color:inherit;display:block;text-align:inherit;width:100%;}.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root::-moz-focus-inner{border-style:none;}.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root.Mui-disabled{pointer-events:none;cursor:default;}@media print{.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root{-webkit-print-color-adjust:exact;color-adjust:exact;}}.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root:hover .MuiCardActionArea-focusHighlight{opacity:0.04;}@media (hover: none){.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root:hover .MuiCardActionArea-focusHighlight{opacity:0;}}.css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root.Mui-focusVisible .MuiCardActionArea-focusHighlight{opacity:0.12;}</style><button class="MuiButtonBase-root MuiCardActionArea-root css-b6lsxj-MuiButtonBase-root-MuiCardActionArea-root" tabindex="0" type="button" ><style data-emotion="css 46bh2p-MuiCardContent-root">.css-46bh2p-MuiCardContent-root{padding:16px;}.css-46bh2p-MuiCardContent-root:last-child{padding-bottom:24px;}</style><div class="MuiCardContent-root css-46bh2p-MuiCardContent-root"><style data-emotion="css ag7rrr-MuiTypography-root">.css-ag7rrr-MuiTypography-root{margin:0;font-family:"Roboto","Helvetica","Arial",sans-serif;font-weight:400;font-size:1.5rem;line-height:1.334;letter-spacing:0em;}</style><h5 class="MuiTypography-root MuiTypography-h5 css-ag7rrr-MuiTypography-root">Personal Banking</h5><style data-emotion="css tsiuxe-MuiStack-root">.css-tsiuxe-MuiStack-root{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-top:20px;}</style><div class="MuiStack-root css-tsiuxe-MuiStack-root"><style data-emotion="css 1x1568-MuiTypography-root">.css-1x1568-MuiTypography-root{margin:0;font-family:"Roboto","Helvetica","Arial",sans-serif;font-weight:400;font-size:1rem;line-height:1.5;letter-spacing:0.00938em;color:cyan;}</style><p class="MuiTypography-root MuiTypography-body1 css-1x1568-MuiTypography-root" onclick="myFunction()">Find out </p><style data-emotion="css i4bv87-MuiSvgIcon-root">.css-i4bv87-MuiSvgIcon-root{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:1em;height:1em;display:inline-block;fill:currentColor;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;-webkit-transition:fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;transition:fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;font-size:1.5rem;}</style><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ChevronRightIcon"><path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg></div></div><style data-emotion="css 1v2exvi-MuiCardActionArea-focusHighlight">.css-1v2exvi-MuiCardActionArea-focusHighlight{overflow:hidden;pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;border-radius:inherit;opacity:0;background-color:currentcolor;-webkit-transition:opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;transition:opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;}</style><span class="MuiCardActionArea-focusHighlight css-1v2exvi-MuiCardActionArea-focusHighlight"></span></button></div>`,
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
        position: { x: 0, y: 0 },
        draggable: false,
    },
    {
        id: "2",
        nodeId: "e2bf3e3f-63f1-44e9-9f9a-43a3bffc4d03",
        nodeType: "UINode",
        nodeLabel: "FullScreen card",
        childNodes: [
        ],
        cardData: {
            cardHtml: `<div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-1nlvjwg-MuiPaper-root-MuiCard-root">
            <div style="height:20%;width:100%"><img id="xx1" src="https://imgs.search.brave.com/a5Lr0RTcLiZWPF57sp9cgD0zzT3nuxI_kC9UxF7U0wY/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/dHJhdmVsYWxlcnRz/LmNhL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE5LzA3L3NodXR0/ZXJzdG9ja182NDQ3/NDA0OTVmZWF0Lmpw/Zw" alt="hi" width="100%"/>
            </div>
            <h1 class="MuiTypography-root MuiTypography-h5 css-1opxj2i-MuiTypography-root" id="xx2">
                What is your goal?
            </h1>
            <div class="MuiFormControl-root MuiTextField-root css-1cqlhsk-MuiFormControl-root-MuiTextField-root">
                <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root" data-shrink="false" for="xx3" id="xx3-label">
                    Goal Amount
                </label>
                <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root">
                    <input aria-invalid="false" id="xx3" type="text" class="MuiInputBase-input MuiOutlinedInput-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input" value=""/>
                    <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline">
                        <legend class="css-yjsfm1">
                            <span>Goal Amount</span>
                        </legend>
                    </fieldset>
                    </div>
                </div>
                <div class="MuiFormControl-root MuiTextField-root css-1cqlhsk-MuiFormControl-root-MuiTextField-root">
                    <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root" data-shrink="false" for="xx4" id="xx4-label">
                        Stash Name
                    </label>
                    <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root">
                        <input aria-invalid="false" id="xx4" type="text" class="MuiInputBase-input MuiOutlinedInput-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input" value=""/>
                        <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline">
                            <legend class="css-yjsfm1"><span>Stash Name</span></legend>
                            </fieldset>
                        </div>
                    </div>
                    <button class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-12l85fc-MuiButtonBase-root-MuiButton-root" tabindex="0" type="button" id="xx5">Next</button></div></div>`,
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
      "flowUI": JSON.stringify(graphdata),
  }
    await fetch('http://localhost:9000/v1/flows/62',{
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body:  JSON.stringify(lol),
    })
    
  }

  const SaveMockData =async()=>{
    setNodes(json1);
    var graphdata = rfInstance!.toObject();
    console.log(graphdata);
    var lol= {
      "flowUI": JSON.stringify(graphdata),
  }
  await fetch('http://localhost:9000/v1/templates/101',{
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body:  JSON.stringify(initialNodes),
    })
    
    setNodes(json2);
    var graphdata = rfInstance!.toObject();
    console.log(graphdata);
    var lol= {
      "flowUI": JSON.stringify(graphdata),
  }
  await fetch('http://localhost:9000/v1/templates/102',{
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body:  JSON.stringify(lol),
    })
    

  setNodes(json3);
  var graphdata = rfInstance!.toObject();
  console.log(graphdata);
  var lol= {
    "flowUI": JSON.stringify(graphdata),
}

    // await fetch('http://localhost:9000/v1/templates/103',{
    //   method: 'PUT',
    //   mode: 'cors',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body:  JSON.stringify(lol),
    // })
    

    
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
    <div className="Store Mock Data"
    style={{
      height: "70vh",
      width: "10vw",
      border: "1px solid black",
      marginRight: "2vw",
      marginLeft: "2vw"
    }}
    >
        <h1>Store Mock Data</h1>
        <button onClick={(e)=>{SaveMockData()}}>Store Template JSON's</button>
    </div>
      
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





