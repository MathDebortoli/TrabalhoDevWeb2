package trabalho.dev.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trabalho.dev.web.model.application.ClasseApplication;
import trabalho.dev.web.model.domain.AtorDomain;
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
        apl.addClasse(classe);
        return ResponseEntity.ok(classe);
    }

    @PostMapping("/Remover")
    public ResponseEntity<ClasseDomain> postRemoverClasse(@RequestBody ClasseDomain classe) {

        apl.removeClasse(classe);
        return ResponseEntity.ok(classe);
    }

    @PostMapping("/Editar")
    public ResponseEntity<ClasseDomain> postEditarClasse(@RequestBody ClasseDomain classe)  {

        apl.editClasse(classe);
        return ResponseEntity.ok(classe);
    }

    @GetMapping("/Listar")
    public ResponseEntity<List<ClasseDomain>> getListarClasse() {
        List<ClasseDomain> classes = apl.getClasse();
        return ResponseEntity.ok(classes);
    }
}
