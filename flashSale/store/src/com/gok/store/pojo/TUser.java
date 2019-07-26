package com.gok.store.pojo;

import java.util.Date;

public class TUser {
	private Integer uid;

	private String suser;

	private String spwd;

	private String sname;

	private String ssex;

	private Date dbirth;

	private String birth;

	private String semail;

	private String sphone;

	private String saddress;

	private Date regdate;

	private String regDate;

	private Integer slock;

	private String state;

	private Date dlastdate;

	private String dldate;

	private Integer nlogin;

	private Integer slever;

	public Integer getUid() {
		return uid;
	}

	public void setUid(Integer uid) {
		this.uid = uid;
	}

	public String getSuser() {
		return suser;
	}

	public void setSuser(String suser) {
		this.suser = suser == null ? null : suser.trim();
	}

	public String getSpwd() {
		return spwd;
	}

	public void setSpwd(String spwd) {
		this.spwd = spwd == null ? null : spwd.trim();
	}

	public String getSname() {
		return sname;
	}

	public void setSname(String sname) {
		this.sname = sname == null ? null : sname.trim();
	}

	public String getSsex() {
		return ssex;
	}

	public void setSsex(String ssex) {
		this.ssex = ssex == null ? null : ssex.trim();
	}

	public Date getDbirth() {
		return dbirth;
	}

	public void setDbirth(Date dbirth) {
		this.dbirth = dbirth;
	}

	public String getSemail() {
		return semail;
	}

	public void setSemail(String semail) {
		this.semail = semail == null ? null : semail.trim();
	}

	public String getSphone() {
		return sphone;
	}

	public void setSphone(String sphone) {
		this.sphone = sphone == null ? null : sphone.trim();
	}

	public String getSaddress() {
		return saddress;
	}

	public void setSaddress(String saddress) {
		this.saddress = saddress == null ? null : saddress.trim();
	}

	public Date getRegdate() {
		return regdate;
	}

	public void setRegdate(Date regdate) {
		this.regdate = regdate;
	}

	public Integer getSlock() {
		return slock;
	}

	public void setSlock(Integer slock) {
		this.slock = slock;
	}

	public Date getDlastdate() {
		return dlastdate;
	}

	public void setDlastdate(Date dlastdate) {
		this.dlastdate = dlastdate;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public Integer getNlogin() {
		return nlogin;
	}

	public void setNlogin(Integer nlogin) {
		this.nlogin = nlogin;
	}

	public Integer getSlever() {
		return slever;
	}

	public void setSlever(Integer slever) {
		this.slever = slever;
	}

	public String getBirth() {
		return birth;
	}

	public void setBirth(String birth) {
		this.birth = birth;
	}

	public String getRegDate() {
		return regDate;
	}

	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}

	public String getDldate() {
		return dldate;
	}

	public void setDldate(String dldate) {
		this.dldate = dldate;
	}

	public TUser(Integer uid, String suser, String spwd, String sname, String ssex, Date dbirth, String semail,
			String sphone, String saddress) {
		super();
		this.uid = uid;
		this.suser = suser;
		this.spwd = spwd;
		this.sname = sname;
		this.ssex = ssex;
		this.dbirth = dbirth;
		this.semail = semail;
		this.sphone = sphone;
		this.saddress = saddress;
	}

	public TUser() {
		super();
	}

}