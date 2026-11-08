"use strict";
const $ = selector => document.querySelector(selector);
const canvas=$("#canvas"), context=canvas.getContext("2d");
let image=null, imageUrl=null, originalName="image";
function clamp(value,min,max){return Math.min(max,Math.max(min,Number(value)||min));}
function drawPreview(){
 if(!image)return;
 const maxWidth=1000,maxHeight=650,scale=Math.min(maxWidth/image.naturalWidth,maxHeight/image.naturalHeight,1);
 canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));
 context.filter = `brightness(${Number($("#brightness")?.value || 100)}%) grayscale(${Number($("#grayscale")?.value || 0)}%)`;
 context.drawImage(image,0,0,canvas.width,canvas.height);
 context.filter = "none";
 const preview=$("#preview");preview.replaceChildren();
 const img=document.createElement("img");img.src=canvas.toDataURL("image/png");img.alt="Selected image preview";img.style.maxWidth="100%";img.style.maxHeight="520px";preview.append(img);
 $("#info").textContent=image.naturalWidth+" × "+image.naturalHeight+" pixels";
 $("#width").value=image.naturalWidth;$("#height").value=image.naturalHeight;$("#export").disabled=false;
}
$("#file").addEventListener("change",event=>{
 const file=event.target.files?.[0];if(!file)return;
 if(!file.type.startsWith("image/")){ $("#info").textContent="Please choose a valid image.";return; }
 if(imageUrl)URL.revokeObjectURL(imageUrl);
 imageUrl=URL.createObjectURL(file);originalName=file.name.replace(/\.[^.]+$/,"");
 const next=new Image();
 next.onload=()=>{image=next;drawPreview();};
 next.onerror=()=>{$("#info").textContent="This image could not be opened.";};
 next.src=imageUrl;
});
$("#width").addEventListener("change",()=>{if(image){const width=clamp($("#width").value,1,6000);$("#width").value=width;$("#height").value=Math.round(width*image.naturalHeight/image.naturalWidth);}});
$("#height").addEventListener("change",()=>{if(image){const height=clamp($("#height").value,1,6000);$("#height").value=height;$("#width").value=Math.round(height*image.naturalWidth/image.naturalHeight);}});
["brightness","grayscale"].forEach(id=>$("#"+id).addEventListener("input",drawPreview));
$("#export").addEventListener("click",()=>{
 if(!image)return;
 const width=clamp($("#width").value,1,6000),height=clamp($("#height").value,1,6000),format=$("#format").value;
 const output=document.createElement("canvas");output.width=width;output.height=height;
 const ctx=output.getContext("2d");
 if(format==="image/jpeg"){ctx.fillStyle="#fff";ctx.fillRect(0,0,width,height);}
 ctx.filter = `brightness(${Number($("#brightness").value)}%) grayscale(${Number($("#grayscale").value)}%)`;
 ctx.drawImage(image,0,0,width,height);
 ctx.filter = "none";
 output.toBlob(blob=>{
  if(!blob){$("#info").textContent="Export failed. Try another format.";return;}
  const url=URL.createObjectURL(blob),link=document.createElement("a");
  link.href=url;link.download=(originalName||"sorovision")+"-export."+(format==="image/png"?"png":"jpg");
  link.click();setTimeout(()=>URL.revokeObjectURL(url),1500);
 },format,.92);
});
window.addEventListener("beforeunload",()=>{if(imageUrl)URL.revokeObjectURL(imageUrl);});