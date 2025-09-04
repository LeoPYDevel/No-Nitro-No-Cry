const style = document.createElement("style");
style.innerHTML = `
.categorySectionNitroLocked_c656ac {
    background-color: transparent !important;
}
.nitroTopDividerContainer_b3fb5f,
.categoryItemLockIconContainer__0fa6d {
	display: none;
}

/* Panel de emojis guardados */
#emojiPanelWrapper {
	position: fixed;
	top: 90px;
	left: 50%;
	transform: translateX(-50%);
	background: rgba(40,40,40,0.95);
	color: white;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0,0,0,0.4);
	z-index: 99999;
	padding: 5px 5px;
	padding-top: 3px;
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 80%;
}

#toggleEmojiPanel {
	background: #7289da;
	color: white;
	border: none;
	border-radius: 5px;
	padding: 10px 10px;
	margin-bottom: 7px;
	cursor: pointer;
	font-weight: bold;
}

#emojiSavedPanel {
	display: none;
	flex-wrap: wrap;
	gap: 5px;
	max-height: 120px;
	overflow-x: auto;
	padding: 3px;
	width: 100%;
	box-sizing: border-box;
}

.emojiItemWrapper {
	position: relative;
	display: inline-block;
}

.emojiItem {
	width: 42px;
	height: 42px;
	border-radius: 2px;
	cursor: pointer;
	transition: transform 0.2s ease;
}

.emojiItem:hover {
	transform: scale(1.1);
}

.deleteEmojiBtn {
	position: absolute;
	top: -5px;
	right: -5px;
	background: red;
	color: white;
	border-radius: 50%;
	width: 16px;
	height: 16px;
	font-size: 12px;
	line-height: 16px;
	text-align: center;
	cursor: pointer;
	display: none;
}
.emojiItemWrapper:hover .deleteEmojiBtn {
	display: block;
}
.scrim_d9cec8,
.container_d829e7,
.hasTabParentContainer_d829e7,
.emojiLockIconContainer_d982c2,
.upsellButton__0b69f,
upsellContainer__0b69f > svg[xmlns="http://www.w3.org/2000/svg"],
.wrapper__8ef02 > .upsellWrapper__8fe94 {
	display: none !important;
}
.stickerUnsendable_c6367b {
	transition: 0.3s all;
	filter: grayscale(0%) !important;
	box-shadow: 0 0 8px rgba(0, 123, 255, 0.8);
}
.stickerUnsendable_c6367b:hover {
	transition: 0.3s all;
	filter: grayscale(0%) !important;
	box-shadow: 0 0 20px rgba(118, 157, 209, 1);
	transform: scale(1.15);
}
li[role="gridcell"] .lockedEmoji_d982c2 {
	width: 32px;
	height: 32px;
	border-radius: 5px;
	cursor: pointer;
	transition: transform 0.2s ease, box-shadow 0.2s ease;
	box-shadow: 0 0 8px rgba(0, 123, 255, 0.8);
}
li[role="gridcell"] .lockedEmoji_d982c2:hover {
	transform: scale(1.15);
	box-shadow: 0 0 20px rgba(118, 157, 209, 1);
}
.upsellContainerShadow__0b69f {
	filter: drop-shadow(0 0 10px rgba(0, 255, 0, 0.5));
}

.carouselModal_d3a6f0 {
    backdrop-filter: blur(10px); /* más blur */
    -webkit-backdrop-filter: blur(10px); /* soporte Safari */
    background-color: rgba(0,0,0,0.3); /* oscuridad leve */
}

li[role="gridcell"] button[data-animated="true"] .lockedEmoji_d982c2 {
	box-shadow: 0 0 8px rgba(255, 0, 0, 0.77); !important
}


li[role="gridcell"] button[data-animated="true"] .lockedEmoji_d982c2:hover {
	box-shadow: 0 0 20px rgba(255, 107, 107, 0.8); !important
}

`;
document.head.appendChild(style);


// ======================= Guardar configuración =========================
chrome.storage.onChanged.addListener(function(changes, area) {
    if(area === "local") {
        if(changes.BypassAntilink) BypassAntilink = changes.BypassAntilink.newValue;
        if(changes.BiggerEmoji) BiggerEmoji = changes.BiggerEmoji.newValue;
        if(changes.UsePng) UsePng = changes.UsePng.newValue;
		if (changes.animatedPreview) animatedPreview = changes.animatedPreview.newValue;
    }
});

// ======================= Variables =========================
var BiggerEmoji = false;
var UsePng = false;
var BypassAntilink = false;
var animatedPreview = true;
var savedEmojis = [];

// ======================= Cambiar panel de nitro =============
setInterval(() => {
	const banner = document.querySelector(".text-sm\\/medium_cf4812.upsellText__0b69f");
	if (banner) {
		banner.innerHTML = `
			Gracias a <a href="https://github.com/LeoPYDevel/No-Nitro-No-Cry" target="_blank" style="color: #7289da; text-decoration: underline;">No Nitro, No cry</a>, 
			tienes acceso a todos estos emojis. Considera compartir la extensión. Hecho por 
			<a href="http://youtube.com/@firulais.gaming" target="_blank" style="color: #7289da; text-decoration: underline;">FirulaisGaming</a>.
		`;
	}
}, 500);

setInterval(() => {
	const animatedElements = document.querySelectorAll('[data-animated="true"]');

	animatedElements.forEach(el => {

		const imgs = el.querySelectorAll('img');
		imgs.forEach(img => {
			if (img.src.endsWith('.webp') || img.src.includes('.webp?')) {
				if (animatedPreview) {
					img.src = img.src.replace('.webp', '.gif');
				} else {
					img.src = img.src.replace('.gif', '.webp');
				}
			}
		});
	});
}, 500); // 500ms = 0.5 segundos


// ======================= Panel de emojis =========================
const panelWrapper = document.createElement("div");
panelWrapper.id = "emojiPanelWrapper";
panelWrapper.innerHTML = `
	<button id="toggleEmojiPanel">Mostrar Emojis</button>
	<div id="emojiSavedPanel"></div>
`;
document.body.appendChild(panelWrapper);

const toggleButton = document.getElementById("toggleEmojiPanel");
const emojiSavedPanel = document.getElementById("emojiSavedPanel");
// agregamos todas las clases
emojiSavedPanel.classList.add("scroller_affa7e", "list_c656ac", "thin_d125d2", "scrollerBase_d125d2");

toggleButton.addEventListener("click", () => {
	if (emojiSavedPanel.style.display === "none") {
		emojiSavedPanel.style.display = "flex";
		toggleButton.textContent = "Esconder Emojis";
	} else {
		emojiSavedPanel.style.display = "none";
		toggleButton.textContent = "Mostrar Emojis";
	}
});

// ======================= LocalStorage =========================
function loadSavedEmojis() {
	const data = localStorage.getItem("savedEmojis");
	if (data) savedEmojis = JSON.parse(data);
	updateEmojiPanel();
}
function saveToStorage() {
	localStorage.setItem("savedEmojis", JSON.stringify(savedEmojis));
}

// ======================= Funciones =========================
function updateEmojiPanel() {
	emojiSavedPanel.innerHTML = "";
	savedEmojis.forEach((url, idx) => {
		const wrapper = document.createElement("div");
		wrapper.className = "emojiItemWrapper";
		const img = document.createElement("img");
		img.src = url;
		img.className = "emojiItem";
		img.title = "Click para copiar URL";
		img.addEventListener("click", (e) => {
			copyTextToClipboard(url);
			showCopiedNotice(url, false);
		});

		const delBtn = document.createElement("div");
		delBtn.className = "deleteEmojiBtn";
		delBtn.innerHTML = "×";
		delBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			savedEmojis.splice(idx, 1);
			saveToStorage();
			updateEmojiPanel();
		});

		wrapper.appendChild(img);
		wrapper.appendChild(delBtn);
		emojiSavedPanel.appendChild(wrapper);
	});
}

function saveEmoji(url) {
	if (!savedEmojis.includes(url)) {
		savedEmojis.push(url);
		saveToStorage();
		updateEmojiPanel();
	}
}



// ======================= Copiado y banners =========================
async function copyTextToClipboard(textToCopy) {
	try {
		if (navigator?.clipboard?.writeText) await navigator.clipboard.writeText(textToCopy);
	} catch (err) { console.error(err); }
}

function focus() {
	const inputs = document.querySelectorAll("div[contenteditable='true']");
	if (inputs.length >= 2) inputs[1].focus();
}

function showCopiedNotice(copiedURL, rightClick = false) {
	const el = document.getElementById("emojiCopiedNotice");
	if (!el) return;
	el.innerHTML = `
		<div style="display: flex; align-items: center; gap: 10px;">
			<img src="${copiedURL}" style="width: 32px; height: 32px;" />
			<span>${rightClick ? "Emoji saved to favs!" : "Emoji copied to clipboard!"}</span>
		</div>
		<h4 style="font-size: 10px; margin-top: 5px;">No nitro, no cry!</h4>
	`;
	el.style.display = "block";
	requestAnimationFrame(() => { el.style.opacity = "1"; });
	setTimeout(() => {
		el.style.opacity = "0";
		setTimeout(() => { el.style.display = "none"; }, 300);
	}, 3500);
}

// ======================= Cartel flotante =========================
const copyNotice = document.createElement("div");
copyNotice.id = "emojiCopiedNotice";
copyNotice.style.cssText = `
	position: fixed;
	top: 25px;
	right: 25px;
	background: rgba(60, 60, 60, 0.95);
	color: white;
	padding: 12px 17px;
	border-radius: 8px;
	font-size: 14px;
	box-shadow: 0 2px 10px rgba(0,0,0,0.3);
	z-index: 9999;
	display: none;
	opacity: 0;
	transition: opacity 0.3s ease;
	pointer-events: none;
`;
document.body.appendChild(copyNotice);

// ======================= Inicializar emojis guardados =========================
loadSavedEmojis();

$(document).ready(function () {
	setInterval(function () {
		// Quitar filtros y elementos molestos
		$("div[class*='listItems'] div[class*='categorySection'] ul li button")
			.css('filter', ' grayscale(0)').children("img").css('pointer-events', 'all');

		$("div[class*='listItems'] div[class*='row'] div[role*='gridcell'] div[class*='sticker'] div div[class*='stickerNode'] img")
			.css('pointer-events', 'all');
	}, 100);

	setInterval(function () {
		// Emojis normales
		$("div[class*='listItems'] div[class*='categorySection'] ul li button img[class*='image']").each(function () {
			if ($(this).attr("affected") != "true") {
				$(this).attr("affected", "true");

				const elem = this; // nodo DOM real

				const handleCopy = async (rightClick = false) => {
					let src = elem.src.split("?")[0]; // URL limpia
					let finalURL = src;

					console.log(BypassAntilink)

					if (BypassAntilink) {
						try {
							const img = new Image();
							img.crossOrigin = "anonymous";
							img.src = finalURL;
							img.onload = async () => {
								const blob = await new Promise(r => {
									const c = document.createElement("canvas");
									c.width = img.width;
									c.height = img.height;
									c.getContext("2d").drawImage(img, 0, 0);
									c.toBlob(r, "image/png");
								});
								await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
								showCopiedNotice(finalURL, rightClick);
							};
						} catch (err) { console.error(err); }
					} else {
						if (BiggerEmoji) finalURL += "?size=48c";
						else finalURL += "?size=48";
						if (UsePng) finalURL = finalURL.replace(".webp", ".png");
						copyTextToClipboard(finalURL);
						showCopiedNotice(finalURL, rightClick);
					}

					if (rightClick) saveEmoji(finalURL);
					focus();
				};

				$(elem).click(() => handleCopy(false));
				$(elem).on("contextmenu", (e) => { e.preventDefault(); handleCopy(true); });
			}
		});

		// Stickers
		$("img.stickerAsset__31fc2").each(function () {
			if ($(this).attr("affected") != "true") {
				$(this).attr("affected", "true");

				const elem = this;

				const handleCopy = async (rightClick = false) => {
					let src = elem.src.split("?")[0];
					let finalURL = src + "?size=128";
					
					if (BypassAntilink) {
						try {
							const img = new Image();
							img.crossOrigin = "anonymous";
							img.src = finalURL;
							img.onload = async () => {
								const blob = await new Promise(r => {
									const c = document.createElement("canvas");
									c.width = img.width;
									c.height = img.height;
									c.getContext("2d").drawImage(img, 0, 0);
									c.toBlob(r, "image/png");
								});
								await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
								showCopiedNotice(finalURL, rightClick);
							};
						} catch (err) { console.error(err); }
					} else {
						copyTextToClipboard(finalURL);
						showCopiedNotice(finalURL, rightClick);
					}

					if (rightClick) saveEmoji(finalURL);
					focus();
				};

				$(elem).click(() => handleCopy(false));
				$(elem).on("contextmenu", (e) => { e.preventDefault(); handleCopy(true); });
			}
		});
	}, 1000);
});


// GRABACION