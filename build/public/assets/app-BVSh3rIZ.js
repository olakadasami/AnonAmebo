console.log("Hello World");let o=document.getElementById("copy").innerHTML,t=document.getElementById("copyBtn");const n=async()=>{try{await navigator.clipboard.writeText(o),console.log("Content copied to clipboard")}catch(e){console.error("Failed to copy: ",e)}};t.addEventListener("click",n);
