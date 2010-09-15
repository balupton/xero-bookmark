/**
 * Xero Bookmark Script
 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
 * @copyright (c) 2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
 */
(function(){
	// Handle
	var jqueryReady = function($){
		
		// Upgrade Xero
		$(function(){
			// Prepare
			var	$toolbar = $('.x-toolbar-left:has(.xtb-text)'),
				$categoriseAll = $('<button>Categorise All</button>').appendTo($toolbar),
				$transactions = $('tr.x-transgrid-row.transactional');

			// Bind Event to $categoriseAll
			$categoriseAll.click(function(){
				// Fetch Category
				var category = prompt('Type category would you like to assign to the selected:');
				if ( !category ) {
					return;
				}
				
				// Filter
				var $checkedTransasctions = $transactions.filter(':has(:checkbox.multi:checked)');
				
				// Open Edit Box
				$checkedTransasctions.addClass('opened');
				
				// Apply Category
				$checkedTransasctions.find('td.expand div.fields.edit-name label.category :text').val(category);
	
				// Save Change
				$checkedTransasctions.find('td.expand a.ok_button').trigger('click');
			});

			// Add Checkboxes
			$transactions.find('td:first-child').prepend('<input type="checkbox" class="multi"/>');
			
			// Done
		});
	};

	// Prepare
	var jqueryInserted = null;
		ensureFunction = function(){
			// Ensure jQuery
			if ( typeof jQuery === 'undefined' ) {
				// Insert?
				if ( jqueryInserted === null ) {
					// Log
					window.status = 'Loading jQuery... Please wait..';
					// Insert
					var e = document.createElement('script');
					e.setAttribute('language','javascript');
					e.setAttribute('src','http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js');
					document.body.appendChild(e);
					delete e;
				}
				// Recall
				setTimeout(ensureFunction, 500);
			}
			else {
				// jQuery is Loaded
				
				// Enter NoConflict Mode
				jQuery.noConflict();
				
				// Fire Ready
				jqueryReady(jQuery);
			}
		};
		
	// Ensure
	ensureFunction();
})();