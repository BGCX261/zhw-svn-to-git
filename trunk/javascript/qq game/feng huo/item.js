// JavaScript Document

//��ȡĳ�����͵������б�
function GetItemByClass(iClass,iSubClass)
{
	var curItems=[];
	var iIndex = 0;
	for(var i=0;i<itemConfig.configs.length;i++)
	{
		if(itemConfig.configs[i].fclass == iClass 
			&&itemConfig.configs[i].subClass == iSubClass)
		{
			curItems[iIndex] = new item;
			curItems[iIndex].itemID = itemConfig.configs[i].itemID;
			curItems[iIndex].name = itemConfig.configs[i].name;
			curItems[iIndex].note = itemConfig.configs[i].note;
			curItems[iIndex].useNote = itemConfig.configs[i].useNote;
			curItems[iIndex].price = itemConfig.configs[i].price;
			curItems[iIndex].vipPrice = itemConfig.configs[i].vipPrice;
			curItems[iIndex].effectType = itemConfig.configs[i].effectType;
			curItems[iIndex].fclass = itemConfig.configs[i].fclass;
			curItems[iIndex].subClass = itemConfig.configs[i].subClass;
			curItems[iIndex].online = itemConfig.configs[i].online;
			curItems[iIndex].canExchange = itemConfig.configs[i].canExchange;
			curItems[iIndex].kind = itemConfig.configs[i].kind;
			curItems[iIndex].count = 0;
			iIndex++;
		}
	}
	return curItems;
}
//��ȡ���ߵ��±�
function getItemsIndex(iItemID,sArray)
{
	for(var i=0;i<sArray.length;i++)
	{
		if(sArray[i].CItem.iItemID == iItemID)
			return i;
	}
	return -1;
}
//��������
function BuyItemClick(iItemID)
{
	//alert("buy item" + iItemID);
	$("maskbg").style.display="none";
	$("multiitem_div").style.display="none";
	objFlashEng.Send(GetBuyItem(iItemID,1,1));
}
//��ѡ����龰ʹ��
function SendItemUseReq(iItemID)
{
	var aItem= getItemConfig(iItemID);
	var iType = $("multiitem_divPara").value;
	//alert("city id"+CityID+" item id " + iItemID + "iType"+iType);
	if(aItem!=0)
	{
		if(aItem.fclass == 1 && aItem.subClass == 1)
		{
			objFlashEng.Send(GetSpeedBuildingItem(iType,CityID,iItemID,3));
		}
		else if(aItem.fclass == 1 && aItem.subClass == 3)
		{
			objFlashEng.Send(GetSpeedArmyItem(iType,CityID,iItemID,3));
		}
		else if(aItem.fclass == 2 && aItem.subClass == 3)
		{
			if(aItem.effectType == 0)
				objFlashEng.Send(GetBufferItem(CityID,iItemID,false,3));
		}
		else if(aItem.fclass == 3 && aItem.subClass == 10)
		{
			objFlashEng.Send(GetFoodItem(iItemID,iType,3));
		}
	}
}
//ͨ��ʹ�õ��ߴ���
function UseItemClick(iItemID)
{
	$("maskbg").style.display="none";
	$("multiitem_div").style.display="none";
	SendItemUseReq(iItemID);
	
}


//��ʼ���û�������
function initNeedItems(iClass,iSubclass,sUserItemsData)
{
	var curItems=GetItemByClass(iClass,iSubclass);

	for(var i=0;i<curItems.length;i++)
	{
		//alert(itemsdataObject[i].iItemID);
		var iIndex = getItemsIndex(curItems[i].itemID,sUserItemsData);
		if(iIndex>=0)
		{
		
			curItems[i].count = sUserItemsData[iIndex].CItem.iItemCount;
			curItems[i].endTime = getDateStr(sUserItemsData[iIndex].CItem.iUseExpireTime);
			
		}
	}
	return curItems;

}


//��ȡitem�������������
function GeneListTDInnerHtml(iClass,iSubClass,sUserItemsData,tableObj,iPara2)
{
	var curItems = initNeedItems(iClass,iSubClass,sUserItemsData);
	var sHtml="";
	
	var iStartPos = 0;
	var iEndPos = curItems.length;
	var curLineNum = 0;
	var LineCount = 1;
	var  tableRow = tableObj.insertRow(-1);
	
	//��ʾ����Ʒ����,��ͨ����������Ч��15�²���ʾ
	for(var i=iStartPos;i<iEndPos;i++)
	{
			//�Ƿ���Ʒ
			if(curItems[i].kind != 5)
			{
				//�Ƿ����Ʒ������Ʒ��ĿΪ�㲻��ʾ�����ù��򣬲�Ϊ0����ʹ��
				if( (curItems[i].kind !=4) || (curItems[i].kind == 4 && curItems[i].count > 0 ))
				{
					//�ж��Ƿ�Ч��15�µ���ͨ����
					if(iPara2 == 15 && curItems[i].itemID == 49)
					{
					}
					else
					{
						if(curLineNum == 3)
						{
							tableRow = tableObj.insertRow(-1);
							sHtml = "";
							curLineNum = 0;
							LineCount++;
		
						}
						addMuitChooseItem(tableRow,curItems[i]);
						curLineNum++;
					}
				}
			}
			
	}
	
	return LineCount;
	
}

//��ѡ���龰ʹ�ý���
function addMuitChooseItem(tableRow,curItem)
{
	var UseTD;
	var InfoTD;
	//��Ʒ����
	var RelatedID = getRelatedItemID(curItem.itemID);
	var iRelatedCount = getItemCount(RelatedID);
	var iTotal = curItem.count+iRelatedCount;

	var sClinkHtml = '<div id="buy_item_a1" onclick=" '
					+'UseItemClick('+curItem.itemID+')" class="btnWhite floatleft">���ʹ��</div>';
		if(iTotal==0)
		{
			sClinkHtml = '<div id="buy_item_a1" onclick=" '
			+'BuyItemClick('+curItem.itemID+')" class="btnRed floatleft">�������</div>';
		}
		else if(iRelatedCount > 0)
		{
			sClinkHtml = '<div id="buy_item_a1" onclick=" '
			+'UseItemClick('+RelatedID+')" class="btnWhite floatleft">���ʹ��</div>';
		}
		sHtml = '<img id="use_speedup_pic1" hint="';
		sHtml = sHtml+curItem.note+'" src="images/item/item'+getItemPicID(curItem)+'.gif" style=" margin-bottom:5px;" class="border_hui" /><br />'+
					sClinkHtml;
		//alert(sHtml);
		UseTD = document.createElement('td');
		UseTD.width = 73;
		UseTD.height = 96;
		UseTD.align = "center";
		UseTD.innerHTML = sHtml;
		
		InfoTD = document.createElement('td');
		InfoTD.width = 95;
		InfoTD.align = "left";
		
		sHtml = '<p><strong>'+curItem.name+'</strong><br />'+
					'�۸�<span id="use_price1">'+curItem.price+'</span><br />'+
					'vip�۸�<span id="use_vipprice1">'+curItem.vipPrice+'</span><br />'+
					'����������<span id="use_count1" class="t_bai">'+iTotal+'</span>��<br /></p>';
		if(curItem.kind == 4)
		{
			sHtml = '<p><strong>'+curItem.name+'</strong><br />'+
					'�۸�<span id="use_price1">-</span><br />'+
					'vip�۸�<span id="use_vipprice1">-</span><br />'+
					'����������<span id="use_count1" class="t_bai">'+iTotal+'</span>��<br /></p>';
		}
		InfoTD.innerHTML = sHtml;
		tableRow.appendChild(UseTD);
		tableRow.appendChild(InfoTD);
}


function getItemPicID(curItem)
{
	if(curItem.kind == 5 && curItem.itemID > 100)
	{
		return curItem.itemID-100;
	}
	else
		return curItem.itemID;
}


function initMutiItemChoose(iClass,iSubClass,iPara,iPara2)
{
	$("multiitem_divPara").value = iPara;
	for(var i=$("multiitem_choose").rows.length-1;i>=0;i--) 
	{ 
		$("multiitem_choose").deleteRow(i); 
	}
	var iLineCount = GeneListTDInnerHtml(iClass,iSubClass,top.arrUserItem,$("multiitem_choose"),iPara2);
	$("multiitem_div").style.height = iLineCount*115;
	
}


function getDateStr(iTime)
{
	var pData = new Date();
	pData.setTime(iTime*1000);
	var mon = pData.getMonth()+1;
	var monstr;
	var date = pData.getDate();
	var datestr = date;
	var year = pData.getYear();
	if(mon<9)
		monstr = "0" + mon;
	if(date<9)
		datestr = "0"+date;
	//year = year+1900;
	var timeStr = year+"-"+monstr+"-"
				  +datestr+" "+pData.getHours()+":"+pData.getMinutes()+":"+pData.getSeconds();
	return timeStr;

}

function isNeedBuyLimit(iItemID)
{
	if(iItemID == 45 || iItemID == 46
	   ||iItemID == 47 || iItemID == 48 )
	{
			return true;
	}
	return false;
}

//�����û��ĵ�����Ŀ������
function updateObjecData(iItemID,iNum,iLeftCount,iFlag,iBuyFlag)
{
	var i=0;
	for(i=0;i<top.arrUserItem.length;i++)
	{
		if(top.arrUserItem[i].CItem.iItemID == iItemID)
		{
			top.arrUserItem[i].CItem.iItemCount=iNum;
			//��������
			if(isNeedBuyLimit(iItemID) && iBuyFlag)
			{
				//alert("item id "+iItemID+"index"+i+"num"+iNum);
				top.arrUserItem[i].iLeftUseCount = iLeftCount;
			}
			//ʹ������ 
			else if(!iBuyFlag)
				top.arrUserItem[i].iLeftUseCount = iLeftCount; 
		
			break;
		}
		
	}
	
	if(iFlag == 2)
	{
		document.frames["shopdiv"].onDataChange();
	}
}

function updateCoinData(iNum,iFlag)
{
	top.arrUserQuan = iNum;
	if(document.frames["shopdiv"].disPlayMyCoin!=null)
		document.frames["shopdiv"].disPlayMyCoin(iNum);
	
}


function getItemConfig(itemID)
{
	for(var j=0;j<itemConfig.configs.length;j++)
	{
		if(itemConfig.configs[j].itemID ==itemID)
			return itemConfig.configs[j];
	}
	return 0;
}

function getItemCount(itemID)
{
	for(var i=0;i<top.arrUserItem.length;i++)
	{
		var itemdataObject = top.arrUserItem[i].CItem;
		if(itemdataObject.iItemID == itemID)
		{
			return itemdataObject.iItemCount;
		}
	}
	return 0;
}
//for quick use
function itemUserProcess(itemID)
{
	var itemConfig = getItemConfig(itemID);

	if(itemConfig == 0)
	{
		return 0;
	}
	else
	{
		if(itemConfig.fclass == 1)
		{
			
		}
		switch(parseInt(itemID))
		{
			
			////�Ĺ���
			
			case 19:
				top.ShowChangeNation();
				break;

			//Ǩ�Ƿ�
			case 18:
				top.ShowUseMove();
				break;
			//�������
			case 34:
				top.ShowUseMoveRandom();
				break;
			case 50:
			case 51:
			case 52:
				top.showUseSeptDiv();
				break;

			default :
				top.ShowUseDiv(itemConfig.itemID,itemConfig.name,itemConfig.note);
				break;
				
		}
	}
}

function getItemUserProcessName(aItem)
{
	var sName="";
	//���м��ٵ��߲������ڲֿ�ʹ��
	if(aItem.fclass == 1)
	{
		return sName;
	}
	var itemID = aItem.itemID;
	if(aItem.itemID > 100)
		itemID = getRelatedItemID(aItem.itemID);
	switch(itemID)
	{
		////�Ĺ���
		
		case 19 :
			sName = "top.ShowChangeNation()";
			break;
		//Ǩ�Ƿ�
		
		case 18:
			sName = "top.ShowUseMove()";
			break;
		//�������
		
		case 34:
			sName = "top.ShowUseMoveRandom()";
			break;
		case 50:
		case 51:
		case 52:
			sName = "top.showUseSeptDiv()";
			break;
		default :
			sName = "top.ShowUseDiv("+aItem.itemID+",'"+aItem.name+
					"','"+aItem.note+"')";
			break;
			
	}
	return sName;
}

//��ȡ��ǰ����
function getCurItems()
{
	var Index =0;
	var inerCurItems=[];
	
	for(var i=0;i<top.arrUserItem.length;i++)
	{
		var itemdataObject = top.arrUserItem[i].CItem;
		//alert(itemsdataObject[i].iItemID);
		if(itemClass == 0 || checkItemClass(itemClass,itemdataObject))
		{
			if(itemdataObject.iItemCount>0)
			{
				inerCurItems[Index] = new item();
				inerCurItems[Index].itemID = itemdataObject.iItemID;
				inerCurItems[Index].count = itemdataObject.iItemCount;
				inerCurItems[Index].endTime = getDateStr(itemdataObject.iUseExpireTime);
				Index++;
			}
		}
	}
	
	
	for(var i=0;i<inerCurItems.length;i++)
	{
		var aitem = getItemConfig(inerCurItems[i].itemID);
		if(aitem!=0)
		{
			inerCurItems[i].name = aitem.name;
			inerCurItems[i].note = aitem.note;
			inerCurItems[i].useNote = aitem.useNote;
			inerCurItems[i].fclass = aitem.fclass;
			inerCurItems[i].effectType = aitem.effectType;
			inerCurItems[i].subClass = aitem.subClass;
			inerCurItems[i].kind = aitem.kind;
		}
		
	}
	return inerCurItems;
}

function getItemLeftUseCount(iItemID)
{
	for(i=0;i<top.arrUserItem.length;i++)
	{
		if(top.arrUserItem[i].CItem.iItemID == iItemID)
			return top.arrUserItem[i].iLeftUseCount;
	}
	return -1;
} 





/*
**    ==================================================================================================  
**    ������ 
**    ���ܣ� ��ʾ�̳����ʹ�á�����DIV
**    ʾ���� 
**    ==================================================================================================  
*/
//ͨ�ù����
function ShowBuyDiv(itemid,itemname,price,vipprice,date,itemstr){
	$("shop_itemname").innerHTML=itemname;
	$("shop_price").innerHTML=price;
	$("shop_vipprice").innerHTML=vipprice;
	$("shop_date").innerHTML=formattime(date).toString().replace("00:00:00","");
	$("shop_itemstr").innerHTML=itemstr;
	$("shop_itemid").value = itemid;
	$("shop_pic").src = "/images/item/item"+itemid+".gif";
	
	$("maskbg").style.display="block";
	$("shopitembox").style.display="block";
	
}
function shopChangeCount(){
	var intCount = $("shop_buycount").value;
	if(isPlusNumber(intCount))
	{
		$("shop_allprice").innerHTML=$("shop_price").innerHTML*intCount;
		$("shop_vipallprice").innerHTML=$("shop_vipprice").innerHTML*intCount;
	}
	else
	{
		$("shop_allprice").innerHTML=0;
		$("shop_vipallprice").innerHTML=0;
	}
	
}
function shopClickFunc(){
	//����һ����Դ
	if($("shop_itemid").value!= 55)
		objFlashEng.Send(GetBuyItem($("shop_itemid").value,$("shop_buycount").value,0));
	//�����Ԫ��
	else
		objFlashEng.Send(GetBuyGold($("shop_itemid").value,$("shop_buycount").value));
}



//ͨ��ʹ�ò�
function ShowUseDiv(itemid,itemname,itemstr){
	$("shop_use_itemname").innerHTML=itemname;
	$("shop_use_itemstr").innerHTML=itemstr;
	$("shop_use_itemid").value = itemid;
	$("shopusebox_pic").src = "/images/item/item"+itemid+".gif";
	
	$("maskbg").style.display="block";
	$("shopusebox").style.display="block";
	
}
function shopUseFunc(){
	var  iItemID = $("shop_use_itemid").value ;
	var  aItem = getItemConfig(iItemID);
	if(aItem!=0)
	{
		if(iItemID == 53)
		{
			if(curLeagueID != 0)
				objFlashEng.Send(GetUseSeptItem(iItemID,curLeagueID));
			else
				msgbox("��û�м�����壬����ʹ�ü������ƣ�");
		}
		if(aItem.effectType == 0)
		{
			//alert("etype 0 item use");
			objFlashEng.Send(GetBufferItem(CityID,iItemID,0,2));
		}
		else if(aItem.effectType == 9)
		{
				//alert("etype 0 item use");
				objFlashEng.Send(GetTributaryItem(CityID,iItemID,2));
		}
		
	}
}





//���Ǩ�Ƿ�
function ShowUseMoveRandom(){	
	showCitySelect("use_moverandom_select");
	$("maskbg").style.display="block";
	$("use_moverandom").style.display="block";
	$("use_moverandom_select").style.visibility = "visible";
}
function UseMoveRandom(){
	//alert($("use_moverandom_select").value)
	objFlashEng.Send(GetMoveCityItem($("use_moverandom_select").value,0,34,2))
}



//Ǩ�Ƿ�
function ShowUseMove(){
	showCitySelect("use_move_select")
	
	$("maskbg").style.display="block";
	$("use_move").style.display="block";
	$("use_move_select").style.visibility = "visible";
}
function UseMove(){

	var x = parseInt($("use_move_x").value,10)*1000;
	var y = parseInt($("use_move_y").value,10);
	var gridid = x+y;
	//alert(posValue);
	objFlashEng.Send(GetMoveCityItem($("use_move_select").value,gridid,18,2))
}
function UseMoveCheck(){
	//Э������
	var x = parseInt($("use_move_x").value,10)*1000;
	var y = parseInt($("use_move_y").value,10);
	var gridid = x+y;
	objFlashEng.Send(GetIsSpace(gridid))
}
function ShowMoveCheck(str){
	//Э������
	var T=eval('('+str+')');
	if(T.CAnsTestGrid.CResult.iResultID != 0){
		msgbox("��ȡ������Ϣ <b>ʧ��</b>!<br>error code:"+T.CAnsTestGrid.CResult.iResultID+"<br>error info:"+T.CAnsTestGrid.CResult.szResultMsg)	
		return false;
	}
	if(T.CAnsTestGrid.iIsSpace == 1){
		$("use_move_errstr").innerHTML = "����Ǩ�Ƶ������꣡"
	}else{
	 	$("use_move_errstr").innerHTML = "�õص��ѱ�ռ�ã�����ѡ���꣡"
	}
}



//�Ĺ���
function ShowChangeNation(){
	$("use_change_nationname").innerHTML=ToNation(curNationID);
	
	$("maskbg").style.display="block";
	$("use_changenation").style.display="block";
	$("use_changenation_id").style.visibility = "visible";
}
function UseChangeNation(){
	//alert($("use_changenation_id").value)	
	objFlashEng.Send(GetChangeItem($("use_changenation_id").value,19,2))	
}



//��Դת��
function ShowChangeSource(){
	//���ݲֿ�ȼ���ȡ���������Ϣ
	maxLoad = (arrCityBuildRank[5]-1)<0 ? 10000 : $("init_iStoneMax").innerHTML;
	$("use_changesource_c1").innerHTML=maxLoad;
	$("use_changesource_c2").innerHTML=maxLoad;
	$("use_changesource_c3").innerHTML=maxLoad;	
	$("use_changesource_s1").value = 0;
	$("use_changesource_s2").value = 0;
	$("use_changesource_s3").value = 0;
	$("use_changesource_max").innerHTML=maxLoad;	
	//���ݵ�ǰ��ʳ��������ɷ�����Դ
	nowLoad = nWood + nIron + nStone;
	$("use_changesource_now").innerHTML=nowLoad;
	$("use_changesource_old").innerHTML=nowLoad;		
	//��ʾ��ǰ����
	$("use_changesource_cityname").innerHTML=CityID;
	$("use_changesource_price").innerHTML= 20; //������Ҫ��ȡ��ǰ�۸���Ϣ
	
	$("maskbg").style.display="block";
	$("use_changesource").style.display="block";
}
function UseChangeAv(){
	var nowLoad=$("use_changesource_old").innerHTML;
	$("use_changesource_s1").value = Math.round(nowLoad/3);
	$("use_changesource_s2").value = Math.round(nowLoad/3);
	$("use_changesource_s3").value = nowLoad - 2*($("use_changesource_s2").value);
	UseCountLeft();
}
function UseMax(id){
	switch (id)
	{
	 case 1:
		$("use_changesource_s1").value = $("use_changesource_old").innerHTML-$("use_changesource_s2").value-$("use_changesource_s3").value;
		break;
	 case 2:
		$("use_changesource_s2").value = $("use_changesource_old").innerHTML-$("use_changesource_s1").value-$("use_changesource_s3").value;
		break; 
	 case 3:
		$("use_changesource_s3").value = $("use_changesource_old").innerHTML-$("use_changesource_s1").value-$("use_changesource_s2").value;
		break;
	}
	UseCountLeft();
}
function UseCountLeft(){
	var nowLeft = $("use_changesource_old").innerHTML;
	nowLeft = nowLeft - $("use_changesource_s1").value - $("use_changesource_s2").value - $("use_changesource_s3").value;
	$("use_changesource_now").innerHTML=nowLeft;
}
function UseChangeSource(){
	if($("use_changesource_now").innerHTML != 0){
		msgbox("����ƽ������Դ����֤ʣ��Ϊ0")	
	}else{
		HI('use_changesource');HI('maskbg');
		//GetTransItem(iCityID,iNewWood,iNewIron,iNewStone,iItemID,iFlag)
		objFlashEng.Send(GetTransItem(CityID,$("use_changesource_s1").value,
									$("use_changesource_s2").value,$("use_changesource_s3").value,
									12,3))
	}
}



//��Դ����
function ShowBuySource(){
	//��ʼ��0
	for(i=1;i<5;i++){
		$("use_buysource_res"+i).innerHTML=0
		$("use_buysource_"+i).innerHTML=0
		$("use_buys"+i).value=0;
	}
	$("use_buysource_money").innerHTML=0
	$("use_buysource_vipmoney").innerHTML=0
	
	//��ʾ������ʾSelect
	hideSelect("");
	showCitySelect('use_buysource_select')
	
	//���ص�ǰ�һ�����
	objFlashEng.Send(GetBuyResItem(1))
	
	//��ʾ��һ����Դ�������
	$("buysource_form").bc[0].checked=true;
	$("use_buysource_leftcount").innerHTML=getItemLeftUseCount(46)*10+"��ȯ��ľͷ"
	
	//���ݲֿ�ȼ���ȡ���������Ϣ
	$("maskbg").style.display="block";
	$("use_buysource").style.display="block";
}
function CountBuySourc(va,type){
	$("use_buysource_str").innerHTML=""
	if(isPlusNumber(va)){
		if(va>10){
			$("use_buysource_str").innerHTML="<span style='color:red'>��һ�β�Ҫ����̫��</span>"
		}else{
			var nameS=["��ʳ","ľͷ","����","ʯ��"]
			$("use_buysource_leftcount").innerHTML=getItemLeftUseCount(type+44)*10+"��ȯ��"+nameS[type-1]
			$("use_buysource_"+type).innerHTML=va*$("use_buysource_res"+type).innerHTML
			$("use_buysource_money").innerHTML=va*10
			$("use_buysource_vipmoney").innerHTML=va*8//vip�۸�
		}
	}else{
		$("use_buysource_str").innerHTML="<span style='color:red'>������������</span>"
	}
}
function cleanInput(n){
	for(i=1;i<5;i++){
		$("use_buysource_"+i).innerHTML=0
		$("use_buys"+i).value=0
	}
	var nameS=["��ʳ","ľͷ","����","ʯ��"]
	$("use_buysource_leftcount").innerHTML=getItemLeftUseCount(n+44)*10+"��ȯ��"+nameS[n-1]
}
function UseBuyS(){
	if ($("buysource_form").bc[3].checked){
		iItemID=45
	}else if ($("buysource_form").bc[0].checked){
		iItemID=46
	}else if ($("buysource_form").bc[1].checked){
		iItemID=47
	}else if ($("buysource_form").bc[2].checked){
		iItemID=48
	}

	var iCityID = $("use_buysource_select").value
	var iBuyCounts = $("use_buys"+(iItemID-44)).value;
	//alert(GetBuyRItem(iCityID,iBuyCounts,iItemID))
	objFlashEng.Send(GetBuyRItem(iCityID,iBuyCounts,iItemID))
}
//��ʾ������ʾSelect
function showCitySelect(id){
	$(id).length=0;
	for(i=0;i<allCityName.length;i++){
		var oOption = document.createElement("OPTION");
		oOption.text=allCityName[i].szCityName;
		oOption.value=allCityName[i].iCityID;
		$(id).add(oOption);
	}
}
//1412��������Э��
function ShowBuyResItem(str){
	var objS=eval('('+str+')');
	if(typeof(objS.CResult) != "undefined")
	{
		//msgbox("Error:"+objT.CResult.iResultID+"<br>��ȡ�һ�����<b>ʧ��</b>:"+objS.CResult.iResultID);
		msgbox("Error:"+objS.CResult.iResultID+"<br><b>��ȡ�һ�����ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objS.CResult.iResultID)+"!</span>");

	}
	else if(objS.CAnsResPar.CResult.iResultID != 0)
	{
		//msgbox("��ȡ�һ�����<b>ʧ��</b>!errorcode :"+objS.CAnsResPar.CResult.iResultID);
		msgbox("Error:"+objS.CAnsResPar.CResult.iResultID+"<br><b>��ȡ�һ�����ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objS.CAnsResPar.CResult.iResultID)+"!</span>");
	}
	else
	{
		for(i=1;i<5;i++){
			$("use_buysource_res"+i).innerHTML=objS.CAnsResPar.iBuyRate;
		}
	}
}
//1405��Դ����ɹ����ش���
function ShowBuyRItem(str){
	var objS=eval('('+str+')');
	if(typeof(objS.CResult) != "undefined")
	{
		//msgbox("��ȡ�һ�����<b>ʧ��</b>!errorcode :"+objS.CResult.iResultID);
		msgbox("Error:"+objS.CResult.iResultID+"<br><b>��ȡ�һ�����ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objS.CResult.iResultID)+"!</span>");
	}
	else if(objS.CAnsResPar.CResult.iResultID != 0)
	{
		//msgbox("��ȡ�һ�����<b>ʧ��</b>!errorcode :"+objS.CAnsResPar.CResult.iResultID);
		msgbox("Error:"+objS.CAnsResPar.CResult.iResultID+"<br><b>��ȡ�һ�����ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objS.CAnsResPar.CResult.iResultID)+"!</span>");
	}
	else
	{
		for(i=1;i<5;i++){
			$("use_buysource_res"+i).innerHTML=objS.CAnsResPar.iBuyRate;
		}
	}
}







//iPara: 1 ���� 2 �Ƽ� 3 ��ļ
function ShowMultiChose(iClass,iSubClass,iPara){
	//$("use_change_nationname").innerHTML=ToNation(curNationID);
	//��ʼ����������Ϣ	
	initMutiItemChoose(iClass,iSubClass,iPara,0);
	$("maskbg").style.display="block";
	$("multiitem_div").style.display="block";
}
function ShowHeroHealth(HeroID,foodType)
{
	ShowFoodMultiChose(3,10,HeroID,foodType);
}
//iPara : Ӣ��id,iFoodType�� food������
function ShowFoodMultiChose(iClass,iSubClass,iPara,foodType){
	//$("use_change_nationname").innerHTML=ToNation(curNationID);
	//��ʼ����������Ϣ	
	initMutiItemChoose(iClass,iSubClass,iPara,foodType);
	$("maskbg").style.display="block";
	$("multiitem_div").style.display="block";
}

//����ʹ�ý���
function showQuickUse(itemID)
{
	$("quickuse_itemid").value = itemID;
	var itemConfig = getItemConfig(itemID);
	//�ų��龰ʹ�õĵ����龰�����������,�����ձ�,���о�,Ӣ�ۿ���,���Ʊ�ʯ����ߵĺϳɺ;���ʯͷ
	if(itemConfig.fclass == 1 || itemID == 20 || itemID == 32 || itemID ==35 ||
	   (itemConfig.fclass == 3 && itemConfig.subClass==10)||
	   	(itemConfig.fclass == 4&& itemConfig.itemID!=53))
	{
		$("NowUse_checkbox").checked = false;
		$("NowUse_checkbox").disabled = true;
	}
	SH("itemmsgbox");
}
//����ʹ�õ���
function NowItemUse()
{
	if($("NowUse_checkbox").checked)
	{
		itemUserProcess($("quickuse_itemid").value);
		$("NowUse_checkbox").checked = false;
	}
	$("NowUse_checkbox").disabled = false;
}
//���ͽ��
function SendGoldMsg(iOtherUin,szNick,igold,sContent)
{
	if(igold<=0)
	{
		msgbox("�����Ŀ�Ƿ�");
	}
	var sMsg = getGoldMsg(iOtherUin,szNick,igold,sContent);
	top.objFlashEng.Send(sMsg);
	
}

function checkUserItemsAndCoin()
{
	if(arrUserQuan == -1)
	{
		objFlashEng.Send(GetUserCoin());
	}
	if(arrUserItem.length == 0)
	{
		objFlashEng.Send(GetUserItems());
	}
}






/*
    1408������
    �������
*/
function OnBuyItemRes(str)
{
	var objBuyItem=eval('('+str+')');
	if(typeof(objBuyItem.CResult) != "undefined")
	{
		//msgbox("������� <b>ʧ��</b>! errorcode :"+objBuyItem.CResult.iResultID);
		msgbox("Error:"+objBuyItem.CResult.iResultID+"<br><b>�������ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objBuyItem.CResult.iResultID)+"!</span>");
	}
	else if(objBuyItem.CAnsBuyingItem.CResult.iResultID != 0)
	{
		//msgbox("������� <b>ʧ��</b>! errorcode :"+objBuyItem.CAnsBuyingItem.CResult.iResultID);
		msgbox("Error:"+objBuyItem.CAnsBuyingItem.CResult.iResultID+"<br><b>�������ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objBuyItem.CAnsBuyingItem.CResult.iResultID)+"!</span>");
	}
	else
	{

		updateCoinData(objBuyItem.CAnsBuyingItem.iCoinCount,objBuyItem.CTMsgHead.llMsgAct);
		//alert("item id "+ objBuyItem.CAnsBuyingItem.iItemID+"count "+objBuyItem.CAnsBuyingItem.iResidual);
		updateObjecData(objBuyItem.CAnsBuyingItem.iItemID,objBuyItem.CAnsBuyingItem.iResidual,-1,
						objBuyItem.CTMsgHead.llMsgAct,true);
		if(objBuyItem.CTMsgHead.llMsgAct == 1)
		{
			//msgbox("������� <b>�ɹ�</b>!��ʼʹ�õ���");
			SendItemUseReq(objBuyItem.CAnsBuyingItem.iItemID);
		}
		//add by mario 090119 �������ձ��������о������ߵĵ���Э��
		else if(objBuyItem.CTMsgHead.llMsgAct == 32 )
		{
			//msgbox("������� <b>�ɹ�</b>!��ʼʹ�õ���");
			objFlashEng.Send(GetCancleArmy(curArmyIng,32));
		}
		else if(objBuyItem.CTMsgHead.llMsgAct == 20)
		{
			//msgbox("������� <b>�ɹ�</b>!��ʼʹ�õ���");
			eval(strStartAttact);
		}
		//add end
		else
		{
			//������ȡ��������
			objFlashEng.Send(GetUserItems());
			
			showQuickUse(objBuyItem.CAnsBuyingItem.iItemID);
			//msgbox("������� <b>�ɹ�</b>!");
			
			
		}
	}
		
}

function OnUseLinPai(str)
{
	var objUseItem=eval('('+str+')');
	if(typeof(objUseItem.CResult) != "undefined")
	{
		//msgbox("������� <b>ʧ��</b>! errorcode :"+objBuyItem.CResult.iResultID);
		msgbox("Error:"+objUseItem.CResult.iResultID+"<br><b>ʹ�ü�������ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objUseItem.CResult.iResultID)+"!</span>");
	}
	else if(objUseItem.CAnsEndowPopulItem.CResult.iResultID != 0)
	{
		//msgbox("������� <b>ʧ��</b>! errorcode :"+objBuyItem.CAnsBuyingItem.CResult.iResultID);
		msgbox("Error:"+objUseItem.CAnsEndowPopulItem.CResult.iResultID+"<br><b>ʹ�ü�������ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objUseItem.CAnsEndowPopulItem.CResult.iResultID)+"!</span>");
	}
	else
	{
		objFlashEng.Send(GetUserItems());
		msgbox("��������ʹ�� <b>�ɹ�</b>!");
	}
}


/*
    1416������
    �����������
*/
function OnBuyManyItems(str)
{
	var objBuyItem=eval('('+str+')');
	if(typeof(objBuyItem.CResult) != "undefined")
	{
		//msgbox("������� <b>ʧ��</b>! errorcode :"+objBuyItem.CResult.iResultID);
		msgbox("Error:"+objBuyItem.CResult.iResultID+"<br><b>�������ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objBuyItem.CResult.iResultID)+"!</span>");
	}
	else if(objBuyItem.CAnsBuyItems.CResult.iResultID != 0)
	{
		//msgbox("������� <b>ʧ��</b>! errorcode :"+objBuyItem.CAnsBuyingItem.CResult.iResultID);
		msgbox("Error:"+objBuyItem.CAnsBuyItems.CResult.iResultID+"<br><b>�������ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objBuyItem.CAnsBuyItems.CResult.iResultID)+"!</span>");
	}
	else
	{
		objFlashEng.Send(GetUserItems());
		var str = "�ɹ��Ĺ��������µ��ߣ�<br>";
		for(var i=0;i<objBuyItem.CAnsBuyItems.astItemID.length;i++)
		{
			str +="<span class='t_red'>"+getItemConfig(objBuyItem.CAnsBuyItems.astItemID[i]).name+":"+objBuyItem.CAnsBuyItems.astItemCount[i]	+"��</span><br>";
		}
		
		HI("use_septorder")
		msgbox(str);
		updateCoinData(objBuyItem.CAnsBuyItems.iCoinCount,0);
	}
}

/*
    1409������
    ��ȡ�����б�
*/
function OnGetUserItemRes(str)
{
	var objGetItem=eval('('+str+')');
	if(typeof(objGetItem.CResult) != "undefined")
	{
		//msgbox("��ȡ���� <b>ʧ��</b>! errorcode :"+objGetItem.CResult.iResultID);
		msgbox("Error:"+objGetItem.CResult.iResultID+"<br><b>��ȡ����ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objGetItem.CResult.iResultID)+"!</span>");
	}
	else if(objGetItem.CAnsGetingUserItem.CResult.iResultID != 0)
	{
		//msgbox("��ȡ���� <b>ʧ��</b>! errorcode :"+objGetItem.CAnsGetingUserItem.CResult.iResultID);
		msgbox("Error:"+objGetItem.CAnsGetingUserItem.CResult.iResultID+"<br><b>��ȡ����ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objGetItem.CAnsGetingUserItem.CResult.iResultID)+"!</span>");
	}
	else
	{	
		if(objGetItem.CAnsGetingUserItem.iUin == Uin)
		{
			//msgbox("��ȡ���� <b>�ɹ�</b>!"+str);
			//�û�ӵ�е���ȫ�ֱ���
			arrUserItem = objGetItem.CAnsGetingUserItem.astItems;	
			
			//����ǽ��������������󣬸��½������ĵ����б�
			if(objGetItem.CTMsgHead.llMsgAct==-10){
				document.frames["marketdiv"].ShowMarketItem(arrUserItem)
			}	
			
			//����ϳ�ϵͳ������ʯͷ��Ŀ
			if($("trea_item16"))updataItemNum()
			//����ϵͳ������С��������	
			$("chat_div_item1").innerHTML=getItemCount(36)	
			$("chat_div_item2").innerHTML=getItemCount(35)
		}
		
		
	}
}
/*
	1400����Ϣ������
	buff�����ʹ�õ���Ϣ������
*/
function OnUserItemResMsg(str)
{
	var objUserItem=eval('('+str+')');
	//�ø�λ����ʾ�����ʹ�õı�־
	var iFlag = objUserItem.CTMsgHead.llMsgAct%10;
	var itemID = (objUserItem.CTMsgHead.llMsgAct - iFlag)/10;
	if(typeof(objUserItem.CResult) != "undefined")
	{
		if(objUserItem.CResult.iResultID == 1400003)
		{
			if(itemID == "24")
			{
				msgboxyesno("���ĳǳ����С�ʵ����֮����Ч����\r\nʹ�á����ʵ֮�������ǡ�ʵ����֮����Ч��");
				msgboxFunc="objFlashEng.Send(GetBufferItem("+CityID+",24,1,"
													  +objUserItem.CTMsgHead.llMsgAct+"))";
			}
			else if(itemID == "23")
			{
				msgboxyesno("���ĳǳ����С����ʵ֮����Ч����\r\nʹ�á�ʵ����֮�������ǡ����ʵ֮����Ч��");
				msgboxFunc="objFlashEng.Send(GetBufferItem("+CityID+",23,1,"
													  +objUserItem.CTMsgHead.llMsgAct+"))";
			}
			else if(itemID == "22")
			{
				msgboxyesno("���ĳǳ����С���ľ�Ա�����Ч����\r\nʹ�á��ճǼơ������ǡ���ľ�Ա�����Ч��");
				msgboxFunc="objFlashEng.Send(GetBufferItem("+CityID+",22,1,"
													  +objUserItem.CTMsgHead.llMsgAct+"))";
			}
			else if(itemID == "21")
			{
				msgboxyesno("���ĳǳ����С��ճǼơ���Ч����\r\nʹ�á���ľ�Ա��������ǡ��ճǼơ���Ч��");
				msgboxFunc="objFlashEng.Send(GetBufferItem("+CityID+",21,1,"
													  +objUserItem.CTMsgHead.llMsgAct+"))";
			}
			else
			{
				msgbox("Error:"+objUserItem.CResult.iResultID+"<br><b>����ʹ��ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CResult.iResultID)+"!</span>");
				
			}
			
		}
		else 
			msgbox("Error:"+objUserItem.CResult.iResultID+"<br><b>����ʹ��ʧ��:</b><span class='t_red'>"		                       +errMsg(objUserItem.CResult.iResultID)+"!</span>");
	}
	else if(objUserItem.CAnsUseingItem.CResult.iResultID != 0)
	{
		msgbox("Error:"+objUserItem.CAnsUseingItem.CResult.iResultID+"<br><b>����ʹ��ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CAnsUseingItem.CResult.iResultID)+"!</span>");
	}
	else
	{
		msgbox("����ʹ�� <b>�ɹ�</b>!");
		//���µ�����Ŀ
		//alert("item id "+ objUserItem.CAnsUseingItem.iItemID+"count "+objUserItem.CAnsUseingItem.iResidual);
		objFlashEng.Send(GetMineCity(CityID,0));
		updateObjecData(objUserItem.CAnsUseingItem.iItemID,
						objUserItem.CAnsUseingItem.iResidual,-1,
						iFlag,false);
	}
}
/*
	1401����Ϣ������
	Ǩ�Ƿ�ʹ�õ���Ϣ������
*/
function OnMoveCityResMsg(str)
{
	var objUserItem=eval('('+str+')');
	if(typeof(objUserItem.CResult) != "undefined")
	{
		msgbox("Error:"+objUserItem.CResult.iResultID+"<br><b>Ǩ�Ƿ�����ʹ��ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CResult.iResultID)+"!</span>");
	}
	else if(objUserItem.CAnsItemMoverCity.CResult.iResultID != 0)
	{
		
			msgbox("Error:"+objUserItem.CAnsItemMoverCity.CResult.iResultID+"<br><b>Ǩ�Ƿ�����ʹ��ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CAnsItemMoverCity.CResult.iResultID)+"!</span>");
	}
	else
	{
		objFlashEng.Send(GetMineCity(CityID,0));
		msgbox("Ǩ�Ƿ�����ʹ�� <b>�ɹ�</b>!");
		//�˴���Ҫ��Ӹ����û�������Ϣ�Ĵ�����
		//���µ�����Ŀ
		//alert("item id "+ objUserItem.CAnsItemMoverCity.iItemID+"count "+objUserItem.CAnsItemMoverCity.iResidual);
		updateObjecData(objUserItem.CAnsItemMoverCity.iItemID,
						objUserItem.CAnsItemMoverCity.iResidual,-1,
						objUserItem.CTMsgHead.llMsgAct,false);
		//document.frames["shopdiv"].onDataChange();
	}
}
/*
	1402����Ϣ������
	�������ĵ���ʹ�õ���Ϣ������
*/
function OnChangeNationResMsg(str)
{
	var objUserItem=eval('('+str+')');
	if(typeof(objUserItem.CResult) != "undefined")
	{
		msgbox("Error:"+objUserItem.CResult.iResultID+"<br><b>�������ĵ���ʹ��ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CResult.iResultID)+"!</span>");
	}
	else if(objUserItem.CAnsItemChangeNation.CResult.iResultID != 0)
	{
		msgbox("Error:"+objUserItem.CAnsItemChangeNation.CResult.iResultID+"<br><b>�������ĵ���ʹ��ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CAnsItemChangeNation.CResult.iResultID)+"!</span>");
	}
	else
	{
		msgbox("�������ĵ���ʹ�� <b>�ɹ�</b>!");
		//�˴���Ҫ��Ӹ����û�������Ϣ�Ĵ�����
		//����ǰ̨����
		curNationID = objUserItem.CAnsItemChangeNation.iNewNationID;
		$("init_iPlayerNationID").innerHTML = ToNation(curNationID);		
		//���µ�����Ŀ
		updateObjecData(objUserItem.CAnsItemChangeNation.iItemID,
						objUserItem.CAnsItemChangeNation.iResidual,-1,
						objUserItem.CTMsgHead.llMsgAct,false);
	}
}
/*
	1403����Ϣ������
	����������������ʹ�õ���Ϣ������
*/
function OnSpeedBuildResMsg(str)
{
	var objUserItem=eval('('+str+')');
	if(typeof(objUserItem.CResult) != "undefined")
	{
		if(objUserItem.CResult.iResultID == 1400018)
		{
			msgbox("���ٽ��������һ�����ֻ��ʹ��10�Σ�\r\n�������ʹ��,��ʹ�ò��޴����ġ��¹ⱦ�С�");
		}
		else
			msgbox("Error:"+objUserItem.CResult.iResultID+"<br><b>������ٵ���ʹ��ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CResult.iResultID)+"!</span>");
	}
	else if(objUserItem.CAnsItemSpeedupBuild.CResult.iResultID != 0)
	{
		msgbox("Error:"+objUserItem.CAnsItemSpeedupBuild.CResult.iResultID+"<br><b>������ٵ���ʹ��ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CAnsItemSpeedupBuild.CResult.iResultID)+"!</span>");
	}
	else
	{
		objFlashEng.Send(GetMineCity(CityID,0));
		msgbox("������ٵ���ʹ�� <b>�ɹ�</b>!");
		//���µ�����Ŀ
		updateObjecData(objUserItem.CAnsItemSpeedupBuild.iItemID,
						objUserItem.CAnsItemSpeedupBuild.iResidual,
						objUserItem.CAnsItemSpeedupBuild.iBeUseConuts,
						objUserItem.CTMsgHead.llMsgAct,false);
	}
}
/*
	1404����Ϣ������
	��ļ������ٵ���ʹ�õ���Ϣ������
*/
function OnSpeedArmyResMsg(str)
{
	var objUserItem=eval('('+str+')');
	if(typeof(objUserItem.CResult) != "undefined")
	{
		if(objUserItem.CResult.iResultID == 1400018)
		{
			msgbox("���ٱ��������һ�����ֻ��ʹ��10�Σ�\r\n�������ʹ��,��ʹ�ò��޴����ġ����ӱ������䡱");
		}
		else
			msgbox("Error:"+objUserItem.CResult.iResultID+"<br><b>��ļ���ٵ���ʹ��ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CResult.iResultID)+"!</span>");
	}
	else if(objUserItem.CAnsItemSpeedupBuild.CResult.iResultID != 0)
	{
		msgbox("Error:"+objUserItem.CAnsItemSpeedupBuild.CResult.iResultID+"<br><b>��ļ���ٵ���ʹ��ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CAnsItemSpeedupBuild.CResult.iResultID)+"!</span>");
	}
	else
	{
		objFlashEng.Send(GetMineCity(CityID,0));
		msgbox("��ļ���ٵ���ʹ�� <b>�ɹ�</b>!");
		//���µ�����Ŀ
		updateObjecData(objUserItem.CAnsItemSpeedupBuild.iItemID,
						objUserItem.CAnsItemSpeedupBuild.iResidual,
						objUserItem.CAnsItemSpeedupBuild.iBeUseConuts,
						objUserItem.CTMsgHead.llMsgAct,false);
	}
}
/*
	1405����Ϣ������
	������Դ����ʹ�õ���Ϣ������
*/
function OnBuyResourceResMsg(str)
{
	var objUserItem=eval('('+str+')');
	if(typeof(objUserItem.CResult) != "undefined")
	{
		if(objUserItem.CResult.iResultID == 1400018)
		{
			msgbox("����ʧ��,������Դ�����������!");
		}
		else
			msgbox("Error:"+objUserItem.CResult.iResultID+"<br><b>������Դ����ʹ��ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CResult.iResultID)+"!</span>");
	}
	else if(objUserItem.CAnsBuyRes.CResult.iResultID != 0)
	{
		msgbox("Error:"+objUserItem.CAnsBuyRes.CResult.iResultID+"<br><b>������Դ����ʹ��ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CAnsBuyRes.CResult.iResultID)+"!</span>");
	}
	else
	{
		objFlashEng.Send(GetMineCity(CityID,0));
		msgbox("������Դ����ʹ�� <b>�ɹ�</b>!");
		//�˴���Ҫ��Ӹ����û���Դ��Ϣ�Ĵ�����
		//���µ�����Ŀ
		//updateObjecData(iItemID,iNum,iLeftCount,iFlag,iBuyFlag)
		//alert("left times "+objUserItem.CAnsBuyRes.iLeftUseCount + "coin :"+objUserItem.CAnsBuyRes.iCoinCount);
		updateCoinData(objUserItem.CAnsBuyRes.iCoinCount,0);
		updateObjecData(objUserItem.CAnsBuyRes.iItemID,objUserItem.CAnsBuyRes.iResidual,
						objUserItem.CAnsBuyRes.iLeftUseCount,0,true);
	}
}
/*
	1406����Ϣ������
	��Դת������ʹ�õ���Ϣ������
*/
function OnExChangeResMsg(str)
{
	var objUserItem=eval('('+str+')');
	if(typeof(objUserItem.CResult) != "undefined")
	{
		msgbox("Error:"+objUserItem.CResult.iResultID+"<br><b>��Դת������ʹ��ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CResult.iResultID)+"!</span>");
	}
	else if(objUserItem.CAnsExchangeRes.CResult.iResultID != 0)
	{
		msgbox("Error:"+objUserItem.CAnsExchangeRes.CResult.iResultID+"<br><b>��Դת������ʹ��ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CAnsExchangeRes.CResult.iResultID)+"!</span>");
	}
	else
	{
		objFlashEng.Send(GetMineCity(CityID,0));
		updateCoinData(objUserItem.CAnsExchangeRes.iCoinCount,0);
		msgbox("��Դת������ʹ�� <b>�ɹ�</b>!");
		//�˴���Ҫ��Ӹ����û���Դ��Ϣ�Ĵ�����
		//���µ�����Ŀ
		//document.frames["shopdiv"].onChangeItemNum(-1,objUserItem.CTMsgHead.llMsgAct);
	}
}
/*
	1407����Ϣ������
	�˱�������ʹ�õ���Ϣ������
*/
function OnTributaryResMsg(str)
{
	var objUserItem=eval('('+str+')');
	if(typeof(objUserItem.CResult) != "undefined")
	{
		msgbox("Error:"+objUserItem.CResult.iResultID+"<br><b>�˱�������ʹ��ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CResult.iResultID)+"!</span>");
	}
	else if(objUserItem.CAnsTributary.CResult.iResultID != 0)
	{
		msgbox("Error:"+objUserItem.CAnsTributary.CResult.iResultID+"<br><b>�˱�������ʹ��ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CAnsTributary.CResult.iResultID)+"!</span>");
	}
	else
	{
		objFlashEng.Send(GetMineCity(CityID,0));
		msgbox("�˱�������ʹ�� <b>�ɹ�</b>!");
		//���µ�����Ŀ
		updateObjecData(objUserItem.CAnsTributary.iItemID,
						objUserItem.CAnsTributary.iResidual,-1,
						objUserItem.CTMsgHead.llMsgAct);
	}
}
/*
	1410����Ϣ������
	��ȡ������Ϣ������
*/
function OnGetCoinResMsg(str)
{
	var objGetCoinItem=eval('('+str+')');
	if(typeof(objGetCoinItem.CResult) != "undefined")
	{
		msgbox("Error:"+objGetCoinItem.CResult.iResultID+"<br><b>��ȡ��ȯʧ��:</b><span class='t_tips_yellow'>"+errMsg(objGetCoinItem.CResult.iResultID)+"!</span>");
	}
	else if(objGetCoinItem.CAnsUserGetCoin.CResult.iResultID != 0)
	{
		msgbox("Error:"+objGetCoinItem.CAnsUserGetCoin.CResult.iResultID+"<br><b>��ȡ��ȯʧ��:</b><span class='t_tips_yellow'>"+errMsg(objGetCoinItem.CAnsUserGetCoin.CResult.iResultID)+"!</span>");
	}
	else
	{
		//msgbox("��ȡ��ȯ:"+objGetCoinItem.CAnsGetCoin.iCoinCount);
		//�Ե�ȯȫ�ֱ�����ֵ
		arrUserQuan = objGetCoinItem.CAnsUserGetCoin.iCoinCount;
		//alert("coin : "+arrUserQuan);
		document.frames["shopdiv"].disPlayMyCoin(objGetCoinItem.CAnsUserGetCoin.iCoinCount);
	}
}

/*
1021����Ϣ������
���ͽ��
*/

function OnSendGoldMsg(str)
{
	var objSendGoldItem=eval('('+str+')');
	if(typeof(objSendGoldItem.CResult) != "undefined")
	{
		msgbox("Error:"+objSendGoldItem.CResult.iResultID+"<br><b>���ͽ��ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objSendGoldItem.CResult.iResultID)+"!</span>");
		document.frames["maildiv"].frames["rightframe"].SendGoldFailed();
	}
	else if(objSendGoldItem.CAnsTransferGold.CResult.iResultID != 0)
	{
		msgbox("Error:"+objSendGoldItem.CAnsTransferGold.CResult.iResultID+"<br><b>���ͽ��ʧ��:</b><span class='t_tips_yellow'>"+errMsg(objSendGoldItem.CAnsTransferGold.CResult.iResultID)+"!</span>");
		document.frames["maildiv"].frames["rightframe"].SendGoldFailed();
	}
	else
	{
		//msgbox("��ȡ��ȯ:"+objGetCoinItem.CAnsGetCoin.iCoinCount);
		//�Ե�ȯȫ�ֱ�����ֵ
		var arrUserGold = objSendGoldItem.CAnsTransferGold.iNowGold;
		//alert("now coin "+arrUserGold);
		top.$("init_iGlod").innerHTML = arrUserGold;
		document.frames["maildiv"].frames["rightframe"].location = "/mailtemplate/mail_gold_ok.html";
	}
}
/////////////////////////////////


function onFoodItemMsg(str)
{
	var objUserItem=eval('('+str+')');
	if(typeof(objUserItem.CResult) != "undefined")
	{
		
			msgbox("Error:"+objUserItem.CResult.iResultID+"<br><b>Ӣ�ۿ�������ʹ��:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CResult.iResultID)+"!</span>");
	}
	else if(objUserItem.CAnsUseHeroFood.CResult.iResultID != 0)
	{
		msgbox("Error:"+objUserItem.CAnsUseHeroFood.CResult.iResultID+"<br><b>Ӣ�ۿ�������ʹ��:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CAnsUseHeroFood.CResult.iResultID)+"!</span>");
	}
	else
	{
		msgbox("Ӣ�ۿ�������ʹ�� <b>�ɹ�</b>!");
		//����Ӣ���б�
		objFlashEng.Send(getTaskList(1601));
		//���µ�����Ŀ
		updateObjecData(objUserItem.CAnsUseHeroFood.iItemID,
						objUserItem.CAnsUseHeroFood.iResidual,
						objUserItem.CAnsUseHeroFood.iLeftUseCount,
						objUserItem.CTMsgHead.llMsgAct,false);
	}
}


function onBuyGoldMsg(str)
{
	var objBuyItem=eval('('+str+')');
	if(typeof(objBuyItem.CResult) != "undefined")
	{
		
			msgbox("Error:"+objBuyItem.CResult.iResultID+"<br><b>�����Ԫ��:</b><span class='t_tips_yellow'>"+errMsg(objBuyItem.CResult.iResultID)+"!</span>");
	}
	else if(objBuyItem.CAnsBuyGold.CResult.iResultID != 0)
	{
		msgbox("Error:"+objBuyItem.CAnsBuyGold.CResult.iResultID+"<br><b>�����Ԫ��:</b><span class='t_tips_yellow'>"+errMsg(objBuyItem.CAnsBuyGold.CResult.iResultID)+"!</span>");
	}
	else
	{
		msgbox("�����Ԫ�� <b>�ɹ�</b>! �������� <b>"+objBuyItem.CAnsBuyGold.iAddGold+"</b> ���");
		var arrUserGold = objBuyItem.CAnsBuyGold.iGoldCount;
		//alert("now coin "+arrUserGold);
		top.$("init_iGlod").innerHTML = arrUserGold;
		//���½����Ŀ
		arrUserQuan = objBuyItem.CAnsBuyGold.iCoinCount;
		//alert("coin : "+arrUserQuan);
		//if(document.frames["shopdiv"].src!="")
		document.frames["shopdiv"].disPlayMyCoin(objBuyItem.CAnsBuyGold.iCoinCount);
	}	
}

//��ȡ�龰ʹ�õĵ���id����������͵��ߣ����ȷ������͵���id,
//Ϊ0��ʾ�õ��ߵ���Ŀ���㣬��Ҫ����
function getSceneUseItemID(itemID)
{
	var iCount =getItemCount(itemID);
	if(iCount > 0)
		return itemID;
	else
	{
		var iRelatedID = getRelatedItemID(itemID);
		iCount = getItemCount(iRelatedID);
		if(iCount > 0)
			return iRelatedID;
	}
	return 0;
}

function getRelatedItemID(itemID)
{
	if(parseInt(itemID,10)>100)
		return parseInt(itemID,10)-100;
	else
		return parseInt(itemID,10)+100;
}



function onBuyClick(iItemID,sName,iPrice,iVipPrice,vTime,sNotes)
{
	if(iItemID == 11)
	{
		ShowBuySource();
	}
	else if(iItemID == 12)
	{
		ShowChangeSource();
	}
	else if(iItemID == 54)
	{
		showBuySeptDiv();
	}
	else
	{
		ShowBuyDiv(iItemID,sName,iPrice,iVipPrice,vTime,sNotes);
	}
}



/*
**    ==================================================================================================  
**    ������ 
**    ���ܣ� ����ڶ����
**    ʾ���� 
**    ==================================================================================================  
*/
var testShopMyItem

//������Դ�ڶ����
function doIndexBuySource(){
	//getItemConfig(11)
	onBuyClick(11,getItemConfig(11).name,
				getItemConfig(11).price,
				getItemConfig(11).vipPrice,
				getItemConfig(11).expireTime,
				getItemConfig(11).note)	
}


//���ҵĲֿ�ڶ����
function doIndexMyItem(){
	iframebanner(2);
	if(typeof(testShopMyItem)== "object")
		testShopMyItem=clearTimeout(testShopMyItem);
	testShopMyItem = setTimeout("testShopDivItem()",300);
}
function testShopDivItem(){
	if(typeof(document.frames['shopdiv'].onBuyClick)=="function"){
		$("shopdiv").src = "/shoptemplate/myitem.html"
		ShowTab('shop',6)
		testShopMyItem=clearTimeout(testShopMyItem);
	}
}



//����С���ȵڶ����
function doIndexBuyChat(){
	onBuyClick(35,getItemConfig(35).name,
				getItemConfig(35).price,
				getItemConfig(35).vipPrice,
				getItemConfig(35).expireTime,
				getItemConfig(35).note)	
}

//��ȡ��ȯ
function sendGetCoin()
{
	if(typeof(top.objFlashEng)!="object")
	{
		setTimeout("sendGetCoin()",500);
		return false;
	}
	else
	{
	   if(top.arrUserQuan == -1)
			top.objFlashEng.Send(top.GetUserCoin());
		return true;
	}
}