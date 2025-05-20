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
                    copyTextToClipboard(source)
                });
            }
        });
    }, 1000);
});


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
