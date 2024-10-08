package trabalho.dev.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import trabalho.dev.web.model.application.AtorApplication;
import trabalho.dev.web.model.domain.AtorDomain;

@Controller
@RequestMapping("/Ator")
public class AtorController {

    private final AtorApplication apl;

    @Autowired
    public AtorController(AtorApplication apl) {
        this.apl = apl;
    }

    @GetMapping("/Cadastrar/{nome}")
    public void getCadastrarAtor(@PathVariable String nome) {
        AtorDomain ator = new AtorDomain(nome);
        apl.addAtor(ator);
    }

    @GetMapping("/Remover/{nome}/{id}")
    public void getRemoverAtor(@PathVariable String nome, @PathVariable int id) {
        AtorDomain ator = new AtorDomain(nome, id);
        apl.removeAtor(ator);
    }

    @GetMapping("/Editar/{nome}/{id}")
    public void getEditarAtor(@PathVariable String nome, @PathVariable int id) {
        AtorDomain ator = new AtorDomain(nome, id);
        apl.editAtor(ator);
    }

    @GetMapping("/Listar")
    public void getListarAtores() {
        apl.getAtores();
    }
}

