<?php
$config = require 'config.php';
// 1. PHPMailerのメインクラスファイルを読み込む
require_once 'vender/PHPMailer/src/PHPMailer.php';

// 2. 例外処理用のクラスファイルを読み込む
require_once 'vender/PHPMailer/src/Exception.php';

// 3. SMTP通信に必要なクラスファイルを読み込む（SMTP.php）
require_once 'vender/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// POST以外は拒否
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    echo '不正なリクエストです';
    exit();
}

// ------------------------------------
// フォームデータの受け取り (変数を定義)
// ------------------------------------
$user_email = $_POST['user_email'] ?? '';
$user_name = $_POST['user_name'] ?? '名無し';
$user_company = $_POST['user_company'] ?? '未入力';
$user_address = $_POST['user_address'] ?? '未入力';
$user_tel = $_POST['user_tel'] ?? '未入力';
$user_message = $_POST['user_message'] ?? 'メッセージなし';
$user_agree_text = isset($_POST['user_agree']) ? '同意する' : '未同意';

// すべての情報をまとめた共通のメール本文を作成
$mail_body_content = "--- お問い合わせ内容 ---\n";
$mail_body_content .= "【氏名】: {$user_name}\n";
$mail_body_content .= "【会社名】: {$user_company}\n";
$mail_body_content .= "【住所】: {$user_address}\n";
$mail_body_content .= "【電話番号】: {$user_tel}\n";
$mail_body_content .= "【メールアドレス】: {$user_email}\n";
$mail_body_content .= "【プライバシーポリシーへの同意】: {$user_agree_text}\n";
$mail_body_content .= "----------------------\n";
$mail_body_content .= "【お問い合わせ内容／ご質問事項】:\n";
$mail_body_content .= "{$user_message}\n";
$mail_body_content .= "----------------------\n";

$mail = new PHPMailer(true); // 例外を発生させる設定 (エラー詳細表示のため)

try {
    // ------------------------------------
    // 共通サーバー設定
    // ------------------------------------
    $mail->isSMTP();
    $mail->Host = $config['smtp_host'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['smtp_user'];
    $mail->Password = $config['smtp_pass'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // SMTPS (Port 465)
    $mail->Port = 465;
    $mail->CharSet = 'UTF-8';

    // 送信元設定 (両方のメールで共通) 送信に使うメールアドレスと一緒
    $mail->setFrom('no-reply@natofemin.com', 'Webサイト お問い合わせフォーム');

    // ======================================
    // 1. 管理者へ送信
    // ======================================
    $mail->clearAllRecipients(); // 宛先をクリア
    // $mail->addAddress('a.shimizu@nichibi.co.jp', '管理者'); 管理者 受信する人のアドレス
    $mail->addAddress('tuhan@natofemin.com', '管理者');
    $mail->Subject = '【Webサイト】新しいお問い合わせがありました';
    $mail->Body = $mail_body_content;
    $mail->addReplyTo($user_email, $user_name); // 返信先をフォーム入力者のアドレスにする

    $mail->send(); // 1通目送信

    // ======================================
    // 2. フォーム入力者（ユーザー）へ自動返信
    // ======================================
    $mail->clearAllRecipients(); // 宛先をクリア
    $mail->addAddress($user_email, $user_name); // ユーザーのアドレス
    $mail->Subject = '【株式会社】お問い合わせありがとうございます（自動返信）';

    // ユーザー向け本文を整形
    $user_mail_body = "{$user_name} 様\n\n";
    $user_mail_body .=
        "この度はお問い合わせいただき、誠にありがとうございます。\n";
    $user_mail_body .= "以下の内容でお問い合わせを受け付けいたしました。\n";
    $user_mail_body .=
        "内容を確認後、改めて担当者よりご連絡させていただきます。\n\n";
    $user_mail_body .= "======================================\n";
    $user_mail_body .= "【お客様のお問い合わせ内容】\n";
    $user_mail_body .= $mail_body_content; // 共通本文を挿入
    $user_mail_body .= "======================================\n\n";
    $user_mail_body .= "※このメールはシステムからの自動返信です。\n";
    $user_mail_body .=
        "このメールに心当たりのない場合は、お手数ですが弊社までご連絡ください。\n";

    $mail->Body = $user_mail_body;

    // ユーザーへの自動返信メールには、返信先を管理者側にするか、ReplyToを設定しない（NOREPLY）のが一般的です。
    // $mail->addReplyTo('a.shimizu@nichibi.co.jp', '株式会社'); // 必要に応じて設定

    $mail->send(); // 2通目送信

    echo 'success';
} catch (Exception $e) {
    echo "送信に失敗しました。エラー: {$mail->ErrorInfo}";
}
?>
