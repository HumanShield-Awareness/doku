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
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/securebitsorg' },
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
