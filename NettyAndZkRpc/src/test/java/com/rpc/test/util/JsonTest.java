package com.rpc.test.util;

import com.rpc.protocol.JsonUtil;
import com.rpc.protocol.RpcRequest;
import com.rpc.protocol.RpcResponse;
import com.rpc.protocol.SerializationUtil;
import com.rpc.test.client.Person;
import com.rpc.test.server.HelloServiceImpl;

import java.io.IOException;
import java.util.UUID;

public class JsonTest {
    public static void main(String[] args){
        RpcResponse response = new RpcResponse();
        response.setRequestId(UUID.randomUUID().toString());
        response.setError("Error msg");
        System.out.println(response.getRequestId());

        byte[] datas = JsonUtil.serialize(response);
        System.out.println("Json byte length: " + datas.length);

        byte[] datas2 = SerializationUtil.serialize(response);
        System.out.println("Protobuf byte length: " + datas2.length);

        RpcResponse resp = (RpcResponse)JsonUtil.deserialize(datas,RpcResponse.class);
        System.out.println(resp.getRequestId());
    }


    private static void TestJsonSerialize(){
        RpcRequest request = new RpcRequest();
        request.setClassName(HelloServiceImpl.class.getName());
        request.setMethodName(HelloServiceImpl.class.getDeclaredMethods()[0].getName());
        Person person = new Person("lu","xiaoxun");
        request.setParameters(new Object[]{person});
        request.setRequestId(UUID.randomUUID().toString());
        System.out.println(request.getRequestId());

        byte[] datas = JsonUtil.serialize(request);
        System.out.println("Json byte length: " + datas.length);

        byte[] datas2 = SerializationUtil.serialize(request);
        System.out.println("Protobuf byte length: " + datas2.length);

        RpcRequest req = (RpcRequest)JsonUtil.deserialize(datas,RpcRequest.class);
        System.out.println(req.getRequestId());
    }

}
