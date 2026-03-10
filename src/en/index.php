<?php
// 英語トップページ
$lang = 'en';
$basePath = '../';
?>
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Nabio Co., Ltd. is committed to developing and selling products that utilize the natural power of natto."
    />
    <title>Nabio Co., Ltd.</title>

    <script src="../assets/js/main.js" type="module"></script>
    <script type="module" src="../assets/js/loadcomponent.js"></script>

    <meta property="og:title" content="Nabio Co., Ltd." />
    <meta
      property="og:description"
      content="Nabio Co., Ltd. is committed to developing and selling products that utilize the natural power of natto."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="http://natofemin.com/" />
    <meta
      property="og:image"
      content="http://www.natofemin.com/assets/images/ogp.jpg"
    />
    <meta name="twitter:card" content="summary_large_image" />

    <link rel="icon" type="image/svg+xml" href="../assets/images/favicon.svg" />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="../assets/images/apple-touch-icon.png"
    />
  </head>

  <body class="lang_en_page">
    <main class="main" id="top">
      <div class="opening_mask"></div>
      <?php include __DIR__ . '/../components/header.php'; ?>
      <div class="header_overlay"></div>
      <div class="swiper mySwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide first zoom">
            <picture>
              <source
                srcset="../assets/images/fv_1.webp"
                media="(min-width: 1200px)"
              />
              <img
                src="../assets/images/fv_1_sp.webp"
                alt=""
                width="834"
                height="1195"
                decoding="async"
              />
            </picture>
            <div class="copy">
              <p class="text">
                I want to support
                <br />
                <span class="red">your health.</span>
              </p>
              <span class="sub_text">
                Nabio Co., Ltd. is committed to developing and selling products
                that
                <br />
                utilize the natural power of natto.
              </span>
            </div>
          </div>
          <div class="swiper-slide second zoom">
            <div class="copy">
              <p class="text">An intestinal factory</p>
              <span class="sub_text">
                The body has an internal mechanism that supports it, and we are
                focusing on how this mechanism works.
              </span>
            </div>
            <picture>
              <source
                srcset="../assets/images/fv_2.webp"
                media="(min-width: 980px)"
              />
              <img
                src="../assets/images/fv_2_sp.webp"
                alt=""
                width="834"
                height="1195"
                decoding="async"
              />
            </picture>
          </div>
          <div class="swiper-slide third zoom">
            <picture>
              <source
                srcset="../assets/images/fv_3.webp"
                media="(min-width: 980px)"
              />
              <img
                src="../assets/images/fv_3_sp.webp"
                alt=""
                width="834"
                height="1195"
                decoding="async"
              />
            </picture>
            <div class="copy">
              <p class="text">
                Manufacturing system based
                <br />
                on our own standards
              </p>
              <span class="sub_text">
                From raw materials to manufacturing, our reliable quality comes
                from
                <br />
                a solid management system based on our own standards.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div id="scroll_wrapper">
        <div class="top_curve"></div>
        <div class="scroll_contents">
          <section class="intro">
            <p class="intro_copy fade_title">
              Nabio products
              <br />
              contribute to the health of people around the world.
            </p>
            <p class="intro_text fade_text">
              Our company has been manufacturing health food ingredients derived
              from natto.
              <br />
              One gram of our product contains over 10 billion natto bacteria.
              <br />
              This is equivalent to the number of natto bacteria found in one
              pack of commercially available natto.
              <br />
              We further apply ultra-low temperature processing to make the
              natto bacteria more likely to multiply in the intestines.
              <br />
              Our unique product is exported as a supplement ingredient, even to
              countries overseas where natto is not a common food staple.
            </p>
            <div class="image_gallery fade_contents">
              <div class="img_woman">
                <img
                  src="../assets/images/intro_woman.webp"
                  alt="Image of a woman taking supplements"
                  width="650"
                  height="434"
                  decoding="async"
                />
              </div>
              <div class="flex_container">
                <img
                  src="../assets/images/intro_man.webp"
                  alt="サプリメントを飲む男性のイメージ"
                  width="420"
                  height="280"
                  decoding="async"
                  class="img_man"
                />
                <img
                  src="../assets/images/intro_study.webp"
                  alt="研究者のイメージ"
                  width="530"
                  height="363"
                  decoding="async"
                  class="img_lab"
                />
              </div>
            </div>
            <div class="animation_box">
              <div class="anime01">
                <img src="../assets/images/anime01.gif" alt="" decoding="async" />
              </div>
              <!-- /.anime01 -->
              <div class="anime02">
                <img src="../assets/images/anime02.gif" alt="" decoding="async" />
              </div>
              <!-- /.anime02 -->
              <div class="anime03">
                <img src="../assets/images/anime03.gif" alt="" decoding="async" />
              </div>
              <!-- /.anime03 -->
            </div>
            <!-- /.animation_box -->
          </section>
          <!-- /.intro -->
          <section class="section_home_products">
            <div class="text_inner">
              <div>
                <div class="title_box fade_title">
                  <h2 class="en">
                    Products
                    <span class="ja">商品紹介</span>
                  </h2>
                </div>
                <!-- /.title_box -->
                <p class="mt24 fade_text section_text">
                  Nabio products contain a balanced amount of nattokinase, FAS,
                  vitamin K2,
                  <br class="pc_only" />
                  polyamines, and natto bacteria.
                </p>
              </div>
              <a href="products.php" class="button">
                <span>View More</span>
              </a>
            </div>
            <div class="inner_home_product">
              <div class="img_box fade_contents">
                <div class="text_inner">
                  <h3 class="product_name">NATOFEMIN</h3>
                  <p class="product_text">
                    Nattokinase is an enzyme produced by natto bacteria.
                    <br />
                    Nattokinase is produced as natto bacteria grow.
                    <br />
                    In addition to nattokinase, natto bacteria also produce
                    healthful ingredients such as vitamin K2 and B vitamins.
                    <br />
                    Nattofemin PA is a product made from concentrated components
                    produced by natto bacteria.
                  </p>
                </div>
                <figure class="product_step">
                  <img
                    src="../assets/images/natofemin.webp"
                    alt="NATOFEMIN Image"
                    width="400"
                    height="330"
                    decoding="async"
                    loading="lazy"
                    class="product_img is_active"
                  />
                </figure>
              </div>
              <!-- /.img_box -->
              <div class="img_box fade_contents">
                <div class="text_inner">
                  <h3 class="product_name">Myoka Koso</h3>
                  <p class="product_text">
                    This is a soft capsule product made from our powder.
                    <br />
                    This is an enteric-coated capsule product that complies with
                    the latest edition of the Japanese Pharmacopoeia.
                    <br />
                    The natto bacteria contained in our product produce vitamin
                    K in the intestines, so it cannot be consumed while taking
                    warfarin.
                  </p>
                  <div class="howto">
                    <h4 class="howto_heading">How to consume our products</h4>
                    <ul class="howto_list">
                      <li class="howto_item">
                        Take two tablets a day after meals.The carbohydrates
                        contained in food act as food for the natto bacteria to
                        grow.
                      </li>
                      <li class="howto_item">
                        You can also take it after eating something sour.
                        <br />
                        Nattokinase is destroyed when it comes into contact with
                        acidic fluids such as stomach acid.
                        <br />
                        Natto bacteria are not killed by strong acid and
                        continue to grow in the small intestine.
                      </li>
                      <li class="howto_item">
                        Take it at the same time every day.
                        <br />
                        Natto bacteria grow in the intestines and continuously
                        produce healthy components such as nattokinase and
                        vitamin K for more than 24 hours,
                        <br />
                        but the number of natto bacteria gradually decreases. It
                        is recommended to replenish natto bacteria daily.
                      </li>
                    </ul>
                  </div>
                </div>

                <figure class="product_step">
                  <img
                    src="../assets/images/myouka.webp"
                    alt="Myoka Koso Image"
                    width="400"
                    height="305"
                    decoding="async"
                    loading="lazy"
                    class="product_img"
                  />
                </figure>
              </div>
              <!-- /.img_box -->
            </div>
          </section>
          <!-- /.section_home_products -->
          <div class="products_wrapper">
            <section class="section_home_company">
              <div class="inner_home_company">
                <div class="text_inner">
                  <div class="title_box fade_title">
                    <h2 class="en">
                      Company
                      <span class="ja">会社概要</span>
                    </h2>
                  </div>
                  <p class="company_copy fade_text">
                    The results of many years of
                    <br />
                    research into natto
                    <br class="pc_only" />
                    bacteria have been commercialized.
                  </p>
                  <p class="section_text fade_text">
                    Nabio Co., Ltd. is committed to developing and selling
                    products that utilize the natural power of natto, and
                    delivers them to the global market from China and other
                    Asian countries.
                  </p>
                  <a href="company.php" class="button">
                    <span>View More</span>
                  </a>
                </div>
                <div class="img_wrapper fade_contents">
                  <img
                    src="../assets/images/home_company.webp"
                    alt=""
                    width="600"
                    height="532"
                    decoding="async"
                    style="flex: 1;"
                  />
                </div>
              </div>
            </section>
            <!-- /.section_company -->
          </div>
          <section class="section_features">
            <div class="inner_features">
              <div class="title_box fade_title">
                <h2 class="en">
                  Nabio product features
                  <span class="ja">ナビオ製品の特長</span>
                </h2>
                <!-- <h2 class="title_center_ja">Nabio product features</h2> -->
              </div>
              <ul class="features_list mt48">
                <li class="features_item_wrap">
                  <div class="features_item">
                    <p class="features_text">
                      The natto bacteria contained in Nabio products are dormant
                      natto bacteria (called spore-forming bacteria). Dormant
                      natto bacteria cannot be killed by heat of 100°C or strong
                      acidity of pH 1.
                    </p>
                  </div>
                </li>
                <li class="features_item_wrap translate">
                  <div class="features_item">
                    <p class="features_text">
                      Nabio's products contain tens of billions of natto
                      bacteria per gram, more than the world's population.
                    </p>
                  </div>
                </li>
                <li class="features_item_wrap">
                  <div class="features_item">
                    <p class="features_text">
                      It is the same as the food natto in that it is made by
                      fermenting soybeans with natto bacteria, but it is
                      produced using a special technique that maximizes the
                      number of natto bacteria.
                    </p>
                  </div>
                </li>
              </ul>
              <!-- /.features_list -->
              <a href="faq.php" class="button fade_contents">
                <span>Frequently asked questions</span>
              </a>
            </div>
          </section>
          <!-- /.section_features -->
          <div id="contact_placeholder" class="gray_gradient"></div>
          <div id="footer_placeholder"></div>
        </div>
        <!-- /.scroll_contents -->
      </div>
    </main>
  </body>
</html>

