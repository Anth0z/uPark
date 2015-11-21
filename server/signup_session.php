<?php

    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    $DBHost = "localhost";
    $dblogin = "root";
    $DBpassword = "root";
    $DBname = "upark";

    $methodType = $_SERVER['REQUEST_METHOD'];
    $data = array("status" => "fail", "msg" => "$methodType");

    if ($methodType === 'POST') {

        if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
            && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
            // yes, is AJAX call
            // answer POST call and get the data that was sent
            if(isset($_POST["usrname"]) && !empty($_POST["usrname"])
                //&& isset($_POST["pwd"]) && !empty($_POST["pwd"])){


                // get the data from the post and store in variables
                $username = $_POST["usrname"];
                //$email = $_POST["email"];

                try {
                    $conn = new PDO("mysql:host=$DBHost;dbname=$DBname", $dblogin, $DBpassword);
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                    if(empty($username) ) {
                        echo "<p>No update performed.</p>";
                    } else {
                        // perform update to the DB
                        $insertSQL = "INSERT INTO users (username) values (:uName)";
                        
                        // $insert is a 'PDOStatement
                        $insert = $conn->prepare($insertSQL);
                        $insert->execute(array(":uName" => $username);
                    }

                    $sql = "SELECT * FROM users";

                    $statement = $conn->prepare($sql);
                    $statement->execute();
                    $count = $statement->rowCount();

                    $rows = $statement->fetchAll(PDO::FETCH_ASSOC);



                } catch(PDOException $e) {
                    $data = array("status" => "fail", "msg" => $e->getMessage());
                }


            } else {
                $data = array("status" => "fail", "msg" => "Either login or password were absent.");
            }



        } else {
            // not AJAX
            $data = array("status" => "fail", "msg" => "Has to be an AJAX call.");
        }


    } else {
        // simple error message, only taking POST requests
        $data = array("status" => "fail", "msg" => "Error: only POST allowed.");
    }

    echo json_encode($data, JSON_FORCE_OBJECT);

?>
