"use strict";

import '../css/destyle.css';
import '../css/style.css';

// Swiperのインポート
import Swiper from 'swiper';
import 'swiper/css'; 
import 'swiper/css/navigation'; 
import 'swiper/css/pagination'; 
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
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


  // --------------------------------------------------
  //  Swiper (スライダー) の処理
  // --------------------------------------------------
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

});
