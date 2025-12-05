async function translatePage(targetLang) {
    console.log("翻訳開始: " + targetLang);

    if (targetLang === 'ja') {
        location.reload();
        return;
    }

    const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, a, span, div, img');
    document.body.style.cursor = "wait"; 

    for (let element of elements) {
        let originalText = element.innerText.trim();
        if (originalText.length === 0) continue;

        try {
            const translatedText = await translateTextAPI(originalText, targetLang);
            if (translatedText) {
                element.innerText = translatedText;
            }
        } catch (e) {
            console.error(e);
        }
    }
    document.body.style.cursor = "default";
    alert("翻訳が完了しました");
}

async function translateTextAPI(text, targetLang) {
    const formData = new FormData();
    formData.append('text', text);
    formData.append('target', targetLang);

    try {
        // ★重要: Viteの場合、PHPファイルのパスに注意が必要です。
        // publicフォルダに置いた場合、ルートパス '/' からアクセスします。
        const response = await fetch('https://nichibi.co.jp/exp/nabio/translate_proxy.php', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) return null;
        const data = await response.json();
        
        if (data.data && data.data.translations) {
            return data.data.translations[0].translatedText;
        }
    } catch (error) {
        console.error('API通信エラー:', error);
    }
    return null;
}

// ★★★ ここがVite用の特別な記述です ★★★
// HTMLの onclick="translatePage(...)" からこの関数が見えるように、
// windowオブジェクト（グローバル）に登録します。
window.translatePage = translatePage;