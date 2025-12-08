import { defineConfig } from 'vite';
import { resolve } from 'path';
export default defineConfig({
	base: "./",
	root: './src', //開発ディレクトリ設定
	build: {
		outDir: '../dist', //出力場所の指定
		cssCodeSplit: false,
		rollupOptions: { //ファイル出力設定
			output: {
				assetFileNames: (assetInfo) => {
					let extType = assetInfo.name.split('.')[1];
					//Webフォントファイルの振り分け
					if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
						extType = 'fonts';
					}
					if (/png|jpe?g|svg|gif|glb|webp|mov|jp|center|com|tiff|bmp|ico|mp4/i.test(extType)) {
						extType = 'images';
					}
					// if (/pdf/i.test(extType)) {
					//   extType = 'pdf';
					// }
					//ビルド時のCSS名を明記してコントロールする
					if (extType === 'css') {
						return `assets/css/style.css`;
					}
					return `assets/${extType}/[name][extname]`;
				},
				chunkFileNames: `assets/js/[name].js`,
				entryFileNames: `assets/js/[name].js`,
			},
			input: {
				// 日本語ページ
				index: resolve(__dirname, './src/index.html'),
				company: resolve(__dirname, './src/company.html'),
				contact: resolve(__dirname, './src/contact.html'),
				faq: resolve(__dirname, './src/faq.html'),
				products: resolve(__dirname, './src/products.html'),
				// header: resolve(__dirname, "./src/components/header.html"),
				// footer: resolve(__dirname, "./src/components/footer.html"),
				// component_contact: resolve(__dirname, "./src/components/contact.html"),
				// 英語ページ
				en_index: resolve(__dirname, './src/en/index.html'),
				en_company: resolve(__dirname, './src/en/company.html'),
				en_contact: resolve(__dirname, './src/en/contact.html'),
				en_faq: resolve(__dirname, './src/en/faq.html'),
				en_products: resolve(__dirname, './src/en/products.html'),
				// en_header: resolve(__dirname, "./src/en/components/header.html"),
				// en_footer: resolve(__dirname, "./src/en/components/footer.html"),
				// en_component_contact: resolve(__dirname, "./src/en/components/contact.html"),
				// 中国語ページ
				zh_index: resolve(__dirname, './src/zh/index.html'),
				zh_company: resolve(__dirname, './src/zh/company.html'),
				zh_contact: resolve(__dirname, './src/zh/contact.html'),
				zh_faq: resolve(__dirname, './src/zh/faq.html'),
				zh_products: resolve(__dirname, './src/zh/products.html'),
				// zh_header: resolve(__dirname, "./src/zh/components/header.html"),
				// zh_footer: resolve(__dirname, "./src/zh/components/footer.html"),
				// zh_component_contact: resolve(__dirname, "./src/zh/components/contact.html"),
			},

			//  list: resolve(__dirname, './src/list.html'),

		},
	},
});
