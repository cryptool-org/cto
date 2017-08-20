'use strict';

/*
	This file contains functions for manipulation the DOM.
*/

let dom = {};

(function() {
	dom['addClass'] = ($elm, cls) => {
		if ($elm) { $elm.addClass(cls); }
		return $elm;
	};

	dom['removeClass'] = ($elm, cls) => {
		if ($elm) { $elm.removeClass(cls); }
		return $elm;
	};

	dom['setClass'] = ($elm, cls, set) => {
		if (set) {
			return dom.addClass($elm, cls);
		} else {
			return dom.removeClass($elm, cls);
		}
	};

    dom['hasClass'] = ($elm, cls) => {
        return $elm && $elm.hasClass(cls);
    };
})();

function newTag(tag, id, classes) {
	const $elm = jQuery('<' + tag + '/>');
	if (id) { $elm.attr('id', id); }
	_.each(classes, (cls) => { $elm.addClass(cls); });
	return $elm;
}

function appendChild($parent, $child) {
    if (! $parent) { return $parent; }
	$parent.append($child);
	return $parent;
}

function removeChilds($parent) {
	if ($parent) { $parent.empty(); }
	return $parent;
}

function removeBetween($from, $to) {
	if (! $from || ! $to) { return; }
	for (;;) {
		const $next = $from.next();
		if ($next.is($to)) { break; }
		$next.remove();
	}
}

function setTxt($elm, txt) {
	return $elm.text(txt);
}

function par(txt) {
	return setTxt(newTag('p'), txt);
}

function absoluteBox($elm) {
	const box = $elm[0].getBoundingClientRect();
	const off = $elm.offset();
	return {
		left: off.left,
		right: off.left + box.width,
		top: off.top,
		bottom: off.top + box.height,
		width: box.width,
		height: box.height
	};
}

function center(box) {
	return { x: box.left + box.width/2, y: box.top + box.height/2 };
}

	const expanded = {
		'toggle-configuration': true,
		'toggle-key': true,
		'toggle-input': true,
		'toggle-enc-rounds': true,
		'toggle-encoded': true,
		'toggle-reference': true,
		'toggle-dec-rounds': true,
		'toggle-decoded':true
	};

	function toggleDiv(a, divs) {
		const collapse = expanded[a];
		expanded[a] = ! collapse;
		dom.setClass(jQuery('#' + a), 'collapsed', collapse);
		_.each(divs, (div) => { dom.setHide(jQuery('#' + div), collapse); });
		aes.relayout();
	}

	function updateCollapseState() {
		for (let key in expanded) {
			if (! expanded.hasOwnProperty(key)) { continue; }
			const $obj = jQuery(key);
			if (! $obj) { continue; }
			const shouldBeExpanded = expanded[key];
			const isExpanded = ! $obj.hasClass('collapsed');
			if (shouldBeExpanded !== isExpanded) {
				expanded[key] = isExpanded;
				$obj.click();
			}
		}
	}

	function writeBytes($dest, ary, prefix, activeCells, colored) {
		const grouping = 4;
		const len = ary.length;

		removeChilds($dest);

		for (let i = 0; i < len; i += grouping) {
			const $div = newTag('div');
			for (let j = 0; j < grouping; ++j) {
				const k = i + j;
				const v = ary[k];
				const $span = newTag('span', prefix + k, colored ? 'c' + defaults.colorRamp[v] : null);
				if (activeCells) {
					$span.on('click', aes.doCellClick);
				}
				appendChild($div, setTxt($span, formatByte(v)), j > 0);
			}
			appendChild($dest, $div, i);
		}
	}

(function() {
	function hideLevel($elm) {
		let level = 0;
		if ($elm.hasClass('hidden')) {
			level = 1;
			while ($elm.hasClass('hidden-' + (level + 1))) {
				++level;
			}
		}
		return level;
	}

	function hide($elm) {
		const level = hideLevel($elm);
		dom.addClass($elm, level <= 0 ? 'hidden' : 'hidden-' + (level + 1));
	}

	function unhide($elm) {
		const level = hideLevel($elm);
		dom.removeClass($elm, level <= 1 ? 'hidden' : 'hidden-' + level);
	}

	dom['setHide'] = ($elm, doHide) => {
		if (doHide) {
			hide($elm);
		} else {
			unhide($elm);
		}
	}

})();