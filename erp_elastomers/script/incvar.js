var loginUserName	=	"<?php echo $_SESSION['userdetails']['userName']; ?>";
var loginFirstName	=	"<?php echo $_SESSION['userdetails']['fullName']; ?>";
var isRewrite		=	<?php echo ($_SESSION['app']['iso_is_rewrite'] == 1)?'true':'false'; ?>;
var isPageSrc		=	<?php echo ($_SESSION['app']['iso_is_rewrite'] == 1)?'true':'false'; ?>;
var baseURL		=	"<?php echo $_SESSION['app']['iso_base_url']; ?>";
var scriptPath		=	baseURL + '_bin/';
var imagePath		=	baseURL + 'images/';
var XSLPath		=	baseURL + '_bin/';
var actionFile		=	scriptPath + ".action";
var XSLFile		=	XSLPath + ".design";
//alert(2 + ', ' + baseURL);