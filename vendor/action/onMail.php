<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $name = $data["name"];
    $phone = $data["phone"];
    $email = $data["email"] ?? NULL;
    $comment = $data["comment"] ?? NULL;

    $to = "jenya26061987@mail.ru";  
    $subject = "Новое сообщение от $name";

    $body = "Имя: $name\n";
    $body .= "Телефон: $phone\n";
    $body .= $data["email"] ? "Email: $email\n" : '';
    $body .= $data["comment"] ? "Комментарий:\n$comment" : '';
    
    if (mail($to, $subject, $body)) {
        echo json_encode(["message" =>  "Письмо успешно отправлено"]);
    } else {
        echo json_encode(["error_message" =>  "Ошибка"]);
    }
}
?>