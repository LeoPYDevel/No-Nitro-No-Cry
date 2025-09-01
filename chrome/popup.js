document.addEventListener('DOMContentLoaded', function () {
	let BiggerEmoji = false; 
	let UsePng = false;
	let BypassAntilink = false; // NUEVO

	const emojiCheckbox = document.getElementById('bigemoji');
	const pngCheckbox = document.getElementById('usepng');
	const bypassCheckbox = document.getElementById('bypasslink');

	// Cargar configuraciones
	chrome.storage.local.get(["BiggerEmoji", "UsePng", "BypassAntilink"], function (result) {
		BiggerEmoji = result.BiggerEmoji ?? false;
		UsePng = result.UsePng ?? false;
		BypassAntilink = result.BypassAntilink ?? false;

		emojiCheckbox.checked = BiggerEmoji;
		pngCheckbox.checked = UsePng;
		bypassCheckbox.checked = BypassAntilink;
	});

	// Guardar cambios
	emojiCheckbox.addEventListener('change', function () {
		BiggerEmoji = emojiCheckbox.checked;
		chrome.storage.local.set({ BiggerEmoji });
	});

	pngCheckbox.addEventListener('change', function () {
		UsePng = pngCheckbox.checked;
		chrome.storage.local.set({ UsePng });
	});

	bypassCheckbox.addEventListener('change', function () {
		BypassAntilink = bypassCheckbox.checked;
		chrome.storage.local.set({ BypassAntilink });
	});

	// Exponer opciones globalmente para el content script
	window.ExtensionSettings = { BiggerEmoji, UsePng, BypassAntilink };
});
