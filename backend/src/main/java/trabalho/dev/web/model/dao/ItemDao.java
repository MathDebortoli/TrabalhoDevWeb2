package trabalho.dev.web.model.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import trabalho.dev.web.model.domain.ItemDomain;

import java.util.List;

@Repository
public class ItemDao {
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public int addItem(ItemDomain item) {
        try {
            entityManager.persist(item);  // Substitui session.save(item)
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao adicionar item) " + e.getMessage());
            e.printStackTrace();
            return -1;
        }
    }

    @Transactional
    public int removeItem(ItemDomain item) {
        try {
            entityManager.remove(entityManager.contains(item) ? item: entityManager.merge(item));  // Substitui session.remove(item)
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao remover item) " + e.getMessage());
            e.printStackTrace();
            return -1;
        }
    }

    @Transactional
    public int editItem(ItemDomain item) {
        try {
            entityManager.merge(item);  // Substitui session.update(item)
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao editar item) " + e.getMessage());
            e.printStackTrace();
            return -1;
        }
    }

    @Transactional
    public List<ItemDomain> getItens() {
        try {
            return entityManager.createQuery("from Item ", ItemDomain.class).getResultList();  // Substitui session.createQuery
        } catch (Exception e) {
            System.err.println("Erro ao buscar items: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
