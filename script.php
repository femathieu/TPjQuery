<?php
$currentFolder = getcwd();
if (isset($_GET['version']) && $_GET['version'] == 'true'){
    header('HTTP1/1 200');

    echo json_encode (array('key' => phpversion()));
}

if (isset($_GET['free']) && $_GET['free'] == 'true'){
    header('HTTP1/1 200');
    
    $puissance = pow(10, -9);
    echo json_encode (array('key' => disk_free_space("C:\wamp64\www\cour_Jquery\TPjQuery")*$puissance));
}

if (isset($_GET['pwd']) && $_GET['pwd'] == 'true'){
    header('HTTP1/1 200');
    
    echo json_encode (array('key' => $currentFolder));
}

if (isset($_GET['ls']) && $_GET['ls'] == 'true'){
    header('HTTP1/1 200');
    $files['files'] = scandir($currentFolder);
    $files['is_dir'] = array();
    $i=0;
    foreach($files['files'] as $file){
        if(is_dir($file)){
            $files['is_dir'][$i] = 'dossier';
        } else{
            $files['is_dir'][$i] = 'fichier';
        }
        $i++;
    }
    echo json_encode (array('key' => $files ));
}

if (isset($_POST['mkdir']) && $_POST['mkdir'] == 'true'){
    header('HTTP1/1 200');
    
    $create = mkdir($_POST['nomdossier']);
    echo json_encode(array('key' => $create ));
}

if (isset($_POST['rmdir']) && $_POST['rmdir'] == 'true'){
    header('HTTP1/1 200');
    
    $remove = rmdir($_POST['nomdossier']);
    echo json_encode(array('key' => $remove));
}

if (isset($_GET['vi']) && $_GET['vi'] == 'true'){
    header('HTTP1/1 200');
    
    $open = file_get_contents($_GET['nomdossier']);
    echo json_encode(array('key' => $open));
}



