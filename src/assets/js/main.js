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
		menu.classList.toggle("MenuIsOpen");
		header.classList.toggle("MenuIsActive");
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

		// 2. 画像をそれぞれ違う速度で浮遊
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
	const steps = gsap.utils.toArray('.img_box .product_step'); // 全ての画像ステップを取得

	if (section && innerProduct && steps.length > 0) {

		// ★初期設定: 1枚目の画像だけを表示しておく
		gsap.set(steps[0], { opacity: 1 });

		// タイムラインの作成
		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				pin: innerProduct,
				start: "top top",
				end: "+=300%",// スクロール量（画像の枚数に応じて調整。例: 200% = 2画面分スクロール）
				scrub: 0.5,// スクロールとアニメーションを連動（数値で慣性を調整）
				anticipatePin: 1// ピン留めのガタつき防止
			}
		});

		// アニメーションの定義
		// 2枚目以降を順番にフェードインさせる
		steps.forEach((step, index) => {
			if (index === 0) return; // 1枚目は最初から出ているのでスキップ
			const prevStep = steps[index - 1];

			let holdDuration = (index === 1) ? 2.5 : 1;
			tl.to({}, { duration: holdDuration });
			tl.to(prevStep, { opacity: 0, duration: 0.05 })
				.to(step, { opacity: 1, duration: 0.05 }, "<");
			tl.to({}, { duration: 1 });

		});
	}



	// --------------------------------------------------
	// フォーム送信処理 (追加するコード)// --------------------------------------------------
	const contactForm = document.getElementById('contact_form');
	const phpEndpoint = 'form_handler/send_mail.php'; // ★ PHPファイルへのアクセスパス

	if (contactForm) {
		contactForm.addEventListener('submit', async function (e) {
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

