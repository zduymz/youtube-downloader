function _log(n){if(DEBUG_MODE){var o,t,e,l,a;o=new Date,t=o.getHours(),e=o.getMinutes(),l=o.getSeconds(),a=t+":"+e+":"+l,console.info("["+a+"] ytube.dl: "+n)}}
function parse_str(str,array){var strArr=String(str).replace(/^&/,'').replace(/&$/,'').split('&'),sal=strArr.length,i,j,ct,p,lastObj,obj,lastIter,undef,chr,tmp,key,value,postLeftBracketPos,keys,keysLen,fixStr=function(str){return decodeURIComponent(str.replace(/\+/g,'%20'));};if(!array){array=this.window;}
for(i=0;i<sal;i++){tmp=strArr[i].split('=');key=fixStr(tmp[0]);value=(tmp.length<2)?'':fixStr(tmp[1]);while(key.charAt(0)===' '){key=key.slice(1);}
if(key.indexOf('\x00')>-1){key=key.slice(0,key.indexOf('\x00'));}
if(key&&key.charAt(0)!=='['){keys=[];postLeftBracketPos=0;for(j=0;j<key.length;j++){if(key.charAt(j)==='['&&!postLeftBracketPos){postLeftBracketPos=j+1;}else if(key.charAt(j)===']'){if(postLeftBracketPos){if(!keys.length){keys.push(key.slice(0,postLeftBracketPos-1));}
keys.push(key.substr(postLeftBracketPos,j-postLeftBracketPos));postLeftBracketPos=0;if(key.charAt(j+1)!=='['){break;}}}}
if(!keys.length){keys=[key];}
for(j=0;j<keys[0].length;j++){chr=keys[0].charAt(j);if(chr===' '||chr==='.'||chr==='['){keys[0]=keys[0].substr(0,j)+'_'+keys[0].substr(j+1);}
if(chr==='['){break;}}
obj=array;for(j=0,keysLen=keys.length;j<keysLen;j++){key=keys[j].replace(/^['"]/,'').replace(/['"]$/,'');lastIter=j!==keys.length-1;lastObj=obj;if((key!==''&&key!==' ')||j===0){if(obj[key]===undef){obj[key]={};}
obj=obj[key];}else{ct=-1;for(p in obj){if(obj.hasOwnProperty(p)){if(+p>ct&&p.match(/^\d+$/g)){ct=+p;}}}
key=ct+1;}}
lastObj[key]=value;}}}
function urlDecode(str){return decodeURIComponent((str+'').replace(/\+/g,'%20'));}
function getVideoInfo(id,sendResponse){var gLinksStorage=new LinksStorage;var sr=sendResponse;$.ajax({url:"https://www.youtube.com/get_video_info?&video_id="+id+"&asv=3&el=detailpage&hl=en_US",type:'GET',success:function(result){var arr={};parse_str(result,arr);gLinksStorage.addName(arr.title.trim().replace(/[^\w\s]/gi,''));var resArr=arr.url_encoded_fmt_stream_map.split(",");for(var i=0;i<resArr.length;i++){var o={};parse_str(resArr[i],o);gLinksStorage.addInfoAll(o.quality,o.type.split(";")[0],urlDecode(o.url));}
sr(gLinksStorage);},error:function(xhr){_log("An error occured: "+xhr.status+" "+xhr.statusText)},complete(xhr,status){}});}
function getMp3(sendResponse){var xhr=new XMLHttpRequest();xhr.open("GET","http://www.freedsound.com/luna/download.php?id="+lid,true);xhr.onreadystatechange=function(){if(xhr.readyState==4){var resp=JSON.parse(xhr.responseText.substring(1,xhr.responseText.length-1));var xhr2=new XMLHttpRequest();xhr2.open("GET",resp.statusurl.replace('/\\/g',''),true);xhr2.onreadystatechange=function(){if(xhr2.readyState==4){try{var i=xhr2.responseXML.documentElement.querySelector('downloadurl').innerHTML;var r=i.substring(9,i.length-3);sendResponse(r);}catch(e){sendResponse('null');}}}
xhr2.send();}}
xhr.send();}
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){if(message.type=="getUrls"){lid=message.id;getVideoInfo(message.id,sendResponse);return true;}
if(message.type=="showicon"){chrome.pageAction.show(sender.tab.id);sendResponse("Youtube Downloader đã khởi động!");}
if(message.type=="mp3"){getMp3(sendResponse);return true;}});var lid='';var DEBUG_MODE=!0;