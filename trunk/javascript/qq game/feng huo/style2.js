var bannerURL = ["/mailtemplate/mail.html?v=2009070401",
					 "/shoptemplate/shop_New1.html?v=2009070401",
					 "/mainhtml/sept2.html?v=2009070401"]


//��ʾ������ͼ
function ShowTab(name,pos){
	//ie6bug
	hideSelect('hidden');
	
	
	SH(name)
	$(name).style.zIndex=zindexStart;
	zindexStart++
	//MM_effectAppearFade(name, 300, 0, 100, false);
	if(pos<10){
		var arrImg=$("menu").getElementsByTagName("img");
		for(var i=0;i<arrImg.length;i++)
		{
			arrImg[i].style.background = "";
		}
		var xpos = pos*100;
		arrImg[pos].style.background = "url(images2/index_behavior.jpg) -"+ xpos+"px 0px no-repeat";	
	}
	//���ڳǺ���Ƕ���ʾ���촰�ڣ���ͼ����ʾ
	if(pos ==1 || pos ==0){
		SH("chat_box")	
		$("chat_box").style.zIndex=zindexStart;
		zindexStart++
	}else if(pos ==2 ){
		HI("chat_box")	
	}
}

	//tips��������
	document.body.onmousemove=quickalt;  //tips����
	var objScreen = document.getElementById("altlayer");
	if (!objScreen){
		var objScreen = document.createElement("div");
	}
	var oS = objScreen.style;
	objScreen.id = "altlayer";
	oS.display = "block";
	oS.filter = " Alpha(Opacity=90)";
	oS.opacity = "0.9";
	oS.visibility = "hidden";
	oS.color = "#afad85";
	oS.border = "1px solid #8da359";
	oS.background = "#191817";
	oS.position = "absolute";
	oS.padding = "5px 10px";
	oS.lineHeight = "20px";
	//oS.width = "200px";
	oS.textAlign="left"
	oS.zIndex = "200000";
	document.body.appendChild(objScreen);
	
	
	
function Show_army_tab(num){
	$('l_armydiv').style.display='block';
	$('l_armydiv').style.zIndex=zindexStart;
	zindexStart++;
	//��ʾselect�ؼ���ie6bug
	hideSelect("");	
	//iframe���selcet	
	if(typeof(document.frames['JZdiv'].hideSelect)=="function"){
		 for(var i = 0; i < document.frames['JZdiv'].document.getElementsByTagName('select').length; i++) {
			document.frames['JZdiv'].document.getElementsByTagName('select')[i].style.visibility = "hidden";
		}
	}
	
	for(i=0;i<7;i++){
		eval("$('army_tab_"+i+"').className = 'army_tab'");
		eval("$('army_main"+i+"').style.display = 'none'");
	}
	eval("$('army_tab_"+num+"').className = 'army_tab_click'");
	eval("$('army_main"+num+"').style.display = 'block'");
	
	$("attack_hero_tab").style.visibility="hidden"
	switch(num){
		case 0:
			//�㽫̨
			objFlashEng.Send(GetArmyList(1,CityID,200))
			break
		case 1:
			DoAttack(curFavGrid,curFavName,curFavOwnerName)
			break		
		case 2:
			DoTrans(curFavGrid,curFavName,curFavOwnerName)
			break
		case 3:
			DoSend(curFavGrid,curFavName,curFavOwnerName)
			break
		case 4:
			DoExploit(curFavGrid)
			break
		case 5:
			DoSpy(curFavGrid,curFavName,curFavOwnerName)
			break
		case 6:
			DoSendother(curFavGrid,curFavName,curFavOwnerName)
			break
	}
	
}


//����ϵͳ
//����tab�л�
function taskTab(num){
	var arrD=$("tasktoptab").getElementsByTagName("div");
	for(var i=0;i<arrD.length;i++)
	{
		arrD[i].className = "index_y_notabstyle";
	}	
	arrD[num-1].className = "index_y_tabstyle";	
	objFlashEng.Send(getTaskList(1500,deTypeAndId(0,num,0)))	
}


//����tab�л� ������
function marketTab(n){
	var m = $("market_tab_top").getElementsByTagName("div");
	for(var i=1;i<4;i++){
		eval("$('market"+i+"').style.display='none'")
		m[i-1].className = "index_y_notabstyle"
	}
	eval("SH(\"market"+n+"\")")
	m[n-1].className = "index_y_tabstyle"
	//��ȡ������list
	if(n==1)top.objFlashEng.Send(top.GetMarketList(0,0,0,0,200));
	//��ȡ�ֿⱦ��list
	if(n==2)marketSellTab(1)	
	//��ȡ�ҵĽ��׵�
	if(n==3)top.objFlashEng.Send(top.getTaskList(1704));
}

	