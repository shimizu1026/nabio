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
	// 言語切り替えリンクのパス自動調整
	// --------------------------------------------------
	function updateLanguageLinks() {
		// 1. 現在のパスを取得
		const currentPath = window.location.pathname;

		// 2. ファイル名を抽出
		//    例: products.html (トップページで末尾が/の場合は index.html とする)
		let fileName = currentPath.substring(currentPath.lastIndexOf('/') + 1);
		if (!fileName || currentPath.endsWith('/')) {
			fileName = 'index.html';
		}

		// 3. ディレクトリ部分（ファイル名を除いたパス）を抽出
		let pathBase = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);

		// 正規表現の説明:
		// (en|zh) -> en または zh
		// \/$     -> パスの最後にあるスラッシュ
		// これにより、 ".../zh/" や ".../en/" を "/" に置き換える
		let commonDir = pathBase.replace(/(en|zh)\/$/, '');

		// 4. 環境判定（file:// プロトコルの場合のみ相対パス対応が必要）
		const isFileProtocol = window.location.protocol === 'file:';

		// リンクの先頭につけるプレフィックス
		let pathPrefix = '';
		if (!isFileProtocol) {

			if (!commonDir.startsWith('/')) {
				pathPrefix = '/';
			}
		} else {
			// file:// の場合は絶対パス(/)を削除する
			if (commonDir.startsWith('/')) {
				commonDir = commonDir.substring(1);
			}
		}

		// 5. リンク要素を取得
		const linksJa = document.querySelectorAll('.lang_link_ja');
		const linksEn = document.querySelectorAll('.lang_link_en');
		const linksZh = document.querySelectorAll('.lang_link_zh');

		// 6. リンクを生成
		// 日本語リンク (言語フォルダなし)
		linksJa.forEach(link => {
			link.href = `${pathPrefix}${commonDir}${fileName}`;
		});

		// 英語リンク (enフォルダを追加)
		linksEn.forEach(link => {
			link.href = `${pathPrefix}${commonDir}en/${fileName}`;
		});

		// 中国語リンク (zhフォルダを追加)
		linksZh.forEach(link => {
			link.href = `${pathPrefix}${commonDir}zh/${fileName}`;
		});
	}

	updateLanguageLinks();
	// function updateLanguageLinks() {
	//     // 1. 現在のパスと、現在の言語フォルダ（あれば）を取得
	//     const currentPath = window.location.pathname; // 例: /en/contact.html

	//     // 現在の言語ディレクトリ（例: 'en', 'zh'）を抽出。見つからなければ null
	//     const langMatch = currentPath.match(/^\/(en|zh)\//); 
	//     const currentLangDir = langMatch ? langMatch[1] : ''; // 'en' または 'zh' または '' (日本語)

	//     // 2. 言語ディレクトリを除いた「ファイル名」を含むベースのパスを生成
	//     let basePath;
	//     if (currentLangDir) {
	//         // 現在のパスから /en/ や /zh/ を取り除いた部分が basePath になる
	//         // 例: /en/contact.html -> contact.html
	//         basePath = currentPath.substring(`/${currentLangDir}/`.length);
	//     } else {
	//         // 日本語ページの場合、パス全体が basePath (例: contact.html)
	//         // ただし、トップページ(/)の場合は空になるため調整が必要
	//         basePath = currentPath.substring(1); // 先頭の '/' を除く
	//     }

	//     // トップページ(/)の場合の調整: basePath が空になるため 'index.html' とする
	//     if (basePath === '') {
	//         basePath = 'index.html'; 
	//     }

	//     // --- リンクの組み立てと上書き ---

	//     // 3. 各言語のリンク要素を取得 (ここは変更なし)
	//     const linksJa = document.querySelectorAll('.lang_link_ja');
	//     const linksEn = document.querySelectorAll('.lang_link_en');
	//     const linksZh = document.querySelectorAll('.lang_link_zh');

	//     // 4. 正しいパスを生成してhrefを上書き

	//     // 日本語リンク (ルートに戻る)
	//     linksJa.forEach(link => {
	//         // 日本語ページはルートからの相対パス
	//         link.href = `/${basePath}`; // 例: /contact.html
	//     });

	//     // 英語リンク
	//     linksEn.forEach(link => {
	//         // 英語ページは /en/ フォルダに入れる
	//         link.href = `/en/${basePath}`; // 例: /en/contact.html
	//     });

	//     // 中国語リンク
	//     linksZh.forEach(link => {
	//         // 中国語ページは /zh/ フォルダに入れる
	//         link.href = `/zh/${basePath}`; // 例: /zh/contact.html
	//     });
	// }

	// updateLanguageLinks();
	// function updateLanguageLinks() {
	// 	// 1. 現在のパスを取得 (例: "/contact.html" や "/en/contact.html")
	// 	const currentPath = window.location.pathname;

	// 	// 2. パスから言語ディレクトリ(/en/ や /zh/)を除去して「ベースのパス」を作る
	// 	// 正規表現: 行頭の "/en/" または "/zh/" を "/" に置換する
	// 	let basePath = currentPath.replace(/^\/(en|zh)\//, '/');

	// 	// ※もしルート(トップページ)にいて "/" で終わっている場合は index.html とみなす調整（必要に応じて）
	// 	// if (basePath === '/') basePath = '/index.html';

	// 	// 3. 各言語のリンク要素を取得
	// 	const linksJa = document.querySelectorAll('.lang_link_ja');
	// 	const linksEn = document.querySelectorAll('.lang_link_en');
	// 	const linksZh = document.querySelectorAll('.lang_link_zh');

	// 	// 4. 正しいパスを生成してhrefを上書き
	// 	// 日本語: ベースパスそのまま (例: /contact.html)
	// 	linksJa.forEach(link => {
	// 		link.href = basePath;
	// 	});

	// 	// 英語: /en + ベースパス (例: /en/contact.html)
	// 	linksEn.forEach(link => {
	// 		link.href = '/en' + (basePath === '/' ? '/' : basePath);
	// 	});

	// 	// 中国語: /zh + ベースパス (例: /zh/contact.html)
	// 	linksZh.forEach(link => {
	// 		link.href = '/zh' + (basePath === '/' ? '/' : basePath);
	// 	});
	// }

	// // 関数を実行
	// updateLanguageLinks();

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
	const overlay = document.querySelector(".overlay")

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
			menuTimeline.timeScale(1).reverse().eventCallback("onReverseComplete", function () {
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

