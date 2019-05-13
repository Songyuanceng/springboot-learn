var CreatedOKLodop7766=null;
YTO = {};
YTO.Printer = function(){
	function getPrinter(oOBJECT,oEMBED){
	    var Printer = null;		
	    //=====判断浏览器类型:===============
	    var isIE	 = (navigator.userAgent.indexOf('MSIE')>=0) || (navigator.userAgent.indexOf('Trident')>=0);
	  //=====如果页面有Lodop就直接使用，没有则新建:==========
	     if (oOBJECT!=undefined || oEMBED!=undefined) { 
            if (isIE){
           	     Printer=oOBJECT; 
            }
	         else{
	        	 Printer=oEMBED;
	         }
	     } else { 
			 if (CreatedOKLodop7766==null){
	          	     Printer=document.createElement("object"); 
	          	     Printer.setAttribute("width",0); 
	                 Printer.setAttribute("height",0); 
	                 Printer.setAttribute("style","position:absolute;left:0px;top:-100px;width:0px;height:0px;");  		     
	                 if (isIE){
	                    Printer.setAttribute("classid","clsid:2105C259-1E0C-4534-8141-A753534CB4CA"); 
	                 }
	                 else{
	                	Printer.setAttribute("type","application/x-print-lodop");
	                 } 
	                 document.documentElement.appendChild(Printer); 
	                 CreatedOKLodop7766=Printer;		     
	 	      } else{
	 	    	  Printer=CreatedOKLodop7766;
	 	      }
	     };
	     return Printer; 
	};
	this.checkPrinter = function(oOBJECT,oEMBED){
		/**************************
		  本函数根据浏览器类型决定采用哪个页面元素作为Lodop对象:
		  IE系列、IE内核系列的浏览器采用oOBJECT，
		  其它浏览器(Firefox系列、Chrome系列、Opera系列、Safari系列等)采用oEMBED,
		  如果页面没有相关对象元素，则新建一个或使用上次那个,避免重复生成。
		  64位浏览器指向64位的安装程序install_lodop64.exe。
		 **************************/
		var strHtmInstall=document.getElementById("uninstallErrorMessage").value;
		var strHtm64_Install=document.getElementById("uninstallErrorMessage64").value;
		var strHtmFireFox= strHtmInstall + document.getElementById("fireFoxUninstallErrorMessage").value;
		var strHtmChrome= strHtmInstall + document.getElementById("chromeUninstallErrorMessage").value;
		//=====判断浏览器类型:===============
		var isIE	 = (navigator.userAgent.indexOf('MSIE')>=0) || (navigator.userAgent.indexOf('Trident')>=0);
		var is64IE  = isIE && (navigator.userAgent.indexOf('x64')>=0);
		var printer = getPrinter(oOBJECT,oEMBED);
		//=====判断Lodop插件是否安装过，没有安装或版本过低就提示下载安装:==========
	     if ((printer==null)||(typeof(printer.VERSION)=="undefined")) {
	    	if (navigator.userAgent.indexOf('Chrome')>=0){
				alert(strHtmChrome);
			}
			else if (navigator.userAgent.indexOf('Firefox')>=0){
				alert(strHtmFireFox);
			}
			else if (is64IE) {
				alert(strHtm64_Install); 
			} 
			else{
				alert(strHtmInstall);    
			}
			return false;
	     }
	     return true;
	};
	
	/**
	 * 画一条水平虚线
	 */
	function drawHorizontalDashLine(g, x1, y1, width)
	{
		var strokeWidth = 1;
		var lineWidth = 2;
		var dashWidth = 5;
		var spaceWidth = 5;
		var x = y1, y = x1;
		if (width <= dashWidth)
		{
			g.ADD_PRINT_LINE(x, y, (x + strokeWidth), (y + width), 0, lineWidth);
			return;
		}
		g.ADD_PRINT_LINE(x, y, (x + strokeWidth), (y + dashWidth), 0, lineWidth);
		for (var length = (dashWidth + spaceWidth); length < width; )
		{
			if ((length + dashWidth + spaceWidth) > width)
			{
				if ((length + dashWidth) > width)
				{
					var increment = length + dashWidth - width;
					if (increment == lineWidth)
					{
						increment = increment - 1;
					}
					g.ADD_PRINT_LINE(x, (y + length), (x + strokeWidth), (y + length + dashWidth - increment), 0, lineWidth);
					return;
				}
				else
				{
					g.ADD_PRINT_LINE(x, (y + length), (x + strokeWidth), (y + length + dashWidth), 0, lineWidth);
					return;
				}
			}
			g.ADD_PRINT_LINE(x, (y + length), (x + strokeWidth), (y + length + dashWidth), 0, lineWidth);
			length = length + dashWidth + spaceWidth;
		}
	};
	
	/**
	 * 画一条水平直线
	 * light, true 表示普通, false表示加粗
	 */
	function drawHorizontalLine(g, x, y, width, light){
		var strokeWidth = 1;
		var lineWidth = 2;
		if(light){
			lineWidth = 1;
		}
		g.ADD_PRINT_LINE( y, x, (y + strokeWidth), (x + width), 0, lineWidth);
	};
	
	/**
	 * 画一条垂直直线
	 * light, true 表示普通, false表示加粗
	 */
	function drawVerticalLine(g, x, y, height, light){
		var strokeWidth = 1;
		var lineWidth = 2;
		if(light){
			lineWidth = 1;
		}
		g.ADD_PRINT_LINE(y, x, (y + height),(x + strokeWidth), 0, lineWidth);
	}
	
	/**
	 * 绘制面单的基本框架
	 */
	function drawOutline(Printer,isStore){
		//上联框架
		drawHorizontalLine(Printer, 13, 19, 356);
		drawVerticalLine(Printer, 13, 19, 361);
		drawVerticalLine(Printer, 369, 19, 361);
		drawHorizontalLine(Printer, 13, 380, 356);
		
		//分割线
		drawHorizontalDashLine(Printer, 13, 392, 356);
		
		//下联框架
		drawHorizontalLine(Printer, 13, 402, 356);
		drawHorizontalLine(Printer, 13, 464, 356,true);
		//drawHorizontalLine(Printer, 17, 405, 352,true);
		if(isStore){
			//drawHorizontalLine(Printer, 13, 474, 356,true);
			drawHorizontalLine(Printer, 13, 484, 356,true);
			
			drawVerticalLine(Printer, 33, 484, 186,true);
		}
		
		drawVerticalLine(Printer, 13, 402, 267);
		drawVerticalLine(Printer, 370, 402, 267);
		drawHorizontalLine(Printer, 13, 670, 356);
		if(!isStore){
			//上联框架
			
			drawHorizontalLine(Printer, 13, 56, 356,true);
			drawHorizontalLine(Printer, 13, 119, 356,true);
			drawHorizontalLine(Printer, 13, 199, 356,true);
			drawHorizontalLine(Printer, 37, 236, 193,true);
			drawHorizontalLine(Printer, 37, 253, 193,true);
			
			
			drawVerticalLine(Printer, 37, 119, 260,true);
			drawVerticalLine(Printer, 230, 199, 180,true);
			drawVerticalLine(Printer, 230, 56, 63,true);
			
			drawHorizontalLine(Printer, 230, 255, 140,true);
			drawHorizontalLine(Printer, 230, 317, 140,true);
			drawHorizontalLine(Printer, 37, 363, 193,true);

			//下联框架
			
			//drawHorizontalLine(Printer, 17, 405, 352,true);
			drawHorizontalLine(Printer, 13, 544, 356,true);
			drawHorizontalLine(Printer, 37, 565, 195,true);
			drawHorizontalLine(Printer, 37, 586, 195,true);
			drawVerticalLine(Printer, 37, 464, 206,true);
			drawVerticalLine(Printer, 232, 544, 126,true);
			drawHorizontalLine(Printer, 232, 625, 137,true);
			
			
		}
	};
	
	/**
	 * 打印面单基本内容
	 */
	function print(Printer, waybillInfo, translatedOnly){
		Printer.PRINT_INIT("面单打印");
		Printer.SET_PRINT_PAGESIZE(1, 1000, 1500, "面单");
		//打印面单线框
		drawOutline(Printer);
		
		//128A 条形码
		Printer.ADD_PRINT_BARCODE(40, 48,161,39,"128A",waybillInfo.mailNo);
		Printer.SET_PRINT_STYLEA(0,"ShowBarText",0);
		
		var result = "";
		for(var i=0; i <= waybillInfo.mailNo.length-1; i++){
			result += waybillInfo.mailNo.charAt(i) + " ";
		}
		Printer.ADD_PRINT_TEXT(82,22,210,20, result);
		Printer.SET_PRINT_STYLEA(0,"Alignment",2);
		Printer.SET_PRINT_STYLE("FontName", "微软雅黑");
		
		//大头笔
		if(waybillInfo.bigPen){
			Printer.ADD_PRINT_TEXT(40,229,140,55, waybillInfo.bigPen);
			Printer.SET_PRINT_STYLEA(0,"Alignment",2);
			Printer.SET_PRINT_STYLEA(0,"FontSize",getBigPenFontSize(waybillInfo.bigPen));
			Printer.SET_PRINT_STYLEA(0,"Bold",1);
		}
		
		var itemCount=0;
		
		for(var index in waybillInfo.items){
			var item = waybillInfo.items[index];
			itemCount += item.itemNum;
		}
		
		//是否代收货款
		if(waybillInfo.agencyFund > 0){
			
			Printer.ADD_PRINT_TEXT(172,21,20,77,"详细内容");
			Printer.SET_PRINT_STYLEA(0,"FontSize",9);
			
			Printer.ADD_PRINT_TEXT(257,21,20,60,"代收款");
			Printer.SET_PRINT_STYLEA(0,"FontSize",9);
			
			drawHorizontalLine(Printer, 37, 251, 193,true);
			drawHorizontalLine(Printer, 17, 237, 213,true);
			Printer.ADD_PRINT_TEXT(240,41,90,20,"数量:"+itemCount);
			Printer.ADD_PRINT_TEXT(240,132,80,20,"重量:" + waybillInfo.packWeight + " "+ waybillInfo.packWeightUnit);
			
			Printer.ADD_PRINT_TEXT(261,41,105,20,"代收款金额(小写):");
			Printer.SET_PRINT_STYLEA(0,"FontSize",8);
			Printer.ADD_PRINT_TEXT(278,41,195,40,"(大写): " + upDigit(waybillInfo.agencyFund));
			Printer.SET_PRINT_STYLEA(0,"FontSize",8);

			Printer.ADD_PRINT_TEXT(259,131,99,30,"￥" + waybillInfo.agencyFund + "元");
			Printer.SET_PRINT_STYLEA(0,"FontSize",10);
			Printer.SET_PRINT_STYLEA(0,"Alignment",2);
			Printer.SET_PRINT_STYLEA(0,"Bold",1);

		}else{
			Printer.ADD_PRINT_TEXT(193,21,20,77,"详细内容");
			Printer.SET_PRINT_STYLEA(0,"FontSize",9);
			
			drawHorizontalLine(Printer, 37, 289, 193,true);
			Printer.ADD_PRINT_TEXT(294,41,90,20,"数量:"+itemCount);
			Printer.ADD_PRINT_TEXT(294,137,80,20,"重量:" + waybillInfo.packWeight + " "+ waybillInfo.packWeightUnit);
		}
		
		Printer.ADD_PRINT_TEXT(20,221,161,19,"上联:此联由圆通速递留存");
		Printer.SET_PRINT_STYLEA(0,"FontSize",9);
		
		Printer.ADD_PRINT_TEXT(103,21,21,55,"收件人");
		Printer.SET_PRINT_STYLEA(0,"FontSize",9);
		
		//收件人地址
		var receiverAddress = "";
		if(translatedOnly){
			if(waybillInfo.translateStateCode == "2"){
				//waybillInfo.translateStateCode == "2" means translate completed
				receiverAddress = getReceiverTranslateAddress(waybillInfo);
			}else{
				receiverAddress = getReceiverAddress(waybillInfo);
			}
		}
		else{
			receiverAddress = getReceiverTranslateAddress(waybillInfo) + " " + getReceiverAddress(waybillInfo);
		}
		Printer.ADD_PRINT_TEXT(97,41,235,45,receiverAddress);
		if(!translatedOnly && waybillInfo.translateStateCode == "2"){
			Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		}
		
		Printer.ADD_PRINT_TEXT(97,277,90,20,"邮编:" + waybillInfo.receiverPostCode);
		Printer.SET_PRINT_STYLEA(0,"Alignment",3);
	
		var receiverInfo = "";
		if(waybillInfo.receiverMobile==waybillInfo.receiverPhone){
			receiverInfo=waybillInfo.receiverName + " 电话:" + waybillInfo.receiverMobile;
		}else{
			receiverInfo=waybillInfo.receiverName + " 电话:" + waybillInfo.receiverMobile+","+waybillInfo.receiverPhone;
		}
		Printer.ADD_PRINT_TEXT(145,41,320,20,receiverInfo);
		
//		if(notEmpty(waybillInfo.receiverMobile)){
//			Printer.ADD_PRINT_TEXT(145,41,320,20, waybillInfo.receiverName + " 电话:" + waybillInfo.receiverMobile);
//		}
//		else if(notEmpty(waybillInfo.receiverPhone)){
//			Printer.ADD_PRINT_TEXT(145,41,320,20, waybillInfo.receiverName + " 电话:" + waybillInfo.receiverPhone);
//		}
//		else{
//			Printer.ADD_PRINT_TEXT(145,41,320,20, waybillInfo.receiverName + " 电话:");
//		}
		Printer.SET_PRINT_STYLEA(0,"Alignment",3);

		Printer.ADD_PRINT_TEXT(161,41,200,20,"订单号:" + waybillInfo.upstreamCompanyOrderId);
		Printer.SET_PRINT_STYLEA(0,"FontSize",9);
		
		//还没有找到这个字段
		Printer.ADD_PRINT_TEXT(177,41,80,20,"发货单号:");
		Printer.SET_PRINT_STYLEA(0,"FontSize",9);
		var content = "";
		for(var index in waybillInfo.items){
			var item = waybillInfo.items[index];
			content += item.itemName + " x" + item.itemNum + " ";
		}
		if(!translatedOnly){
			for(var index in waybillInfo.items){
				var item = waybillInfo.items[index];
				content += item.itemNameTranslate + " x" + item.itemNum + " ";
			}
		}
		if(waybillInfo.agencyFund > 0){
			Printer.ADD_PRINT_TEXT(193,41,210,45,"内容品名:" + content);
		}
		else{
			Printer.ADD_PRINT_TEXT(193,41,210,95,"内容品名:" + content);
		}
		if(!translatedOnly){
			Printer.SET_PRINT_STYLEA(0,"FontSize",5);
		}
		else{
			Printer.SET_PRINT_STYLEA(0,"FontSize",9);
		}
		
		Printer.ADD_PRINT_TEXT(161,236,91,20,"收件人签名:");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
	
		Printer.ADD_PRINT_TEXT(205,236,116,20,"代收人姓名(签字):");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
	
		Printer.ADD_PRINT_TEXT(250,234,145,82,"圆通速递将快件送达收件人地址，经收件人或者收件人(寄件人)允许的代收人签字，视为送达");
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
	
		Printer.ADD_PRINT_TEXT(180,236,73,17,"证件号:");
		Printer.SET_PRINT_STYLEA(0,"FontSize",5);
	
		Printer.ADD_PRINT_TEXT(193,315,59,20,"年      月      日");
		Printer.SET_PRINT_STYLEA(0,"FontSize",5);
	
		Printer.ADD_PRINT_TEXT(222,236,41,20,"证件号:");
		Printer.SET_PRINT_STYLEA(0,"FontSize",5);
	
		Printer.ADD_PRINT_TEXT(231,295,85,20,"由收件人允许代为签收");
		Printer.SET_PRINT_STYLEA(0,"FontSize",5);
	
		Printer.ADD_PRINT_TEXT(241,315,60,20,"年      月      日");
		Printer.SET_PRINT_STYLEA(0,"FontSize",5);
	
		Printer.ADD_PRINT_TEXT(416,21,25,76,"收件人");
		Printer.ADD_PRINT_TEXT(409,41,226,50, receiverAddress);
		Printer.ADD_PRINT_TEXT(409,273,90,20,"邮编:" + waybillInfo.receiverPostCode);
		Printer.SET_PRINT_STYLEA(0,"Alignment",3);
		
		Printer.ADD_PRINT_TEXT(458,39,320,20,receiverInfo);
//		if(notEmpty(waybillInfo.receiverMobile)){
//			Printer.ADD_PRINT_TEXT(458,39,320,20, waybillInfo.receiverName + " 电话:" + waybillInfo.receiverMobile);
//		}
//		else if(notEmpty(waybillInfo.receiverPhone)){
//			Printer.ADD_PRINT_TEXT(458,39,320,20, waybillInfo.receiverName + " 电话:" + waybillInfo.receiverPhone);
//		}
//		else{
//			Printer.ADD_PRINT_TEXT(458,39,320,20, waybillInfo.receiverName + " 电话:");
//		}
		Printer.SET_PRINT_STYLEA(0,"Alignment",3);
		
		Printer.ADD_PRINT_TEXT(485,21,22,105,"详细内容");
		Printer.ADD_PRINT_TEXT(479,41,210,20,"运单号:" + waybillInfo.mailNo);
		Printer.ADD_PRINT_TEXT(495,41,210,20,"发件人:" + waybillInfo.senderName);
		
		var senderAddress = "";
		if(translatedOnly){
			if(waybillInfo.translateStateCode == "2"){
				//waybillInfo.translateStateCode == "2" means translate completed
				senderAddress = getSenderTranslateAddress(waybillInfo);
			}else{
				senderAddress = getSenderAddress(waybillInfo);
			}
		}
		else{
			senderAddress = getSenderTranslateAddress(waybillInfo)+ " " + getSenderAddress(waybillInfo);
		}
		Printer.ADD_PRINT_TEXT(511,41,193,36,"发件地址:" + senderAddress);
		if(!translatedOnly && waybillInfo.translateStateCode == "2"){
			Printer.SET_PRINT_STYLEA(0,"FontSize",5);
		}
		
//		if(notEmpty(waybillInfo.senderMobile)){
//			Printer.ADD_PRINT_TEXT(543,41,185,10,"电话:" + waybillInfo.senderMobile);
//		}
//		else if(notEmpty(waybillInfo.senderPhone)){
//			Printer.ADD_PRINT_TEXT(543,41,185,10,"电话:" + waybillInfo.senderPhone);
//		}
//		else{
//			Printer.ADD_PRINT_TEXT(543,41,185,10,"电话:");
//		}
		var senderInfo="";
		if(waybillInfo.senderMobile==waybillInfo.senderPhone){
			senderInfo="电话:" + waybillInfo.senderMobile;
		}else{
			senderInfo="电话:" + waybillInfo.senderMobile+","+waybillInfo.senderPhone;
		}
		Printer.ADD_PRINT_TEXT(543,41,185,10,senderInfo);
		
		Printer.SET_PRINT_STYLEA(0,"Alignment",3);
		Printer.SET_PRINT_STYLEA(0,"FontSize", 8);
		
		Printer.ADD_PRINT_TEXT(479,234,145,60,"此运单仅供圆通速递签约客户使用,相关责任义务以双方合作合同为准");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		
		Printer.ADD_PRINT_TEXT(324,233,150,20,"下联:此联由收件人留存");
		Printer.ADD_PRINT_TEXT(324,16,200,20,"运单号:" + waybillInfo.mailNo);
		
		if(waybillInfo.upstreamCompanyLogoName){
			Printer.ADD_PRINT_IMAGE(520,233,135,35,"<img src=\'" + $('#basePath').val() + "/resources/images/logo/print/" + waybillInfo.upstreamCompanyCode + ".jpg\'/>");
		}
		Printer.SET_PRINT_STYLEA(0,"Stretch",1);
		
		// 预览打印
		Printer.PREVIEW();
//		var str=Printer.PRINT_DESIGN();
//		console.log(str);
//		return true;
//		var result = Printer.PRINT();
		return result;//result 为true表示打印成功， false表示打印失败
	};
	
	//print suda waybill
	function sudaPrint(Printer, waybillInfo){
		
		Printer.PRINT_INITA(0,0,374,737,"速达面单");
		Printer.SET_PRINT_PAGESIZE(1,990,1950,"速达面单");
		Printer.ADD_PRINT_IMAGE(10,14,346,780,"<img border='0' src=\'" + $('#basePath').val() + "/resources/images/print/background/suda_waybill_background.jpg" +"\' />");
		Printer.SET_PRINT_STYLEA(0,"Stretch",1);
		Printer.ADD_PRINT_BARCODE(55,93,180,43,"",waybillInfo.mailNo);
		Printer.SET_PRINT_STYLEA(0,"ShowBarText",0);
		
		if(waybillInfo.receiverPostcode7Dash!="" && waybillInfo.receiverPostcode7Dash != null ){
			Printer.ADD_PRINT_BARCODE(336,27,160,43,"Code39",'*'+waybillInfo.receiverPostcode7Dash+'*');
			Printer.SET_PRINT_STYLEA(0,"ShowBarText",0);
		}
		
		Printer.ADD_PRINT_TEXT(101,76,180,20,waybillInfo.mailNo);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",11);
		Printer.SET_PRINT_STYLEA(0,"Alignment",2);
		Printer.ADD_PRINT_TEXT(124,73,210,20,waybillInfo.receiverName);
		Printer.SET_PRINT_STYLEA(0,"FontSize",10);
		Printer.ADD_PRINT_TEXT(139,73,210,20,waybillInfo.receiverPhone);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",10);
		Printer.ADD_PRINT_TEXT(154,73,210,30,waybillInfo.receiverAddressAfterPrint);
		Printer.SET_PRINT_STYLEA(0,"FontSize",10);
		Printer.SET_PRINT_STYLEA(0,"LineSpacing",-5);
		Printer.ADD_PRINT_TEXT(154,33,50,20,waybillInfo.receiverPostCode);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",10);
		Printer.ADD_PRINT_TEXT(189,73,210,20,waybillInfo.senderName);
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(202,73,100,20,waybillInfo.senderPhone);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.ADD_PRINT_TEXT(201,174,100,20,waybillInfo.senderMobile);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.ADD_PRINT_TEXT(212,73,200,30,waybillInfo.senderAddress);
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.SET_PRINT_STYLEA(0,"LineSpacing",-5);
		Printer.ADD_PRINT_TEXT(212,33,40,20,waybillInfo.senderPostCode);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(241,73,120,20,waybillInfo.upstreamCompanyOrderId);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.ADD_PRINT_TEXT(251,53,200,20,"0件");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.ADD_PRINT_TEXT(263,53,200,20,waybillInfo.packRemark);
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.ADD_PRINT_TEXT(136,293,70,20,waybillInfo.receiptDate);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(164,293,70,20,waybillInfo.reserveDeliveryDate);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(192,300,60,20,"不指定");
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(216,295,65,20,"北一特販所");
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(243,300,60,20,waybillInfo.packLength+waybillInfo.packWidth+waybillInfo.packHeight+"cm");
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(245,230,50,20,"不收款");
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		
		if(waybillInfo.receiverPostcode7Dash!="" && waybillInfo.receiverPostcode7Dash != null ){
			Printer.ADD_PRINT_TEXT(306,200,152,41,waybillInfo.receiverPostcode7Dash);
			Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
			Printer.SET_PRINT_STYLEA(0,"FontSize",21);
			Printer.SET_PRINT_STYLEA(0,"Bold",1);
		}
		
		Printer.ADD_PRINT_TEXT(398,73,210,20,waybillInfo.receiverName);
		Printer.SET_PRINT_STYLEA(0,"FontSize",10);
		Printer.ADD_PRINT_TEXT(417,73,210,20,waybillInfo.receiverPhone);
		Printer.SET_PRINT_STYLEA(0,"FontSize",10);
		Printer.ADD_PRINT_TEXT(441,33,50,20,waybillInfo.receiverPostCode);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",10);
		Printer.ADD_PRINT_TEXT(441,73,210,30,waybillInfo.receiverAddressAfterPrint);
		Printer.SET_PRINT_STYLEA(0,"FontSize",10);
		Printer.SET_PRINT_STYLEA(0,"LineSpacing",-5);
		Printer.ADD_PRINT_TEXT(504,73,210,20,waybillInfo.senderName);
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(518,73,100,20,waybillInfo.senderPhone);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.ADD_PRINT_TEXT(518,174,100,20,waybillInfo.senderMobile);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.ADD_PRINT_TEXT(531,33,40,20,waybillInfo.senderPostCode);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(534,73,200,30,waybillInfo.senderAddress);
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.SET_PRINT_STYLEA(0,"LineSpacing",-5);
		Printer.ADD_PRINT_TEXT(570,73,100,20,waybillInfo.customerId);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.ADD_PRINT_TEXT(585,72,120,20,waybillInfo.upstreamCompanyOrderId);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.ADD_PRINT_TEXT(601,53,200,20,waybillInfo.packRemark);
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.ADD_PRINT_TEXT(573,230,50,20,"不收款");
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.ADD_PRINT_TEXT(407,293,70,20,waybillInfo.receiptDate);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(450,293,70,20,waybillInfo.reserveDeliveryDate);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(489,300,60,20,"不指定");
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(528,295,65,20,"北一特販所");
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(568,300,60,20,waybillInfo.packLength+waybillInfo.packWidth+waybillInfo.packHeight+"cm");
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.ADD_PRINT_BARCODE(617,184,186,46,"Code39",waybillInfo.mailNo);
		Printer.SET_PRINT_STYLEA(0,"ShowBarText",0);
		Printer.ADD_PRINT_TEXT(664,166,180,20,waybillInfo.mailNo);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",11);
		Printer.SET_PRINT_STYLEA(0,"Alignment",2);


//设计视图		
//		var str=Printer.PRINT_DESIGN();
//		console.log(str);
//		return true;
		
//预览打印
		Printer.PREVIEW();
		return true;

//真实环境
//		var result = Printer.PRINT();
//		return result;//result 为true表示打印成功， false表示打印失败
	}
	
	
	
	
	//print home mail
	function toHomePrint(Printer, info){
		
		Printer.PRINT_INITA(0,0,374,845,"宅配面单");
		Printer.SET_PRINT_PAGESIZE(1,840,1950,"宅配面单");
		Printer.ADD_PRINT_IMAGE(0,0,316,730,"<img border='0' src=\'" + $('#basePath').val() + "/resources/images/print/background/home_background.jpg" +"\' />");
		Printer.SET_PRINT_STYLEA(0,"Stretch",1);
		Printer.ADD_PRINT_BARCODE(55,93,190,40,"Code39",info.ytoMailNo);//info.ytoMailNo
		Printer.SET_PRINT_STYLEA(0,"ShowBarText",0);
		
		Printer.ADD_PRINT_TEXT(100,103,150,20,info.ytoMailNo);//info.ytoMailNo
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",9);
		Printer.SET_PRINT_STYLEA(0,"Alignment",2);
		Printer.ADD_PRINT_TEXT(120,55,170,20,info.receiveName);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",9);
		Printer.ADD_PRINT_TEXT(136,55,170,20,info.receivePhone);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",9);
		Printer.ADD_PRINT_TEXT(148,55,170,30,info.receiveAddress);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",9);
		Printer.SET_PRINT_STYLEA(0,"LineSpacing",-5);
		Printer.ADD_PRINT_TEXT(153,15,50,20,info.receivePostcode);//postcode
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(189,55,170,20,info.senderName);//info.senderName
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(201,55,100,20,info.senderPhone);//info.senderPhone
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
//		Printer.ADD_PRINT_TEXT(201,174,100,20,info.senderPhone);
//		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
//		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.ADD_PRINT_TEXT(209,55,165,30,info.senderAddress);//info.senderAddress
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.SET_PRINT_STYLEA(0,"LineSpacing",-5);
		Printer.ADD_PRINT_TEXT(214,14,40,20,info.senderPostCode);//固定值A01
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);		
		
		//订单号
		if(info.orderNoList){
        	var orderNo = "";
        	var l = info.orderNoList.length <= 3?info.orderNoList.length:3;
    		for(var i=0;i<l;i++){
    			orderNo += info.orderNoList[i]+",";
    		}
    		Printer.ADD_PRINT_TEXT(245,60,500,20,orderNo);//订单编号
    		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
    		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
        }
		
		
		//备注
		if(info.mailNoList){
        	var content = "";
        	var l = info.mailNoList.length <= 3?info.mailNoList.length:3;
    		for(var i=0;i<l;i++){
    			content += info.mailNoList[i]+",";
    		}
    		Printer.ADD_PRINT_TEXT(258,60,300,20,content);
    		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
    		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
        }
		Printer.ADD_PRINT_TEXT(272,75,100,20,info.sender);//货物原产地
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(287,60,120,20,info.senderName);//发货人
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(272,260,100,20,info.receive);//到达
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(129,249,60,20,info.receiveDate);//收获日
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.ADD_PRINT_TEXT(157,249,60,20,info.deliveryDate);//配达日
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.ADD_PRINT_TEXT(183,253,50,20,info.deliveryTime);//配达时段
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(207,253,50,20,info.deliveryLocation);//发货所
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(236,253,50,20,info.size);//尺寸
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
//		Printer.ADD_PRINT_TEXT(323,12,65,20,info.itemCategory);//货品描述
//		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
//		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
//		Printer.ADD_PRINT_TEXT(322,83,25,20,info.itemCount);//件数
//		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
//		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
//		Printer.ADD_PRINT_TEXT(322,122,25,20,info.itemUnit);//单位
//		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
//		Printer.ADD_PRINT_TEXT(322,152,40,20,info.itemWeight);//重量
//		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
//		Printer.ADD_PRINT_TEXT(322,198,50,20,info.itemUnit);//单价
//		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
//		Printer.ADD_PRINT_TEXT(322,252,50,20,info.itemUnit);//总价
//		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.ADD_PRINT_BARCODE(320,100,183,40,"Code39",info.thirdMailNo);//info.thirdMailNo
		Printer.SET_PRINT_STYLEA(0,"ShowBarText",0);
		Printer.ADD_PRINT_TEXT(370,100,153,20,info.thirdMailNo);//info.thirdMailNo
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"Alignment",2);
		
//下半联
		Printer.ADD_PRINT_BARCODE(450,20,150,37,"Code39",info.ytoMailNo);//info.ytoMailNo
		Printer.SET_PRINT_STYLEA(0,"ShowBarText",0);
		
		//大头笔
		Printer.ADD_PRINT_TEXT(427,128,220,50, info.fiveCode);
		Printer.SET_PRINT_STYLEA(0,"Alignment",2);
		Printer.SET_PRINT_STYLEA(0,"FontSize",20);
		Printer.SET_PRINT_STYLEA(0,"Bold",1)
		
		Printer.ADD_PRINT_TEXT(500,55,165,20,info.receiveName);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");//ting
		Printer.SET_PRINT_STYLEA(0,"FontSize",9);
		Printer.ADD_PRINT_TEXT(513,55,165,20,info.receivePhone);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");//ting
		Printer.SET_PRINT_STYLEA(0,"FontSize",9);
		Printer.ADD_PRINT_TEXT(530,15,50,20,info.receivePostcode);//postcode
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(525,55,165,30,info.receiveAddress);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");//ting
		Printer.SET_PRINT_STYLEA(0,"FontSize",9);
		Printer.SET_PRINT_STYLEA(0,"LineSpacing",-5);
		Printer.ADD_PRINT_TEXT(570,55,165,20,info.senderName);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");//ting
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(582,55,165,20,info.senderPhone);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.ADD_PRINT_TEXT(597,15,40,20,info.senderPostCode);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(590,55,165,30,info.senderAddress);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");//ting
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.SET_PRINT_STYLEA(0,"LineSpacing",-5);
		Printer.ADD_PRINT_TEXT(630,58,100,20,info.clientNo);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		
		//订单号
		if(info.orderNoList){
        	var orderNo = "";
        	var l = info.orderNoList.length <= 3?info.orderNoList.length:3;
    		for(var i=0;i<l;i++){
    			orderNo += info.orderNoList[i]+",";
    		}
    		Printer.ADD_PRINT_TEXT(644,57,400,20,orderNo);//订单编号
    		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
    		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
        }


		Printer.ADD_PRINT_TEXT(507,249,60,20,info.receiveDate);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.ADD_PRINT_TEXT(538,249,60,20,info.deliveryDate);
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.ADD_PRINT_TEXT(570,252,50,20,info.deliveryTime);//配达时段
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");//ting
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(600,252,50,20,info.deliveryLocation);//发货所
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");//ting
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(634,252,50,20,info.size);//尺寸
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.ADD_PRINT_BARCODE(670,125,183,40,"Code39",info.thirdMailNo);//info.thirdMailNo
		Printer.SET_PRINT_STYLEA(0,"ShowBarText",0);
		Printer.ADD_PRINT_TEXT(712,115,180,20,info.thirdMailNo);//info.thirdMailNo
		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",9);
		Printer.SET_PRINT_STYLEA(0,"Alignment",2);


//设计视图		
		var str=Printer.PRINT_DESIGN();
		console.log(str);
		return true;
		
//预览打印
//		Printer.PREVIEW();
//		return true;

//真实环境
//		var result = Printer.PRINT();
//		return result;//result 为true表示打印成功， false表示打印失败
	}
	function toStoreTwo(Printer, waybillInfo){
		
		
		
		Printer.PRINT_INIT("店配面单二联");
		Printer.SET_PRINT_PAGESIZE(1, 1000, 1820, "店配面单二联");
		//打印面单线框
		drawOutline(Printer,true);
		
		Printer.ADD_PRINT_TEXT(24,140,100,15, "門市注意事項");
		Printer.SET_PRINT_STYLEA(0,"Alignment",2);
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(35,90,200,10, "※需檢視消費者身份證件※");
		Printer.SET_PRINT_STYLEA(0,"Alignment",2);
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		//大头笔

		Printer.ADD_PRINT_TEXT(70,80,220,35, "提貨人："+waybillInfo.receiveName);
		Printer.SET_PRINT_STYLEA(0,"Alignment",2);
		Printer.SET_PRINT_STYLEA(0,"FontSize",20);
		Printer.SET_PRINT_STYLEA(0,"Bold",1);
		
		Printer.ADD_PRINT_TEXT(110,70,220,35, "配送編號："+waybillInfo.thirdMailNo);
		Printer.SET_PRINT_STYLEA(0,"Alignment",2);
		Printer.SET_PRINT_STYLEA(0,"FontSize",15);
		Printer.SET_PRINT_STYLEA(0,"Bold",1);
		
		Printer.ADD_PRINT_TEXT(140,70,220,30, "門市："+waybillInfo.storeName);
		Printer.SET_PRINT_STYLEA(0,"Alignment",2);
		Printer.SET_PRINT_STYLEA(0,"FontSize",14);
		Printer.SET_PRINT_STYLEA(0,"Bold",1);
		
		
		//128A 条形码
		Printer.ADD_PRINT_BARCODE(177,45,300,50,"128A",waybillInfo.storeId + "861001" + waybillInfo.thirdMailNo);
		Printer.SET_PRINT_STYLEA(0,"ShowBarText",0);
		
		Printer.ADD_PRINT_TEXT(230,118,150,20, "*"+ waybillInfo.storeId + "861001" + waybillInfo.thirdMailNo+"*");
		Printer.SET_PRINT_STYLEA(0,"Alignment",2);
		Printer.SET_PRINT_STYLE("FontName", "微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",9);
		
		Printer.ADD_PRINT_TEXT(268,42,150,20, "門市進貨日："+waybillInfo.receiveDate);
		Printer.SET_PRINT_STYLE("FontName", "微软雅黑");
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		
		Printer.ADD_PRINT_TEXT(268,210,150,20, "門市退貨日："+waybillInfo.deliveryDate);
		Printer.ADD_PRINT_TEXT(291,42,200,20, "廠商訂單編號："+waybillInfo.ytoMailNo);
		Printer.ADD_PRINT_TEXT(291,210,170,20, "廠商名稱："+waybillInfo.companyName);
		Printer.ADD_PRINT_TEXT(315,42,200,20, "客服專線："+waybillInfo.servicePhone);
		Printer.ADD_PRINT_TEXT(315,210,170,20, "網址："+waybillInfo.webSite);
		
		Printer.ADD_PRINT_TEXT(505,18,16,105,"商品詳情");
		Printer.SET_PRINT_STYLE("FontName", "微软雅黑");
		Printer.ADD_PRINT_TEXT(505,45,80,20,"商品內容");
		Printer.ADD_PRINT_TEXT(505,110,80,20,"數量(單位)");
		Printer.ADD_PRINT_TEXT(505,185,80,20,"重量");
		Printer.ADD_PRINT_TEXT(505,260,80,20,"價格");
		
		Printer.ADD_PRINT_TEXT(525,45,80,20,waybillInfo.itemCategory);
		Printer.ADD_PRINT_TEXT(525,120,65,20,waybillInfo.itemCount+"("+waybillInfo.itemUnit+")");
		Printer.ADD_PRINT_TEXT(525,185,80,20,waybillInfo.itemWeight);
		Printer.ADD_PRINT_TEXT(525,260,80,20,waybillInfo.itemTotalPrice);
		
		Printer.ADD_PRINT_TEXT(475,17,150,20,"From:" + waybillInfo.sender);
		Printer.ADD_PRINT_TEXT(475,233,150,20,"To:" + waybillInfo.receive);
		Printer.ADD_PRINT_TEXT(456,197,200,20,"下联:COMMERCIAL INVOICE");
		Printer.ADD_PRINT_TEXT(456,17,200,20,"运单号:" + waybillInfo.thirdMailNo);

//设计视图		
//		var str=Printer.PRINT_DESIGN();
//		console.log(str);
//		return true;
		
//预览打印
//		Printer.PREVIEW();
//		return true;
		
//真实环境
		var result = Printer.PRINT();
		return result;//result 为true表示打印成功， false表示打印失败
	}
	
	//print store mail
	function toStorePrint(Printer, waybillInfo){
		checkNull(waybillInfo);
		Printer.PRINT_INIT("店配面单一联");
		Printer.SET_PRINT_PAGESIZE(1, 1000, 1820, "店配面单一联");
		//打印面单线框
		drawOutline(Printer,false);
		
		//128A 条形码
		Printer.ADD_PRINT_BARCODE(65, 48,161,39,"128A",waybillInfo.ytoMailNo);
		Printer.SET_PRINT_STYLEA(0,"ShowBarText",0);
		Printer.ADD_PRINT_TEXT(105,48,161,20, "*"+waybillInfo.ytoMailNo+"*");
		Printer.SET_PRINT_STYLEA(0,"Alignment",2);
		
		var result = "";

		Printer.ADD_PRINT_TEXT(82,22,210,20, result);
		Printer.SET_PRINT_STYLEA(0,"Alignment",2);
		Printer.SET_PRINT_STYLE("FontName", "微软雅黑");
		
		//大头笔
		Printer.ADD_PRINT_TEXT(80,229,140,55, waybillInfo.receive);
		Printer.SET_PRINT_STYLEA(0,"Alignment",2);
		Printer.SET_PRINT_STYLEA(0,"FontSize",18);
		Printer.SET_PRINT_STYLEA(0,"Bold",1);
		
		
		Printer.ADD_PRINT_TEXT(48,225,161,19,"上联:此联由圆通速递留存");
		Printer.SET_PRINT_STYLEA(0,"FontSize",9);
		
		Printer.ADD_PRINT_TEXT(138,21,18,55,"收件人");
		Printer.SET_PRINT_STYLEA(0,"FontSize",9);
		
		//收件人地址
		Printer.ADD_PRINT_TEXT(130,41,235,45,waybillInfo.receiveProvince+","+waybillInfo.receiveCity+","+waybillInfo.receiveDistrict);
		Printer.SET_PRINT_STYLEA(0,"FontSize",9);
		Printer.ADD_PRINT_TEXT(145,41,235,45,waybillInfo.receiveAddress);
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		
		Printer.ADD_PRINT_TEXT(130,250,90,20,"邮编:" + waybillInfo.receivePostcode);
		Printer.SET_PRINT_STYLEA(0,"Alignment",3);
	
		var receiverInfo = waybillInfo.receiveCompany +" "+ waybillInfo.receiveName + " 电话:" + waybillInfo.receivePhone;

		Printer.ADD_PRINT_TEXT(188,41,300,20,receiverInfo);
		
		Printer.SET_PRINT_STYLEA(0,"Alignment",3);
		if(waybillInfo.orderNoList){
        	var orderNo = "";
        	var l = waybillInfo.orderNoList.length <= 3?waybillInfo.orderNoList.length:3;
    		for(var i=0;i<l;i++){
    			orderNo += waybillInfo.orderNoList[i]+", ";
    		}
    		Printer.ADD_PRINT_TEXT(206,41,200,40,"订单号:" + orderNo);//订单编号
    		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
    		Printer.SET_PRINT_STYLEA(0,"FontSize",9);
        }
		if(waybillInfo.oldMailNo){
			Printer.ADD_PRINT_TEXT(223,41,200,40,"原面单号:" + waybillInfo.oldMailNo);//订单编号
    		Printer.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
    		Printer.SET_PRINT_STYLEA(0,"FontSize",9);
		}
		
		//还没有找到这个字段
		Printer.ADD_PRINT_TEXT(244,41,200,20,"发货单号:" + waybillInfo.ytoMailNo);
		Printer.SET_PRINT_STYLEA(0,"FontSize",9);
		
        if(waybillInfo.mailNoList){
        	var content = "";
    		for(var i=0;i<waybillInfo.mailNoList.length;i++){
    			content += waybillInfo.mailNoList[i]+",";
    		}
    		Printer.ADD_PRINT_TEXT(260,41,210,45,"商品条码:" + content);
        }
        Printer.ADD_PRINT_TEXT(223,21,18,105,"详细内容");
        Printer.SET_PRINT_STYLEA(0,"FontSize",9);
        Printer.SET_PRINT_STYLE("FontName", "微软雅黑");

		Printer.ADD_PRINT_TEXT(370,41,90,20,"数量:"+waybillInfo.totalCount);
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.SET_PRINT_STYLE("FontName", "微软雅黑");
		
		var totalWeight = "";
		if(waybillInfo.totalWeight){
			totalWeight = waybillInfo.totalWeight.toFixed(2);
		}
		Printer.ADD_PRINT_TEXT(370,137,80,20,"重量:" + totalWeight);

		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.SET_PRINT_STYLE("FontName", "微软雅黑");
		
		Printer.ADD_PRINT_TEXT(208,236,91,20,"收件人签名:");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.SET_PRINT_STYLE("FontName", "微软雅黑");
	
		Printer.ADD_PRINT_TEXT(262,236,116,20,"代收人姓名(签字):");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.SET_PRINT_STYLE("FontName", "微软雅黑");
	
		Printer.ADD_PRINT_TEXT(325,234,115,16,"圆通速递将快件送达收件");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.ADD_PRINT_TEXT(338,234,115,120,"人地址，经收件人或者收");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.ADD_PRINT_TEXT(350,234,115,120,"收件人(寄件人)允许的");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.ADD_PRINT_TEXT(362,234,115,120,"代收人签字，视为送达");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.SET_PRINT_STYLE("FontName", "微软雅黑");
	
		Printer.ADD_PRINT_TEXT(230,236,73,17,"证件号:");
		Printer.SET_PRINT_STYLEA(0,"FontSize",5);
	
		Printer.ADD_PRINT_TEXT(248,315,59,20,"年   月   日");
		Printer.SET_PRINT_STYLEA(0,"FontSize",5);
	
		Printer.ADD_PRINT_TEXT(297,236,41,20,"证件号:");
		Printer.SET_PRINT_STYLEA(0,"FontSize",5);
	
		Printer.ADD_PRINT_TEXT(275,250,85,20,"由收件人允许代为签收");
		Printer.SET_PRINT_STYLEA(0,"FontSize",5);
	
		Printer.ADD_PRINT_TEXT(310,315,60,20,"年   月   日");
		Printer.SET_PRINT_STYLEA(0,"FontSize",5);
	
		Printer.ADD_PRINT_TEXT(486,21,18,76,"收件人");
		
		Printer.ADD_PRINT_TEXT(474,250,90,20,"邮编:" + waybillInfo.receivePostcode);
		Printer.SET_PRINT_STYLEA(0,"Alignment",3);
		Printer.ADD_PRINT_TEXT(485,41,200,20,waybillInfo.receiveProvince+","+waybillInfo.receiveCity+","+waybillInfo.receiveDistrict);
		Printer.SET_PRINT_STYLEA(0,"FontSize",8);
		Printer.ADD_PRINT_TEXT(500,41,226,20, waybillInfo.receiveAddress);
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.ADD_PRINT_TEXT(528,39,300,20, waybillInfo.receiveName + " 电话:" + waybillInfo.receivePhone);
		Printer.SET_PRINT_STYLEA(0,"Alignment",3);
		
		Printer.ADD_PRINT_TEXT(570,21,18,105,"详细内容");
		Printer.ADD_PRINT_TEXT(555,41,210,20,"运单号:" + waybillInfo.ytoMailNo);
		Printer.ADD_PRINT_TEXT(575,41,210,20,"发件人:" + waybillInfo.senderName);
		
		Printer.ADD_PRINT_TEXT(595,41,193,36,"发件地址:" + waybillInfo.senderAddress);

		var	senderInfo = "电话:" + waybillInfo.senderPhone;

		Printer.ADD_PRINT_TEXT(653,41,170,10,senderInfo);
		
		Printer.SET_PRINT_STYLEA(0,"Alignment",3);
		Printer.SET_PRINT_STYLEA(0,"FontSize", 8);
		
		Printer.ADD_PRINT_TEXT(563,234,115,15,"此运单仅供圆通速递签约");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.ADD_PRINT_TEXT(576,234,115,15,"客户使用,相关责任义务");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		Printer.ADD_PRINT_TEXT(589,234,115,15,"以双方合作合同为准");
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		
		Printer.ADD_PRINT_TEXT(635,236,115,15,waybillInfo.despatchCompany);
		Printer.SET_PRINT_STYLEA(0,"FontSize",7);
		
		Printer.ADD_PRINT_TEXT(456,233,150,20,"下联:此联由收件人留存");
		Printer.ADD_PRINT_TEXT(456,17,200,20,"运单号:" + waybillInfo.ytoMailNo);
		


//设计视图		
//		var str=Printer.PRINT_DESIGN();
//		console.log(str);
//		return true;
		
//预览打印
//		Printer.PREVIEW();
//		return true;

//真实环境
		var result = Printer.PRINT();
		return result;//result 为true表示打印成功， false表示打印失败
		

	}
	
	
	/**
	 * 美国邮政打印
	 */
	function supsPrint(Printer,successWaybill){
		Printer.PRINT_INITA(0,0,374,737,"SUPS面单");
		Printer.SET_PRINT_PAGESIZE(1,990,1950,"SUPS面单");
		//打印URL
//		Printer.ADD_PRINT_URL(-5,2,374,780,successWaybill.printUrl);
		Printer.ADD_PRINT_HTML(7,36,300,100,"<base href=\"\"/><embed width=\"100%\" height=\"100%\" name=\"plugin\" src=\"http://115.28.55.157/szyys/OrdersPrint!printByType.action?urlKey=5cb207274df09acd550440fa04c284fd35\" type=\"application/pdf\"/>");
		//设计视图		
//		var str=Printer.PRINT_DESIGN();
//		console.log(str);
//		return true;
		
//预览打印
//		Printer.PREVIEW();
//		return true;

//真实环境
		var result = Printer.PRINT();
		return result;//result 为true表示打印成功， false表示打印失败
	};
	
	/**
	 * 单张面单打印
	 */
	this.printWaybill = function(waybillInfo, translatedOnly){
		var Printer = getPrinter(document.getElementById('Printer_OB'), document.getElementById('Printer_EM'));
		Printer.SET_LICENSES("圆通速递有限公司","308E4B219E71CF8C62DFB210CDA320F3","",""); 
		return print(Printer, checkNull(waybillInfo), translatedOnly);
	};
	
	/**
	 * 速达电子面单打印
	 */
	this.printSuda = function(waybillInfo){
		var Printer = getPrinter(document.getElementById('Printer_OB'), document.getElementById('Printer_EM'));
		Printer.SET_LICENSES("圆通速递有限公司","308E4B219E71CF8C62DFB210CDA320F3","",""); 
		return sudaPrint(Printer, checkNull(waybillInfo));
	};
	
	this.getAddressAfterPrint=function(waybillInfo){
		var receiverAddress = "";
		if(waybillInfo.translateStateCode == "2"){
				//waybillInfo.translateStateCode == "2" means translate completed
			receiverAddress = getReceiverTranslateAddress(waybillInfo);
		}else{
			receiverAddress = getReceiverAddress(waybillInfo);
		}
		return receiverAddress;
	};
	
	/**
	 * 宅配电子面单打印
	 */
	this.homePrint = function(info){
		var Printer = getPrinter(document.getElementById('Printer_OB'), document.getElementById('Printer_EM'));
		Printer.SET_LICENSES("圆通速递有限公司","308E4B219E71CF8C62DFB210CDA320F3","",""); 
		return toHomePrint(Printer, info);
	};
	
	
	
	
	
	/**
	 * 打印url
	 */
	this.printWithUrl = function(url){
		var Printer = getPrinter(document.getElementById('Printer_OB'), document.getElementById('Printer_EM'));
		Printer.SET_LICENSES("圆通速递有限公司","308E4B219E71CF8C62DFB210CDA320F3","",""); 
		Printer.ADD_PRINT_URL(0,0,"100%","100%",url)
		var result = Printer.PRINT();
		return result;//result 为true表示打印成功， false表示打印失败
	};
	
	/**
	 * 打印html
	 */
	this.printWithHtml = function(html){
		var Printer = getPrinter(document.getElementById('Printer_OB'), document.getElementById('Printer_EM'));
		Printer.SET_LICENSES("圆通速递有限公司","308E4B219E71CF8C62DFB210CDA320F3","",""); 
		Printer.ADD_PRINT_HTM(0,0,"100%","100%",html);
		var result = Printer.PRINT();
		return result;//result 为true表示打印成功， false表示打印失败
	};
	
	/**
	 * 店配电子面单打印
	 */
	this.storePrint = function(info){
		var Printer = getPrinter(document.getElementById('Printer_OB'), document.getElementById('Printer_EM'));
		Printer.SET_LICENSES("圆通速递有限公司","308E4B219E71CF8C62DFB210CDA320F3","",""); 
		toStorePrint(Printer, info);
		return toStoreTwo(Printer, info);
	};
	/**
	 * 退货面单打印
	 */
	this.returnPrint = function(info){
		var Printer = getPrinter(document.getElementById('Printer_OB'), document.getElementById('Printer_EM'));
		Printer.SET_LICENSES("圆通速递有限公司","308E4B219E71CF8C62DFB210CDA320F3","",""); 
		return toStorePrint(Printer,info);
	};
	/**
	 * SUPS面单批量打印
	 */
	this.printMultipleSupsWaybills=function(successWaybills,progress){
		var Printer = getPrinter(document.getElementById('Printer_OB'), document.getElementById('Printer_EM'));
		Printer.SET_LICENSES("圆通速递有限公司","308E4B219E71CF8C62DFB210CDA320F3","",""); 
		var result = true;
		for(var i = 0; i<successWaybills.length; i++){
			var successWaybill = successWaybills[i];
			var printed = supsPrint(Printer, successWaybill);
			progress( Math.floor(( (i+1)/successWaybills.length) * 100));
			//console.log("打印第(" + (i + 1) + ")张面单成功：" + printed);
			result = result && printed;
		}
		progress(100);
		return result;
	};
	
	/**
	 * 速达面单批量打印
	 */
	this.printMultipleSudaWaybills=function(waybillInfoList,progress){
		var Printer = getPrinter(document.getElementById('Printer_OB'), document.getElementById('Printer_EM'));
		Printer.SET_LICENSES("圆通速递有限公司","308E4B219E71CF8C62DFB210CDA320F3","",""); 
		var result = true;
		for(var i = 0; i<waybillInfoList.length; i++){
			var waybillInfo = waybillInfoList[i];
			var printed = sudaPrint(Printer, checkNull(waybillInfo));
			progress( Math.floor(( (i+1)/waybillInfoList.length) * 100));
			//console.log("打印第(" + (i + 1) + ")张面单成功：" + printed);
			result = result && printed;
		}
		progress(100);
		return result;
	};
	
	/**
	 * 面单批量打印
	 */
	this.printMultipleWaybills = function(waybillInfoList, translatedOnly, progress){
		var Printer = getPrinter(document.getElementById('Printer_OB'), document.getElementById('Printer_EM'));
		Printer.SET_LICENSES("民软网(www.minsoft.cn)","158703810611011350109107113120","",""); 
		var result = true;
		for(var i = 0; i<waybillInfoList.length; i++){
			var waybillInfo = waybillInfoList[i];
			var printed = print(Printer, checkNull(waybillInfo), translatedOnly);
			progress( Math.floor(( (i+1)/waybillInfoList.length) * 100));
		//	console.log("打印第(" + (i + 1) + ")张面单成功：" + printed);
			result = result && printed;
		}
		//just in case
		progress(100);
		return result;
	};
	
	function getReceiverTranslateAddress(waybillInfo){
		var receiverAddress = "";
		if(notEmpty(waybillInfo.receiverCountryTranslate)){
			receiverAddress += waybillInfo.receiverCountryTranslate + "-";
		}
		if(notEmpty(waybillInfo.receiverProvinceTranslate)){
			receiverAddress += waybillInfo.receiverProvinceTranslate + "-";
		}
		if(notEmpty(waybillInfo.receiverCityTranslate)){
			receiverAddress += waybillInfo.receiverCityTranslate + "-";
		}
		if(notEmpty(waybillInfo.receiverDistrictTransate)){
			receiverAddress += waybillInfo.receiverDistrictTransate;
		}
		if(notEmpty(waybillInfo.receiverAddressTranslate)){
			receiverAddress += " " + waybillInfo.receiverAddressTranslate;
		}
		return receiverAddress;
	};
	
	function getSenderTranslateAddress(waybillInfo){
		var senderAddress = "";
		if(notEmpty(waybillInfo.senderCountryTranslate)){
			senderAddress += waybillInfo.senderCountryTranslate + "-";
		}
		if(notEmpty(waybillInfo.senderProvinceTranslate)){
			senderAddress += waybillInfo.senderProvinceTranslate + "-";
		}
		if(notEmpty(waybillInfo.senderCityTranslate)){
			senderAddress += waybillInfo.senderCityTranslate + "-";
		}
		if(notEmpty(waybillInfo.senderDistrictTransalte)){
			senderAddress += waybillInfo.senderDistrictTransalte;
		}
		if(notEmpty(waybillInfo.senderAddressTranslate)){
			senderAddress += " " + waybillInfo.senderAddressTranslate;
		}
		return senderAddress;
	};
	
	function getReceiverAddress(waybillInfo){
		var receiverAddress = "";
		if(notEmpty(waybillInfo.receiverCountry)){
			receiverAddress += waybillInfo.receiverCountry + "-";
		}
		if(notEmpty(waybillInfo.receiverProvince)){
			receiverAddress += waybillInfo.receiverProvince + "-";
		}
		if(notEmpty(waybillInfo.receiverCity)){
			receiverAddress += waybillInfo.receiverCity + "-";
		}
		if(notEmpty(waybillInfo.receiverDistrict)){
			receiverAddress += waybillInfo.receiverDistrict;
		}
		if(notEmpty(waybillInfo.receiverAddress)){
			receiverAddress += " " + waybillInfo.receiverAddress;
		}
		return receiverAddress;
	};
	
	function getSenderAddress(waybillInfo){
		var senderAddress = "";
		if(notEmpty(waybillInfo.senderCountry)){
			senderAddress += waybillInfo.senderCountry + "-";
		}
		if(notEmpty(waybillInfo.senderProvince)){
			senderAddress += waybillInfo.senderProvince + "-";
		}
		if(notEmpty(waybillInfo.senderCity)){
			senderAddress += waybillInfo.senderCity + "-";
		}
		if(notEmpty(waybillInfo.senderDistrict)){
			senderAddress += waybillInfo.senderDistrict;
		}
		if(notEmpty(waybillInfo.senderAddress)){
			senderAddress += " " + waybillInfo.senderAddress;
		}
		return senderAddress;
	};
	
	/** 
	 * 转换数字金额大写
	 */ 
	function upDigit(n)  
	{ 
	    var fraction = ['角', '分']; 
	    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']; 
	    var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ]; 
	    n = Math.abs(n); 
	   
	    var s = ''; 
	   
	    for (var i = 0; i < fraction.length; i++)  
	    { 
	        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, ''); 
	    } 
	    s = s || '整'; 
	    n = Math.floor(n); 
	   
	    for (var i = 0; i < unit[0].length && n > 0; i++)  
	    { 
	        var p = ''; 
	        for (var j = 0; j < unit[1].length && n > 0; j++)  
	        { 
	            p = digit[n % 10] + unit[1][j] + p; 
	            n = Math.floor(n / 10); 
	        } 
	        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s; 
	    } 
	    return s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整'); 
	};
	
	/**
	 * 返回大头笔的字体大小
	 */
	function getBigPenFontSize(bigPen){
		var size = 0;
		switch(bigPen.length){
		case 1:
		case 2: 
			size = 34;
			break;
		case 3: 
			size = 28;
			break;
		case 4: 
			size = 24;
			break;
		case 5: 
			size = 18;
			break;
		case 6: 
			size = 16;
			break;
		default: 
			size = 13;
			break;
		}
		return size;
	};
	
	/**
	 * 防止面单上出现null字样
	 */
	function checkNull(waybillInfo){
		if(!waybillInfo.items){
			waybillInfo.items = [];
		}else{
			for(var index in waybillInfo.items){
				var item = waybillInfo.items[index];
				for(var itemAttr in item){
					var itemValue = item[itemAttr];
					if(!itemValue || itemValue == 'null'){
						item[itemAttr] = '';
					}
				}
			}
		}
		for(var attr in waybillInfo){
			var value = waybillInfo[attr];
			if(!value || value == 'null'){
				waybillInfo[attr] = '';
			}
		}
		return waybillInfo;
	}
	/**
	 * Check if the value is undefined or empty
	 */
	function notEmpty(value){
		return value && value != "";
	}

};