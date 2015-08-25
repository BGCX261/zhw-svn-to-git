// JavaScript Document

function getTotalMailUnReadNum()
{
	var typeVaules = [0,1,0,1,1];
	var totalNum = 0;
	for(var i=0;i<unReadMails.length;i++)
	{
		if(unReadMails[i].chType < typeVaules.length &&
			typeVaules[unReadMails[i].chType] == 1)
		{
			if(unReadMails[i].iNum > 0)
				totalNum+=unReadMails[i].iNum;
		}
	}
	return totalNum;
}

function decUnReadNum(iType,num)
{

	for(var i=0;i<unReadMails.length;i++)
	{
		if(unReadMails[i].chType == iType)
		{
			if(unReadMails[i].iNum>0)
			{
				unReadMails[i].iNum = unReadMails[i].iNum-num;
				if(unReadMails[i].iNum<0)
					unReadMails[i].iNum = 0;
				if(document.frames["maildiv"].src != "")
				{
					document.frames["maildiv"].showPageBtns();
				}
			}
			break;
		}
	}
	if(getTotalMailUnReadNum()<=0)
	{
		HI("newArrival");
	}
	else 
	{
		SH("newArrival");
	}
}

//�����ʼ���Ӧ��Ϣ������
function OnSendMailRes(str)
{
	var RequestRes=eval('('+str+')');
	if(typeof(RequestRes.CResult) != "undefined")
	{

		msgbox("Error:"+RequestRes.CResult.iResultID+"<br><b>�����ʼ�ʧ��:</b><span class='t_tips_yellow'>"+errMsg(RequestRes.CResult.iResultID)+"!</span>");
		document.frames["maildiv"].frames["rightframe"].SendMailFailed();
	}
	else if(RequestRes.CAnsUserSendMail.CResult.iResultID != 0)
	{

		msgbox("Error:"+RequestRes.CAnsUserSendMail.CResult.iResultID+"<br><b>�����ʼ�ʧ��:</b><span class='t_tips_yellow'>"+errMsg(RequestRes.CAnsUserSendMail.CResult.iResultID)+"!</span>");
		document.frames["maildiv"].frames["rightframe"].SendMailFailed();
	}
	else
	{
		document.frames["maildiv"].setRightFrame("/mailtemplate/mail_post_ok.html");
	}
}

//ɾ���ʼ���Ӧ��Ϣ������
function OnDelMailRes(str)
{
	var RequestRes=eval('('+str+')');
	if(typeof(RequestRes.CResult) != "undefined")
	{

		msgbox("Error:"+RequestRes.CResult.iResultID+"<br><b>ɾ���ʼ�ʧ��:</b><span class='t_tips_yellow'>"+errMsg(RequestRes.CResult.iResultID)+"!</span>");
	}
	else if(RequestRes.CAnsUserDelMail.CResult.iResultID != 0)
	{

		msgbox("Error:"+RequestRes.CAnsUserDelMail.CResult.iResultID+"<br><b>ɾ���ʼ�ʧ��:</b><span class='t_tips_yellow'>"+errMsg(RequestRes.CAnsUserDelMail.CResult.iResultID)+"!</span>");
	}
	else
	{

		if(RequestRes.CTMsgHead.llMsgAct == 0)
		{
			msgbox("�ɹ�ɾ��"+RequestRes.CAnsUserDelMail.iDelNum+"���ʼ�");
			document.frames["maildiv"].frames["rightframe"].reGetList();
		}
		else
			document.frames["maildiv"].setRightFrame("/mailtemplate/mail_delete_ok.html");
		objFlashEng.Send(getMailUnRead());
	}
}


//��ȡ�ʼ��б���Ӧ��Ϣ������
function OnGetMailListRes(str)
{
	var RequestRes=eval('('+str+')');
	if(typeof(RequestRes.CResult) != "undefined")
	{
		//msgbox("������� <b>ʧ��</b>! errorcode :"+objBuyItem.CResult.iResultID);
		msgbox("Error:"+RequestRes.CResult.iResultID+"<br><b>��ȡ�ʼ��б�ʧ��:</b><span class='t_tips_yellow'>"+errMsg(RequestRes.CResult.iResultID)+"!</span>");
	}
	else if(RequestRes.CAnsUserGetMailList.CResult.iResultID != 0)
	{
		//msgbox("������� <b>ʧ��</b>! errorcode :"+objBuyItem.CAnsBuyingItem.CResult.iResultID);
		msgbox("Error:"+RequestRes.CAnsUserGetMailList.CResult.iResultID+"<br><b>��ȡ�ʼ��б�ʧ��:</b><span class='t_tips_yellow'>"+errMsg(RequestRes.CAnsUserGetMailList.CResult.iResultID)+"!</span>");
	}
	else
	{
		document.frames["maildiv"].frames["rightframe"].displayMailList(RequestRes.CAnsUserGetMailList);
	}
}

//��ȡ�ʼ�������Ӧ��Ϣ������
function OnGetMailDetailRes(str)
{
	var RequestRes=eval('('+str+')');
	if(typeof(RequestRes.CResult) != "undefined")
	{
		//msgbox("������� <b>ʧ��</b>! errorcode :"+objBuyItem.CResult.iResultID);
		msgbox("Error:"+RequestRes.CResult.iResultID+"<br><b>��ȡ�ʼ�����ʧ��:</b><span class='t_tips_yellow'>"+errMsg(RequestRes.CResult.iResultID)+"!</span>");
	}
	else if(RequestRes.CAnsUserGetMailDetail.CResult.iResultID != 0)
	{
		//msgbox("������� <b>ʧ��</b>! errorcode :"+objBuyItem.CAnsBuyingItem.CResult.iResultID);
		msgbox("Error:"+RequestRes.CAnsUserGetMailDetail.CResult.iResultID+"<br><b>��ȡ�ʼ�����ʧ��:</b><span class='t_tips_yellow'>"+errMsg(RequestRes.CAnsUserGetMailDetail.CResult.iResultID)+"!</span>");
	}
	else
	{
		document.frames["maildiv"].frames["rightframe"].displayMailDetail(RequestRes.CAnsUserGetMailDetail.MailItemDetail);
	}
}

//�����ʼ��Ѷ���Ӧ��Ϣ������
function OnGetSetMailReadRes(str)
{
	var RequestRes=eval('('+str+')');
	if(typeof(RequestRes.CResult) != "undefined")
	{

		msgbox("Error:"+RequestRes.CResult.iResultID+"<br><b>�����ʼ��Ѷ�ʧ��:</b><span class='t_tips_yellow'>"+errMsg(RequestRes.CResult.iResultID)+"!</span>");
	}
	else if(RequestRes.CAnsUserMailSetRead.CResult.iResultID != 0)
	{

		msgbox("Error:"+RequestRes.CAnsUserMailSetRead.CResult.iResultID+"<br><b>�����ʼ��Ѷ�ʧ��:</b><span class='t_tips_yellow'>"+errMsg(RequestRes.CAnsUserMailSetRead.CResult.iResultID)+"!</span>");
	}
	else
	{
		msgbox("�����ʼ��Ѷ��ɹ�");
		document.frames["maildiv"].frames["rightframe"].reGetList();
		objFlashEng.Send(getMailUnRead());
		
	}
}

function OnGetMailUnReadNun(str)
{
	var Res = eval('('+str+')');
	if(typeof(Res.CResult) != "undefined")
	{
		return ;
	}
	if(Res.CAnsUnReadNumReq.CResult.iResultID == 0)
	{
		unReadMails = Res.CAnsUnReadNumReq.astMailUnReadList;
		if(getTotalMailUnReadNum() > 0)
		{
			SH("newArrival");
		}
		else
		{
			HI("newArrival");
		}
		if(document.frames["maildiv"].src != "")
		{
			document.frames["maildiv"].showPageBtns();
		}
	}
}


