<?php
// 共通ヘッダー
// 各ページ側で $lang と $basePath を定義してから include してください。
// 例）日本語トップ: $lang = 'ja'; $basePath = ''; 英語トップ: $lang = 'en'; $basePath = '../';
?>
<header class="header">
  <div class="header_inner">
    <div class="nav_wrapper">
      <h1 class="header_logo">
        <a href="<?php echo $basePath; ?>index.php">
          <img
            src="<?php echo $basePath; ?>assets/images/logo.svg"
            alt="株式会社ナビオのロゴ"
            width="145"
            height="51"
            decoding="async"
            loading="lazy"
          />
        </a>
      </h1>

      <nav class="nav">
        <ul class="nav_list">
          <li class="nav_item">
            <a href="<?php echo $basePath; ?>products.php" class="nav_link">
              <span class="ja">商品紹介</span>
              <span class="en">Products</span>
            </a>
          </li>
          <li class="nav_item">
            <a href="<?php echo $basePath; ?>faq.php" class="nav_link">
              <span class="ja">よくある質問</span>
              <span class="en">FAQ</span>
            </a>
          </li>
          <li class="nav_item">
            <a href="<?php echo $basePath; ?>company.php" class="nav_link">
              <span class="ja">会社概要</span>
              <span class="en">Company</span>
            </a>
          </li>
          <li class="nav_item">
            <a href="<?php echo $basePath; ?>contact.php" class="nav_link">
              <span class="ja">お問い合わせ</span>
              <span class="en">Contact</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="header_contact">
      <div class="header_contact_inner">
        <a href="tel:0829425833" class="tel">082-942-5833</a>
        <a href="<?php echo $basePath; ?>contact.php" class="mail">
          <img
            src="<?php echo $basePath; ?>assets/images/icon_mail.svg"
            alt="お問い合わせフォームのリンク"
            width="25"
            height="25"
            decoding="async"
            loading="lazy"
          />
        </a>
      </div>

      <ul class="lang_links">
        <li class="link_ja">
          <a href="<?php echo $basePath; ?>../index.php">JP</a>
        </li>
        <li class="link_en">
          <a href="<?php echo $basePath; ?>../en/index.php">EN</a>
        </li>
        <li class="link_zh">
          <a href="<?php echo $basePath; ?>../zh/index.php">中文</a>
        </li>
      </ul>
    </div>
  </div>
  <button class="hamburger_button">
    <div class="button_line_top"></div>
    <div class="button_line_bottom"></div>
  </button>
  <div class="hamburger_contents">
    <div class="hamburger_top_bar">
      <div class="hamburger_logo">
        <a href="<?php echo $basePath; ?>index.php">
          <img
            src="<?php echo $basePath; ?>assets/images/logo.svg"
            alt="株式会社ナビオのロゴ"
            width="145"
            height="51"
            decoding="async"
            loading="lazy"
          />
        </a>
      </div>
      <div class="link_box">
        <ul class="lang_links">
          <li class="link_ja">
            <a href="<?php echo $basePath; ?>../index.php">JP</a>
          </li>
          <li class="link_en">
            <a href="<?php echo $basePath; ?>../en/index.php">EN</a>
          </li>
          <li class="link_zh">
            <a href="<?php echo $basePath; ?>../zh/index.php">中文</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="hamburger_contact_area">
      <div class="hamburger_contact">
        <a href="tel:0829425833" class="tel">082-942-5833</a>
        <?php if ($lang === 'en'): ?>
          <p>Reception hours: 9:00 AM to 5:00 PM (excluding weekends and holidays)</p>
          <a href="<?php echo $basePath; ?>contact.php" class="mail button">
            <span>Email form</span>
          </a>
        <?php elseif ($lang === 'zh'): ?>
          <p>接待时间：上午 9:00 至下午 5:00（周末及节假日除外）</p>
          <a href="<?php echo $basePath; ?>contact.php" class="mail button">
            <span>电子邮件表单</span>
          </a>
        <?php else: ?>
          <p>受付時間:AM9:00～PM5:00まで（土日祝を）除く</p>
          <a href="<?php echo $basePath; ?>contact.php" class="mail button">
            <span>メールフォーム</span>
          </a>
        <?php endif; ?>
      </div>
    </div>
    <ul class="hamburger_list">
      <li class="hamburger_item">
        <a href="<?php echo $basePath; ?>products.php">
          <span class="ja">商品紹介</span>
          <span class="en">Products</span>
        </a>
      </li>
      <li class="hamburger_item">
        <a href="<?php echo $basePath; ?>faq.php">
          <span class="ja">よくある質問</span>
          <span class="en">FAQ</span>
        </a>
      </li>
      <li class="hamburger_item">
        <a href="<?php echo $basePath; ?>company.php">
          <span class="ja">会社概要</span>
          <span class="en">Company</span>
        </a>
      </li>
      <li class="hamburger_item">
        <a href="<?php echo $basePath; ?>contact.php">
          <span class="ja">お問い合わせ</span>
          <span class="en">Contact</span>
        </a>
      </li>
    </ul>
  </div>
</header>

