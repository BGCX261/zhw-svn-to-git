// ==== thinkryzhu begin ========================

// ������
function TaskItem(taskID, taskData)
{
	this.taskID = taskID;
	this.taskData = taskData;
}

TaskItem.prototype.toString = function()
{
	return "taskID:" + this.taskID;
}

// �������
function Task()
{
	this.arrIT = new Array();
	this.arrTE = new Array();
	this.arrAR = new Array();
	this.arrFO = new Array();
	this.timerIT = null;
	this.timerTE = null;
	this.timerAR = null;
	this.timerFO = null;
	this.countReq = 0; // ��¼�����˶��ٴ�����
}

Task.NAMES = ["IT", "TE", "AR", "FO"]; //���ֶ��еı�ʶ

// ֻ����taskID, taskData��null
// ������ظ�
Task.prototype.insertTaskID = function(taskID)
{
	var arr = this["arr" + taskID.slice(0,2)];
	arr.push(new TaskItem(taskID, null));
}

// ����ָ��taskID��taskData
// ���taskID������, ��insert
Task.prototype.setTaskData = function(taskID, taskData)
{
	var arr = this["arr" + taskID.slice(0,2)];
	for (var i = 0; i < arr.length; ++i)
	{
		if (arr[i].taskID == taskID)
		{
			arr[i].taskData = taskData;
			return true;
		}
	}

	// taskID����������, insert
	arr.push(new TaskItem(taskID, taskData));
	return false;
}

// ����task������
Task.prototype.getTaskCount = function()
{
	return this.arrIT.length + this.arrTE.length
		 + this.arrAR.length + this.arrFO.length;
}

// taskData�����ݵ�task������
Task.prototype.getNullTaskCount = function()
{
	var count = 0;
	for (var a = 0; a < Task.NAMES.length; ++a)
	{
		var arr = this["arr" + Task.NAMES[a]];
		for (var i = 0; i < arr.length; ++i)
		{
			if (arr[i].taskData == null)
			{
				++count;
			}
		}
	}
	
	return count;
}

Task.prototype.isAllTaskHasData = function()
{
	return this.getNullTaskCount() == 0;
}

Task.prototype.eraseNullTask = function()
{
	var count = 0;
	for (var a = 0; a < Task.NAMES.length; ++a)
	{
		var arr = this["arr" + Task.NAMES[a]];
		for (var i = arr.length - 1; i >= 0; --i)
		{
			if (arr[i].taskData == null)
			{
				arr.splice(i, 1); // ɾ��Ԫ��
				++count;
			}
		}
	}

	return count;
}

// �������task
Task.prototype.clearAllTasks = function()
{
	this.arrIT.length = 0;
	this.arrTE.length = 0;
	this.arrAR.length = 0;
	this.arrFO.length = 0;
	this.countReq = 0;
}

Task.prototype.incCount = function()
{
	if (this.countReq < 0) this.countReq = 0;
	++this.countReq;
}

Task.prototype.decCount = function()
{
	--this.countReq;
	if (this.countReq < 0) this.countReq = 0;
}

// ���潨������Ķ�ʱ��ID
// ͬʱ�������ǰ��ͬ���͵Ķ�ʱ��
Task.prototype.setTaskTimer = function(typeName, timerID)
{
	this.clearTaskTimer(typeName);
	this["timer" + typeName] = timerID;
}

// �����������������ʱ��
Task.prototype.clearTaskTimer = function(typeName)
{
	var n = "timer" + typeName;
	if (this[n] != null)
	{
		clearInterval(this[n]);
		this[n] = null;
	}
}

// ������еĽ�������ʱ��
Task.prototype.clearAllTimers = function()
{
	for (var a = 0; a < Task.NAMES.length; ++a)
	{
		this.clearTaskTimer(Task.NAMES[a]);
	}
}

// ����ʱ��
// ��Dateת��number
// ��undefined nullת�ɵ�ǰʱ��
function prehanleTime(t)
{
	if (t == null)
	{
		return new Date().getTime();
	}
	else if (t instanceof Date)
	{
		return t.getTime();
	}
	else
	{
		return Number(t);
	}
}

// ���ַ�����������ʱ��Ĳ�
function getTimeDiff(t1, t2)
{
	var t11 = prehanleTime(t1);
	var t22 = prehanleTime(t2);
	
	var result = "";
	var dif = Math.floor((t11 - t22) / 1000); // ��ֵ��
	if (dif > 0)
	{
		var d = Math.floor(dif / 86400);
		var h = Math.floor((dif % 86400) / 3600);
		var m = Math.floor((dif % 3600) / 60);
		var s = dif % 60;
		if (d > 0)
		{
			result = d + "��";
		}
		
		result += (h < 10 ? "0" : "") + h + ":";
		result += (m < 10 ? "0" : "") + m + ":";
		result += (s < 10 ? "0" : "") + s;
	}
	
	return result;
}

// ==== thinkryzhu end ==========================

var gTask = new Task();

// ==== thinkryzhu end ==========================
