package trabalho.dev.web.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import trabalho.dev.web.model.application.AtorApplication;
import trabalho.dev.web.model.domain.AtorDomain;

import java.util.List;

//http://localhost:8080/swagger-ui/index.html

@Controller
@RequestMapping("/Ator")
@Tag(name = "AtorController", description = "Fornece serviços web REST para acesso e manipulação de dados de atores.")
public class AtorController {

    private final AtorApplication apl;

    @Autowired
    public AtorController(AtorApplication apl) {
        this.apl = apl;
    }

    @Operation(description="Realiza o Cadastro de Ator")
    @PostMapping("/Cadastrar")
        public ResponseEntity<AtorDomain> postCadastrarAtor(@RequestBody AtorDomain ator ) {
        apl.addAtor(ator);
        return ResponseEntity.ok(ator);
    }

    @Operation(description="Remove um Ator")
    @DeleteMapping("/Remover")
    public ResponseEntity<AtorDomain> delRemoverAtor(@RequestBody AtorDomain ator) {
        apl.removeAtor(ator);
        return ResponseEntity.ok(ator);
    }

    @Operation(description="Edita um Ator")
    @PutMapping("/Editar")
    public ResponseEntity<AtorDomain> putEditarAtor(@RequestBody AtorDomain ator) {
        apl.editAtor(ator);
        return ResponseEntity.ok(ator);
    }

    @Operation(description="Retorna uma Lista de Atores")
    @GetMapping("/Listar")
    public ResponseEntity<List<AtorDomain>> getAtores() {
        List<AtorDomain> atores = apl.getAtores();
        return ResponseEntity.ok(atores);
    }
}

