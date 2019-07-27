package com.rpc.client;

public interface AsyncRPCCallback {

	//成功
    void success(Object result);

    //失败
    void fail(Exception e);

}
