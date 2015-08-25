// JavaScript Document

function $(id){return document.getElementById(id);}
function w(id){return document.write(id);}
function chkvalue(arr,iIndex) 
{
	if(iIndex<arr.length&&arr[iIndex]!=0) 
		return (arr[iIndex]/10)+"%";
	return 0;
}
//�������
function countAttributeNotZero(attribute)
{
	var count = 0;
	for(var i=1;i<attribute.length;i++)
	{
		if(i!=9 && i!=10)
		{
			if(attribute[i]!=0)
				count++;
		}
	}
	return count;
}

function countall(arrm){
	var count=0;
	for(var i=0;i<arrm.length;i++){
		count = count  +  arrm[i];
	}
	return count;
}

function PackArr(array,num){
	var temarr=[];
	temarr.length = 0;
	for(var i=0;i<num;i++){
		if(array.length>i && array[i]>0 ){
			temarr.push(array[i]);
		}else{
			temarr.push(0);
		}
	}
	return temarr;
}

function getArrayValue(array,num)
{
	if( array.length>num &&array[num]>0){
			return array[num];
		}else{
			return 0;
		}
}

function showLostFort(){
	var temstr="";
		for(var i=0;i<oR.CBillFortInfo.astFortInfo[1].ashFort.length;i++){
			if(oR.CBillFortInfo.astFortInfo[1].ashFort[i] > 0){
			temstr= temstr+
					mb.Buidings[top.for_start_arid+i].BuildingName+
					oR.CBillFortInfo.astFortInfo[1].ashFort[i]+"��&nbsp;&nbsp;";
		}
	}
	if(temstr == "")
		temstr = "��";
	return temstr;
}

// ��cookie��ȡQQ��
// cookie����
function chGetCookie(name)
{
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null)
	{
		return unescape(arr[2]);
	}
	return "";
}

function chGetUin()
{

	var aRet = chGetCookie('uin').match(/\d+/);
	return aRet ? parseInt(aRet[0], 10) : -1;
}

//��ȡ�û����ͣ�0 �������� 2������, 1 ���ط�,3����
function getUserType()
{
	if(typeof(oR.astCityInfo) == "undefined")
		return 3;
	if(oR.astMainArmy.length == 0)
		return 2;
	else
	{
		
		if(chGetUin() == oR.astCityInfo[0].iUin)
		{
				return 0;
				
		}
		else if(chGetUin() == oR.astCityInfo[1].iUin)
		{
			return 1;
		}
		else
		{
			return 3;
		}
	}
}



//iClass 0:  ��ȡ���н����ߵı����ܺ� ����������
//iClass 1: ��ȡ���з����ߵı����ܺ� ���������ܺ� 
function getTotalArmCount(iClass)
{

	var count = 0; 

	count = countall(oR.astMainArmy[iClass].astArmyInfo[0].ashArmy);
	if(iClass>0)
	{
		for(i=0;i<oR.astUniteArmy.length;i++)
		{
			count+=countall(oR.astUniteArmy[i].astArmyInfo[0].ashArmy);
		}
	}
	
	return count;
}

//������ʧ����
function getTotalLostArmy(iClass)
{
	var count = 0; 
	//�����Լ�����ʧ����
	count = countall(oR.astMainArmy[iClass].astArmyInfo[1].ashArmy);
	count = count-countall(oR.astMainArmy[iClass].astArmyInfo[2].ashArmy);
	if(iClass>0)
	{
		for(i=0;i<oR.astUniteArmy.length;i++)
		{
			count+=countall(oR.astUniteArmy[i].astArmyInfo[1].ashArmy);
			
			count = count-countall(oR.astUniteArmy[i].astArmyInfo[2].ashArmy);
		}
	}
	return count;
}

//��ȡ��ʧ�Ļ�����Ϣ
function getTotalLostInfo(iClass)
{
	var sTotalInfo = "";
	var sGeneInfo="";
	var soldierInfo="";
	var fitInfo = "";
	if(getUserType() != 2)
	{
		if(iClass ==0 || iClass ==1)
		{
			sGeneInfo = "�佫 "+getHeroNumStr(iClass);
			soldierInfo = "ʿ�� " + getTotalLostArmy(iClass)+"/"+getTotalArmCount(iClass);
			fitInfo = "װ�� " + getLostFitCount(iClass)+"/"+getTotalFitCount(iClass);
			sTotalInfo = sGeneInfo+" "+soldierInfo+" "+fitInfo;
		}
	}
	return sTotalInfo;
}

function getTotalFitCount(iClass)
{
	var iCount = 0;
	iCount = countall(oR.astMainArmy[iClass].astOutfitInfo[0].achOutfit);
	if(iClass ==0)
		return iCount;
	for(i=0;i<oR.astUniteArmy.length;i++)
	{
		iCount+=countall(oR.astUniteArmy[i].astOutfitInfo[0].achOutfit);
	}
	return iCount;
}

//��ȡ���з����ߵ�װ���ܺ� ��iType 0������װ���ܺ� �� 1��ʧװ���ܺ�
//iClass 0:  ��ȡ���н�����װ���ܺ� ��iType 0�����������ܺ� �� 1��ʧ
//iClass 1: ��ȡ���з��ص�װ���ܺ� ��iType 0�����������ܺ� �� 1��ʧ��
function getLostFitCount(iClass)
{
	var count = countall(oR.astMainArmy[iClass].astOutfitInfo[1].achOutfit);
	if(iClass == 0)
		return count;
	for(i=0;i<oR.astUniteArmy.length;i++)
	{
		count+=countall(oR.astUniteArmy[i].astOutfitInfo[1].achOutfit);
	}
	return count;
}





/*
*Name : ����
 SValue : ֵ
 iNum: ֵ��ռ�ı����
*/
function addTableTitle(tableObj,Name,sValue,iNum,iNameWidth)
{
	//����
	var tableRow = tableObj.insertRow(-1);
	var tableValueTd = document.createElement('td');
	//����������
	if(Name !="")
	{
		tableValueTd.innerHTML = Name;
		tableValueTd.colspan = 1;
		tableValueTd.width = iNameWidth;
		tableRow.appendChild(tableValueTd);
		tableValueTd = document.createElement('td');
		//ֵ
	}
	//û������
	else
	{
		iNum = iNum+1;
	}
	tableValueTd.innerHTML = sValue;

	tableValueTd.colSpan  = iNum;
	tableRow.appendChild(tableValueTd);
	return tableRow;
	
}

//����������һ��
function addTableLineInfo(tableObj,lineName,arrValue,iNum,defaultValue,iNameWidth,iValWidth)
{
	var tableRow = tableObj.insertRow(-1);
	var tableValueTd = document.createElement('td');
	tableValueTd.innerHTML = lineName;
	tableValueTd.width = iNameWidth;
	tableRow.appendChild(tableValueTd);
	for(i=0;i<iNum;i++)
	{
			var tableValueTd = document.createElement('td');
			if(arrValue.length>i)
			{
				tableValueTd.innerHTML = arrValue[i];
			}
			else
			{
				
				tableValueTd.innerHTML = defaultValue;
			}
			tableValueTd.colSpan   = 1;
			tableValueTd.width = iValWidth;
			tableRow.appendChild(tableValueTd);
	}
	return tableRow;
}

function getArrayMinus(arry1,arry2)
{
	var retArray =[];
	for(i=0;i<arry1.length;i++)
	{
		retArray[i] = arry1[i] - arry2[i];
	}
	return retArray;
}
//
function getMaskArray(arry1,maskArray)
{
	var retArray =[];
	var iCount = 0;
	for(i=0;i<arry1.length;i++)
	{
		if(i<maskArray.length)
		{
			if(maskArray[i]==0)
				retArray[iCount++] = arry1[i];
		}
		else
			retArray[iCount++] = arry1[i];
	}
	return retArray;	
}

//
function getArrayAdd(arry1,arry2)
{
	var retArray =[];
	var i = 0;
	for(i=0;i<arry1.length();i++)
	{
		if(i<arry2.length)
			retArray[i] = arry1[i] + arry2[i];
		else
			retArray[i] = arry1[i];
	}
	if(i<arry2.length)
	{
		for(;i<arry2.length();i++)
		{
			retArray[i] =arry2[i];
		}
	}
	return retArray;
}


//��ȡ��Ʒ�Ŀ�ʼ���
function getTableNameIndex(tableObj,IdStr)
{
	var len = tableObj.rows.length;
	for(i=0;i<len;i++)
	{
		if(tableObj.rows[i].id == IdStr)
		{
			return i;
		}
	}
	return -1;
}

//���һ��
function addGetItem(tableObj,itemName,ItemValue,index,styleStr)
{
	//����
	var tableRow = tableObj.insertRow(index);
	var tableValueTd = document.createElement('td');
	tableValueTd.innerHTML = itemName+": " +ItemValue;
	tableRow.appendChild(tableValueTd);
	//ֵ
	if(styleStr!="")
		tableRow.className = styleStr;
}

//�ڱ������ӻ�ȡ������ʧ����Ʒ��
function addGetItemsToTable(tableObj)
{
	var iIndex = -1;//getTableNameIndex(tableObj,"LostFlagStart");
	var iType = getUserType();
	//������
	if(iType == 0)
	{
		addAttackGetItem(tableObj,iIndex);
	}
	//������
	else if(iType == 1)
	{
		addDefeatGetItem(tableObj,iIndex);
	}
	//�������������ʼ�ת��
	else if(iType == 2)
	{
		addUniteGetItem(tableObj,iIndex);
	}
	//�������ʼ�ת��
	else
	{
		addOtherGetItem(tableObj,iIndex);
	}
}

//�Լ��ǹ�����
function addAttackGetItem(tableObj,index)
{
	var heroInfo = "";
	var iteminfo = "";
	if(typeof(oR.atAddedPrize)!='undefined')
	{
		for(var i=0;i<oR.atAddedPrize.length;i++)
		{
			if(oR.atAddedPrize[i].iHarvestType == 6)
			{
				//�ж�Ӣ���Ƿ��ڷǼ���״̬
				if(oR.atAddedPrize[i].iHarvestData != 4)
					heroInfo += oR.atAddedPrize[i].szRemark+" ";
				else if(oR.iWarResult == 0)
					heroInfo += oR.atAddedPrize[i].szRemark+"<span style='color:red'>(����Ӣ���Ѵ����޸�Ӣ�۱�ϵͳ��ʱ�洢���뾡����������Ӣ��)</span>";
				else
					heroInfo += oR.atAddedPrize[i].szRemark+" ";
			}
			if(oR.atAddedPrize[i].iHarvestType == 4)
			{
				var itemcfg = top.getItemConfig(oR.atAddedPrize[i].iHarvestID);
				if(itemcfg!=0)
						iteminfo += iteminfo+itemcfg.name+"��"+oR.atAddedPrize[i].iHarvestData+" ";
			}
		}
		if(heroInfo!="")
		{
			heroInfo = '<span class="topheroname">'+heroInfo+'</span>';
		}
		
	}
	//��ʤ
	if(oR.iWarResult == 0)
	{
		var resStr = getResourceInfo();
		if(resStr!="")
			addGetItem(tableObj,"�����Դ",resStr,index);
		//����Ƿ���Ӣ�ۺͱ���
		//����Ƿ��õ���

		if(heroInfo!="")
		{
			//�ж�Ӣ��״̬
			addGetItem(tableObj,"��²Ӣ��",heroInfo,index);
		}
		if(iteminfo!="")
		{
			addGetItem(tableObj,"��õ���",iteminfo,index);
		}
	}
	//ʧ��
	else if(oR.iWarResult == 1)
	{
		//����Ƿ����ʧӢ�ۺͱ���
		if(heroInfo!="")
		{
			addGetItem(tableObj,"��ʧӢ��",heroInfo,index);
		}
		
	}
}
//�Լ��Ƿ��ط�
function addDefeatGetItem(tableObj,index)
{
	var heroInfo = "";
	var iteminfo = "";
	if(typeof(oR.atAddedPrize)!='undefined')
	{
		for(var i=0;i<oR.atAddedPrize.length;i++)
		{
			if(oR.atAddedPrize[i].iHarvestType == 6)
			{
				//�ж�Ӣ���Ƿ��ڷǼ���״̬
				if(oR.atAddedPrize[i].iHarvestData != 4)
					heroInfo += oR.atAddedPrize[i].szRemark+" ";
				else if(oR.iWarResult == 1)
					heroInfo += oR.atAddedPrize[i].szRemark+"<span style='color:red'>(����Ӣ���Ѵ����޸�Ӣ�۱�ϵͳ��ʱ�洢���뾡����������Ӣ��)</span>";
				else
					heroInfo += oR.atAddedPrize[i].szRemark+" ";
			}
			if(oR.atAddedPrize[i].iHarvestType == 4)
			{
				var itemcfg = top.getItemConfig(oR.atAddedPrize[i].iHarvestID);
				if(itemcfg!=0)
						iteminfo += iteminfo+itemcfg.name+"��"+oR.atAddedPrize[i].iHarvestData+" ";
			}
		}
		if(heroInfo!="")
		{
			heroInfo = '<span class="topheroname">'+heroInfo+'</span>';
		}
		
	}
	//ʧ��
	if(oR.iWarResult == 0)
	{
		var resStr = getResourceInfo();
		if(resStr!="")
			addGetItem(tableObj,"��ʧ��Դ",resStr,index);
		//����Ƿ����ʧӢ�ۺͱ���
		if(heroInfo!="")
		{
			addGetItem(tableObj,"��ʧӢ��",heroInfo,index);
		}
		
		
	}
	//ʤ��
	else if(oR.iWarResult == 1)
	{
		var resStr = getResourceInfo();
		if(resStr!="")
			addGetItem(tableObj,"�����Դ",resStr,index);
		//����Ƿ���Ӣ�ۺͱ���
		//����Ƿ��õ���
		if(heroInfo!="")
		{
			addGetItem(tableObj,"��²Ӣ��",heroInfo,index);
		}
		if(iteminfo!="")
		{
			addGetItem(tableObj,"��õ���",iteminfo,index);
		}
	}
}
//�Լ������������������ʼ�ת��
function addUniteGetItem(tableObj,index)
{
	//ʧ��
	if(oR.iWarResult == 0)
	{
		//����Ƿ����ʧӢ�ۺͱ���
	}
	//ʤ��
	else if(oR.iWarResult == 1)
	{
		//nothing
	}
}
//�Լ��Ǿ���ת���Ľ�����
function addOtherGetItem(tableObj,index)
{
	var sName = "";
	if(oR.iWarResult == 0)
	{
	}
	else if(oR.iWarResult == 1)
	{
	}
	else
	{
		return ;
	}
	var resStr = getResourceInfo();
	if(resStr!="")
		addGetItem(tableObj,sName+"�����Դ",resStr,index);
	var heroInfo = "";
	var iteminfo = "";
	if(typeof(oR.atAddedPrize)!='undefined')
	{
		for(var i=0;i<oR.atAddedPrize.length;i++)
		{
			if(oR.atAddedPrize[i].iHarvestType == 6)
				heroInfo += oR.atAddedPrize[i].szRemark+" ";
			if(oR.atAddedPrize[i].iHarvestType == 4)
			{
				var itemcfg = top.getItemConfig(oR.atAddedPrize[i].iHarvestID);
				if(itemcfg!=0)
						iteminfo += iteminfo+itemcfg.name+"��"+oR.atAddedPrize[i].iHarvestData+" ";
			}
		}
		if(heroInfo!="")
		{
			heroInfo = '<span class="topheroname">'+heroInfo+'</span>';
		}
		
	}
	//����Ƿ���Ӣ�ۺͱ���
	//����Ƿ��õ�
	if(heroInfo!="")
	{
		addGetItem(tableObj,"��²Ӣ��",heroInfo,index);
	}
	if(iteminfo!="")
	{
		addGetItem(tableObj,"��õ���",iteminfo,index);
	}
}

//��ȡ����ͼƬ��url
function getArmyPicUrl(iType,maskArray)
{
	var arrPicUrl=[];
	var iStart0 = 39;//top.arm_start_arid;
	var iNum0 = 11;
	var iStart1 = 50;//top.arm_end_arid;
	var iNum1 = 9;
	if(iType == 0)
	{
		var iCount = 0;
		for(i =0;i<iNum0;i++)
		{
			var hintstr = mb.Buidings[iStart0+i].BuildingName;
			if((maskArray.length>i&&maskArray[i] == 0)||maskArray.length<=i)
				arrPicUrl[iCount++] = '<img  title="'+hintstr+'" src=\"../../images/army/bz'+(i+1)+'.png\" />';
			
		}
	}
	else
	{
		
		for(i = 0;i<iNum1;i++)
		{
			var hintstr = mb.Buidings[iStart1+i].BuildingName;
			arrPicUrl[i] = '<img title="'+hintstr+'" src="../../images/army/sz'+(i+1)+'.png" />'
		}
	}
	return arrPicUrl;
}

//��ȡ��ԴͼƬ
function getResPicUrl(strName,hintstr)
{
	var sUrl="";
	
	sUrl = '<img title="'+hintstr+'" src="../../images/army/'+strName+'.png" />';
	
	return sUrl;
}


//���ս���������Ϣ
function addBatArmyTableInfo(tableObj,dataObject,sTitle,sName,maskArray,fitObject,iNum,iType)
{
	//����
	var iNameWidth = 55;
	var iValuieWidth = 44;
	var outArray = getMaskArray(dataObject[0],maskArray);
	var injureArray = getMaskArray(dataObject[1],maskArray);
	var reliveArray = getMaskArray(dataObject[2],maskArray);
	//injureArray-reliveArray = diedArray
	var diedArray = getArrayMinus(injureArray,reliveArray);
	var picArrayUrl = getArmyPicUrl(iType,maskArray);

	addTableTitle(tableObj,sTitle,sName,iNum,55);
	addTableLineInfo(tableObj,"����",picArrayUrl,iNum,"-",iNameWidth,iValuieWidth);
	addTableLineInfo(tableObj,"����",outArray,iNum,"0",iNameWidth,iValuieWidth);
	addTableLineInfo(tableObj,"����",injureArray,iNum,"0",iNameWidth,iValuieWidth);
	addTableLineInfo(tableObj,"����",reliveArray,iNum,"0",iNameWidth,iValuieWidth);
	var tableRow = addTableLineInfo(tableObj,"����",diedArray,iNum,"0",iNameWidth,iValuieWidth);
	tableRow.className = "death";

	addFitToTable(tableObj,fitObject);
}
//���������ս����Ϣ
function addRandomArmyTableInfo(tableObj,dataObject,sName,maskArray,iNum)
{
	//����
	var iNameWidth = 55;
	var iValuieWidth = 44;
	var outArray = getMaskArray(dataObject[0],maskArray);
	var injureArray = getMaskArray(dataObject[1],maskArray);

	var picArrayUrl = getArmyPicUrl(1,maskArray);

	addTableTitle(tableObj,"",sName,iNum,55);
	addTableLineInfo(tableObj,"����",picArrayUrl,iNum,"-",iNameWidth,iValuieWidth);
	addTableLineInfo(tableObj,"����",outArray,iNum,"0",iNameWidth,iValuieWidth);
	var tableRow = addTableLineInfo(tableObj,"����",injureArray,iNum,"0",iNameWidth,iValuieWidth);
	tableRow.className = "death";
}

//�����������Ϣ���ܱ����Ϣ
function addAllUniteTableInfo(tableObj,dataObject,maskArray,iNum)
{
	var iNameWidth = 55;
	var iValuieWidth = 44;
	var iLen = dataObject.length;
	var armData = {"astArmyInfo":[{"ashArmy":[0,0,0,0,0,0,0,0,0,0,0,0,0]},
				{"ashArmy":[0,0,0,0,0,0,0,0,0,0,0,0,0]},
				{"ashArmy":[0,0,0,0,0,0,0,0,0,0,0,0,0]}]};
	var fitData =[0,0,0,0];
	for(i=0;i<iLen;i++)
	{
		for(j=0;j<iNum;j++)
		{
			armData.astArmyInfo[0].ashArmy[j] += getArrayValue(dataObject[i].astArmyInfo[0].ashArmy,j);
			armData.astArmyInfo[1].ashArmy[j] += getArrayValue(dataObject[i].astArmyInfo[1].ashArmy,j);
			armData.astArmyInfo[2].ashArmy[j] += getArrayValue(dataObject[i].astArmyInfo[2].ashArmy,j);
		}
		for(j=0;j<4;j++)
		{
			fitData[j] = fitData[j]+getArrayValue(oR.astUniteArmy[i].astOutfitInfo[1].achOutfit,j);
		}
	}

	var outArray = getMaskArray(armData.astArmyInfo[0].ashArmy,maskArray);
	var injureArray = getMaskArray(armData.astArmyInfo[1].ashArmy,maskArray);
	var reliveArray = getMaskArray(armData.astArmyInfo[2].ashArmy,maskArray);
	//injureArray-reliveArray = diedArray
	var diedArray = getArrayMinus(injureArray,reliveArray);
	
	var picArrayUrl = getArmyPicUrl(0,maskArray);
	var sHeroContent = getUniteHeroNumStr();
	//addTableLineInfo(tableObj,"����Ӣ��",sName,outArray.length);
	addTableTitle(tableObj,"����Ӣ��",sHeroContent,iNum,55);
	addTableLineInfo(tableObj,"��������",picArrayUrl,iNum,"-",iNameWidth,iValuieWidth);
	addTableLineInfo(tableObj,"����",outArray,iNum,"0",iNameWidth,iValuieWidth);
	addTableLineInfo(tableObj,"����",injureArray,iNum,"0",iNameWidth,iValuieWidth);
	addTableLineInfo(tableObj,"����",reliveArray,iNum,"0",iNameWidth,iValuieWidth);
	var tableRow = addTableLineInfo(tableObj,"����",diedArray,iNum,"0",iNameWidth,iValuieWidth);
	tableRow.className = "death";
	addFitToTable(tableObj,fitData);
	
}
//��ӷ��ط������Ϣ
function addDefeatTableInfo(tableObj,dataObject,sName,maskArray,fitObject,iNum)
{

	addBatArmyTableInfo(tableObj,dataObject,"���ط�",sName,maskArray,fitObject,iNum,0);
	addCityToTable(tableObj);
	addBuildToTable(tableObj);
	
}



function addAttackTableInfo(tableObj,dataObject,sName,maskArray,fitObject,iNum)
{
	addBatArmyTableInfo(tableObj,dataObject,"������",sName,maskArray,fitObject,iNum,0);
}

function addOneUniteTableInfo(tableObj,dataObject,sName,maskArray,fitObject,iNum)
{
	addBatArmyTableInfo(tableObj,dataObject,"������",sName,maskArray,fitObject,iNum,0);
}

//��ȡװ������
function getFitName(iIndex)
{
	var fitName;

	if(iIndex == 0)
		fitName = "��ͭ��";
	if(iIndex == 1)
		fitName = "������";
	if(iIndex == 2)
		fitName = "�ƽ��";
	if(iIndex == 3)
		fitName = "ʥ��";
	return fitName;
}
//���װ����Ϣ
function addFitToTable(tableObj,dataObject)
{
	var tableRow = tableObj.insertRow(-1);
	var tableNameTd = document.createElement('td');
	
	tableNameTd.innerHTML = "װ����ʧ";

	tableRow.appendChild(tableNameTd);
	
	var tableValueTd = document.createElement('td');
	tableValueTd.colSpan=11;
	tableValueTd.align="center";
	var sContent="";
	for(i=0;i<4;i++)
	{
	if(dataObject[i] != 0)
		sContent = sContent+getFitName(i)+" "+dataObject[i]+"��  ";
	}
	if(sContent == "")
		sContent = "��";
	tableValueTd.innerHTML = sContent;
	tableRow.appendChild(tableValueTd);
}
//���Ƿ���Ϣ
function addCityToTable(tableObj)
{
	var tableRow = tableObj.insertRow(-1);
	var tableNameTd = document.createElement('td');
	
	tableNameTd.innerHTML = "�Ƿ���ʧ";

	tableRow.appendChild(tableNameTd);
	
	var tableValueTd = document.createElement('td');
	tableValueTd.colSpan=11;
	var sContent=showLostFort();
	
	tableValueTd.innerHTML = sContent;
	tableRow.appendChild(tableValueTd);
	
	var secondRow = tableObj.insertRow(-1);
	tableValueTd = document.createElement('td');
	tableValueTd.colSpan=12;
	if(oR.CBillFortInfo.iSerStation <=0)
	{
		sContent ="û�й�����,�޷��ָ�"
	}
	else
		sContent = oR.CBillFortInfo.iSerStation+"�������� "+mbr.Buidingranks[17].rank[oR.CBillFortInfo.iSerStation-1].Data;
	tableValueTd.innerHTML = sContent;
	secondRow.appendChild(tableValueTd);
	
}
//�������Ϣ
function addBuildToTable(tableObj)
{
	var tableRow = tableObj.insertRow(-1);
	var tableNameTd = document.createElement('td');
	
	tableNameTd.innerHTML = "������ʧ";

	tableRow.appendChild(tableNameTd);
	
	var tableValueTd = document.createElement('td');
	tableValueTd.colSpan=11;
	var sContent="����A������->������    ����A������->������    ����A������->������";
	
	tableValueTd.innerHTML = sContent;
	tableRow.appendChild(tableValueTd);
}

//��ȡ���ط���װ����Ϣ
function getachOutfit( iType)
{
	if(getUserType()!= 2)
		return oR.astMainArmy[1].astOutfitInfo[1].achOutfit[iType];
	else
		return oR.astUniteArmy[0].astOutfitInfo[1].achOutfit[iType];
}
//��ǰʱ���ַ���
function getTimeStr()
{
	var str;
	var starttimeL = new Date();
	starttimeL.setTime(oR.iTime*1000);
	str = starttimeL.toLocaleString()
	return str;
}

//��ȡ������Ʒ����������
function getObjectTypeName(iType)
{
	var sNames= ["δ֪��Ʒ","���","��Դ","����","����","����","Ӣ��"];
	if(iType>6)
		return "δ֪��Ʒ";
	return sNames[iType];
}

function getObjectPicStr(iType,id,iData,szRemark)
{
	var sPicStr = "";
	if(iType ==1)
	{
		sPicStr = getResPicUrl("jb","���")+iData;
	}
	else if(iType ==2)
	{
		var sData = [];
		sData[0] = sData[1] = sData[2] = sData[3] = iData;
		sPicStr = getResource(sData);
	}
	else if(iType == 4)
	{
		var itemcfg = top.getItemConfig(id);
		if(itemcfg!=0)
			sPicStr = sPicStr+itemcfg.name+"��"+iData;
	}
	else if(iType == 5)
	{
		sPicStr = getResPicUrl("bw","����")+szRemark;
		//״̬Ϊ��ʱ������
		if(iData == 3)
		{
			sPicStr = sPicStr+"<span style='color:red'>(���б����Ѵ����޸ñ��ﱻϵͳ��ʱ�洢���뾡���������б���)</span>";
		}
	}
	else if(iType==6)
	{
		sPicStr = getResPicUrl("hero","Ӣ��")+szRemark;
		//״̬Ϊ��ʱ��Ӣ��
		if(iData == 4)
		{
			sPicStr = sPicStr+"<span style='color:red'>(����Ӣ���Ѵ����޸�Ӣ�۱�ϵͳ��ʱ�洢���뾡����������Ӣ��)</span>";
		}
	}
	else if(iType==3)
	{
		sPicStr = sPicStr+top.toMaterilName(id)+"��"+iData;
	}
	else
	{
		sPicStr = sPicStr+iData;
	}
	return sPicStr;
}

//��ӵ�����Ʒ��
function addLostObjectToTable(tableObj,dataObject,index)
{
	var tableRow = tableObj.insertRow(index);
	var tableNameTd = document.createElement('td');
	var sName = getObjectTypeName(dataObject.iHarvestType);

	tableNameTd.innerHTML = "���"+sName+": "+getObjectPicStr(dataObject.iHarvestType,dataObject.iHarvestID,dataObject.iHarvestData,dataObject.szRemark);
	

	tableRow.appendChild(tableNameTd);
}

//�����������еĵ�����Ʒ��
function addAllLostObject(tableObj,dataObject,index)
{
	for(i=0;i<dataObject.length;i++)
	{
		addLostObjectToTable(tableObj,dataObject[i],index);
	}
}

function addRandomItemsToTable(tableObj)
{
	var iIndex = -1; //getTableNameIndex(tableObj,"LostFlagStart");
	addAllLostObject(tableObj,oR.atPayPrize,iIndex);
}


function showMapTab(iCityGrid)
{
	top.ShowTab('citymap',2);
	top.objFlashEng.Send(top.GetWorldMap(iCityGrid));
}

function getNickNameStr(cityInfo)
{
	var shtml = '<img align="absmiddle"  src="/images/mail_armymailicon.gif" class="imghand" onclick = "top.gotoSendMail(\''+cityInfo.szNick+'\')"/>';
	return '<span class="playername" onclick = "top.GetOtherPlayerInfo('+cityInfo.iUin+')">'+cityInfo.szNick+'</span>'+shtml;
}

function getStyleNickName(szNick,iUin)
{
	var shtml = '<img align="absmiddle"  src="/images/mail_armymailicon.gif" class="imghand" onclick = "top.gotoSendMail(\''+szNick+'\')"/>';
	return '<span class="playername" onclick = "top.GetOtherPlayerInfo('+iUin+')">'+szNick+'</span>'+shtml;
}

function getUniteNameStr(index)
{
	var shtml = '<img align="absmiddle"  src="/images/mail_armymailicon.gif" class="imghand" onclick = "top.gotoSendMail(\''+cityInfo.szNick+'\')"/>';
	return '<span class="playername" onclick = "top.GetOtherPlayerInfo('+oR.astUniteArmy[index].iMasterUin+')">'+oR.astUniteArmy[index].szMasterNick+'</span>'+shtml;
}

function getCityNameStr(cityInfo)
{
	return '<span class="cityname" onclick = "showMapTab('+cityInfo.iCityGrid+')">'+cityInfo.szCityName+getCityPivot(cityInfo.iCityGrid)+'</span>';
}

function getCityStyleName(iCrid,szCityName)
{
	return '<span class="cityname" onclick = "showMapTab('+iCrid+')">'+szCityName+getCityPivot(iCrid)+'</span>';
}

function getResultNameStr(cityInfo)
{
	return '<span class="result">'+getNickNameStr(cityInfo)+'</span>';	
}

function getWarResultStr()
{
	var result;
	if(oR.iWarResult ==0) result=getResultNameStr(oR.astCityInfo[0]) + " ʤ";
	if(oR.iWarResult ==1) result=getResultNameStr(oR.astCityInfo[1]) + " ʤ";
	if(oR.iWarResult ==2) result="ƽ��";
	return result;
}

//�������
function outPutTitle()
{
	var userType = getUserType();
	var sTitle;
	if(userType == 0 || userType == 3)
	{
		var result;
		if(oR.iWarResult ==0) result="��ʤ���顣";
		if(oR.iWarResult ==1) result="ʧ�ܶ��ء�";
		if(oR.iWarResult ==2) result="ƽ���ճ���";
		sTitle =getNickNameStr(oR.astCityInfo[0])+"�Ĳ��Ӷ�" +
				getNickNameStr(oR.astCityInfo[1])+"��"+getCityNameStr(oR.astCityInfo[1])+
				"�Ƿ��𹥻��ж���"+result;
	}
	else if(userType == 1)
	{
		if(oR.iWarResult ==0) result="����ʧ�ܡ�";
		if(oR.iWarResult ==1) result="���سɹ���";
		if(oR.iWarResult ==2) result="ƽ���ճ���";
		sTitle =getNickNameStr(oR.astCityInfo[1])+"��" +getCityNameStr(oR.astCityInfo[1])+
				"���ܵ�"+getNickNameStr(oR.astCityInfo[0])+
				"ǰ����Ϯ����"+result;
	}
	else if(userType == 2)
	{
		//�ǳƣ�û�д�����������qq��
		sTitle =getUniteNameStr(0)+"��"+getCityNameStr(oR.astCityInfo[1])+"�ǵĲ������ܹ�����";
	}
	return sTitle;
}

//��ȡ������������
function getUniteName()
{
	if(getUserType()!= 2)
		return "������";
	else 
		return getUniteNameStr(0);
}


//��ȡ������Ϣ��0 ��������1���ط�
function getCityInfo(iType)
{
 	var sName="";
	if(iType ==0 || iType ==1)
	{
		sName = getNickNameStr(oR.astCityInfo[iType])+"Ͻ�µ�"+getCityNameStr(oR.astCityInfo[iType])+"��";
	}
	
	return sName;
}



//iType = 0 ���� ;iType=1 ����
function buildAddTable(tableobj,astCityInfo,armyinfo,iType)
{
	var iNameWidth = 165;
	var iValuieWidth = 80;
	var sName=[];
	var iCount = 0;
	for(i = 0;i<armyinfo.length;i++)
	{
		if(iType == 0)
			sName[i] = getNickNameStr(oR.astCityInfo[i]);
		//�ǳƣ�û�д�����������qq��
		else
		{
			sName[i] = getUniteNameStr(i);
		}
		if(countAttributeNotZero(armyinfo[i].ashAttribute) != 0)
		{
			iCount++;
		}
	}
	if(iCount == 0)
		return;
	addTableLineInfo(tableobj,"�������",sName,sName.length,"",iNameWidth,iValuieWidth);
	
	var sValue = ["-","-"];
	//addTableLineInfo(tableobj,"�佫�Թ������ӳɣ�",sValue,armyinfo.length,"-",iNameWidth,iValuieWidth);
	//addTableLineInfo(tableobj,"������ԶԹ������ӳ�:",sValue,armyinfo.length,"-",iNameWidth,iValuieWidth);
	addItemToAddTable(tableobj,1,"�Ƽ������У���ս�����ӳɣ�",armyinfo,iNameWidth,iValuieWidth);
	addItemToAddTable(tableobj,2,"�Ƽ����������ս�����ӳɣ�",armyinfo,iNameWidth,iValuieWidth);
	addItemToAddTable(tableobj,3,"�Ƽ������ף��Է������ӳɣ�",armyinfo,iNameWidth,iValuieWidth);
	addItemToAddTable(tableobj,4,"�Ƽ������ǣ��ԳǷ��ӳ�",armyinfo,iNameWidth,iValuieWidth);
	addItemToAddTable(tableobj,6,"����Խ�ս�����ӳɣ�",armyinfo,iNameWidth,iValuieWidth);
	addItemToAddTable(tableobj,7,"�����Զ�̹����ӳɣ�",armyinfo,iNameWidth,iValuieWidth);
	addItemToAddTable(tableobj,8,"����Է������ӳɣ�",armyinfo,iNameWidth,iValuieWidth);	
	addItemToAddTable(tableobj,11,"����Թ������Լӳɣ�",armyinfo,iNameWidth,iValuieWidth);	
	addItemToAddTable(tableobj,12,"����Է������Լӳɣ�",armyinfo,iNameWidth,iValuieWidth);	
	addItemToAddTable(tableobj,13,"���ԶԹ������Լӳɣ�",armyinfo,iNameWidth,iValuieWidth);	
	addItemToAddTable(tableobj,14,"��躶Է������Լӳɣ�",armyinfo,iNameWidth,iValuieWidth);	
}

function addItemToAddTable(tableobj,index,name,armyinfo,iNameWidth,iValueWidth)
{
	var attributeValue=[];
	var iCount = 0;
	for(i=0;i< armyinfo.length;i++)
	{
		if(armyinfo[i].ashAttribute.length<index+1)
			attributeValue[i] = "-";
		else
		{
			if(armyinfo[i].ashAttribute[index] == 0)
				attributeValue[i] = "-";
			else
			{
				attributeValue[i]= (armyinfo[i].ashAttribute[index]/10)+"%";
				iCount++;
			}
		}
	}
	if(iCount!=0)
		addTableLineInfo(tableobj,name,attributeValue,armyinfo.length,"-",iNameWidth,iValueWidth);
}


//��ȡ�����ַ���
function getCityPivot(sGriID,iNum)
{
	if(sGriID.length<iNum)
	  alert("city : "+sGriID+" not valid" );
	var sID = sGriID.toString();
	var xPos = (sGriID-sGriID%1000)/1000;
	var yPos = sGriID%1000;
	var sPovit = "("+xPos+","+yPos+")";
	
	return sPovit;
	 
}

//
function getResource(obj)
{
	var str = getResPicUrl("ls","��ʳ")+" "+obj[0]+"  "+getResPicUrl("mt","ľͷ")+" "+obj[1]+"  "+getResPicUrl("tk","����")+" "+obj[2]+"  "+getResPicUrl("sl","ʯ��")+" "+obj[3];
	return str;
}


function getWarResultInfo()
{
	var sInfo="";
	if(getUserType() != 2)
	{
		if(oR.iWarResult ==0) sInfo = getResultNameStr(oR.astCityInfo[0])+"ʤ";
		if(oR.iWarResult ==1) sInfo = getResultNameStr(oR.astCityInfo[1])+"ʤ";
		if(oR.iWarResult ==2) sInfo = "ƽ��";
	}
	return sInfo;
}
function getResourceInfo()
{
	var sInfo = "";
	var iCount = 0;
	for(i=0;i<oR.atPayPrize.length;i++)
		iCount= iCount+oR.atPayPrize[i];
	if(iCount == 0)
		return sInfo;
		
	if(getUserType() != 2) 
	{
		sInfo = getResource(oR.atPayPrize);//getResPicUrl("ls","��ʳ")+" "+oR.atPayPrize[0]+"  "+getResPicUrl("mt","ľͷ")+" "+oR.atPayPrize[1]+"  "+getResPicUrl("tk","����")+" "+oR.atPayPrize[2]+"  "+getResPicUrl("sl","ʯ��")+" "+oR.atPayPrize[3];
	}
	return sInfo;
}



//��ȡ���������Ϣ
function getItemInfo()
{
	var sInfo = "";
	return sInfo;
}

//��ȡս����Ϣ
function getPowerInfo(iType)
{
	var sInfo = "";
	if(getUserType() != 2)
	{ 
		if(iType == 0)
		{
			sInfo = sInfo+oR.iInvaderValue;
		}
		else if(iType == 1)
		{
			sInfo = sInfo+oR.iTargetValue;
		}
	}
	return sInfo;
	
}

function addAttackPowerInfo(tableObj)
{

	var tableRow = tableObj.insertRow(-1);
	var tableValueTd = document.createElement('td');
	var itemName = '<span class="power">����ս��:' + getPowerInfo(0);
	var ItemValue = "   ������ʧ:" + getTotalLostInfo(0);
	tableValueTd.innerHTML = itemName+ItemValue;
	tableRow.appendChild(tableValueTd);
	tableRow = tableObj.insertRow(-1);
	
	tableValueTd = document.createElement('td');
	itemName = '<span class="power">�ط�ս��:' + getPowerInfo(1);
	ItemValue = "   �ط���ʧ:" + getTotalLostInfo(1);
	tableValueTd.innerHTML = itemName+ItemValue;
	tableRow.appendChild(tableValueTd);
	
}

//��ʾ����������Ϣ
function showAttackTableInfo()
{
	var maskArray = [0,0,1,1];
	var astArmy = [];
	if(getUserType() != 2)
	{
		$("attack_info").style.display="block";
		if(oR.astMainArmy.length == 0)
			return;
		astArmy[0] = oR.astMainArmy[0].astArmyInfo[0].ashArmy;
		astArmy[1] = oR.astMainArmy[0].astArmyInfo[1].ashArmy;
		astArmy[2] = oR.astMainArmy[0].astArmyInfo[2].ashArmy;
		addAttackTableInfo($("attack_info"),astArmy,getCityInfo(0),maskArray,oR.astMainArmy[0].astOutfitInfo[1].achOutfit,9);
	}
}
//����㹥������Ϣ
function showRandomAttackInfo()
{
	var maskArray = [0,0,1,1];
	var astArmy = [];
	if(oR.astMainArmy.length == 0)
			return;
	$("attack_info").style.display="block";
	astArmy[0] = oR.astMainArmy[0].astArmyInfo[0].ashArmy;
	astArmy[1] = oR.astMainArmy[0].astArmyInfo[1].ashArmy;
	astArmy[2] = oR.astMainArmy[0].astArmyInfo[2].ashArmy;
	addAttackTableInfo($("attack_info"),astArmy,getRandomCityInfo(0),maskArray,oR.astMainArmy[0].astOutfitInfo[1].achOutfit,9);
}
//��ʾ����������Ϣ
function showUniteTableInfo()
{
	var maskArray = [0];
	var astArmy = [];
	$("unite_info").style.display="block";
	if(getUserType() == 2)
	{
		if(oR.astUniteArmy.length>0)
		{
			astArmy[0] = oR.astUniteArmy[0].astArmyInfo[0].ashArmy;
			astArmy[1] = oR.astUniteArmy[0].astArmyInfo[1].ashArmy;
			astArmy[2] = oR.astUniteArmy[0].astArmyInfo[2].ashArmy;
			var sName = getStyleStr(getUniteName(),"randomname");
			addOneUniteTableInfo($("unite_info"),astArmy,
					sName,maskArray,oR.astUniteArmy[0].astOutfitInfo[1].achOutfit,11);
		}
	}
	else if(oR.astUniteArmy.length>0) addAllUniteTableInfo($("unite_info"),oR.astUniteArmy,		                           maskArray,11);
	else $("unite_info").style.display="none";
	
}
//��ʾ����������Ϣ
function showDefeadTableInfo()
{
	var maskArray = [0];
	var astArmy = [];
	if(getUserType() != 2)
	{
		$("defeat_info").style.display= "block"
		if(oR.astMainArmy.length <= 1)
				return;
		astArmy[0] = oR.astMainArmy[1].astArmyInfo[0].ashArmy;
		astArmy[1] = oR.astMainArmy[1].astArmyInfo[1].ashArmy;
		astArmy[2] = oR.astMainArmy[1].astArmyInfo[2].ashArmy;
		addDefeatTableInfo($("defeat_info"),astArmy,getCityInfo(1),maskArray,oR.astMainArmy[1].astOutfitInfo[1].achOutfit,11);
	}
}

//����������Ϣ
function showDefeadRandomInfo()
{
	var maskArray = [0];
	var astArmy = [];
	if(oR.astMainArmy.length <= 1)
				return;
	$("defeat_info").style.display= "block";
	astArmy[0] = oR.astMainArmy[1].astArmyInfo[0].ashArmy;
	astArmy[1] = oR.astMainArmy[1].astArmyInfo[1].ashArmy;
	astArmy[2] = oR.astMainArmy[1].astArmyInfo[2].ashArmy;
	var sRandomName = getStyleStr("�ݵ�"+getCityPivot(oR.iRandomPlace),"randomname");
	addRandomArmyTableInfo($("defeat_info"),astArmy,sRandomName,maskArray,9);	
}
//��Ӳ���������Ϣ
function addArmyInfo(tableObj,stArmy,Name,Num)
{

	var maskArray = [0];
	var picArrayUrl = getArmyPicUrl(0,maskArray);
	var iNameWidth = 55;
	var iValuieWidth = 44;
	
	//addTableTitle(tableObj,"������",sName,outArray.length);
	addTableLineInfo(tableObj,"����",picArrayUrl,Num,"-",iNameWidth,iValuieWidth);
	addTableLineInfo(tableObj,Name,stArmy,Num,"0",iNameWidth,iValuieWidth);
}

//��ʾ�ӳ���Ϣ
function showAddTableInfo()
{
	$("addValueTable").style.display= "block"
	if(getUserType() == 2)
	{
		buildAddTable($("addValueTable"),oR.astCityInfo,oR.astUniteArmy,1)
	}
	else 
	{
		buildAddTable($("addValueTable"),oR.astCityInfo,oR.astMainArmy,0);
	}
}

//for attack
////////////////////////////////////////////////////////

function getAttackBackTitle()
{
	var sTitle = "";
	var sAction = "����"
	
	sTitle =getNickNameStr(oR.astCityInfo[0])+"Ͻ�µ�"+getCityNameStr(oR.astCityInfo[0])+"�Ƕ�" +
				getNickNameStr(oR.astCityInfo[1])+"��"+getCityNameStr(oR.astCityInfo[1])+
				"�ǽ����Ĳ�����";
	if(oR.iWarResult == 4 )
	{
		sAction = "�ٻ�"
	}
	sTitle = sTitle+sAction;
	return sTitle;
	
}
function getAttackNoActionTitle()
{
	var sName = "";
	sName = "����ʧ��,Ŀ��������Ѿ��ı�,���ӿ�ʼ����";
	
	return sName;
}
////////////////////////////////////////////////////////////////////////

//for exploit 
//
//��ȡexploit�� title
function getExploitTitle()
{
	var sTitle = "";
	if(oR.iWarResult == 0)
	{
		sTitle = getNickNameStr(oR.CCitySumInfo)+"�ɹ��ڻĵ�"+
				getCityPivot(oR.astNewCityInfo[0].iNewCityGridID,3)+"�������³�";
	}
	else
	{
		sTitle = getNickNameStr(oR.CCitySumInfo)+"�ڻĵ�"+
				getCityPivot(oR.astNewCityInfo[0].iNewCityGridID,3)+"�����³ǵ��ػ��ж�ʧ��";
	}
	return sTitle;
}

function getExploiter()
{
	return getNickNameStr(oR.CCitySumInfo)+"Ͻ�µ�" + getCityNameStr(oR.CCitySumInfo)+"��";
}
//��ȡ�³�����
function addNewCityName(tableObj)
{
	if(oR.iWarResult == 0)
	{
		var tableRow = tableObj.insertRow(-1);
		var tableNameTd = document.createElement('td');
		tableNameTd.colspan = 2;
		tableNameTd.innerHTML = "�³�����"+getCityStyleName(oR.astNewCityInfo[0].iNewCityGridID,oR.astNewCityInfo[0].szCityName)+"��";
		tableRow.appendChild(tableNameTd);
	}
}

function getExploitBackTitle()
{
	var sTitle = "";
	
	sTitle = getNickNameStr(oR.CCitySumInfo)+"ȥ�ĵ�"+
				getCityPivot(oR.astNewCityInfo[0].iNewCityGridID,3)+"�ػĵĲ�����";
	
	var sInfo = "����.";
	if(oR.iWarResult == 4)
	{
		sInfo = "�ٻ�."
	}
	return sTitle+sInfo;
}
//////////////////////////////////////

function getStyleStr(str,style)
{
	return '<span class="'+style+'">'+str+'</span>';
}


//////////////
//for random
//�������

//��ȡ���������ĳ�����Ϣ��0 ��������1���ط�
function getRandomCityInfo(iType)
{
 	var sName="";
	if(iType ==0 )
	{
		sName = getNickNameStr(oR.CCitySumInfo)+"Ͻ�µ�"+getCityNameStr(oR.CCitySumInfo)+"��";
	}
	else
	{
		var sRandomName = "�ݵ�"+getCityPivot(oR.iRandomPlace);
		sName= getStyleStr(sRandomName,"randomname");
	}
	
	return sName;
}

function outPutRandomTitle()
{
	var sTitle;
	
	var result;
	if(oR.iWarResult ==0) result="��ʤ���顣";
	if(oR.iWarResult ==1) result="ʧ�ܶ��ء�";
	if(oR.iWarResult ==2) result="ƽ���ճ���";
	var sRandomName = "�ݵ�"+getCityPivot(oR.iRandomPlace);
	sTitle =getNickNameStr(oR.CCitySumInfo)+"�Ĳ��Ӷ�" +
			getStyleStr(sRandomName,"randomname")+
			"��������ж���"+result;

	return sTitle;
}




function getRandomWarResultInfo()
{
	var sInfo="";
	var sRandomName = getStyleStr("�ݵ�"+getCityPivot(oR.iRandomPlace),"randomname");
	if(oR.iWarResult ==0) sInfo = getResultNameStr(oR.CCitySumInfo)+"ʤ";
	if(oR.iWarResult ==1) sInfo = getStyleStr(sRandomName,"result")+"ʤ";
	if(oR.iWarResult ==2) sInfo = "ƽ��";
	
	return sInfo;
}

function getRandomBackTitle()
{
	var sTitle = "";
	var sAction = "����"
	var sRandomName = "�ݵ�"+getCityPivot(oR.iRandomPlace);
	
	sTitle =getNickNameStr(oR.CCitySumInfo)+"Ͻ�µ�"+getCityNameStr(oR.CCitySumInfo)+"�Ƕ�" +
				getStyleStr(sRandomName,"randomname")+
				"�����Ĳ�����";
	if(oR.iWarResult == 4 )
	{
		sAction = "�ٻ�"
	}
	sTitle = sTitle+sAction;
	return sTitle;
	
}

function getRandomNoActionTitle()
{
	var sName = "";
	sName = "����ʧ��,Ŀ��ݵ��Ѿ���ʧ,���ӿ�ʼ����";
	
	return sName;
}
/////////////////////////////////////////////////////////////////
//for redeploy

//�������
function getDeployTitle()
{
	var sName = "";
	sName = getNickNameStr(oR.astCityInfo[0])+"��"+getCityNameStr(oR.astCityInfo[0])+"����פ"+
	getCityNameStr(oR.astCityInfo[1])+"�ǵĲ����Ѱ�ȫ���";
	return sName;
}

function getDeployBackTitle()
{
	var sName = "";
	sName = getNickNameStr(oR.astCityInfo[0])+"��"+
	getCityNameStr(oR.astCityInfo[0])+"����פ"+
	getCityNameStr(oR.astCityInfo[1])+"�ǵĲ����ѱ��ٻء�";
	return sName;
}

function getDeployNoActionTitle()
{
	var sName = "";
	sName = "��פʧ��,Ŀ��ǵ������Ѿ��ı�,���ӿ�ʼ����";
	
	return sName;
}
//��ȡ������Ϣ��0 ��������1���ط�
function getDeployCityInfo(iType)
{
	return getCityNameStr(oR.astCityInfo[iType])+"��";
}
////////////////////////////////////////////////////////////////

/////////////
//for spy
//���ժҪ��Ϣ
function outputSpySumary(Obj)
{
	var sResult;
	if(Obj.iWarResult == 0)
	{
		sResult = getNickNameStr(Obj.astCityInfo[0])+"����鲿�ӳɹ����"+
				getNickNameStr(Obj.astCityInfo[1])+"��"+getCityNameStr(Obj.astCityInfo[1])+"�ǣ�";
	}
	else if(Obj.iWarResult == 1)
	{
		sResult = getNickNameStr(Obj.astCityInfo[0])+"����鲿�����"+
		getNickNameStr(Obj.astCityInfo[1])+"��"+getCityNameStr(Obj.astCityInfo[1])+"��ʧ��";
	}
	else
	{
		sResult = getNickNameStr(Obj.astCityInfo[0])+"����鲿�Ӷ�"+
		getNickNameStr(Obj.astCityInfo[1])+"��"+getCityNameStr(Obj.astCityInfo[1])+"�ǵ����δ����";
	}
	return sResult;
}
//��������Ϣ
function outputSpyResult(Obj)
{
	var sResult;
	if(Obj.iWarResult == 0)
	{
		if(Obj.iGraspValue == 1000)
		{
			sResult = "�ɹ�(�������)";
		}
		else
		{
			sResult = "�ɹ�";
		}
	}
	else if(Obj.iWarResult == 1)
		sResult = "ʧ��";
	else
		sResult = "���δ����";
	return sResult;
	
}

function outputSpyInfoSummary(Obj)
{
	var sResProdect;
	var sResTotal;
	sResTotal = "��Դ������"+getResPicUrl("mt","ľͷ")+Obj.stSpyCity[0].atResPer[1]+
				"/Сʱ "+getResPicUrl("tk","����")+Obj.stSpyCity[0].atResPer[2]+
				"/Сʱ "+getResPicUrl("sl","ʯ��")+Obj.stSpyCity[0].atResPer[3]+
				"/Сʱ "+getResPicUrl("ls","��ʳ")+Obj.stSpyCity[0].atResPer[0]+"/Сʱ";
	sResProdect = "��Դ��棺"+getResPicUrl("mt","ľͷ")+Obj.stSpyCity[0].atResCount[1]+
					"��"+getResPicUrl("tk","����")+Obj.stSpyCity[0].atResCount[2]+
					"��"+getResPicUrl("sl","ʯ��")+Obj.stSpyCity[0].atResCount[3]+
					"��"+getResPicUrl("ls","��ʳ")+Obj.stSpyCity[0].atResCount[0];
					
	var Row1 = $("summary_tab").insertRow(-1);
	var Row2 = $("summary_tab").insertRow(-1);
	var totalTD = document.createElement('td');

	totalTD.innerHTML=sResTotal;
	var prodectTD = document.createElement('td');

	prodectTD.innerHTML=sResProdect;
	Row1.appendChild(prodectTD);
	Row2.appendChild(totalTD);
}



function getStartIndex(iType)
{
	var startIndex = -1;
	for(var i=0;i<mb.Buidings.length;i++)
	{
		if(mb.Buidings[i].BuildingType == iType)
		{
			if(startIndex == -1)
				startIndex = i;
		}
		
	}
	return startIndex;
}
function getMbItemNum(iIndex,iType)
{
	if(iType == 4)
		return 11;
	var startIndex;
	var endIndex = -1;
	startIndex = -1;
	for(var i=iIndex;i<mb.Buidings.length;i++)
	{
		if(mb.Buidings[i].BuildingType == iType)
		{
			if(startIndex == -1)
				startIndex = i;
		}
		else if(mb.Buidings[i].BuildingType > iType)
		{
			endIndex = i;
			break;
		}
		if(i==mb.Buidings.length-1)
			endIndex = mb.Buidings.length;
		
	}
	return endIndex-startIndex;
	
}

function getInfoTypeStr(iType)
{
	if(iType>4)
		return "";
	var sValue = ["","������Ϣ","�Ƽ���Ϣ","�Ƿ���Ϣ","������Ϣ"];
	return sValue[iType];
}

function addSpyTableInfo(table,sValues,iType,lineNum,sTiTleStyleName)
{
	if(iType<1||iType>4 )
		return;
	var endStr;
	if(iType == 1 || iType == 2)
		endStr = "��";
	else 
		endStr = "��";
		
	var startIndex =getStartIndex(iType);
	var iLen = getMbItemNum(startIndex,iType);
	
	if(startIndex == -1)
	{
		alert(iType +"not find");
	}
	var titleRow = addTableTitle(table,"",getInfoTypeStr(iType),lineNum-1,20);
	titleRow.cells[0].className = sTiTleStyleName;
	var tableValueRow;
	var tableNameRow;
	var  iDataLine = 0;
	for(var i=0;i<iLen;i++)
	{
		if(i%lineNum == 0)
		{
			//�м��һ������
			if(i!=0)
			{
				var tableRow = table.insertRow(-1);
				var tableBlankTd = document.createElement('td');
				tableBlankTd.height = "12";
				tableBlankTd.colSpan = lineNum;
				tableRow.appendChild(tableBlankTd);
			}
			tableNameRow = table.insertRow(-1);
			tableValueRow = table.insertRow(-1);
			iDataLine++;
			
		}
		var tableNameTd = document.createElement('td');
		tableNameTd.style.fontWeight = "bold"
		var tableValueTd = document.createElement('td');
		tableNameTd.innerHTML = mb.Buidings[startIndex+i].BuildingName;
		if(sValues.length<=i || sValues[i]==0)
			tableValueTd.innerHTML ="-";
		else
			tableValueTd.innerHTML = sValues[i]+endStr;
		tableNameRow.appendChild(tableNameTd);
		tableValueRow.appendChild(tableValueTd);
	}
	var leftBank = lineNum*iDataLine-iLen;
	if(iDataLine>1)
	{
		for(j=0;j<leftBank;j++)
		{
			var tableNameTd = document.createElement('td');
			//tableNameTd.style.fontWeight = "bold"
			var tableValueTd = document.createElement('td');
			tableNameRow.appendChild(tableNameTd);
			tableValueRow.appendChild(tableValueTd);
		}
	}
}


function showSpyInfo()
{
	if(oR.iWarResult == 0)
	{
		$("total_info").style.display="block"
		outputSpyInfoSummary(oR);
		addSpyTableInfo($("armyInfo"),oR.stSpyCity[0].CCityArmy.ashArmy,4,11,"info_title");
		addSpyTableInfo($("FortInfo"),oR.stSpyCity[0].CCityFort.ashFort,3,10,"info_title");
		addSpyTableInfo($("cityInfo"),oR.stSpyCity[0].CCityItem.achItem,1,10,"info_title");					    	addSpyTableInfo($("techInfo"),oR.stSpyCity[0].CPlayerTech.achTech,2,10,"info_title");
	}
	
	
}

function getSpyBackTitle()
{
	var sName = "";
	sName =getNickNameStr(oR.astCityInfo[0])+"��"+
	getCityNameStr(oR.astCityInfo[0])+"������"+getNickNameStr(oR.astCityInfo[1])+"��"+
	getCityNameStr(oR.astCityInfo[1])+"�ǵ���鲿����";
	var sInfo = "����.";
	if(oR.iWarResult == 4)
	{
		sInfo = "�ٻ�."
	}
	return sName+sInfo;
}
function getSpyNoActionTitle()
{
	var sName = "";
	sName = "��̽ʧ��,Ŀ��ǵ������Ѿ��ı�,���ӿ�ʼ����";
	
	return sName;
}


//////////////////////////////////
//js  fpr transform
function getTransFormTitle()
{
	var sName = "";
	sName = getNickNameStr(oR.astCityInfo[0])+"��"+
	getCityNameStr(oR.astCityInfo[0])+"������"+getNickNameStr(oR.astCityInfo[1])+"��"+
	getCityNameStr(oR.astCityInfo[1])+"�ǵĲ����Ѱ�ȫ���";
	return sName;
}


function getTransBackTitle()
{
	var sName = "";
	sName = getNickNameStr(oR.astCityInfo[0])+"��"+
	getCityNameStr(oR.astCityInfo[0])+"������"+getNickNameStr(oR.astCityInfo[1])+"��"+
	getCityNameStr(oR.astCityInfo[1])+"�ǵ����䲿����";
	var sInfo = "����.";
	if(oR.iWarResult == 4)
	{
		sInfo = "�ٻ�."
	}
	return sName+sInfo;
}

function getTransNoActionTitle()
{
	var sName = "";
	sName = "����ʧ��,Ŀ��ǵ������Ѿ��ı�,���ӿ�ʼ����";
	
	return sName;
}
//
///////// for unite
//js 
function getUniteTitle()
{
	var sName = "";
	sName = getNickNameStr(oR.astCityInfo[0])+"��"+
	getCityNameStr(oR.astCityInfo[0])+"������"+getNickNameStr(oR.astCityInfo[1])+"��"+
	getCityNameStr(oR.astCityInfo[1])+"�ǵĲ����Ѱ�ȫ���";
	return sName;
}

function getFitInfo(obj)
{
	return "��ͭ��"+obj[0]
	+"��������"+obj[1]
	+"���ƽ��"+obj[2]
	+"��ʥ��"+obj[3];
}

function getUniteBackTitle()
{
	var sName = "";
	sName = getNickNameStr(oR.astCityInfo[0])+"��"+
	getCityNameStr(oR.astCityInfo[0])+"������"+getNickNameStr(oR.astCityInfo[1])+"��"+
	getCityNameStr(oR.astCityInfo[1])+"�ǵĲ�����";
	var sInfo = "����.";
	if(oR.iWarResult == 4)
	{
		sInfo = "�ٻ�."
	}
	return sName+sInfo;
}

function getUniteNoActionTitle()
{
	var sName = "";
	sName = "����ʧ��,Ŀ��ǵ������Ѿ��ı�,���ӿ�ʼ����";
	
	return sName;
}

///////////////////

///// 
//��ȡ�������佫������Ϣ
//���ڹ������غ͹�������㷵��
function getAttHeroNamesStr(heroObject)
{
	
	if(typeof(heroObject) != 'undefined' && heroObject.length>0)
	{
		var Names="";
		for(var i=0;i<heroObject.length;i++)
		{
			Names+= heroObject[i].szName+" ";
			
		}
		return '<span class="topheroname">'+Names+'</span>';
	}
	return "��";
}

function getHeroNamesStr(heroNames)
{
	var Names= ""
	if(typeof(heroNames) != 'undefined')
	{
		for(var i=0;i<heroNames.length;i++)
		{
			Names+=heroNames[i]+" ";
		}
	}
	if(Names!="")
		return '<span class="topheroname">'+Names+'</span>';
	return "��"
}


function getHeroNumStr(iClass)
{
	if(iClass == 0)
	{
		return getAttHeroNumStr(oR.astMainArmy[0].stArmyHeroInfo);
	}
	else if(iClass == 1)
	{
		return getDefeatHeroNumStr(oR.astMainArmy[1].stArmyHeroInfo);
	}
	return "";
	
}


//��ȡ�������佫����Ŀ����ʧ��Ϣ
function getAttHeroNumStr(heroObject)
{
	var numStr = "0/0";
	if(typeof(heroObject) != 'undefined' && heroObject.length>0)
	{
		var iCount = 0;
		var totalCount = 0;
		for(var i=0;i<heroObject.length;i++)
		{
			if(heroObject[i].iHeroStat == 1)
				iCount++;
		}
		totalCount += heroObject.length;
		
		numStr = iCount+"/"+totalCount;
	}
	return numStr;
}
//��ȡ���ط��佫����Ŀ����ʧ��Ϣ
function getDefeatHeroNumStr(heroObject)
{
	var numStr = "0/0";
	if(typeof(heroObject) != 'undefined' && heroObject.length>=0)
	{
		var totalCount = heroObject.length;
		var iCount = 0;
		for(var i=0;i<heroObject.length;i++)
		{
			if(heroObject[i].iHeroStat == 1)
				iCount++;
		}
		if(typeof(oR.astUniteArmy)!='undefined')
		{

			if(oR.astUniteArmy.length>0)
			{
				for(var i=0;i<oR.astUniteArmy.length;i++)
				{

					if(typeof(oR.astUniteArmy[i].stArmyHeroInfo) != 'undefined')
					{
						for(var j=0;j<oR.astUniteArmy[i].stArmyHeroInfo.length;j++)
						{
							if(oR.astUniteArmy[i].stArmyHeroInfo[j].iHeroStat == 1)
								iCount++;
						}
						totalCount += oR.astUniteArmy[i].stArmyHeroInfo.length;
					}
					else if(typeof(oR.astUniteArmy[i].CUniteHeroSummry) != 'undefined')
					{
						totalCount += oR.astUniteArmy[i].CUniteHeroSummry.iHeroNum;
						iCount += oR.astUniteArmy[i].CUniteHeroSummry.iLostNum;
					}
				}
			}
			
		}
		numStr = iCount+"/"+totalCount;
	}
	return numStr;
}

function getUniteHeroNumStr()
{
	var Num=[0,0];
	if(typeof(oR.astUniteArmy)!='undefined')
	{

		if(oR.astUniteArmy.length>0)
		{
			for(var i=0;i<oR.astUniteArmy.length;i++)
			{

				if(typeof(oR.astUniteArmy[i].stArmyHeroInfo) != 'undefined')
				{
					for(var j=0;j<oR.astUniteArmy[i].stArmyHeroInfo.length;j++)
					{
						if(oR.astUniteArmy[i].stArmyHeroInfo[j].iHeroStat == 1)
							Num[1]++;
					}
					Num[0] += oR.astUniteArmy[i].stArmyHeroInfo.length;
				}
				else if(typeof(oR.astUniteArmy[i].CUniteHeroSummry) != 'undefined')
				{
					Num[0] += oR.astUniteArmy[i].CUniteHeroSummry.iHeroNum;
					Num[1] += oR.astUniteArmy[i].CUniteHeroSummry.iLostNum;
				}
			}
		}
		
	}
	return "��սӢ�ۣ�"+Num[0] + "  ��ʧ��"+Num[1];
}

//�佫��Ϣ��ʾ
function addHeroTableTitle(table,sName)
{
	var tableRow = table.insertRow(-1);
	var tableNameTd = document.createElement('th');

	tableNameTd.colSpan = 2;
	tableNameTd.align="center";
	
	tableNameTd.innerHTML = '<span class="playername">'+sName+'</span>��Ӣ��';

	tableRow.appendChild(tableNameTd);
}

//�佫��Ԫ����ʾ
function addHeroTableTd(tableRow,objectName,Name,
						sPicArray,hintArray,expValue,expItemFlag,strength,proFlag)
{
	var tableNameTd = document.createElement('td');
	tableNameTd.className = "self";
	if(Name == "" && objectName == "")
	{
		
	}
	else
	{

		var sExpItemStr = "";
		if(expItemFlag > 0)
		{
			//sExpItemStr = '<a href="../../shoptemplate/shop_func1.html">(˫������)</a>';
			sExpItemStr = '<span onclick="top.document.getElementById(\'shopdiv\').scr=\'../../shoptemplate/shop_func1.html\';top.ShowTab(\'shop\',6);" class="spanhand">(˫������)</span>';
		}
		var sProStr = '<div class="num"> </div>';
		if(proFlag==2)
		{
			sProStr = '<div class="num">��<span onclick="top.document.getElementById(\'shopdiv\').scr=\'../../shoptemplate/shop_func2.html\';top.ShowTab(\'shop\',6);" class="spanhand">�����</span>������Ч��Ӣ�۱�����ɹ�����</div>'+
			'</div>';
		}
		else if(proFlag==1)
		{
			sProStr = '<div class="num">��'+objectName+'��ҷ�²</div>';
		}
		var sPicStr=["../../images/blank.gif","../../images/blank.gif"];
		for(i=0;i<sPicArray.length;i++)
		{
			if(sPicArray[i]>0)
			{
				sPicStr[i] ='../../images/hero/trea_'+sPicArray[i]+'.gif'; 
			}
		}
		tableNameTd.innerHTML = '<td class="self"><div class="main">'+
			'<img hint = "'+hintArray[0]+'" src="../../images/army/hero.png" align="absmiddle" width="20" height="20">'+
			'<span class="heroname">'+Name+'</span>Я�����'+
			'<img hint = "'+hintArray[1]+'" src="'+sPicStr[0]+'" align="absmiddle" width="20" height="20"/>'+
			'<img hint = "'+hintArray[2]+'" src="'+sPicStr[1]+'" align="absmiddle" width="20" height="20"/></div>'+'<div class="info">'+
			'<div class="num"><span class="exp">����ֵ��</span>+'+expValue+sExpItemStr+'</div>'+
			'<div class="num"><span class="hp">����ֵ��</span>-'+strength+'</div>'+sProStr+'</td>';
	}

	tableRow.appendChild(tableNameTd);
}

//��ȡӢ��tips������
function getHeroHint(hero)
{
	var porpertyValue="";
	porpertyValue += "Ӣ�ۼ���" +":" +hero.iHeroLv+"<br>";
	porpertyValue += "���̹���" +":" +hero.iNearAttack +"<br>";
	porpertyValue += "Զ�̹���" +":" +hero.iFarAttack +"<br>";
	porpertyValue += "���̷���" +":" +hero.iNearFort +"<br>";
	porpertyValue += "Զ�̷���" +":" +hero.iFarFort +"<br>";
	porpertyValue += "��������" +":" +hero.iHeroLoad +"<br>";
	porpertyValue += "�ƶ��ٶ�" +":" + hero.iHeroSleep +"<br>";
	var hint="<img src=\'/images/blank.gif\' width=\'63\' height=\'13\' align=\'absmiddle\' 			          class=\'hero_star_"+hero.iHeroStar+'\'><br>'+porpertyValue;
	return hint;
}
//��ȡ����tips������
function getTreaHint(trea)
{
	var porpertyValue="";
	porpertyValue += trea.szName +"<br>";
	for(var i=0;i<trea.stEff.length;i++)
	{
		var value = trea.stEff[i].iEffValue/10;
		porpertyValue += trea.stEff[i].m_szName +":" +value +"%<br>";
	}
	var hint="<img src=\'/images/blank.gif\' width=\'63\' height=\'6\' align=\'absmiddle\'" 			          +"><br>"+porpertyValue;
	return hint;
}

//��ʾӢ���б�ı����Ϣ
function addUserHeroInfo(table,userName,objectName,heroObject,attribute)
{
	if(typeof(heroObject) != 'undefined' && heroObject.length>0)
	{
		
		addHeroTableTitle(table,userName);
		var tableRow;
		for(var i=0;i<heroObject.length;i++)
		{
			if(i%2==0)
			{
				tableRow = table.insertRow(-1);
			}
			var Name = heroObject[i].szName;
			var sPicArray=[0,0];
			var hintArray = ["","",""];
			hintArray[0] = getHeroHint(heroObject[i]);
			var len = heroObject[i].astTrea.length;
			for(var j=0;j<len;j++)
			{
				sPicArray[j] = heroObject[i].astTrea[j].iPicID;
				hintArray[j+1] = getTreaHint(heroObject[i].astTrea[j]);
			}
			var expValue = heroObject[i].iHeroExpUp;
			var proFlag = heroObject[i].iHeroStat;
			var expItemFlag = 0;
			if(attribute.length>=11)
				expItemFlag = attribute[10];
			var strength = heroObject[i].iStrength;
			addHeroTableTd(tableRow,objectName,Name,sPicArray,hintArray,
				   expValue,expItemFlag,strength,proFlag);
		}
		if(i%2 == 1)
		{
			addHeroTableTd(tableRow,"","",0,0,
				   0,0,0,0);
		}
	}
	else
	{
		table.display = "none";
	}

}
//��ʾ��������Ӣ���б�
function showAttackHeroInfo()
{
	if(getUserType() != 2)
	{
		$("attack_hero").style.display = "block";
		addUserHeroInfo($("attack_hero"),getNickNameStr(oR.astCityInfo[0]),getNickNameStr(oR.astCityInfo[1]),
oR.astMainArmy[0].stArmyHeroInfo,oR.astMainArmy[0].ashAttribute);
	}
	
}

//��ʾ���ط���Ӣ���б�
function showDefeatHeroInfo()
{
	if(getUserType() != 2)
	{
		$("defeat_hero").style.display = "block";
		addUserHeroInfo($("defeat_hero"),getNickNameStr(oR.astCityInfo[1]),getNickNameStr(oR.astCityInfo[0]),
oR.astMainArmy[1].stArmyHeroInfo,oR.astMainArmy[1].ashAttribute);
	}
	
}
//��ʾ�����ʼ���Ӣ���б�
function showUniteHeroInfo()
{
	if(getUserType() == 2)
	{
		if(oR.astUniteArmy.length>0)
		{
			$("unite_hero").style.display = "block";
			addUserHeroInfo($("unite_hero"),getStyleNickName(oR.astUniteArmy[0].szMasterNick,oR.astUniteArmy[0].iMasterUin),getNickNameStr(oR.astCityInfo[0]),
oR.astUniteArmy[0].stArmyHeroInfo,oR.astUniteArmy[0].ashAttribute);
			return;
		}
	}
}

//��ʾ������������Ӣ���б�
function showAttackRanodmHeroInfo()
{
	if(getUserType() != 2)
	{
		$("attack_hero").style.display = "block";
		addUserHeroInfo($("attack_hero"),getNickNameStr(oR.CCitySumInfo),"",
oR.astMainArmy[0].stArmyHeroInfo,oR.astMainArmy[0].ashAttribute);
	}
	
}



/*
��ʾiframetips��Ϣ
*/
var curFrameMouseObj
function quickiframealt() 
{
	var evt=evt?evt:(window.event?window.event:null)
	if(curFrameMouseObj != evt.srcElement){
		curFrameMouseObj = evt.srcElement
		var scrollPos; 
		if (typeof window.pageYOffset != 'undefined') { 
			scrollPos = window.pageYOffset; 
		} 
		else if (typeof document.curFrameMouseObj != 'undefined' && 
			  document.compatMode != 'BackCompat') { 
			scrollPos = document.documentElement.scrollTop; 
		} 
		else if (typeof document.body != 'undefined') { 
			scrollPos = document.body.scrollTop; 
		} 
		if(evt.srcElement.hint && evt.srcElement.hint!='') 
		{
			altlayer.style.visibility='visible';
			altlayer.style.left=evt.x+10;
			altlayer.style.top=evt.y+scrollPos+10;
			altlayer.innerHTML=evt.srcElement.hint
		}
		else
		{ 
			altlayer.style.visibility='hidden';
		}
	}
}

function initMailHtml(){		

	//tips��������
	document.body.onmousemove=quickiframealt;  //tips����
	var objScreen = document.getElementById("altlayer");
	if (!objScreen){
		var objScreen = document.createElement("div");
	}
	var oS = objScreen.style;
	objScreen.id = "altlayer";
	oS.display = "block";
	oS.filter = " Alpha(Opacity=95)";
	oS.opacity = "0.9";
	oS.visibility = "hidden";
	oS.color = "#121212";
	oS.border = "1px solid #ffab86";
	oS.background = "url(/images/hero_tips_bg.gif)";
	oS.position = "absolute";
	oS.padding = "5px 10px";
	oS.lineHeight = "20px";
	oS.textAlign="left"
	oS.zIndex = "200000";
	document.body.appendChild(objScreen);
}




//������ʾ
//summary�����ʾ
function addSummaryLineInfo(summaryTab,linestr,sColor,cName)
{
	var tableRow = summaryTab.insertRow(-1);
	var tableValueTd = document.createElement('td');
	tableValueTd.innerHTML = linestr;
	//ֵ
	if(sColor!="")
		tableValueTd.style.color = sColor;
	if(cName!="")
	{
		tableValueTd.className = cName;
	}
	tableRow.appendChild(tableValueTd);
}

//���һ�������
function addTableCommonLine(objTab,lineValues,iWidths)
{
	var tableRow = objTab.insertRow(-1);
	for(var i=0;i<lineValues.length;i++)
	{
		var tableValueTd = document.createElement('td');
		tableValueTd.innerHTML = lineValues[i];
		if(iWidths[i]!=0 && iWidths[i]!="0")
			tableValueTd.width =iWidths[i]; 
		tableRow.appendChild(tableValueTd);
	}
}
//��ʾ���������ļӳ�
function showAttRandomAddValue(addTab)
{
	if(countAttributeNotZero(oR.astMainArmy[0].ashAttribute)==0)
		return;
	addTab.style.display = "block";
	var LineValues = [];
	var iWidths = [0,0];
	LineValues[0] = "�������";
	LineValues[1] = getNickNameStr(oR.CCitySumInfo);
	addTableCommonLine(addTab,LineValues,iWidths);
	
	LineValues[0] = "�Ƽ������У���ս�����ӳ�:";
	LineValues[1] = chkvalue(oR.astMainArmy[0].ashAttribute,1);
	if(LineValues[1]!=0)
		addTableCommonLine(addTab,LineValues,iWidths);
	
	LineValues[0] = "�Ƽ����������ս�����ӳ�:";
	LineValues[1] = chkvalue(oR.astMainArmy[0].ashAttribute,2);
	if(LineValues[1]!=0)
		addTableCommonLine(addTab,LineValues,iWidths);
	
	LineValues[0] = "����Խ�ս�����ӳ�:";
	LineValues[1] = chkvalue(oR.astMainArmy[0].ashAttribute,6);
	if(LineValues[1]!=0)
		addTableCommonLine(addTab,LineValues,iWidths);
	
	LineValues[0] = "�����Զ�̹����ӳ�:";
	LineValues[1] = chkvalue(oR.astMainArmy[0].ashAttribute,7);
	if(LineValues[1]!=0)
		addTableCommonLine(addTab,LineValues,iWidths);
		
	LineValues[0] = "����Թ������Լӳ�:";
	LineValues[1] = chkvalue(oR.astMainArmy[0].ashAttribute,11);
	if(LineValues[1]!=0)
		addTableCommonLine(addTab,LineValues,iWidths);
		
	LineValues[0] = "����Թ������Լӳ�:";
	LineValues[1] = chkvalue(oR.astMainArmy[0].ashAttribute,12);
	if(LineValues[1]!=0)
		addTableCommonLine(addTab,LineValues,iWidths);
		
	LineValues[0] = "���ԶԹ������Լӳ�:";
	LineValues[1] = chkvalue(oR.astMainArmy[0].ashAttribute,13);
	if(LineValues[1]!=0)
		addTableCommonLine(addTab,LineValues,iWidths);
		
	LineValues[0] = "��躶Է������Լӳ�:";
	LineValues[1] = chkvalue(oR.astMainArmy[0].ashAttribute,14);
	if(LineValues[1]!=0)
		addTableCommonLine(addTab,LineValues,iWidths);
}

//////////////////////////////////////
/*
*�����ս��
*/
function showRandomAttPage()
{
	addSummaryLineInfo($("summary_tab"),outPutRandomTitle(),"FF0000","");
	var linestr = 'ս��ժҪ<span class="time">ʱ��: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"��������"+getRandomCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"��������"+getRandomCityInfo(1),"","");
	addSummaryLineInfo($("summary_tab"),"ս�������"+getRandomWarResultInfo(),"","");
	
	addRandomItemsToTable($("summary_tab"));
	
	linestr = '<span class="power">����ս��:'+oR.iInvaderValue+'</span>	   ������ʧ��'+getTotalLostInfo(0);
	addSummaryLineInfo($("summary_tab"),linestr,"","");
	linestr = '<span class="power">�ط�ս��:'+oR.iTargetValue+'</span>'
	addSummaryLineInfo($("summary_tab"),linestr,"","");
	addSummaryLineInfo($("summary_tab"),"ս������","","title");
	
	showRandomAttackInfo();
	showDefeadRandomInfo();
	showAttackRanodmHeroInfo();
	
	showAttRandomAddValue($("addValueTable"));
}
function showRandomBackPage()
{
	addSummaryLineInfo($("summary_tab"),getRandomBackTitle(),"FF0000","");
	var linestr = 'ս��ժҪ<span class="time">ʱ��: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"��������"+getRandomCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"��������"+getRandomCityInfo(1),"","");

	addSummaryLineInfo($("summary_tab"),"�佫��"+getAttHeroNamesStr(oR.astMainArmy[0].stArmyHeroInfo),"","");
	
	addSummaryLineInfo($("summary_tab"),"ʿ��������"+countall(oR.astMainArmy[0].astArmyInfo[0].ashArmy),"","");
	addSummaryLineInfo($("summary_tab"),"��������","","title");
	
	$("army_info").style.display = "block";
	addArmyInfo($("army_info"),oR.astMainArmy[0].astArmyInfo[0].ashArmy,"��Ŀ",11);
}

function showRandomNoAttPage()
{
	addSummaryLineInfo($("summary_tab"),getRandomNoActionTitle(),"FF0000","");
	var linestr = 'ժҪ<span class="time">ʱ��: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"��������"+getRandomCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"��������"+getRandomCityInfo(1),"","");	
}

//////////////////////////////////////
/*
*�Ӷ�սս��
*/
function showAttPage()
{
	addSummaryLineInfo($("summary_tab"),outPutTitle(),"FF0000","");
	var linestr = 'ս��ժҪ<span class="time">ʱ��: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"��������"+getCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"��������"+getCityInfo(1),"","");
	addSummaryLineInfo($("summary_tab"),"ս�������"+getWarResultStr(),"","");
	
	addGetItemsToTable($("summary_tab"));
	//��ʾ˫��ս��
	if(getUserType() != 2)
		addAttackPowerInfo($("summary_tab"));
	addSummaryLineInfo($("summary_tab"),"ս������","","title");
	if(getUserType() != 2)
	{
		showAttackTableInfo();
		showDefeadTableInfo();
		showUniteTableInfo();
		showAttackHeroInfo();
		showDefeatHeroInfo();
		showUniteHeroInfo();	
	}
	else
	{
		showUniteTableInfo();
		showUniteHeroInfo();
	}
	showAddTableInfo();
}

function showAttBackPage()
{
	addSummaryLineInfo($("summary_tab"),getAttackBackTitle(),"FF0000","");
	var linestr = 'ս��ժҪ<span class="time">ʱ��: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"��������"+getCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"��������"+getCityInfo(1),"","");

	addSummaryLineInfo($("summary_tab"),"�佫��"+getAttHeroNamesStr(oR.astMainArmy[0].stArmyHeroInfo),"","");
	
	addSummaryLineInfo($("summary_tab"),"ʿ��������"+countall(oR.astMainArmy[0].astArmyInfo[0].ashArmy),"","");
	addSummaryLineInfo($("summary_tab"),"��������","","title");
	
	$("army_info").style.display = "block";
	addArmyInfo($("army_info"),oR.astMainArmy[0].astArmyInfo[0].ashArmy,"��Ŀ",11);
}

function showNoAttPage()
{
	addSummaryLineInfo($("summary_tab"),getAttackNoActionTitle(),"FF0000","");
	var linestr = 'ժҪ<span class="time">ʱ��: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"��������"+getCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"��������"+getCityInfo(1),"","");	
}

////////////////////////////////////////////////////////////////////////
/*
*��̽ս��
*/
function showSpyPage()
{
	addSummaryLineInfo($("summary_tab"),outputSpySumary(oR),"FF0000","");
	var linestr = 'ժҪ<span class="time">ʱ��: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"��������"+getCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"��������"+getCityInfo(1),"","");
	linestr = "����������"+oR.iSpySoldier+"��  " +"��ʧ��"+ oR.iLossSoldier+"��"
	addSummaryLineInfo($("summary_tab"),linestr,"","");
	addSummaryLineInfo($("summary_tab"),"�������"+outputSpyResult(oR),"","");
	showSpyInfo();
}

function showSpyBackPage()
{
	addSummaryLineInfo($("summary_tab"),getSpyBackTitle(),"FF0000","");
	var linestr = 'ժҪ<span class="time">ʱ��: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"��������"+getCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"��������"+getCityInfo(1),"","");
	linestr = "����������"+oR.iSpySoldier+"��";
	addSummaryLineInfo($("summary_tab"),linestr,"","");
}

function showNoSpyPage()
{
	addSummaryLineInfo($("summary_tab"),getSpyNoActionTitle(),"FF0000","");
	var linestr = 'ժҪ<span class="time">ʱ��: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"��������"+getCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"��������"+getCityInfo(1),"","");
}

/////////////////////////////////////////////////////////////////////////
/*
*��פս��
*/
function showReDeployPage()
{
	addSummaryLineInfo($("summary_tab"),getDeployTitle(),"FF0000","");
	var linestr = 'ժҪ<span class="time">ʱ��: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"��������"+getDeployCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"���ܷ���"+getDeployCityInfo(1),"","");
	addSummaryLineInfo($("summary_tab"),"Я����Դ��"+getResource(oR.atConvRes),"","");
	addSummaryLineInfo($("summary_tab"),"������ʳ��"+oR.iFoodExp+"/Сʱ","","");
	addSummaryLineInfo($("summary_tab"),"�佫��"+getHeroNamesStr(oR.asHeroList),"","");
	addSummaryLineInfo($("summary_tab"),"ʿ��������"+countall(oR.CCityArmy.ashArmy),"","");
	
	addSummaryLineInfo($("summary_tab"),"��������","","title");
	
	$("army_info").style.display = "block";
	addArmyInfo($("army_info"),oR.CCityArmy.ashArmy,"��Ŀ",11);
}

function showReDeployBackPage()
{
	addSummaryLineInfo($("summary_tab"),getDeployBackTitle(),"FF0000","");
	var linestr = 'ժҪ<span class="time">ʱ��: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"��������"+getDeployCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"���ܷ���"+getDeployCityInfo(1),"","");
	addSummaryLineInfo($("summary_tab"),"Я����Դ��"+getResource(oR.atConvRes),"","");
	addSummaryLineInfo($("summary_tab"),"������ʳ��"+oR.iFoodExp+"/Сʱ","","");
	addSummaryLineInfo($("summary_tab"),"�佫��"+getHeroNamesStr(oR.asHeroList),"","");
	addSummaryLineInfo($("summary_tab"),"ʿ��������"+countall(oR.CCityArmy.ashArmy),"","");
	
	addSummaryLineInfo($("summary_tab"),"��������","","title");
	
	$("army_info").style.display = "block";
	addArmyInfo($("army_info"),oR.CCityArmy.ashArmy,"��Ŀ",11);
}

function showNoReDeployPage()
{
	addSummaryLineInfo($("summary_tab"),getDeployTitle(),"FF0000","");
	var linestr = 'ժҪ<span class="time">ʱ��: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"��������"+getDeployCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"���ܷ���"+getDeployCityInfo(1),"","");
}

/////////////////////////////////////////////////////////////////////////
/*
*����ս��
*/
function showUnitePage()
{
	addSummaryLineInfo($("summary_tab"),getUniteTitle(),"FF0000","");
	var linestr = 'ժҪ<span class="time">ʱ��: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"��������"+getCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"���ܷ���"+getCityInfo(1),"","");

	addSummaryLineInfo($("summary_tab"),"�佫��"+getHeroNamesStr(oR.asHeroList),"","");
	addSummaryLineInfo($("summary_tab"),"������ʳ��"+oR.iFoodExp+"/Сʱ","","");
	addSummaryLineInfo($("summary_tab"),"Я��װ����"+getFitInfo(oR.atOutfit),"","");
	addSummaryLineInfo($("summary_tab"),"ʿ��������"+countall(oR.CCityArmy.ashArmy),"","");
	
	addSummaryLineInfo($("summary_tab"),"��������","","title");
	
	$("army_info").style.display = "block";
	addArmyInfo($("army_info"),oR.CCityArmy.ashArmy,"��Ŀ",11);
}

function showUniteBackPage()
{
	addSummaryLineInfo($("summary_tab"),getUniteBackTitle(),"FF0000","");
	var linestr = 'ժҪ<span class="time">ʱ��: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"��������"+getCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"���ܷ���"+getCityInfo(1),"","");

	addSummaryLineInfo($("summary_tab"),"�佫��"+getHeroNamesStr(oR.asHeroList),"","");
	addSummaryLineInfo($("summary_tab"),"������ʳ��"+oR.iFoodExp+"/Сʱ","","");
	addSummaryLineInfo($("summary_tab"),"Я��װ����"+getFitInfo(oR.atOutfit),"","");
	addSummaryLineInfo($("summary_tab"),"ʿ��������"+countall(oR.CCityArmy.ashArmy),"","");
	
	addSummaryLineInfo($("summary_tab"),"��������","","title");
	
	$("army_info").style.display = "block";
	addArmyInfo($("army_info"),oR.CCityArmy.ashArmy,"��Ŀ",11);
}

function showNoUnitePage()
{
	addSummaryLineInfo($("summary_tab"),getUniteNoActionTitle(),"FF0000","");
	var linestr = 'ժҪ<span class="time">ʱ��: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"��������"+getCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"���ܷ���"+getCityInfo(1),"","");
}

/////////////////////////////////////////////////////////////////////////
/*
*����ս��
*/
function showTransPage()
{
	addSummaryLineInfo($("summary_tab"),getTransFormTitle(),"FF0000","");
	var linestr = 'ժҪ<span class="time">ʱ��: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"���䷽��"+getCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"���ܷ���"+getCityInfo(1),"","");
	addSummaryLineInfo($("summary_tab"),"�����������"+getArrayValue(oR.CCityArmy.ashArmy,0),"","");
	addSummaryLineInfo($("summary_tab"),"���䳵������"+getArrayValue(oR.CCityArmy.ashArmy,1),"","");
	addSummaryLineInfo($("summary_tab"),"Я����Դ��"+getResource(oR.atConvRes),"","");
}

function showTransBackPage()
{
	addSummaryLineInfo($("summary_tab"),getTransBackTitle(),"FF0000","");
	var linestr = 'ժҪ<span class="time">ʱ��: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"���䷽��"+getCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"���ܷ���"+getCityInfo(1),"","");
	addSummaryLineInfo($("summary_tab"),"�����������"+getArrayValue(oR.CCityArmy.ashArmy,0),"","");
	addSummaryLineInfo($("summary_tab"),"���䳵������"+getArrayValue(oR.CCityArmy.ashArmy,1),"","");
	addSummaryLineInfo($("summary_tab"),"Я����Դ��"+getResource(oR.atConvRes),"","");
}

function showNoTransPage()
{
	addSummaryLineInfo($("summary_tab"),getTransNoActionTitle(),"FF0000","");
	var linestr = 'ժҪ<span class="time">ʱ��: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"���䷽��"+getCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"���ܷ���"+getCityInfo(1),"","");
}

/////////////////////////////////////////////////////////////////////////
/*
*�ػ�ս��
*/

function showExpoitBakePage()
{
	addSummaryLineInfo($("summary_tab"),getExploitBackTitle(),"FF0000","");
	var linestr = 'ժҪ<span class="time">ʱ��: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","");
	
	addSummaryLineInfo($("summary_tab"),"�ػ��ߣ�"+getExploiter(),"","");
	addSummaryLineInfo($("summary_tab"),"Ŀ��ĵأ�"+getCityPivot(oR.astNewCityInfo[0].iNewCityGridID,3),"","");
}

function showExploitPage()
{
	addSummaryLineInfo($("summary_tab"),getExploitTitle(),"FF0000","");
	var linestr = 'ժҪ<span class="time">ʱ��: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	
	addSummaryLineInfo($("summary_tab"),"�ػ��ߣ�"+getExploiter(),"","");
	addSummaryLineInfo($("summary_tab"),"Ŀ��ĵأ�"+getCityPivot(oR.astNewCityInfo[0].iNewCityGridID,3),"","");
	addNewCityName($("summary_tab"))
}

function getExObjName(iType,id,sName)
{
	//����
	if(iType == 3)
	{
		return top.toMaterilName(id);
	}
	//����
	else if(iType == 4)
	{
		return top.getItemConfig(id).name;
	}
	else
	{
		return sName;
	}
}


function getExObjTypeName(iType)
{
	var sName = "";
	switch(iType)
	{
		case 3:
		sName = "����";
		break;
		case 4:
		sName = "����";
		break;
		case 6:
		sName = "Ӣ��";
		break;
		case 5:
		sName = "����";
		break;
		
	}
	return sName;
}

/*
*��ʾ�����ʼ� 1 ��ʾ������0 ��ʾ�ʼ�
*/
function showExchangePage(bAttach)
{
	var sTitle = "";
	var iPrice;
	var soldName;
	var buyName;
	var taxPrice;
	var sysPrice = 5;
	var iItemCount = 1;
	var objectName;
	var itemID;
	objectName = getExObjName(oR.m_iType,oR.m_iItemObjID,oR.m_szObjName);
	var TypeName = getExObjTypeName(oR.m_iType);
	itemID   = oR.m_iItemID;
	iItemCount = oR.m_iCount;
	iPrice   = oR.m_iPrice;
	soldName = getStyleNickName(oR.m_szOwner,oR.m_iOwner);
	if(oR.iStats == 1)
	{
		if(oR.m_iOwner == chGetUin())
		{
			if(!bAttach)
			{
				sTitle = "����"+TypeName+" "+objectName+" �ѳɹ��۳�";
				$("mail_title").innerHTML = $("mail_title").innerHTML+objectName+"�ѳɹ��۳�";
			}
			else
			{
				sTitle = soldName+" ��"+TypeName+" "+objectName+" �ѳɹ��۳�";
			}
		}
		else 
		{
			if(!bAttach)
			{
				sTitle = "���ѳɹ�����"+TypeName+" "+objectName;
				$("mail_title").innerHTML = $("mail_title").innerHTML+objectName+"�ѳɹ�����";
			}
			else
			{
				sTitle = soldName+" �ѳɹ�����"+ TypeName+" "+ objectName;
			}
		}
		buyName  = getStyleNickName(oR.m_szBuyer,oR.m_iBuyer);
		taxPrice = oR.m_iTaxGold;
	
	}
	else if(oR.iStats == 2)
	{
			
			if(!bAttach)
			{
				sTitle = TypeName+" "+objectName+" ���׵��ѹ���";
				$("mail_title").innerHTML = $("mail_title").innerHTML+sTitle;
			}
			else
			{
				sTitle = soldName+" ��"+TypeName+" "+objectName+" ���׵��ѹ���";
			}
	}
	else if(oR.iStats == 3)
	{
			if(!bAttach)
			{
				sTitle = TypeName+" "+objectName+"���׵���ϵͳ����";
				$("mail_title").innerHTML = $("mail_title").innerHTML+sTitle;
			}
			else
			{
				sTitle = soldName+" ��"+TypeName+" "+objectName+"���׵���ϵͳ����";
			}
	}
	else
	{
		return;
	}
	addSummaryLineInfo($("summary_tab"),sTitle,"FF0000","");
	var linestr = 'ժҪ<span class="time">ʱ��: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	//addSummaryLineInfo($("summary_tab"),"���׵��ţ�"+itemID,"","");
	addSummaryLineInfo($("summary_tab"),"��Ʒ���ƣ�"+objectName,"","");
	addSummaryLineInfo($("summary_tab"),"��Ʒ��Ŀ��"+iItemCount,"","");
	if(oR.iStats == 1)
	{
		addSummaryLineInfo($("summary_tab"),"","","");
		addSummaryLineInfo($("summary_tab"),"��   ����"+soldName,"","");
		addSummaryLineInfo($("summary_tab"),"��   ����"+buyName,"","");
	}
	addSummaryLineInfo($("summary_tab"),"���׼۸�"+getResPicUrl("jb","���")+iPrice,"","");
	if(oR.iStats == 1)
	{
		if(oR.m_iOwner == chGetUin())
		{
			addSummaryLineInfo($("summary_tab"),"�ҵ������ѣ�"+getResPicUrl("jb","���")+sysPrice,"","");
			addSummaryLineInfo($("summary_tab"),"�ѿ۽��׷ѣ�"+getResPicUrl("jb","���")+taxPrice,"","");
		}
	}
}

