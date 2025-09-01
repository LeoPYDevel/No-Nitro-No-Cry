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
	top: 10px;
	left: 50%;
	transform: translateX(-50%);
	background: rgba(40,40,40,0.95);
	color: white;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0,0,0,0.4);
	z-index: 99999;
	padding: 5px 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 90%;
}

#toggleEmojiPanel {
	background: #7289da;
	color: white;
	border: none;
	border-radius: 5px;
	padding: 5px 10px;
	margin-bottom: 5px;
	cursor: pointer;
	font-weight: bold;
}

#emojiSavedPanel {
	display: none;
	flex-wrap: wrap;
	gap: 5px;
	max-height: 120px;
	overflow-x: auto;
	overflow-y: hidden;
	padding: 5px;
	width: 100%;
	box-sizing: border-box;
}

.emojiItemWrapper {
	position: relative;
	display: inline-block;
}

.emojiItem {
	width: 32px;
	height: 32px;
	border-radius: 5px;
	cursor: pointer;
	transition: transform 0.2s ease;
}

.emojiItem:hover {
	transform: scale(1.2);
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
`;
document.head.appendChild(style);

// ======================= Variables =========================
var BiggerEmoji = false;
var UsePng = false;
var savedEmojis = [];

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
			<span>${rightClick ? "Emoji guardado!" : "Emoji copied to clipboard!"}</span>
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

// ======================= Guardar configuración =========================
chrome.storage.local.get({ BiggerEmoji: false, UsePng: false }).then((result) => {
    BiggerEmoji = !!result.BiggerEmoji;
    UsePng = !!result.UsePng;
});

// ======================= Remover banners de Nitro =========================
setInterval(() => {
	const upsell = document.querySelector(".upsellContainer__0b69f");
	if (upsell) upsell.remove();
}, 500);

// ======================= Inicializar emojis guardados =========================
loadSavedEmojis();

// ======================= Eventos para emojis =========================
$(document).ready(function () {
	setInterval(function () {
		$("div[class*='listItems'] div[class*='categorySection'] ul li button")
			.css('filter', ' grayscale(0)').children("img").css('pointer-events', 'all');

		$("div[class*='listItems'] div[class*='row'] div[role*='gridcell'] div[class*='sticker'] div div[class*='stickerNode']")
			.css('filter', ' grayscale(0)').children("div img").css('pointer-events', 'all');

		$("div[class*='emojiPicker'] div[class*='hasTabParentContainer']").remove();
		$("div[class*='emojiPicker'] div[class*='backdrop'").remove();
	}, 100);

	setInterval(function () {
		$("div[class*='listItems'] div[class*='categorySection'] ul li button img[class*='image']").each(function () {
			if ($(this).attr("affected") != "true") {
				$(this).attr("affected", "true");

				$(this).click(async (e) => {
					let ufsource = e.currentTarget.getAttribute('src');
					const url = ufsource.split("?size=")[0];
					let finalURL = BiggerEmoji ? url + "?size=48c" : url + "?size=48";
					if (UsePng) finalURL = finalURL.replace(".webp", ".png");
					copyTextToClipboard(finalURL);
					showCopiedNotice(finalURL, false);
					focus();
				});

				$(this).on("contextmenu", async (e) => {
					e.preventDefault();
					let ufsource = e.currentTarget.getAttribute('src');
					const url = ufsource.split("?size=")[0];
					let finalURL = BiggerEmoji ? url + "?size=48c" : url + "?size=48";
					if (UsePng) finalURL = finalURL.replace(".webp", ".png");
					copyTextToClipboard(finalURL);
					saveEmoji(finalURL);
					showCopiedNotice(finalURL, true);
					focus();
				});
			}
		});
	}, 1000);
});
