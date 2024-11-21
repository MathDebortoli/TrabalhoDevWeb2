package trabalho.dev.web.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trabalho.dev.web.model.application.DependenteApplication;
import trabalho.dev.web.model.domain.DependenteDomain;

import java.util.List;

@RestController
@RequestMapping("/Dependente")
@Tag(name = "DependenteController", description = "Fornece serviços web REST para acesso e manipulação de dados de Dependente.")
public class DependenteController {
    private final DependenteApplication apl;

    @Autowired
    public DependenteController(DependenteApplication apl) {
        this.apl = apl;
    }

    @Operation(description = "Realiza o Cadastro de Dependente")
    @PostMapping("/Cadastrar")
    public ResponseEntity<DependenteDomain> postCadastrarDependente(@RequestBody DependenteDomain dependente) {
        apl.addDependente(dependente);
        return ResponseEntity.ok(dependente);
    }

    @Operation(description = "Remove um Dependente")
    @DeleteMapping("/Remover")
    public ResponseEntity<DependenteDomain> delRemoveDependente(@RequestBody DependenteDomain dependente) {
        apl.removeDependente(dependente);
        return ResponseEntity.ok(dependente);
    }

    @Operation(description = "Edita um Dependente")
    @PutMapping("/Editar")
    public ResponseEntity<DependenteDomain> putEditarDependente(@RequestBody DependenteDomain dependente) {
        apl.editDependente(dependente);
        return ResponseEntity.ok(dependente);
    }

    @Operation(description = "Retorna uma Lista de Dependentes")
    @GetMapping("/Listar")
    public ResponseEntity<List<DependenteDomain>> getDependentes() {
        List<DependenteDomain> dependentes = apl.getDependentes();
        return ResponseEntity.ok(dependentes);
    }
}
