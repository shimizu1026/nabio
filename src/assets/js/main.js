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
	const menuItems = document.querySelectorAll(".hamburger_item");
	const contactArea = document.querySelector(".hamburger_contact_area");
	const topBar = document.querySelector(".hamburger_top_bar");
	const overlay = document.querySelector(".header_overlay")
	const menuTimeline = gsap.timeline({ paused: true });
	const CLOSE_TIME_SCALE = 1.4; 

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

	// --- 開閉用の共通関数 ---
	function openMenu() {
		hamburgerButton.classList.add("MenuIsActive");
		header.classList.add("MenuIsActive");
		menu.classList.add("MenuIsOpen");
		lenis.stop();
		menuTimeline.timeScale(1).play();
	}

	function closeMenu() {
		if (!menu.classList.contains("MenuIsOpen")) return;

		hamburgerButton.classList.remove("MenuIsActive");
		header.classList.remove("MenuIsActive");
		lenis.start();

		// 逆再生 (閉じるアニメーション) が完了したときに実行
		menuTimeline.timeScale(CLOSE_TIME_SCALE).reverse().eventCallback("onReverseComplete", function () {
			menu.classList.remove("MenuIsOpen");
		});
	}

	// --- クリックイベントリスナー（ハンバーガーアイコン） ---
	hamburgerButton.addEventListener("click", (event) => {
		event.stopPropagation(); // 外側クリック判定にイベントが届かないようにする

		const isMenuOpen = menu.classList.contains("MenuIsOpen");
		if (isMenuOpen) {
			// --- 閉じる処理 ---
			closeMenu();
		} else {
			// --- 開く処理 ---
			openMenu();
		}
	});

	// --- クリックイベントリスナー（オーバーレイ） ---
	if (overlay) {
		overlay.addEventListener("click", (event) => {
			event.stopPropagation();
			closeMenu();
		});
	}

	// --- クリックイベントリスナー（画面のどこかをクリックしたとき） ---
	document.addEventListener("click", (event) => {
		// メニューが開いていないときは何もしない
		if (!menu.classList.contains("MenuIsOpen")) return;

		const target = event.target;

		// ハンバーガー内をクリックした場合は閉じない
		if (menu.contains(target) || hamburgerButton.contains(target)) {
			return;
		}

		// それ以外（外側）をクリックした場合は閉じる
		closeMenu();
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

		// 2枚目の画像（速く上がる）
		gsap.fromTo(".img_product",
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

		// 3枚目の画像（中くらいの速度）
		gsap.fromTo(".img_tree",
			{ y: 60 },
			{
				y: -60,
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
			// AとBを同時に開始したい場合は '<' を使用
			// Contactの文字がすべて出終わってから少し遅れて開始したい場合は '>-0.2' などを使用
			0.3
		);
	}

	const enTitleCheck = document.querySelector(".title_en");
	if (enTitleCheck) {
		// .title_enが存在する場合のみ実行
		titleAnimation();
	}

// --------------------------------------------------
// GIFアニメーションのフェードアップ（左から順に）
// --------------------------------------------------
function setupGifAnimation() {
  const figures = gsap.utils.toArray(".animation_box figure");

  if (figures.length === 0) return;

  gsap.from(figures, {
    y: 40,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    stagger: 0.3,
    scrollTrigger: {
      trigger: ".animation_box", 
      start: "top 80%", 
      toggleActions: "play none none none",
    }
  });
}

// 実行
setupGifAnimation();

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
	function setupFeaturesAnimation() {

		const featuresWrappers = document.querySelectorAll(".features_list .features_item_wrap");

		if (featuresWrappers.length === 0) return;

		const middleItem = featuresWrappers[1]; // 2番目の要素を取得

		gsap.set(middleItem, {
			y: 40
		});

		gsap.from(featuresWrappers, {
			scale: 0.9,
			opacity: 0,
			y: 20,
			duration: 0.8,
			ease: "back.out(1)",
			stagger: 0.3,

			scrollTrigger: {
				trigger: ".features_list",
				start: "top 80%",
				toggleActions: "play none none none", // 一度だけ再生
				//markers: true,      デバッグ用マーカーを表示（確認後削除）
			}
		});
	}

	// 実行
	setupFeaturesAnimation();
	
});

