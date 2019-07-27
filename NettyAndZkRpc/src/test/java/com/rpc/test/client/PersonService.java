package com.rpc.test.client;

import java.util.List;

public interface PersonService {
    List<Person> GetTestPerson(String name, int num);
}
