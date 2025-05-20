$(document).ready(function () {
    /*============ Settings ===========*/

    var BiggerEmoji = false; // Make emoji look big like stickers
    var UsePng = true;      // Use png instead of webp for high quality

    chrome.storage.local.get({ BiggerEmoji: false, UsePng: false }).then((result) => {
        if (result.BiggerEmoji === true || result.BiggerEmoji === false) {
            BiggerEmoji = result.BiggerEmoji
        }
        if (result.UsePng === true || result.UsePng === false) {
            UsePng = result.UsePng
        }
    });

    /* =============================== */

    setInterval(function () {
        // make emotes coloured and clickable
        $("div[class*='listItems'] div[class*='categorySection'] ul li button").css('filter', ' grayscale(0)').children("img").css('pointer-events', 'all');
        // make stickers coloured and clickable
        $("div[class*='listItems'] div[class*='row'] div[role*='gridcell'] div[class*='sticker'] div div[class*='stickerNode']").css('filter', ' grayscale(0)').children("div img").css('pointer-events', 'all');

        //Remove annoying nitro banner that appears when emote is clicked
        $("div[class*='emojiPicker'] div[class*='hasTabParentContainer']").remove();
        $("div[class*='emojiPicker'] div[class*='backdrop'").remove();
    }, 100);

    /*================= Emotes ============================*/
    setInterval(function () {
        // Add click event listener to the emotes
        $("div[class*='listItems'] div[class*='categorySection'] ul li button img[class*='image']").each(function () {
            if ($(this).attr("affected") != "true") {
                // adding "affected" attribute to prevent duplicaton of click event listeners
                $(this).attr("affected", "true");
		$(this).click(async (e) => {
			let ufsource = e.currentTarget.getAttribute('src');
			const url = ufsource.split("?size=")[0]; // Quitamos parámetros
			let finalURL;

			if (BiggerEmoji) {
				finalURL = url + "?size=48c";
			} else {
				finalURL = url + "?size=48";
			}

			if (UsePng) {
				finalURL = finalURL.replace(".webp", ".png");
			} else {
				// Intentamos reemplazar con .gif solo si es emoji animado
				const gifURL = finalURL.replace(".webp", ".gif");
				const exists = await urlExists(gifURL);
				if (exists) {
					finalURL = gifURL;
				}
			}

			copyTextToClipboard(finalURL);
			showCopiedNotice(finalURL);
			focus();
		});

            }
        });
        /*================= Stickers ============================*/
        $("div[class*='listItems'] div[class*='row'] div[role*='gridcell'] div[class*='sticker'] div div[class*='stickerNode'] div img[class*='Image']").each(function () {
            if ($(this).attr("affected") != "true") {
                $(this).attr("affected", "true");
                $(this).click((e) => {
                    let ufsource = e.currentTarget.getAttribute('src');
                    const url = ufsource.split("?size=");
                    source = url[0] + "?size=128"
                    copyTextToClipboard(source);
                    showCopiedNotice(source);
                    focus();
                });
            }
        });
    }, 1000);
});

function showCopiedNotice(copiedURL) {
	const el = document.getElementById("emojiCopiedNotice");
	if (!el) return;

	el.innerHTML = `
		<div style="display: flex; align-items: center; gap: 10px;">
			<img src="${copiedURL}" style="width: 32px; height: 32px;" />
			<span> Emoji copied to clipboard!</span>
		</div>
		<h4 style="font-size: 10px; margin-top: 5px;">Not Quite Nitro (Unofficial)</h4>
	`;

	el.style.display = "block";
	requestAnimationFrame(() => {
		el.style.opacity = "1";
	});
	setTimeout(() => {
		el.style.opacity = "0";
		setTimeout(() => {
			el.style.display = "none";
		}, 300);
	}, 3500);
}



function focus() {
	const inputs = document.querySelectorAll("div[contenteditable='true']");
	if (inputs.length >= 2) inputs[1].focus();
}

async function copyTextToClipboard(textToCopy) {
    try {
        if (navigator?.clipboard?.writeText) {
            await navigator.clipboard.writeText(textToCopy);
        }
    } catch (err) {
        console.error(err);
    }
}

async function urlExists(url) {
	try {
		const response = await fetch(url, { method: 'HEAD' });
		return response.ok;
	} catch (err) {
		console.warn("No se pudo comprobar la URL:", url);
		return false;
	}
}

// Inyectar el cartel flotante en el DOM
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
copyNotice.textContent = "Emoji Copied to clipboard!";
document.body.appendChild(copyNotice);



