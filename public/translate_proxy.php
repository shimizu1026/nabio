<?php
// translate_proxy.php

// エラーを表示する場合（開発中のみ有効にしてください）
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// JSON形式で返却することを宣言
header('Content-Type: application/json; charset=UTF-8');

// 1. あなたのGoogle Cloud Translation APIキーをここに設定します
$apiKey = 'AIzaSyD4rUJp-RZct9aw3NCH3HLZpGnznytg31g';

// 2. JavaScriptから送られてきたデータを受け取ります
$text = isset($_POST['text']) ? $_POST['text'] : '';
$targetLang = isset($_POST['target']) ? $_POST['target'] : 'en'; // デフォルトは英語

if (empty($text)) {
    echo json_encode(['error' => 'テキストが空です']);
    exit;
}

// 3. Google APIへのリクエストURLを作成
$url = 'https://translation.googleapis.com/language/translate/v2?key=' . $apiKey;

// 送信するデータ
$data = [
    'q' => $text,
    'target' => $targetLang,
    'format' => 'text'
];

// 4. cURLを使ってGoogleへリクエスト送信（サーバー間通信）
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // ローカル環境などでSSLエラーが出る場合のみfalse

$response = curl_exec($ch);

if(curl_errno($ch)){
    echo json_encode(['error' => 'Request Error:' . curl_error($ch)]);
} else {
    // Googleからの結果をそのままJavaScriptへ返す
    echo $response;
}

curl_close($ch);
?>