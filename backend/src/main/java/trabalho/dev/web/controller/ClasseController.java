package trabalho.dev.web.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trabalho.dev.web.model.application.ClasseApplication;
import trabalho.dev.web.model.domain.ClasseDomain;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/Classe")
@Tag(name = "ClasseController", description = "Fornece serviços web REST para acesso e manipulação de dados de Classe.")
public class ClasseController {
    ClasseApplication apl;

    @Autowired
    public ClasseController(ClasseApplication apl) {
        this.apl= apl;
    }

    @Operation(description="Realiza o Cadastro de Classe")
    @PostMapping("/Cadastrar")
    public ResponseEntity<ClasseDomain> postCadastrarClasse(@RequestBody ClasseDomain classe) throws ParseException {
        apl.addClasse(classe);
        return ResponseEntity.ok(classe);
    }

    @Operation(description="Remove uma Classe")
    @DeleteMapping("/Remover")
    public ResponseEntity<ClasseDomain> delRemoverClasse(@RequestBody ClasseDomain classe) {
        apl.removeClasse(classe);
        return ResponseEntity.ok(classe);
    }

    @Operation(description="Edita uma Classe")
    @PutMapping("/Editar")
    public ResponseEntity<ClasseDomain> putEditarClasse(@RequestBody ClasseDomain classe)  {
        apl.editClasse(classe);
        return ResponseEntity.ok(classe);
    }

    @Operation(description="Retorna uma Lista de Classes")
    @GetMapping("/Listar")
    public ResponseEntity<List<ClasseDomain>> getListarClasse() {
        List<ClasseDomain> classes = apl.getClasse();
        return ResponseEntity.ok(classes);
    }
}
