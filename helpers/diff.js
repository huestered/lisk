/*
 * Copyright © 2018 Lisk Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Lisk Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 */
'use strict';
/**
 * Description if the module.
 *
 * @module
 * @todo Add description of the module
 */
module.exports = {
	/**
	 * Changes operation sign.
	 *
	 * @param {Array} diff - Description of the param
	 * @returns {Array} reverse sign.
	 * @todo Add description of the parameter
	 */
	reverse: function(diff) {
		var copyDiff = diff.slice();
		for (var i = 0; i < copyDiff.length; i++) {
			var math = copyDiff[i][0] === '-' ? '+' : '-';
			copyDiff[i] = math + copyDiff[i].slice(1);
		}
		return copyDiff;
	},

	/**
	 * Acts over source content adding(+) or deleting(-) public keys based on diff content.
	 *
	 * @param {Array} source - Description of the param
	 * @param {Array} diff - Description of the param
	 * @returns {Array} Source data without -publicKeys and with +publicKeys from diff.
	 * @todo Add descriptions of the parameters
	 */
	merge: function(source, diff) {
		var res = source ? source.slice() : [];
		var index;

		for (var i = 0; i < diff.length; i++) {
			var math = diff[i][0];
			var publicKey = diff[i].slice(1);

			if (math === '+') {
				res = res || [];

				index = -1;
				if (res) {
					index = res.indexOf(publicKey);
				}
				if (index !== -1) {
					return false;
				}

				res.push(publicKey);
			}
			if (math === '-') {
				index = -1;
				if (res) {
					index = res.indexOf(publicKey);
				}
				if (index === -1) {
					return false;
				}
				res.splice(index, 1);
				if (!res.length) {
					res = null;
				}
			}
		}
		return res;
	},
};
