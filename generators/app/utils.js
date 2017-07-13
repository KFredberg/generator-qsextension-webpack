/*global module, require*/
'use strict';
var fs = require( 'fs' );

module.exports = {

	getLicense: function ( options ) {

    console.log('licenseName:', options);

		var license_file = __dirname + '/licenses/' + options.license + '.txt';
		var lic_content = fs.readFileSync( license_file, 'utf8' );

		// Make replacements for year and fullname.
		var temp_result = lic_content
			.replace( /\[year\]/g, options.publishingYear )
			.replace( /\[fullname\]/g, options.authorName )
			.replace( /\[project\]/g, options.extensionName );

		// Prefix every line with a >
		var lineArray = temp_result.split( '\n' );
		var result = [];
		for ( var i = 0; i < lineArray.length; i++ ) {
			result.push( '> ' + lineArray[i] );
		}
		return result.join( '\n' );

	}
}
;
