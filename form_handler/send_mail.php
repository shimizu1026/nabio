<?php

// 1. PHPMailerのメインクラスファイルを読み込む
require_once('vender/PHPMailer/src/PHPMailer.php');

// 2. 例外処理用のクラスファイルを読み込む
require_once('vender/PHPMailer/src/Exception.php');

// 3. SMTP通信に必要なクラスファイルを読み込む（SMTP.php）
require_once('vender/PHPMailer/src/SMTP.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;


// vendorフォルダへの正しいパスを設定（form_handlerフォルダの外側へ）
// require __DIR__ . '/../vendor/autoload.php'; 
// require('/vender/PHPMailer/src/PHPMailer.php');
// require('/vender/PHPMailer/src/Exception.php');
// require('/vender/PHPMailer/src/SMTP.php');

// require_once __DIR__ . '/vender/PHPMailer/src/PHPMailer.php';
// require_once __DIR__ . '/vender/PHPMailer/src/Exception.php';
// require_once __DIR__ . '/vender/PHPMailer/src/SMTP.php'; 

// POSTリクエストかどうかを確認
// if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
//     http_response_code(405);
//     exit;
// }

// ------------------------------------
// フォームデータの受け取り
// ------------------------------------
// $name = htmlspecialchars($_POST['name'] ?? '名無し');
// $email = htmlspecialchars($_POST['email'] ?? 'unknown@example.com');
// $message = htmlspecialchars($_POST['message'] ?? 'メッセージなし');
// $company = htmlspecialchars($_POST['company'] ?? '未入力');
// $address = htmlspecialchars($_POST['address'] ?? '未入力');
// $tel = htmlspecialchars($_POST['tel'] ?? '未入力');

// POST以外は拒否
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    echo "不正なリクエストです";
    exit;
}

// $mail = new PHPMailer(true);
$mail = new PHPMailer();

try {

    // ------------------------------------
    // サーバー設定
    // ------------------------------------
    $mail->isSMTP();
    $mail->Host       = 'a.shimizu@nichibi.co.jp';// 例: さくらのSMTP, XserverのSMTPなど
    $mail->SMTPAuth   = true;
    $mail->Username   = 'a.shimizu@nichibi.co.jp';// メールアドレス (SMTP認証ID)
     //$mail->Username   = 'tuhan@natfemin.com';メールアドレス (SMTP認証ID)
    $mail->Password   = 'fu3XKMCb8iEp';//SMTPパスワード
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 995;
    $mail->CharSet = 'UTF-8';                         // 文字化け防止

    // ------------------------------------
    // 送信元・宛先の設定
    // ------------------------------------
    $mail->setFrom('nabio-test@nichibi.co.jp
', 'Webサイト お問い合わせフォーム'); // サーバーで許可されたアドレス
    $mail->addAddress('a.shimizu@nichibi.co.jp', '管理者'); // 実際に通知を受け取るアドレス
	
    // フォームからの値
    $user_email = $_POST['user_email'];
    $user_name  = $_POST['user_name'];
    $user_company  = $_POST['user_company'];
    $user_address  = $_POST['user_address'];
    $user_tel  = $_POST['user_tel'];
    $user_message  = $_POST['user_message'];
    $user_agree  = $_POST['user_agree'];

    $mail->addReplyTo($user_email, $user_name); // 返信先をフォーム入力者のアドレスにする
    $mail->Subject = 'お問い合わせがありました';
    $mail->Body    = "名前：{$user_name}\nメール：{$user_email}\n\n" . $_POST['user_message'];

    $mail->send();

    // ★ここが重要：HTMLを出さず、成功の合言葉だけを返す
    echo 'success';
    // ------------------------------------
    // メール内容
    // ------------------------------------
    //$mail->isHTML(false);  プレーンテキストメールとして送信
    // $mail->Subject = '【Webサイトからお問い合わせ】' . $name;
    
    // $body = "サイトから新しいお問い合わせがありました。\n\n";
    // $body .= "氏名: {$name}\n";
    // $body .= "会社名: {$company}\n";
    // $body .= "住所: {$address}\n";
    // $body .= "電話番号 : {$tel}\n";
    // $body .= "メールアドレス: {$email}\n";
    // $body .= "お問い合わせ内容:\n{$message}\n";
    
    // $mail->Body    = $body;
    
    // $mail->send();
    
    // 成功応答
    // header('Content-Type: application/json');
    // echo json_encode(['success' => true, 'message' => '送信が完了しました。']);

} catch (Exception $e) {
    // エラーの場合はメッセージを返す
    echo "Mailer Error: {$mail->ErrorInfo}";
    // 失敗応答
    // header('Content-Type: application/json', true, 500);
    // echo json_encode(['success' => false, 'message' => '送信に失敗しました。詳細: ' . $mail->ErrorInfo]);
}
?>