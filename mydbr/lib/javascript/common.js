(function($){$.fn.parentRelative=function(){var ppos,pos={},$obj;pos.left=0;pos.top=0;$obj=$(this);while($obj.offsetParent()[0].tagName!=="BODY"&&$obj.offsetParent()[0].tagName!=="HTML"){ppos=$obj.offsetParent().position();pos.left+=ppos.left;pos.top+=ppos.top;$obj=$obj.offsetParent()}return pos}})(jQuery);function makeEvent(element,callback,param,event){function local(){return callback(param)}if(element.addEventListener){element.addEventListener(event,local,false)}else if(element.attachEvent){element.attachEvent("on"+event,local)}}function appbar(d){if(d==0){window.location="logout.php"}else{if(d==1){document.forms["menubarform"].app.value="passwd"}else{document.forms["menubarform"].app.value="admin0"}document.forms["menubarform"].submit()}}String.prototype.unescapeHtml=function(){var temp,result;temp=document.createElement("div");temp.innerHTML=this;result=temp.childNodes[0].nodeValue;temp.removeChild(temp.firstChild);return result};function getTableCell(marker,colNum){var tdValue=marker.parentNode.parentNode.cells[colNum].innerHTML;if(tdValue.length==0){return""}return tdValue.unescapeHtml()}function datepicker(el){$(el).datepicker({showButtonPanel:true,altFormat:"yy-mm-dd"})}function search_table(phrase,id){var words=phrase.value.toLowerCase().split(" "),table,elem,r,i,displayStyle,width;if(table===null){table=$(phrase).closest("table")}else{table=document.getElementById(id)}width=$(table).width();for(r=1;r<table.rows.length;r++){if(table.rows[r].cells[0].nodeName.toLowerCase()!="th"){elem=$(table.rows[r]).find("td").clone().children(".drillmenuitems").remove().end().text();displayStyle="none";for(i=0;i<words.length;i++){if(elem.toLowerCase().indexOf(words[i])>=0)displayStyle="";else{displayStyle="none";break}}table.rows[r].style.display=displayStyle}}$(table).width(width);mydbr_table_changed($(table).attr("id"),"search")}function htmlspecialchars_decode(string,quote_style){var optTemp=0,i=0,noquotes=false,OPTS;if(typeof quote_style==="undefined"){quote_style=2}string=string.toString().replace(/&lt;/g,"<").replace(/&gt;/g,">");OPTS={ENT_NOQUOTES:0,ENT_HTML_QUOTE_SINGLE:1,ENT_HTML_QUOTE_DOUBLE:2,ENT_COMPAT:2,ENT_QUOTES:3,ENT_IGNORE:4};if(quote_style===0){noquotes=true}if(typeof quote_style!=="number"){quote_style=[].concat(quote_style);for(i=0;i<quote_style.length;i++){if(OPTS[quote_style[i]]===0){noquotes=true}else if(OPTS[quote_style[i]]){optTemp=optTemp|OPTS[quote_style[i]]}}quote_style=optTemp}if(quote_style&OPTS.ENT_HTML_QUOTE_SINGLE){string=string.replace(/&#0*39;/g,"'")}if(!noquotes){string=string.replace(/&quot;/g,'"')}string=string.replace(/&amp;/g,"&");return string}function sprintf(){var regex,a,pad,justify,formatBaseX,formatString,doFormat,i,format;regex=/%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuidfegEG])/g;a=arguments;i=0;format=a[i++];pad=function(str,len,chr,leftJustify){if(!chr){chr=" "}var padding=str.length>=len?"":Array(1+len-str.length>>>0).join(chr);return leftJustify?str+padding:padding+str};justify=function(value,prefix,leftJustify,minWidth,zeroPad,customPadChar){var diff=minWidth-value.length;if(diff>0){if(leftJustify||!zeroPad){value=pad(value,minWidth,customPadChar,leftJustify)}else{value=value.slice(0,prefix.length)+pad("",diff,"0",true)+value.slice(prefix.length)}}return value};formatBaseX=function(value,base,prefix,leftJustify,minWidth,precision,zeroPad){var number=value>>>0;prefix=prefix&&number&&{2:"0b",8:"0",16:"0x"}[base]||"";value=prefix+pad(number.toString(base),precision||0,"0",false);return justify(value,prefix,leftJustify,minWidth,zeroPad)};formatString=function(value,leftJustify,minWidth,precision,zeroPad,customPadChar){if(precision!=null){value=value.slice(0,precision)}return justify(value,"",leftJustify,minWidth,zeroPad,customPadChar)};doFormat=function(substring,valueIndex,flags,minWidth,_,precision,type){var j,number,prefix,method,textTransform,value,leftJustify=false,positivePrefix="",zeroPad=false,prefixBaseX=false,customPadChar=" ",flagsl;if(substring=="%%"){return"%"}flagsl=flags.length;for(j=0;flags&&j<flagsl;j++){switch(flags.charAt(j)){case" ":positivePrefix=" ";break;case"+":positivePrefix="+";break;case"-":leftJustify=true;break;case"'":customPadChar=flags.charAt(j+1);break;case"0":zeroPad=true;break;case"#":prefixBaseX=true;break}}if(!minWidth){minWidth=0}else if(minWidth=="*"){minWidth=+a[i++]}else if(minWidth.charAt(0)=="*"){minWidth=+a[minWidth.slice(1,-1)]}else{minWidth=+minWidth}if(minWidth<0){minWidth=-minWidth;leftJustify=true}if(!isFinite(minWidth)){throw new Error("sprintf: (minimum-)width must be finite")}if(!precision){precision="fFeE".indexOf(type)>-1?6:type=="d"?0:undefined}else if(precision=="*"){precision=+a[i++]}else if(precision.charAt(0)=="*"){precision=+a[precision.slice(1,-1)]}else{precision=+precision}value=valueIndex?a[valueIndex.slice(0,-1)]:a[i++];switch(type){case"s":return formatString(String(value),leftJustify,minWidth,precision,zeroPad,customPadChar);case"c":return formatString(String.fromCharCode(+value),leftJustify,minWidth,precision,zeroPad);case"b":return formatBaseX(value,2,prefixBaseX,leftJustify,minWidth,precision,zeroPad);case"o":return formatBaseX(value,8,prefixBaseX,leftJustify,minWidth,precision,zeroPad);case"x":return formatBaseX(value,16,prefixBaseX,leftJustify,minWidth,precision,zeroPad);case"X":return formatBaseX(value,16,prefixBaseX,leftJustify,minWidth,precision,zeroPad).toUpperCase();case"u":return formatBaseX(value,10,prefixBaseX,leftJustify,minWidth,precision,zeroPad);case"i":case"d":number=parseInt(+value,10);prefix=number<0?"-":positivePrefix;value=prefix+pad(String(Math.abs(number)),precision,"0",false);return justify(value,prefix,leftJustify,minWidth,zeroPad);case"e":case"E":case"f":case"F":case"g":case"G":number=+value;prefix=number<0?"-":positivePrefix;method=["toExponential","toFixed","toPrecision"]["efg".indexOf(type.toLowerCase())];textTransform=["toString","toUpperCase"]["eEfFgG".indexOf(type)%2];value=prefix+Math.abs(number)[method](precision);return justify(value,prefix,leftJustify,minWidth,zeroPad)[textTransform]();default:return substring}};return format.replace(regex,doFormat)}function number_format(number,decimals,dec_point,thousands_sep){if(typeof number=="undefined"){return""}number=(number+"").replace(",","").replace(" ","");var n=!isFinite(+number)?0:+number,prec=!isFinite(+decimals)?0:Math.abs(decimals),sep=typeof thousands_sep==="undefined"?",":thousands_sep,dec=typeof dec_point==="undefined"?".":dec_point,s="",toFixedFix=function(n,prec){var k=Math.pow(10,prec);return""+Math.round(n*k)/k};s=(prec?toFixedFix(n,prec):""+Math.round(n)).split(".");if(s[0].length>3){s[0]=s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,sep)}if((s[1]||"").length<prec){s[1]=s[1]||"";s[1]+=new Array(prec-s[1].length+1).join("0")}return s.join(dec)}function parse_num_attr(href){var src=href.substr(href.indexOf("?")+1),attr,attrs=src.split("&"),str="{",i;for(i=0;i<attrs.length;i++){attr=attrs[i].split("=");if(i>0){str+=","}str+=attr[0]+":"+attr[1]}str+="}";return eval("("+str+")")}function is_touch_device(device){var touch=Modernizr.touch;if(device===undefined){return touch&&($("html").hasClass("mobile")||$("html").hasClass("tablet"))}if(device=="mobile"){return touch&&$("html").hasClass("mobile")}return touch&&$("html").hasClass("tablet")}function init_scale_image(obj){var e,commas;e=obj?obj:"";$(e+" div.scale_image").each(function(s){var map_areas,i;if($(this).css("position")!="absolute"){$(this).css("left",$(this).position().left+"px");$(this).css("position","absolute");$(this).css("top",$(this).position().top-25+"px");map_areas=$($(this).next()[0].useMap).first().children();for(i=0;i<map_areas.length;i++){$.data(map_areas[i],"coords",map_areas[i].coords)}}$(this).slider({value:100,min:10,max:100,slide:function(ev,ui){var linkpicsize,pic=$(this).next()[0],floorSize,ceilingSize,v=ui.value/100;if(pic.style.height!="auto"){$.data(this,"width",$(pic).width());$.data(this,"left",$(pic).position().left)}linkpicsize=$.data(this,"width");floorSize=0;ceilingSize=1;v=floorSize+v*(ceilingSize-floorSize);pic.style.width=v*linkpicsize+"px";pic.style.height="auto";$(pic).position().left=$.data(this,"left")},change:function(ev,ui){var c,coords,spaces,i,s,map_areas=$($(this).next()[0].useMap).first().children();for(i=0;i<map_areas.length;i++){coords="";spaces=$.data(map_areas[i],"coords").split(" ");for(s=0;s<spaces.length;s++){commas=spaces[s].split(",");for(c=0;c<commas.length;c++){commas[c]=Math.round(commas[c]*ui.value/100);coords+=commas[c];if(c+1!=commas.length){coords+=","}}if(s+1!=spaces.length){coords+=" "}}map_areas[i].coords=coords}}})})}$.fn.serializeObject=function(){var o={},a=this.serializeArray();$.each(a,function(){if(o[this.name]){if(!o[this.name].push){o[this.name]=[o[this.name]]}o[this.name].push(this.value||"")}else{o[this.name]=this.value||""}});return o};function getUrlVars(){var i,vars=[],hash,hashes=window.location.href.slice(window.location.href.indexOf("?")+1).split("&");for(i=0;i<hashes.length;i++){hash=hashes[i].split("=");vars.push(hash[0]);vars[hash[0]]=hash[1]}return vars}function getURLParameter(name){return decodeURI((RegExp(name+"="+"(.+?)(&|$)").exec(location.search)||[,null])[1])}function getUrlPath(){var l=window.location;return l.protocol+"//"+l.host+l.pathname}function array_identical(a,b){var i=a.length;if(i!=b.length)return false;while(i--){if(a[i]!==b[i])return false}return true}(function($){var a=$(window);$.fn.viewportOffset=function(){var b=$(this).offset();return{left:b.left-a.scrollLeft(),top:b.top-a.scrollTop()}}})(jQuery);function resize_codemirror(keep_current,space_below){var height;if(typeof space_below==="undefined"){space_below=120}if(!editor.space_below){editor.space_below=space_below}height=$(window).height()-$(".CodeMirror").offset().top-editor.space_below;editor.setSize("100%",height+"px")}function unicodeToChar(text){return text.replace(/\\u[\dABCDEFabcdef][\dABCDEFabcdef][\dABCDEFabcdef][\dABCDEFabcdef]/g,function(match){return String.fromCharCode(parseInt(match.replace(/\\u/g,""),16))})}jQuery.uaMatch=function(ua){ua=ua.toLowerCase();var match=/(edge)[ \/]([\w.]+)/.exec(ua)||/(chrome)[ \/]([\w.]+)/.exec(ua)||/(webkit)[ \/]([\w.]+)/.exec(ua)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)||/(msie) ([\w.]+)/.exec(ua)||ua.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)||[];return{browser:match[1]||"",version:match[2]||"0"}};if(!jQuery.browser){matched=jQuery.uaMatch(navigator.userAgent);browser={};if(matched.browser){browser[matched.browser]=true;browser.version=matched.version}if(browser.chrome){browser.webkit=true}else if(browser.webkit){browser.safari=true}if(/Edge\/12./i.test(navigator.userAgent)){browser.edge=true;delete browser.chrome;delete browser.webkit}jQuery.browser=browser}function Countdown(options){var timer,instance=this,seconds=options.seconds||10,updateStatus=options.onUpdateStatus||function(){},counterEnd=options.onCounterEnd||function(){},display_obj=options.display_obj||"refresh_counter",status="go";function decrementCounter(){if(status=="go"){seconds--;updateStatus(seconds);if(seconds<=0){instance.stop();counterEnd()}}}this.start=function(){clearInterval(timer);timer=0;timer=setInterval(decrementCounter,1e3)};this.stop=function(){clearInterval(timer)};this.toggle=function(){$("."+display_obj).toggleClass("paused");if(status=="go"){status="pause"}else{seconds=parseInt($("."+display_obj).text(),10);status="go"}}}function isIE(){return navigator.userAgent.indexOf("MSIE")!==-1||navigator.appVersion.indexOf("Trident/")>0}function csrf_token_get(){return $("#csrf_token").val()}function mydbr_table_changed(id,action){if($("#"+id).hasClass("lockcolumns")){$("#"+id).lockcolumns()}if(typeof $.tablesorter!="undefined"&&typeof $.tablesorter.table_actions!=="undefined"){for(var i=0;i<$.tablesorter.table_actions.length;i++){if($.tablesorter.table_actions[i].id===id&&($.tablesorter.table_actions[i].action===action||$.tablesorter.table_actions[i].action=="*")){$.tablesorter.table_actions[i].f(id)}}}}function gup(url,param){var regexS,regex,results;param=param.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");regexS="[\\?&]"+param+"=([^&#]*)";regex=new RegExp(regexS);results=regex.exec(url);if(results==null)return"";else return results[1]}jQuery.extend({getQueryParameters:function(str){return(str||document.location.search).replace(/(^\?)/,"").split("&").map(function(n){return n=n.split("="),this[n[0]]=n[1],this}.bind({}))[0]}});var Cell_data={get_moment_format:function(datatype){var s;s=mydbr_sorting.dateformat;if(datatype=="date"){s=mydbr_sorting.dateformat.substring(0,mydbr_sorting.dateformat.indexOf(" "))}if(datatype=="time"){s=mydbr_sorting.dateformat.substring(mydbr_sorting.dateformat.indexOf(" ")+1)}return s.replace("m","MM").replace("d","DD").replace("d","DD").replace("Y","YYYY").replace("i","mm").replace("s","ss")},get_formatted:function(s,datatype){switch(datatype){case"date":case"datetime":if(typeof s=="number"||typeof s=="string"){return moment(s).format(Cell_data.get_moment_format(datatype))}break;case"time":if(typeof s=="number"){var m,h,neg="";if(s<0){neg="-";s=-1*s}h=Math.floor(s/3600);s-=h*3600;m=Math.floor(s/60);s-=m*60;m="0"+m;m=m.substr(-2);s="0"+s;s=s.substr(-2);return neg+h+":"+m+":"+s}break;case"time_hm":if(typeof s=="number"){var m="0",h,neg="";if(s<0){neg="-";s=-1*s}h=Math.floor(s/60);if(h)m=s-h*60;m="0"+m;m=m.substr(-2);return neg+h+":"+m}}return s},get_us_date_format:function(s,datatype){mfmt=mydbr_sorting.dateformat.replace("m","MM").replace("d","DD").replace("d","DD").replace("Y","YYYY").replace("i","mm").replace("s","ss");if(datatype=="date"){return moment(s,mfmt).format("YYYY-MM-DD")}else{return moment(s,mfmt).format("YYYY-MM-DDTh:mm:ss")}},escapeRegExp:function(str){return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},get_value_raw:function(s,datatype){var v,minus,mfmt,i,re,h,m,sec,t;switch(datatype){case"int":case"float":case"bit":if(typeof s=="number"||typeof s=="undefined"){return s}minus=1;v=s.replace(/[^\(0-9\.,\-\)]/g,"");if(v.substring(0,1)=="("&&v.substr(-1)==")"){v=v.substring(1);v=v.substring(0,v.length-1);minus=-1}re=new RegExp(this.escapeRegExp(mydbr_sorting.separator.thousand),"g");v=v.replace(re,"");re=new RegExp(this.escapeRegExp(mydbr_sorting.separator.decimal),"g");v=v.replace(re,".");if(datatype=="float"){return parseFloat(v)*minus}return parseInt(v,10)*minus;break;case"date":case"datetime":mfmt=mydbr_sorting.dateformat.replace("m","MM").replace("d","DD").replace("d","DD").replace("Y","YYYY").replace("i","mm").replace("s","ss");s=moment(s,mfmt).format("YYYY-MM-DDTh:mm:ss");i=parseFloat(new Date(s).getTime());return isNaN(i)?0:i;break;case"time":t=s.split(":");h=typeof t[0]=="undefined"?0:parseInt(t[0],10);m=typeof t[1]=="undefined"?0:parseInt(t[1],10);sec=typeof t[2]=="undefined"?0:parseInt(t[2],10);h=typeof h=="undefined"||isNaN(h)?0:h;m=typeof m=="undefined"||isNaN(m)?0:m;sec=typeof sec=="undefined"||isNaN(sec)?0:sec;if(h<0){h*=-1;return-1*(sec+m*60+h*3600)}return sec+m*60+h*3600;break;case"time_hm":t=s.split(":");h=typeof t[0]=="undefined"?0:parseInt(t[0],10);m=typeof t[1]=="undefined"?0:parseInt(t[1],10);h=typeof h=="undefined"||isNaN(h)?0:h;m=typeof m=="undefined"||isNaN(m)?0:m;if(h<0){h*=-1;return-1*(h*60+m)}return h*60+m;break;case"char":return s;break;default:}return s}};$.fn.filterAttrVals=function(attr,vals){var filter="["+attr+'="'+vals.split(",").join('"],['+attr+'="')+'"]';return this.filter(filter)};function strip_tags(input,allowed){allowed=(((allowed||"")+"").toLowerCase().match(/<[a-z][a-z0-9]*>/g)||[]).join("");var tags=/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;var commentsAndPhpTags=/<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;return input.replace(commentsAndPhpTags,"").replace(tags,function($0,$1){return allowed.indexOf("<"+$1.toLowerCase()+">")>-1?$0:""})}