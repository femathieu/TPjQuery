<?php
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