<?php
if($_GET['date'] == "true"){
    $date = new DateTime('now');
    header("HTTP1/1 200");
    echo json_encode(array("key" => $date->format('d/m/Y H:i:s')));
}