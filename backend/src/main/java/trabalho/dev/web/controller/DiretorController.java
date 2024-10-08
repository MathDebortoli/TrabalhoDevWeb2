package trabalho.dev.web.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DiretorController {

    @GetMapping(value = "/CadastrarDiretor")
    public String getCadastroLivro() {
        return "";
    }
}
