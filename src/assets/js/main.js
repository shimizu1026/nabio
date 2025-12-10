"use strict";

import '../css/destyle.css';
import '../css/style.css';
import '../css/common.css';
import '../css/contact.css';
import '../css/company.css';
import '../css/faq.css';
import '../css/products.css';

//js
import '../js/loadcomponent.js';

// gsap
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

// Swiperのインポート
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css/effect-fade';

//lenis
import Lenis from '@studio-freight/lenis';

document.addEventListener('componentsLoaded', function () {

	// Lenis
	const lenis = new Lenis({
		duration: 1.2,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		// タッチデバイスでも滑らかさを有効にする場合はtrue
		smoothTouch: true,
		// スクロール感度
		touchMultiplier: 1.5,
	});

	// -------------------------------------------------------------------

	// アンカーリンクの処理
	const anchorLinks = document.querySelectorAll('a[href^="#"]');

	anchorLinks.forEach(link => {
		link.addEventListener("click", (e) => {
			// デフォルトのジャンプ動作を停止
			e.preventDefault();

			const targetId = link.getAttribute('href');

			lenis.scrollTo(targetId);
		});
	});
	function raf(time) {
		lenis.raf(time);
		ScrollTrigger.update(); //追加
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);

	// --------------------------------------------------
	// オープニング
	// --------------------------------------------------

	const openingMask = document.querySelector(".opening_mask");
	const fvSwiper = document.querySelector(".swiper.mySwiper");

	if (openingMask && fvSwiper) {
		const openingTl = gsap.timeline();

		// アニメーション開始
		openingTl
			// 0. 初期設定
			.set(fvSwiper, {
				scale: 0.95,
				opacity: 0,
				filter: "brightness(0)"
			})

			.to(openingMask, {
				y: "-120%",
				duration: 1.8,
				ease: "power4.out",
			})

			.to(fvSwiper, {
				scale: 1,
				opacity: 1,
				filter: "brightness(1)",
				duration: 0.5,
				ease: "power4.out",
			}, "-=1.0"); // マスクのアニメーションが終わる「1.0秒前」から開始（少し重ねる）
	}

	// --------------------------------------------------
	//  ハンバーガーメニューの処理
	// --------------------------------------------------

	const header = document.querySelector(".header");
	const menu = document.querySelector(".hamburger_contents");
	const hamburgerButton = document.querySelector(".hamburger_button");

	const menuList = document.querySelector(".hamburger_list");
	const menuItems = document.querySelectorAll(".hamburger_item");
	const contactArea = document.querySelector(".hamburger_contact_area");
	const topBar = document.querySelector(".hamburger_top_bar");
	const body = document.body

	const menuTimeline = gsap.timeline({ paused: true });

	// メニューが開く動作
	menuTimeline.fromTo(menu,
		{
			clipPath: "circle(10px at 100% 0%)",
			visibility: "hidden"
		},
		{
			clipPath: "circle(150% at 100% 0%)",
			duration: 1,
			ease: "power3.inOut",
			visibility: "visible",
		},
		0
	);

	// 2. メニューが開いた後に、ロゴと言語選択 (.hamburger_top_bar) をフェードイン
	menuTimeline.fromTo(topBar,
		{ opacity: 0, y: 10 },
		{ opacity: 1, y: 0, duration: 0.3 },
		0.3
	);

	menuTimeline.fromTo(menuItems,
		{ opacity: 0, y: 30 },
		{
			opacity: 1,
			y: 0,
			duration: 0.6,
			stagger: 0.05,
			ease: "power2.out"
		},
		0.5
	);

	// // 4. コンタクトエリアを最後にフェードイン
	menuTimeline.fromTo(contactArea,
		{ opacity: 0, y: 20 },
		{ opacity: 1, y: 0, duration: 0.4 },
		0.6
	);

	// --- クリックイベントリスナー ---
hamburgerButton.addEventListener("click", () => {
    const isMenuOpen = menu.classList.contains("MenuIsOpen");
    hamburgerButton.classList.toggle("MenuIsActive");

    if (isMenuOpen) {
        // --- 閉じる処理 (逆再生) ---
        hamburgerButton.classList.remove("MenuIsActive");
        header.classList.remove("MenuIsActive");        
        lenis.start();

        // 逆再生 (閉じるアニメーション) が完了したときに実行
        menuTimeline.timeScale(1).reverse().eventCallback("onReverseComplete", function() {
            menu.classList.remove("MenuIsOpen"); 
        });

    } else {
        // --- 開く処理 (再生) ---
        hamburgerButton.classList.add("MenuIsActive");
        header.classList.add("MenuIsActive");
        menu.classList.add("MenuIsOpen");
        lenis.stop();
        menuTimeline.timeScale(1).play();
    }
});

	// スプリットテキスト
	const navItems = document.querySelectorAll(".nav_item");

	const timelines = new Map();
	const splitInstances = new Map();

	/**
	 * SplitTextを適用し、ホバーアニメーションのTimelineを作成・取得する関数
	 * @param {HTMLElement} item - .nav_item要素
	 * @returns {gsap.Timeline} アニメーション用Timeline
	 */
	function getTimeline(item) {
		if (timelines.has(item)) {
			return timelines.get(item);
		}

		const jaText = item.querySelector(".nav_link .ja");
		if (!jaText) return null;

		if (splitInstances.has(item)) {
			splitInstances.get(item).revert();
		}
		const split = new SplitText(jaText, {
			type: "chars",
			charsClass: "char",
		});
		splitInstances.set(item, split);

		const tl_nav = gsap.timeline({ paused: true });

		tl_nav.fromTo(split.chars,
			{
				opacity: 0,
				y: "50%",
			},
			{
				opacity: 1,
				y: "0%",
				stagger: 0.05, // 1文字ごとの遅延
				duration: 0.4, // 短くしてホバーに反応しやすく
				ease: "power3.out",
			}
		);

		timelines.set(item, tl_nav);
		return tl_nav;
	}

	/**
	 * マウスイベントリスナーの設定
	 */
	navItems.forEach(item => {
		// マウスエンター時の処理 (ホバー開始)
		item.addEventListener('mouseenter', () => {
			const tl = getTimeline(item);
			if (tl) {
				// アニメーションを最初から再生
				tl.restart();
			}
		});

	});

	// -------------------------------------------------------------------
	// スプリットテキスト (フッターナビゲーション用)

	const footerNavItems = document.querySelectorAll(".footer_item");

	const footerTimelines = new Map();
	const footerSplitInstances = new Map();

	/**
	 * SplitTextを適用し、ホバーアニメーションのTimelineを作成・取得する関数
	 * @param {HTMLElement} item - .footer_item要素
	 * @returns {gsap.Timeline} アニメーション用Timeline
	 */

	function getFooterTimeline(item) {
		if (footerTimelines.has(item)) {
			return footerTimelines.get(item);
		}

		const jaText = item.querySelector(".footer_link .ja");
		if (!jaText) return null;

		if (footerSplitInstances.has(item)) {
			footerSplitInstances.get(item).revert();
		}
		const split = new SplitText(jaText, {
			type: "chars",
			charsClass: "char",
		});
		footerSplitInstances.set(item, split);

		const tl_footer_nav = gsap.timeline({ paused: true });

		tl_footer_nav.fromTo(split.chars,
			{
				opacity: 0,
				y: "50%",
			},
			{
				opacity: 1,
				y: "0%",
				stagger: 0.05,
				duration: 0.4,
				ease: "power3.out",
			}
		);

		footerTimelines.set(item, tl_footer_nav);
		return tl_footer_nav;
	}

	/**
	 * マウスイベントリスナーの設定
	 */
	footerNavItems.forEach(item => {
		// マウスエンター時の処理 (ホバー開始)
		item.addEventListener('mouseenter', () => {
			const tl = getFooterTimeline(item);
			if (tl) {
				tl.restart();
			}
		});

	});

	// ------------------------------------
	//  Swiper　ファーストビュー
	// ------------------------------------
	const swiperElement = document.querySelector('.mySwiper');

	if (swiperElement) {
		const swiperInstance = new Swiper('.mySwiper', {
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

			on: {
				init: function () {
					startSlideZoom(this.slides[this.activeIndex]);
				},
				slideChangeTransitionEnd: function () {
					startSlideZoom(this.slides[this.activeIndex]);
				}
			}
		});

		/**
		 * 現在のアクティブスライド内の画像をズームインさせる
		 * @param {HTMLElement} slideEl - Swiperスライド要素
		 */
		function startSlideZoom(slideEl) {
			const target = slideEl.querySelector('img');

			if (target) {
				gsap.fromTo(target,
					{ scale: 1.0, transformOrigin: 'center center' },
					{
						scale: 1.1,
						duration: 3.0,
						ease: "linear"
					}
				);
			}
		}

	}
	// ------------------------------------
	//  historySwiper
	// ------------------------------------

	const historySwiperElement = document.querySelector('.historySwiper');

	if (historySwiperElement) {
		const historySwiper = new Swiper('.historySwiper', {
			modules: [Navigation, Pagination],

			loop: false,
			spaceBetween: 0,
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
	// Introセクションのパララックス演出
	// --------------------------------------------------
	const introSectionPara = document.querySelector('.intro');

	if (introSectionPara) {
		// 1. 背景画像をゆっくり動かす（奥行き感）
		gsap.to(introSectionPara, {
			backgroundPosition: "50% 100%", // 背景を下へ移動させる
			ease: "none",
			scrollTrigger: {
				trigger: introSectionPara,
				start: "top bottom", // セクションの上が画面下に入ったら開始
				end: "bottom top",   // セクションの下が画面上に抜けたら終了
				scrub: 1,
			}
		});

		// 女性の画像（ゆっくり上がる）
		gsap.fromTo(".img_woman",
			{ y: 50 }, // 開始位置（少し下から）
			{
				y: -50, // 終了位置（少し上へ）
				scrollTrigger: {
					trigger: introSectionPara,
					start: "top bottom",
					end: "bottom top",
					scrub: 1.5,
				}
			}
		);

		// 男性の画像（速く上がる）
		gsap.fromTo(".img_man",
			{ y: 100 },
			{
				y: -100,
				scrollTrigger: {
					trigger: introSectionPara,
					start: "top bottom",
					end: "bottom top",
					scrub: 2,
				}
			}
		);

		// 研究者の画像（中くらいの速度）
		gsap.fromTo(".img_lab",
			{ y: 30 },
			{
				y: -30,
				scrollTrigger: {
					trigger: introSectionPara,
					start: "top bottom",
					end: "bottom top",
					scrub: 1,
				}
			}
		);
	}

	// --------------------------------------------------
	// productsセクションの切り替え
	// --------------------------------------------------

	const section = document.querySelector('.section_home_products');
	const innerProduct = document.querySelector('.inner_home_product');
	const steps = gsap.utils.toArray('.img_box .product_step');

	if (section && innerProduct && steps.length > 0) {
		// ★初期設定: 1枚目の画像だけを表示しておく
		gsap.set(steps[0], { opacity: 1 });

		// タイムラインの作成
		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				pin: innerProduct,
				start: "top top",
				end: "+=150%",// スクロール量（画像の枚数に応じて調整。例: 200% = 2画面分スクロール）
				scrub: 0.5,// スクロールとアニメーションを連動（数値で慣性を調整）
				anticipatePin: 1// ピン留めのガタつき防止
			}
		});

		// アニメーションの定義
		// 2枚目以降を順番にフェードインさせる
		steps.forEach((step, index) => {
			if (index === 0) return; // 1枚目は最初から出ているのでスキップ
			const prevStep = steps[index - 1];

			let holdDuration = (index === 1) ? 1 : 0.5;
			// let holdDuration = (index === 1) ? 2.5 : 1;
			tl.to({}, { duration: holdDuration });
			tl.to(prevStep, { opacity: 0, duration: 0.01 })
				.to(step, { opacity: 1, duration: 0.01 }, "<");
			tl.to({}, { duration: 0.5 });

		});
	}


	// --------------------------------------------------
	// 下層ページ見出し// --------------------------------------------------
	function titleAnimation() {

		const enTitle = document.querySelector(".title_en");
		const jaTitle = document.querySelector(".title_ja");

		if (!enTitle || !jaTitle) {
			return;
		}

		if (window.splitTitle) {
			window.splitTitle.revert();
		}
		window.splitTitle = new SplitText(enTitle, {
			type: "chars",
			charsClass: "char",
		});

		const tl = gsap.timeline({
			delay: 0.2
		});

		tl.fromTo(window.splitTitle.chars,
			{
				opacity: 0,
				y: "20%"
			},
			{
				opacity: 1,
				y: "0%",
				stagger: 0.08,
				duration: 0.4,
				ease: "power2.out"
			},
			0
		);

		tl.to(jaTitle,
			{
				opacity: 1,
				duration: 0.5,
				ease: "power2.out"
			},
			// AとBを同時に開始したい場合は '<' を使用します。
			// Contactの文字がすべて出終わってから少し遅れて開始したい場合は '>-0.2' などを使用します。
			// ここでは、Contactのアニメーション中に徐々にフェードインするように調整します。
			0.3// Contactのアニメーション開始から0.1秒後に開始
		);
	}

	const enTitleCheck = document.querySelector(".title_en");
	if (enTitleCheck) {
		// .title_enが存在する場合のみ実行
		titleAnimation();
	}

	// --------------------------------------------------
	// 下から上にフェイドイン// --------------------------------------------------
// 1. .fade_title のアニメーション設定
const fadeTitles = gsap.utils.toArray(".fade_title");

fadeTitles.forEach((title, index) => {
    gsap.from(title, {
        duration: 1,
        y: 50, 
        opacity: 0,
        // 最初の要素が遅延 0.4秒、2番目が 0.5秒...と、要素の出現順にわずかに遅延を設ける
        delay: 0.2 + (index * 0.1), 
        ease: "power2.out",
        
        scrollTrigger: {
            trigger: title,
            start: "top 90%", 
            toggleActions: "play none none none" 
        }
    });
});


// 2. .fade_text のアニメーション設定
const fadeTexts = gsap.utils.toArray(".fade_text");

fadeTexts.forEach((text, index) => {
    gsap.from(text, {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.4 + (index * 0.1),
        ease: "power2.out",
        
        scrollTrigger: {
            trigger: text,
            start: "top 90%",
            toggleActions: "play none none none"
        }
    });
});

	function setupFadeAnimation() {
		const fadeTargets = gsap.utils.toArray(".fade_contents");

		fadeTargets.forEach((target) => {
			gsap.from(target, {
				// アニメーションの初期状態
				duration: 1.0,
				y: 30,
				opacity: 0,
				delay: 0.5,
				ease: "power2.out",

				scrollTrigger: {
					trigger: target,
					start: "top 90%",
					toggleActions: "play none none none",
					// markers: true,
				}
			});
		});
	}

	// 実行
	setupFadeAnimation();

	// --------------------------------------------------
	// TOP FAQアニメーション// --------------------------------------------------
	function setupFaqAnimation() {
		// アニメーション対象のラッパー要素をすべて取得
		const faqWrappers = document.querySelectorAll(".faq_list .faq_item_wrap");

		if (faqWrappers.length === 0) return;

		gsap.from(faqWrappers, {
			// 【初期状態】
			scale: 0.9,
			opacity: 0,
			y: 20,
			duration: 0.8,
			ease: "back.out(1)",
			stagger: 0.3,

			scrollTrigger: {
				trigger: ".faq_list",
				start: "top 80%",
				toggleActions: "play none none none", // 一度だけ再生
				// markers: true,     // デバッグ用マーカーを表示（確認後削除）
			}
		});
	}

	// 実行
	setupFaqAnimation();

// 言語切り替え
function translatePage(targetLang) {
    // 翻訳したい要素（クラス名 'translatable' を持つ要素）を取得
    const elementsToTranslate = document.querySelectorAll('.translatable');
    const texts = Array.from(elementsToTranslate).map(el => el.textContent);
    
    // ページを日本語に戻す場合は翻訳は不要
    if (targetLang === 'ja') {
        // 日本語のオリジナルテキストに戻す処理を実装する必要があります。
        // （ここでは省略しますが、実際にはオリジナルテキストをどこかに保存しておく必要があります）
        console.log('日本語に戻す処理を実行');
        return; 
    }

    // 送信データ
    const requestData = {
        texts: texts,
        target: targetLang
    };

    // PHPエンドポイントへデータを送信
    fetch('form_handler/server_endpoint_for_translation.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('サーバーエラー: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.translations) {
            // 翻訳結果をページに反映
            elementsToTranslate.forEach((el, index) => {
                // 翻訳後のテキストで要素の内容を更新
                el.textContent = data.translations[index].translatedText;
            });
            console.log('翻訳完了。');
        } else if (data.error) {
            alert('翻訳APIエラー: ' + data.error);
        }
    })
    .catch(error => {
        alert('通信または翻訳エラーが発生しました。詳細はコンソールを確認してください。');
        console.error('Error:', error);
    });
}

	// --------------------------------------------------
	// 問い合わせフォームの画面切り替え// 
	// --------------------------------------------------

	// const form = document.querySelector('.contact_form');
	// if (form) {
	// 	const inputSection = form.parentElement.parentElement; // .form_wrapperを含む親要素 (.inner_contact)
	// 	const confirmSection = document.getElementById('confirm');
	// 	const completeSection = document.getElementById('complete');
	// 	const confirmContent = document.getElementById('confirm_content');
	// 	const backButton = document.getElementById('back_btn');
	// 	const sendButton = document.getElementById('send_btn');

	// 	// 初期表示設定
	// 	// 確認画面と完了画面を非表示にする
	// 	confirmSection.style.display = 'none';
	// 	completeSection.style.display = 'none';

	// 	// フォームの送信（入力内容の確認ボタン）
	// 	form.addEventListener('submit', (event) => {
	// 		event.preventDefault(); // フォームの送信をキャンセル

	// 		// 1. バリデーションチェックをここで行う (ここでは省略)
	// 		if (!validateForm()) {
	// 			return; // バリデーションに失敗したら処理を終了
	// 		}

	// 		// 2. 入力内容を確認画面に反映
	// 		displayConfirmContent();

	// 		// 3. 画面を切り替える
	// 		inputSection.style.display = 'none';  // 入力画面を非表示
	// 		confirmSection.style.display = 'block'; // 確認画面を表示

	// 		// ヘッダーやパンくずリストなどがある場合、ページトップにスクロール
	// 		window.scrollTo({ top: 0, behavior: 'smooth' });
	// 	});

	// 	// 戻るボタンの処理
	// 	backButton.addEventListener('click', () => {
	// 		// 画面を切り替える
	// 		confirmSection.style.display = 'none'; // 確認画面を非表示
	// 		inputSection.style.display = 'block';  // 入力画面を表示

	// 		// ページトップにスクロール
	// 		window.scrollTo({ top: 0, behavior: 'smooth' });
	// 	});

	// 	// 送信するボタンの処理 (実際にはサーバーサイドの処理が必要)
	// 	sendButton.addEventListener('click', () => {
	// 		// 実際にはここでサーバーへデータを送信する処理 (fetch/XMLHttpRequestなど) を実行

	// 		// サーバーサイドの処理が成功したと仮定し、完了画面へ移行

	// 		// 画面を切り替える
	// 		confirmSection.style.display = 'none'; // 確認画面を非表示
	// 		completeSection.style.display = 'block'; // 完了画面を表示

	// 		// ページトップにスクロール
	// 		window.scrollTo({ top: 0, behavior: 'smooth' });
	// 	});

	// 	// 入力内容を整形して確認画面に表示する関数
	// 	function displayConfirmContent() {
	// 		let contentHTML = '<table>';

	// 		// フォーム内の各入力フィールドをループして値を取得
	// 		const fields = [
	// 			{ id: 'name', label: '氏名' },
	// 			{ id: 'company', label: '会社名' },
	// 			{ id: 'address', label: '住所' },
	// 			{ id: 'tel', label: '電話番号' },
	// 			{ id: 'email', label: 'メールアドレス' },
	// 			{ id: 'message', label: 'お問い合わせ内容' },
	// 		];

	// 		fields.forEach(field => {
	// 			const element = document.getElementById(field.id);
	// 			if (element) {
	// 				let value = element.value;

	// 				// textareaの改行をHTMLの<br>に変換
	// 				if (field.id === 'message') {
	// 					value = value.replace(/\n/g, '<br>');
	// 				}

	// 				contentHTML += `
    //                 <tr>
    //                     <th>${field.label}</th>
    //                     <td>${value || '未入力'}</td>
    //                 </tr>
    //             `;
	// 			}
	// 		});

	// 		// プライバシーポリシーの同意チェック
	// 		const agreeChecked = document.getElementById('agree').checked;
	// 		contentHTML += `
    //         <tr>
    //             <th>プライバシーポリシー</th>
    //             <td>${agreeChecked ? '同意済み' : '未同意'}</td>
    //         </tr>
    //     `;

	// 		contentHTML += '</table>';
	// 		confirmContent.innerHTML = contentHTML;
	// 	}

	// 	// 簡易バリデーション (必須項目のみ)
	// 	function validateForm() {
	// 		let isValid = true;
	// 		const requiredFields = ['name', 'tel', 'email', 'message'];

	// 		requiredFields.forEach(id => {
	// 			const input = document.getElementById(id);
	// 			const errorElement = document.getElementById(id + '_error');
	// 			if (input.value.trim() === '') {
	// 				errorElement.textContent = '必須項目です。';
	// 				input.style.borderColor = 'red';
	// 				isValid = false;
	// 			} else {
	// 				errorElement.textContent = '';
	// 				input.style.borderColor = '';
	// 			}
	// 		});

	// 		const agreeCheck = document.getElementById('agree');
	// 		const agreeError = document.getElementById('agree_error');
	// 		if (!agreeCheck.checked) {
	// 			agreeError.textContent = '同意が必要です。';
	// 			isValid = false;
	// 		} else {
	// 			agreeError.textContent = '';
	// 		}

	// 		return isValid;
	// 	}

	// 	// --------------------------------------------------
	// 	// フォーム送信処理 // --------------------------------------------------
	// 	const contactForm = document.getElementById('contact_form');
	// 	const phpEndpoint = 'form_handler/send_mail.php'; // ★ PHPファイルへのアクセスパス

	// 	if (contactForm) {
	// 		contactForm.addEventListener('submit', async function (e) {
	// 			e.preventDefault();

	// 			// 送信ボタンを無効化して多重送信を防ぐ
	// 			const submitButton = e.submitter;
	// 			submitButton.disabled = true;

	// 			const formData = new FormData(contactForm);

	// 			try {
	// 				const response = await fetch(phpEndpoint, {
	// 					method: 'POST',
	// 					body: formData,
	// 				});

	// 				const result = await response.json();

	// 				if (response.ok && result.success) {
	// 					alert('お問い合わせを正常に送信しました。');
	// 					contactForm.reset();
	// 				} else {
	// 					alert('送信に失敗しました。');
	// 					console.error('サーバーエラー:', result.message);
	// 				}
	// 			} catch (error) {
	// 				alert('通信エラーが発生しました。ネットワークを確認してください。');
	// 				console.error('通信エラー:', error);
	// 			} finally {
	// 				// 送信ボタンを元に戻す
	// 				submitButton.disabled = false;
	// 			}
	// 		});
	// 	}
	// }
});

