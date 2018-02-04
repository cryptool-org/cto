'use strict';

const std_reflectors = {
	'A': "AE BJ CM DZ FL GY HX IV KW NR OQ PU ST",
	'B': "AY BR CU DH EQ FS GL IP JX KN MO TZ VW",
	'C': "AF BV CP DJ EI GO HY KR LZ MX NW QT SU"
};

const std_wheels = {
	'I':   "EKMFL GDQVZ NTOWY HXUSP AIBRC J",
	'II':  "AJDKS IRUXB LHWTM CQGZN PYFVO E",
	'III': "BDFHJ LCPRT XVZNY EIWGA KMUSQ O",
	'IV':  "ESOVP ZJAYQ UIRHX LNFTG KDCMW B",
	'V':   "VZBRG ITYUP SDNHL XAWMJ QOFEC K"
};

const std_overflows = {
	'I':   "R",
	'II':  "F",
	'III': "W",
	'IV':  "K",
	'V':   "A"
};

exports.reflectors = std_reflectors;
exports.wheels = std_wheels;
exports.overflows = std_overflows;
