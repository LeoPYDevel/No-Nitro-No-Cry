document.addEventListener('DOMContentLoaded', function () {
	let BiggerEmoji = false; // Mostrar emojis grandes como stickers
	let UsePng = false;      // Usar PNG en lugar de WEBP

	const emojiCheckbox = document.getElementById('bigemoji');
	const pngCheckbox = document.getElementById('usepng');

	// Cargar las configuraciones guardadas
	chrome.storage.local.get(["BiggerEmoji", "UsePng"], function (result) {
		BiggerEmoji = result.BiggerEmoji ?? false;
		UsePng = result.UsePng ?? false;

		emojiCheckbox.checked = BiggerEmoji;
		pngCheckbox.checked = UsePng;
	});

	// Guardar cambios cuando se hace clic
	emojiCheckbox.addEventListener('change', function () {
		BiggerEmoji = emojiCheckbox.checked;
		chrome.storage.local.set({ BiggerEmoji: BiggerEmoji });
	});

	pngCheckbox.addEventListener('change', function () {
		UsePng = pngCheckbox.checked;
		chrome.storage.local.set({ UsePng: UsePng });
	});
});

