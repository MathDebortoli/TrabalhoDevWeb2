package trabalho.dev.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trabalho.dev.web.model.application.ClasseApplication;
import trabalho.dev.web.model.domain.ClasseDomain;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/Classe")

public class ClasseController {
    ClasseApplication apl;

    @Autowired
    public ClasseController(ClasseApplication apl) {
        this.apl= apl;
    }

    @PostMapping("/Cadastrar")
    public ResponseEntity<ClasseDomain> getCadastrarClasse(@RequestBody ClasseDomain classe) throws ParseException {

        //SimpleDateFormat formatoData = new SimpleDateFormat("dd-MM-yyyy");
        //Date dataFormatada = formatoData.parse(data);
        //ClasseDomain classe = new ClasseDomain(nome,valor,dataFormatada);

        apl.addClasse(classe);
        return ResponseEntity.ok(classe);
    }

    @GetMapping("/Remover/{nome}/{id}")
    public void getRemoverClasse(@PathVariable String nome, @PathVariable Long id) {
        ClasseDomain classe = new ClasseDomain(nome, id);
        apl.removeClasse(classe);
    }

    @GetMapping("/Editar/{nome}/{id}/{valor}/{data}")
    public void getEditarClasse (@PathVariable String nome, @PathVariable Long id, @PathVariable String data, @PathVariable int valor) throws ParseException {

        SimpleDateFormat formatoData = new SimpleDateFormat("dd-MM-yyyy");

        Date dataFormatada = formatoData.parse(data);
        ClasseDomain classe = new ClasseDomain(nome, id,dataFormatada,valor);
        apl.editClasse(classe);
    }

    @GetMapping("/Listar")
    public ResponseEntity<List<ClasseDomain>> getListarClasse() {
        List<ClasseDomain> classes = apl.getClasse();
        return ResponseEntity.ok(classes);
    }
}
