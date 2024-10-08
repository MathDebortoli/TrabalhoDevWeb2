package trabalho.dev.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import trabalho.dev.web.model.application.AtorApplication;
import trabalho.dev.web.model.application.ClasseApplication;
import trabalho.dev.web.model.domain.AtorDomain;
import trabalho.dev.web.model.domain.ClasseDomain;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("/Classe")

public class ClasseController {
    ClasseApplication apl;

    @Autowired
    public ClasseController(ClasseApplication apl) {

        this.apl= apl;
    }

    @GetMapping(value ="/CadastrarClasse")
    public String getCadastroLivro() {
        return "";
    }


    @GetMapping("/Cadastrar/{nome}/{valor}/{data}")
    public void getCadastrarClasse(@PathVariable String nome, @PathVariable double valor, @PathVariable String data) throws ParseException {

        SimpleDateFormat formatoData = new SimpleDateFormat("yyyy-MM-dd");

        Date dataFormatada = formatoData.parse(data);

        ClasseDomain classe = new ClasseDomain(nome,valor,dataFormatada);
        apl.addClasse(classe);
    }
}
