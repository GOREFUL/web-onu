<?php
    if (isset($_POST["firstname"]) && isset($_POST["eduform"])
    && isset($_POST["comment"]) && isset($_POST["courses"])) {
        $name = htmlentities($_POST["firstname"]);
        $eduform = htmlentities($_POST["eduform"]);
        $hostel = "ні";
        if (isset($_POST["hostel"])) {
            $hostel = "так";
        }
        $comment = htmlentities($_POST["comment"]);
        $courses = $_POST["courses"];
        $output="<html>
        <head>
        <title>Анкетні дані</title>
        </head>
        <body> Ваше ім'я: $name<br/>
        Форма навчання: $eduform<br/>
        Необхідність гуртожитку: $hostel<br/>
        Вибрані курси: <ul>";
        foreach($courses as $item)
        $output.="<li>" . htmlentities($item) . "</li>";
        $output.="</ul></body></html>";
        echo $output;

    } else echo "Введені дані не коректні";
?>
