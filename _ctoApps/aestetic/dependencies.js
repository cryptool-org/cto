'use strict';

var aes = {};
/*
	handling the dependencies between cells and the calculations
*/

(function() {
	var dependencies = {};
	var calculations = {};

	aes['addDependencies'] = function(key, ids) {
		var val = dependencies[key];
		if (val == null) { val = []; dependencies[key] = val; }
		_.each(ids, function(id) { val.push(id); });
	};

	aes['addCalculations'] = function(key, lines) {
		var val = calculations[key];
		if (val == null) { val = []; calculations[key] = val; }
		_.each(lines, function(line) { val.push(par(line)); });
	};

	aes['rotateDependencies'] = function(prefix, start, end) {
		var firstDependency = dependencies[prefix + start];
		var firstCalculation = calculations[prefix + start];
		for (var i = start; i < end - 1; ++i) {
			dependencies[i] = dependencies[i + 1];
			calculations[i] = calculations[i + 1];
		}
		dependencies[end - 1] = firstDependency;
		calculations[end - 1] = firstCalculation;
	};

	aes['resetDependencies'] = function() {
		dependencies = {};
		calculations = {};
	};


	var tappedCell = null;

	function processClosure(active, visited, depth, addActiveClass) {
		if (!active.length || depth > 10) return;

		var nextLevel = [];

		var className = "active-" + depth;
		_.each(active, function(obj) {
			if (visited.indexOf(obj) < 0) {
				_.each(dependencies[obj], function(val) { nextLevel.push(val); });
				visited.push(obj);
			}
			if (addActiveClass) {
				dom.addClass($(obj), className);
			} else {
				dom.removeClass($(obj), className);
			}
		});
		processClosure(nextLevel, visited, depth + 1, addActiveClass);
	}

	function repositionCalc() {
		var $calc = $('calc');
		if (tappedCell && $(tappedCell) && $calc.firstChild) {

			var box = absoluteBox($(tappedCell));
			if (! box.width || ! box.height) {
				processClosure([tappedCell], [], 1, false);
				tappedCell = null;
				removeChilds($calc);
				aes.relayout();
			}
			$calc.style['left'] = (box.right + 4) + "px";
			$calc.style['top'] = (box.bottom + 4) + "px";
			dom.removeClass($calc, 'hidden');
		} else {
			dom.addClass($calc, 'hidden');
		}
	}

	function newLine($from, $to) {
		var fromBox = absoluteBox($from);
		var toBox = absoluteBox($to);
		if (! fromBox.width || ! fromBox.height || ! toBox.width || ! toBox.height) {
			return null;
		}

		var fromCenter = center(fromBox);
		var toCenter = center(toBox);

		var x1, y1, x2, y2;
		if (Math.abs(fromCenter.x - toCenter.x) > Math.abs(fromCenter.y - toCenter.y)) {
			var slope = (toCenter.y - fromCenter.y)/(toCenter.x - fromCenter.x);
			if (fromCenter.x < toCenter.x) {
				x1 = fromBox.right + 1;
				x2 = toBox.left - 1;
			} else {
				x1 = fromBox.left - 1;
				x2 = toBox.right + 1;
			}
			y1 = fromCenter.y - slope * (fromCenter.x - x1);
			y2 = fromCenter.y - slope * (fromCenter.x - x2);
		} else {
			slope = (toCenter.x - fromCenter.x)/(toCenter.y - fromCenter.y);
			if (fromCenter.y < toCenter.y) {
				y1 = fromBox.bottom + 1;
				y2 = toBox.top - 1;
			} else {
				y1 = fromBox.top - 1;
				y2 = toBox.bottom + 1;
			}
			x1 = fromCenter.x - slope * (fromCenter.y - y1);
			x2 = fromCenter.x - slope * (fromCenter.y - y2);
		}

		var $line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	    $line.setAttribute('x1', x1);
	    $line.setAttribute('y1', y1);
	    $line.setAttribute('x2', x2);
	    $line.setAttribute('y2', y2);
	    $line.setAttribute('stroke', 'rgba(255, 0, 0, 0.3)');
	    $line.setAttribute('stroke-width', "1px");
	    return $line;
	}

	function updateConnections() {
		var $connections = $('connections');
		removeChilds($connections);
		if (tappedCell) {
			var $source = $(tappedCell);

			_.each(dependencies[tappedCell], function(destination) {
				var $destination = $(destination);
				var $line = newLine($source, $destination);
				if ($line) {
					$connections.appendChild($line);
				}
			});
		}
	}

	aes['relayout'] = function() {
		repositionCalc();
		updateConnections();
	};

	aes['refreshTappedCell'] = function() {
		if (tappedCell) {
			processClosure([tappedCell], [], 1, true);			
		}
	};

	aes['doCellClick'] = function(evt) {
		if (tappedCell) { 
			processClosure([tappedCell], [], 1, false);
		}
		var id = this.getAttribute('id');
		if (id == tappedCell) {
			tappedCell = null;
		} else {
			tappedCell = id;
			processClosure([tappedCell], [], 1, true);
			var calc = $('calc');
			var msg = calculations[id];
			removeChilds(calc);
			_.each(msg, function(elm) { calc.appendChild(elm); });
		}
		aes.relayout();
		evt.preventDefault();
	}

})();