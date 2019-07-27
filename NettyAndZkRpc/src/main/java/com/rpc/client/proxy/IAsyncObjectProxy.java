package com.rpc.client.proxy;

import com.rpc.client.RPCFuture;

public interface IAsyncObjectProxy {
    public RPCFuture call(String funcName, Object... args);
}