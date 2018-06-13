var mixedMode={name:"htmlmixed",scriptTypes:[{matches:/\/x-handlebars-template|\/x-mustache/i,mode:null},{matches:/(text|application)\/(x-)?vb(a|script)/i,mode:"vbscript"}]};$(document).ready(function(){window.editor=CodeMirror.fromTextArea(document.getElementById("cssfile"),{mode:"css",selectionPointer:true,styleActiveLine:true,autoCloseBrackets:true,matchBrackets:true,indentWithTabs:!editor_prefs.indent_with_space,smartIndent:false,lineNumbers:true,matchBrackets:true,autofocus:true,indentUnit:2,keyMap:editor_prefs.keymap,gutters:["CodeMirror-linenumbers","CodeMirror-foldgutter"],fold:"indent",foldGutter:{rangeFinder:new CodeMirror.fold.combine(CodeMirror.fold.indent,CodeMirror.fold.comment)},extraKeys:{"Ctrl-Space":"autocomplete","Shift-Tab":"indentLess","Ctrl-Q":function(cm){cm.foldCode(cm.getCursor())},Tab:"indentMore",Esc:function(cm){if(cm.getOption("fullScreen"))cm.setOption("fullScreen",false)},"Ctrl-S":savefile,"Cmd-S":savefile,"Ctrl-F":editor_search_find,"Cmd-F":editor_search_find,"Cmd-Alt-G":editor_gotoline,"Ctrl-Alt-G":editor_gotoline,"Ctrl-Alt-F":editor_search_find,"Cmd-Alt-F":editor_search_find},theme:editor_prefs.theme});window.buffers={};$(document).on("click","li.directory",function(){return false});$(document).on("click","li.file, li.file_remote",function(){var type,file,filename_full,ext,remote;file=$(this).find("span:first").text();filename_full=$(this).attr("data-filename");ext=$(this).attr("data-ext");remote=$(this).hasClass("file_remote")?1:0;type="";if($.inArray(ext,["png","svg","jpg","jpeg","gif"])>=0){type="image"}if($.inArray(ext,["css","php","js","xml","sql","html","txt"])>=0){type="file";if(ext=="txt"){ext="text/plain"}}if(type==""){type="file";ext="text/plain"}$.ajax({url:"apps_v/fileedit_get.php",type:"get",data:{file:filename_full,remote:remote},success:function(data){var x,y,mode,b;if(type=="image"){b='<div class="area_toolbar" id="toolbar_1"><div>';b+=editor_add_button("delete_image",mydbr_loc.MYDBR_SQLEDIT_DELETE_FILE,filename_full);b+="</div></div>";$("#image").text("").prepend(b+'<img alt="preview" src="'+filename_full+'">');select_editor_area("image");setTimeout(function(){x=$("#image>img")[0].naturalWidth;y=$("#image>img")[0].naturalHeight;if(x>0&&y>0){$("#image_preview > .size").html('<input size="80" value="<img src=&quot;'+filename_full+"&quot height=&quot;"+y+"&quot; width=&quot;"+x+'&quot; alt=&quot;&quot;>">')}else{$("#image_preview > .size").text("")}},100)}else{select_editor_area("editor");$("#editor").css("display","block");mode=ext;if(mode=="html"){mode=mixedMode}editor_tab_new(file,data,filename_full);editor.setOption("mode",mode)}if(remote==1){$("#file_edit_remote_help").dialog()}}});return false});resize_codemirror(0,110);var resize_on=true;$(window).resize(function(){if(resize_on){resize_codemirror(1,110)}});$(document).on("click","#save",savefile);$(document).on("click","#search",function(e){editor_search_find()});$(document).on("click","#word_wrap",function(){window.editor.setOption("lineWrapping",!window.editor.getOption("lineWrapping"))});$(document).on("click","#fullscreen",function(){window.editor.setOption("fullScreen",!window.editor.getOption("fullScreen"))});$(document).on("click","#delete_file",function(){editor_delete_file(this)});$(document).on("click","#new_document",function(){editor_new_document()});$(document).on("click","#new_directory",function(){editor_new_directory()});$(document).on("click","#a_delete_directory",function(){editor_rm_directory()});$(document).on("click","#delete_image",function(){editor_delete_image(this)});$(".dir_tree").find("ul").hide();$(document).on("click","li.directory",function(){var li=this,li_click=this,is_closed;is_closed=$(li).hasClass("opened");$(this).find("ul:first").slideToggle(300,function(){$(li_click).toggleClass("opened")});if(is_closed){li=$(li).parent().closest(".directory");if(li.length==0){li=null}}file_upload_dir_set(li?$(li).attr("data-filename"):"user");select_editor_area("folder");return false});$(document).on("click","#tab_browsing_list div.tab",function(){editor_tab_select($(this).closest("li"))});$(document).on("click","#tab_browsing_list div.close",function(){editor_tab_close($(this).closest("li"));if($("#tab_browsing_list").children().length==0){select_editor_area("folder");file_upload_dir_set("user")}});select_editor_area("folder");file_upload_dir_set("user");Dropzone.options.dropzone={init:function(){this.on("success",function(file,responseText){this.removeAllFiles();var msg=JSON.parse(responseText);show_message(msg);if(msg.tree){directory_tree_refesh(msg.tree);$('.file[data-filename="'+msg.filename+'"]').click()}})}}});function editor_delete_image(btn){editor_delete_file_gen($(btn).attr("data-filename"))}function editor_new_directory(){var name;name=prompt(mydbr_loc.MYDBR_SQLEDIT_DIRECTORYNAME);if(name){$.ajax({url:"apps_v/fileedit_v.php",type:"post",data:{action:"new_directory",name:$("#upload_path").val()+"/"+name,csrf_token:csrf_token_get()},success:function(data){var msg=JSON.parse(data);show_message(msg);if(msg.tree){directory_tree_refesh(msg.tree)}}})}}function editor_rm_directory(){var file=$("#upload_path").val();if($('.dir_tree [data-filename="'+file+'"]').attr("data-mydbr-uses")=="1"){alert(sprintf(mydbr_loc.MYDBR_SQLEDIT_USED_BY_MYDBR_DIR,file));return}if(confirm(sprintf(mydbr_loc.MYDBR_SQLEDIT_REMOVE_DIRECTORY,file))){$.ajax({url:"apps_v/fileedit_v.php",type:"post",data:{action:"delete_directory",directory:file,csrf_token:csrf_token_get()},success:function(data){var msg=JSON.parse(data);show_message(msg);if(msg.tree){directory_tree_refesh(msg.tree)}file_upload_dir_set("user")}})}}function editor_new_document(){var filename,filename_full;select_editor_area("editor");filename=prompt(mydbr_loc.MYDBR_SQLEDIT_FILENAME);if(filename){filename_full=$("#upload_path").val()+"/"+filename;editor_tab_new(filename,"",filename_full)}}function directory_tree_refesh(data){var opend=[];$(".directory.opened").each(function(){opend.push($(this).attr("data-filename"))});$("#user_directory").html(data);$(".dir_tree").find("ul").hide();$.each(opend,function(index,value){$('.directory[data-filename="'+value+'"]').addClass("opened").find("ul").css("display","block")})}function editor_delete_file(tab){editor_delete_file_gen($("#tab_browsing_list li.selected").attr("data-filename"))}function editor_delete_file_gen(file){if($('.dir_tree [data-filename="'+file+'"]').attr("data-mydbr-uses")=="1"){alert(sprintf(mydbr_loc.MYDBR_SQLEDIT_USED_BY_MYDBR_FILE,file));return}if($('.dir_tree [data-filename="'+file+'"]').length==0){editor_delete_file_finish();return}if(confirm(sprintf(mydbr_loc.MYDBR_SQLEDIT_DELETE_FILE,file))){$.ajax({url:"apps_v/fileedit_v.php",type:"post",data:{action:"delete_file",delete_file:file,csrf_token:csrf_token_get()},success:function(data){var msg=JSON.parse(data);show_message(msg);if(msg.tree){directory_tree_refesh(msg.tree)}editor_delete_file_finish()}})}}function editor_delete_file_finish(){editor_tab_close($("#tab_browsing_list li.selected"));if($("#tab_browsing_list").children().length==0||$("#image_preview").css("diplay")!="none"){select_editor_area("folder");if($("#upload_path").val()==""){file_upload_dir_set("user")}}}function editor_add_button(name,title,filename){if(typeof filename==="undefined"){filename=""}else{filename=' data-filename="'+filename+'"'}return'<a id="a_'+name+'" href="javascript:void(0)"><div id="'+name+'" class="action editor_btn"'+filename+' title="'+title+'"></div></a>'}function file_upload_dir_set(dir){var b,allow_remove=true;b='<div class="area_toolbar" id="toolbar_1"><div>';b+=editor_add_button("new_document",mydbr_loc.MYDBR_SQLEDIT_NEW_TAB);b+=editor_add_button("new_directory",mydbr_loc.MYDBR_SQLEDIT_NEW_DIRECTORY);if($('.dir_tree [data-filename="'+dir+'"]').attr("data-mydbr-uses")=="1"){allow_remove=false}if(dir!=="user"&&allow_remove){b+=editor_add_button("delete_directory",mydbr_loc.MYDBR_SQLEDIT_REMOVE_DIRECTORY)}b+="</div></div>";$("#fileupload_dir_name").text(dir).prepend(b);$("#upload_path").val(dir)}function select_editor_area(area){if(area=="editor"){$("#editor").css("display","block")}else{$("#editor").css("display","none")}if(area=="image"){$("#image_preview").css("display","block")}else{$("#image_preview").css("display","none").find("#image").html("")}if(area=="folder"){$("#fileupload").css("display","block")}else{$("#fileupload").css("display","none")}}function show_message(msg){var timeout;if(msg.ok||msg.error){timeout=900;$.blockUI.defaults.growlCSS.width="auto";$.blockUI.defaults.growlCSS.top="40px";$.blockUI.defaults.growlCSS.left="5px";$.blockUI.defaults.growlCSS.right="";$.blockUI.defaults.growlCSS.opacity=.9;$.blockUI.defaults.growlCSS.backgroundColor="#00C42E";$.blockUI.defaults.growlCSS.borderRadius="5px";if(msg.error!==null){timeout=5e3;$.blockUI.defaults.growlCSS.backgroundColor="red"}$.growlUI(null,msg.error?msg.error:msg.ok,timeout)}}function savefile(){$.ajax({url:"apps_v/fileedit_v.php",type:"post",data:{action:"save_file",content:editor.getValue(),file:$("#tab_browsing_list li.selected").attr("data-filename"),csrf_token:csrf_token_get()},success:function(data){var msg=JSON.parse(data);show_message(msg);if(msg.tree){directory_tree_refesh(msg.tree)}}})}