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
var voucherIdRowData = [];
var tableview;
var alertMessage;
var voucherIDfield;
//Window Loading section
win = Titanium.UI.currentWindow;
win.title = 'Vouchers and Featured';
win.backgroundColor = 'stripped';

var currentTime = new Date();
var hours = currentTime.getHours();
var minutes = currentTime.getMinutes();
var year = currentTime.getFullYear();
var month = currentTime.getMonth() + 1;
var day = currentTime.getDate();
var currentDate;

//WHERE expiry_date >" + currentDate +  "ORDER BY voucherID DESC");

//Knight Finder standard Alert Messages
alertMessage = Titanium.UI.createAlertDialog({
	title: 'Knight Finder',
	message: 'Alert Message'
});



//Open the db
db = Titanium.Database.open('knightfinder');
reloadThings();
function reloadThings() {
	//padwithZero(theDate.getDate()) + "/" + padwithZero(theDate.getMonth() + 1) + "/" + padwithZero(theDate.getFullYear()) + " " + padwithZero(theDate.getHours()) + ":" + padwithZero(theDate.getMinutes());

	currentDate = padwithZero(year) + '-' + padwithZero(month) + '-' + padwithZero(day) + 'T' + padwithZero(hours) + ':' + padwithZero(minutes) + ':00';

	//var sql = ("SELECT * FROM vouchers WHERE expiry_date >'" + currentDate +  "' ORDER BY voucherID DESC");

	rowVouchers = db.execute("SELECT * FROM vouchers WHERE expiry_date >'" + currentDate +  "' ORDER BY voucherID DESC");
	
	//alertMessage.message = sql;
	//alertMessage.show();

	if (rowVouchers.field(0) == null) {

		lblNoVouchers = Titanium.UI.createLabel({
			text: 'You have no Saved Vouchers',
			height:50,
			top:150,
			left:10,
			width:300,
			color: '#3D3D3D',
			font: {
				fontSize:14,
				fontStyle:'Arial',
				fontWeight:'normal'
			},
			textAlign:'center'

		});

		win.add(lblNoVouchers);
	} else {
		
		
		
		
		var i = 0;
		

		while (rowVouchers.isValidRow()) {
			row = Ti.UI.createTableViewRow({
				backgroundColor:'#ffffff',
				selectedBackgroundColor:'#dddddd',
				height:35,
				hasChild: true
			});

			var voucherName = Ti.UI.createLabel({
				text: unescape(rowVouchers.field(2)),
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

			voucherIdRowData[i] = rowVouchers.field(0);
			tableData[i] = row;

			rowVouchers.next();
			i++;

			tableview = Titanium.UI.createTableView({
				data:tableData,
				top:0,
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
					var voucherID =  voucherIdRowData[e.index];

					
					voucherWin.voucherID = voucherID;
					voucherWin.voucherType = voucherType;


				Titanium.UI.currentTab.open(voucherWin,{animated:true});
			});
		}

	}
}

//This is part of the date adjustment
function padwithZero(number) {

	var testedNumber = number + "";

	if(testedNumber.length == 1) {
		return "0" + testedNumber;
	}

	return testedNumber;
}

win.addEventListener('focus', function() { reloadThings(); });

