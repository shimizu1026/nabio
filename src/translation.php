<?php
// エラー報告を有効化（開発・デバッグ用）
ini_set('display_errors', 1);
error_reporting(E_ALL);

// 1. Composerのオートローダーを読み込み
// ※ vendorフォルダの場所に合わせてパスを修正してください。
require_once __DIR__ . '/vendor/autoload.php';

use Google\Cloud\Translate\V2\TranslateClient;

header('Content-Type: application/json');

// POSTリクエストのJSONデータを取得
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['error' => 'Invalid JSON input']);
    exit;
}

// 必須パラメータのチェック
$texts = $data['texts'] ?? null;
$targetLang = $data['target'] ?? null;

if (empty($texts) || empty($targetLang)) {
    echo json_encode(['error' => 'Missing texts or target language.']);
    exit;
}

// ------------------------------------------
// 2. Cloud Translation APIの初期化
// ------------------------------------------

// ★★★ ここにあなたの取得した API キーを記述してください ★★★
$apiKey = '';

try {
    $translate = new TranslateClient([
        'key' => $apiKey // APIキーを直接指定
    ]);

    // 翻訳の実行
    $translations = [];
    foreach ($texts as $text) {
        if (empty($text)) {
             // テキストが空の場合は、空の文字列を返す
             $translations[] = ['translatedText' => ''];
             continue;
        }
        
        // 翻訳リクエスト
        $result = $translate->translate($text, [
            'target' => $targetLang, // JavaScriptから受け取ったターゲット言語
            'source' => 'ja'        // 元言語を日本語に固定
        ]);
        
        // 結果を格納
        $translations[] = [
            'translatedText' => $result['text']
        ];
    }
    
    // 3. 翻訳結果をJSON形式でJavaScriptに返す
    echo json_encode(['translations' => $translations]);

} catch (\Exception $e) {
    // 翻訳中にエラーが発生した場合
    http_response_code(500);
    echo json_encode(['error' => 'Translation failed: ' . $e->getMessage()]);
}

?>