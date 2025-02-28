<?php
header('Content-Type: application/json'); // Define que a resposta é JSON

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'] ?? 'Não informado';
    $email = $_POST['email'] ?? 'Não informado';
    $assunto = $_POST['assunto'] ?? 'Não informado';
    $mensagem = $_POST['mensagem'] ?? 'Não informado';

    $to = "diogoalvesdev@gmail.com"; // Substitua pelo seu e-mail
    $subject = "Nova mensagem: $assunto";
    $body = "Nome: $nome\nEmail: $email\nMensagem: $mensagem";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(["message" => "Mensagem enviada!"]);
    } else {
        echo json_encode(["message" => "Erro ao enviar."]);
    }
} else {
    http_response_code(405); // Retorna 405 explicitamente se não for POST
    echo json_encode(["message" => "Método não permitido. Use POST."]);
}
?>