import * as T from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
export function geometry(o){const p=o.params;
 if(['casebase','caselid','caseseam'].includes(o.kind)){
  const [w,h,d]=p.size,r=p.radius,profiles=[];
  for(let i=0;i<=16;i++){const a=i/16*Math.PI/2;profiles.push({y:-h/2+r*(1-Math.cos(a)),inset:r*(1-Math.sin(a))});}profiles.push({y:h/2,inset:0});
  if(o.kind==='caselid')for(const ring of profiles)ring.y=-ring.y;
  if(o.kind==='caseseam')profiles.splice(0,profiles.length,{y:-h/2,inset:0},{y:h/2,inset:0});
  profiles.sort((a,b)=>a.y-b.y);
  const coords=ring=>{const ww=w-2*ring.inset,dd=d-2*ring.inset,c=Math.max(.05,Math.min(r-ring.inset,ww/2-.05,dd/2-.05)),points=[];for(let corner=0;corner<4;corner++){const center=[[ww/2-c,dd/2-c],[-ww/2+c,dd/2-c],[-ww/2+c,-dd/2+c],[ww/2-c,-dd/2+c]][corner];for(let j=0;j<=16;j++){const a=corner*Math.PI/2+j/16*Math.PI/2;points.push([center[0]+Math.cos(a)*c,center[1]+Math.sin(a)*c]);}}return points;};
  const verts=[],uv=[],indices=[],N=68;
  profiles.forEach((ring,i)=>{coords(ring).forEach(([x,z],j)=>{verts.push(x,ring.y,z);uv.push(j/N,i/(profiles.length-1));if(i<profiles.length-1){const k=i*N+j,n=i*N+(j+1)%N;indices.push(k,k+N,n,k+N,n+N,n);}});});
  for(const [ri,flip]of[[0,false],[profiles.length-1,true]]){const cap=coords(profiles[ri]),offset=verts.length/3;for(const [x,z]of cap){verts.push(x,profiles[ri].y,z);uv.push(x/w+.5,z/d+.5);}const pts=cap.map(([x,z])=>new T.Vector2(x,z)),tri=T.ShapeUtils.triangulateShape(pts,[]);for(const t of tri)indices.push(...(flip?[...t].reverse():t).map(i=>i+offset));}
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(verts,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();return g;
 }
 if(o.kind==='rounded')return new RoundedBoxGeometry(...p.size,6,p.radius);
 if(o.kind==='box')return new T.BoxGeometry(...p.size);
 if(o.kind==='sphere'){const g=new T.SphereGeometry(.5,40,28);g.scale(...p.size);return g;}
 if(o.kind==='cylinder')return new T.CylinderGeometry(p.radius,p.radius,p.height,64);
 if(o.kind==='torus')return new T.TorusGeometry(p.radius,p.tube,16,80);
 if(o.kind==='plane')return new T.PlaneGeometry(p.width,p.height);
 if(o.kind==='cup'){const r=p.radius,h=p.height;return new T.LatheGeometry([new T.Vector2(0,-h/2),new T.Vector2(r,-h/2),new T.Vector2(r,h/2),new T.Vector2(r-2,h/2),new T.Vector2(r-2,-h/2+3),new T.Vector2(0,-h/2+3)],64);}
 if(o.kind==='spiral'){const pts=[];for(let i=0;i<=100;i++){const t=i/100,a=t*Math.PI*3.7;const r=p.radius*(.15+.85*t);pts.push(new T.Vector3(Math.cos(a)*r,Math.sin(a)*r,0));}return new T.TubeGeometry(new T.CatmullRomCurve3(pts),100,p.tube,10,false);}
 if(o.kind==='earbud'){
  const mirror=p.mirror||1,curve=new T.CatmullRomCurve3([[-4,29,0],[-7,23,0],[-6,15,0],[-2,8,0],[5,3,0]].map(a=>new T.Vector3(a[0]*mirror,a[1],a[2]))),frames=curve.computeFrenetFrames(72,false),vertices=[],normals=[],uv=[],idx=[];
  for(let i=0;i<=72;i++){const t=i/72,c=curve.getPointAt(t),rad=Math.max(.025,Math.pow(Math.sin(Math.PI*t),.43)*(7.5-3.3*t));for(let j=0;j<=24;j++){const a=j/24*Math.PI*2,n=frames.normals[i].clone().multiplyScalar(Math.cos(a)).addScaledVector(frames.binormals[i],Math.sin(a)*.78).normalize(),v=c.clone().addScaledVector(n,rad);vertices.push(v.x,v.y,v.z);normals.push(n.x,n.y,n.z);uv.push(j/24,t);if(i<72&&j<24){const k=i*25+j;idx.push(k,k+1,k+25,k+25,k+1,k+26);}}}
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(vertices,3));g.setAttribute('normal',new T.Float32BufferAttribute(normals,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();return g;
 }throw Error(`Unknown geometry: ${o.kind}`);
}
export async function buildPart(o,assets){let object;
 if(o.kind==='imported'){const b=await (await fetch(o.glb)).arrayBuffer();object=(await new GLTFLoader().parseAsync(b,'')).scene;object.scale.setScalar(1000);const wrapper=new T.Group();wrapper.add(object);object=wrapper;}else object=new T.Mesh(geometry(o),new T.MeshStandardMaterial());
 let texture=null;if(o.texture){const a=assets[o.texture.assetId];if(!a)throw Error('Texture asset is missing.');texture=await new T.TextureLoader().loadAsync(a.dataUrl);texture.colorSpace=T.SRGBColorSpace;texture.wrapS=texture.wrapT=T.RepeatWrapping;texture.repeat.fromArray(o.texture.repeat||[1,1]);texture.offset.fromArray(o.texture.offset||[0,0]);}
 object.traverse(n=>{if(n.isMesh){n.castShadow=true;n.receiveShadow=true;if(o.kind!=='imported'||o.materialOverride){n.material=new T.MeshStandardMaterial({...o.material,transparent:o.material.opacity<1,side:o.kind==='plane'?T.DoubleSide:T.FrontSide,map:texture});}else{n.material=Array.isArray(n.material)?n.material.map(m=>m.clone()):n.material.clone();}}});
 object.position.fromArray(o.position);object.rotation.set(...o.rotation);object.scale.fromArray(o.scale);object.visible=o.visible!==false;object.name=o.name;object.userData.partId=o.id;object.updateMatrixWorld(true);return object;
}
export async function buildModel(project){const root=new T.Group();root.name=project.name;for(const o of project.parts)root.add(await buildPart(o,project.assets));root.updateMatrixWorld(true);return root;}
export function bounds(root){root.updateMatrixWorld(true);const b=new T.Box3();root.traverseVisible(o=>{if(o.isMesh){o.geometry.computeBoundingBox();b.union(o.geometry.boundingBox.clone().applyMatrix4(o.matrixWorld));}});if(b.isEmpty())throw Error('The model has no visible geometry.');const s=b.getSize(new T.Vector3()),c=b.getCenter(new T.Vector3());return {box:b,size:s.toArray(),center:c.toArray()};}
