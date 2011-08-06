/**
 * @author Justin Howard - Knight Finder Version 1.3 01/July/2011 - Knight Application Systems
 */

//Local Variables
var win;
var db;
var rowVouchers;
var lblNoVouchers;
var row;
var tableData = [];
var tableDataRowIds = [];
var tableview;
var alertMessage;
var voucherIDfield;
//Window Loading section
win = Titanium.UI.currentWindow;
win.title = 'Vouchers and Featured';
win.backgroundColor = 'stripped';



//Knight Finder standard Alert Messages
alertMessage = Titanium.UI.createAlertDialog({
	title: 'Knight Finder',
	message: 'Alert Message'
});



//Open the db
db = Titanium.Database.open('knightfinder');
reloadThings();
function reloadThings() {
	rowVouchers = db.execute('SELECT * FROM vouchers ORDER BY voucherID DESC');

	if (rowVouchers.field(0) == null) {

		lblNoVouchers = Titanium.UI.createLabel({
			text: 'You have no Saved Vouchers',
			height:50,
			top:10,
			left:10,
			width:'auto',
			color: '#3D3D3D',
			font: {
				fontSize:14,
				fontStyle:'Arial',
				fontWeight:'bold'
			},
			textAlign:'left'

		});

		win.add(lblNoVouchers);
	} else {
		var i = 0;

		while (rowVouchers.isValidRow()) {
			row = Ti.UI.createTableViewRow({
				height:'auto',
				backgroundColor:'#ffffff',
				selectedBackgroundColor:'#dddddd',
				height:35
			});

			var voucherName = Ti.UI.createLabel({
				text: rowVouchers.field(2),
				color: '#3D3D3D',
				textAlign:'left',
				left:10,
				height:'auto',
				font: {
					fontWeight:'bold',
					fontSize:13
				}
			});
			
			var voucherIDfield = Ti.UI.createLabel({
				text: rowVouchers.field(0),
				color: '#3D3D3D',
				textAlign:'left',
				left:10,
				height:'auto',
				font: {
					fontWeight:'bold',
					fontSize:13
				}
			});

			row.add(voucherName);
			row.add(voucherIDfield);
			voucherIDfield.visible = false;

			tableData[i] = row;

			rowVouchers.next();
			i++;

			tableview = Titanium.UI.createTableView({
				data:tableData,
				top:10,
				style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
				headerTitle:'Your saved vouchers'
			});

			Titanium.UI.currentWindow.add(tableview);
			
			tableview.addEventListener('click',function(e)
			{
					var index = e.index;
					var section = e.section;
					var row = e.row;
					var rowdata = e.rowData;
					

					

				 voucherWin = Titanium.UI.createWindow(
						{
							url:'kfVoucher.js'
						});

					var voucherType = 'Saved Venue Deal';
					var voucherID =  voucherIDfield[i].text;

					
					voucherWin.voucherID = voucherID;
					voucherWin.voucherType = voucherType;


				Titanium.UI.currentTab.open(voucherWin,{animated:true});
			});
		}

	}
}

win.addEventListener('focus', function() { reloadThings(); });

