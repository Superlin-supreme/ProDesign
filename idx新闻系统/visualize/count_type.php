
<?php

//清点当前照片数目

header("Content-Type: text/plain;charset=utf-8"); 

// $dx = 22;
$dx = $_POST["dx"];
// $dir1 = iconv('UTF-8', 'GB2312', 'usr/tomcat/webapps/huaxiang/charts/data/news2/'.$dx);
$dir1 = iconv('UTF-8', 'GB2312', 'news2/'.$dx);
// $dir='news2/'.$POST["dx"];
$handle=opendir($dir1);  
$type = array();
$typeNum = 0;  
while(false!==($file=readdir($handle))){
    $file = iconv("GB2312", "UTF-8", $file);
    if($file!='.' && $file!='..'){    	 
        // echo "filename: $file <br>"; 
        array_push($type, $file);
        $typeNum++;  
    }  
}  
closedir($handle);  
// echo '{"success":true,"msg":"' . $typeNum . '"}'.'<br>'; 
// echo "<pre>";
// print_r($type);
// echo "</pre>";
// echo '{"success":true, "typeNum":"' . $typeNum . '", "type":'.json_encode($type).'}';
// echo '<br>'; 


//输出变量名函数  
function get_variable_name(&$var, $scope = NULL) {
    if (NULL == $scope) {
        $scope = $GLOBALS;
    }

    $tmp = $var;
    $var = "tmp_exists_" . mt_rand();
    $name = array_search($var, $scope, TRUE);
    $var = $tmp;
    return $name;
}


// $dir2 = 'coal';
// ${"$dir2"."Num"} = 2;
// echo get_variable_name(${"$dir2"."Num"}).' : '.${"$dir2"."Num"};

$addd = '';
$tNum = $typeNum;
foreach ($type as $dir2) {
	${"$dir2"."Num"} = 0;
	// $dir2 = iconv('UTF-8', 'GB2312', 'news2/1/'.$dir2);
	// $handle = opendir(iconv('UTF-8', 'GB2312', 'usr/tomcat/webapps/huaxiang/charts/data/news2/'. $dx .'/'.$dir2));  
	$handle = opendir(iconv('UTF-8', 'GB2312', 'news2/'. $dx .'/'.$dir2));  
	${"$dir2"} = array();
	// echo get_variable_name(${"$dir2"}).' : '.'<br>'; ;
	while(false!==($file=readdir($handle))){
		$file = iconv("GB2312", "UTF-8", $file);
		if($file!='.' && $file!='..' && $file!='keys' ){    	 
			// echo "filename: $file <br>"; 
			array_push(${"$dir2"}, $file);
			${"$dir2"."Num"} ++;  
		}  
	}  
	closedir($handle);  	
	// echo get_variable_name(${"$dir2"."Num"}).' : '.${"$dir2"."Num"}.'<br>';	
	// echo get_variable_name(${"$dir2"}).'[] : ';
	// echo "<pre>";
	// print_r(${"$dir2"});
	// echo "</pre>";
	// echo '<br>'; 
	if($tNum == 1){
		$addd = $addd . '"' . get_variable_name(${"$dir2"."Num"}) . '":' . ${"$dir2"."Num"} . ', "'.$dir2.'":' . json_encode(${"$dir2"}) ;
	}else{
		$addd = $addd . '"' . get_variable_name(${"$dir2"."Num"}) . '":' . ${"$dir2"."Num"} . ', "'.$dir2.'":' . json_encode(${"$dir2"}) .',';		
	}
	$tNum--;

}

echo '{"success":true, "typeNum":' . $typeNum . ', "type":'.json_encode($type).', '. $addd .'}';

?>
