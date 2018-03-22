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