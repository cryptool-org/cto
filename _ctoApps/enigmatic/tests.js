var assert = require('assert');
var crypt = require('./crypt.js');
var std = require('./config.js');
var wheels = require('./wheels.js');

var mock = { 
	find: function() { return mock; },
	empty: function() { return mock; },
	appendTo: function() { return mock; },
	text: function() { return mock; },
	parent: function() { return mock; }
}; 
global.jQuery = function() { return mock; }
global.jQuery.parseHTML = function() { return mock; }

function build_std_wheel(nr, ring) {
	var wheel = wheels.from_to(std.wheels[nr]);
	wheel.overflow = std.overflows[nr];
	wheel.ring = ring
	return wheel;
}

function test_enigma(
	std_wheels,
	wheel_rings,
	std_reflector,
	plugboard,
	key,
	msg,
	expected
) {
	var state = {
		wheels: [],
		plugboard: wheels.from_reflector(plugboard),
		reflector: wheels.from_reflector(std.reflectors[std_reflector])
	};
	for (var i = 0; i < std_wheels.length; ++i) {
		state.wheels.push(build_std_wheel(std_wheels[i], wheel_rings[i]));
	}
	var encrypted = crypt.encode(msg, key, state);
	assert.equal(encrypted, expected);
	var decoded = crypt.encode(encrypted, key, state);
	assert.equal(decoded, msg);
}

function test_advancement(std_wheels, wheel_rings, pre_key, post_key) {
	var state = {
		wheels: [],
	};
	for (var i = 0; i < std_wheels.length; ++i) {
		state.wheels.push(build_std_wheel(std_wheels[i], wheel_rings[i]));
		state.wheels[i].anomal = true;
	}
	state.wheels[std_wheels.length - 1].anomal = false;
	assert.equal(crypt.advance_wheels(pre_key, state), post_key);
}

// source: https://de.wikipedia.org/wiki/Enigma_%28Maschine%29
test_enigma(
	['I', 'IV', 'III'], 
	[16, 26, 8], 
	'B', 
	'AD CN ET FL GI JV KZ PU QY WX', 
	'QWE', 
	'RTZ', 
	'EWG'
);
test_enigma(
	['I', 'IV', 'III'], 
	[16, 26, 8], 
	'B', 
	'AD CN ET FL GI JV KZ PU QY WX', 
	'RTZ',
	(
		'DASOB ERKOM MANDO DERWE HRMAQ TGIBT BEKAN NTXAA CHENX AACHE NXIST '
	+
		'GERET TETXD URQGE BUEND ELTEN EINSA TZDER HILFS KRAEF TEKON NTEDI '
	+
		'EBEDR OHUNG ABGEW ENDET UNDDI ERETT UNGDE RSTAD TGEGE NXEIN SXAQT '
	+
		'XNULL XNULL XUHRS IQERG ESTEL LTWER DENX'
	), 
	(
		'LJPQH SVDWC LYXZQ FXHIU VWDJO BJNZX RCWEO TVNJC IONTF QNSXW ISXKH '
	+
		'JDAGD JVAKU KVMJA JHSZQ QJHZO IAVZO WMSCK ASRDN XKKSR FHCXC MPJGX '
	+
		'YIJCC KISYY SHETX VVOVD QLZYT NJXNU WKZRX UJFXM BDIBR VMJKR HTCUJ '
	+
		'QPTEE IYNYN JBEAQ JCLMU ODFWM ARQCF OBWN'
	)
);
test_advancement(['I', 'II', 'III'], [1, 1, 1], 'ADU', 'ADV');
test_advancement(['I', 'II', 'III'], [1, 1, 1], 'ADV', 'AEW');
test_advancement(['I', 'II', 'III'], [1, 1, 1], 'AEW', 'BFX');
test_advancement(['I', 'II', 'III'], [1, 1, 1], 'BFX', 'BFY');

// source: http://cryptocellar.org/Enigma/EMsg1930.html
test_enigma(
	['II', 'I', 'III'],
	[24, 13, 22],
	'A',
	'AM FI NV PS TU WZ',
	'FOL',
	'ABLABL',
	'PKPJXI'
);
test_enigma(
	['II', 'I', 'III'],
	[24, 13, 22],
	'A',
	'AM FI NV PS TU WZ',
	'ABL',
	(
		'FEIND LIQEI NFANT ERIEK OLONN EBEOB AQTET XANFA NGSUE DAUSG ANGBA '
	+
		'ERWAL DEXEN DEDRE IKMOS TWAER TSNEU STADT'
	),
	(
		'GCDSE AHUGW TQGRK VLFGX UCALX VYMIG MMNMF DXTGN VHVRM MEVOU YFZSL '
	+
		'RHDRR XFJWC FHUHM UNZEF RDISI KBGPM YVXUZ'
	)
);

// source: http://wiki.franklinheath.co.uk/index.php/Enigma/Sample_Messages
test_enigma(
	['II', 'IV', 'V'],
	[2, 21, 12],
	'B',
	'AV BS CG DL FU HZ IN KM OW RX',
	'BLA',
	(
		'AUFKL XABTE ILUNG XVONX KURTI NOWAX KURTI NOWAX NORDW ESTLX SEBEZ '
	+
		'XSEBE ZXUAF FLIEG ERSTR ASZER IQTUN GXDUB ROWKI XDUBR OWKIX OPOTS '
	+
		'CHKAX OPOTS CHKAX UMXEI NSAQT DREIN ULLXU HRANG ETRET ENXAN GRIFF '
	+
		'XINFX RGTX'
	),
	(
		'EDPUD NRGYS ZRCXN UYTPO MRMBO FKTBZ REZKM LXLVE FGUEY SIOZV EQMIK '
	+
		'UBPMM YLKLT TDEIS MDICA GYKUA CTCDO MOHWX MUUIA UBSTS LRNBZ SZWNR '
	+
		'FXWFY SSXJZ VIJHI DISHP RKLKA YUPAD TXQSP INQMA TLPIF SVKDA SCTAC '
	+
		'DPBOP VHJK'
	)
);
test_enigma(
	['II', 'IV', 'V'], 
	[2, 21, 12], 
	'B', 
	'AV BS CG DL FU HZ IN KM OW RX', 
	'LSD', 
	(
		'DREIG EHTLA NGSAM ABERS IQERV ORWAE RTSXE INSSI EBENN ULLSE QSXUH '
	+
		'RXROE MXEIN SXINF RGTXD REIXA UFFLI EGERS TRASZ EMITA NFANG XEINS '
	+
		'SEQSX KMXKM XOSTW XKAME NECXK'
	), 
	(
		'SFBWD NJUSE GQOBH KRTAR EEZMW KPPRB XOHDR OEQGB BGTQV PGVKB VVGBI '
	+
		'MHUSZ YDAJQ IROAX SSSNR EHYGG RPISE ZBOVM QIEMM ZCYSG QDGRE RVBIL '
	+
		'EKXYQ IRGIR QNRDN VRXCY YTNJR'
	)
);

