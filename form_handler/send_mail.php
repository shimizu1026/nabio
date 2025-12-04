<?php

// 1. PHPMailerのメインクラスファイルを読み込む
require_once 'PHPMailer-master/src/PHPMailer.php';

// 2. 例外処理用のクラスファイルを読み込む
require_once 'PHPMailer-master/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// require 'vendor/autoload.php';

// vendorフォルダへの正しいパスを設定（form_handlerフォルダの外側へ）
// require __DIR__ . '/../vendor/autoload.php'; 
// require('/vender/PHPMailer/src/PHPMailer.php');
// require('/vender/PHPMailer/src/Exception.php');
// require('/vender/PHPMailer/src/SMTP.php');

require_once __DIR__ . '/vender/PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/vender/PHPMailer/src/Exception.php';
require_once __DIR__ . '/vender/PHPMailer/src/SMTP.php'; // SMTPを使うなら必要

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
$company = htmlspecialchars($_POST['company'] ?? '未入力');
$address = htmlspecialchars($_POST['address'] ?? '未入力');
$tel = htmlspecialchars($_POST['tel'] ?? '未入力');

$mail = new PHPMailer(true);

try {

	// ------------------------------------
    // ★★★ デバッグ設定の追加 ★★★
    // ------------------------------------
    // デバッグレベル: 2 (クライアントとサーバーのメッセージを出力)
    // テストが完了したら、この行をコメントアウトまたは 0 に設定してください。
    $mail->SMTPDebug = 2; 
    $mail->Debugoutput = 'html'; // HTML形式で表示（ブラウザでの確認向け）
    // ------------------------------------
    // サーバー設定（★ ここをご自身のレンタルサーバー情報に書き換えてください ★）
    // ------------------------------------
    $mail->isSMTP();
    $mail->Host       = 'mail.natofemin.com';      // 例: さくらのSMTP, XserverのSMTPなど
    $mail->SMTPAuth   = true;
    $mail->Username   = 'no-reply@natofemin.com';        // メールアドレス (SMTP認証ID)
     //$mail->Username   = 'tuhan@natfemin.com';        メールアドレス (SMTP認証ID)
    $mail->Password   = 'nichibi3949';         //SMTPパスワード
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // PHPMailer::ENCRYPTION_STARTTLS または SMTPS
    $mail->Port       = 465;                         // 465 (SMTPS) または 587 (STARTTLS)
    $mail->CharSet = 'UTF-8';                         // 文字化け防止

    // ------------------------------------
    // 送信元・宛先の設定
    // ------------------------------------
    $mail->setFrom('nabio-test@nichibi.co.jp
', 'Webサイト お問い合わせフォーム'); // サーバーで許可されたアドレス
    $mail->addAddress('a.shimizu@nichibi.co.jp', '管理者');                       // 実際に通知を受け取るアドレス
    $mail->addReplyTo($email, $name);                                         // 返信先をフォーム入力者のアドレスにする

    // ------------------------------------
    // メール内容
    // ------------------------------------
    $mail->isHTML(false); // プレーンテキストメールとして送信
    $mail->Subject = '【Webサイトからお問い合わせ】' . $name;
    
    $body = "サイトから新しいお問い合わせがありました。\n\n";
    $body .= "氏名: {$name}\n";
    $body .= "会社名: {$company}\n";
    $body .= "住所: {$address}\n";
    $body .= "電話番号 : {$tel}\n";
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