package com.gok.store.pojo;

import java.util.Date;

public class TOrder {
    private Integer orderId;

    private String orderCode;

    private String spname;;

    private String suser;

    private String uid;
    
    private String nid;
    
    private String cate;
    
    private String cateid;

    private Date dgdate;

    private String spaytype;

    private String ssendtype;

    private Integer nmcsize;

    private String ntotalprice;

    private String sstatus;

    private String smsg;

    private Integer sauser;
    
    private String sauser1;

    private Date dadate;

    private String ssname;

    private String ssaddress;

    private String sscode;

    private String ssphone;
    
    private String gmname;
    
    private String simg;

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

	public String getGmname() {
		return gmname;
	}

	public String getSimg() {
		return simg;
	}

	public void setSimg(String simg) {
		this.simg = simg;
	}

	public void setGmname(String gmname) {
		this.gmname = gmname;
	}

	public String getSauser1() {
		return sauser1;
	}

	public void setSauser1(String sauser1) {
		this.sauser1 = sauser1;
	}

	public String getCateid() {
		return cateid;
	}

	public void setCateid(String cateid) {
		this.cateid = cateid;
	}

	public String getNid() {
		return nid;
	}

	public void setNid(String nid) {
		this.nid = nid;
	}

	public String getCate() {
		return cate;
	}

	public void setCate(String cate) {
		this.cate = cate;
	}

	public String getOrderCode() {
        return orderCode;
    }

    public String getSpname() {
		return spname;
	}

	public void setSpname(String spname) {
		this.spname = spname;
	}

	public void setOrderCode(String orderCode) {
        this.orderCode = orderCode == null ? null : orderCode.trim();
    }

    public String getSuser() {
        return suser;
    }

    public void setSuser(String suser) {
        this.suser = suser == null ? null : suser.trim();
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid == null ? null : uid.trim();
    }

    public Date getDgdate() {
        return dgdate;
    }

    public void setDgdate(Date dgdate) {
        this.dgdate = dgdate;
    }

    public String getSpaytype() {
        return spaytype;
    }

    public void setSpaytype(String spaytype) {
        this.spaytype = spaytype == null ? null : spaytype.trim();
    }

    public String getSsendtype() {
        return ssendtype;
    }

    public void setSsendtype(String ssendtype) {
        this.ssendtype = ssendtype == null ? null : ssendtype.trim();
    }

    public Integer getNmcsize() {
        return nmcsize;
    }

    public void setNmcsize(Integer nmcsize) {
        this.nmcsize = nmcsize;
    }

    public String getNtotalprice() {
        return ntotalprice;
    }

    public void setNtotalprice(String ntotalprice) {
        this.ntotalprice = ntotalprice == null ? null : ntotalprice.trim();
    }

    public String getSstatus() {
        return sstatus;
    }

    public void setSstatus(String sstatus) {
        this.sstatus = sstatus == null ? null : sstatus.trim();
    }

    public String getSmsg() {
        return smsg;
    }

    public void setSmsg(String smsg) {
        this.smsg = smsg == null ? null : smsg.trim();
    }

    public Integer getSauser() {
        return sauser;
    }

    public void setSauser(Integer sauser) {
        this.sauser = sauser;
    }

    public Date getDadate() {
        return dadate;
    }

    public void setDadate(Date dadate) {
        this.dadate = dadate;
    }

    public String getSsname() {
        return ssname;
    }

    public void setSsname(String ssname) {
        this.ssname = ssname == null ? null : ssname.trim();
    }

    public String getSsaddress() {
        return ssaddress;
    }

    public void setSsaddress(String ssaddress) {
        this.ssaddress = ssaddress == null ? null : ssaddress.trim();
    }

    public String getSscode() {
        return sscode;
    }

    public void setSscode(String sscode) {
        this.sscode = sscode == null ? null : sscode.trim();
    }

    public String getSsphone() {
        return ssphone;
    }

    public void setSsphone(String ssphone) {
        this.ssphone = ssphone == null ? null : ssphone.trim();
    }
}