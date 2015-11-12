<?php
    $methodType = $_SERVER['REQUEST_METHOD'];
    if ($methodType === 'GET') {
        if (isset($_GET["type"]) && !empty($_GET["type"])) {
            $type = $_GET["type"];
            $rows = getParkingLots($type);
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
        $data = array("status" => "success", "lots" => $rows);
        echo json_encode($data, JSON_FORCE_OBJECT);
    }

//get parking lots
    function getParkingLots($type) {
        $servername = "localhost";
        $dblogin = "root";
        $password = "root";
        $dbname = "upark";

        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dblogin, $password);

// set the PDO error mode to exception --> Error handling
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $sql = "SELECT * FROM parkinglots";

            $statement = $conn->prepare($sql);
            $statement->execute();

            $rows = $statement->fetchAll(PDO::FETCH_ASSOC);

            return $rows;

//catching any error
        } catch(PDOException $e) {
            if($type == "JSON") {
                $result = array("status" => "fail", "msg" => $e->getMessage());
                echo $result;
            } else {
                echo "<p style='color: red;'>From the SQL code: $sql</p>";
                $error = $e->getMessage();
                echo "<p style='color: red;'>$error</p>";
            }
        }

    }




?>

