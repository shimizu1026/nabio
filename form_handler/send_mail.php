<?php
// Composerのオートローダーを読み込む
// ※ vendorフォルダは通常 form_handler の「一つ上」にあるため、パスを調整
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// vendorフォルダへの正しいパスを設定（form_handlerフォルダの外側へ）
require __DIR__ . '/../vendor/autoload.php'; 

// POSTリクエストかどうかを確認
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

// ------------------------------------
// フォームデータの受け取り
// ------------------------------------
$name = htmlspecialchars($_POST['name'] ?? '名無し');
$email = htmlspecialchars($_POST['email'] ?? 'unknown@example.com');
$message = htmlspecialchars($_POST['message'] ?? 'メッセージなし');

$mail = new PHPMailer(true);

try {
    // ------------------------------------
    // サーバー設定（★ ここをご自身のレンタルサーバー情報に書き換えてください ★）
    // ------------------------------------
    $mail->isSMTP();
    $mail->Host       = 'smtp.your-server.com';      // 例: さくらのSMTP, XserverのSMTPなど
    $mail->SMTPAuth   = true;
    $mail->Username   = 'your-smtp-username';        // メールアドレス (SMTP認証ID)
    $mail->Password   = 'your-smtp-password';        // SMTPパスワード
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // PHPMailer::ENCRYPTION_STARTTLS または SMTPS
    $mail->Port       = 465;                         // 465 (SMTPS) または 587 (STARTTLS)
    $mail->CharSet = 'UTF-8';                         // 文字化け防止

    // ------------------------------------
    // 送信元・宛先の設定
    // ------------------------------------
    $mail->setFrom('', 'Webサイト お問い合わせフォーム'); // サーバーで許可されたアドレス
    $mail->addAddress('a.shimizu@nichibi.co.jp', '管理者');                       // 実際に通知を受け取るアドレス
    $mail->addReplyTo($email, $name);                                         // 返信先をフォーム入力者のアドレスにする

    // ------------------------------------
    // メール内容
    // ------------------------------------
    $mail->isHTML(false); // プレーンテキストメールとして送信
    $mail->Subject = '【Webサイトからお問い合わせ】' . $name;
    
    $body = "サイトから新しいお問い合わせがありました。\n\n";
    $body .= "お名前: {$name}\n";
    $body .= "メールアドレス: {$email}\n";
    $body .= "お問い合わせ内容:\n{$message}\n";
    
    $mail->Body    = $body;
    
    $mail->send();
    
    // 成功応答
    header('Content-Type: application/json');
    echo json_encode(['success' => true, 'message' => '送信が完了しました。']);

} catch (Exception $e) {
    // 失敗応答
    header('Content-Type: application/json', true, 500);
    echo json_encode(['success' => false, 'message' => '送信に失敗しました。詳細: ' . $mail->ErrorInfo]);
}
?>