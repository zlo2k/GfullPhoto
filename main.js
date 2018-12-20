function xp(path) {
	return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function xps(path)
{
	let results = [];
	let query = document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (let i = 0, length = query.snapshotLength; i < length; ++i) {
		results.push(query.snapshotItem(i));
	}
	return results;
}

function waitForEl(path, callback) {
	elements = xps(path);
	if (elements.length) {
		if (elements.length == 1) callback(elements[0]);
		else callback(elements);
	} else {
		setTimeout(function() {
			waitForEl(path, callback);
		}, 100);
	}
}
	
waitForEl('//div[@id="irc_cc"]//table[contains(@class, "irc_but_r")]', function(elements) {
	elements.forEach(function(table) {
		button = table.rows[0].insertCell(2);
		a = document.createElement("a");
		a.innerHTML = '<span>Full</span>';	
		a.onclick = function(event) {
			waitForEl('//div[@id="irc_cc"]/div[contains(@style, "translate3d(0px, 0px, 0px)")]', function(panel){
				name = panel.getAttribute('data-item-id');
				data_element = xp('//div[@id="rg_s"]//div[contains(node(), "' + name + '")]');
				img_link = JSON.parse(data_element.innerHTML)['ou'];
				window.open(img_link, '_blank');			
			});				
		}
		button.appendChild(a);
	});
});
