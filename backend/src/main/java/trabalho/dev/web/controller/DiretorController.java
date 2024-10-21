package trabalho.dev.web.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trabalho.dev.web.model.application.DiretorApplication;
import trabalho.dev.web.model.domain.DiretorDomain;

import java.util.List;

@RestController
@RequestMapping("/Diretor")
@Tag(name = "DiretorController", description = "Fornece serviços web REST para acesso e manipulação de dados de Diretor.")
public class DiretorController {
     private final DiretorApplication apl;

    @Autowired
    public DiretorController(DiretorApplication apl) {
        this.apl = apl;
    }

    @Operation(description="Realiza o Cadastro de Diretor")
    @PostMapping("/Cadastrar")
    public ResponseEntity<DiretorDomain> postCadastrarDiretor(@RequestBody DiretorDomain diretor ) {
        apl.addDiretor(diretor);
        return ResponseEntity.ok(diretor);
    }

    @Operation(description="Remove um Diretor")
    @DeleteMapping("/Remover")
    public ResponseEntity<DiretorDomain>  delRemoveDiretor(@RequestBody DiretorDomain diretor) {
        apl.removeDiretor(diretor);
        return ResponseEntity.ok(diretor);
    }

    @Operation(description="Edita um Diretor")
    @PutMapping("/Editar")
    public ResponseEntity<DiretorDomain>  putEditarDiretor(@RequestBody DiretorDomain diretor) {
        apl.editDiretor(diretor);
        return ResponseEntity.ok(diretor);
    }

    @Operation(description="Retorna uma Lista de Diretores")
    @GetMapping("/Listar")
    public ResponseEntity<List<DiretorDomain>> getDiretores() {
        List<DiretorDomain> diretores = apl.getDiretores();
        return ResponseEntity.ok(diretores);
    }
}
