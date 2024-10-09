package trabalho.dev.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import trabalho.dev.web.model.application.ClasseApplication;
import trabalho.dev.web.model.application.DiretorApplication;
import trabalho.dev.web.model.domain.AtorDomain;
import trabalho.dev.web.model.domain.ClasseDomain;
import trabalho.dev.web.model.domain.DiretorDomain;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("/Diretor")

public class DiretorController {
    DiretorApplication apl;

    @Autowired
    public DiretorController(DiretorApplication apl) {

        this.apl= apl;
    }

    @GetMapping(value ="/CadastrarClasse")
    public String getCadastroLivro() {
        return "";
    }


    @GetMapping("/Cadastrar/{nome}")
    public void getCadastrarClasse(@PathVariable String nome) throws ParseException {

        SimpleDateFormat formatoData = new SimpleDateFormat("dd-MM-yyyy");



        DiretorDomain diretor= new DiretorDomain(nome);
        apl.addDiretor(diretor);
    }


    @GetMapping("/Remover/{nome}/{id}")
    public void getRemoverAtor(@PathVariable String nome, @PathVariable int id) {
        DiretorDomain diretor = new DiretorDomain(nome,id );
        apl.removeDiretor(diretor);
    }

    @GetMapping("/Editar/{nome}/{id}")
    public void getEditarAtor(@PathVariable String nome, @PathVariable int id) {
        DiretorDomain diretor = new DiretorDomain(nome, id );
        apl.editDiretor(diretor);
    }

    @GetMapping("/Listar")
    public void getListarDiretores() {
        System.out.println(apl.getDiretores());
    }
}
