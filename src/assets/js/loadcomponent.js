// your_project/js/loadComponent.js

document.addEventListener('DOMContentLoaded', function() {
    // ----------------------------------------------------
    // 1. 読み込み対象のコンポーネントを定義し、総数を計算する
    // ----------------------------------------------------
    
    let componentsLoadedCount = 0; // 読み込み完了したコンポーネントの数

    // 読み込み対象のプレースホルダー要素を定義
    // const headerContainer = document.getElementById('header_placeholder');
    const contactContainer = document.getElementById('contact_placeholder');
    const footerContainer = document.getElementById('footer_placeholder');

    // 実際にHTML上に存在する要素だけをカウントする
    let totalComponents = 0;
    // if (headerContainer) totalComponents++;
    if (contactContainer) totalComponents++;
    if (footerContainer) totalComponents++;

    // プレースホルダーが一つも存在しない場合、即座にイベントを発火して終了
    if (totalComponents === 0) {
        const event = new CustomEvent('componentsLoaded');
        document.dispatchEvent(event);
        return;
    }


    const checkAllComponentsLoaded = () => {
        componentsLoadedCount++;
        if (componentsLoadedCount === totalComponents) {
            // すべてのコンポーネントの読み込みが完了したらカスタムイベントを発火
            const event = new CustomEvent('componentsLoaded');
            document.dispatchEvent(event);
        }
    };


    // ----------------------------------------------------
    // 2. ヘッダーの読み込み処理
    // ----------------------------------------------------
    // if (headerContainer) {
    //     fetch('components/header.html')
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('ヘッダーファイルの読み込みに失敗しました: ' + response.statusText);
    //             }
    //             return response.text();
    //         })
    //         .then(html => {
    //             headerContainer.innerHTML = html;
    //             checkAllComponentsLoaded(); // 読み込み完了を通知
    //         })
    //         .catch(error => {
    //             console.error('ヘッダーの読み込み中にエラーが発生しました:', error);
    //             checkAllComponentsLoaded(); // エラーでもカウントは進める
    //         });
    // } 
	// プレースホルダーがない場合の 'else' は削除

    
    // ----------------------------------------------------
    // 3. コンタクトの読み込み処理
    // ----------------------------------------------------
    if (contactContainer) {
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
                // ✅ エラーメッセージを修正
                console.error('コンタクトの読み込み中にエラーが発生しました:', error); 
                checkAllComponentsLoaded(); // エラーでもカウントは進める
            });
    } // プレースホルダーがない場合の 'else' は削除

    
    // ----------------------------------------------------
    // 4. フッターの読み込み処理
    // ----------------------------------------------------
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
                const tpl = document.getElementById('lang_links');
                const target = document.getElementById('lang_links_target');
                if (tpl && target) {
                    target.replaceWith(tpl.content.cloneNode(true));
                }
                checkAllComponentsLoaded(); // 読み込み完了を通知
            })
            .catch(error => {
                console.error('フッターの読み込み中にエラーが発生しました:', error);
                checkAllComponentsLoaded(); // エラーでもカウントは進める
            });
    } // プレースホルダーがない場合の 'else' は削除
});