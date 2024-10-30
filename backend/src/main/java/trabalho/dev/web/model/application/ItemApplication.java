package trabalho.dev.web.model.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
        return dao.addItem(item);
    }

    public int removeItem(ItemDomain item) {
        return dao.removeItem(item);
    }

    public int editItem(ItemDomain item) {
        return dao.editItem(item);
    }

    public List<ItemDomain> getItens() {
        return dao.getItens();
    }
}
