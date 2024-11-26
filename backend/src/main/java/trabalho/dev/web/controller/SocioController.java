
package trabalho.dev.web.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trabalho.dev.web.model.application.SocioApplication;
import trabalho.dev.web.model.domain.SocioDomain;

import java.util.List;

@RestController
@RequestMapping("/Socio")
@Tag(name = "SocioController", description = "Fornece serviços web REST para acesso e manipulação de dados de Sócio.")
public class SocioController {
    private final SocioApplication apl;

    @Autowired
    public SocioController(SocioApplication apl) {
        this.apl = apl;
    }

    @Operation(description = "Realiza o Cadastro de Sócio")
    @PostMapping("/Cadastrar")
    public ResponseEntity<SocioDomain> postCadastrarSocio(@RequestBody SocioDomain socio) {
        if(socio != null){
            System.out.println("Sócio: " + socio.getDependentes().get(0).getNome());
        }

        apl.addSocio(socio);
        return ResponseEntity.ok(socio);
    }

    @Operation(description = "Remove um Sócio")
    @DeleteMapping("/Remover")
    public ResponseEntity<SocioDomain> delRemoveSocio(@RequestBody SocioDomain socio) {
        apl.removeSocio(socio);
        return ResponseEntity.ok(socio);
    }

    @Operation(description = "Edita um Sócio")
    @PutMapping("/Editar")
    public ResponseEntity<SocioDomain> putEditarSocio(@RequestBody SocioDomain socio) {
        apl.editSocio(socio);
        return ResponseEntity.ok(socio);
    }

    @Operation(description = "Retorna uma Lista de Sócios")
    @GetMapping("/Listar")
    public ResponseEntity<List<SocioDomain>> getSocios() {
        List<SocioDomain> socios = apl.getSocios();
        return ResponseEntity.ok(socios);
    }
}
