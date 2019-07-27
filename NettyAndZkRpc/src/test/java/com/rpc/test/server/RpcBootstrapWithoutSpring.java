package com.rpc.test.server;

import com.rpc.registry.ServiceRegistry;
import com.rpc.server.RpcServer;
import com.rpc.test.client.HelloService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RpcBootstrapWithoutSpring {
    private static final Logger logger = LoggerFactory.getLogger(RpcBootstrapWithoutSpring.class);

    public static void main(String[] args) {
        String serverAddress = "192.168.2.222:18866";
        ServiceRegistry serviceRegistry = new ServiceRegistry("192.168.2.222:2181");
        RpcServer rpcServer = new RpcServer(serverAddress, serviceRegistry);
        HelloService helloService = new HelloServiceImpl();
        rpcServer.addService("com.nettyrpc.test.client.HelloService", helloService);
        try {
            rpcServer.start();
        } catch (Exception ex) {
            logger.error("Exception: {}", ex);
        }
    }
}
