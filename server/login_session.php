<?php
    // http://php.net/manual/en/function.session-start.php
    // http://stackoverflow.com/questions/11768816/php-session-variables-not-preserved-with-ajax
    // http://stackoverflow.com/questions/9560240/how-session-start-function-works
    // get the session
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    
        $methodType = $_SERVER['REQUEST_METHOD'];
        $data = array("status" => "fail", "msg" => "$methodType");

        if ($methodType === 'POST') {

            if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
                && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
                // yes, is AJAX call
                // answer POST call and get the data that was sent
                if(isset($_POST["userid"]) && !empty($_POST["userid"])
                    && isset($_POST["pwd"]) && !empty($_POST["pwd"])){


                    // get the data from the post and store in variables
                    $login = $_POST["userid"];
                    $password = $_POST["pwd"];

                    //get values from db
                    //$usrchk = "SELECT * FROM users WHERE username=$login";

                    // HERE'S WHERE YOU'D GET THE VALUES FROM THE DB
                    if($login == "upark" && $password == "upark") {
                        // sucess
                        $_SESSION['username'] = "Mario Yoshi";
                        //$_SESSION['password'] = $password;
                        $_SESSION['firstname'] = "Dummy";
                        $_SESSION['lastname'] = "User";
                        $_SESSION['user_id'] = "1";
                        $_SESSION['email'] = "dummy_user@upark.ca";
                        $_SESSION['loggedin'] = true;
                        $_SESSION['picture'] = "./images/yoshi.jpg";

                        $sid= session_id();
                        $data = array("status" => "success", "sid" => $sid);


                    } else {
                        $data = array("status" => "fail", "msg" => "User name and/or password not correct.");
                    }
    /*
                    $data = array("msg" => "Thank you $firstName $lastName, you've been added to our mailing list!",
                        "firstName" => "$firstName", "lastName" => "$lastName",
                        "email" => "$email");
                    ////////////////////////////////////////////////////////////
                    ///   HERE'S WHERE YOU COULD DO A DATABASE ENTRY UPDATE
                    ////////////////////////////////////////////////////////////
    */

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

