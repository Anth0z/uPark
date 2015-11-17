<?php
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    $methodType = $_SERVER['REQUEST_METHOD'];
    $data = array("status" => "fail", "msg" => "$methodType");

    if ($methodType === 'GET') {

        if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
            && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

            if (isset($_SESSION['loggedin']) && ($_SESSION['loggedin'] === true)
                && isset($_SESSION['username']) && !empty(($_SESSION['username']))
                && isset($_SESSION['picture']) && !empty(($_SESSION['picture']))
                && isset($_SESSION['user_id']) && !empty(($_SESSION['user_id']))
                ) {

                // data that would
                $data = array("status" => "success", "username" => $_SESSION['username'], "picture" => $_SESSION['picture'], "user_id" => $_SESSION['user_id']);

            } else {
                $data = array("status" => "fail", "msg" => "Not logged in.");
            }

        } else {

            $data = array("status" => "fail", "msg" => "Has to be an AJAX call.");

        }

    } else {

        $data = array("status" => "fail", "msg" => "Error: only GET allowed.");

    }

    echo json_encode($data, JSON_FORCE_OBJECT);

?>

