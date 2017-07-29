'use strict';

const aes = {};
/*
	handling the dependencies between cells and the calculations
*/

(function() {
	let dependencies = {};
	let calculations = {};

	aes['addDependencies'] = (key, ids) => {
		let value = dependencies[key];
		if (! value) { value = []; dependencies[key] = value; }
		_.each(ids, (id) => { value.push(id); });
	};

	aes['addCalculations'] = (key, lines) => {
		let value = calculations[key];
		if (! value) { value = []; calculations[key] = value; }
		_.each(lines, (line) => { value.push(par(line)); });
	};

	aes['rotateDependencies'] = (prefix, start, end) => {
		const firstDependency = dependencies[prefix + start];
		const firstCalculation = calculations[prefix + start];
		for (let i = start; i < end - 1; ++i) {
			dependencies[i] = dependencies[i + 1];
			calculations[i] = calculations[i + 1];
		}
		dependencies[end - 1] = firstDependency;
		calculations[end - 1] = firstCalculation;
	};

	aes['resetDependencies'] = () => {
		dependencies = {};
		calculations = {};
	};


	let tappedCell = null;

	function processClosure(active, visited, depth, addActiveClass) {
		if (!active.length || depth > 10) return;

		const nextLevel = [];

		const className = "active-" + depth;
		_.each(active, (obj) => {
			if (visited.indexOf(obj) < 0) {
				_.each(dependencies[obj], (val) => { nextLevel.push(val); });
				visited.push(obj);
			}
			if (addActiveClass) {
				dom.addClass(jQuery('#' + obj), className);
			} else {
				dom.removeClass(jQuery('#' + obj), className);
			}
		});
		processClosure(nextLevel, visited, depth + 1, addActiveClass);
	}

	function repositionCalc() {
		const $calc = jQuery('#calc');
		if (tappedCell && jQuery('#' + tappedCell) && $calc.first()) {

			const box = absoluteBox(jQuery('#' + tappedCell));
			if (! box.width || ! box.height) {
				processClosure([tappedCell], [], 1, false);
				tappedCell = null;
				removeChilds($calc);
				aes.relayout();
			}
            dom.removeClass($calc, 'hidden');
			$calc.offset({ left: box.right + 4, top: box.bottom + 4});
		} else {
			dom.addClass($calc, 'hidden');
		}
	}

	function newLine($from, $to) {
		const fromBox = absoluteBox($from);
		const toBox = absoluteBox($to);
		if (! fromBox.width || ! fromBox.height || ! toBox.width || ! toBox.height) {
			return null;
		}

		const fromCenter = center(fromBox);
		const toCenter = center(toBox);

		let x1, y1, x2, y2;
		if (Math.abs(fromCenter.x - toCenter.x) > Math.abs(fromCenter.y - toCenter.y)) {
			const slope = (toCenter.y - fromCenter.y)/(toCenter.x - fromCenter.x);
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
			const slope = (toCenter.x - fromCenter.x)/(toCenter.y - fromCenter.y);
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

		const ref = jQuery('#main').offset();
		const $line = jQuery(document.createElementNS('http://www.w3.org/2000/svg', 'line'));
	    $line.attr('x1', x1 - ref.left);
	    $line.attr('y1', y1 - ref.top);
	    $line.attr('x2', x2 - ref.left);
	    $line.attr('y2', y2 - ref.top);
	    $line.attr('stroke', 'rgba(255, 0, 0, 0.3)');
	    $line.attr('stroke-width', "1px");
	    return $line;
	}

	function updateConnections() {
		const $connections = jQuery('#connections');
		removeChilds($connections);
		let bounds = absoluteBox(jQuery('#main'));
		$connections.css('width', bounds.width + 'px');
		$connections.css('height', bounds.height + 'px');

		if (tappedCell) {
			const $source = jQuery('#' + tappedCell);

			_.each(dependencies[tappedCell], (destination) => {
				const $destination = jQuery('#' + destination);
				const $line = newLine($source, $destination);
				if ($line) {
					$connections.append($line);
				}
			});
		}
	}

	aes['relayout'] = () => {
		repositionCalc();
		updateConnections();
	};

	aes['refreshTappedCell'] = () => {
		if (tappedCell) {
			processClosure([tappedCell], [], 1, true);			
		}
	};

	aes['doCellClick'] = (evt) => {
		if (tappedCell) {
			processClosure([tappedCell], [], 1, false);
		}
		const id = jQuery(evt.target).attr('id');
		if (id === tappedCell) {
			tappedCell = null;
		} else {
			tappedCell = id;
			processClosure([tappedCell], [], 1, true);
			const calc = jQuery('#calc');
			const msg = calculations[id];
			removeChilds(calc);
			_.each(msg, (elm) => { calc.append(elm); });
		}
		aes.relayout();
		evt.preventDefault();
	}

})();