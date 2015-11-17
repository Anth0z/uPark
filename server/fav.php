<?php
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    $methodType = $_SERVER['REQUEST_METHOD'];
    if ($methodType === 'GET') {
        if (isset($_GET["type"]) && !empty($_GET["type"])) {
            $type = $_GET["type"];
            $rows = getFavourites($type);
            if($type="JSON") {  
                renderJSON($rows);
            } else {
                echo "WRONG TYPE";
            }
        } else {
            echo "NEED TYPE";
        }
    } else {
        echo "NEED GET";
    }

   
    function renderJSON($rows) {
        $data = array("status" => "success", "favs" => $rows);
        echo json_encode($data, JSON_FORCE_OBJECT);
    }

//get favs
    function getFavourites($type) {
        $servername = "localhost";
        $dblogin = "root";
        $password = "root";
        $dbname = "upark";

        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dblogin, $password);

// set the PDO error mode to exception --> Error handling
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $usrid = $_SESSION['user_id'];

            $fav = "SELECT favourites.upark_id, parkinglots.company, parkinglots.lot_num FROM favourites INNER JOIN parkinglots ON favourites.upark_id=parkinglots.upark_id WHERE favourites.user_id=$usrid";
            //$fav = "SELECT upark_id FROM favourites WHERE user_id = $usrid";
            //$fav = "SELECT * FROM favourites";
            //$lot = "SELECT * FROM parkinglots WHERE upark_id = $fav";

            $statement1 = $conn->prepare($fav);
     
            $statement1->execute();


            $rows = $statement1->fetchAll(PDO::FETCH_ASSOC);

            return $rows;

            /*$lot = "SELECT * FROM parkinglots ";

            $statement2 = $conn->prepare($lot);
            $statement2->execute();


            $rows2 = $statement2->fetchAll(PDO::FETCH_ASSOC);

            return $rows2;*/



//catching any error
        } catch(PDOException $e) {
            if($type == "JSON") {
                $result = array("status" => "fail", "msg" => $e->getMessage());
                echo $result;
            } else {
                echo "<p style='color: red;'>From the SQL code: $fav $lot</p>";
                $error = $e->getMessage();
                echo "<p style='color: red;'>$error</p>";
            }
        }

    }

?>

