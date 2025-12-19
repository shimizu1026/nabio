<?php
// batch_translate.php

// 1. APIキーの設定
$apiKey = 'AIzaSyD4rUJp-RZct9aw3NCH3HLZpGnznytg31g';
$targetLang = 'en'; // 翻訳したい言語コード (例: 'zh' なら 'zh')

// 2. 抽出したJSONファイルの読み込み
$jsonFile = 'texts_to_translate.json';
if (!file_exists($jsonFile)) {
    die("エラー: {$jsonFile} が見つかりません。");
}
$textsToTranslate = json_decode(file_get_contents($jsonFile), true);

if (empty($textsToTranslate)) {
    die("エラー: 翻訳対象のテキストがありません。");
}

$translatedResults = [];
$googleUrl = 'https://translation.googleapis.com/language/translate/v2?key=' . $apiKey;

echo "--- 翻訳処理を開始します (対象: " . count($textsToTranslate) . "項目) ---\n";

// 3. テキストをGoogle APIへ送信し、翻訳結果を取得
foreach ($textsToTranslate as $index => $text) {
    echo "処理中: " . ($index + 1) . "/" . count($textsToTranslate) . "\n";
    
    // APIリクエストの準備
    $data = [
        'q' => $text,
        'target' => $targetLang,
        'format' => 'text'
    ];

    $ch = curl_init($googleUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 

    $response = curl_exec($ch);
    $responseData = json_decode($response, true);

    
    // 結果の処理
    if (isset($responseData['data']['translations'][0]['translatedText'])) {
        $translatedText = $responseData['data']['translations'][0]['translatedText'];
        
        // 元のテキストと翻訳結果をペアで保存
        $translatedResults[$text] = $translatedText;
    } else {
        echo "⚠️ エラー発生: " . ($response ?: "APIからの応答がありません。") . "\n";
        $translatedResults[$text] = "TRANSLATION_FAILED";
    }
    
    // 課金回避のため、連続リクエストの間に短い遅延を入れる (秒単位)
    sleep(1); 
}

// 4. 結果を新しいJSONファイルとして保存
$outputFile = "translated_{$targetLang}.json";
$jsonOutput = json_encode($translatedResults, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
file_put_contents($outputFile, $jsonOutput);

echo "--- 翻訳完了 ---\n";
echo "結果がファイル {$outputFile} に保存されました。\n";
?>