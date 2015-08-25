	
/*
**    ==================================================================================================  
**     
**    ��������б���
**                            
**    ==================================================================================================  
*/
/** �����Լ��Ļ�����Ϣ */
function GetMineInfo(){
	var Ver     = "1"
	var MsgID   = "1002"
	var MsgType = "1"
	var ACT     = "0"
	
	var Head,Body
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey)))
	
	return Head+Body
}


/** �����Լ������гǳ�ժҪ */
function GetMineAllCity(){
	var Ver     = "1"
	var MsgID   = "1022"
	var MsgType = "1"
	var ACT     = "0"
	
	var Head,Body
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey)))
	
	return Head+Body
}

/** �����Լ���ǰ������Ϣ */
function GetMineCity(cityid,act){
	var Ver     = "1"
	var MsgID   = "1003"
	var MsgType = "1"
	var ACT     = act
	
	var Head,Body
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(cityid)) //���鳤��  ����ID

	return Head+Body
}


/** ����ȡ���������� */
function GetCancleTask(str){
	var Ver     = "1"
	var MsgID   = "1004"
	var MsgType = "1"
	var ACT     = "0"
	
	var Head,Body
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(str)) //���鳤��  ����ID

	return Head+Body
}


/** ��������������� */
function GetBuildingTask(arrTaskID){
	var Ver     = "1"
	var MsgID   = "1005"
	var MsgType = "1"
	var ACT     = "0"
	
	var str = ""
	for(var i=0;i<arrTaskID.length;i++)
	{
		str=str+CLength(arrTaskID[i]);
	}
	
	var Head,Body
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(arrTaskID.length)+str+CLength(CityID)) //���鳤��  ����ID

	return Head+Body
}


/** ������ */
function GetBuild(buildID,buildTY,rank,count){
	var Ver     = "1"
	var MsgID   = "1007"
	var MsgType = "1"
	var ACT     = "0"
	
	var BuildID = buildID
	var BuildTY = buildTY
	var Rank    = rank
	var Count   = count
	
	var Head,Body
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(CityID)+CLength(BuildID)+CLength(BuildTY)+CLength(Rank)+CLength(Count))
																				//cityID          buiID   buiTY    rank    count
	return Head+Body
}


/** �����ͼ���� */
//��������ǳƻ���QQ�����ѯ���������Э��
function SearchMapN(Type,Searchkey){
	var Ver     = "1"
	var MsgID   = "1008"
	var MsgType = "1"
	var ACT     = "0"
	
	var Head,Body
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(Type)+CLength(Searchkey))
	
	return Head+Body
}

//�ղص�ͼ:��ѯ���ղء��޸�������ɾ��
function GetFavMap(Type,GridID,GridIntro,GridArray,act){
	var Ver     = "1"
	var MsgID   = "1009"
	var MsgType = "1"
	var ACT     = act==null?"0":act
	
	var Head,Body
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(Type)+CLength(GridID)+CLength(GridIntro)+CLength(GridArray))

	return Head+Body
}

//���ص�ͼ��Ϣ
function GetWorldMap(gridid,act){
	var Ver     = "1"
	var MsgID   = "1006"
	var MsgType = "1"
	var ACT     = "0"
	if(typeof(act)!="undefined")ACT = act //act=0һ������ act=1��ͼ����֮������
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(gridid))
	return Head+Body
}

//����һ����ͼ���Ƿ����
function GetIsSpace(gridid){
	var Ver     = "1"
	var MsgID   = "1023"
	var MsgType = "1"
	var ACT     = "0"
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(gridid))
	return Head+Body
}

//����ս�� ��̽ ��פ ����
function GetCreatArmy(iTargetiGridID,iType,ashArmy,asOutfit,iMarchTime,iEmergency,iNewname,iHero){
	var Ver     = "1"
	var MsgID   = "1010"
	var MsgType = "1"
	var ACT     = "0"
	iEmergency = iEmergency ? 20 : 0;
	///
	if(iEmergency>0)
	{
		//�龰ʹ�ã�����ʹ��ϵͳ���͵���
		var iItemID = getSceneUseItemID(iEmergency);
		if(iItemID !=0)
			iEmergency = iItemID;
	}
	
	var iLeaveCityID= CityID
	if(iHero==null)iHero="00010"
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iLeaveCityID)+CLength(iTargetiGridID)+CLength(iType)+ashArmy+asOutfit+CLength(iMarchTime)+CLength(iEmergency)+CLength(iNewname)+iHero
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	return Head+Body
}

//�ݵ�ս��
function GetCreatArmyRandom(iTargetiGridID,iType,ashArmy,asOutfit,iMarchTime,iEmergency,iNewname,iHero){
	var Ver     = "1"
	var MsgID   = "1024"
	var MsgType = "1"
	var ACT     = "0"
	iEmergency = iEmergency ? 20 : 0;
	if(iEmergency>0)
	{
		//�龰ʹ�ã�����ʹ��ϵͳ���͵���
		var iItemID = getSceneUseItemID(iEmergency);
		if(iItemID !=0)
			iEmergency = iItemID;
	}
	var iLeaveCityID= CityID

	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iLeaveCityID)+CLength(iTargetiGridID)+CLength(iType)+ashArmy+asOutfit+CLength(iMarchTime)+CLength(iEmergency)+CLength(iNewname)+iHero
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	return Head+Body
}

//��ѯ�ɳ���Ҫ��ʱ��͸���
function GetMarchInfo(iTargetiGridID,iType,iMarchTime,strArmy,itemid,herostr){
	var Ver     = "1"
	var MsgID   = "1017"
	var MsgType = "1"
	var ACT     = "0"
	herostr=(herostr==null)?"00010":herostr
	var iLeaveCityID= CityID
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iLeaveCityID)+CLength(iTargetiGridID)+CLength(iType)+strArmy+CLength(iMarchTime)+CLength(itemid)+herostr
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}

//��ѯ���¶��и�Ҫ
function GetArmyList(iCheckType,iCityID,act){
	var Ver     = "1"
	var MsgID   = "1019"
	var MsgType = "1"
	var ACT     = "0"
	if(act!=null)ACT=act//1��������鵯���ܱ�,null��������²�
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iCheckType)+CLength(iCityID);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}
//��ѯ���¶�������
function GetArmyListInfo(iWater,iCityID,act){
	var Ver     = "1"
	var MsgID   = "1018"
	var MsgType = "1"
	var ACT     = (act!=null)?act:0;
	//1000Ϊ�㽫̨�鿴����
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iCityID)+CLength(iWater);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}

//�ٻز���
function GetCancleArmy(waterid,itemid,act){
	var Ver     = "1"
	var MsgID   = "1020"
	var MsgType = "1"
	var ACT     = (act!=null)?act:0;
	//1000Ϊ�㽫̨ǲ��
	
	//add by welchzhu
	var iItemID = getSceneUseItemID(itemid);
	if(iItemID !=0)
			itemid = iItemID;
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	//32
	strr=CLength(waterid)+CLength(itemid);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}

//���������б�1500�����µ�ǰ�����б�1501����ѯӢ���б�1601 �� ��ȡ����Ӣ��1602 ����ȡ���б���1603����¼��֤Э��1001����ȡ����1613
function getTaskList(num,act)
{
	var Ver     = "1"
	var MsgID   = num
	var MsgType = "1"
	var ACT     = act || 0
	//1603��������Ϣ������act>0ΪӢ��ҳ�����act=0Ϊ���ﾫ���ϳ�act=-10Ϊ������
	//��ȡӢ��act=-10��������ҳ�����
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey)))
	
	return Head+Body
}
//���������������
function getTaskFinish(id,act)
{
	var Ver     = "1"
	var MsgID   = "1503"
	var MsgType = "1"
	var ACT     = act || 0
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(id))
	
	return Head+Body
}
//����������ȡ����
function getTaskGet(id,act)
{
	var Ver     = "1"
	var MsgID   = "1502"
	var MsgType = "1"
	var ACT     = act || 0
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(id))
	
	return Head+Body
}
//����ѡ���������
function getTaskChoose(id,answer)
{
	var Ver     = "1"
	var MsgID   = "1504"
	var MsgType = "1"
	var ACT     = id
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(id)+CLength(answer))
	
	return Head+Body
}
//����Ӣ�ۻ��߱��� cmd id :1605
//����Ӣ�ۻ��߱��� cmd id :1606 iType=0����Ӣ�ۣ�=1��������
function GetActHeroTrea(x,m_iID,iType){
	var Ver     = "1"
	var MsgID   = x
	var MsgType = "1"
	var ACT     = iType
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(m_iID)+CLength(iType))
	return Head+Body
}
//������� cmd id :1607
//ж�±��� cmd id :1609
function GetTakeTrea(x,m_iID,iType){
	var Ver     = "1"
	var MsgID   = x
	var MsgType = "1"
	var ACT     = m_iID //Ӣ��ID
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(m_iID)+CLength(iType))
	return Head+Body
}
//Ӣ������
function GetUpGradeHero(heroid){
	var Ver     = "1"
	var MsgID   = 1604
	var MsgType = "1"
	var ACT     = 0 
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(heroid))
	return Head+Body
}

//����ϳ�
function GetTreaConpose(f,s,i){
	var Ver     = 1
	var MsgID   = 1611
	var MsgType = 1
	var ACT     = 1
	
	var m_iMainTreaID    = f
	var m_iClientTreaID  = s
	var m_iItemID        = i
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(m_iMainTreaID)+CLength(m_iClientTreaID)+CLength(m_iItemID))
	return Head+Body
}
//���ﾫ��
function GetTreaRefine(f,i){
	var Ver     = 1
	var MsgID   = 1610
	var MsgType = 1
	var ACT     = 1
	
	var m_iTreaID     = f
	var m_iItemID     = i
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(m_iTreaID)+CLength(m_iItemID))
	return Head+Body
}
//�ϳ�װ��
function getMakeOutfit(id,n){
	var Ver     = 1
	var MsgID   = 1612
	var MsgType = 1
	var ACT     = 1
		
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(id)+CLength(n))
	return Head+Body
}
//��������ȡ�б�
function GetMarketList(m_iType,m_iSubType,m_iClass,m_iBeginID,m_iCount){
	var Ver     = 1
	var MsgID   = 1700
	var MsgType = 1
	var ACT     = 1	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(m_iType)+CLength(m_iSubType)+CLength(m_iClass)+CLength(m_iBeginID)+CLength(m_iCount))
	return Head+Body
}
//�������ҵ�
function GetMarketSell(ty,count,id,price){
	var Ver     = 1
	var MsgID   = 1702
	var MsgType = 1
	var ACT     = ty
	
	var m_iItemType    = ty
	var m_iCount       = count
	var m_iItemObjID   = id
	var m_iPrice       = price
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(m_iItemType)+CLength(m_iCount)+CLength(m_iItemObjID)+CLength(m_iPrice))
	return Head+Body
}
//���׹���1701����������1703����ȡ�û����׵���ϸ��Ϣ1705����ѯ�������׵�1706
function GetMarketBill(msgid,billid){
	var Ver     = 1
	var MsgID   = msgid
	var MsgType = 1
	var ACT     = 1
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(billid))
	return Head+Body
}
//���ͳ������׵���Э���
function sendCancelItem(disID)
{
	if(disID.length < 10)
		return "";
	var pos = disID.length-10; 
	var value = parseInt(disID.substr(pos,10),10);
	objFlashEng.Send(GetMarketBill(1703,value));
}


//����ϵͳ
/**������� msgID: 1210*/
/**��ȡ�����Ҫ��ϢmsgID: 1200 */
/**��ɢһ������msgID: 1202 */
/**��ȡ�����Ա�б� msID: 1203*/
/**��ȡ�����б� msgID: 1204*/
/**��ȡ����������Ϣ msgID: 1205*/
/**����������� msgID: 1206*/
function GetSeptQuit(msgid,billid,act){
	var Ver     = 1
	var MsgID   = msgid
	var MsgType = 1
	var ACT     = act || 1
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(billid))
	return Head+Body
}
//����һ������msgID: 1201
function GetSeptCreat(name){
	var Ver     = 1
	var MsgID   = 1201
	var MsgType = 1
	var ACT     = 1
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(name))
	return Head+Body
}
//��Ӧ��������msgID: 1207
//����ͬ������msgID: 1213
function GetSeptApplyAgree(msg,uin,sept,opt){
	var Ver     = 1
	var MsgID   = msg
	var MsgType = 1
	var ACT     = 1
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(uin)+CLength(sept)+CLength(opt))
	return Head+Body
}
//��������msgID: 1208
//��ѯ�������� 1230
function GetSeptInvite(msg,sept,uin,act){
	var Ver     = 1
	var MsgID   = msg
	var MsgType = 1
	var ACT     = act || 100
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(sept)+CLength(uin))
	return Head+Body
}
//�޸ļ����ĵ����� 1215
function GetSeptModInfo(msg,septid,oint,qqclub,announce,board){
	var Ver     = 1
	var MsgID   = msg
	var MsgType = 1
	var ACT     = 1
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(septid)+CLength(oint)+CLength(qqclub)+CLength(announce)+CLength(board))
	return Head+Body
}
//�޸ļ����Ա��ɫ 1219
function GetSeptFour(msg,septid,oint,qqclub,announce){
	var Ver     = 1
	var MsgID   = msg
	var MsgType = 1
	var ACT     = 1
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(septid)+CLength(oint)+CLength(qqclub)+CLength(announce))
	return Head+Body
}
//�޸ļ����Ա��ɫ 1414
function GetSeptUseOrder(msg,id,str){
	var Ver     = 1
	var MsgID   = msg
	var MsgType = 1
	var ACT     = 1
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(id)+str)
	return Head+Body
}


//����������Ϣ 1781
function GetChatSend(str){
	var Ver     = 1
	var MsgID   = 1781
	var MsgType = 1
	var ACT     = 1
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(str)+"00012"+"000236"+"000235")
	return Head+Body
}



//���ͳǳظ��� 1781
function GetChCityName(cid,str){
	var Ver     = 1
	var MsgID   = 1027
	var MsgType = 1
	var ACT     = 1
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(cid)+CLength(str))
	return Head+Body
}















///////////////////////add by welchzhu
//�����������
//iFlag = 0,�̳ǹ��� ; iFlag=1 �龰����;iFlag = 2�̳�ʹ�ã�iFlag =3 �龰ʹ�� 
function GetBuyItem(iItemID,iItemCount,iFlag){
	var Ver     = "1"
	var MsgID   = "1408"
	var MsgType = "1"
	var ACT     = "0"
	if(iFlag !=0)
		ACT = iFlag.toString();
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iItemID)+CLength(iItemCount);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}

//ʹ�ü������Ƶ���
function GetUseSeptItem(iItemID,septID)
{
	var Ver     = "1"
	var MsgID   = "1415"
	var MsgType = "1"
	var ACT     = "0"

	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(septID)+CLength(iItemID);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}

//ʹ��Ӣ�ۿ�������
//iFlag = 0,�̳ǹ��� ; iFlag=1 �龰����;iFlag = 2�̳�ʹ�ã�iFlag =3 �龰ʹ�� 
function GetFoodItem(iItemID,iHeroID,iFlag)
{
	var Ver     = "1"
	var MsgID   = "1413"
	var MsgType = "1"
	var ACT     = "0"
	if(iFlag !=0)
		ACT = iFlag.toString();

		
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iHeroID)+CLength(iItemID);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body;
}

//�����Ԫ��
function GetBuyGold(iItemID,iNum)
{
	var Ver     = "1"
	var MsgID   = "1417"
	var MsgType = "1"
	var ACT     = "0"


		
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iItemID)+CLength(iNum);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body;
}


//��������
function GetBuyManyItems(items,counts)
{
	var Ver     = "1"
	var MsgID   = "1416"
	var MsgType = "1"
	var ACT     = "0"

	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	var len = items.length>counts.length?counts.length:items.length;
	len = len>5?5:len;
	var strr = CLength(len);
	for(var i=0;i<len;i++)
	{
		strr = strr+CLength(items[i]);
	}
	strr += CLength(len);
	for(var i=0;i<len;i++)
	{
		strr = strr+CLength(counts[i]);
	}
	
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}

//��ȡ�û����е���
//act ��ʾ����������������
function GetUserItems(act){
	var Ver     = "1"
	var MsgID   = "1409"
	var MsgType = "1"
	var ACT     = (act!=null)?act:0;
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey)))
	
	
	return Head+Body
}

//ʹ��buffer�����:�޲ε���ʹ
//iFlag = 0,�̳ǹ��� ; iFlag=1 �龰����;iFlag = 2�̳�ʹ�ã�iFlag =3 �龰ʹ�� 
function GetBufferItem(iCityID,iItemID,iIsForce,iFlag)
{
	var Ver     = "1"
	var MsgID   = "1400"
	var MsgType = "1"
	var ACT     = "0"
	//Ϊ�˻�ȡ��Ӧ��itemId�����⴦��
	//num = itemID*10+iFlag
	var num = iItemID*10+iFlag;
	ACT = num.toString();
	
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iCityID)+CLength(iItemID)+CLength(iIsForce);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}

//ʹ��Ǩ�Ƿ�
//iFlag = 0,�̳ǹ��� ; iFlag=1 �龰����;iFlag = 2�̳�ʹ�ã�iFlag =3 �龰ʹ�� 
function GetMoveCityItem(iCityID,iNewGrid,iItemID,iFlag)
{
	var Ver     = "1"
	var MsgID   = "1401"
	var MsgType = "1"
	var ACT     = "0"
	if(iFlag !=0)
		ACT = iFlag.toString();
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iCityID)+CLength(iNewGrid)+CLength(iItemID);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}
//��������
//iFlag = 0,�̳ǹ��� ; iFlag=1 �龰����;iFlag = 2�̳�ʹ�ã�iFlag =3 �龰ʹ�� 
function GetChangeItem(iNewNationID,iItemID,iFlag)
{
	var Ver     = "1"
	var MsgID   = "1402"
	var MsgType = "1"
	var ACT     = "0"
	if(iFlag !=0)
		ACT = iFlag.toString();
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iNewNationID)+CLength(iItemID);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}
//�������
//iListTpye: �������� ������ֻ��ȡֵ��1,2
//iFlag = 0,�̳ǹ��� ; iFlag=1 �龰����;iFlag = 2�̳�ʹ�ã�iFlag =3 �龰ʹ�� 
function GetSpeedBuildingItem(iListTpye,iCityID,iItemID,iFlag)
{
	var Ver     = "1"
	var MsgID   = "1403"
	var MsgType = "1"
	var ACT     = "0"
	if(iFlag !=0)
		ACT = iFlag.toString();
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iListTpye)+CLength(iCityID)+CLength(iItemID);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}
//��ļ����
//iListTpye: �������� ������ֻ��ȡֵ��3,4
//iFlag = 0,�̳ǹ��� ; iFlag=1 �龰����;iFlag = 2�̳�ʹ�ã�iFlag =3 �龰ʹ�� 
function GetSpeedArmyItem(iListTpye,iCityID,iItemID,iFlag)
{
	var Ver     = "1"
	var MsgID   = "1404"
	var MsgType = "1"
	var ACT     = "0"
	if(iFlag !=0)
		ACT = iFlag.toString();
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iListTpye)+CLength(iCityID)+CLength(iItemID);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}
//������Դ
//iFlag = 0,45-48 ��ʳ ľͷ �� ʯͷ
function GetBuyRItem(iCityID,iBuyCounts,iItemID)
{
	var Ver     = "1"
	var MsgID   = "1405"
	var MsgType = "1"
	var ACT     = "0"
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iCityID)+CLength(iBuyCounts)+CLength(iItemID);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}
//������Դ���Զһ�����
function GetBuyResItem(iType)
{
	var Ver     = "1"
	var MsgID   = "1412"
	var MsgType = "1"
	var ACT     = "0"
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iType);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}
//��Դת��
//iFlag = 0,�̳ǹ��� ; iFlag=1 �龰����;iFlag = 2�̳�ʹ�ã�iFlag =3 �龰ʹ�� 
function GetTransItem(iCityID,iNewWood,iNewIron,iNewStone,iItemID,iFlag)
{
	var Ver     = "1"
	var MsgID   = "1406"
	var MsgType = "1"
	var ACT     = "0"
	if(iFlag !=0)
		ACT = iFlag.toString();
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iCityID)+CLength(iNewWood)
			+CLength(iNewIron)+CLength(iNewStone)+CLength(iItemID);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}
//�˱���
//iFlag = 0,�̳ǹ��� ; iFlag=1 �龰����;iFlag = 2�ֿ�ʹ�ã�iFlag =3 �龰ʹ�� 
function GetTributaryItem(iCityID,iItemID,iFlag)
{
	var Ver     = "1"
	var MsgID   = "1407"
	var MsgType = "1"
	if(iFlag !=0)
		ACT = iFlag.toString();
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iCityID)+CLength(iItemID);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}

//��ȡ�û��ĵ��
function GetUserCoin()
{
	var Ver     = "1"
	var MsgID   = "1410"
	var MsgType = "1"
	var ACT     = "0"
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey)))
	
	return Head+Body
}
//���ͽ��
function getGoldMsg(iOtherUin,szNick,goldNum,addMsg)
{
	var Ver     = "1"
	var MsgID   = "1021"
	var MsgType = "1"
	var ACT     = "0"
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	var strr = CLength(iOtherUin)+CLength(goldNum)+CLength(szNick)+CLength(addMsg);
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	return Head+Body
}

////////////////////////�ʼ�ϵͳ����
//�����ʼ�
function getSendMailMsg(szContent,szTitle,ucType,iAttach,iRecver,szRecvName)
{
	var Ver     = "1"
	var MsgID   = "1750"
	var MsgType = "1"
	var ACT     = "0"
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	var strr = CLength(iRecver)+CLength(ucType)+CLength(iAttach)+CLength(szRecvName)+
				CLength(szTitle)+CLength(szContent);
				
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	return Head+Body;
}

//ɾ���ʼ�
function getDelMailMsg(mailArray,iPostion)
{
	var Ver     = "1"
	var MsgID   = "1751"
	var MsgType = "1"
	var ACT     = iPostion.toString();
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT));
	var len = mailArray.length>10?10:mailArray.length;
	var strr = CLength(len);
	for(var i=0;i<len;i++)
	{
		strr = strr+CLength(mailArray[i]);
	}
				
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	return Head+Body;
}

//��ȡ�ʼ�����
function getMailMsg(iMailID)
{
	var Ver     = "1"
	var MsgID   = "1752"
	var MsgType = "1"
	var ACT     = "0"
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	var strr = CLength(iMailID);
				
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	return Head+Body;
}

//�����ʼ��Ѷ�
function getSetMailReadMsg(mailArray)
{
	var Ver     = "1"
	var MsgID   = "1754"
	var MsgType = "1"
	var ACT     = "0"
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	var len = mailArray.length>10?10:mailArray.length;
	var strr = CLength(len);
	for(var i=0;i<len;i++)
	{
		strr = strr+CLength(mailArray[i]);
	}
				
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	return Head+Body;
}

//��ȡ�ʼ��б�
function getMailListMsg(ucType,ucSubType,iPos)
{
	var Ver     = "1"
	var MsgID   = "1753"
	var MsgType = "1"
	var ACT     = "0"
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	var strr = CLength(ucType)+CLength(ucSubType)+CLength(iPos);
				
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	return Head+Body;
}

function getMailUnRead()
{
		var Ver     = "1"
	var MsgID   = "1755"
	var MsgType = "1"
	var ACT     = "0"
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
				
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey)))
	
	return Head+Body;
}


//////////////////////////////////////////////////////////////////////////
/*
**    ==================================================================================================  
**     
**    �Է��ص����ݽ���
**    ����ҳ������ʾ        
**                       
**    ==================================================================================================  
*/

/*  
    1002������
    �����Լ��Ļ�����Ϣ 
*/

//1001������
function ShowLoginInfo(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")	{
		//�ж��û�δע���¼
		if(obj.CResult.iResultID == 1004){			
			var regUrl="register.htm"+window.location.search
			window.location=regUrl
			return false;
		}else{
			msgbox("Error:"+obj.CResult.iResultID+"<br><b>��ȡ�û���Ϣʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>");
			EnpClose()
			//ȷ��֮�󵽵�¼����
			//�ı�msgboxȷ�ϰ�ť�¼�
			$("msgbox_img1").onclick=function(){HI('msgbox');HI('maskbg');window.location="/index.html"}
			return false;
		}
	}
	if(obj.CAnsLogin.CResult.iResultID == 0){
		//����1002Э��
		objFlashEng.Send(GetMineInfo())
		//��ȡ�û����е���
		objFlashEng.Send(GetUserItems());	
		//��ȡ�û���ȯ
		setTimeout("checkUserItemsAndCoin()",3000)
		//��ȡ�û����ʼ���Ŀ
		objFlashEng.Send(getMailUnRead());
	}
}
//�û�δע�ᵹ��ʱ����
function doReDirection(t,Url){
	if(t>=0){
		$("login_lefttime").innerHTML = t;
		logintime--
	}else{
		window.location=Url
	}
}

//1002����
function ShowMineInfo(str){
	var MineInfo=eval('('+str+')');
	if(typeof(MineInfo.CResult) != "undefined")	{
		msgbox("Error:"+MineInfo.CResult.iResultID+"<br><b>��ȡ�û���Ϣʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(MineInfo.CResult.iResultID)+"!</span>");
		return false;
	}
	var z=MineInfo.CAnsGetMineInfo.CPlayerInfoToClient

	//�ж��Ƿ��Ƿ����������ƻ�Э�飬���½�ҡ����������֡����·ֳ���Ϣ
	if(MineInfo.CTMsgHead.llMsgAct== -1){		
		
		//��ʾҳ�����������Ϣ
		$("init_szNick").innerHTML = z.szNick;
		UName = z.szNick;
		curNationID = z.iPlayerNationID;
		//���ͷ��
		$("init_ucHeadPic").src = "/images/player/player_"+z.ucHeadPic+".jpg"
		//������Ϣ��ֵ
		curLeagueID = z.iLeagueID;
		curLeagueState = z.chLeagueRank;
		$("init_iLeagueName").innerHTML = curLeagueID==0?"����":z.szLeagueName;
		
		$("init_iUserPoint").innerHTML = z.iUserPoint;
		$("init_iPlayerNationID").innerHTML = ToNation(z.iPlayerNationID);		
		$("init_iUserSeq").innerHTML = z.iUserSeq;
		$("init_iUserRank").innerHTML = ToUserRank(1,z.iUserRank).UserTitle;
		$("init_iCulture").innerHTML = ToUserRank(3,z.iCulture).UserTitle;
		$("init_iForce").innerHTML = ToUserRank(2,z.iForce).UserTitle;		
		$("init_iGlod").innerHTML = z.iMoney;
		
		//�û�װ����ʼ��
		Outfit = z.CPlayerOutfit.achOutfit
		
		arrOwnCity = z.aiSubCity;
		arrOwnCity.push(z.iMainCity);
		
	}else{
		//�ж��û����ε�¼
		if(z.iOnlineTime == 0)$("guideDiv").style.display="block"
		//
		//���ñ������������ʱ���
		LocalTime = MineInfo.CAnsGetMineInfo.CResult.szResultMsg;  
		var now1 = new Date();
		now1.setTime(now1);
		LocalTime = now1.getTime()/1000-LocalTime;
		
		//��ʾҳ�����������Ϣ
		$("init_szNick").innerHTML = z.szNick;
		UName = z.szNick;
		curNationID = z.iPlayerNationID;
		//���ͷ��
		$("init_ucHeadPic").src = "/images/player/player_"+z.ucHeadPic+".jpg"
		//������Ϣ��ֵ
		curLeagueID = z.iLeagueID;
		curLeagueState = z.chLeagueRank;
		$("init_iLeagueName").innerHTML = curLeagueID==0?"����":z.szLeagueName;
		
		$("init_iUserPoint").innerHTML = z.iUserPoint;
		$("init_iPlayerNationID").innerHTML = ToNation(z.iPlayerNationID);
		
		$("init_iUserSeq").innerHTML = z.iUserSeq;
		$("init_iUserRank").innerHTML = ToUserRank(1,z.iUserRank).UserTitle;
		$("init_iCulture").innerHTML = ToUserRank(3,z.iCulture).UserTitle;
		$("init_iForce").innerHTML = ToUserRank(2,z.iForce).UserTitle;
		
		$("init_iGlod").innerHTML = z.iMoney;
		
		//�û�װ����ʼ��
		Outfit = z.CPlayerOutfit.achOutfit
		
		arrOwnCity = z.aiSubCity;
		arrOwnCity.push(z.iMainCity);		
		
		
		//����1003���������Ϣ
		//������������Э��
		CityID = z.iMainCity;
		objFlashEng.Send(GetMineCity(CityID,0));	
		
		
		//����������Ϣ
		objFlashEng.Send(getTaskList(1500,1))
		timekeep = setInterval("doInterval()",30000);
		
		//�ж��Ƿ�����״ε�¼
		var btime=z.iLastLoginTime
		now1.setTime(btime*1000);
		var svrtime=new Date()
		svrtime.setTime(MineInfo.CAnsGetMineInfo.CResult.szResultMsg*1000)		
		var timetmp=parseInt(MineInfo.CAnsGetMineInfo.CResult.szResultMsg,10)
		if(now1.getDate()!=svrtime.getDate()){
			$("everyday_uin").innerHTML= Uin
			$("everyday_uname").innerHTML= UName
			$("everyday_time").innerHTML= formattimeNOW(timetmp,false)
			SH("everyday")
			SH("maskbg")
		}	
	}
}
//var how_meny_times=1
//ÿ30�����city��Ϣ
function doInterval(){
	objFlashEng.Send(GetMineCity(CityID,0));
}
//������ʱ��iSerTime
function doSTimeShow(stime){
	var nowtime = formattimeNum(stime.getHours())+":"+formattimeNum(stime.getMinutes())+":"+formattimeNum(stime.getSeconds())
	$("serverTimeShow").innerHTML = nowtime
	stime.setTime(STime.getTime()+1000)
}

function ToUserRank(type,rank){
	for(var i=0;i<mbu.UserRank.length;i++){
		if(type == mbu.UserRank[i].RankType && 
			rank == mbu.UserRank[i].RankNumber)
		return mbu.UserRank[i]
	}
}
/*  
    1022������
    �������г��еĸ�Ҫ��Ϣ 
*/
function ShowMineAllCity(str){
	var MineCity=eval('('+str+')')
	if(typeof(MineCity.CResult) != "undefined")	{
		msgbox("Error:"+MineCity.CResult.iResultID+"<br><b>��ȡ����ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(MineCity.CResult.iResultID)+"!</span>");
		return false;
	}
	allCityName=MineCity.CAnsGetMyCity.astSubCity;
	var tempstr = "";
	for(var i=0;i<allCityName.length;i++){
		if(CityID != allCityName[i].iCityID){
			tempstr += "<div class='AllCityClass imghand' onclick=\"changeCity('"+allCityName[i].iCityID+"');\">";
			tempstr += allCityName[i].szCityName + "</div>";
		}
	}
	$("subCity").innerHTML = tempstr;
	$("showAllCity").style.height = 24*(i-1)+"px"
	arrOwnCity.length=0;
	for(var i=0;i<allCityName.length;i++){
		arrOwnCity.push(allCityName[i].iCityID)
	}
}


function changeCity(cityid){
	objFlashEng.Send(GetMineCity(cityid,0));
	//�л����ڳ�ͼ
	ShowTab('building',0)
	
	//��ʾ��TAB
	ShowRichTab(0,0,1);	
}

/*  
    1003������
    ���س��еĻ�����Ϣ 
*/

function ShowMineCity(str){
	var MineCity=eval('('+str+')')
	if(typeof(MineCity.CResult) != "undefined")	{
		msgbox("Error:"+MineCity.CResult.iResultID+"<br><b>��ȡ������Ϣʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(MineCity.CResult.iResultID)+"!</span>");
		return false;
	}
	//�������������͵�
	var CITY = MineCity.CAnsGetMineCity.CCityInfoToClient
	if(MineCity.CTMsgHead.llMsgAct== -1){
		if(CityID == CITY.iCityID){
			initSource(CITY)
			//��ʾ����
			initBuilding(CITY.achItem)
			//����1003���ص�������ϡ������Ƽ���������������飬�±� 0-51
			makeCityBuildRank(CITY)
		}
	}else{
		//���ͳ�����Ϣʱ��CITYID
		CityID = CITY.iCityID
		
		
		
		//��ʾҳ���ϵ���Դ��Ϣ
		initSource(CITY)
		
		
		
		//��ʾ����
		initBuilding(CITY.achItem)
		
		
		
		//����1003���ص�������ϡ������Ƽ���������������飬�±� 0-51
		makeCityBuildRank(CITY)
		
		
		
		//1022�������г�������	
		objFlashEng.Send(GetMineAllCity());
		
		
		
		
		//���÷�����ʱ�䵹��ʱ
		STime.setTime(MineCity.CAnsGetMineCity.iSerTime*1000);
		//����ʱ
		interSTime=clearInterval(interSTime)
		interSTime=setInterval("doSTimeShow(STime)",1000);
		
		//��ǰ���ڽ����еĽ����ȫ�����飬������ʾ���ڽ����еĽ�����
		arrCurBuild = [];
		arrCurWaterID = [];
		//���ݵ�ǰ�����ĸ���壬����list��,����ʾ����״̬
		 switch (listdivID) 
		 {
			case 1 :
				ShowBuildListDiv();
				break 
			case 2 :
				ShowTEListDiv();
				break 
			case 3 :
				ShowFOListDiv();
				break 
			case 4 :
				ShowARListDiv();
				break 
		}
		//1005��Ͻ�����ˮ�б�
	
		//���н������ˮ������
		var arr_astTaskID = CITY.astBuildTaskID.
			concat(CITY.astTechTaskID).
			concat(CITY.astFortTaskID).
			concat(CITY.astSoldierTaskID);
	
		// ���浽ȫ�ֵ�Task��
		gTask.clearAllTasks();
		if(arr_astTaskID.length==0){
			//���ԭ���Ķ�����ʾ
			delBuildTab(arr_astTaskID);
		}else{
			for (var i = 0; i < arr_astTaskID.length; ++i)
			{
				gTask.insertTaskID(arr_astTaskID[i]);
			}
		
			//��10���η���
			for (var start = 0, step = 10;  start < arr_astTaskID.length; start += step)
			{
				var newa = arr_astTaskID.slice(start, start + step);
				objFlashEng.Send(GetBuildingTask(newa));
				gTask.incCount(); //ÿ����һ������, ����+1
			}
		}
		//1019������¶����б�
		objFlashEng.Send(GetArmyList(1,CityID))
	}
}
function initSource(obj){
	$("init_szCityName").innerHTML = obj.szCityName;	
	$("CurCityMPName").innerHTML = obj.szCityName;	
	$("CurCityMPGrid").innerHTML = ToXY(obj.iGridID);
	$("init_iWoodCount").innerHTML = obj.iWoodCount;	
	$("init_iWoodMax").innerHTML = obj.iWoodMax;	
	$("init_iWoodPerhour").innerHTML = obj.iWoodPerhour;	
	$("init_iIronCount").innerHTML = obj.iIronCount;	
	$("init_iIronPerhour").innerHTML = obj.iIronPerhour;	
	$("init_iIronMax").innerHTML = obj.iIronMax;	
	$("init_iFoodCount").innerHTML = obj.iFoodCount;	
	$("init_iFoodPerhour").innerHTML = ((obj.iFoodPerhour-obj.iFoodExpend)<=0)?"<span title='ÿСʱ�������ĳ�����ʳ��������' class='t_red'>"+(obj.iFoodPerhour-obj.iFoodExpend)+"</span>":(obj.iFoodPerhour-obj.iFoodExpend); //ʵ��ÿСʱ����,�������
	$("init_iFoodMax").innerHTML = obj.iFoodMax;	
	$("init_iStoneCount").innerHTML = obj.iStoneCount;	
	$("init_iStoneMax").innerHTML = obj.iStoneMax;	
	$("init_iStonePerhour").innerHTML = obj.iStonePerhour;	
	$("init_iPopulationLeft").innerHTML = obj.iUsedPopulation;	//��ǰ�����˿���
	$("init_iPopulationCount").innerHTML = obj.iPopulationCount;
	nWood = obj.iWoodCount;
	nIron = obj.iIronCount;
	nFood = obj.iFoodCount;
	nStone = obj.iStoneCount;	
	nPop = obj.iPopulationCount-obj.iUsedPopulation;	
	curGridID = obj.iGridID
	curFoodExpend = obj.iFoodExpend
	
	
	
	//����buffͼ����ʾ
	var arrbuff=obj.CityBuff.astCityBuff
	var arrImg=$("CurCityStatu").getElementsByTagName("img");
	for(var i=0;i<arrImg.length;i++)
	{
		arrImg[i].className = "fgray border_hui imghand";
		arrImg[i].style.background = "url(/images/icon_buff.gif) -"+20*i+"px 0px";
		arrImg[i].style.width = "20px";
		arrImg[i].style.height = "20px";
	}
	//��ʼ��ʾ��ΪĬ��hint
	arrImg[0].title = "˫������ ����\n�������";
	arrImg[1].title = "����� ����\n�������";
	arrImg[2].title = "��ս�� ����\n�������\nʹ�ú�48Сʱ�ڲ���ȡ����";
	arrImg[3].title = "����ֿ� ����\n�������";
	arrImg[4].title = "�����ӳ� ����\n�������";
	arrImg[5].title = "ʵ����֮ ����\n�������";
	arrImg[6].title = "���ʵ֮ ����\n�������";
	arrImg[7].title = "��ľ�Ա� ����\n�������";
	arrImg[8].title = "�ճǼ� ����\n�������";
	
	//���ݷ���ֵ��ʾ��ȷ��Ϣhint
	for(var i=0;i<arrbuff.length;i++)
	{
		switch(arrbuff[i].iBuffID){
			case 100:
				arrImg[0].className = "border_hui imghand";//���ּӳ�����200
				arrImg[0].title = "˫������\n����ʱ��:"+formattimeNOW(arrbuff[i].iEndTime,true)+"\n�������";
				break
			case 102:
				arrImg[1].className = "border_hui imghand";//�����200
				arrImg[1].title = "�����\n����ʱ��:"+formattimeNOW(arrbuff[i].iEndTime,true)+"\n�������";
				break
			case 101:
				arrImg[2].className = "border_hui imghand"; //��սЧ��101
				arrImg[2].title = "��ս��\n����ʱ��:"+formattimeNOW(arrbuff[i].iEndTime,true)+"\n�������";
				break
			case 104:
				//arrImg[1].className = "border_hui";//104vipЧ��
				break
			case 200:
				arrImg[3].className = "border_hui imghand";//�ֿ���������200
				arrImg[3].title = "����ֿ�\n����ʱ��:"+formattimeNOW(arrbuff[i].iEndTime,true)+"\n�������";
				//����ֿ���ʾ��ɫ����					
				$("init_iWoodMax").innerHTML = "<span title='ʹ��������ֿ���ߣ�����ʱ��:"+formattimeNOW(arrbuff[i].iEndTime,true)+"' class='t_green'>"+obj.iWoodMax+"</span>";				
				$("init_iIronMax").innerHTML = "<span title='ʹ��������ֿ���ߣ�����ʱ��:"+formattimeNOW(arrbuff[i].iEndTime,true)+"' class='t_green'>"+obj.iIronMax+"</span>";				
				$("init_iFoodMax").innerHTML = "<span title='ʹ��������ֿ���ߣ�����ʱ��:"+formattimeNOW(arrbuff[i].iEndTime,true)+"' class='t_green'>"+obj.iFoodMax+"</span>";				
				$("init_iStoneMax").innerHTML = "<span title='ʹ��������ֿ���ߣ�����ʱ��:"+formattimeNOW(arrbuff[i].iEndTime,true)+"' class='t_green'>"+obj.iStoneMax+"</span>";	
				
				
				break
			case 201:
				arrImg[4].className = "border_hui imghand";//���ӳ�����Դ����201
				arrImg[4].title = "�����ӳ�\n����ʱ��:"+formattimeNOW(arrbuff[i].iEndTime,true)+"\n�������";
				break
			case 202:
				arrImg[5].className = "border_hui imghand";//��Դ(��ʾ)����������Ϊ�Ŵ�202
				arrImg[5].title = "ʵ����֮\n����ʱ��:"+formattimeNOW(arrbuff[i].iEndTime,true)+"\n�������";
				break
			case -202:
				arrImg[6].className = "border_hui imghand";//��Դ(��ʾ)����������Ϊ��С-202
				arrImg[6].title = "���ʵ֮\n����ʱ��:"+formattimeNOW(arrbuff[i].iEndTime,true)+"\n�������";
				break
			case 203:
				arrImg[7].className = "border_hui imghand";//��ľ�Ա�203
				arrImg[7].title = "��ľ�Ա�\n����ʱ��:"+formattimeNOW(arrbuff[i].iEndTime,true)+"\n�������";
				break
			case -203:
				arrImg[8].className = "border_hui imghand";//�ճǼ�-203
				arrImg[8].title = "�ճǼ�\n����ʱ��:"+formattimeNOW(arrbuff[i].iEndTime,true)+"\n�������";
				break
		}
	}
}
//��ʾ����
function initBuilding(arrBuildingList){
	//���Name����
	var arrBuildingName=[];	
	var a=PackArr(arrBuildingList,19)	
	for (i=0; i<19; i++) {
		arrBuildingName.push(mb.Buidings[i].BuildingName);
	}
	//��flash���͵ȼ���Name����
	objFlashCity.initShowBuild(a,arrBuildingName)
	
}
//����1003���ص�������ϡ������Ƽ���������������飬�±� 0-51
function makeCityBuildRank(CITY){
	arrCityBuildRank.length = 0; //�������
	
	arrCityBuildRank = PackArr(CITY.achItem,19).
		concat(PackArr(CITY.achTech,12)).
		concat(PackArr(CITY.ashFort,8)).
		concat(PackArr(CITY.ashArmy,11));

	//���������Դҳ��tips	
	$("resource_wood").hint = "�ֳ� "+arrCityBuildRank[0] + "��"
	$("resource_food").hint = "ũ�� "+arrCityBuildRank[1] + "��"
	$("resource_stone").hint = "ʯ�ϳ� "+arrCityBuildRank[2] + "��"
	$("resource_iron").hint = "��ɽ "+arrCityBuildRank[3] + "��"
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


/*  1005������
���س��еĽ��������б���Ϣ  
*/
function ShowBuildingTask(str,init){
	var BuildingTask=eval('('+str+')');
	if(typeof(BuildingTask.CResult) != "undefined")	{
		msgbox("Error:"+BuildingTask.CResult.iResultID+"<br><b>��ȡ����ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(BuildingTask.CResult.iResultID)+"!</span>");	
		return false;
	}
	var arrBuilding=BuildingTask.CAnsGetMineBuildingTask.astBuilding;
	
	for (var i = 0; i < arrBuilding.length; ++i)
	{
		gTask.setTaskData(arrBuilding[i].szWaterID, arrBuilding[i]);
	}
	
//	// ����task�����ݶ����˲���ʾ
//	if (!gTask.isAllTaskHasData())
//	{
//		return false;
//	}
	// ������Ӧ�����˲���ʾ
	// ���ظ�������������, ���ܶ����ӦҪ����
	gTask.decCount(); //ÿ�յ�һ����Ӧ, ������1
	if (gTask.countReq > 0)
	{
		return false;
	}
	gTask.eraseNullTask(); // ���û�����ݵ���Ч��ˮ

	//��ǰ���ڽ����еĽ����ȫ�����飬������ʾ���ڽ����еĽ�����
	for(var i=0;i<arrBuilding.length;i++)
	{	
		arrCurBuild.push(arrBuilding[i].iBuildingID)
		arrCurWaterID.push(arrBuilding[i].szWaterID)		
	} 
	
	//ʹFlash��ʾ���ڽ�����
	objFlashCity.ShowDoing(arrCurBuild.length == 0 ? 0 : arrCurBuild[0]);
	
	for (var i = 0; i < Task.NAMES.length; ++i)
	{
		var n = Task.NAMES[i];
		//$(n + "_SpeedUp").style.display = gTask["arr" + n].length > 0 ? "block" : "none";

		// ��ɾ���ɵ���
		var TabLength = $(n + "Tab").rows.length;
		for (var m = 1; m < TabLength; ++m)
		{
			$(n + "Tab").deleteRow(-1);
		}
		
		var arr = gTask["arr" + n];

		// �������Ϊ����䡰���ޡ�
		if (arr.length == 0)
		{
			var otr = $(n + "Tab").insertRow(-1);
			var checkTd = document.createElement("td");
			checkTd.innerHTML = "����";
			otr.appendChild(checkTd);
		}
		else
		{
			for (var j = 0; j < arr.length; ++j)
			{
				var dat = arr[j].taskData;
				addBuildTab(n + "Tab", dat.iBuildingID, (n == "IT" || n == "TE" ? dat.iData : dat.iReserve2),
					dat.iStartTime, dat.iNeedTime, dat.szWaterID,
					dat.chStatus);
			}
		}
	}

	//���ݵ�ǰ�����Ĳ㣬����list��,����ʾ����״̬
		//���ݵ�ǰ�����ĸ���壬����list��,����ʾ����״̬
		 switch (listdivID) 
		 {
			case 1 :
				ShowBuildListDiv();
				break 
			case 2 :
				ShowTEListDiv();
				break 
			case 3 :
				ShowFOListDiv();
				break 
			case 4 :
				ShowARListDiv();
				break 
		}
}

//���ɱ��
function addBuildTab(tabid,name,data,starttime,time,waterid,status)
{
    var otr = $(tabid).insertRow(-1);
    var checkTd=document.createElement("td");
    checkTd.innerHTML = mb.Buidings[transToArrID(name)].BuildingName;
    var otd0 = document.createElement("td");
    var otd1 = document.createElement("td");
	otd1.id = waterid;
	
    
	
	var speedstr=""
	var typeName = waterid.slice(0,2);
	var desc = (typeName == "IT" || typeName == "TE" ? "��" : "��");
	otd0.innerHTML = (data) + desc;
	if(!status)
	{
		otd1.innerHTML = "������";
	}
	else
	{
		var t = (starttime + LocalTime + time) * 1000;
		otd1.innerHTML = getTimeDiff(t);
		var timerID = setInterval("diff("+t+", '"+waterid+"', '"+typeName+"')", 1000);
		gTask.setTaskTimer(typeName, timerID);
		//��ʾ����
		var speedup=""
		if(typeName == "IT")speedup="ShowMultiChose(1,1,1)"
		if(typeName == "TE")speedup="ShowMultiChose(1,1,2)"
		if(typeName == "FO")speedup="ShowMultiChose(1,3,3)"
		if(typeName == "AR")speedup="ShowMultiChose(1,3,4)"
		speedstr="<a href=\"javascript:"+speedup+
							";\" class=\"a_red\">����</a> "
	}

	var otd2 = document.createElement("td");
	otd2.align = "center";
/*	//�ж��Ƿ���ʾȡ��
	if(typeName == "IT" || typeName == "TE")
	{
    	
	}else{
		otd2.innerHTML = speedstr;
	}*/
	//090618�޸ģ�����Ƿ���ȡ��
	otd2.innerHTML = speedstr+"<a href=\"javascript:CancleTask('"+waterid+
						"');\" class=\"t_juhuang\">ȡ��</a>";
							
	checkTd.width="70";
	otd0.width="35";
	otd1.width="90";
	otd2.width="56";
	otd2.align="right";
    otr.appendChild(checkTd);
    otr.appendChild(otd0); 
    otr.appendChild(otd1); 
    otr.appendChild(otd2);
}

//����ʱ��
function diff(inputtime, waterid, typeName)
{
	var diffInt = inputtime - new Date().getTime();
	if (diffInt > 0)
	{
		if ($(waterid))
		{
			$(waterid).innerHTML = getTimeDiff(inputtime);
		}
	}
	else
	{
		//��ն�ʱ������
		gTask.clearTaskTimer(typeName);
		objFlashEng.Send(GetMineCity(CityID,0));	
		//���������б�������
		objFlashEng.Send(getTaskList(1500,1));
	}
}
//��ʽ��ʱ��,����Ϊ����
function formattime(inputtime){  
	var s=0;
	var h=0;
	var m=0;
	var d=0;
	if(inputtime <60){
		s = inputtime
		return "00:00:"+formattimeNum(s);
	}else if(inputtime>=60 && inputtime<3600){
		s = inputtime % 60
		m = Math.floor(inputtime/60)
		return "00:"+formattimeNum(m)+":"+formattimeNum(s);
	}else if(inputtime>=3600 && inputtime<86400){
		h = Math.floor(inputtime/3600)
		s = inputtime % 60
		m = Math.floor(inputtime/60)- h*60
		return formattimeNum(h)+":"+formattimeNum(m)+":"+formattimeNum(s);
	}else if(inputtime>=86400){
		d = Math.floor(inputtime/86400);
		h = Math.floor(inputtime/3600) - d*24
		s = inputtime % 60
		m = Math.floor(inputtime/60)- h*60-d*60*24
		return d +"�� "+ formattimeNum(h)+":"+formattimeNum(m)+":"+formattimeNum(s);
	}
}
function formattimeNum(num){
	if(num<10){
		return "0"+num;
	}else{
		return num;
	}
}
function delBuildTab(arr_astTaskID){
	for (var i = 0; i < Task.NAMES.length; ++i)
	{
		var n = Task.NAMES[i];
		var TabLength = $(n + "Tab").rows.length;
		for (var m = 1; m < TabLength; ++m)
		{
			$(n + "Tab").deleteRow(-1);
		}

		if (gTask["arr" + n].length == 0)
		{
			//�������Ϊ����䡰���ޡ�
			var otr = $(n + "Tab").insertRow(-1);
			var checkTd = document.createElement("td");
			checkTd.innerHTML = "����";
			otr.appendChild(checkTd);
			
		}
		$(n + "_SpeedUp").style.display = gTask["arr" + n].length > 0 ? "block" : "none";
	}
	objFlashCity.ShowDoing(0);
}



/*
    1007������
    ����ҳ����Ϣ
*/
function ShowDoBuild(str){
	var objBuild=eval('('+str+')');	
	if(typeof(objBuild.CResult) != "undefined")	{
		msgbox("Error:"+objBuild.CResult.iResultID+"<br><b>����ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(objBuild.CResult.iResultID)+"!</span>");
		return false;
	}else{
		var CITY=objBuild.CAnsBuild.CCityInfoToClient;
		//������ʾҳ����������Ϣ
		initSource(CITY);
		//���н������ˮ������
		var arr_astTaskID = CITY.astBuildTaskID.
			concat(CITY.astTechTaskID).
			concat(CITY.astFortTaskID).
			concat(CITY.astSoldierTaskID);
	
		// ���浽ȫ�ֵ�Task��
		gTask.clearAllTasks();
		if(arr_astTaskID.length==0){
			//���ԭ���Ķ�����ʾ
			delBuildTab(arr_astTaskID);
		}else{
			for (var i = 0; i < arr_astTaskID.length; ++i)
			{
				gTask.insertTaskID(arr_astTaskID[i]);
			}
		
			//��10���η���
			for (var start = 0, step = 10;  start < arr_astTaskID.length; start += step)
			{
				var newa = arr_astTaskID.slice(start, start + step);
				objFlashEng.Send(GetBuildingTask(newa));
				gTask.incCount(); //ÿ����һ������, ����+1
			}
		}		
		ShowRichTab(0,0,1);	
		//���ݵ�ǰ�����ĸ���壬����list��,����ʾ����״̬
		 switch (listdivID) 
		 {
			case 1 :
				ShowBuildListDiv();
				break 
			case 2 :
				ShowTEListDiv();
				break 
			case 3 :
				ShowFOListDiv();
				break 
			case 4 :
				ShowARListDiv();
				break 
		}
	}
}

/*
    1008������
    ��ʾ��ѯ��ͼ���
*/
function ShowSearchMapN(str){
	var objBuild=eval('('+str+')');
	if(typeof(objBuild.CResult) != "undefined")	{
		msgbox("Error:"+objBuild.CResult.iResultID+"<br><b>��ѯʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(objBuild.CResult.iResultID)+"!</span>");
		return false;
	}else{
		/*//��ʾ����������
		//ɾ����������
		var TabLength=$("citymap_search_tab").rows.length;	
		for(var i=1;i<TabLength;i++){
			$("citymap_search_tab").deleteRow(-1);
		}
		//�����
		var otr = $("citymap_search_tab").insertRow(-1);
		for(i=1;i<4;i++){
			eval("var TD"+i+"=document.createElement('td')");
		}
			//������
			TD1.innerHTML=objBuild.CAnsSearchMap.szCityName;
			TD2.innerHTML="("+ToXY(objBuild.CAnsSearchMap.iGrid)+")";
			TD3.innerHTML="<a onclick='objFlashEng.Send(GetWorldMap("+objBuild.CAnsSearchMap.iGrid+",1))' href='#' class='a_yellow'>GO&gt;&gt;</a>";	
		for(i=1;i<4;i++){
			eval("otr.appendChild(TD"+i+")");
		}*/
		//����1006��ʾ����λ��
		objFlashEng.Send(GetWorldMap(objBuild.CAnsSearchMap.iGrid,1)); ///1005
	}
}


/*
    1009������
    ��ʾ�ղص�ͼ���
*/
function ShowFavMap(str){
	var objBuild=eval('('+str+')');
	/*---------������Ϣ����---------- will �� �Ǽ���*/
	/*if(typeof(objBuild.CResult) != "undefined")	{
		msgbox("Error:"+objBuild.CResult.iResultID+"<br><b>�ղ�ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(objBuild.CResult.iResultID)+"!</span>");
		return false;
	}
	---------������Ϣ������----------*/
	if(objBuild.CAnsCollectMap.CResult.iResultID!=0)	{
		msgbox("Error:"+objBuild.CAnsCollectMap.CResult.iResultID+"<br><b>�ղ�ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(objBuild.CAnsCollectMap.CResult.iResultID)+"!</span>");
		return false;
	}
	else if(objBuild.CAnsCollectMap.CResult.iResultID == 0){	
		//act 1�ղ�
		if(objBuild.CTMsgHead.llMsgAct == 1)msgbox("�ղسɹ���������ҵ��ղؼв鿴!")
		
		//��ʾ����������
		//ɾ����������
		var TabLength=$("citymap_fav_tab").rows.length;	
		for(var i=1;i<TabLength;i++){
			$("citymap_fav_tab").deleteRow(-1);
		}
		//������
		var arrResult = objBuild.CAnsCollectMap.CCollectMapSuit.astCollectMaps;
		for(n=0;n<arrResult.length;n++){
			var otr = $("citymap_fav_tab").insertRow(-1);
			for(i=1;i<4;i++){
				eval("var TD"+i+"=document.createElement('td')");
			}
			//�ղ�����
			TD1.innerHTML= "<a onclick='objFlashEng.Send(GetWorldMap("+arrResult[n].iGrid+",1))' href='#' class='a_yellow'>"+arrResult[n].szDesc;+"</a>";	
			//�ղ�����
			TD2.innerHTML="("+ToXY(arrResult[n].iGrid)+")";
			//���ܰ�ť
			TD3.innerHTML="<img title=\"����޸�����\" class=\"imghand\" onclick=\"callModFavMap("+arrResult[n].iGrid+",'"+arrResult[n].szDesc+"',"+n+")\" src=\"images/map_tab1_edit.gif\" width=\"19\" height=\"19\" />&nbsp;<img title=\"���ɾ��������\" class=\"imghand\" onclick=\"DelFavMap("+arrResult[n].iGrid+","+n+")\" src=\"images/map_tab1_del.gif\" width=\"19\" height=\"19\" />";	
			TD1.height="20";
			for(i=1;i<4;i++){
				eval("otr.appendChild(TD"+i+")");
			}	
		}
	}
}

/*
    1006������
    ��ʾ��ͼ
*/
function ShowMaps(str){
	var objMap=eval('('+str+')');
	if(typeof(objMap.CResult) != "undefined")	{
		msgbox("Error:"+objMap.CResult.iResultID+"<br><b>��ʾ��ͼʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(objMap.CResult.iResultID)+"!</span>");
		return false;
	}
	tempMapstr = "";
	//��ǰ���ĸ�����
	curMapGridID = objMap.CAnsGetWorldMap.astGrid[24].iGridID;
	//������ͼ�ڵ����⣬�����ͼ�ڵ�����
	var dearr=[6,5,4,3,2,1,0,13,12,11,10,9,8,7,20,19,18,17,16,15,14,27,26,25,24,23,22,21,34,33,32,31,30,29,28,41,40,39,38,37,36,35,48,47,46,45,44,43,42]
	for(i=0;i<49;i++){
		//�ж��ǵڼ���
		var x=0;
		switch (dearr[i]%7) 
		{
		 case 0 :
			x=0;
			break 
		 case 1 :
			x=1;
			break 
		 case 2 :
			x=2;
			break 
		 case 3 :
			x=3;
			break 
		 case 4 :
			x=4;
			break 
		 case 5 :
			x=5;
			break 
		 case 6 :
			x=6;
			break 
		}
		//��������Ͷ�����ʾ����
		doShowGrid(objMap.CAnsGetWorldMap.astGrid[dearr[i]],dearr[i],x)	
	}
	
	//ģ����ѡ�е������1:�õ���ǰѡ�����
	z=0;
	for(b=0;b<49;b++){
		try{
			if(typeof($("map_bgmask"+b).height) == "number")z=b;
		}catch(x){
		}
	}
	
	//��ʾ���ճ�����ϵ��ַ���
	$("citymap_grid").innerHTML = tempMapstr;
	tempMapstr = '';
	
	//ȷ������ʱ���е�ͼ����
	if(z == 0 || objMap.CTMsgHead.llMsgAct==1)z=24
	//ģ����ѡ�е������2:ģ����
	$("citymap_grid").getElementsByTagName("img")[dearr[z]*2].click()
	
	
	
	//��ʾXY����
	var int = objMap.CAnsGetWorldMap.astGrid[0].iGridID
	var xxx,yyy
	if(int>=0 && int<1000){
		xxx=0;
		yyy=int;
	}else if(int>=1000 && int<1000000){
		xxx = Math.floor(int/1000);
		yyy = int-xxx*1000;
	}
	//���������±꣬����XY��������������ֵ
	for(i=1;i<8;i++){
		eval("$('citymap_y"+i+"').innerHTML = '"+ (yyy+i-1) +"'");
		eval("$('citymap_x"+i+"').innerHTML = '"+ (xxx+i-1) +"'");
	}
	
}
//��ϵ�ͼ���ַ���
function doShowGrid(o,i,x){
	var cityid = o.chGridType ? o.iData : 0;
	//�жϿյ�������ͼƬ��ʾ
	var classofpic;
	var newX = getNewPos((i-x)/7,x)[0];//ͼƬ��߾�
	var newY = getNewPos((i-x)/7,x)[1];//ͼƬ�ϱ߾�
	var oldX =newX
	var oldY =newY
	var nowNation = o.chCityNationID
	var nowPop = o.iPopulationCount;
	var nowName = o.szCityName;
	if(o.chGridType == 2){
		//�����
		var arrTmpName=["","�����ݵ�","�м��ݵ�","�߼��ݵ�"]
		classofpic = "map_r_"+o.chCityNationID;
		nowNation = 0;
		nowPop = ""
		nowName = arrTmpName[o.chCityNationID]
	}else if(o.chGridType == 0){
		//�յ���ʾ3�ֵر�
		if(o.iData == 1) classofpic = "map_g_1";
		if(o.iData == 2) classofpic = "map_g_5";//�յ���ͼƬ
		if(o.iData == 3) classofpic = "map_g_4";
		if(o.iData == 4) classofpic = "map_g_3";
		howbigpic = "m"
		nowName = "ĬĬ���ŵĻĵ�"
	}else if(o.chGridType == 1){	
		//�ǳ�
		newY = newY -15;
		//���ݳǳع�ģ�ж�ͼƬ
		if(o.iPopulationCount<200){
			classofpic = "map_i_s map_icon_city"
		}else if(o.iPopulationCount>=200 && o.iPopulationCount<4000){
			classofpic = "map_i_m map_icon_city"
		}else if(o.iPopulationCount>=4000 && o.iPopulationCount<20000){
			classofpic = "map_i_b map_icon_city"
		}else if(o.iPopulationCount>=20000 && o.iPopulationCount<60000){
			classofpic = "map_i_c map_icon_city"
		}else if(o.iPopulationCount>=60000){
			classofpic = "map_i_d map_icon_city"
		}
	}
	
	
	//tips��ʾ
	var tempTips=nowName;
	//�ж��Ƿ���У�ֻ�г�����ʾ�˿ںͼ���
	if(nowNation)tempTips+="<br>�˿ڣ�"+nowPop+"<br>���壺"+o.szLeagueName
	//�ж��Ƿ������,�жϲ����������࣬������
	var arrkind=[1,2,4,8,16,32]
	var M=["���","��Դ","����","����","����","Ӣ��"]
	var strprize=""
	for(k=0;k<6;k++){
		if(arrkind[k] == (arrkind[k]&o.iMoney)){// ������
			strprize += M[k]+" ";
		}
	}			
	if(!nowNation && strprize!='')tempTips+="<br>������"+ strprize
	tempTips+="<br>���꣺"+ToXY(o.iGridID);
	
	tempMapstr += "<span style='margin:"+(newY+9)+"px 0 0 "+(newX+11)+"px;width:12px;height:13px;position:absolute;z-index:1001;color:#ffffff'>"+ToNation(nowNation)+"</span><img src=\"\/images\/blank.gif\" style='margin:"+(oldY+7)+"px 0 0 "+(oldX+20)+"px;width:46px;height:24px;position:absolute;z-index:1004;' class='imghand' onclick=\"mapTab("+cityid+","+o.iGridID+","+o.chGridType+",'"+o.szCityName+"',"+o.iPopulationCount+",'"+o.szCityOwnerNick+"',"+o.chCityNationID+","+o.iUserPoint+",'"+o.szLeagueName+"',"+o.iCulture+","+o.iForce+","+o.iMoney+","+o.iCityOwner+");setThisBg("+oldY+","+oldX+","+i+")\" hint=\""+tempTips+"\"><img src=\"\/images\/blank.gif\" width=\"58\" height=\"58\" class=\"map_icon_size "+classofpic+"\"  style=\"position:absolute;margin:"+newY+"px 0 0 "+newX+"px;z-index:1000;\"  hint=\""+tempTips+"\" \/>";	
}
function setThisBg(marginT, marginL,i) {
	for(b=0;b<49;b++){
		try{
			$("citymap_grid").removeChild($("map_bgmask"+b))
		}catch(x){
		}
	}
	var objD = document.createElement("img");
	objD.id = "map_bgmask"+i;
	objD.src = "images/citymap_bg_mask.gif";
	objD.width = 92;
	objD.height = 45;
	var oS = objD.style;
	oS.display = "block";	
	oS.margin = marginT+"px 0 0 "+(marginL-1)+"px";
	oS.position = "absolute";
	oS.zIndex = 991;
	$("citymap_grid").appendChild(objD);
}
//��ʾtab����
//ת����б45�ӽǹ�ʽ����лrapier�����ṩ
function getNewPos(girdx, girdy) {
	var mapwidth = 644
	var mapheight = 322
	nx=Math.ceil((girdx+girdy)*mapwidth/14)
	ny=Math.ceil((7+girdx-girdy)*mapheight/14)
	return [nx,ny]
}
//��ʾtab����
function mapTab(cityid,gridid,type,name,people,owner,nation,point,league,wen,wu,gold,uin){
	
	
	//����tab��Ϣ
	writeMapTabHtml("citymaptab_name_",name)
	writeMapTabHtml("citymaptab_pop_",people)
	writeMapTabHtml("citymaptab_country_",ToNation(nation))
	writeMapTabHtml("citymaptab_ke_",ToNationKe(nation))
	writeMapTabHtml("citymaptab_xy_",ToXY(gridid))
	writeMapTabHtml("citymaptab_owner_",owner)
	writeMapTabHtml("citymaptab_point_",ToUserRank(1,point).UserTitle)
	writeMapTabHtml("citymaptab_league_",league)
	writeMapTabHtml("citymaptab_wen_",toUserTitle(wen,3))
	writeMapTabHtml("citymaptab_wu_",toUserTitle(wu,2))
	writeMapTabHtml("citymaptab_gold_",gold)
	//���˵�����Ϣ��
	$('citymaptab_owner_self').innerHTML ="<span class=t_yellow>"+mailThisName(uin,owner)+"</span>"
	$('citymaptab_owner_other').innerHTML ="<span class=t_yellow>"+mailThisName(uin,owner)+"</span>"
	
	if(name==""){
		curFavName = "ĬĬ���ŵĻĵ�";
		curFavOwnerName = "�ĵ�"
	}else{
		curFavOwnerName = owner;
		curFavName = name;	
	}		
/*  chGridType
	EGT_SPACE = 0,  ///< �յ�
    EGT_CITY = 1,   ///< ����
    EGT_RANDOM = 2, ///< �����
    EGT_NPC = 3,    ///< NPC
    EGT_LOCK = 4,   ///< ����
    EGT_SYSTEM = 5, ///< ϵͳԤ��*/
	switch (type)
		{
		 case 0 :
		 	$('citymaptab_name_nobody').innerHTML = 'ĬĬ���ŵĻĵ�';			
		 	$('citymaptab_xy_nobody').innerHTML = ToXY(gridid);
			ShowMapTab("nobody");	
			break 
		 case 1 :
		 	//�ж��Ƿ����Լ��ĳ���
		 	var isOwn = false;
		 	for(i=0;i<arrOwnCity.length;i++){
				if(cityid == arrOwnCity[i]){
					isOwn = true;
				}
			}
			if(isOwn){	
				//�ж��Ƿ��ǵ�ǰ����
				$("citymaptab_isCurCity").style.display="block";
				if(CityID == cityid){
					$("citymaptab_isCurCity").style.display="none";
				}
				//�Լ��ĳ���
				ShowMapTab("self");
			}else{
				//İ���˵ĳ���
				ShowMapTab("other");
			}
			break 
		 case 2 :
			//��������
			$('citymaptab_name_random').innerHTML = "�ݵ�";
			switch(nation){
				case 1:
					$('citymaptab_class_random').innerHTML = "�����ݵ�"
					break;
				case 2:
					$('citymaptab_class_random').innerHTML = "�м��ݵ�"
					break;
				case 3:
					$('citymaptab_class_random').innerHTML = "�߼��ݵ�"
					break;
			}
			var c = new Date();
			if(c.getHours()>=18){
				$('citymaptab_endtime_random').innerHTML = (c.getMonth()+1)+"��"+(c.getDate()+1)+"�� 18:00:00";
			}else{
				$('citymaptab_endtime_random').innerHTML = (c.getMonth()+1)+"��"+c.getDate()+"�� 18:00:00";
			}
			$('citymaptab_much_random').innerHTML = "<span style='color:red'>"+point+"</span> ";
			curFavOwnerName = "�ݵ�"
			
			//�жϲ����������࣬������
			var arrkind=[1,2,4,8,16,32]
			var M=["���","��Դ","����","����","����","Ӣ��"]
			var strprize=""
			for(i=0;i<6;i++){
				if(arrkind[i] == (arrkind[i]&gold)){// ������
					strprize += M[i]+" ";
				}
			}			
			$('citymaptab_prize_random').innerHTML = strprize;
			
			//������������
			var arrb=league.split("|")
			var strarmy=""
			for(i=0;i<arrb.length-1;i++){ 
				strarmy+="<img src='/images/blank.gif' width='20' height='20' style='background:url(/images/icon_randomforce.gif) -"+(arrb[i].split(":")[0]-129)*20+"px 0px no-repeat' align='absmiddle' /> "+mb.Buidings[transToArrID(arrb[i].split(":")[0])].BuildingName+"("+arrb[i].split(":")[1]+"��)<br>"
			} 
			$('citymaptab_army_random').innerHTML = strarmy;
			
			ShowMapTab("random");			
			break 
		 case 3 :
			ShowMapTab("nobody");
			break 
		 case 4 :
			ShowMapTab("nobody");
			break 
		 case 5 :
			ShowMapTab("nobody");
			break 
		}
	curFavGrid = gridid;
}
//д���ͼtab3�ֵ�ͼ�����ݺ���
function writeMapTabHtml(divid,str){
	var arrTabDiv = ["other","random","self"]
	for(i=0;i<arrTabDiv.length;i++){
		try {
     		eval("$('"+divid+arrTabDiv[i]+"').innerHTML = '"+ str+"'");
      	}
      	catch(e) {           
      	}  
	}
}


/*
    1004������
    ȡ������
*/
function ShowCancleTask(str){
	var objT=eval('('+str+')');
	if(typeof(objT.CResult) != "undefined")	{
		msgbox("Error:"+objT.CResult.iResultID+"<br><b>ȡ��ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(objT.CResult.iResultID)+"!</span>")
		return false;
	}else{
		objFlashEng.Send(GetMineCity(CityID,0));
	}
}


/*
    1019������
    ��ʼ��������Ϣʱ����
*/
function ShowArmyList(str){
	var objA=eval('('+str+')');
	if(typeof(objA.CResult) != "undefined")	{
		msgbox("Error:"+objA.CResult.iResultID+"<br><b>���¶���ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(objA.CResult.iResultID)+"!</span>")
		return false;
	}
	var A=objA.CAnsArmySummary.astArmyHand;
	//act=0Ϊ���½Ǹ�Ҫ��act��0Ϊ�������
	if(objA.CTMsgHead.llMsgAct==0){
		//�ж��Ƿ�ȫ������������פ��iStat=3��			
		var isallUN=true  
		for(i=0;i<A.length;i++){
			if(A[i].iStat!=3)isallUN=false
		}
		
		if(A.length==0 || isallUN==true){
			//ȫ����������
			
			var TabLength=$("AMYTab").rows.length;	
			for(var i=0;i<TabLength-1;i++){
				$("AMYTab").deleteRow(-1);
			}		
			var otr = $("AMYTab").insertRow(-1);
			var TD1=document.createElement('td')
			TD1.height="18";
			TD1.width ="24%";
			TD1.innerHTML="����"
			otr.appendChild(TD1);		
		}else{
			//��ȫ����������
			
			//���AMYTab
			var TabLength=$("AMYTab").rows.length;	
			for(var i=0;i<TabLength-1;i++){
				$("AMYTab").deleteRow(-1);
			}	
			//��վ��¶���
			timecountRich.length=0;
			ttimeL.length=0;
			nnameL.length=0;
			//����TR
			for(i=0;i<A.length;i++){
				if(A[i].iStat!=3){
					var otr = $("AMYTab").insertRow(-1);
					for(n=1;n<5;n++){
						eval("var TD"+n+"=document.createElement('td')");
					}
					TD1.innerHTML=toArmyType(A[i].iType)+" "+toFangXiang(A[i].iStat);
					TD2.innerHTML=(A[i].iType==6) ? "�ݵ�" : (A[i].iType==2)?"�ػ��³�":A[i].szMarrowCityName;	
					TD2.innerHTML+='<span title="����鿴�õ�" class="imghand" onclick="ShowTab(\'citymap\',2);objFlashEng.Send(GetWorldMap('+A[i].iTarGrid+'))">('+ToXY(A[i].iTarGrid)+')</span>'
					//��Ӷ�ʱ��timecountRich
					ttimeL.push((A[i].ileaveTime+A[i].iMarchTime+LocalTime)*1000);
					nnameL.push("iTDListLeftTime"+i);	
					TD4.innerHTML="&nbsp;"
					//�ٻص��ж�
					if(A[i].iStat ==1)TD4.innerHTML="<a class='t_juhuang' href='javascript:void(0)' onclick='objFlashEng.Send(GetCancleArmy(\""+A[i].stCarmyWaterID+"\",0));curArmyIng=\""+A[i].stCarmyWaterID+"\"' title='����3����ֻ��ʹ�õ����ٻأ�3����������ٻ�'>�ٻ�</a>";
					
					
					TD1.height="18";
					TD1.width ="24%";
					TD2.width ="35%";
					TD3.width ="23%";
					TD3.id="iTDListLeftTime"+i;
					for(m=1;m<5;m++){
						eval("TD"+m+".className = toArmyTypeColor(A[i].iType)");
						eval("otr.appendChild(TD"+m+")");
					}
				}
			}
			_dotime();
		}
	}
	//���������������
	else if(objA.CTMsgHead.llMsgAct==100)
	{
		ShowARingDiv(A)
		addZindex();
	}
	//�㽫̨��������
	else if(objA.CTMsgHead.llMsgAct==200)
	{
		ShowDJ_Army(A)
	}
}
function __timeout(inputtime,inputInterval){
	var starttimeL = new Date();
	starttimeL.setTime(inputtime);	
	var nowL = new Date();
	nowL.setTime(nowL);
	var sectimeold,secondsold,msPerDay,e_daysold,daysold,e_hrsold,hrsold,e_minsold,minsold,e_seconds,seconds,timeoldL
	timeoldL = starttimeL - nowL;
	if (timeoldL>0){
		sectimeold=timeoldL/1000 
		secondsold=Math.floor(sectimeold); 
		msPerDay=24*60*60*1000
		e_daysold=timeoldL/msPerDay 
		daysold=Math.floor(e_daysold); 
		e_hrsold=(e_daysold-daysold)*24; 
		hrsold=Math.floor(e_hrsold); 
		e_minsold=(e_hrsold-hrsold)*60;
		minsold=Math.floor((e_hrsold-hrsold)*60); 
		e_seconds = (e_minsold-minsold)*60;
		seconds=Math.floor((e_minsold-minsold)*60); 
		if(hrsold<10)hrsold="0"+hrsold;
		if(minsold<10)minsold="0"+minsold;
		if(seconds<10)seconds="0"+seconds;
		try {
			if(daysold>0){
				$(inputInterval).innerHTML = daysold+"��"+hrsold+":"+minsold+":"+seconds;
			}else{
				$(inputInterval).innerHTML =  hrsold+":"+minsold+":"+seconds;			
			}
      	}
      	catch(e) {           
        } 
	}else if (timeoldL<=0){
		//��ն�ʱ������
		var niu = inputInterval.charAt(inputInterval.length-1)
		for(i=0;i<timecountRich.length;i++){
			timecountRich[i]=clearInterval(timecountRich[i])
		}
		timecountRich.length=0;		
		ttimeL.length=0;
		nnameL.length=0;
		objFlashEng.Send(GetMineCity(CityID,0));
	}
}
function _dotime(){
	for(i=0;i<ttimeL.length;i++){
		eval("timecountRich.push(setInterval(\"__timeout(ttimeL["+i+"],nnameL["+i+"])\",1000))");
	}	
}
//��ʽ��ʱ�䣬����Ϊ��70�������
//isNeedDay:null �������£�true �����£�false ֻ��������
function formattimeNOW(inputtime,isNeedDay){
	inputtime=inputtime+LocalTime;
	var starttimeT = new Date();
	starttimeT.setTime(inputtime*1000);	
	if(isNeedDay==null){
		return formattimeNum(starttimeT.getHours())+":"+formattimeNum(starttimeT.getMinutes())+":"+formattimeNum(starttimeT.getSeconds())
	}else if(isNeedDay==true){
		return formattimeNum(starttimeT.getYear())+"��"+
				formattimeNum(starttimeT.getMonth()+1) +"��"+
				formattimeNum(starttimeT.getDate())	+"�� "+
				formattimeNum(starttimeT.getHours())+":"+
				formattimeNum(starttimeT.getMinutes())+":"+
				formattimeNum(starttimeT.getSeconds())	
	}else if(isNeedDay==false){
		return formattimeNum(starttimeT.getYear())+"��"+
				formattimeNum(starttimeT.getMonth()+1) +"��"+
				formattimeNum(starttimeT.getDate())	+"��"
	}
}
function toArmyType(itype){
	switch (itype) {
	   case 0 :
		  return "����"
		  break 
	   case 1 :
		  return "<span class='t_red'><b>����</b></span>"
		  break 
	   case 2 :
		  return "�ػ�"
		  break 
	   case 3 :
		  return "��̽"
		  break 
	   case 4 :
		  return "����"
		  break 
	   case 5 :
		  return "��פ"
		  break 
	   case 6 ://�ݵ�
		  return "<span class='t_red'><b>����</b></span>"
		  break 
	}
}
function toArmyTypeColor(itype){
	switch (itype) {
	   case 0 :
		  return "ArmyTypeColor_green"
		  break 
	   case 1 :
		  return "ArmyTypeColor_red"
		  break 
	   case 2 :
		  return "ArmyTypeColor_green"
		  break 
	   case 3 :
		  return "ArmyTypeColor_red"
		  break 
	   case 4 :
		  return "ArmyTypeColor_green"
		  break 
	   case 5 :
		  return "ArmyTypeColor_green"
		  break 
	   case 6 :
		  return "ArmyTypeColor_red"
		  break 
	}
}
function toFangXiang(itype,txt){
	switch (itype) {
	   case 0 ://�齨
		  return ""
		  break 
	   case 1 :
		  return (txt==null)?">>":"����"
		  break 
	   case 2 ://ս��
		  return ""
		  break 
	   case 3 ://����
		  return ""
		  break 
	   case 4 ://ǲ�����ֶ��ٻ�
		  return (txt==null)?"&lt;&lt;":"ǲ��"
		  break 
	   case 5 :
		  return (txt==null)?"&lt;&lt;":"����"
		  break 
	}
}

/*
**    ==================================================================================================  
**    ������ 
**    ���ܣ�ͨ�ú���
**    ʾ����
**                        
**    ==================================================================================================  
*/
function  SH(table1){
	$(table1).style.display ="block";	
}  
function  HI(table1){
	$(table1).style.display = "none";
}  
function $(id){return document.getElementById(id);}
function $F(name){return document.getElementsByTagName(name);}
function $N(name){return document.getElementsByName(name);}
function replaceTextareaN(str){
    var reg=new RegExp("\r\n","g");
    var reg1=new RegExp(" ","g");    
    str = str.replace(reg,"<br>");
    str = str.replace(reg1,"<p>");    
    return str;
}
function replaceTextareaBR(str){
    var reg=new RegExp("<br>","g");
    var reg1=new RegExp("<p>","g");    
    str = str.replace(reg,"\r\n");
    str = str.replace(reg1," ");    
    return str;
}
/*
**    ==================================================================================================  
**    ������ 
**    ���ܣ��õ��ַ������ܳ��� ����ֵΪ0000+str
**    ʾ����CLength('str')
**                        
**    ==================================================================================================  
*/
function CLength(TmpStr){
	switch (chGetLength(chGetLength(TmpStr).toString())) {
	   case 1 :
		  AllLength="000"+chGetLength(TmpStr).toString()
		  break 
	   case 2 :
          AllLength="00"+chGetLength(TmpStr).toString()
		  break 
	   case 3 :
          AllLength="0"+chGetLength(TmpStr).toString()
		  break 
	   case 4 :
		  AllLength=+chGetLength(TmpStr).toString()
		  break 
	}
	return AllLength+TmpStr
}
// �õ��ַ����ĳ���,utf8������3�� 
function chGetLength(value)
{
		value=value+""; //���������޳���
		var totalLength = 0;
        var i;
        var charCode;
        for (i = 0; i < value.length; i++) {
          charCode = value.charCodeAt(i);
          if (charCode < 0x007f) {
            totalLength = totalLength + 1;
          } else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
            totalLength += 2;
          } else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
            totalLength += 3;
          }
        }
        //msgbox(totalLength);
        return totalLength;
}
// �õ��ַ����ĳ��ȣ�����������
function chChineseLength(value)
{
	var len = 0;
	for(var i = 0; i < value.length; i++)
	{
		if (value.charCodeAt(i) > 255) // ˫�ֽ�
		{
			len += 2;
		}
		else
		{
			++len;
		}
	}
	return len;
}
//ת������ID�Ͳ��������±�
function toMaterilName(id){
	var arrName=["��","ϸ��","��Ƥ","��Ƥ","��Ƥ","��Ƥ","��ͭ��Ƭ","������Ƭ","�ƽ���Ƭ","ʥʯ"]
	if(id == 100)return arrName[0]
	if(id == 101)return arrName[1]
	if(id == 200)return arrName[2]
	if(id == 201)return arrName[3]
	if(id == 202)return arrName[4]
	if(id == 203)return arrName[5]
	if(id == 300)return arrName[6]
	if(id == 301)return arrName[7]
	if(id == 302)return arrName[8]
	if(id == 303)return arrName[9]
}
//ת���������
function toUserTitle(id,ty){
	var txt="��"
	for(var i=0;i<mbu.UserRank.length;i++){
		if(ty==mbu.UserRank[i].RankType && id==mbu.UserRank[i].RankNumber){
			txt=mbu.UserRank[i].UserTitle
		}
	}
	return txt
}