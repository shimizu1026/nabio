// your_project/js/loadComponent.js

document.addEventListener('DOMContentLoaded', function() {
    let componentsLoadedCount = 0; // 読み込み完了したコンポーネントの数
    const totalComponents = 3; // ヘッダーとフッター、コンタクト

    const checkAllComponentsLoaded = () => {
        componentsLoadedCount++;
        if (componentsLoadedCount === totalComponents) {
            // すべてのコンポーネントの読み込みが完了したらカスタムイベントを発火
            const event = new CustomEvent('componentsLoaded');
            document.dispatchEvent(event);
        }
    };

    // --- ヘッダーの読み込み処理 ---
    const headerContainer = document.getElementById('header_placeholder');
    if (headerContainer) {
        fetch('components/header.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('ヘッダーファイルの読み込みに失敗しました: ' + response.statusText);
                }
                return response.text();
            })
            .then(html => {
                headerContainer.innerHTML = html;
                checkAllComponentsLoaded(); // 読み込み完了を通知
            })
            .catch(error => {
                console.error('ヘッダーの読み込み中にエラーが発生しました:', error);
                checkAllComponentsLoaded(); // エラーでもカウントは進める（無限待ちを防ぐため）
            });
    } else {
        // プレースホルダーがない場合もカウントを進める
        checkAllComponentsLoaded();
    }
    // --- コンタクトの読み込み処理 ---
    const contactContainer = document.getElementById('contact_placeholder');
    if (headerContainer) {
        fetch('components/contact.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('コンタクトファイルの読み込みに失敗しました: ' + response.statusText);
                }
                return response.text();
            })
            .then(html => {
                contactContainer.innerHTML = html;
                checkAllComponentsLoaded(); // 読み込み完了を通知
            })
            .catch(error => {
                console.error('ヘッダーの読み込み中にエラーが発生しました:', error);
                checkAllComponentsLoaded(); // エラーでもカウントは進める（無限待ちを防ぐため）
            });
    } else {
        // プレースホルダーがない場合もカウントを進める
        checkAllComponentsLoaded();
    }

    // --- フッターの読み込み処理 ---
    const footerContainer = document.getElementById('footer_placeholder');
    if (footerContainer) {
        fetch('components/footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('フッターファイルの読み込みに失敗しました: ' + response.statusText);
                }
                return response.text();
            })
            .then(html => {
                footerContainer.innerHTML = html;
                checkAllComponentsLoaded(); // 読み込み完了を通知
            })
            .catch(error => {
                console.error('フッターの読み込み中にエラーが発生しました:', error);
                checkAllComponentsLoaded(); // エラーでもカウントは進める
            });
    } else {
        // プレースホルダーがない場合もカウントを進める
        checkAllComponentsLoaded();
    }
});