import { defineConfig } from 'unocss';
import { presetStarlightIcons } from 'starlight-plugin-icons/uno';

// Explizite Safelist statt Cache aus .starlight-icons/: Die Icon-Klassen stehen
// nur in astro.config.mjs bzw. werden zur Laufzeit erzeugt, UnoCSS kann sie
// nicht aus dem Content extrahieren. Der Cache existiert auf einem frischen
// CI-Build (Cloudflare) beim Config-Laden noch nicht -> Icons wuerden fehlen.
// Neue Sidebar-/Codeblock-Icons hier mit eintragen.
export default defineConfig({
	presets: [presetStarlightIcons()],
	safelist: [
		// Sidebar (astro.config.mjs)
		'i-ph:rocket-launch-duotone',
		'i-ph:sliders-duotone',
		'i-ph:squares-four-duotone',
		'i-ph:stack-duotone',
		'i-ph:shield-check-duotone',
		'i-ph:seal-check-duotone',
		'i-ph:question-duotone',
		'i-ph:wrench-duotone',
		'i-ph:map-trifold-duotone',
		// Codeblock-Icons (```… title="…")
		'i-material-icon-theme:tune', // .env
		'i-material-icon-theme:document',
		'i-material-icon-theme:settings',
		'i-material-icon-theme:console', // Shell-Bloecke
	],
});
