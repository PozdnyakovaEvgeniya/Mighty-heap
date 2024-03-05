<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = $_POST["name"];
        $phone = $_POST["phone"];
        $email = $_POST["email"];
        $comment = $_POST["comment"];

        $to = "jenya26061987@mail.ru";  
        $subject = "Новое сообщение от $name";

        $body = "Имя: $name\n";
        $body = "Телефон: $phone\n";
        $body .= "Email: $email\n";
        $body .= "Комментарий:\n$comment";

        if (mail($to, $subject, $body)) {
            echo "Письмо успешно отправлено";
        } else {
            echo "Ошибка при отправке письма";
        }
    }
?>