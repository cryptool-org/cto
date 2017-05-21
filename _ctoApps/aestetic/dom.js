'use strict';

/*
	This file contains functions for manipulation the DOM.
*/

function $(id) { return document.getElementById(id); }

var dom = {};

(function() {
	dom['addClass'] = function($elm, cls) {
		if ($elm && $elm.classList) { $elm.classList.add(cls); }
		return $elm;
	};

	dom['removeClass'] = function($elm, cls) {
		if ($elm && $elm.classList) { $elm.classList.remove(cls); }
		return $elm;
	};

	dom['setClass'] = function($elm, cls, set) {
		if (set) {
			return dom.addClass($elm, cls);
		} else {
			return dom.removeClass($elm, cls);
		}
	};

    dom['hasClass'] = function($elm, cls) {
        return $elm && $elm.classList && $elm.classList.contains(cls);
    };
})();

function newTag(tag, id, classes) {
	var $elm = document.createElement(tag);
	if (id) { $elm.setAttribute('id', id); }
	_.each(classes, function(cls) { dom.addClass($elm, cls); });
	return $elm;
}

function newTxt(txt) { return document.createTextNode(txt); }

function appendChild($parent, $child, addSpace) {
    if (! $parent) { return $parent; }
	if (addSpace) { $parent.appendChild(newTxt(' ')); }
	$parent.appendChild($child);
	return $parent;
}

function removeChilds($parent) {
	while ($parent && $parent.hasChildNodes()) { $parent.removeChild($parent.firstChild); }
	return $parent;
}

function removeBetween($from, $to) {
	if (! $from || ! $to) { return; }
	var $parent = $from.parentNode;
	for (;;) {
		var $next = $from.nextSibling;
		if ($next == $to) { break; }
		$parent.removeChild($next);
	}
}

function setTxt($elm, txt) {
	return appendChild(removeChilds($elm), newTxt(txt));
}

function par(text) {
	return setTxt(newTag('p'), text);
}

function absoluteBox($elm) {
	var box = $elm.getBoundingClientRect();
	return {
		left: box.left + window.pageXOffset,
		right: box.right + window.pageXOffset,
		top: box.top + window.pageYOffset,
		bottom: box.bottom + window.pageYOffset,
		width: box.width,
		height: box.height
	};
}

function center(box) {
	return { x: box.left + box.width/2, y: box.top + box.height/2 };
}

	var expanded = {
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
		var collapse = expanded[a];
		expanded[a] = ! collapse;
		dom.setClass($(a), 'collapsed', collapse);
		_.each(divs, function(div) { dom.setHide($(div), collapse); });
		aes.relayout();
	}

	function updateCollapseState() {
		for (var key in expanded) {
			if (! expanded.hasOwnProperty(key)) { continue; }
			var $obj = $(key);
			if (! $obj) { continue; }
			var shouldBeExpanded = expanded[key];
			var isExpanded = ! $obj.classList.contains('collapsed');
			if (shouldBeExpanded != isExpanded) {
				expanded[key] = isExpanded;
				$obj.click();
			}
		}
	}

	function writeBytes($dest, ary, prefix, activeCells, colored) {
		var grouping = 4;
		var len = ary.length;

		removeChilds($dest);

		for (var i = 0; i < len; i += grouping) {
			var $div = newTag('div');
			for (var j = 0; j < grouping; ++j) {
				var k = i + j;
				var v = ary[k];
				var $span = newTag('span', prefix + k, colored ? 'c' + defaults.colorRamp[v] : null);
				if (activeCells) {
					$span.addEventListener('click', aes.doCellClick);
				}
				appendChild($div, setTxt($span, formatByte(v)), j > 0);
			}
			appendChild($dest, $div, i);
		}
	}

(function() {
	function hideLevel($elm) {
		var level = 0;
		if ($elm.classList.contains('hidden')) {
			level = 1;
			while ($elm.classList.contains('hidden-' + (level + 1))) {
				++level;
			}
		}
		return level;
	}

	function hide($elm) {
		var level = hideLevel($elm);
		dom.addClass($elm, level <= 0 ? 'hidden' : 'hidden-' + (level + 1));
	}

	function unhide($elm) {
		var level = hideLevel($elm);
		dom.removeClass($elm, level <= 1 ? 'hidden' : 'hidden-' + level);
	}

	dom['setHide'] = function ($elm, doHide) {
		if (doHide) {
			hide($elm);
		} else {
			unhide($elm);
		}
	}

})();