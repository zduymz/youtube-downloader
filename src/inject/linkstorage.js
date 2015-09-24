function LinksStorage(){this.fileQuality=new Array();this.fileType=new Array();this.fileLink=new Array();this.fileName=null;this.count=0;}
LinksStorage.prototype.addInfoAll=function(q,t,l,n){this.fileQuality.push(q);this.fileType.push(t);this.fileLink.push(l);this.count+=1;}
LinksStorage.prototype.addName=function(n){this.fileName=n;}
LinksStorage.prototype.getQualityId=function(id){return this.fileQuality[id];}
LinksStorage.prototype.getTypeId=function(id){return this.fileType[id];}
LinksStorage.prototype.getLinkId=function(id){return this.fileLink[id];}
LinksStorage.prototype.getLength=function(){return this.count;}