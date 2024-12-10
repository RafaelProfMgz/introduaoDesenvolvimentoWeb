<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Pegando os dados do formulário
    $nome = htmlspecialchars($_POST['nome']);
    $email = htmlspecialchars($_POST['email']);
    $telefone = htmlspecialchars($_POST['telefone']);
    $sugestao = htmlspecialchars($_POST['sugestao']);

    // Definindo o email de destino
    $to = "mangazaorig@gmail.com";
    
    // Assunto do email
    $subject = "Nova sugestão do site";

    // Corpo do email
    $body = "Nome: $nome\n";
    $body .= "Email: $email\n";
    $body .= "Telefone: $telefone\n";
    $body .= "Sugestão:\n$sugestao\n";

    // Cabeçalhos do email
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Enviar email
    if (mail($to, $subject, $body, $headers)) {
        echo "Email enviado com sucesso!";
    } else {
        echo "Falha no envio do email.";
    }
} else {
    echo "Método de requisição inválido.";
}
?>
