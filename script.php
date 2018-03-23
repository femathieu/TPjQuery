<?php
session_start();
if(!isset($_SESSION['currentFolder'])){
    $_SESSION['currentFolder'] = getcwd();
}

$_SESSION['commandes'] = array();

if(isset($_POST['commande']) && $_POST['commande'] != ''){
    foreach($_POST['commande'] as $commande){
        $_SESSION['commandes'][] = $commande;
    }
    header("HTTP1/1 200");
    echo json_encode(array("key" => $_SESSION['commandes'], 'current' => getcwd()));
}

if(isset($_GET['logout']) && $_GET['logout'] == 'true'){
    session_unset();
    session_destroy();
    header("HTTP1/1 200");
    echo json_encode(array("key" => 'test'));
}

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
    // if($_POST['path'] == '../'){
    //     $items = explode('\\',$_SESSION['currentFolder'].'/'.$_POST['path']);
    //     foreach($items as $item){
    //         if($item != 'TPjQuery'){
                
    //         }
    //     }
    // }
    if($_POST['path'] == ''){
        $directory = $_SESSION['currentFolder'];
        $cd = true;
    }

    if($_POST['path'] != ''){
        if(is_dir($_SESSION['currentFolder'].'/'.$_POST['path'])){
            $directory = $_SESSION['currentFolder'] = getcwd().'/'.$_POST['path'];
            $cd = true;
        }else{
            $directory = '';
            $cd = false;
        }
    }
    header("HTTP1/1 200");
    echo json_encode(array("cd" => $cd, "key" => $_SESSION['currentFolder']/*, 'back' => $items*/));
}

if(isset($_POST['ls']) && $_POST['ls'] == "true"){
    header("HTTP1/1 200");
    $files['files'] = scandir($_SESSION['currentFolder']);
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
    if(!is_dir($_SESSION['currentFolder'].'/'.$_POST['foldername'])){
        $add = true;
        mkdir($_SESSION['currentFolder'].'/'.$_POST['foldername'], 0700, true);
    }else{
        $add = false;
    }
    echo json_encode(array("key" => $add));
}

if(isset($_POST['rmdir']) && $_POST['rmdir'] == 'true'){
    header("HTTP1/1 200");
    if(is_dir($_SESSION['currentFolder'].'/'.$_POST['path'])){
        rmdir($_SESSION['currentFolder'].'/'.$_POST['path']);
        $delete = true;
    }else{
        $delete = false;
    }
    echo json_encode(array("key" => $delete));
}

if(isset($_POST['vi']) && $_POST['vi'] == 'true'){
    header("HTTP1/1 200");
    echo json_encode(array("key" => file_get_contents($_SESSION['currentFolder'].'/'.$_POST['file'])));
}

if(isset($_POST['history']) && $_POST['history'] == true){
    header("HTTP1/1 200");
    echo json_encode(array("key" => $_SESSION['commandes']));
}

if(isset($_POST['reset']) && $_POST['reset'] == true){
    $_SESSION['commandes'] = array();
    header("hTTP1/1 200");
    echo json_encode(array("key" => "nice"));
}