export const clone=value=>JSON.parse(JSON.stringify(value));
export const uid=()=>globalThis.crypto?.randomUUID?.()||`part-${Date.now()}-${Math.random().toString(36).slice(2)}`;
export const material=(color='#656c74',roughness=.45,metalness=.15)=>({color,roughness,metalness,opacity:1});
export function part(name,kind,params,position=[0,0,0],color='#656c74',extra={}){return {id:uid(),name,kind,params,position,rotation:[0,0,0],scale:[1,1,1],material:material(color),visible:true,...extra};}
export const templateInfo=[['earbuds','Translation earbuds','Your concept, interpreted in geometry','◉'],['bottle','Bottle','Body, cap and label','♙'],['box','Consumer package','Rounded box, lid and face','▣'],['bag','Everyday organizer','Body, handles and pocket','♧'],['mascot','Friendly mascot','Head, body, eyes and limbs','♟'],['merch','Branded mug','Cup, handle and print panel','☕'],['room','Service studio','Floor, walls, desk and display','⌂'],['sculpture','Symbolic sculpture','Pedestal and orbital forms','◎']];
export function makeTemplate(type='earbuds'){
 let parts=[];const add=(...args)=>parts.push(part(...args));
 if(type==='earbuds'){
  add('Charging case · base','casebase',{size:[70,37,31],radius:8},[-28,19,0],'#646a72');
  add('Case seam','caseseam',{size:[70,.8,31],radius:8},[-28,38,0],'#242931');
  add('Charging case · lid','caselid',{size:[70,21,31],radius:8},[-28,49,0],'#70767e');
  add('Case spiral mark','spiral',{radius:4.3,tube:.65},[-28,38.5,16.2],'#2f9cf4',{material:material('#2f9cf4',.26,.45)});
  add('Left earbud','earbud',{mirror:-1},[25,1,10],'#737981');
  add('Right earbud','earbud',{mirror:1},[51,1,0],'#737981');
  add('Left spiral mark','spiral',{radius:1.8,tube:.38},[29.7,22,14.9],'#2f9cf4',{material:material('#2f9cf4',.23,.4)});
  add('Right spiral mark','spiral',{radius:1.8,tube:.38},[46.3,22,4.9],'#2f9cf4',{material:material('#2f9cf4',.23,.4)});
 }else if(type==='bottle'){
  add('Bottle body','cylinder',{radius:18,height:65},[0,33,0],'#85b5b5');add('Shoulder','sphere',{size:[36,15,36]},[0,64,0],'#85b5b5');add('Bottle neck','cylinder',{radius:8,height:15},[0,75,0],'#85b5b5');add('Screw cap','cylinder',{radius:10,height:10},[0,86,0],'#292f39');add('Label surface','plane',{width:26,height:24},[0,36,18.1],'#f0e7da');
 }else if(type==='box'){
  add('Package body','rounded',{size:[70,45,40],radius:4},[0,23,0],'#d0b89a');add('Package lid','rounded',{size:[72,8,42],radius:3},[0,50,0],'#34485e');add('Front branding panel','plane',{width:44,height:24},[0,25,20.2],'#e8e1d6');
 }else if(type==='bag'){
  add('Organizer body','rounded',{size:[70,52,25],radius:9},[0,27,0],'#a6ac83');add('Front pocket','rounded',{size:[42,25,3],radius:3},[0,19,14],'#79825b');add('Handle','torus',{radius:16,tube:2.3},[0,59,0],'#525c3d',{scale:[1,.7,1]});add('Zip seam','rounded',{size:[57,1,24],radius:.4},[0,49,0],'#c4c7b4');
 }else if(type==='mascot'){
  add('Body','sphere',{size:[38,45,28]},[0,31,0],'#b0a2e5');add('Head','sphere',{size:[43,36,34]},[0,67,0],'#c6b9ee');add('Left eye','sphere',{size:[5,7,3]},[-8,70,16.2],'#243243');add('Right eye','sphere',{size:[5,7,3]},[8,70,16.2],'#243243');add('Left foot','rounded',{size:[17,8,21],radius:3},[-11,6,5],'#7b72a0');add('Right foot','rounded',{size:[17,8,21],radius:3},[11,6,5],'#7b72a0');add('Left arm','sphere',{size:[12,26,12]},[-22,33,0],'#b0a2e5',{rotation:[0,0,-.3]});add('Right arm','sphere',{size:[12,26,12]},[22,33,0],'#b0a2e5',{rotation:[0,0,.3]});
 }else if(type==='merch'){
  add('Mug body','cup',{radius:23,height:49},[0,25,0],'#dce3df');add('Handle','torus',{radius:16,tube:4},[24,29,0],'#dce3df',{scale:[.8,1,1]});add('Print panel','plane',{width:25,height:24},[0,28,23.1],'#569cab');
 }else if(type==='room'){
  add('Floor','box',{size:[180,3,140]},[0,0,0],'#9c8a75');add('Back wall','box',{size:[180,100,3]},[0,50,-69],'#c4ccca');add('Side wall','box',{size:[3,100,140]},[-89,50,0],'#a6b4b7');add('Desk surface','rounded',{size:[90,6,35],radius:2},[0,46,-24],'#ccb58c');add('Left desk support','box',{size:[6,44,28]},[-36,22,-24],'#34434c');add('Right desk support','box',{size:[6,44,28]},[36,22,-24],'#34434c');add('Display screen','rounded',{size:[42,27,3],radius:2},[0,64,-31],'#2e5a69');
 }else{
  add('Pedestal','cylinder',{radius:25,height:7},[0,4,0],'#bbc3c9');add('Vertical orbit','torus',{radius:28,tube:3},[0,37,0],'#7da5da',{rotation:[0,.5,0]});add('Cross orbit','torus',{radius:21,tube:2.3},[0,37,0],'#c6b589',{rotation:[1.1,.4,0]});add('Core','sphere',{size:[21,21,21]},[0,37,0],'#88a9a8');
 }
 return {schemaVersion:'1.0.0',name:type==='earbuds'?'Translation Earbuds':templateInfo.find(t=>t[0]===type)?.[1]||'New design',modelType:type,description:type==='earbuds'?'A charcoal charging case with a separate lid, blue spiral marks, and two curved translation earbuds. Simplified geometry interpreted from the supplied concept image; dimensions are approximate.':'An editable procedural design template.',units:'mm',parts,assets:{},references:[],settings:{background:'#e7e8e6',lighting:'soft',grid:true,axes:false,projection:'perspective',cameraPreset:'isometric'},hotspots:[],revision:1};
}
export function validateProject(p){
 if(!p||p.schemaVersion!=='1.0.0'||!Array.isArray(p.parts)||p.parts.length>200)throw Error('Unsupported project or more than 200 components.');
 const kinds=['casebase','caselid','caseseam','rounded','box','sphere','cylinder','torus','spiral','earbud','plane','cup','imported'];const ids=new Set();
 if(!p.assets||typeof p.assets!=='object'||!Array.isArray(p.references))throw Error('Project assets or references are missing.');
 for(const o of p.parts){if(ids.has(o.id)||typeof o.id!=='string')throw Error('Component IDs must be unique.');ids.add(o.id);if(!kinds.includes(o.kind))throw Error('Unknown geometry type.');for(const prop of ['position','rotation','scale'])if(!Array.isArray(o[prop])||o[prop].length!==3||!o[prop].every(Number.isFinite))throw Error('Invalid transform.');if(o.scale.some(n=>n<=.001||n>100))throw Error('Scale must be greater than 0.001 and at most 100.');if(!o.material||!/^#[\da-f]{6}$/i.test(o.material.color))throw Error('Invalid material color.');if(![o.material.roughness,o.material.metalness,o.material.opacity].every(n=>Number.isFinite(n)&&n>=0&&n<=1))throw Error('Material values must be between zero and one.');if(o.kind==='imported'&&(!o.glb?.startsWith('data:')||o.glb.length>40000000))throw Error('Imported model data is missing or too large.');if(o.kind!=='imported'){if(!o.params||typeof o.params!=='object')throw Error('Missing geometry settings.');for(const [key,value] of Object.entries(o.params)){if(key==='mirror'){if(![-1,1].includes(value))throw Error('Invalid mirror direction.');continue;}const vals=Array.isArray(value)?value:[value];if(!vals.every(v=>Number.isFinite(v)&&v>0&&v<=2000))throw Error('Invalid geometry dimensions.');}}if(o.texture&&!p.assets[o.texture.assetId])throw Error('Missing texture asset.');}
 for(const a of Object.values(p.assets))if(!a.dataUrl?.startsWith('data:image/')||a.dataUrl.length>20000000)throw Error('Invalid embedded image asset.');
 if(!p.settings||!/^#[\da-f]{6}$/i.test(p.settings.background)||!['soft','bright','dramatic'].includes(p.settings.lighting))throw Error('Invalid studio settings.');
 return p;
}
export class History{constructor(project){this.items=[clone(project)];this.index=0;}push(project){this.items=this.items.slice(0,this.index+1);this.items.push(clone(project));if(this.items.length>40)this.items.shift();this.index=this.items.length-1;}undo(){if(this.index===0)return null;return clone(this.items[--this.index]);}redo(){if(this.index>=this.items.length-1)return null;return clone(this.items[++this.index]);}}
