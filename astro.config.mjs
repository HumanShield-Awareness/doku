// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.humanshield.app',
	output: 'static',
	integrations: [
		starlight({
			title: 'HumanShield.APP Docs',
			favicon: '/favicon.svg',
			head: [
				{ tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/favicon-180.png' } },
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#F0591F' } },
			],
			customCss: ['./src/styles/custom.css'],
			components: {
				SiteTitle: './src/components/SiteTitle.astro',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/HumanShield-Awareness' },
			],
			defaultLocale: 'root',
			locales: {
				root: { label: 'Deutsch', lang: 'de' },
				en: { label: 'English', lang: 'en' },
			},
			sidebar: [
				{
					label: 'Erste Schritte',
					translations: { en: 'Getting Started' },
					items: [{ autogenerate: { directory: 'guides' } }],
				},
				{
					label: 'Referenz',
					translations: { en: 'Reference' },
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			],
		}),
	],
});
