package trabalho.dev.web.model.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trabalho.dev.web.exceptions.ItemException;
import trabalho.dev.web.exceptions.ItemNotFoundException;
import trabalho.dev.web.model.dao.ItemDao;
import trabalho.dev.web.model.domain.ItemDomain;

import java.util.List;

@Service
public class ItemApplication {
    private final ItemDao dao;

    // Injeção de dependência usando @Autowired no construtor
    @Autowired
    public ItemApplication(ItemDao dao) {
        this.dao = dao;
    }

    public int addItem(ItemDomain item) {
        int result = dao.addItem(item);
        if (result <= 0) {
            throw new ItemException("Erro ao adicionar o item: " + item);
        }
        return result;
    }

    public int removeItem(ItemDomain item) {
        int result = dao.removeItem(item);
        if (result <= 0) {
            throw new ItemNotFoundException("Item não encontrado para remoção: " + item);
        }
        return result;
    }

    public int editItem(ItemDomain item) {
        int result = dao.editItem(item);
        if (result <= 0) {
            throw new ItemNotFoundException("Item não encontrado para edição: " + item);
        }
        return result;
    }

    public List<ItemDomain> getItens() {
        return dao.getItens();
    }
}
