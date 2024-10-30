package trabalho.dev.web.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trabalho.dev.web.model.application.TituloApplication;
import trabalho.dev.web.model.domain.TituloDomain;

import java.util.List;

@RestController
@RequestMapping("/Titulo")
@Tag(name = "TituloController", description = "Fornece serviços web REST para acesso e manipulação de dados de Titulo.")
public class TituloController {
    private final TituloApplication apl;

    @Autowired
    public TituloController(TituloApplication apl) {
        this.apl = apl;
    }

    @Operation(description = "Realiza o Cadastro de Titulo")
    @PostMapping("/Cadastrar")
    public ResponseEntity<TituloDomain> postCadastrarTitulo(@RequestBody TituloDomain titulo) {
        apl.addTitulo(titulo);
        return ResponseEntity.ok(titulo);
    }

    @Operation(description = "Remove um Titulo")
    @DeleteMapping("/Remover")
    public ResponseEntity<TituloDomain> delRemoveTitulo(@RequestBody TituloDomain titulo) {
        apl.removeTitulo(titulo);
        return ResponseEntity.ok(titulo);
    }

    @Operation(description = "Edita um Titulo")
    @PutMapping("/Editar")
    public ResponseEntity<TituloDomain> putEditarTitulo(@RequestBody TituloDomain titulo) {
        apl.editTitulo(titulo);
        return ResponseEntity.ok(titulo);
    }

    @Operation(description = "Retorna uma Lista de Itens")
    @GetMapping("/Listar")
    public ResponseEntity<List<TituloDomain>> getTitulos() {
        List<TituloDomain> itens = apl.getTitulos();
        return ResponseEntity.ok(itens);
    }
}
