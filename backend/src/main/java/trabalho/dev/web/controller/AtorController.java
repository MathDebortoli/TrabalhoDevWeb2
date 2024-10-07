package trabalho.dev.web.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AtorController {

    @GetMapping(value ="/CadastrarAtor")
    public String getCadastroLivro() {
        return "Cadastrar0aaaLivro";
    }
}
