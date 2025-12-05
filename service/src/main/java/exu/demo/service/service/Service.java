package exu.demo.service.service;

import exu.demo.service.dto.Dto;

@org.springframework.stereotype.Service
public class Service {

    public int suma(Dto dto){
        return dto.getA() + dto.getB();
    }
}
