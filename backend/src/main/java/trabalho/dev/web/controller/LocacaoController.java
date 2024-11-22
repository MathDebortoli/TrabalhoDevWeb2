package trabalho.dev.web.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trabalho.dev.web.model.application.LocacaoApplication;
import trabalho.dev.web.model.domain.LocacaoDomain;

import java.util.List;

@RestController
@RequestMapping("/Locacao")
@Tag(name = "LocacaoController", description = "Fornece serviços web REST para acesso e manipulação de dados de Locação.")
public class LocacaoController {

    private final LocacaoApplication apl;

    @Autowired
    public LocacaoController(LocacaoApplication apl) {
        this.apl = apl;
    }

    @Operation(description = "Realiza o Cadastro de Locação")
    @PostMapping("/Cadastrar")
    public ResponseEntity<LocacaoDomain> postCadastrarLocacao(@RequestBody LocacaoDomain locacao) {
        apl.addLocacao(locacao);
        return ResponseEntity.ok(locacao);
    }

    @Operation(description = "Remove uma Locação")
    @DeleteMapping("/Remover")
    public ResponseEntity<LocacaoDomain> delRemoveLocacao(@RequestBody LocacaoDomain locacao) {
        apl.removeLocacao(locacao);
        return ResponseEntity.ok(locacao);
    }

    @Operation(description = "Edita uma Locação")
    @PutMapping("/Editar")
    public ResponseEntity<LocacaoDomain> putEditarLocacao(@RequestBody LocacaoDomain locacao) {
        apl.editLocacao(locacao);
        return ResponseEntity.ok(locacao);
    }

    @Operation(description = "Retorna uma Lista de Locações")
    @GetMapping("/Listar")
    public ResponseEntity<List<LocacaoDomain>> getLocacoes() {
        List<LocacaoDomain> locacoes = apl.getLocacoes();
        return ResponseEntity.ok(locacoes);
    }
}
