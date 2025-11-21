"use strict";

import '../css/destyle.css';
import '../css/style.css';

// Swiperのインポート
import Swiper from 'swiper';
import 'swiper/css'; 
import 'swiper/css/navigation'; 
import 'swiper/css/pagination'; 
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css/effect-fade';

document.addEventListener('componentsLoaded', function() {
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


});

