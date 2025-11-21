"use strict";

import '../css/destyle.css';
import '../css/style.css';
// gsap
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Swiperのインポート
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css/effect-fade';

document.addEventListener('componentsLoaded', function () {
	// --------------------------------------------------
	//  ハンバーガーメニューの処理
	// --------------------------------------------------
	const header = document.querySelector(".header");
	const menu = document.querySelector(".hamburger_contents");
	const hamburgerButton = document.querySelector(".hamburger_button");

	const toggleMenu = () => {
		console.log("クリックされました！");
		menu.classList.toggle("MenuIsOpen");
		header.classList.toggle("menu_active");
	};

	hamburgerButton.addEventListener("click", () => {
		toggleMenu();
	});

	
	//  Swiper　ファーストビュー

	const swiperElement = document.querySelector('.mySwiper');

	if (swiperElement) {
		const swiper = new Swiper('.mySwiper', {
			modules: [Autoplay, Pagination, EffectFade],
			speed: 1200,
			loop: true,
			slidesPerView: 1,
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		});
	}

	//  historySwiper

	// 1. 要素を取得（変数名をわかりやすく変更）
	const historySwiperElement = document.querySelector('.historySwiper');

	// 2. 要素が存在するかチェック（変数名を合わせる）
	if (historySwiperElement) {
		// 3. 初期化（変数名を変えるか、constをつけずに実行）
		const historySwiper = new Swiper('.historySwiper', {
			modules: [Navigation, Pagination],

			// --- 基本設定 ---
			loop: false,
			spaceBetween: 0, // 線をつなげるために隙間は0にする

			slidesPerView: 1, // スマホは1つ表示
			breakpoints: {
				768: {
					slidesPerView: 3,
				}
			},
			// --- 矢印ボタンの設定 ---
			navigation: {
				nextEl: '.history-next',
				prevEl: '.history-prev',
			},
		});
	}
// --------------------------------------------------
// ファーストビューと次セクションの重ね合わせ演出
// --------------------------------------------------

// main.js の eventListener 内のGSAP部分

const fvSection = document.querySelector('.swiper.mySwiper');
const introSection = document.querySelector('.intro');

if (fvSection && introSection) {
    // ★ 削除: gsap.set は削除します。アニメーションに含めるためです。
    // gsap.set(introSection, { yPercent: 100 }); 

    gsap.timeline({
        scrollTrigger: {
            trigger: fvSection, // トリガーはSwiper全体
            pin: true,          // Swiperセクションを画面に固定
            start: "top top",   
            end: "+=100%",      
            scrub: true,        
        }
    })
    // ★ 修正: fromTo を使って、開始位置を yPercent: 100 から yPercent: 0 へ明示的に指定します
    .fromTo(introSection, 
        { yPercent: 100 }, // from (開始位置: 画面外の下)
        { yPercent: 0, duration: 1 }, // to (終了位置: 元の位置)
        0 // タイムラインの開始位置
    ); 
}
// --------------------------------------------------
    // フォーム送信処理 (追加するコード)
    // --------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const phpEndpoint = 'form_handler/send_mail.php'; // ★ PHPファイルへのアクセスパス

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); 
            
            // 送信ボタンを無効化して多重送信を防ぐ
            const submitButton = e.submitter;
            submitButton.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(phpEndpoint, {
                    method: 'POST',
                    body: formData,
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    alert('お問い合わせを正常に送信しました。');
                    contactForm.reset();
                } else {
                    alert('送信に失敗しました。');
                    console.error('サーバーエラー:', result.message);
                }
            } catch (error) {
                alert('通信エラーが発生しました。ネットワークを確認してください。');
                console.error('通信エラー:', error);
            } finally {
                // 送信ボタンを元に戻す
                submitButton.disabled = false;
            }
        });
    }
});

