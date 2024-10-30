package trabalho.dev.web.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trabalho.dev.web.model.application.ItemApplication;
import trabalho.dev.web.model.domain.ItemDomain;

import java.util.List;

@RestController
@RequestMapping("/Item")
@Tag(name = "ItemController", description = "Fornece serviços web REST para acesso e manipulação de dados de Item.")
public class ItemController {
    private final ItemApplication apl;

    @Autowired
    public ItemController(ItemApplication apl) {
        this.apl = apl;
    }

    @Operation(description="Realiza o Cadastro de Item")
    @PostMapping("/Cadastrar")
    public ResponseEntity<ItemDomain> postCadastrarItem(@RequestBody ItemDomain item) {
        apl.addItem(item);
        return ResponseEntity.ok(item);
    }

    @Operation(description="Remove um Item")
    @DeleteMapping("/Remover")
    public ResponseEntity<ItemDomain>  delRemoveItem(@RequestBody ItemDomain item) {
        apl.removeItem(item);
        return ResponseEntity.ok(item);
    }

    @Operation(description="Edita um Item")
    @PutMapping("/Editar")
    public ResponseEntity<ItemDomain>  putEditarItem(@RequestBody ItemDomain item) {
        apl.editItem(item);
        return ResponseEntity.ok(item);
    }

    @Operation(description="Retorna uma Lista de Itens")
    @GetMapping("/Listar")
    public ResponseEntity<List<ItemDomain>> getItens() {
        List<ItemDomain> itens = apl.getItens();
        return ResponseEntity.ok(itens);
    }
}
