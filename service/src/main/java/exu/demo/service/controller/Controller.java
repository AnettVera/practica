package exu.demo.service.controller;


import exu.demo.service.dto.Dto;
import exu.demo.service.service.Service;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/controller")
@CrossOrigin("*")
public class Controller {
    private final Service service;

    public Controller(Service service) {
        this.service = service;
    }

    @PostMapping("/")
    public String suma(@RequestBody Dto dto){
        return "La suma es: " + service.suma(dto);
   }
}
