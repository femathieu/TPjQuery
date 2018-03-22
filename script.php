<?php
$currentFolder = getcwd();
if(isset($_GET['date']) && $_GET['date'] == "true"){
    $date = new DateTime('now');
    header("HTTP1/1 200");
    echo json_encode(array("key" => $date->format('d/m/Y H:i:s')));
}

if(isset($_GET['version']) && $_GET['version'] == "true"){
    header("HTTP1/1 200");
    echo json_encode(array("key" => phpversion()));
}

if(isset($_GET['free']) && $_GET['free'] == "true"){
    header("HTTP1/1 200");
    $puissance = pow(10, -9);
    echo json_encode(array("key" => disk_free_space('C:\wamp64\www\dev\jQuery\TPjQuery')*$puissance));
}

if(isset($_POST['cd']) && $_POST['cd'] == "true"){
    header("HTTP1/1 200");
    echo json_encode(array("key" => $currentFolder));
}

if(isset($_POST['ls']) && $_POST['ls'] == "true"){
    header("HTTP1/1 200");
    $files['files'] = scandir($currentFolder);
    $files['is_dir'] = array();
    $i=0;

    foreach($files['files'] as $file){
        if(is_dir($file)){
            $files['is_dir'][$i] = 'dossier';
        }else{
            $files['is_dir'][$i] = 'fichier';
        }
        $i++;
    }
    echo json_encode(array("key" => $files));
}

if(isset($_POST['mkdir']) && $_POST['mkdir'] == 'true'){
    header("HTTP1/1 200");
    echo json_encode(array("key" => mkdir($_POST['path'], true)));
}

if(isset($_POST['rmdir']) && $_POST['rmdir'] == 'true'){
    header("HTTP1/1 200");
    echo json_encode(array("key" => rmdir('C:/wamp64/www/dev/jQuery/TPjQuery/'.$_POST['path'])));
}

if(isset($_POST['vi']) && $_POST['vi'] == 'true'){
    header("HTTP1/1 200");
    echo json_encode(array("key" => file_get_contents($currentFolder.'/'.$_POST['file'])));
}